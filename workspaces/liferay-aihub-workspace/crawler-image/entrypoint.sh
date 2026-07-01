#!/bin/bash
set -uo pipefail
# See README.md for env vars, modes, exit codes, and report format.

: "${CRAWLER_DRY_RUN:=false}"
: "${CRAWLER_DOMAIN_URL:?missing CRAWLER_DOMAIN_URL}"
: "${CRAWLER_SEED_URL:?missing CRAWLER_SEED_URL}"
: "${CRAWLER_OUTPUT_INDEX:?missing CRAWLER_OUTPUT_INDEX}"

if [[ "${CRAWLER_DRY_RUN}" != "true" ]]; then
	: "${ELASTICSEARCH_HOST:?missing ELASTICSEARCH_HOST}"
	: "${ELASTICSEARCH_PORT:?missing ELASTICSEARCH_PORT}"
fi
: "${ACCOUNT_ENTRY_ID:=unknown}"
# Optional: when unset the wrapper runs unlimited (counts tokens, never rejects).
: "${TENANT_AVAILABLE_QUOTA_TOKENS:=}"
# Crawler system log verbosity: debug | info | warn | error | fatal.
: "${CRAWLER_LOG_LEVEL:=info}"

log() {
	echo "[$(date -Iseconds)] $*"
}

# Shared crawl_rules block used by both modes so dry-run estimates and full-mode
# crawls visit the same URL set. Quoted heredoc — no shell expansion inside.
CRAWL_RULES_YAML=$(cat <<'EOF'
        crawl_rules:
            -   pattern: "[?&]sort="
                policy: deny
                type: regex
            -   pattern: "[?&]order(by)?="
                policy: deny
                type: regex
            -   pattern: "[?&](filter|facet|tag)="
                policy: deny
                type: regex
            -   pattern: /calendar/
                policy: deny
                type: begins
            -   pattern: /c/
                policy: deny
                type: begins
            -   pattern: /c/portal/
                policy: deny
                type: contains
            -   pattern: /o/
                policy: deny
                type: begins
            -   pattern: /combo
                policy: deny
                type: begins
            -   pattern: p_p_id
                policy: deny
                type: contains
            -   pattern: p_auth
                policy: deny
                type: contains
            -   pattern: p_p_lifecycle
                policy: deny
                type: contains
            -   pattern: backURL
                policy: deny
                type: contains
            -   pattern: "redirect="
                policy: deny
                type: contains
            -   pattern: _cur
                policy: deny
                type: contains
            -   pattern: _delta
                policy: deny
                type: contains
            -   pattern: orderBy
                policy: deny
                type: contains
EOF
)

if [[ "${CRAWLER_DRY_RUN}" == "true" ]]; then
	log "DRY RUN: crawler writes to disk; wrapper not started"

	cat > /tmp/crawl.yml <<EOF
domains:
    -   url: "${CRAWLER_DOMAIN_URL}"
        seed_urls:
            -   "${CRAWLER_SEED_URL}"
${CRAWL_RULES_YAML}

log_level: "${CRAWLER_LOG_LEVEL}"
output_sink: file
output_dir: /tmp/crawled_docs
EOF
else
	log "Starting quota wrapper (account_entry_id=${ACCOUNT_ENTRY_ID}, available_quota=${TENANT_AVAILABLE_QUOTA_TOKENS:-unlimited})"
	ELASTICSEARCH_HOST_REAL="${ELASTICSEARCH_HOST}" \
	ELASTICSEARCH_PORT_REAL="${ELASTICSEARCH_PORT}" \
	TENANT_AVAILABLE_QUOTA_TOKENS="${TENANT_AVAILABLE_QUOTA_TOKENS}" \
	ACCOUNT_ENTRY_ID="${ACCOUNT_ENTRY_ID}" \
	ruby /opt/liferay/quota_wrapper.rb &
	WRAPPER_PID=$!

	# Safety net: stop the wrapper if the script exits unexpectedly.
	trap 'kill -TERM ${WRAPPER_PID} 2>/dev/null; wait ${WRAPPER_PID} 2>/dev/null' EXIT

	for i in $(seq 1 30); do
		if (echo > /dev/tcp/127.0.0.1/9200) 2>/dev/null; then
			log "Wrapper ready"
			break
		fi
		if [ "$i" -eq 30 ]; then
			log "Wrapper failed to start within 15s"
			exit 1
		fi
		sleep 0.5
	done

	cat > /tmp/crawl.yml <<EOF
domains:
    -   url: "${CRAWLER_DOMAIN_URL}"
        seed_urls:
            -   "${CRAWLER_SEED_URL}"
${CRAWL_RULES_YAML}

log_level: "${CRAWLER_LOG_LEVEL}"
output_index: "${CRAWLER_OUTPUT_INDEX}"
output_sink: elasticsearch

elasticsearch:
    bulk_api:
        max_items: 100
        max_size_bytes: 1048576
    host: "localhost"
    pipeline_enabled: false
    port: 9200
EOF
fi

log "Starting crawler with seed=${CRAWLER_SEED_URL} index=${CRAWLER_OUTPUT_INDEX} dry_run=${CRAWLER_DRY_RUN} log_level=${CRAWLER_LOG_LEVEL}"

# Tee so the wrapper can parse "Crawl Stats" / "Ingestion Stats" on shutdown.
bundle exec bin/crawler crawl /tmp/crawl.yml 2>&1 | tee /tmp/crawl.log
exit_code=${PIPESTATUS[0]}

log "Crawler finished with exit code ${exit_code}"

if [[ "${CRAWLER_DRY_RUN}" == "true" ]]; then
	log "Running post-process to estimate token consumption"
	ACCOUNT_ENTRY_ID="${ACCOUNT_ENTRY_ID}" \
	TENANT_AVAILABLE_QUOTA_TOKENS="${TENANT_AVAILABLE_QUOTA_TOKENS:-}" \
	ruby /opt/liferay/quota_wrapper.rb --post-process
	post_process_exit=$?

	# Only override on crawler success - never mask a real crawler failure.
	if [[ "${exit_code}" -eq 0 && "${post_process_exit}" -ne 0 ]]; then
		log "Post-process flagged would_exceed_quota; Job will fail"
		exit_code=${post_process_exit}
	fi
else
	# Signal the wrapper and wait so the report file is written before we read it.
	kill -TERM ${WRAPPER_PID} 2>/dev/null
	wait ${WRAPPER_PID} 2>/dev/null

	# The crawler's own exit code doesn't reflect bulk rejections; force exit 2
	# if any batch was rejected so the K8s Job is marked Failed.
	if [ -f /tmp/wrapper-report.json ]; then
		rejected=$(ruby -rjson -e 'puts JSON.parse(File.read("/tmp/wrapper-report.json")).dig("tokens","bulks_rejected").to_i' 2>/dev/null)
		if [ "${rejected:-0}" -gt 0 ]; then
			log "Wrapper rejected ${rejected} batches (quota exhausted); Job will fail (exit 2)"
			exit_code=2
		fi
	fi
fi

exit ${exit_code}
