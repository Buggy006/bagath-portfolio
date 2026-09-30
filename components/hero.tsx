"use client";

import { ArrowDown, Construction, Github, Instagram, Linkedin } from "lucide-react";
import { personaHero, site } from "@/content/site";
import { PersonaToggle, usePersona } from "./persona";
import { Marquee } from "./marquee";
import { Floaters } from "./floaters";
import { HeroBackground } from "./hero-bg";
import { TerminalCard } from "./terminal-card";

const socialIcons = {
  github: { Icon: Github, href: site.social.github, label: "GitHub" },
  linkedin: { Icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
  instagram: { Icon: Instagram, href: site.social.instagram, label: "Instagram" },
};

export function Hero() {
  const { persona } = usePersona();
  const hero = personaHero[persona];

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center">
      <HeroBackground persona={persona} />
      <Floaters persona={persona} />
      <TerminalCard />
      <div className="relative z-10 mx-auto w-full max-w-content px-6 pt-24">
        <PersonaToggle />
        <p className="mt-8 font-mono text-sm text-accent transition-colors">
          {hero.roleLine}
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
          {hero.tagline}
        </p>
        {"badge" in hero && (
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed border-accent/50 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-accent">
            <Construction size={14} />
            {hero.badge}
          </span>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium transition-colors hover:border-neutral-950"
          >
            {hero.secondaryCta.label}
          </a>
          <span className="mx-1 hidden h-6 w-px bg-neutral-200 sm:block" />
          {hero.socials.map((key) => {
            const { Icon, href, label } = socialIcons[key];
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-neutral-400 transition-colors hover:text-neutral-950"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        <div className="mt-16 lg:hidden">
          <Marquee items={hero.marquee} />
        </div>
      </div>

      <a
        href={persona === "engineer" ? "#about" : "#overview"}
        aria-label="Scroll to next section"
        className="mx-auto mb-10 mt-auto animate-bounce text-neutral-300 hover:text-neutral-500"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
