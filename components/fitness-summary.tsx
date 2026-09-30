"use client";

import { Construction, Dumbbell } from "lucide-react";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { fitnessSummary, site } from "@/content/site";
import { PersonaSwitchButton } from "./persona";

/** Athlete mode, v1: one summary + a designed under-construction panel. */
export function FitnessSummary() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    fitnessSummary.cta.subject
  )}`;

  return (
    <Section id="overview" eyebrow="01 — Overview" heading={fitnessSummary.heading}>
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-neutral-600">{fitnessSummary.body}</p>
      </Reveal>

      <Reveal delay={100} className="mt-12">
        <div className="relative max-w-2xl overflow-hidden rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-10 text-center sm:p-14">
          <Dumbbell
            size={140}
            className="pointer-events-none absolute -right-6 -top-6 rotate-12 text-amber-100"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-amber-800">
              <Construction size={14} />
              Under construction
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">
              {fitnessSummary.panelTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-neutral-600">
              {fitnessSummary.panelBody}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={mailto}
                className="rounded-full bg-amber-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800"
              >
                {fitnessSummary.cta.text}
              </a>
              <PersonaSwitchButton
                to="engineer"
                className="rounded-full border border-amber-200 bg-white px-6 py-3 text-sm font-medium text-amber-800 transition-colors hover:border-amber-400"
              >
                Meanwhile, see my engineering →
              </PersonaSwitchButton>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
