'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE_EDITORIAL } from '@/lib/motion'

/**
 * Route transition.
 *
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), which is
 * what makes a per-route enter animation possible. It is deliberately a short
 * opacity/translate pair only - anything longer makes navigation feel laggy,
 * and it collapses to a plain fade under `prefers-reduced-motion`.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  )
}
