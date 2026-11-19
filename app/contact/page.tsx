import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { getSocialLinks, pageOpenGraph, siteConfig } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${siteConfig.fullName} about cloud platform, data engineering and AI engineering roles.`,
  alternates: { canonical: '/contact' },
  openGraph: pageOpenGraph({
    title: 'Contact',
    description: 'GitHub, LinkedIn and email.',
    path: '/contact',
  }),
}

const LOOKING_FOR_LEAD = 'Backend engineering at the intersection of cloud, data and AI.'

const LOOKING_FOR_INTRO =
  'I’m interested in building robust backend systems, designing scalable APIs and services, and working on the infrastructure and data platforms that power modern applications.'

/** Ordered deliberately: backend first, then the systems it sits across. */
const FOCUS_AREAS = [
  {
    title: 'Backend Engineering',
    detail: 'Python, API design, distributed systems, asynchronous processing and reliable backend services.',
  },
  {
    title: 'Cloud & Platform Engineering',
    detail: 'AWS, Infrastructure as Code, containers, CI/CD and cloud-native platform automation.',
  },
  {
    title: 'Data Engineering',
    detail: 'Data pipelines, lakehouse architectures, analytical platforms and reliable data infrastructure.',
  },
  {
    title: 'AI Engineering',
    detail: 'LLM-powered applications, agentic workflows, retrieval systems and practical AI integrations.',
  },
]

const LOOKING_FOR_CLOSING =
  'Open to full-time opportunities · Collaborative engineering teams · International opportunities'

export default function ContactPage() {
  const socials = getSocialLinks()
  const hasEmail = Boolean(siteConfig.email)

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you're building."
        description="Email or LinkedIn both reach me directly. My code is public on GitHub if you would rather read something before writing anything."
        meta={[
          { label: 'Based in', value: siteConfig.location },
          { label: 'Open to', value: 'Full-time roles' },
          { label: 'Focus', value: 'Cloud · Data · AI' },
        ]}
      />

      <Section aria-labelledby="channels-heading" className="pt-16 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <h2 id="channels-heading" className="label mb-8">
              Channels
            </h2>

            <Stagger className="space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline" stagger={0.08}>
              {socials.map((social) => {
                const Icon = social.icon
                const isMail = social.href.startsWith('mailto:')
                return (
                  <RevealItem key={social.label}>
                    <a
                      href={social.href}
                      target={isMail ? undefined : '_blank'}
                      rel={isMail ? undefined : 'noopener noreferrer'}
                      className="group flex items-center gap-5 bg-ink px-6 py-7 transition-colors duration-200 hover:bg-surface sm:px-8"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-bone/[0.03] transition-colors duration-200 group-hover:border-signal/40">
                        <Icon aria-hidden className="h-5 w-5 text-signal" strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg tracking-tight text-bone">{social.label}</span>
                        <span className="block truncate text-sm text-muted">{social.handle}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="h-5 w-5 shrink-0 text-muted transition-all duration-200 ease-editorial group-hover:text-signal motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                      />
                    </a>
                  </RevealItem>
                )
              })}
            </Stagger>

            {!hasEmail ? (
              <Reveal delay={0.1}>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  A direct email address is not published here yet. LinkedIn messages reach me reliably, and I am
                  happy to continue over email from there.
                </p>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.12}>
            <h2 className="label mb-6">What I am looking for</h2>

            <p className="font-display text-lg leading-snug tracking-tight text-bone sm:text-xl">
              {LOOKING_FOR_LEAD}
            </p>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{LOOKING_FOR_INTRO}</p>

            <ul className="mt-8 space-y-5">
              {FOCUS_AREAS.map((area, i) => (
                <li key={area.title} className="flex gap-4 border-b border-hairline pb-5 last:border-0">
                  <span className="label mt-0.5 shrink-0 text-[0.625rem] text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display text-sm leading-snug text-bone">{area.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{area.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-xs leading-relaxed text-muted">{LOOKING_FOR_CLOSING}</p>

            <div className="mt-10 rounded-xl border border-hairline bg-surface/40 p-6">
              <p className="text-sm leading-relaxed text-muted">
                <span className="text-bone">If you are hiring:</span> the project case studies are written to be
                read by engineers. They cover architecture and trade-offs rather than screenshots, which is
                probably a faster way to assess me than a call.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
