# Roadmap — v1.0 "December Launch"

**Target: v1.0 live by December 15, 2026.**
Stories are GitHub issues titled `[E#-S#]`. One story = one branch =
one PR with green CI. Master is always releasable.

> **Re-scope 2026-09-28**: the AI fitness agent moved out to its own
> future product (spec parked in `docs/FITNESS_AGENT.md`; issues #9–12
> closed). Portfolio v1 gains project case-study pages (E6) and a
> design polish pass (E7). The waitlist stays in the portfolio.

## Working agreement

- **Cadence**: two-week sprints; Claude builds, Bagath reviews PRs and
  owns product decisions + the stories marked 👤.
- **Definition of Done**: acceptance criteria met · CI green ·
  deployed (once infra is live) · screenshot or curl proof in the PR ·
  docs updated · no new placeholders · tests land with the feature.
- **Scope control**: anything new goes to the v1.1 backlog unless it
  displaces something of equal size. The December date wins fights.

## Sprint calendar

| Sprint | Dates | Goal |
|---|---|---|
| S0 Kickoff | Sep 29 – Oct 3 | Baseline on master; AWS account + secrets ready 👤 |
| S1 Foundation | Oct 6 – Oct 17 | Site live on CloudFront URL via CI |
| S2 (freed) | Oct 20 – Oct 31 | Case studies start early / buffer |
| S3 Case studies | Nov 3 – Nov 14 | /projects/* pages live with real write-ups |
| S4 Polish & rails | Nov 17 – Nov 28 | Design polish; tests, Lighthouse, alarms; final content 👤 |
| Hardening | Dec 1 – Dec 12 | Bug bash, polish, launch checklist |
| **Launch** | **≈ Dec 15** | v1.0 tag, announcement 🎉 |

## Epics → stories

### E1 — Production foundation (Sprint 0–1) — issues #1–5
Unchanged: baseline merge · 👤 AWS setup · remote state · apply infra ·
CI auto-deploy.

### ~~E2 — Fitness waitlist~~ → removed from v1 (2026-09-30)
Coaching is ~3 months out; the mailto CTA stays for v1. The finished
implementation (Lambda + tests + Terraform + form) is preserved at
commit `facedc5` and earmarked for the fitness product — see
docs/FITNESS_AGENT.md. Issues #6–8 closed.

### ~~E3 — AI agent~~ → moved to the fitness product
Issues #9–12 closed as not-planned here. See `docs/FITNESS_AGENT.md`.

### E4 — Quality & observability (Sprint 4) — issues #13–16
Playwright smoke · Lighthouse budgets · terraform checks in CI ·
CloudWatch alarms. (Chat-related assertions dropped from #13's scope.)

### E5 — Content & launch (Sprint 4 → launch) — issues #17–19
👤 Final content · SEO/OG + resume PDF · launch checklist + v1.0.

### E6 — Project case-study pages (Sprint 3) — NEW
- E6-S1 Case-study architecture: `/projects/[slug]` static routes + content model
- E6-S2 Case study: This Website (architecture diagram, decisions, pipeline)
- E6-S3 Case studies: Serverless Infrastructure Setup + Enterprise Analytics Platform (sanitized)

### E8 — Live GitHub activity card (Sprint 3) — NEW (decided 2026-09-30)
- E8-S1 Client-side card on the engineer page: latest public repos/commits
  from the GitHub API ("what I'm building now"), cached in sessionStorage,
  graceful when rate-limited. No backend, no cost.

### E7 — Design polish pass (Sprint 4) — NEW
- E7-S1 Motion & micro-interactions: staggered reveals, hover/press states, section transitions (reduced-motion respected)
- E7-S2 Typography, spacing & visual QA sweep across personas, breakpoints, and case-study pages

## v1.1 backlog (not December)
Contact form backend (POST /contact → SES) · visitor counter ·
testimonials section · custom domain + ACM · blog/notes · dark mode ·
product analytics · photo/gallery treatment · fitness agent (separate
product).

> Feature-cut decision 2026-09-30: of the candidate v1 additions, only
> the GitHub activity card made the cut; everything else above waits.
