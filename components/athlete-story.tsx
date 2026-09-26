import { Section } from "./section";
import { Reveal } from "./reveal";
import { athleteStory } from "@/content/site";

export function AthleteStory() {
  return (
    <Section id="story" eyebrow="01 — Story" heading={athleteStory.heading}>
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-neutral-600">
          {athleteStory.paragraphs.map((text) => (
            <p key={text.slice(0, 32)}>{text}</p>
          ))}
        </Reveal>
        <Reveal delay={100}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-1">
            {athleteStory.facts.map((fact) => (
              <div key={fact.label} className="border-t border-neutral-200 pt-3">
                <dt className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
