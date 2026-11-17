import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { aboutIntro, journey, philosophy, workingWith } from '@/content/about'
import { pageOpenGraph, siteConfig } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description: `${siteConfig.fullName} - professional journey, engineering philosophy and how I approach building cloud, data and AI systems.`,
  alternates: { canonical: '/about' },
  openGraph: pageOpenGraph({
    title: 'About',
    description: 'Professional journey, engineering philosophy and background.',
    path: '/about',
  }),
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An engineer who works where infrastructure, data and models meet."
        description={aboutIntro[0]}
        meta={[
          { label: 'Name', value: siteConfig.fullName },
          { label: 'Focus', value: 'Cloud · Data · AI' },
          { label: 'Based in', value: siteConfig.location },
        ]}
      />

      <Section aria-labelledby="journey-heading" className="pt-16 sm:pt-20">
        <SectionHeading
          id="journey-heading"
          eyebrow="Professional journey"
          title="How the focus narrowed."
          description={aboutIntro[1]}
        />

        <Stagger className="mt-14 space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
          {journey.map((stage, index) => (
            <RevealItem key={stage.title} className="bg-ink p-7 transition-colors duration-500 hover:bg-surface sm:p-10">
              <div className="grid gap-5 lg:grid-cols-[0.35fr_1fr] lg:gap-12">
                <div>
                  <span className="label text-[0.625rem] text-signal">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-2 font-display text-sm text-muted">{stage.period}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-tight text-bone sm:text-2xl">{stage.title}</h3>
                  <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted sm:text-base">{stage.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      <Section aria-labelledby="philosophy-heading" className="border-t border-hairline">
        <SectionHeading
          id="philosophy-heading"
          eyebrow="Engineering philosophy"
          title="Opinions I have had to earn."
          description="None of these are abstract preferences. Each one is the residue of a system that was harder to operate than it needed to be."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.08}>
          {philosophy.map((item) => (
            <RevealItem
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-7 transition-colors duration-500 hover:border-bone/20 sm:p-9"
            >
              <h3 className="font-display text-lg tracking-tight text-bone">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-700 ease-editorial group-hover:scale-x-100"
              />
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      <Section aria-labelledby="working-heading" className="border-t border-hairline">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading id="working-heading" eyebrow="Working together" title="What I am like to work with." />
          <Reveal delay={0.1}>
            <ul className="space-y-5">
              {workingWith.map((line) => (
                <li key={line} className="flex gap-4 border-b border-hairline pb-5 last:border-0">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{line}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <ContactCTA />
    </>
  )
}
