import { Section } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { FlowDiagram } from '@/components/visuals/FlowDiagram'

const PRINCIPLES = [
  'Environments are rebuilt, not repaired.',
  'Raw data is written once and never edited.',
  'Model output is versioned data, not a side effect.',
  'Failure stays local to the stage that caused it.',
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
            <p>
              Almost anything works once, on a laptop, with a clean dataset. The engineering begins when it has to
              run twice, be deployed by someone else, survive a schema change, and still be understandable to the
              person who inherits it.
            </p>
            <p>
              So my work tends to concentrate in the same places: infrastructure you can recreate from source,
              pipelines that are safe to re-run, storage that tolerates change, and interfaces honest about what
              they are showing.
            </p>
          </div>
        </Reveal>

        <Stagger className="space-y-3" stagger={0.07}>
          {PRINCIPLES.map((principle, i) => (
            <RevealItem
              key={principle}
              className="flex items-start gap-4 rounded-xl border border-hairline bg-surface/40 px-5 py-4 transition-colors duration-500 hover:border-signal/30"
            >
              <span className="label mt-0.5 shrink-0 text-[0.625rem] text-signal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm leading-relaxed text-bone/85">{principle}</p>
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
