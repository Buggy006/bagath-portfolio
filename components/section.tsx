import { Reveal } from "./reveal";

/** Shared section shell: anchor id, consistent spacing, eyebrow + heading. */
export function Section({
  id,
  eyebrow,
  heading,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-content px-6 py-24 sm:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
