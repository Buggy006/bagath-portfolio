import { Section } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { FlowDiagram } from '@/components/visuals/FlowDiagram'

/**
 * Copy lives in constants rather than inline JSX so that typographic
 * punctuation (’) stays readable in source and never trips
 * `react/no-unescaped-entities`.
 */
const INTRO_PARAGRAPHS = [
  'Most systems work on a laptop, with clean data and the right conditions. Engineering starts when they need to be reproducible, deployed by someone else, resilient to change, and maintainable long after the first release.',
  'That’s where I focus: infrastructure built from code, pipelines designed to be repeatable, data systems that evolve without breaking everything around them, and software that makes its behaviour clear.',
]

/** Each principle is a claim plus the practice that backs it up. */
const PRINCIPLES = [
  {
    title: 'Infrastructure is defined, not improvised.',
    detail: 'Reproducible environments. Declarative infrastructure. Predictable deployments.',
  },
  {
    title: 'Data should be traceable, not overwritten.',
    detail: 'Preserve source data. Track transformations. Make pipelines repeatable.',
  },
  {
    title: 'Intelligence should be engineered, not bolted on.',
    detail:
      'Integrate AI into systems with clear boundaries, observable behaviour and meaningful outputs.',
  },
  {
    title: 'Failures should be contained, not contagious.',
    detail: 'Design for observability, recovery and resilience at every stage.',
  },
]

const SHAPE_OF_WORK = [
  { label: 'Infrastructure', detail: 'AWS defined in Terraform - reviewable, reproducible, destroyable.' },
  { label: 'Ingestion', detail: 'Idempotent Python jobs that are safe to run twice and safe to replay.' },
  { label: 'Storage', detail: 'Open table formats with atomic commits and schema evolution.' },
  { label: 'Enrichment', detail: 'Queued model work, kept off the critical path and recorded with its prompt.' },
  { label: 'Interface', detail: 'Fast, accessible surfaces that make the result queryable by a person.' },
]

export function Introduction() {
  return (
    <Section aria-labelledby="intro-heading" className="border-t border-hairline">
      <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <Reveal>
          <p className="label mb-6 flex items-center gap-3">
            <span aria-hidden className="inline-block h-px w-8 bg-signal" />
            Introduction
          </p>
          <h2 id="intro-heading" className="font-display text-display-md text-balance text-bone">
            I care about the part of the system that is still working in a year.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-muted">
            {INTRO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Stagger className="space-y-3" stagger={0.07}>
          {PRINCIPLES.map((principle, i) => (
            <RevealItem
              key={principle.title}
              className="flex items-start gap-4 rounded-xl border border-hairline bg-surface/40 px-5 py-4 transition-colors duration-200 hover:border-signal/30"
            >
              <span className="label mt-0.5 shrink-0 text-[0.625rem] text-signal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-display text-sm leading-snug text-bone">{principle.title}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{principle.detail}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <h3 className="label mb-5">The shape of the work</h3>
        <FlowDiagram
          stages={SHAPE_OF_WORK}
          caption="Select a stage to read what it involves. The diagram is interactive and keyboard navigable."
        />
      </Reveal>
    </Section>
  )
}
