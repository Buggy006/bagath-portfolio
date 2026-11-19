import type { MetadataRoute } from 'next'
import { navItems, siteConfig } from '@/content/site'
import { caseStudies } from '@/content/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = siteConfig.url.replace(/\/$/, '')

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...navItems.map((item) => ({
      url: `${base}${item.href}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: item.href === '/projects' ? 0.9 : 0.7,
    })),
  ]

  const projectRoutes: MetadataRoute.Sitemap = caseStudies.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
