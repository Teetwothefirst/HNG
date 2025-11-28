DevOps Intern Stage 3 Task → Observability & Alerts for Blue/Green (Log-Watcher + Slack)
Hey Cool Keeds! :wave:
Explainer Video: https://vt.tiktok.com/ZSyNHF2mF/
:mag_right: Overview
Extend the Stage 2 setup by adding operational visibility and actionable alerts. You’ll instrument Nginx access logs to record which pool served each request, monitor those logs in real time with a lightweight Python process, and send alerts to Slack when failovers occur or upstream error rates breach thresholds.
Stage 2 is a prerequisite. Do not modify the app images. All work happens via Nginx logging, Docker Compose wiring, environment variables, and a small Python sidecar.
:dart: Objectives
By the end of this stage, you should be able to:
Format Nginx logs to capture pool, release ID, upstream status, latency, and upstream address.
Deploy a Python log-watcher that tails Nginx logs and posts alerts to Slack.
Detect and alert on:
Failover events (Blue→Green, Green→Blue).
Elevated upstream 5xx error rates over a sliding window.
Use environment variables in .env to configure Slack webhook, thresholds, and cooldowns.
Provide a runbook so operators know how to respond to alerts.
:hammer_and_wrench: Task Breakdown
Part 1: Nginx Logging
Extend Nginx access logs with a custom format that records:
pool (from X-App-Pool)
release (from X-Release-Id)
upstream_status, upstream, request_time, upstream_response_time
Store logs in a shared volume accessible to other services.
Part 2: Log-Watcher Service
Add an alert_watcher service in Docker Compose.
It should:
Tail Nginx logs in real time.
Parse pool and upstream status fields.
Maintain a rolling error-rate window.
Detects pool flips compared to the last seen pool.
Part 3: Slack Alerts
Post to Slack when:
Failover occurs (blue → green or green → blue).
Error-rate threshold exceeded (e.g., >2% 5xx over last 200 requests).
Enforce alert cooldowns to prevent spam.
Use SLACK_WEBHOOK_URL from .env (no secrets in code).
Part 4: Runbook
Document what each alert means and the operator action:
Failover detected → check health of primary container.
Error-rate high → inspect upstream logs, possibly toggle pools.
Recovery → primary is serving traffic again.
Provide a way to suppress alerts during planned toggles (maintenance mode flag).
:clipboard: Requirements
Environment variables in .env:
SLACK_WEBHOOK_URL — Slack incoming webhook
ACTIVE_POOL — initial active pool
ERROR_RATE_THRESHOLD — default 2 (%)
WINDOW_SIZE — default 200 requests
ALERT_COOLDOWN_SEC — default 300 seconds
No modifications to app images.
Zero coupling to request path (alerts from logs only).
Shared log volume for Nginx and watcher.
:white_check_mark: Acceptance Criteria
Nginx logs show pool, release, upstream status, and address for each request.
Watcher posts to Slack:
On the first failover event after chaos injection.
On error-rate threshold breach.
Alerts are deduplicated and rate-limited.
Runbook is documented and operator-friendly.
Stage 2 tests (baseline, chaos, failover) remain valid, plus:
Chaos drill generates at least one failover alert in Slack.
Error-rate simulation generates an error-rate alert.
Submission Requirements
1. GitHub Repository
A public GitHub repository containing:
docker-compose.yml
Nginx configuration template (nginx.conf.template)
Python log watcher script (watcher.py) and requirements.txt
.env.example file with all required environment variables (no secrets)
runbook.md explaining alert meanings and operator actions
README.md with:
Setup instructions (docker compose up, chaos testing steps, etc.)
How to view logs and verify Slack alerts
Reference to the screenshots listed below
2. Screenshots (Verification Proof)
Each submission must include at least the following screenshots:
Screenshot
Description
:one: Slack Alert – Failover Event
Screenshot of the Slack message triggered when Blue fails and Green takes over (Failover Detected or similar).
:two: Slack Alert – High Error Rate
Screenshot of the Slack message showing an error-rate alert triggered (> threshold).
:three: Container Logs
A snippet of the Nginx log line showing structured log fields (pool, release, upstream status, latency, etc.).
:memo: Note: Screenshots must be clear and readable, showing timestamps, alert details, and Slack message content (no tight cropping).
:white_check_mark: Minimum for a Valid Submission
To qualify for grading, your submission must include:
A working GitHub repository with Docker Compose setup
At least one valid Slack alert screenshot (failover)
Verified Nginx failover behavior
A runbook file (runbook.md) describing alert meanings and operator actions
:alarm_clock: Deadline & Attempts
Deadline: 05:59 PM GMT, 30th October 2025
Attempts Allowed: 1
Late Submissions: :x: Not accepted
Submission Form: https://forms.gle/6tjAzj1zprsiPcgX6
Task is also Available on Airtable - https://airtable.com/appB2brphWYMkgQzv/shraAkPjpRSPeXjGN?MvrfH%3Agroup=eyJwZWxJNEFv[…]Asort=eyJwZWxJNEFvakFNY29XNzRrayI6W119&W74kk=recCBnBxA41Hj4JrM
You got this, cool Keeds! :sunglasses: