import { Section, SectionHeading } from '@/components/ui/Section'
import { Stagger, RevealItem } from '@/components/ui/Reveal'
import { domains } from '@/content/skills'

export function Domains() {
  return (
    <Section aria-labelledby="domains-heading" className="relative border-t border-hairline">
      <SectionHeading
        id="domains-heading"
        eyebrow="Engineering domains"
        title="Systems, data and intelligence."
        description="I build across cloud infrastructure, data platforms and AI — from the environments that run applications to the pipelines and agents that make them useful."
      />

      <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
        {domains.map((domain) => {
          const Icon = domain.icon
          return (
            <RevealItem key={domain.id} className="group relative flex h-full flex-col bg-ink p-7 transition-colors duration-200 hover:bg-surface sm:p-9">
              <div className="flex items-start justify-between">
                <Icon aria-hidden className="h-6 w-6 text-signal" strokeWidth={1.5} />
                <span className="label text-[0.625rem]">{domain.index}</span>
              </div>

              <h3 className="mt-8 font-display text-xl tracking-tight text-bone">{domain.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone/80">{domain.statement}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{domain.detail}</p>

              <ul className="mt-auto flex flex-wrap gap-1.5 pt-7">
                {domain.keywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="rounded-full bg-bone/[0.05] px-2.5 py-1 text-[0.6875rem] tracking-wide text-muted transition-colors duration-200 group-hover:text-bone/70"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>

              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 ease-editorial group-hover:scale-x-100"
              />
            </RevealItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
