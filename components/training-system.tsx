import { Dumbbell, HeartPulse, Moon, Utensils } from "lucide-react";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { trainingSystem } from "@/content/site";

const icons = {
  dumbbell: Dumbbell,
  heart: HeartPulse,
  utensils: Utensils,
  moon: Moon,
};

export function TrainingSystem() {
  return (
    <Section
      id="system"
      eyebrow="02 — Method"
      heading={trainingSystem.heading}
      className="bg-neutral-50"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trainingSystem.pillars.map((pillar, i) => {
          const Icon = icons[pillar.icon];
          return (
            <Reveal key={pillar.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
                <Icon size={22} className="text-accent transition-colors" />
                <h3 className="mt-4 font-semibold">{pillar.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {pillar.items.map((item) => (
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
