"use client";

import { Construction, Dumbbell } from "lucide-react";
import { Reveal } from "./reveal";
import { fitness } from "@/content/site";
import { WaitlistForm } from "./waitlist-form";
import { PersonaSwitchButton } from "./persona";

/**
 * Engineer-mode teaser for the fitness sub-brand — warm amber band
 * with a jump into full athlete mode.
 */
export function Fitness() {
  return (
    <section id="fitness" className="scroll-mt-20 bg-amber-50">
      <div className="mx-auto max-w-content px-6 py-24 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <Dumbbell size={22} className="text-amber-700" />
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-amber-700">
            {fitness.label}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {fitness.heading}
          </h2>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-dashed border-amber-400 bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-amber-700">
            <Construction size={14} />
            {fitness.construction}
          </span>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            {fitness.body}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <PersonaSwitchButton
              to="athlete"
              className="rounded-full bg-amber-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800"
            >
              Explore athlete mode →
            </PersonaSwitchButton>
<WaitlistForm variant="amber" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
