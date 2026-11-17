import { cn } from '@/lib/utils'

/**
 * Static, zero-JS page texture: a fine technical grid faded out toward the
 * edges plus a single low-opacity signal wash. Rendered on the server and
 * marked aria-hidden - it carries no information.
 */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute inset-0 grid-texture"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, #000 20%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, #000 20%, transparent 78%)',
        }}
      />
      <div
        className="absolute -top-40 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(229,72,77,0.5), transparent 68%)' }}
      />
    </div>
  )
}
