'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/projects'
import { StatusTag } from '@/components/ui/Tag'
import { cn } from '@/lib/utils'
import { EASE_EDITORIAL } from '@/lib/motion'

/**
 * Interactive project card.
 *
 * A project with a case study renders as one link (a single tab stop, one
 * accessible name) with the hover treatment applied through group-* classes;
 * the lift is a transform, so it is composited and never triggers layout.
 * A card-only project renders the identical shell as a plain element - no link,
 * no arrow affordance and no hover lift, so it never suggests a page that does
 * not exist.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion()
  const linked = project.caseStudy

  const shell = cn(
    'relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-7 sm:p-9',
    'transition-all duration-200 ease-editorial',
    linked && 'hover:border-bone/20 hover:bg-surface motion-safe:hover:-translate-y-1',
  )

  const content = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at 50% 0%, rgba(229,72,77,0.09), transparent 70%)' }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="label text-[0.625rem]">{String(index + 1).padStart(2, '0')}</span>
        {linked ? (
          <ArrowUpRight
            aria-hidden
            className="h-5 w-5 shrink-0 text-muted transition-all duration-200 ease-editorial group-hover:text-signal motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
          />
        ) : null}
      </div>

      <h3 className="relative mt-7 font-display text-2xl tracking-tight text-bone sm:text-[1.75rem]">
        {project.title}
      </h3>
      <p className="relative mt-2 text-sm text-muted">{project.subtitle}</p>
      <p className="relative mt-5 flex-1 text-sm leading-relaxed text-bone/75">{project.summary}</p>

      <div className="relative mt-8 flex flex-wrap items-center gap-2">
        <StatusTag status={project.status} />
        {project.year ? <span className="text-xs text-muted">{project.year}</span> : null}
      </div>

      {project.stack && project.stack.length > 0 ? (
        <ul className="relative mt-5 flex flex-wrap gap-1.5 border-t border-hairline pt-5">
          {project.stack.slice(0, 6).map((tech) => (
            <li key={tech} className="rounded-full bg-bone/[0.05] px-2.5 py-1 text-[0.6875rem] text-muted">
              {tech}
            </li>
          ))}
          {project.stack.length > 6 ? (
            <li className="rounded-full px-2.5 py-1 text-[0.6875rem] text-muted">
              +{project.stack.length - 6}
            </li>
          ) : null}
        </ul>
      ) : null}
    </>
  )

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.25 : 0.7, ease: EASE_EDITORIAL } },
      }}
      className="group relative"
    >
      {linked ? (
        <Link href={`/projects/${project.slug}`} className={shell}>
          {content}
        </Link>
      ) : (
        <div className={shell}>{content}</div>
      )}
    </motion.article>
  )
}
