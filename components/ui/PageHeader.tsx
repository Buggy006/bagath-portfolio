import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
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

  const intro = (
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
  )

  const metaList = meta?.length ? (
    <dl className="grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
      {meta.map((row) => (
        <div key={row.label} className="bg-ink px-5 py-4">
          <dt className="label mb-1.5 text-[0.625rem]">{row.label}</dt>
          <dd className="font-display text-sm text-bone">{row.value}</dd>
        </div>
      ))}
    </dl>
  ) : null

  return (
    <section className="relative isolate overflow-hidden border-b border-hairline">
      <GridBackdrop />
      <div className="shell relative py-20 sm:py-28 lg:py-32">
        {aside ? (
          /*
           * With a companion column the three blocks are ordered for mobile in
           * the DOM - intro, aside, then meta - so the portrait sits with the
           * text it belongs to rather than after the facts card. From `lg` the
           * same three blocks are placed explicitly: intro and meta stack in
           * column one, the aside spans both rows beside them. No duplicated
           * markup and no `order` overrides.
           */
          <div className="flex flex-col gap-10 sm:gap-12 lg:grid lg:grid-cols-[1fr_0.46fr] lg:items-center lg:gap-x-16 lg:gap-y-12">
            <div className="lg:col-start-1 lg:row-start-1">{intro}</div>

            <Reveal immediate delay={0.18} className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              {aside}
            </Reveal>

            {metaList ? (
              <Reveal immediate delay={0.12} className="lg:col-start-1 lg:row-start-2">
                {metaList}
              </Reveal>
            ) : null}
          </div>
        ) : (
          <>
            {intro}
            {metaList ? (
              <Reveal immediate delay={0.12} className="mt-12">
                {metaList}
              </Reveal>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
