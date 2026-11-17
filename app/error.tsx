'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCw } from 'lucide-react'

/**
 * Route-level error boundary. Keeps the user on a styled page and offers a
 * recovery path rather than surfacing a stack trace.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaced for whatever error reporting is wired up in the deployment.
    console.error(error)
  }, [error])

  return (
    <section className="relative flex min-h-[70vh] items-center">
      <div className="shell py-24">
        <p className="label mb-6 flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-8 bg-signal" />
          Unexpected error
        </p>
        <h1 className="max-w-3xl font-display text-display-lg text-balance text-bone">
          Something failed while rendering this page.
        </h1>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-muted">
          This is on my side, not yours. Retrying usually works; if it does not, the home page is intact.
        </p>
        {error.digest ? (
          <p className="mt-4 text-xs text-muted">
            Reference: <code className="text-bone/70">{error.digest}</code>
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal hover:text-bone"
          >
            Try again
            <RotateCw aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full border border-hairline px-6 py-3 text-sm font-medium text-bone transition-colors duration-300 hover:border-signal/50 hover:text-signal"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
