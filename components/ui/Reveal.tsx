'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { EASE_EDITORIAL } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  /** Seconds of delay before the reveal starts. */
  delay?: number
  /** Travel distance in px. Ignored when the user prefers reduced motion. */
  y?: number
  className?: string
  as?: ElementType
  /** Renders immediately instead of waiting for the viewport (used in heroes). */
  immediate?: boolean
}

/**
 * Scroll-triggered reveal. One shared implementation so timing and easing stay
 * identical site-wide, and so `prefers-reduced-motion` is honoured in exactly
 * one place: when reduced, the element fades without translating.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = 'div',
  immediate = false,
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div'] ?? motion.div

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.25 : 0.7, ease: EASE_EDITORIAL, delay: reduced ? 0 : delay },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, margin: '-12% 0px -12% 0px' } })}
    >
      {children}
    </MotionTag>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  as?: ElementType
  immediate?: boolean
}

/** Parent that staggers any `RevealItem` descendants. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
  immediate = false,
}: StaggerProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div'] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0.02 : stagger, delayChildren: reduced ? 0 : delay } },
      }}
      {...(immediate
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, margin: '-10% 0px -10% 0px' } })}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({
  children,
  className,
  y = 18,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  y?: number
  as?: ElementType
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div'] ?? motion.div

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.25 : 0.65, ease: EASE_EDITORIAL } },
      }}
    >
      {children}
    </MotionTag>
  )
}
