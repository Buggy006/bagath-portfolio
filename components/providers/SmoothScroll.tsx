'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

/**
 * Eased page scrolling.
 *
 * Lenis drives `window.scrollTo` from a rAF loop rather than transforming a
 * wrapper, so native scroll position, IntersectionObserver and therefore every
 * existing scroll reveal keep working unchanged.
 *
 * It is deliberately not installed at all when the visitor prefers reduced
 * motion, or on touch devices where the platform's own momentum scrolling is
 * better than anything re-implemented in JavaScript.
 */
export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const lenis = new Lenis({
      // Short settle. Anything near a second reads as lag rather than
      // smoothness - the wheel should feel connected to the page.
      duration: 0.55,
      // Steeper ease-out: most of the distance is covered immediately,
      // leaving only the tail to smooth.
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      // Leave touch alone - native momentum already does this better.
      smoothWheel: true,
      syncTouch: false,
      // Anchor jumps (the skip link) stay instant for accessibility.
      anchors: false,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // If the preference flips mid-session, tear down immediately.
    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        cancelAnimationFrame(frame)
        lenis.destroy()
      }
    }
    reduced.addEventListener('change', onPreferenceChange)

    return () => {
      reduced.removeEventListener('change', onPreferenceChange)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  // A route change must land at the top instantly - easing a full-page scroll
  // on navigation is the jank this project already removed once.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}
