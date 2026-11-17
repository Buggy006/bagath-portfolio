import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Introduction } from '@/components/sections/Introduction'
import { Domains } from '@/components/sections/Domains'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ExperienceSummary } from '@/components/sections/ExperienceSummary'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { siteConfig } from '@/content/site'

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.role}`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Domains />
      <FeaturedProjects />
      <ExperienceSummary />
      <ContactCTA />
    </>
  )
}
