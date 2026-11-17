import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { experience } from '@/content/experience'
import { pageOpenGraph, siteConfig } from '@/content/site'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Professional timeline across cloud infrastructure and data engineering, plus independent full-stack and platform work.',
  alternates: { canonical: '/experience' },
  openGraph: pageOpenGraph({
    title: 'Experience',
    description: 'Professional timeline and engineering achievements.',
    path: '/experience',
  }),
}

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Where the practice comes from."
        description="Enterprise engineering alongside systems I own end to end. Entries describe technologies and engineering practice only - no proprietary details, internal systems or confidential architecture appear anywhere on this site."
        meta={[
          { label: 'Current', value: 'BMW TechWorks India' },
          { label: 'Discipline', value: 'Cloud & Data Engineering' },
          { label: 'Based in', value: siteConfig.location },
        ]}
      />

      <Section aria-labelledby="timeline-heading" className="pt-16 sm:pt-20">
        <SectionHeading
          id="timeline-heading"
          eyebrow="Timeline"
          title="Roles and what they involved."
        />

        <div className="relative mt-14">
          {/* Spine - decorative, hidden on mobile where entries stack flush. */}
          <span aria-hidden className="absolute left-[7px] top-2 hidden h-full w-px bg-hairline sm:block" />

          <Stagger className="space-y-12 sm:space-y-16" stagger={0.1}>
            {experience.map((item) => (
              <RevealItem key={item.id} className="relative sm:pl-12">
                <span
                  aria-hidden
                  className={`absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-2 sm:block ${
                    item.current ? 'border-signal bg-signal/25' : 'border-hairline bg-ink'
                  }`}
                />

                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl tracking-tight text-bone">{item.company}</h3>
                  {item.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-0.5 text-[0.6875rem] text-signal">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm text-muted">
                  {item.role}
                  {item.period ? ` · ${item.period}` : ''}
                  {item.location ? ` · ${item.location}` : ''}
                </p>

                <p className="mt-5 max-w-prose text-base leading-relaxed text-bone/85">{item.summary}</p>

                <ul className="mt-7 space-y-4 border-l border-hairline pl-6">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="relative text-sm leading-relaxed text-muted sm:text-base">
                      <span aria-hidden className="absolute -left-[25px] top-2.5 h-1.5 w-1.5 rounded-full bg-signal/70" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul className="mt-7 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <li key={tech} className="rounded-full bg-bone/[0.05] px-2.5 py-1 text-[0.6875rem] text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <p className="rounded-xl border border-hairline bg-surface/40 p-6 text-sm leading-relaxed text-muted">
            <span className="text-bone">A note on confidentiality.</span> Descriptions of employed work are
            limited to publicly describable technologies and general engineering practice. No internal project
            names, datasets, dashboards, architecture specifics or performance figures are published here. I am
            happy to discuss my work in appropriate depth in conversation, within the bounds of what I am
            permitted to share.
          </p>
        </Reveal>
      </Section>

      <ContactCTA />
    </>
  )
}
