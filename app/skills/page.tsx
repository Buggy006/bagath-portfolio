import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { skillGroups } from '@/content/skills'
import { pageOpenGraph, siteConfig } from '@/content/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Cloud, infrastructure, data, AI and backend capabilities - grouped by engineering domain rather than scored.',
  alternates: { canonical: '/skills' },
  openGraph: pageOpenGraph({
    title: 'Skills',
    description: 'Cloud, infrastructure, data, AI and backend engineering capabilities.',
    path: '/skills',
  }),
}

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Grouped by domain, not ranked out of ten."
        description="Proficiency bars invite invention. This is an inventory of what I work with, organised the way the work is actually organised. Highlighted entries are what I reach for first."
        meta={[
          { label: 'Domains', value: String(skillGroups.length) },
          { label: 'Primary cloud', value: 'AWS' },
          { label: 'Languages', value: 'TypeScript · Python · SQL' },
        ]}
      />

      <Section aria-labelledby="skills-heading" className="pt-16 sm:pt-20">
        <SectionHeading
          id="skills-heading"
          eyebrow="Capability map"
          title="What I build with."
          description="A highlighted entry means I use it regularly and would be comfortable being the person responsible for it on a team."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.08}>
          {skillGroups.map((group) => {
            const Icon = group.icon
            return (
              <RevealItem
                key={group.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-7 transition-colors duration-200 hover:border-bone/20 sm:p-9"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-bone/[0.03]">
                    <Icon aria-hidden className="h-5 w-5 text-signal" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-tight text-bone">{group.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{group.description}</p>
                  </div>
                </div>

                <ul className="mt-8 flex flex-wrap gap-2 border-t border-hairline pt-7">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-xs tracking-wide transition-colors duration-300',
                        skill.focus
                          ? 'border border-signal/35 bg-signal/[0.08] text-bone'
                          : 'bg-bone/[0.05] text-muted',
                      )}
                    >
                      {skill.name}
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

        <Reveal delay={0.1} className="mt-10">
          <p className="flex items-center gap-3 text-xs text-muted">
            <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full border border-signal/35 bg-signal/[0.08]" />
            Highlighted - used regularly and comfortable owning.
          </p>
        </Reveal>
      </Section>

      <ContactCTA />
    </>
  )
}
