import Image from "next/image";
import { usePersona } from "./persona";

/**
 * Floating polaroid-style portrait, bottom-left of the hero.
 * Joins the floating-collage language: slight tilt, gentle bob
 * (reuses .floater), accent-tinted frame that follows the persona.
 * Desktop only, like the rest of the cluster.
 */
export function Portrait() {
  const { persona } = usePersona();
  const handle = persona === "engineer" ? "@Buggy006" : "@_buggy.so_";

  const style = {
    top: "63%",
    left: "4%",
    "--dur": "9s",
    "--delay": "0.6s",
    "--rot": "-4deg",
  } as React.CSSProperties;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div
        className="floater absolute rounded-xl bg-white p-3 pb-2 shadow-xl ring-1 ring-accent/30 transition-shadow"
        style={style}
      >
        <Image
          src="/images/portrait.jpg"
          alt=""
          width={168}
          height={210}
          priority
          className="rounded-md object-cover"
        />
        <p className="mt-1.5 text-center font-mono text-xs text-accent transition-colors">
          {handle}
        </p>
      </div>
    </div>
  );
}
