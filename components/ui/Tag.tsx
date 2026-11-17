import { cn } from '@/lib/utils'

export function Tag({
  children,
  tone = 'default',
  className,
}: {
  children: React.ReactNode
  tone?: 'default' | 'signal' | 'outline'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs tracking-wide transition-colors duration-300',
        tone === 'default' && 'bg-bone/[0.06] text-muted',
        tone === 'outline' && 'border border-hairline text-muted',
        tone === 'signal' && 'border border-signal/40 bg-signal/10 text-signal',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Status pill for projects. Prototypes are always visibly marked. */
export function StatusTag({ status }: { status: string }) {
  const isPrototype = status === 'Prototype'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide',
        isPrototype ? 'border-signal/40 bg-signal/10 text-signal' : 'border-hairline text-muted',
      )}
    >
      <span
        aria-hidden
        className={cn('h-1.5 w-1.5 rounded-full', isPrototype ? 'bg-signal' : 'bg-muted')}
      />
      {status}
    </span>
  )
}
