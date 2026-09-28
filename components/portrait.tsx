import Image from "next/image";

/**
 * Background-removed portrait cutout, rising from the hero's bottom-left
 * gutter — grayscale against persona-colored accent shapes (reference:
 * dramatic b&w portrait + brand-color circles). The width formula fills
 * the empty gutter left of the centered content column, so the portrait
 * grows with the viewport: modest at 1440px, dominant on wide monitors.
 * Desktop only; decorative (aria-hidden), never blocks interaction.
 */
export function Portrait() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 hidden lg:block"
      style={{ width: "clamp(230px, calc((100vw - 1000px) / 2), 560px)" }}
    >
      {/* Accent shapes behind the cutout — persona-colored */}
      <div className="absolute right-[-8%] top-[12%] z-0 h-[34%] w-auto aspect-square rounded-full bg-accent opacity-90 transition-colors" />
      <div className="absolute right-[-14%] top-[46%] z-0 h-[18%] aspect-square rounded-full border-[6px] border-accent-soft transition-colors" />
      <div className="absolute right-[6%] top-[6%] z-0 h-[7%] aspect-square rounded-full bg-neutral-900" />

      <Image
        src="/images/portrait-cutout.webp"
        alt=""
        width={900}
        height={1009}
        priority
        className="relative z-10 h-auto w-full grayscale"
      />
    </div>
  );
}
