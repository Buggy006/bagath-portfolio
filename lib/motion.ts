/**
 * Shared motion vocabulary.
 *
 * Only the easing curve is global: every component builds its variants locally
 * because each one needs to branch on `useReducedMotion()`, which is a hook and
 * therefore cannot be resolved in a module-level constant. Keeping the curve
 * here is what makes the timing feel like one system.
 */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const
