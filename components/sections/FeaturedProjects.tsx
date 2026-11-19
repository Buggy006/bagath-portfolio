import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Stagger } from '@/components/ui/Reveal'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { featuredProjects } from '@/content/projects'

export function FeaturedProjects() {
  return (
    <Section aria-labelledby="featured-heading" className="border-t border-hairline">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="featured-heading"
          eyebrow="Selected work"
          title="Systems I have designed and shipped."
          description="A closer look at the problems I worked on, the systems I built, the decisions behind them and what I’d improve next. Prototypes are clearly labelled."
        />
        <Link href="/projects" className="link-underline shrink-0 pb-2 text-sm">
          All projects
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2" stagger={0.1}>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </Stagger>
    </Section>
  )
}
