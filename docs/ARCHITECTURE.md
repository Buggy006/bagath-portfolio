# Architecture — v1.0

Target architecture for the December 2026 release. The guiding principle:
**everything is code** — site, infrastructure, pipelines, and the two
product features (waitlist, AI agent) all live in this repo and deploy
through the same pipeline.

## System overview

```
                        ┌──────────────────────────────┐
        git push ──────▶│  GitHub Actions              │
                        │  lint · test · build · plan  │
                        │  master ⇒ deploy             │
                        └──────────────┬───────────────┘
                                       │
 ┌─────────────────────────────────────┴──────────────────────────────┐
 │ AWS (all provisioned via infra/ Terraform)                         │
 │                                                                    │
 │  Visitor ── CloudFront ──▶ S3 (static Next.js export)              │
 │      │        (OAC, edge URL rewrite, HTTPS)                       │
 │      │                                                             │
 │      └──── API Gateway (HTTP API, throttled, CORS-locked)          │
 │              ├── POST /waitlist ──▶ Lambda ──▶ DynamoDB `waitlist` │
 │              │                        └──▶ SES (notify Bagath)     │
 │              └── POST /chat ──────▶ Lambda ──▶ Claude model        │
 │                                       ├──▶ DynamoDB `chat_usage`   │
 │                                       │    (rate + budget caps)    │
 │                                       └──▶ Secrets Manager (key)*  │
 │                                                                    │
 │  CloudWatch: alarms on 5xx / Lambda errors / budget threshold      │
 └────────────────────────────────────────────────────────────────────┘
   * or IAM-only via Amazon Bedrock — see Decision D2
```

## Components

### Frontend (exists today)
Next.js 15 static export · Tailwind · persona switch (engineer/athlete)
via CSS-variable theming · all copy in `content/site.ts`. New in v1:
waitlist form component and chat widget, both calling the API via
`NEXT_PUBLIC_API_BASE_URL`.

### Hosting (Terraform written, not yet applied)
Private S3 + CloudFront with OAC and a CloudFront Function rewriting
directory URLs. v1 launches on the `*.cloudfront.net` URL; custom domain
is a v1.1 story (aliases + ACM variables already supported in the module).

### Waitlist service (new)
- **API**: API Gateway HTTP API, `POST /waitlist`, CORS locked to the
  site origin, throttling (burst 5 / rate 2 rps).
- **Lambda** (Python 3.12): validate email, honeypot field check,
  idempotent put.
- **DynamoDB** `waitlist`: pk = email, attrs: name, source persona,
  created_at. On-demand billing.
- **SES**: notification email to Bagath per signup (identity must be
  verified once — user task).

### AI agent service (new)
- **API**: `POST /chat` on the same HTTP API, same CORS, tighter
  throttle.
- **Lambda** (Python 3.12): system prompt built from `content/site.ts`
  facts (exported to JSON at build time), persona-aware (engineer vs
  fitness context), short conversation window sent from the client.
- **Model**: decision D2 (below). Non-streaming for v1 — answers are
  short; streaming is a v1.1 upgrade.
- **Cost controls** (hard requirement, this is a public endpoint):
  - API Gateway throttling (burst 3 / rate 1 rps)
  - Per-IP daily message cap in DynamoDB `chat_usage`
  - Global daily budget counter — Lambda refuses politely once the
    day's token budget is spent
  - `max_tokens` clamp, short context window, kill-switch env var
- **Guardrails**: scoped system prompt (portfolio/fitness topics only),
  input length limit, no tool use in v1.

### Observability
CloudWatch alarms → SNS → email: API 5xx rate, Lambda error count,
chat budget 80% threshold. CloudFront standard logs to a logs bucket.

### CI/CD
One workflow: lint → typecheck/tests (Playwright smoke) → build →
Lighthouse budget → `terraform fmt/validate` → on master: terraform
plan (apply manual at first), S3 sync + CloudFront invalidation, then
Lambda packaging + update.

## Decisions

| # | Decision | Status |
|---|---|---|
| D1 | v1 ships on the CloudFront URL; custom domain in v1.1 | ✅ decided |
| D2 | Model provider: **Amazon Bedrock** (IAM-only, no API key, AWS-native — on-brand) vs **Claude API direct** (first-party pricing & features, needs a key in Secrets Manager). Candidate models at current first-party pricing: Claude Haiku 4.5 (`claude-haiku-4-5`, $1/$5 per MTok — cheap public traffic), Claude Sonnet 5 (`claude-sonnet-5`, $2/$10), Claude Opus 5 (`claude-opus-5`, $5/$25 — best quality). Bedrock prices these separately. | 🔶 spike E3-S1 |
| D3 | Terraform state: S3 backend + DynamoDB lock table, bootstrapped manually once | ✅ decided |
| D4 | Analytics: CloudFront logs only for v1 (privacy-friendly, zero cost); product analytics revisited in v1.1 | ✅ decided |

## Cost envelope (monthly, low traffic)

| Item | Estimate |
|---|---|
| S3 + CloudFront | < $1 |
| API GW + Lambda + DynamoDB + SES | < $1 |
| Chat model usage | capped by budget counter — default cap ≈ $5/mo |
| **Total** | **≈ $5–7/mo** |
