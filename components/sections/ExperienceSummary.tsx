import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { experience, experienceSummary } from '@/content/experience'

export function ExperienceSummary() {
  return (
    <Section aria-labelledby="experience-summary-heading" className="border-t border-hairline">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="experience-summary-heading"
            eyebrow="Experience"
            title="Enterprise practice, independent range."
            description="I work on cloud and data engineering inside a large engineering organisation, and build complete systems of my own outside it. The two inform each other."
          />

          <Reveal delay={0.1}>
            <dl className="mt-10 space-y-px overflow-hidden rounded-xl border border-hairline bg-hairline">
              {experienceSummary.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 bg-ink px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <dt className="label text-[0.625rem]">{row.label}</dt>
                  <dd className="text-sm text-bone sm:text-right">{row.value}</dd>
                </div>
              ))}
            </dl>

            <Link href="/experience" className="link-underline mt-8 inline-flex text-sm">
              Full timeline
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="space-y-4">
          {experience.map((item) => (
            <RevealItem
              key={item.id}
              className="rounded-2xl border border-hairline bg-surface/40 p-6 transition-colors duration-500 hover:border-bone/20 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-lg tracking-tight text-bone">{item.company}</h3>
                {item.current ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-0.5 text-[0.6875rem] text-signal">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
                    Current
                  </span>
                ) : null}
              </div>
              <p className="mt-1.5 text-sm text-muted">
                {item.role}
                {item.period ? ` · ${item.period}` : ''}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/75">{item.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
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
    </Section>
  )
}
