import {
  Apple,
  Bot,
  Cloud,
  Database,
  Dumbbell,
  Flame,
  HeartPulse,
  Infinity as InfinityIcon,
  Moon,
  Sparkles,
  Timer,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { siGit, siPython, siTerraform } from "simple-icons";

export type MarqueeItem = { label: string; icon: string };

/** Real brand glyphs (simple-icons paths), rendered monochrome. */
const brands: Record<string, { path: string }> = {
  python: siPython,
  git: siGit,
  terraform: siTerraform,
};

/** Concept icons for things that have no logo (and AWS, whose mark
    isn't licensed for icon sets — the label carries recognition). */
const concepts: Record<string, LucideIcon> = {
  aws: Cloud,
  dataeng: Database,
  devops: InfinityIcon,
  genai: Sparkles,
  agentic: Bot,
  strength: Dumbbell,
  conditioning: HeartPulse,
  nutrition: Apple,
  recovery: Moon,
  discipline: Flame,
  consistency: Timer,
  progress: Trophy,
};

function ItemIcon({ name }: { name: string }) {
  const brand = brands[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor" aria-hidden>
        <path d={brand.path} />
      </svg>
    );
  }
  const Lucide = concepts[name] ?? Sparkles;
  return <Lucide size={15} aria-hidden />;
}

function Row({ items, hidden }: { items: MarqueeItem[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex w-max items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <li
          key={item.label}
          className="flex shrink-0 items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-neutral-400 transition-colors hover:text-accent"
        >
          <ItemIcon name={item.icon} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite horizontal ticker: two identical rows, track slides -50%.
 * Pauses on hover; static row under prefers-reduced-motion (see globals.css).
 */
export function Marquee({ items }: { items: MarqueeItem[] }) {
  return (
    <div className="marquee max-w-2xl overflow-hidden">
      <div className="marquee-track flex w-max">
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}
