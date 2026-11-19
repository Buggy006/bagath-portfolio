'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_EDITORIAL } from '@/lib/motion'
import { useEntrance } from '@/lib/use-entrance'

export type FlowStage = {
  label: string
  detail: string
  /**
   * Optional one-word grouping (e.g. Develop / Integrate / Deliver). Repeated
   * across adjacent stages it clusters them visually, which is how a longer
   * flow shows its phases without adding colour or extra chrome.
   */
  phase?: string
}

/**
 * Animated architecture diagram.
 *
 * Built from DOM nodes rather than a hand-drawn SVG so it reflows into a
 * vertical sequence on narrow screens instead of scrolling horizontally, and so
 * each stage is a real focusable button with its description exposed to assistive
 * technology. The connectors are the only decorative part and are aria-hidden.
 *
 * A flow of more than five stages goes horizontal at `xl` rather than `lg`,
 * because six columns inside the shell at 1024px leave roughly 70px of text
 * width per stage and labels wrap into unreadable stacks.
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
  // Stays false until a stage is actually selected, so the detail paragraph is
  // plain (and therefore visible) on first render and only animates on change.
  const [selected, setSelected] = useState(false)
  const reduced = useReducedMotion()
  const { ref: listRef, armed } = useEntrance<HTMLOListElement>()

  const select = (index: number) => {
    setActive(index)
    setSelected(true)
  }
  // Six or more stages need the wider breakpoint to stay legible.
  const dense = stages.length > 5

  return (
    <figure className={cn('w-full', className)}>
      <div className="rounded-2xl border border-hairline bg-surface/60 p-5 sm:p-8">
        <ol
          ref={listRef}
          className={cn(
            'flex flex-col gap-0',
            dense ? 'xl:flex-row xl:items-stretch' : 'lg:flex-row lg:items-stretch',
          )}
        >
          {stages.map((stage, index) => {
            const isActive = index === active
            const isLast = index === stages.length - 1
            return (
              <li
                key={stage.label}
                className={cn(
                  'flex flex-1 flex-col',
                  dense ? 'xl:flex-row xl:items-center' : 'lg:flex-row lg:items-center',
                )}
              >
                <motion.button
                  type="button"
                  onMouseEnter={() => select(index)}
                  onFocus={() => select(index)}
                  onClick={() => select(index)}
                  aria-pressed={isActive}
                  aria-describedby={`flow-detail-${index}`}
                  {...(armed
                    ? {
                        initial: { opacity: 0, y: reduced ? 0 : 12 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, margin: '-10%' },
                        transition: {
                          duration: 0.42,
                          ease: EASE_EDITORIAL,
                          delay: reduced ? 0 : index * 0.05,
                        },
                      }
                    : {})}
                  className={cn(
                    'group relative w-full rounded-xl border py-4 text-left transition-colors duration-300',
                    dense ? 'px-3.5 xl:min-w-0' : 'px-4 lg:min-w-0',
                    isActive
                      ? 'border-signal/50 bg-signal/[0.08]'
                      : 'border-hairline bg-bone/[0.02] hover:border-bone/20',
                  )}
                >
                  {stage.phase ? (
                    <span className="mb-1.5 block text-[0.5625rem] uppercase tracking-[0.16em] text-muted/60">
                      {stage.phase}
                    </span>
                  ) : null}
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
                      'block font-display tracking-tight transition-colors',
                      dense ? 'text-[0.9375rem] leading-snug' : 'text-base',
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

                {!isLast ? <Connector animate={!reduced} dense={dense} /> : null}
              </li>
            )
          })}
        </ol>

        <div className="mt-6 min-h-[3.5rem] border-t border-hairline pt-5">
          <motion.p
            key={active}
            {...(selected
              ? {
                  initial: { opacity: 0, y: reduced ? 0 : 6 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.28, ease: EASE_EDITORIAL },
                }
              : {})}
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

function Connector({ animate, dense }: { animate: boolean; dense: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center py-2',
        dense ? 'xl:px-1.5 xl:py-0' : 'lg:px-2 lg:py-0',
      )}
    >
      {/* Vertical until the flow turns horizontal */}
      <svg
        className={cn('h-6 w-px', dense ? 'xl:hidden' : 'lg:hidden')}
        viewBox="0 0 1 24"
        preserveAspectRatio="none"
      >
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
      {/* Horizontal once there is room for a row */}
      <svg
        className={cn('hidden h-px', dense ? 'w-5 xl:block' : 'w-8 lg:block')}
        viewBox="0 0 32 1"
        preserveAspectRatio="none"
      >
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
