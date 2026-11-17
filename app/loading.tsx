/**
 * Route-level loading state. A low-contrast skeleton that matches the page
 * masthead rhythm, so navigation never shows a blank frame.
 */
export default function Loading() {
  return (
    <div className="shell py-24 sm:py-32" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div aria-hidden className="animate-pulse space-y-6">
        <div className="h-3 w-32 rounded-full bg-bone/[0.07]" />
        <div className="h-12 w-full max-w-3xl rounded-lg bg-bone/[0.06]" />
        <div className="h-12 w-full max-w-xl rounded-lg bg-bone/[0.05]" />
        <div className="h-4 w-full max-w-prose rounded-full bg-bone/[0.04]" />
        <div className="h-4 w-3/5 max-w-prose rounded-full bg-bone/[0.04]" />
        <div className="mt-10 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 bg-ink" />
          ))}
        </div>
      </div>
    </div>
  )
}
