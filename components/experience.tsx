import { Section } from "./section";
import { Reveal } from "./reveal";
import { experience } from "@/content/site";

export function Experience() {
  return (
    <Section id="experience" eyebrow="03 — Path" heading={experience.heading}>
      <ol className="space-y-12">
        {experience.roles.map((role, i) => (
          <Reveal key={`${role.company}-${role.period}`} delay={i * 80}>
            <li className="grid gap-4 border-t border-neutral-200 pt-8 sm:grid-cols-[200px_1fr] sm:gap-12">
              <p className="font-mono text-sm text-neutral-400">{role.period}</p>
              <div>
                <h3 className="text-lg font-semibold">{role.title}</h3>
                <p className="mt-0.5 text-sm text-neutral-500">{role.company}</p>
                <ul className="mt-4 space-y-2">
                  {role.points.map((point) => (
                    <li
                      key={point.slice(0, 32)}
                      className="flex gap-3 text-neutral-600"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
