'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { DURATION, EASE_EDITORIAL, hasHydrated, markHydrated } from '@/lib/motion'

/**
 * Route transition.
 *
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), which is
 * what makes a per-route enter animation possible. It is deliberately a short
 * opacity/translate pair only - anything longer makes navigation feel laggy,
 * and it collapses to a plain fade under `prefers-reduced-motion`.
 *
 * The first, server-rendered paint is NOT animated: wrapping it in `opacity: 0`
 * would mean a hydration failure leaves the entire page blank. This component
 * also owns the hydration flag, because a parent effect runs after every child
 * effect, so each child has already read `false` on that first pass.
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
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? DURATION.reduced : DURATION.page, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  )
}
