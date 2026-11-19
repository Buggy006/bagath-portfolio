'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { createContext, useContext, type ElementType, type ReactNode } from 'react'
import { DURATION, EASE_EDITORIAL, REVEAL_Y } from '@/lib/motion'
import { useEntrance } from '@/lib/use-entrance'

/**
 * Lets `RevealItem` know whether its `Stagger` parent armed its hidden state.
 * Defaults to `false`, so an item that somehow renders without a parent stays
 * visible rather than invisible.
 */
const StaggerArmedContext = createContext(false)

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
 *
 * The hidden state is applied only once `useEntrance` has armed it on the
 * client - see that hook for why content is never hidden by default.
 */
export function Reveal({
  children,
  delay = 0,
  y = REVEAL_Y,
  className,
  as = 'div',
  immediate = false,
}: RevealProps) {
  const reduced = useReducedMotion()
  const { ref, armed } = useEntrance<HTMLDivElement>()
  const MotionTag = motion[as as 'div'] ?? motion.div

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? DURATION.reduced : DURATION.reveal,
        ease: EASE_EDITORIAL,
        delay: reduced ? 0 : delay,
      },
    },
  }

  const animation = armed
    ? {
        variants,
        initial: 'hidden' as const,
        ...(immediate
          ? { animate: 'show' as const }
          : {
              whileInView: 'show' as const,
              viewport: { once: true, margin: '-12% 0px -12% 0px' },
            }),
      }
    : {}

  return (
    <MotionTag ref={ref} className={className} {...animation}>
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
  stagger = 0.055,
  delay = 0,
  as = 'div',
  immediate = false,
}: StaggerProps) {
  const reduced = useReducedMotion()
  const { ref, armed } = useEntrance<HTMLDivElement>()
  const MotionTag = motion[as as 'div'] ?? motion.div

  const animation = armed
    ? {
        initial: 'hidden' as const,
        variants: {
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduced ? 0.02 : stagger,
              delayChildren: reduced ? 0 : delay,
            },
          },
        },
        ...(immediate
          ? { animate: 'show' as const }
          : {
              whileInView: 'show' as const,
              viewport: { once: true, margin: '-10% 0px -10% 0px' },
            }),
      }
    : {}

  return (
    <StaggerArmedContext.Provider value={armed}>
      <MotionTag ref={ref} className={className} {...animation}>
        {children}
      </MotionTag>
    </StaggerArmedContext.Provider>
  )
}

export function RevealItem({
  children,
  className,
  y = REVEAL_Y,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  y?: number
  as?: ElementType
}) {
  const reduced = useReducedMotion()
  const armed = useContext(StaggerArmedContext)
  const MotionTag = motion[as as 'div'] ?? motion.div

  // Without an armed parent there is nothing to propagate a variant, so the
  // item renders plainly - visible, which is the safe default.
  if (!armed) {
    return <MotionTag className={className}>{children}</MotionTag>
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? DURATION.reduced : DURATION.reveal, ease: EASE_EDITORIAL },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
