'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { hasHydrated } from '@/lib/motion'

/** `useLayoutEffect` warns during server rendering; fall back there. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Progressive enhancement for entrance animations.
 *
 * Content is always rendered visible. The hidden starting state is "armed" only
 * once this hook has run on the client, which means:
 *
 *  - No JavaScript, a failed bundle or a failed hydration -> content stays
 *    visible, because nothing ever armed it.
 *  - No `IntersectionObserver` -> never armed, so a scroll reveal that could
 *    never fire can never hide anything.
 *  - First load -> only elements already outside the viewport are armed, so the
 *    visible-to-hidden switch happens off screen and never flashes. Anything on
 *    screen simply stays put, which is also the right call for LCP.
 *  - Client-side navigation -> armed immediately, since there is no
 *    server-rendered paint to conflict with, so entrances animate as designed.
 */
export function useEntrance<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  // Captured at render: every component in the first commit sees `false`,
  // because the flag is only set in a parent effect that runs after them.
  const [mountedAfterHydration] = useState(() => hasHydrated())
  const [armed, setArmed] = useState(false)

  useIsomorphicLayoutEffect(() => {
    // A reveal that cannot be observed must never be hidden.
    if (typeof IntersectionObserver === 'undefined') return

    if (mountedAfterHydration) {
      setArmed(true)
      return
    }

    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0
    if (!onScreen) setArmed(true)
  }, [mountedAfterHydration])

  return { ref, armed }
}
