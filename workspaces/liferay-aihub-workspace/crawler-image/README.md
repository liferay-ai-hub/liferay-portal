# AI Hub Crawler

Container image that wraps `docker.elastic.co/integrations/crawler:1.0.0` with a
small Ruby proxy (`quota_wrapper.rb`) that enforces a per-crawl token budget
against the Vertex AI embedding inference triggered when the crawled documents
land in an Elasticsearch index mapped with `semantic_text`.

## Why this exists

The Elastic open crawler writes documents directly to Elasticsearch via the
`_bulk` API. When the target index has a `semantic_text` field bound to a Vertex
AI inference endpoint, ES synchronously calls Vertex to embed each chunk - so
the crawl directly consumes the account's Vertex token budget, with no
opportunity for the application layer to gate it. This image inserts a wrapper
between the crawler and ES that counts the bulk payloads and rejects with HTTP
429 once the budget is exhausted.

## Architecture

```
┌───────────────────────────────────────────┐
│ Pod (one container)                       │
│                                           │
│   entrypoint.sh                           │
│   ├─ spawns wrapper (background)          │
│   ├─ tees crawler output to /tmp/crawl.log│
│   └─ runs crawler against localhost:9200  │
│                                           │
│   crawler ──HTTP──> wrapper:9200          │
│                       │                   │
│                       │ count + 429 on quota
│                       ▼                   │
└───────────────────────|───────────────────┘
                        │
                        ▼
                 Elasticsearch (real)
                        │ (semantic_text mapping)
                        ▼
                  Vertex AI embedding
```

## Per-bulk processing

1. Crawler POSTs `/<index>/_bulk` (gzipped NDJSON, up to 100 docs / 1 MB) to the
   wrapper on `localhost:9200`.
2. Wrapper decompresses the body and walks the NDJSON, summing doc-body bytes.
3. Token estimate: `bytes ÷ CHARS_PER_TOKEN × CHUNK_OVERHEAD`. Defaults are
   `4` and `1.4`, matching the sentence-based 250-token chunks with 100-token
   overlap that `semantic_text` uses by default.
4. Atomic check `consumed + batch_tokens ≤ quota`:
   - **Fits** → reserve the tokens, forward to real ES. On 2xx response,
     increment counters. On non-2xx, refund.
   - **Exceeds** → respond 429 `account quota exceeded`, **send SIGTERM to the
     `bin/crawler crawl` process** so the Pod stops crawling pages that can't
     be indexed.

When `TENANT_AVAILABLE_QUOTA_TOKENS` is unset, the wrapper runs in unlimited
mode: it still counts and emits the consumed total in the final report, but
never rejects a batch.

## Modes

| Mode | When | What runs | Output |
|------|------|-----------|--------|
| **Full** | `CRAWLER_DRY_RUN=false` *(default)* | Wrapper runs as HTTP server. Crawler writes to ES via the wrapper. | Per-batch FORWARDED / QUOTA_EXHAUSTED logs + final report. |
| **Dry-run** | `CRAWLER_DRY_RUN=true` | Crawler writes to `/tmp/crawled_docs` (file sink). Wrapper is **not** started during the crawl; after the crawler finishes, the wrapper runs once with `--post-process` to inspect the output directory. | A final report with `estimated_consumed` (and `would_exceed_quota` when a quota is configured). |

## Environment variables

### Required in every run

| Variable | Description |
|---|---|
| `CRAWLER_DOMAIN_URL` | Domain limit for the crawl. |
| `CRAWLER_SEED_URL` | Starting URL. |
| `CRAWLER_OUTPUT_INDEX` | Target index. In full mode the crawler writes here; in dry-run it's informational. |

### Required in full mode (skip only if `CRAWLER_DRY_RUN=true`)

| Variable | Description |
|---|---|
| `ELASTICSEARCH_HOST` | ES hostname; accepts plain hostname or `http(s)://hostname`. |
| `ELASTICSEARCH_PORT` | ES port (typically 9200). |

### Optional

| Variable | Default | Description |
|---|---|---|
| `CRAWLER_DRY_RUN` | `false` | Set to `true` to skip the wrapper and write crawled docs to a local directory (estimation mode). |
| `CRAWLER_LOG_LEVEL` | `info` | Crawler system-log verbosity, written to stdout (and tee'd to `CRAWLER_LOG_FILE`). One of `debug`, `info`, `warn`, `error`, `fatal`. Set to `debug` to see per-URL fetch outcomes (redirects, errors, skipped non-HTML content) — useful for explaining why `Pages visited` far exceeds `Documents upserted`. Noisy; enable only when diagnosing. |
| `TENANT_AVAILABLE_QUOTA_TOKENS` | *(empty)* | Tokens this crawl may consume. **Computed by the caller** as `account_quota_limit - account_quota_used` before the Job is created. When empty, the wrapper runs in unlimited mode — counts consumption but never rejects. |
| `ACCOUNT_ENTRY_ID` | `unknown` | Echoed in logs and in the `account_entry_id` field of the final report. |
| `CHARS_PER_TOKEN` | `4` | Conversion factor for English. Increase for multi-byte / non-Latin scripts. |
| `CHUNK_OVERHEAD` | `1.4` | Multiplier for chunk overlap in `semantic_text` chunking. |
| `WRAPPER_PORT` | `9200` | Port the wrapper listens on (container-local). |
| `CRAWLER_LOG_FILE` | `/tmp/crawl.log` | File the entrypoint tees crawler output to. |
| `DRY_RUN_OUTPUT_DIR` | `/tmp/crawled_docs` | Where the crawler writes files in dry-run. |
| `WRAPPER_REPORT_FILE` | `/tmp/wrapper-report.json` | The wrapper persists its final report here for the entrypoint to read. |
| `TERMINATION_LOG_FILE` | `/dev/termination-log` | The wrapper also writes the final report here. Kubelet copies the content into `status.containerStatuses[].state.terminated.message` (truncated at 4096 bytes), letting orchestrators read the report directly from the Pod object without streaming logs. |

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | Crawler completed and no batch was rejected. |
| `1` | Bootstrap failure (wrapper didn't start within 15 s, config invalid, etc.). |
| `2` | **Quota exhausted**: in full mode any batch was rejected; in dry-run the estimate would have exceeded the quota. The caller (Spring Boot dispatcher) should treat this as a definitive quota failure - retrying without raising the quota will produce the same result and re-consume Vertex tokens. |

The `BackoffLimit` of the Job should be `0`: retries on a quota-exhausted Pod
just re-run the crawl and re-bill Vertex.

## Final report

Both modes emit one **single-line JSON** to stdout, parsed automatically into
`jsonPayload` by Cloud Logging. The same JSON is written to
`/tmp/wrapper-report.json` so the entrypoint can read it after signaling the
wrapper, and to `/dev/termination-log` so Kubelet surfaces it on the Pod
object.

Identify the line by `event == "crawler_final_report"`.

### Full mode — success (quota configured)

```json
{
  "event": "crawler_final_report",
  "mode": "server",
  "account_entry_id": "account-abc",
  "timestamp": "2026-05-22T20:59:27Z",
  "tokens": {
    "consumed": 926693,
    "quota": 10000000,
    "remaining": 9073307,
    "bulks_forwarded": 4,
    "bulks_rejected": 0,
    "docs_forwarded": 391,
    "duration_seconds": 183
  },
  "crawler": {
    "crawl_id": "6a10c3023d6731bd8f1a154f",
    "result": "success",
    "pages_visited": 774,
    "urls_allowed": 773,
    "already_seen": 10077,
    "domain_filter": 15892,
    "crawl_duration_seconds": 172.0,
    "crawling_time_seconds": 199.283,
    "avg_response_time_seconds": 0.2574,
    "docs_upserted": 391,
    "docs_upserted_bytes": 2647700,
    "docs_failed": 0,
    "docs_failed_bytes": 0
  }
}
```

### Full mode — unlimited (no quota configured)

When `TENANT_AVAILABLE_QUOTA_TOKENS` is unset, `quota` and `remaining` are
omitted from `tokens`; everything else stays the same.

```json
{
  "tokens": {
    "consumed": 926693,
    "bulks_forwarded": 4,
    "bulks_rejected": 0,
    "docs_forwarded": 391,
    "duration_seconds": 183
  }
}
```

### Full mode — quota exhausted

Same shape as success, with `bulks_rejected > 0` and `docs_forwarded <
pages_visited`. The Pod exits with code 2.

```json
{
  "tokens": {
    "consumed": 712271,
    "quota": 750000,
    "remaining": 37729,
    "bulks_forwarded": 3,
    "bulks_rejected": 1,
    "docs_forwarded": 300,
    "duration_seconds": 205
  }
}
```

### Dry-run

```json
{
  "event": "crawler_final_report",
  "mode": "post_process",
  "account_entry_id": "account-abc",
  "timestamp": "2026-05-22T15:33:09Z",
  "tokens": {
    "estimated_consumed": 6019144,
    "quota": 2000000,
    "remaining": -4019144,
    "would_exceed_quota": true
  },
  "output": {
    "docs_written": 1221,
    "bytes_written": 17197557,
    "output_dir": "/tmp/crawled_docs"
  },
  "crawler": {
    "crawl_id": "abc123",
    "result": "success",
    "pages_visited": 3182,
    "...": "..."
  }
}
```

Negative `remaining` is the deficit; positive is the headroom. When
`TENANT_AVAILABLE_QUOTA_TOKENS` is unset, `quota`, `remaining`, and
`would_exceed_quota` are omitted — only `estimated_consumed` is reported.

## Consumer pattern (Spring Boot dispatcher)

After the Pod terminates:

1. Read the Pod logs (or query Cloud Logging on `jsonPayload.event`), or read
   `status.containerStatuses[0].state.terminated.message` from the Pod object.
2. Find the line where `event == "crawler_final_report"`.
3. Branch on `mode`:
   - **`server`**: charge `tokens.consumed` to the account's quota in CloudSQL.
     If the Pod exited 2 (`tokens.bulks_rejected > 0`), surface "crawl
     interrupted by quota" to the admin.
   - **`post_process`**: no real Vertex consumption. If `would_exceed_quota`
     is true (present only when a quota was configured), surface it without
     debiting.

## Required ES setup

The crawler **auto-creates** the target index with a default mapping if it
doesn't exist - **and the auto-created index has no `semantic_text` field**,
so no embedding happens. To exercise the inference path, the caller must
pre-create the index:

```http
PUT /<index_name>
{
  "settings": {
    "index": {
      "default_pipeline": "liferay-ai-hub-crawl-result-ingestion-pipeline"
    }
  },
  "mappings": {
    "date_detection": false,
    "properties": {
      "body":  {"type": "text"},
      "title": {"type": "text"},
      "url":   {"type": "keyword"},
      "last_crawled_at": {"type": "date"},
      "text_embedding": {
        "type": "semantic_text",
        "inference_id": "google-vertex-ai-gemini-embedding-001"
      }
    }
  }
}
```

The ingest pipeline composes `text_embedding` from `title` + `body`, which is
what triggers the Vertex inference call.

## Usage in a Job manifest

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: aihub-crawler-<random>
spec:
  backoffLimit: 0
  ttlSecondsAfterFinished: 3600
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: crawler
          image: europe-west3-docker.pkg.dev/internal-assets-prd/ai-hub/aihub-crawler:<tag>
          env:
            - {name: CRAWLER_DRY_RUN,               value: "false"}
            - {name: CRAWLER_DOMAIN_URL,            value: "https://example.com"}
            - {name: CRAWLER_SEED_URL,              value: "https://example.com"}
            - {name: CRAWLER_OUTPUT_INDEX,          value: "liferay-<companyId>-ai-hub-...-crawl-results-<uuid>"}
            - {name: ELASTICSEARCH_HOST,            value: "http://search-es-http.<ns>.svc.cluster.local"}
            - {name: ELASTICSEARCH_PORT,            value: "9200"}
            - {name: TENANT_AVAILABLE_QUOTA_TOKENS, value: "1000000"}
            - {name: ACCOUNT_ENTRY_ID,              value: "account-abc"}
```

Omit `TENANT_AVAILABLE_QUOTA_TOKENS` (or set it to an empty string) to run the
crawl in unlimited mode.

## Behavioral notes

- **Quota enforcement is per-bulk, all-or-nothing**: a batch that wouldn't
  fit entirely is rejected entirely. Combined with the 100-doc / 1-MB bulk
  cap, "wasted" quota at the end is at most a single batch worth (~250k
  tokens).
- **Token estimate is approximate**: `bytes / 4 × 1.4` lands within ~10-20%
  of real Vertex usage for English text. Multi-byte scripts, HTML-heavy
  pages, and non-default chunking will skew it. Replace with a real
  tokenizer (e.g. `jtokkit`) or call Vertex's `countTokens` if precision
  matters.
- **The wrapper kills the crawler on quota exhaustion**: matches any process
  in the Pod's PID namespace whose `cmdline` contains both `bin/crawler` and
  `crawl`. Assumes there's only one such process.
- **Crawler exit code is unreliable** for ES-side failures: it often exits 0
  even when bulks were rejected. The entrypoint normalizes this to exit 2
  whenever `tokens.bulks_rejected > 0`.
- **Cosmetic `Errno::ECONNRESET` in the log**: emitted by WEBrick when the
  crawler is killed mid-request. The reject was already processed and the
  report was emitted; ignore.

## Limitations

- Only `_bulk` traffic is metered. Other endpoints (search, `_inference`,
  `_cluster/health`, etc.) are proxied raw.
- A single huge document in the middle of a crawl can push a single batch
  past the quota. The whole batch is then rejected.
- The wrapper's PID namespace assumption (one crawler process) is reasonable
  inside a Job-spawned Pod but doesn't hold in arbitrary containers.

## Local development

```bash
# Build
docker build -t aihub-crawler:local .

# Port-forward ES (in another terminal)
kubectl -n <es-namespace> port-forward svc/search-es-http 9201:9200

# Full mode against the port-forwarded ES
docker run --rm \
  --network=host \
  --user 1000 \
  -e CRAWLER_DRY_RUN=false \
  -e CRAWLER_DOMAIN_URL=https://parksaustralia.gov.au \
  -e CRAWLER_SEED_URL=https://parksaustralia.gov.au \
  -e CRAWLER_OUTPUT_INDEX=crawler-test \
  -e ELASTICSEARCH_HOST=localhost \
  -e ELASTICSEARCH_PORT=9201 \
  -e TENANT_AVAILABLE_QUOTA_TOKENS=1000000 \
  -e ACCOUNT_ENTRY_ID=test \
  aihub-crawler:local

# Dry-run (no ES needed)
docker run --rm \
  --user 1000 \
  -e CRAWLER_DRY_RUN=true \
  -e CRAWLER_DOMAIN_URL=https://parksaustralia.gov.au \
  -e CRAWLER_SEED_URL=https://parksaustralia.gov.au \
  -e CRAWLER_OUTPUT_INDEX=crawler-test \
  -e TENANT_AVAILABLE_QUOTA_TOKENS=1000000 \
  aihub-crawler:local

# Pretty-print the final report from a run
docker run ... 2>&1 | grep '^{"event"' | jq
```
