import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { GridBackdrop } from '@/components/visuals/GridBackdrop'

/** Shared masthead for every non-home route: one consistent entry rhythm. */
export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
  aside,
}: {
  eyebrow: string
  title: string
  /** A string renders one paragraph; an array renders several. */
  description?: string | string[]
  meta?: { label: string; value: string }[]
  /** Optional companion column (e.g. a portrait). Absent, the masthead is unchanged. */
  aside?: ReactNode
}) {
  const paragraphs = typeof description === 'string' ? [description] : (description ?? [])
  return (
    <section className="relative isolate overflow-hidden border-b border-hairline">
      <GridBackdrop />
      <div className="shell relative py-20 sm:py-28 lg:py-32">
        <div className={cn(aside && 'grid items-center gap-12 lg:grid-cols-[1fr_0.46fr] lg:gap-16')}>
          <div>
            <Reveal immediate>
              <p className="label mb-6 flex items-center gap-3">
                <span aria-hidden className="inline-block h-px w-8 bg-signal" />
                {eyebrow}
              </p>
              <h1 className="max-w-4xl font-display text-display-lg text-balance text-bone">{title}</h1>
              {paragraphs.length ? (
                <div className="mt-7 max-w-prose space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
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

          {aside ? (
            <Reveal immediate delay={0.18}>
              {aside}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
