'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_EDITORIAL } from '@/lib/motion'

export type FlowStage = { label: string; detail: string }

/**
 * Animated architecture diagram.
 *
 * Built from DOM nodes rather than a hand-drawn SVG so it reflows into a
 * vertical sequence on narrow screens instead of scrolling horizontally, and so
 * each stage is a real focusable button with its description exposed to assistive
 * technology. The connectors are the only decorative part and are aria-hidden.
 *
 * When `prefers-reduced-motion` is set the dash animation and the transit dot
 * are both dropped; the diagram still renders and still responds to focus.
 */
export function FlowDiagram({
  stages,
  className,
  caption,
}: {
  stages: FlowStage[]
  className?: string
  caption?: string
}) {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  return (
    <figure className={cn('w-full', className)}>
      <div className="rounded-2xl border border-hairline bg-surface/60 p-5 sm:p-8">
        <ol className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
          {stages.map((stage, index) => {
            const isActive = index === active
            const isLast = index === stages.length - 1
            return (
              <li key={stage.label} className="flex flex-1 flex-col lg:flex-row lg:items-center">
                <motion.button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  aria-describedby={`flow-detail-${index}`}
                  initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.5, ease: EASE_EDITORIAL, delay: reduced ? 0 : index * 0.08 }}
                  className={cn(
                    'group relative w-full rounded-xl border px-4 py-4 text-left transition-colors duration-300 lg:min-w-0',
                    isActive
                      ? 'border-signal/50 bg-signal/[0.08]'
                      : 'border-hairline bg-bone/[0.02] hover:border-bone/20',
                  )}
                >
                  <span
                    className={cn(
                      'label mb-2 block text-[0.625rem] transition-colors',
                      isActive ? 'text-signal' : 'text-muted',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'block font-display text-base tracking-tight transition-colors',
                      isActive ? 'text-bone' : 'text-muted group-hover:text-bone',
                    )}
                  >
                    {stage.label}
                  </span>
                  {/* Available to screen readers at all times; visually shown below. */}
                  <span id={`flow-detail-${index}`} className="sr-only">
                    {stage.detail}
                  </span>
                </motion.button>

                {!isLast ? <Connector animate={!reduced} /> : null}
              </li>
            )
          })}
        </ol>

        <div className="mt-6 min-h-[3.5rem] border-t border-hairline pt-5">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
            className="text-sm leading-relaxed text-muted"
          >
            <span className="mr-2 text-bone">{stages[active].label}</span>
            {stages[active].detail}
          </motion.p>
        </div>
      </div>

      {caption ? (
        <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

function Connector({ animate }: { animate: boolean }) {
  return (
    <span aria-hidden className="flex shrink-0 items-center justify-center py-2 lg:px-2 lg:py-0">
      {/* Vertical on mobile */}
      <svg className="h-6 w-px lg:hidden" viewBox="0 0 1 24" preserveAspectRatio="none">
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="24"
          stroke="rgba(242,240,235,0.22)"
          strokeWidth="1"
          strokeDasharray="4 4"
          className={animate ? 'animate-dash-flow' : undefined}
        />
      </svg>
      {/* Horizontal on desktop */}
      <svg className="hidden h-px w-8 lg:block" viewBox="0 0 32 1" preserveAspectRatio="none">
        <line
          x1="0"
          y1="0.5"
          x2="32"
          y2="0.5"
          stroke="rgba(242,240,235,0.22)"
          strokeWidth="1"
          strokeDasharray="4 4"
          className={animate ? 'animate-dash-flow' : undefined}
        />
      </svg>
    </span>
  )
}
