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
import type { Persona } from "./persona";

/**
 * Floating full-color logo cluster for the hero (desktop only).
 * Presentation data lives here, not in content/site.ts — positions,
 * colors and timing are design, not copy. Positions are % based and
 * stay right of the hero text column (left >= 55%).
 */

type Floater = {
  brand?: { path: string };
  lucide?: LucideIcon;
  color: string;
  size: number;
  top: string;
  left: string;
  dur: string;
  delay: string;
  rot: string;
};

const floaters: Record<Persona, Floater[]> = {
  engineer: [
    { lucide: Cloud, color: "#FF9900", size: 60, top: "14%", left: "68%", dur: "7s", delay: "0s", rot: "-8deg" },
    { brand: siPython, color: "#3776AB", size: 48, top: "32%", left: "84%", dur: "6s", delay: "0.8s", rot: "10deg" },
    { brand: siTerraform, color: "#7B42BC", size: 40, top: "6%", left: "87%", dur: "8s", delay: "1.6s", rot: "-14deg" },
    { brand: siGit, color: "#F05032", size: 42, top: "56%", left: "64%", dur: "6.5s", delay: "0.4s", rot: "8deg" },
    { lucide: Database, color: "#059669", size: 46, top: "74%", left: "80%", dur: "7.5s", delay: "2s", rot: "-6deg" },
    { lucide: InfinityIcon, color: "#0284C7", size: 50, top: "44%", left: "93%", dur: "5.5s", delay: "1.2s", rot: "12deg" },
    { lucide: Sparkles, color: "#8B5CF6", size: 42, top: "24%", left: "57%", dur: "8.5s", delay: "0.6s", rot: "-10deg" },
    { lucide: Bot, color: "#DB2777", size: 54, top: "78%", left: "58%", dur: "6.8s", delay: "1.8s", rot: "6deg" },
  ],
  athlete: [
    { lucide: Dumbbell, color: "#B45309", size: 60, top: "16%", left: "70%", dur: "7s", delay: "0s", rot: "-10deg" },
    { lucide: HeartPulse, color: "#EF4444", size: 48, top: "36%", left: "86%", dur: "6s", delay: "0.9s", rot: "8deg" },
    { lucide: Apple, color: "#22C55E", size: 40, top: "7%", left: "58%", dur: "8s", delay: "1.5s", rot: "12deg" },
    { lucide: Timer, color: "#0284C7", size: 42, top: "56%", left: "63%", dur: "6.4s", delay: "0.5s", rot: "-8deg" },
    { lucide: Flame, color: "#F97316", size: 46, top: "74%", left: "78%", dur: "7.6s", delay: "2.2s", rot: "6deg" },
    { lucide: Trophy, color: "#EAB308", size: 44, top: "28%", left: "60%", dur: "8.4s", delay: "1.1s", rot: "-12deg" },
    { lucide: Moon, color: "#6366F1", size: 36, top: "64%", left: "92%", dur: "5.8s", delay: "0.3s", rot: "10deg" },
  ],
};

export function Floaters({ persona }: { persona: Persona }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {floaters[persona].map((f, i) => {
        const style = {
          top: f.top,
          left: f.left,
          "--dur": f.dur,
          "--delay": f.delay,
          "--rot": f.rot,
        } as React.CSSProperties;

        return (
          <span key={i} className="floater absolute" style={style}>
            {f.brand ? (
              <svg
                viewBox="0 0 24 24"
                width={f.size}
                height={f.size}
                fill={f.color}
                className="drop-shadow-sm"
              >
                <path d={f.brand.path} />
              </svg>
            ) : f.lucide ? (
              <f.lucide
                size={f.size}
                color={f.color}
                strokeWidth={1.75}
                className="drop-shadow-sm"
              />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
