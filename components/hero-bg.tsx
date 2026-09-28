import type { Persona } from "./persona";

/**
 * Decorative isometric "plexus" mesh behind the hero cluster:
 * a triangular lattice with seeded-random line segments and node
 * dots, colored by one gradient sweep (cool for engineer, warm for
 * athlete). Deterministic generation — same output on server and
 * client, so no hydration drift. Desktop only; dots twinkle via CSS.
 */

const SPACING = 60;
const COLS = 17;
const ROWS = 15;

// Mulberry32 — tiny seeded PRNG so the pattern is stable across builds.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Line = { x1: number; y1: number; x2: number; y2: number };
type Dot = { x: number; y: number; delay: string };

function buildPattern() {
  const rand = mulberry32(20261);
  const lines: Line[] = [];
  const dots: Dot[] = [];
  const rowH = SPACING * 0.866; // triangular lattice row height

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = c * SPACING + (r % 2 === 1 ? SPACING / 2 : 0);
      const y = r * rowH;
      // Neighbors: right, down-right, down-left (isometric directions)
      const neighbors = [
        { x: x + SPACING, y },
        { x: x + SPACING / 2, y: y + rowH },
        { x: x - SPACING / 2, y: y + rowH },
      ];
      for (const n of neighbors) {
        if (rand() < 0.16) lines.push({ x1: x, y1: y, x2: n.x, y2: n.y });
      }
      if (rand() < 0.3) {
        dots.push({ x, y, delay: `${(rand() * 4).toFixed(2)}s` });
      }
    }
  }
  return { lines, dots };
}

const { lines, dots } = buildPattern();

const gradients: Record<Persona, string[]> = {
  engineer: ["#22d3ee", "#3b82f6", "#8b5cf6", "#d946ef"],
  athlete: ["#fcd34d", "#f97316", "#ef4444", "#e11d48"],
};

export function HeroBackground({ persona }: { persona: Persona }) {
  const stops = gradients[persona];
  const id = `hbg-${persona}`;

  return (
    <div
      aria-hidden
      className="hero-bg pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 960 780"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sweep from cool/warm start at bottom-left to the hot end top-right */}
          <linearGradient
            id={id}
            x1="0"
            y1="780"
            x2="960"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            {stops.map((color, i) => (
              <stop
                key={color}
                offset={i / (stops.length - 1)}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
        <g stroke={`url(#${id})`} strokeWidth="1.5" fill="none" opacity="0.75">
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
          ))}
        </g>
        <g fill={`url(#${id})`}>
          {dots.map((d, i) => (
            <circle
              key={i}
              className="bg-dot"
              cx={d.x}
              cy={d.y}
              r="3.2"
              style={{ animationDelay: d.delay }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
