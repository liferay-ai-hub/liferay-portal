#!/usr/bin/env ruby
# frozen_string_literal: true
# See README.md for documentation on modes, env vars, exit codes, and reports.

require 'webrick'
require 'net/http'
require 'json'
require 'logger'
require 'stringio'
require 'time'
require 'zlib'

QUOTA_STR        = ENV.fetch('TENANT_AVAILABLE_QUOTA_TOKENS', '')
QUOTA            = QUOTA_STR.empty? ? nil : Integer(QUOTA_STR)
# Accept "host" or "http(s)://host"; extract bare hostname + TLS flag.
_es_host_raw     = ENV.fetch('ELASTICSEARCH_HOST_REAL', '')
ES_USE_TLS       = _es_host_raw.start_with?('https://')
ES_HOST          = _es_host_raw.sub(%r{\Ahttps?://}, '')
ES_PORT_STR      = ENV.fetch('ELASTICSEARCH_PORT_REAL', '')
ES_PORT          = ES_PORT_STR.empty? ? nil : Integer(ES_PORT_STR)
ACCOUNT_ENTRY_ID = ENV.fetch('ACCOUNT_ENTRY_ID', 'unknown')
WRAPPER_PORT     = Integer(ENV.fetch('WRAPPER_PORT', '9200'))
CHARS_PER_TOKEN  = Integer(ENV.fetch('CHARS_PER_TOKEN', '4'))
CHUNK_OVERHEAD   = Float(ENV.fetch('CHUNK_OVERHEAD', '1.4'))
CRAWLER_LOG_FILE = ENV.fetch('CRAWLER_LOG_FILE', '/tmp/crawl.log')
DRY_RUN_OUTPUT_DIR = ENV.fetch('DRY_RUN_OUTPUT_DIR', '/tmp/crawled_docs')
WRAPPER_REPORT_FILE = ENV.fetch('WRAPPER_REPORT_FILE', '/tmp/wrapper-report.json')
# Kubelet copies this file into status.containerStatuses[].state.terminated.message,
# letting an orchestrator read the report from the Pod object without streaming logs.
# Kubernetes truncates the message at 4096 bytes.
TERMINATION_LOG_FILE = ENV.fetch('TERMINATION_LOG_FILE', '/dev/termination-log')

EXCLUDED_HEADERS = %w[host content-length transfer-encoding connection].freeze

LOG = Logger.new($stdout)
LOG.formatter = proc { |_sev, ts, _, msg| "#{ts.iso8601} [wrapper] #{msg}\n" }

$counter_mutex      = Mutex.new
$consumed_tokens    = 0
$rejected_batches   = 0
$bulks_forwarded    = 0
$docs_forwarded     = 0
$start_time         = Time.now
$crawler_terminated = false

# Send SIGTERM to any `bin/crawler crawl` process in the Pod's PID namespace.
# Idempotent. Triggered when quota is exhausted to stop wasted work.
def terminate_crawler_once
  return if $crawler_terminated
  $crawler_terminated = true
  killed = []
  Dir.glob('/proc/[0-9]*').each do |proc_dir|
    cmdline = (File.read(File.join(proc_dir, 'cmdline')) rescue '')
    next unless cmdline.include?('bin/crawler') && cmdline.include?('crawl')
    pid = File.basename(proc_dir).to_i
    next if pid == Process.pid
    begin
      Process.kill('TERM', pid)
      killed << pid
    rescue StandardError => e
      LOG.warn("could not SIGTERM crawler pid=#{pid}: #{e.class}: #{e.message}")
    end
  end
  LOG.info("quota exhausted; sent SIGTERM to crawler pid(s)=#{killed.inspect}") unless killed.empty?
end

def reserve_quota(batch_tokens)
  $counter_mutex.synchronize do
    # QUOTA nil => unlimited: count consumption but never reject.
    if QUOTA && $consumed_tokens + batch_tokens > QUOTA
      $rejected_batches += 1
      return false
    end
    $consumed_tokens += batch_tokens
    true
  end
end

def refund_quota(batch_tokens)
  $counter_mutex.synchronize { $consumed_tokens -= batch_tokens }
end

# Walks the bulk NDJSON, summing doc-body bytes.
# Returns [estimated_tokens, doc_count].
def parse_bulk(bulk_body)
  chars = 0
  docs  = 0
  lines = bulk_body.split("\n")
  i = 0
  while i < lines.length
    begin
      action = JSON.parse(lines[i])
    rescue StandardError
      i += 1
      next
    end
    if action.key?('delete')
      i += 1
      next
    end
    i += 1
    if i < lines.length
      chars += lines[i].bytesize
      docs += 1
    end
    i += 1
  end
  tokens = (chars.to_f / CHARS_PER_TOKEN * CHUNK_OVERHEAD).to_i
  [tokens, docs]
end

# Extract crawler stats from the tee'd log file.
def parse_crawler_log
  return {} unless File.exist?(CRAWLER_LOG_FILE)
  content = File.read(CRAWLER_LOG_FILE)
  out = {}

  single_patterns = {
    crawl_id:                  [/\[crawl:([a-f0-9]+)\]/,                                :string],
    result:                    [/Finished a crawl\. Result:\s+(\w+)/,                   :string],
    pages_visited:             [/Pages visited:\s+(\d+)/,                               :int],
    urls_allowed:              [/URLs allowed:\s+(\d+)/,                                :int],
    already_seen:              [/Already seen:\s+(\d+)/,                                :int],
    domain_filter:             [/Domain filter:\s+(\d+)/,                               :int],
    crawl_duration_seconds:    [/Crawl duration \(seconds\):\s+([\d.]+)/,               :float],
    crawling_time_seconds:     [/Crawling time \(seconds\):\s+([\d.]+)/,                :float],
    avg_response_time_seconds: [/Average response time \(seconds\):\s+([\d.]+)/,        :float],
  }

  single_patterns.each do |key, (pattern, type)|
    m = content.match(pattern)
    next unless m
    out[key] = case type
               when :int   then m[1].to_i
               when :float then m[1].to_f
               else m[1]
               end
  end

  # Two "Volume (bytes)" lines exist (upserted + failed); pair each with its context.
  if (m = content.match(/Documents upserted:\s+(\d+).*?Volume \(bytes\):\s+(\d+)/m))
    out[:docs_upserted] = m[1].to_i
    out[:docs_upserted_bytes] = m[2].to_i
  end
  if (m = content.match(/Number of documents that failed to index:\s+(\d+).*?Volume \(bytes\):\s+(\d+)/m))
    out[:docs_failed] = m[1].to_i
    out[:docs_failed_bytes] = m[2].to_i
  end

  out
end

class QuotaProxy < WEBrick::HTTPServlet::AbstractServlet
  def do_GET(req, res);    handle(req, res); end
  def do_POST(req, res);   handle(req, res); end
  def do_PUT(req, res);    handle(req, res); end
  def do_DELETE(req, res); handle(req, res); end
  def do_HEAD(req, res);   handle(req, res); end

  private

  def handle(req, res)
    body = req.body || ''

    unless req.path.end_with?('/_bulk')
      proxy_to_es(req, body, res)
      return
    end

    # elastic-transport gzips bulk bodies; decompress for parsing, forward as-is.
    encoding = (req['Content-Encoding'] || '').downcase
    parse_body = if encoding == 'gzip'
      begin
        Zlib::GzipReader.new(StringIO.new(body)).read
      rescue StandardError => e
        LOG.warn("failed to gunzip bulk body: #{e.class}: #{e.message}")
        ''
      end
    else
      body
    end

    batch_tokens, batch_docs = parse_bulk(parse_body)
    unless reserve_quota(batch_tokens)
      LOG.warn(
        "QUOTA_EXHAUSTED account_entry_id=#{ACCOUNT_ENTRY_ID} consumed=#{$consumed_tokens} " \
        "attempted=#{batch_tokens} quota=#{QUOTA}"
      )
      res.status = 429
      res['Content-Type'] = 'application/json'
      res.body = JSON.dump(
        error: 'account quota exceeded',
        account_entry_id: ACCOUNT_ENTRY_ID,
        consumed_tokens: $consumed_tokens,
        quota_tokens: QUOTA,
      )
      terminate_crawler_once
      return
    end

    status = proxy_to_es(req, body, res)
    if (200..299).include?(status)
      $counter_mutex.synchronize do
        $bulks_forwarded += 1
        $docs_forwarded += batch_docs
      end
      LOG.info(
        "FORWARDED account_entry_id=#{ACCOUNT_ENTRY_ID} batch_tokens=#{batch_tokens} " \
        "batch_docs=#{batch_docs} consumed=#{$consumed_tokens} quota=#{QUOTA || 'unlimited'}"
      )
    else
      refund_quota(batch_tokens)
    end
  end

  # HEAD requires resp_body_permitted=false; otherwise Net::HTTP blocks
  # waiting for a body that never comes.
  METHOD_FLAGS = {
    'GET'    => [false, true],
    'HEAD'   => [false, false],
    'POST'   => [true,  true],
    'PUT'    => [true,  true],
    'DELETE' => [true,  true],
    'PATCH'  => [true,  true],
  }.freeze

  def proxy_to_es(req, body, res)
    method = req.request_method.upcase
    req_body_perm, resp_body_perm = METHOD_FLAGS.fetch(method, [true, true])
    Net::HTTP.start(ES_HOST, ES_PORT, use_ssl: ES_USE_TLS, open_timeout: 10, read_timeout: 60) do |http|
      es_req = Net::HTTPGenericRequest.new(method, req_body_perm, resp_body_perm, req.path)
      req.header.each do |k, v|
        next if EXCLUDED_HEADERS.include?(k.downcase)
        es_req[k] = v.first
      end
      es_req.body = body if req_body_perm
      es_resp = http.request(es_req)
      res.status = es_resp.code.to_i
      es_resp.each_header do |k, v|
        next if EXCLUDED_HEADERS.include?(k.downcase)
        res[k] = v
      end
      res.body = es_resp.body || ''
      return res.status
    end
  rescue StandardError => e
    LOG.error("proxy failed: #{e.class}: #{e.message}")
    res.status = 502
    res.body = ''
    502
  end
end

def write_termination_message(json)
  File.write(TERMINATION_LOG_FILE, json)
rescue StandardError => e
  LOG.warn("could not write termination message to #{TERMINATION_LOG_FILE}: #{e.class}: #{e.message}")
end

def emit_final_report
  tokens = { consumed: $consumed_tokens }
  unless QUOTA.nil?
    tokens[:quota]     = QUOTA
    tokens[:remaining] = QUOTA - $consumed_tokens
  end
  tokens[:bulks_forwarded]  = $bulks_forwarded
  tokens[:bulks_rejected]   = $rejected_batches
  tokens[:docs_forwarded]   = $docs_forwarded
  tokens[:duration_seconds] = (Time.now - $start_time).round

  report = {
    event:     'crawler_final_report',
    mode:      'server',
    account_entry_id: ACCOUNT_ENTRY_ID,
    timestamp: Time.now.utc.iso8601,
    tokens:    tokens,
    crawler:   parse_crawler_log,
  }
  json = JSON.dump(report)
  $stdout.puts json
  $stdout.flush
  File.write(WRAPPER_REPORT_FILE, json) rescue nil
  write_termination_message(json)
end

def measure_output_dir
  return [0, 0] unless File.directory?(DRY_RUN_OUTPUT_DIR)
  bytes = 0
  count = 0
  Dir.glob(File.join(DRY_RUN_OUTPUT_DIR, '**', '*')).each do |path|
    next unless File.file?(path)
    bytes += File.size(path)
    count += 1
  end
  [bytes, count]
end

def emit_post_process_report
  crawler_stats = parse_crawler_log
  bytes, docs_count = measure_output_dir
  estimated_tokens = (bytes.to_f / CHARS_PER_TOKEN * CHUNK_OVERHEAD).to_i

  tokens = { estimated_consumed: estimated_tokens }
  unless QUOTA.nil?
    tokens[:quota]              = QUOTA
    tokens[:remaining]          = QUOTA - estimated_tokens
    tokens[:would_exceed_quota] = estimated_tokens > QUOTA
  end

  report = {
    event:     'crawler_final_report',
    mode:      'post_process',
    account_entry_id: ACCOUNT_ENTRY_ID,
    timestamp: Time.now.utc.iso8601,
    tokens:    tokens,
    output: {
      docs_written:  docs_count,
      bytes_written: bytes,
      output_dir:    DRY_RUN_OUTPUT_DIR,
    },
    crawler: crawler_stats,
  }
  json = JSON.dump(report)
  $stdout.puts json
  $stdout.flush
  write_termination_message(json)
  report[:tokens][:would_exceed_quota] == true
end

if ARGV.include?('--post-process')
  exit(emit_post_process_report ? 2 : 0)
end

abort 'ELASTICSEARCH_HOST_REAL and ELASTICSEARCH_PORT_REAL are required in server mode' if ES_HOST.empty? || ES_PORT.nil?

LOG.info(
  "starting wrapper port=#{WRAPPER_PORT} account_entry_id=#{ACCOUNT_ENTRY_ID} " \
  "quota=#{QUOTA || 'unlimited'} es_real=#{ES_HOST}:#{ES_PORT}"
)

server = WEBrick::HTTPServer.new(
  BindAddress: '127.0.0.1',
  Port: WRAPPER_PORT,
  Logger: WEBrick::Log.new($stdout, WEBrick::Log::WARN),
  AccessLog: [],
)
server.mount('/', QuotaProxy)

# server.shutdown (instead of exit) avoids a "FATAL SystemExit" trace.
%w[TERM INT].each do |sig|
  Signal.trap(sig) do
    emit_final_report
    server.shutdown
  end
end

server.start
