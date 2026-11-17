export default function Loading() {
  return (
    <div className="shell py-24 sm:py-32" role="status" aria-live="polite">
      <span className="sr-only">Loading projects</span>
      <div aria-hidden className="animate-pulse">
        <div className="h-3 w-24 rounded-full bg-bone/[0.07]" />
        <div className="mt-6 h-12 w-full max-w-2xl rounded-lg bg-bone/[0.06]" />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-72 rounded-2xl border border-hairline bg-surface/40" />
          ))}
        </div>
      </div>
    </div>
  )
}
