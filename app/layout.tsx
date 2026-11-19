import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { PointerGlow } from '@/components/visuals/PointerGlow'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { siteConfig } from '@/content/site'

/**
 * Both families are self-hosted by next/font at build time: no render-blocking
 * request to Google, `display: swap` to avoid invisible text, and `preload` on
 * the body face only, since the display face is used above the fold too but in
 * fewer weights.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.role}`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} - Portfolio`,
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  keywords: [
    'Cloud Platform Engineer',
    'Data Engineer',
    'AI Engineer',
    'AWS',
    'Terraform',
    'Apache Iceberg',
    'Next.js',
    'Python',
    siteConfig.fullName,
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    siteName: `${siteConfig.name} - ${siteConfig.role}`,
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: '#090909',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: ['Cloud infrastructure', 'Data engineering', 'Applied AI', 'AWS', 'Terraform', 'Apache Iceberg'],
  }

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-ink text-bone">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:text-sm focus:text-bone"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <PointerGlow />
        <SiteHeader />
        <main id="main" className="relative z-10 pt-16 sm:pt-20">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Serialised from a local object literal - no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
