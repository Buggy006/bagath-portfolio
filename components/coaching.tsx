import { Section } from "./section";
import { Reveal } from "./reveal";
import { coaching } from "@/content/site";
import { WaitlistForm } from "./waitlist-form";

export function Coaching() {
  return (
    <Section id="coaching" eyebrow="03 — Coaching" heading={coaching.heading}>
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-neutral-600">{coaching.body}</p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {coaching.offers.map((offer, i) => (
          <Reveal key={offer.title} delay={i * 80}>
            <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">{offer.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {offer.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex flex-wrap items-center gap-4">
        <span className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 font-mono text-xs text-accent transition-colors">
          {coaching.status}
        </span>
<WaitlistForm variant="accent" />
      </Reveal>
    </Section>
  );
}
