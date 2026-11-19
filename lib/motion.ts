/**
 * Shared motion vocabulary.
 *
 * The easing curve and the timing scale are global so every surface animates at
 * the same rhythm. Components still build their own variants, because each one
 * branches on `useReducedMotion()` - a hook, and therefore not resolvable in a
 * module-level constant.
 */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const

/** Durations in seconds, one band per interaction class. */
export const DURATION = {
  /** Hover, colour and border changes. */
  micro: 0.18,
  /** Navigation affordances, including the active-route indicator. */
  nav: 0.22,
  /** Route transition. Long enough to read as intentional, short enough to feel instant. */
  page: 0.3,
  /** Section entrance on scroll. */
  reveal: 0.46,
  /** Collapsed value used when the visitor prefers reduced motion. */
  reduced: 0.15,
} as const

/** Entrance travel distance in px. Transform only - never animates layout. */
export const REVEAL_Y = 22

/**
 * Has the app finished its first client render?
 *
 * The first paint comes from server-rendered HTML, which the browser shows
 * before React hydrates. Entrance animations must therefore not hide anything
 * on that first pass, or a hydration failure would leave the page blank.
 * Later mounts (client-side navigation) have no server paint to conflict with,
 * so they animate normally.
 *
 * `typeof window` keeps this false on the server, where module state is shared
 * across requests and would otherwise leak between them.
 */
let hydrated = false

export function hasHydrated(): boolean {
  return typeof window !== 'undefined' && hydrated
}

export function markHydrated(): void {
  hydrated = true
}
