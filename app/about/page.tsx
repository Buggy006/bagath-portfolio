import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { ContactCTA } from '@/components/sections/ContactCTA'
import {
  aboutIntro,
  journey,
  journeyIntro,
  philosophy,
  philosophyIntro,
  workingWith,
  workingWithClosing,
  workingWithIntro,
} from '@/content/about'
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
        title="An engineer working across cloud, data and AI."
        description={aboutIntro}
        meta={[
          { label: 'Name', value: siteConfig.fullName },
          { label: 'Focus', value: 'Cloud · Data · AI' },
          { label: 'Based in', value: siteConfig.location },
        ]}
        aside={
          /*
           * Native 3:4 portrait rendered at its own aspect ratio, so `cover`
           * has nothing to crop - no risk of clipping the frame, and no need
           * for an object-position correction.
           *
           * On phones it is centred at 72% of the content width and capped at
           * 340px, which keeps it clearly secondary to the headline instead of
           * filling the viewport. From `lg` it fills its grid column.
           */
          <div className="mx-auto w-[72%] max-w-[340px] overflow-hidden rounded-2xl border border-hairline bg-surface/40 lg:mx-0 lg:w-full lg:max-w-none">
            <Image
              src="/bagath-singh.jpg"
              alt={siteConfig.fullName}
              width={1086}
              height={1448}
              priority
              sizes="(min-width: 1024px) 32vw, 72vw"
              className="aspect-[3/4] h-full w-full object-cover object-center"
            />
          </div>
        }
      />

      <Section aria-labelledby="journey-heading" className="pt-16 sm:pt-20">
        <SectionHeading
          id="journey-heading"
          eyebrow="Professional journey"
          title="How the focus evolved."
          description={journeyIntro}
        />

        <Stagger className="mt-14 space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
          {journey.map((stage, index) => (
            <RevealItem key={stage.title} className="bg-ink p-7 transition-colors duration-200 hover:bg-surface sm:p-10">
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
          title="Principles that shape how I engineer software."
          description={philosophyIntro}
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.08}>
          {philosophy.map((item, index) => (
            <RevealItem
              key={item.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-7 transition-colors duration-200 hover:border-bone/20 sm:p-9"
            >
              <div className="flex items-center gap-3">
                <span className="label text-[0.625rem] text-signal">{String(index + 1).padStart(2, '0')}</span>
                <span aria-hidden className="h-3 w-px bg-hairline" />
                <span className="label text-[0.5625rem] text-muted/70">{item.category}</span>
              </div>
              <h3 className="mt-5 font-display text-lg leading-snug tracking-tight text-bone sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 ease-editorial group-hover:scale-x-100"
              />
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      <Section aria-labelledby="working-heading" className="border-t border-hairline">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="working-heading"
            eyebrow="Working together"
            title="What I am like to work with."
            description={workingWithIntro}
          />
          <Reveal delay={0.1}>
            <ul className="space-y-5">
              {workingWith.map((line) => (
                <li key={line} className="flex gap-4 border-b border-hairline pb-5 last:border-0">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{line}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-prose text-sm leading-relaxed text-bone/85 sm:text-base">
              {workingWithClosing}
            </p>
          </Reveal>
        </div>
      </Section>

      <ContactCTA />
    </>
  )
}
