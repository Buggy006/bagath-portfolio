import { Cloud, Code2, Database, Layers, Sparkles } from "lucide-react";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { skills } from "@/content/site";

const icons = {
  code: Code2,
  cloud: Cloud,
  layers: Layers,
  database: Database,
  sparkles: Sparkles,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 — Toolkit"
      heading={skills.heading}
      className="bg-neutral-50"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
                <Icon size={22} className="text-blue-600" />
                <h3 className="mt-4 font-semibold">{group.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-neutral-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
