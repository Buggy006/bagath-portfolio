import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  external?: boolean
}

export function ButtonLink({ href, children, variant = 'primary', className, external }: Props) {
  const classes = cn(
    'group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-editorial',
    variant === 'primary' &&
      'bg-bone text-ink hover:bg-signal hover:text-bone',
    variant === 'ghost' &&
      'border border-hairline text-bone hover:border-signal/50 hover:bg-signal/[0.07] hover:text-signal',
    className,
  )

  const inner = (
    <>
      {children}
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}
