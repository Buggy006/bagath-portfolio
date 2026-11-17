import type { LucideIcon } from 'lucide-react'
import { Github, Linkedin, Mail } from 'lucide-react'

/**
 * Single source of truth for identity, navigation and SEO.
 * Everything user-facing on this site reads from here or from the sibling
 * content modules - no copy is hard-coded inside components.
 */

export const siteConfig = {
  /** Brand / display name used in the wordmark and headings. */
  name: 'Buggy',
  /** Legal name, used for structured data and document titles. */
  fullName: 'Bagath Singh',
  role: 'Cloud Platform + Data + AI Engineer',
  tagline: 'I build systems at the intersection of Cloud, Data & AI.',
  description:
    'Engineer working across cloud platform, data infrastructure and applied AI - infrastructure as code on AWS, analytics pipelines on open table formats, and product surfaces that put models to work.',
  location: 'Chennai, India',
  /**
   * Set NEXT_PUBLIC_SITE_URL in the deployment environment. The fallback keeps
   * local builds, sitemap generation and Open Graph URLs absolute and valid.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bagath.dev',
  /**
   * Contact channels. `email` is intentionally null until a public address is
   * chosen - the UI omits the channel entirely rather than rendering a dead
   * mailto: link. Fill it in here and it appears everywhere automatically.
   */
  email: null as string | null,
  github: 'https://github.com/buggy006',
  linkedin: 'https://www.linkedin.com/in/bagath-singh-40aba0216/',
} as const

export type NavItem = { href: string; label: string }

export const navItems: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

export type SocialLink = { href: string; label: string; handle: string; icon: LucideIcon }

/** Only channels with a real destination are returned, so links are never dead. */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [
    { href: siteConfig.github, label: 'GitHub', handle: '@buggy006', icon: Github },
    { href: siteConfig.linkedin, label: 'LinkedIn', handle: 'bagath-singh', icon: Linkedin },
  ]
  if (siteConfig.email) {
    links.push({
      href: `mailto:${siteConfig.email}`,
      label: 'Email',
      handle: siteConfig.email,
      icon: Mail,
    })
  }
  return links
}

/**
 * Per-page Open Graph block.
 *
 * Declaring `openGraph` on a page replaces the parent's resolved object, which
 * silently drops the file-convention `opengraph-image`. This helper re-attaches
 * it (resolved against `metadataBase`) so every route ships a social card.
 */
export function pageOpenGraph({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    type: 'website' as const,
    siteName: `${siteConfig.name} - ${siteConfig.role}`,
    title: `${title} - ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}${path}`,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.role}`,
      },
    ],
  }
}
