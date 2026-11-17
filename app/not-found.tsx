import Link from 'next/link'
import { navItems } from '@/content/site'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { GridBackdrop } from '@/components/visuals/GridBackdrop'

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <GridBackdrop />
      <div className="shell relative py-24">
        <p className="label mb-6 flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-8 bg-signal" />
          Error 404
        </p>
        <h1 className="max-w-3xl font-display text-display-lg text-balance text-bone">
          That route does not resolve.
        </h1>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-muted">
          The page you asked for is not in the routing table. It may have been renamed, or the link that brought
          you here may be out of date.
        </p>

        <nav aria-label="Available pages" className="mt-12">
          <h2 className="label mb-5">Available routes</h2>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm text-bone transition-colors hover:border-signal/50 hover:text-signal"
              >
                Home
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm text-bone transition-colors hover:border-signal/50 hover:text-signal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </div>
    </section>
  )
}
