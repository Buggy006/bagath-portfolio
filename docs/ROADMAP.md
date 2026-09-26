# Roadmap — v1.0 "December Launch"

**Target: v1.0 live by December 15, 2026.**
Stories are GitHub issues titled `[E#-S#]`. One story = one branch =
one PR with green CI. Master is always releasable.

## Working agreement

- **Cadence**: two-week sprints; Claude builds, Bagath reviews PRs and
  owns product decisions + the stories marked 👤.
- **Definition of Done**: acceptance criteria met · CI green ·
  deployed (once infra is live) · screenshot or curl proof in the PR ·
  docs updated · no new placeholders.
- **Scope control**: anything new goes to the v1.1 backlog unless it
  displaces something of equal size. The December date wins fights.

## Sprint calendar

| Sprint | Dates | Goal |
|---|---|---|
| S0 Kickoff | Sep 29 – Oct 3 | Baseline on master; AWS account + secrets ready 👤 |
| S1 Foundation | Oct 6 – Oct 17 | Site live on CloudFront URL via CI |
| S2 Waitlist | Oct 20 – Oct 31 | Real signups landing in DynamoDB + email notify |
| S3 AI Agent | Nov 3 – Nov 14 | Chat agent live behind rate + budget caps |
| S4 Hardening rails | Nov 17 – Nov 28 | Tests, Lighthouse, alarms; final real content 👤 |
| Hardening | Dec 1 – Dec 12 | Bug bash, polish, launch checklist |
| **Launch** | **≈ Dec 15** | v1.0 tag, announcement 🎉 |

## Epics → stories

### E1 — Production foundation (Sprint 0–1)
- E1-S1 Merge current branch to master (v0 baseline)
- E1-S2 👤 AWS account, IAM deploy user, GitHub secrets (guide: infra/README.md)
- E1-S3 Terraform remote state (S3 backend + DynamoDB lock)
- E1-S4 Apply prod infra; site live on CloudFront URL
- E1-S5 CI deploys master automatically; deploy proof in workflow summary

### E2 — Fitness waitlist (Sprint 2)
- E2-S1 Terraform: HTTP API + waitlist Lambda + DynamoDB + SES
- E2-S2 Waitlist form UI (coaching section + fitness teaser), validation + honeypot
- E2-S3 Signup notification email + simple export script; 👤 verify SES identity

### E3 — AI agent (Sprint 3) — headline feature
- E3-S1 Spike: model/provider decision (D2), cost model, prompt draft — 👤 sign-off
- E3-S2 Chat backend Lambda with rate limit, per-IP cap, daily budget cap, kill switch
- E3-S3 Chat widget UI, persona-aware (engineer ↔ fitness context)
- E3-S4 Guardrail pass: prompt-injection resistance, topic bounds, abuse test

### E4 — Quality & observability (Sprint 4)
- E4-S1 Playwright smoke suite in CI (both personas, waitlist stub, chat stub)
- E4-S2 Lighthouse CI budgets (performance ≥ 90, a11y ≥ 95)
- E4-S3 terraform fmt/validate + plan in CI
- E4-S4 CloudWatch alarms → email (API 5xx, Lambda errors, chat budget 80%)

### E5 — Content & launch (Sprint 4 → launch)
- E5-S1 👤 Final content: contact email, role dates, athlete story, photos
- E5-S2 SEO/OG pass: meta images, favicon/logo, sitemap, resume PDF
- E5-S3 Launch: checklist, v1.0 tag + release notes, announcement posts

## v1.1 backlog (not December)
Custom domain + ACM · streaming chat responses · blog/notes section ·
product analytics · coaching intake form v2 · agent tool use
(e.g. "ask about my GitHub repos" live data).
