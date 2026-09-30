"use client";

import { PersonaProvider, usePersona } from "./persona";
import { Nav } from "./nav";
import { Hero } from "./hero";
import { About } from "./about";
import { Skills } from "./skills";
import { Experience } from "./experience";
import { Projects } from "./projects";
import { Fitness } from "./fitness";
import { FitnessSummary } from "./fitness-summary";
import { Contact } from "./contact";
import { Footer } from "./footer";

function Sections() {
  const { persona, switching } = usePersona();

  return (
    <div className={`persona-swap ${switching ? "switching" : ""}`}>
      <main>
        <Hero />
        {persona === "engineer" ? (
          <>
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Fitness />
          </>
        ) : (
<FitnessSummary />
        )}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export function SiteShell() {
  return (
    <PersonaProvider>
      <Nav />
      <Sections />
    </PersonaProvider>
  );
}
