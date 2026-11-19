import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Stagger } from '@/components/ui/Reveal'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { projects } from '@/content/projects'
import { pageOpenGraph, siteConfig } from '@/content/site'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Case studies across cloud infrastructure, data engineering and applied AI - architecture, trade-offs and outcomes.',
  alternates: { canonical: '/projects' },
  openGraph: pageOpenGraph({
    title: 'Projects',
    description: 'Case studies across cloud infrastructure, data engineering and applied AI.',
    path: '/projects',
  }),
}

export default function ProjectsPage() {
  const production = projects.filter((p) => p.status === 'Production').length
  const prototypes = projects.filter((p) => p.status === 'Prototype').length

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Case studies, not screenshots."
        description="Every entry covers the problem it solves, the architecture, the decisions I would have to defend in review, and what I would build next. Nothing here claims a metric I cannot show."
        meta={[
          { label: 'Projects', value: String(projects.length) },
          { label: 'In production', value: String(production) },
          { label: 'Prototypes', value: String(prototypes) },
        ]}
      />

      <Section aria-label="All projects" className="pt-16 sm:pt-20">
        <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.09}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </Stagger>
      </Section>

      <ContactCTA />
    </>
  )
}
