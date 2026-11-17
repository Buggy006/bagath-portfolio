import Link from 'next/link'
import { getSocialLinks, navItems, siteConfig } from '@/content/site'

export function SiteFooter() {
  const socials = getSocialLinks()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-hairline">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-tight text-bone">
              {siteConfig.name}
              <span aria-hidden className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.tagline}</p>
            <p className="mt-4 text-sm text-muted">{siteConfig.location}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="label mb-4">Pages</h2>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label mb-4">Elsewhere</h2>
            <ul className="space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="text-sm text-muted transition-colors hover:text-bone"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.fullName}
          </p>
          <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
