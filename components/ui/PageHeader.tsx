import { Reveal } from '@/components/ui/Reveal'
import { GridBackdrop } from '@/components/visuals/GridBackdrop'

/** Shared masthead for every non-home route: one consistent entry rhythm. */
export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string
  title: string
  description?: string
  meta?: { label: string; value: string }[]
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-hairline">
      <GridBackdrop />
      <div className="shell relative py-20 sm:py-28 lg:py-32">
        <Reveal immediate>
          <p className="label mb-6 flex items-center gap-3">
            <span aria-hidden className="inline-block h-px w-8 bg-signal" />
            {eyebrow}
          </p>
          <h1 className="max-w-4xl font-display text-display-lg text-balance text-bone">{title}</h1>
          {description ? (
            <p className="mt-7 max-w-prose text-base leading-relaxed text-muted sm:text-lg">{description}</p>
          ) : null}
        </Reveal>

        {meta?.length ? (
          <Reveal immediate delay={0.12}>
            <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
              {meta.map((row) => (
                <div key={row.label} className="bg-ink px-5 py-4">
                  <dt className="label mb-1.5 text-[0.625rem]">{row.label}</dt>
                  <dd className="font-display text-sm text-bone">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
