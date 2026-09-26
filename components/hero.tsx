import { ArrowDown, Github, Linkedin } from "lucide-react";
import { site } from "@/content/site";

const stack = ["python", "aws", "terraform", "data-eng", "devops"];

export function Hero() {
  return (
    <section id="top" className="flex min-h-screen flex-col justify-center">
      <div className="mx-auto w-full max-w-content px-6 pt-16">
        <p className="font-mono text-sm text-blue-600">
          {site.role} · Data & Cloud
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium transition-colors hover:border-neutral-950"
          >
            Get in touch
          </a>
          <span className="mx-1 hidden h-6 w-px bg-neutral-200 sm:block" />
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-neutral-400 transition-colors hover:text-neutral-950"
          >
            <Github size={20} />
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-neutral-400 transition-colors hover:text-neutral-950"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <p className="mt-16 font-mono text-xs tracking-wider text-neutral-400">
          {stack.join("  ·  ")}
        </p>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="mx-auto mb-10 mt-auto animate-bounce text-neutral-300 hover:text-neutral-500"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
