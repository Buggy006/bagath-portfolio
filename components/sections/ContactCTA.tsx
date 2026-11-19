import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { getSocialLinks } from '@/content/site'

/** Primary positioning, shown wherever this section appears. */
const PROFESSIONAL_IDENTITY = 'Backend Engineering · Cloud · Data · AI'

export function ContactCTA() {
  const socials = getSocialLinks()

  return (
    <section aria-labelledby="contact-cta-heading" className="relative overflow-hidden border-t border-hairline">
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-texture opacity-[0.5]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(229,72,77,0.55), transparent 68%)' }}
      />

      <div className="shell relative py-section">
        <Reveal className="max-w-3xl">
          <p className="label mb-6 flex items-center gap-3">
            <span aria-hidden className="inline-block h-px w-8 bg-signal" />
            Open to opportunities
          </p>
          <h2 id="contact-cta-heading" className="font-display text-display-lg text-balance text-bone">
            Backend Engineer building across Cloud, Data &amp; AI.
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-muted sm:text-lg">
            Interested in backend engineering roles involving scalable services, cloud platforms, data
            infrastructure and AI-powered applications.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>

            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="link-underline text-sm"
              >
                {social.label}
              </a>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted">{PROFESSIONAL_IDENTITY}</p>
        </Reveal>
      </div>
    </section>
  )
}
