import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Reveal, Stagger, RevealItem } from '@/components/ui/Reveal'
import { FlowDiagram } from '@/components/visuals/FlowDiagram'
import { StatusTag } from '@/components/ui/Tag'
import { getProject, projects } from '@/content/projects'
import { siteConfig } from '@/content/site'

type Params = { params: { slug: string } }

/** Every case study is statically generated - the content set is finite and known. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug)
  if (!project) return { title: 'Project not found' }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} - ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
      // Re-attach the per-project file-convention card dropped by this override.
      images: [
        {
          url: `/projects/${project.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} - case study`,
        },
      ],
    },
    twitter: { card: 'summary_large_image', title: project.title, description: project.summary },
  }
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article>
      <PageHeader
        eyebrow={`Case study · ${project.year}`}
        title={project.title}
        description={project.intro}
        meta={[
          { label: 'Status', value: project.status },
          { label: 'Domains', value: project.domains.join(' · ') },
          { label: 'Role', value: project.role.split(' - ')[0] },
        ]}
      />

      <Section aria-labelledby="overview-heading" className="pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.5fr] lg:gap-16">
          <div>
            <h2 id="overview-heading" className="label mb-6">
              The problem
            </h2>
            <Stagger className="space-y-5" stagger={0.07}>
              {project.problem.map((paragraph) => (
                <RevealItem key={paragraph} className="flex gap-4">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{paragraph}</p>
                </RevealItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-hairline bg-surface/40 p-6 sm:p-7">
              <h2 className="label mb-5">Project facts</h2>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="mb-1.5 text-muted">Status</dt>
                  <dd>
                    <StatusTag status={project.status} />
                  </dd>
                </div>
                <div>
                  <dt className="mb-1.5 text-muted">My role</dt>
                  <dd className="leading-relaxed text-bone/85">{project.role}</dd>
                </div>
                <div>
                  <dt className="mb-2.5 text-muted">Stack</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <li key={tech} className="rounded-full bg-bone/[0.05] px-2.5 py-1 text-[0.6875rem] text-muted">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              {project.status === 'Prototype' ? (
                <p className="mt-6 border-t border-hairline pt-5 text-xs leading-relaxed text-signal">
                  This is a prototype. It is a working system I built to explore the problem, not a product with
                  users.
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="architecture-heading" className="border-t border-hairline">
        <Reveal>
          <h2 id="architecture-heading" className="label mb-6">
            Architecture
          </h2>
          <p className="mb-10 max-w-prose text-base leading-relaxed text-muted">
            The stages the system moves through, end to end.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <FlowDiagram
            stages={project.flow}
            caption="Select a stage to read what happens there. Interactive and keyboard navigable."
          />
        </Reveal>
      </Section>

      <Section aria-labelledby="approach-heading" className="border-t border-hairline">
        <Reveal>
          <h2 id="approach-heading" className="label mb-10">
            Approach
          </h2>
        </Reveal>
        <Stagger className="space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
          {project.approach.map((section, i) => (
            <RevealItem key={section.title} className="bg-ink p-7 transition-colors duration-500 hover:bg-surface sm:p-10">
              <div className="grid gap-4 lg:grid-cols-[0.4fr_1fr] lg:gap-12">
                <div className="flex items-start gap-3">
                  <span className="label text-[0.625rem] text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-lg tracking-tight text-bone">{section.title}</h3>
                </div>
                <p className="max-w-prose text-sm leading-relaxed text-muted sm:text-base">{section.body}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      <Section aria-labelledby="decisions-heading" className="border-t border-hairline">
        <Reveal>
          <h2 id="decisions-heading" className="label mb-3">
            Key decisions
          </h2>
          <p className="mb-10 max-w-prose text-base leading-relaxed text-muted">
            Trade-offs worth defending, with the reasoning rather than just the outcome.
          </p>
        </Reveal>
        <Stagger className="grid gap-5 lg:grid-cols-3" stagger={0.09}>
          {project.decisions.map((decision) => (
            <RevealItem
              key={decision.title}
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-7 transition-colors duration-500 hover:border-bone/20"
            >
              <h3 className="font-display text-base leading-snug tracking-tight text-bone">{decision.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{decision.body}</p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-700 ease-editorial group-hover:scale-x-100"
              />
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      <Section aria-labelledby="outcomes-heading" className="border-t border-hairline">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 id="outcomes-heading" className="label mb-8">
                Outcomes
              </h2>
            </Reveal>
            <Stagger className="space-y-5" stagger={0.07}>
              {project.outcomes.map((outcome) => (
                <RevealItem key={outcome} className="flex gap-4 border-b border-hairline pb-5 last:border-0">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <p className="text-sm leading-relaxed text-bone/85 sm:text-base">{outcome}</p>
                </RevealItem>
              ))}
            </Stagger>
          </div>

          <div>
            <Reveal>
              <h2 className="label mb-8">What I would do next</h2>
            </Reveal>
            <Stagger className="space-y-5" stagger={0.07}>
              {project.nextSteps.map((step) => (
                <RevealItem key={step} className="flex gap-4 border-b border-hairline pb-5 last:border-0">
                  <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-muted" />
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{step}</p>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <nav aria-label="Project navigation" className="border-t border-hairline">
        <div className="shell flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/projects" className="link-underline text-sm">
            <ArrowLeft aria-hidden className="h-4 w-4" />
            All projects
          </Link>
          <Link href={`/projects/${next.slug}`} className="group text-right">
            <span className="label mb-1.5 block text-[0.625rem]">Next case study</span>
            <span className="inline-flex items-center gap-2 font-display text-lg tracking-tight text-bone transition-colors group-hover:text-signal">
              {next.title}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </nav>
    </article>
  )
}
