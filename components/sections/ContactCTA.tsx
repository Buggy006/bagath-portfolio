import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { getSocialLinks, siteConfig } from '@/content/site'

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
            Looking for a Cloud Platform, Data or AI engineer?
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-muted sm:text-lg">
            I am interested in teams building infrastructure, data platforms or AI-backed products where the
            engineering quality of the system matters as much as the demo.
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

          <p className="mt-10 text-sm text-muted">
            Based in {siteConfig.location} · {siteConfig.role}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
