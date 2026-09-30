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
 │  CloudWatch: alarms per E4 (CloudFront metrics)                    │
 └────────────────────────────────────────────────────────────────────┘
```

## Components

### Frontend (exists today)
Next.js 15 static export · Tailwind · persona switch (engineer/athlete)
via CSS-variable theming · all copy in `content/site.ts`. New in v1:
waitlist form component calling the API via `NEXT_PUBLIC_API_BASE_URL`,
and project case-study pages under `/projects/[slug]` (static routes
from a content model, same single-source-of-truth pattern).

### Hosting (Terraform written, not yet applied)
Private S3 + CloudFront with OAC and a CloudFront Function rewriting
directory URLs. v1 launches on the `*.cloudfront.net` URL; custom domain
is a v1.1 story (aliases + ACM variables already supported in the module).

### Waitlist service — removed from v1 (2026-09-30)
Coaching launches ~3 months out; v1 keeps the mailto CTA. The complete
implementation is preserved at commit `facedc5` for the fitness
product (docs/FITNESS_AGENT.md). v1 is a fully static site.

### AI agent — moved out (2026-09-28)
The fitness chat agent is a separate future product with its own repo
and roadmap. The drafted design is parked in `docs/FITNESS_AGENT.md`.
The portfolio keeps only the marketing surface for it (athlete mode +
under-construction badge + waitlist).

### Observability
CloudWatch alarms → SNS → email: API 5xx rate, Lambda error count.
CloudFront standard logs to a logs bucket.

### CI/CD
One workflow: lint → typecheck/tests (Playwright smoke) → build →
Lighthouse budget → `terraform fmt/validate` → on master: terraform
plan (apply manual at first), S3 sync + CloudFront invalidation, then
Lambda packaging + update.

## Decisions

| # | Decision | Status |
|---|---|---|
| D1 | v1 ships on the CloudFront URL; custom domain in v1.1 | ✅ decided |
| D2 | Model/provider for the chat agent | ➡️ moved to the fitness product (docs/FITNESS_AGENT.md) |
| D3 | Terraform state: S3 backend + DynamoDB lock table, bootstrapped manually once | ✅ decided |
| D4 | Analytics: CloudFront logs only for v1 (privacy-friendly, zero cost); product analytics revisited in v1.1 | ✅ decided |

## Cost envelope (monthly, low traffic)

| Item | Estimate |
|---|---|
| S3 + CloudFront | < $1 |
| API GW + Lambda + DynamoDB + SES | < $1 |
| **Total** | **≈ $1–2/mo** |
