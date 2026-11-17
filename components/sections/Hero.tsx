'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { siteConfig } from '@/content/site'
import { EASE_EDITORIAL } from '@/lib/motion'
import { GridBackdrop } from '@/components/visuals/GridBackdrop'
import { ButtonLink } from '@/components/ui/ButtonLink'

/**
 * Revealed word by word rather than line by line: hard-coded lines orphan words
 * at narrow widths, whereas words reflow naturally and the measure is controlled
 * by a `ch`-based max-width instead.
 */
const TAGLINE_WORDS = siteConfig.tagline.split(' ')

const COORDINATES = [
  { label: 'Domain', value: siteConfig.disciplines.join(' · ') },
  { label: 'Primary cloud', value: 'AWS' },
  { label: 'Based in', value: siteConfig.location },
]

export function Hero() {
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0.02 : 0.09, delayChildren: reduced ? 0 : 0.12 } },
  }

  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.25 : 0.85, ease: EASE_EDITORIAL } },
  }

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      <GridBackdrop />

      <div className="shell relative flex min-h-[calc(100svh-5rem)] flex-col justify-center py-24 sm:py-28">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="label flex flex-wrap items-center gap-x-3 gap-y-2">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            {siteConfig.title}
            <span aria-hidden className="h-3 w-px bg-hairline" />
            {siteConfig.location}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 font-display text-lg tracking-tight text-bone sm:text-xl"
          >
            {siteConfig.introName}
          </motion.p>

          <motion.ul variants={item} className="mb-9 mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            {siteConfig.disciplines.map((discipline, i) => (
              <li key={discipline} className="flex items-center gap-3">
                {i > 0 ? <span aria-hidden className="h-1 w-1 rounded-full bg-signal" /> : null}
                <span className="label text-[0.6875rem] text-muted">{discipline}</span>
              </li>
            ))}
          </motion.ul>

          <h1
            id="hero-heading"
            className="max-w-[15ch] font-display text-display-xl text-bone sm:max-w-[17ch]"
          >
            <span className="sr-only">{siteConfig.tagline}</span>
            <span aria-hidden className="flex flex-wrap gap-x-[0.26em]">
              {TAGLINE_WORDS.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  // Mask for the slide-up. The padding/negative-margin pair gives
                  // ascenders and descenders room so the mask never clips them.
                  className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]"
                >
                  <motion.span
                    variants={{
                      hidden: { y: reduced ? 0 : '110%', opacity: reduced ? 0 : 1 },
                      show: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: reduced ? 0.25 : 0.8, ease: EASE_EDITORIAL },
                      },
                    }}
                    className={word === '&' ? 'inline-block text-signal' : 'inline-block'}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p variants={item} className="mt-10 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.description}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/projects">View selected work</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-16 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3"
          >
            {COORDINATES.map((coordinate) => (
              <div key={coordinate.label} className="bg-ink px-5 py-4">
                <dt className="label mb-1.5 text-[0.625rem]">{coordinate.label}</dt>
                <dd className="font-display text-sm text-bone">{coordinate.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 1.4, duration: 0.8 }}
          className="pointer-events-none absolute bottom-8 right-5 hidden items-center gap-3 sm:right-8 lg:flex lg:px-4"
        >
          <span className="label text-[0.625rem]">Scroll</span>
          <ArrowDown aria-hidden className="h-4 w-4 text-muted motion-safe:animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
