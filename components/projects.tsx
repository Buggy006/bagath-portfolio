import { ArrowUpRight } from "lucide-react";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { projects } from "@/content/site";

const cardClass =
  "flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6";

function CardBody({ project }: { project: (typeof projects.items)[number] }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold">{project.title}</h3>
        {project.link && (
          <ArrowUpRight
            size={18}
            className="shrink-0 text-neutral-300 transition-colors group-hover:text-accent"
          />
        )}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
        {project.description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-neutral-100 px-2.5 py-1 font-mono text-xs text-neutral-500"
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="04 — Work"
      heading={projects.heading}
      className="bg-neutral-50"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {projects.items.map((project, i) => (
          <Reveal key={project.title} delay={i * 80}>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${cardClass} transition-all hover:-translate-y-1 hover:border-neutral-300 hover:shadow-sm`}
              >
                <CardBody project={project} />
              </a>
            ) : (
              <div className={cardClass}>
                <CardBody project={project} />
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
