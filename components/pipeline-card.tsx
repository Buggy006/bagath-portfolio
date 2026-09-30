"use client";

import {
  Apple,
  Dumbbell,
  GitBranch,
  Hammer,
  Layers,
  Moon,
  RefreshCw,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { usePersona } from "./persona";

/**
 * Floating pipeline diagram, bottom-left of the hero — a zigzag flow
 * whose connectors carry a marching-dash current while nodes glow in
 * sequence. Engineer: DevOps pipeline. Athlete: training loop (with a
 * return edge closing the cycle). Desktop only, decorative.
 */

type Node = { icon: LucideIcon; label: string; top: number; left: number };

const flows = {
  engineer: {
    caption: "// devops pipeline",
    status: "✓ shipped to prod",
    loop: false,
    nodes: [
      { icon: GitBranch, label: "Commit · git push", top: 0, left: 0 },
      { icon: Hammer, label: "Build · CI green", top: 84, left: 130 },
      { icon: Layers, label: "Terraform · apply", top: 168, left: 0 },
      { icon: Rocket, label: "Deploy · live", top: 252, left: 130 },
    ] as Node[],
  },
  athlete: {
    caption: "// training loop",
    status: "✓ 6-week streak",
    loop: true,
    nodes: [
      { icon: Dumbbell, label: "Train · push day", top: 0, left: 0 },
      { icon: Apple, label: "Fuel · on target", top: 84, left: 130 },
      { icon: Moon, label: "Sleep · 8 hours", top: 168, left: 0 },
      { icon: RefreshCw, label: "Repeat · no misses", top: 252, left: 130 },
    ] as Node[],
  },
} as const;

// Connector curves between node centers (SVG sits behind the chips).
const EDGES = [
  "M 80 22 C 170 30, 200 60, 210 104",
  "M 210 106 C 130 120, 100 150, 80 188",
  "M 80 190 C 170 200, 200 230, 210 272",
];
const LOOP_EDGE = "M 268 272 C 320 200, 320 90, 105 14";

export function PipelineCard() {
  const { persona } = usePersona();
  const flow = flows[persona];

  const style = {
    top: "57%",
    left: "4.5%",
    "--dur": "8.6s",
    "--delay": "0.4s",
    "--rot": "0deg",
  } as React.CSSProperties;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div key={persona} className="floater absolute w-[330px]" style={style}>
        <p className="mb-3 font-mono text-[11px] tracking-wider text-neutral-400">
          {flow.caption}
        </p>

        <div className="relative h-[296px]">
          <svg
            className="absolute -inset-x-2 inset-y-0 h-full w-[calc(100%+16px)] overflow-visible"
            viewBox="0 0 330 296"
            fill="none"
          >
            {EDGES.map((d) => (
              <path
                key={d}
                d={d}
                className="pipe-line"
                stroke="rgb(var(--accent) / 0.5)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
            ))}
            {flow.loop && (
              <path
                d={LOOP_EDGE}
                className="pipe-line"
                stroke="rgb(var(--accent) / 0.3)"
                strokeWidth="2"
                strokeDasharray="3 9"
                strokeLinecap="round"
              />
            )}
          </svg>

          {flow.nodes.map((node, i) => (
            <div
              key={node.label}
              className="pipe-node absolute flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white/90 py-2.5 pl-3 pr-4 backdrop-blur"
              style={{ top: node.top, left: node.left, "--nd": `${i * 0.95}s` } as React.CSSProperties}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft/60 text-accent">
                <node.icon size={15} strokeWidth={2.2} />
              </span>
              <span className="whitespace-nowrap font-mono text-xs text-neutral-700">{node.label}</span>
            </div>
          ))}
        </div>

        <p className="mt-3 font-mono text-[11px] tracking-wider text-emerald-600">
          {flow.status}
        </p>
      </div>
    </div>
  );
}
