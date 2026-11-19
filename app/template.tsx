'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { DURATION, EASE_EDITORIAL, hasHydrated, markHydrated } from '@/lib/motion'

/** Curtain sweep, in seconds. Kept short - a page switch should read as a beat, not a wait. */
const CURTAIN = 0.38

/**
 * Route transition.
 *
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), which is
 * what makes a per-route enter animation possible. A panel starts covering the
 * viewport and retracts to the right, revealing the new page left to right,
 * while the content itself fades and rises just behind it.
 *
 * The first, server-rendered paint is NOT animated: wrapping it in `opacity: 0`
 * would mean a hydration failure leaves the entire page blank, and a curtain on
 * first load would delay content nobody navigated to. This component also owns
 * the hydration flag, because a parent effect runs after every child effect, so
 * each child has already read `false` on that first pass.
 *
 * Under `prefers-reduced-motion` the curtain is dropped entirely and only a
 * short fade remains.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  // Read once at render time, before any effect has flipped the flag.
  const animateEntrance = hasHydrated()

  useEffect(() => {
    markHydrated()
  }, [])

  if (!animateEntrance) return <div>{children}</div>

  return (
    <>
      {!reduced ? (
        <motion.div
          aria-hidden
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: CURTAIN, ease: EASE_EDITORIAL }}
          style={{ transformOrigin: 'right' }}
          className="pointer-events-none fixed inset-0 z-40 origin-right bg-ink"
        >
          {/* Leading edge, so the sweep reads as a deliberate wipe. */}
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-signal/70" />
        </motion.div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? DURATION.reduced : DURATION.page,
          ease: EASE_EDITORIAL,
          // Starts just behind the curtain rather than after it, so the two
          // read as one movement instead of two sequential animations.
          delay: reduced ? 0 : 0.06,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
