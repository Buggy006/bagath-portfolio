'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Subtle pointer-responsive wash.
 *
 * Deliberately implemented with CSS custom properties written from a rAF-
 * throttled pointermove listener rather than React state: no re-render runs on
 * mouse movement, so this costs one style recalculation per frame at most.
 * It is skipped entirely for reduced-motion users and for coarse pointers,
 * where there is no cursor to follow and the listener would be wasted work.
 */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const el = ref.current
    if (!el) return

    let frame = 0
    let targetX = 50
    let targetY = 30

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 100
      targetY = (event.clientY / window.innerHeight) * 100
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        el.style.setProperty('--px', `${targetX}%`)
        el.style.setProperty('--py', `${targetY}%`)
        el.style.setProperty('--opacity', '1')
      })
    }

    const onLeave = () => el.style.setProperty('--opacity', '0')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
      style={
        {
          '--px': '50%',
          '--py': '30%',
          '--opacity': '0',
          opacity: 'var(--opacity)',
          background:
            'radial-gradient(520px circle at var(--px) var(--py), rgba(229,72,77,0.10), transparent 62%)',
        } as React.CSSProperties
      }
    />
  )
}
