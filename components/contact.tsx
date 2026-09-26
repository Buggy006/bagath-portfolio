import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { contact, site } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" eyebrow="05 — Reach out" heading={contact.heading}>
      <Reveal className="max-w-xl">
        <p className="text-lg leading-relaxed text-neutral-600">{contact.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            <Mail size={16} />
            {site.email}
          </a>
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
          {site.social.instagram && (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-neutral-400 transition-colors hover:text-neutral-950"
            >
              <Instagram size={20} />
            </a>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
