# Buggy - Engineering Portfolio

Personal portfolio for **Bagath Singh** - Cloud Platform, Data and AI Engineer.

> I build systems at the intersection of Cloud, Data & AI.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 with a custom design-token theme |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Content | Structured, typed TypeScript modules in `content/` |

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

```bash
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm start          # serve the production build
```

## Configuration

Copy `.env.example` to `.env.local` and set the deployed origin:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain
```

This value drives canonical URLs, Open Graph metadata, `robots.txt` and
`sitemap.xml`. Without it the build falls back to the default in
`content/site.ts`, so builds never break - but production should set it.

## Project structure

```
app/                     Routes, layout, metadata, OG images, sitemap, robots
  layout.tsx             Fonts, global metadata, JSON-LD, header/footer shell
  template.tsx           Per-route enter transition
  page.tsx               Home
  about/ projects/ skills/ experience/ contact/
  projects/[slug]/       Statically generated case studies
  error.tsx loading.tsx not-found.tsx
components/
  layout/                Header, footer
  ui/                    Section, PageHeader, Reveal, Tag, ButtonLink
  sections/              Home-page sections
  projects/              Project card
  visuals/               Grid backdrop, pointer glow, animated flow diagram
content/                 Single source of truth for all copy and data
lib/                     cn() helper, shared motion vocabulary
```

## Editing content

All user-facing copy lives in `content/` - no strings are hard-coded in
components.

| File | Holds |
| --- | --- |
| `content/site.ts` | Name, role, tagline, navigation, social links, site URL |
| `content/projects.ts` | Case studies (typed - every project must be complete) |
| `content/experience.ts` | Professional timeline |
| `content/skills.ts` | Skill groups and home-page engineering domains |
| `content/about.ts` | About-page narrative and philosophy |

### Adding a project

Append a `Project` object to `content/projects.ts`. The type requires every
section, so TypeScript will refuse an incomplete case study. The route,
`generateStaticParams`, the sitemap entry and the Open Graph image are all
derived automatically.

### Adding an email address

`siteConfig.email` is `null` by default and the UI omits the channel entirely
rather than rendering a dead `mailto:` link. Set it in `content/site.ts` and it
appears in the footer, the contact page and the home-page CTA.

## Content policy

This site deliberately contains no invented metrics, fabricated testimonials or
exaggerated experience. Anything not running in production is labelled
`Prototype` and surfaced as such in the UI. Descriptions of employed work are
limited to publicly describable technologies and general engineering practice -
no internal project names, datasets, dashboards, architecture specifics or
performance figures.

## Accessibility & performance notes

- Semantic landmarks, a skip link, visible focus rings and `aria-current` on
  navigation.
- Every animation honours `prefers-reduced-motion`, both in CSS and through
  Framer Motion's `useReducedMotion`.
- Server Components by default; only five leaf components opt into the client.
- Fonts are self-hosted by `next/font` with `display: swap`.
- The pointer-responsive backdrop writes CSS custom properties from a
  rAF-throttled listener, so cursor movement triggers no React re-render, and is
  skipped entirely on coarse pointers and under reduced motion.
