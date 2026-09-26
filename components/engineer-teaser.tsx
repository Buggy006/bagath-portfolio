"use client";

import { Code2 } from "lucide-react";
import { Reveal } from "./reveal";
import { engineerTeaser } from "@/content/site";
import { PersonaSwitchButton } from "./persona";

/**
 * Athlete-mode mirror of the fitness teaser: a blue band pointing
 * back to the engineering profile.
 */
export function EngineerTeaser() {
  return (
    <section id="engineering" className="scroll-mt-20 bg-blue-50">
      <div className="mx-auto max-w-content px-6 py-24 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Code2 size={22} className="text-blue-700" />
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-blue-700">
            {engineerTeaser.label}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {engineerTeaser.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            {engineerTeaser.body}
          </p>
          <div className="mt-10 flex justify-center">
            <PersonaSwitchButton
              to="engineer"
              className="rounded-full bg-blue-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800"
            >
              {engineerTeaser.cta} →
            </PersonaSwitchButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
