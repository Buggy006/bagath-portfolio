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
              <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6">
                <Icon size={22} className="text-blue-600" />
                <h3 className="mt-4 font-semibold">{group.title}</h3>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-neutral-600">
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Proficiency meter: filled accent on a lighter step of the
                    same hue; the level is stated in text, never color alone. */}
                <div className="mt-6">
                  <span className="font-mono text-xs text-neutral-500">
                    {group.level.label}
                  </span>
                  <div
                    className="mt-1.5 h-1 rounded-full bg-blue-100"
                    role="img"
                    aria-label={`${group.title} proficiency: ${group.level.label}`}
                  >
                    <div
                      className="h-1 rounded-full bg-blue-600"
                      style={{ width: `${group.level.value * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
