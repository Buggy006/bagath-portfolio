import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

export function Section({
  children,
  className,
  id,
  as: Tag = 'section',
  'aria-labelledby': labelledBy,
}: {
  children: ReactNode
  className?: string
  id?: string
  as?: 'section' | 'div'
  'aria-labelledby'?: string
}) {
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={cn('py-section', className)}>
      <div className="shell">{children}</div>
    </Tag>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  id?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="label mb-5 flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-8 bg-signal" />
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="font-display text-display-md text-balance text-bone">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-prose text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  )
}
