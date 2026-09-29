"use client";

import { usePersona } from "./persona";

/**
 * Floating terminal card, bottom-left of the hero — the "tech design"
 * element. Dark console with persona-specific session lines and a
 * blinking cursor; lines fade in staggered on persona switch.
 * Desktop only, decorative.
 */

type Line = { prompt?: string; cmd?: string; out?: string };

const sessions: Record<string, Line[]> = {
  engineer: [
    { prompt: "bagath@aws", cmd: "terraform apply" },
    { out: "✓ Apply complete — 24 resources" },
    { prompt: "bagath@aws", cmd: "python pipeline.py" },
    { out: "✓ 5 metrics shipped to prod" },
  ],
  athlete: [
    { prompt: "buggy@gym", cmd: "log workout --push-day" },
    { out: "✓ bench 5×5 · +2.5kg PR" },
    { prompt: "buggy@gym", cmd: "streak --status" },
    { out: "✓ 6 weeks · no missed sessions" },
  ],
};

export function TerminalCard() {
  const { persona } = usePersona();
  const lines = sessions[persona];

  const style = {
    top: "62%",
    left: "4%",
    "--dur": "8.6s",
    "--delay": "0.4s",
    "--rot": "-3deg",
  } as React.CSSProperties;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div
        className="floater absolute w-[330px] overflow-hidden rounded-xl bg-neutral-900 shadow-2xl"
        style={style}
      >
        {/* Title bar */}
        <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-2 font-mono text-[10px] text-neutral-500">
            {persona === "engineer" ? "zsh — production" : "zsh — training"}
          </span>
        </div>

        {/* Session — keyed by persona so the stagger replays on switch */}
        <div key={persona} className="space-y-1.5 px-4 py-3 font-mono text-xs leading-relaxed">
          {lines.map((line, i) => (
            <p
              key={i}
              className="terminal-line"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {line.cmd ? (
                <>
                  <span className="text-accent">{line.prompt}</span>
                  <span className="text-neutral-500"> % </span>
                  <span className="text-neutral-100">{line.cmd}</span>
                </>
              ) : (
                <span className="text-emerald-400">{line.out}</span>
              )}
            </p>
          ))}
          <p
            className="terminal-line"
            style={{ animationDelay: `${lines.length * 0.35}s` }}
          >
            <span className="text-accent">
              {persona === "engineer" ? "bagath@aws" : "buggy@gym"}
            </span>
            <span className="text-neutral-500"> % </span>
            <span className="terminal-caret text-neutral-100">▌</span>
          </p>
        </div>
      </div>
    </div>
  );
}
