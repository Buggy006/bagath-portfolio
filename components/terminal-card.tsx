"use client";

import { usePersona } from "./persona";

/**
 * Floating terminal card, bottom-left of the hero — gradient-framed
 * glass console with persona-specific session lines and a blinking
 * cursor. Desktop only, decorative.
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
  const host = persona === "engineer" ? "bagath@aws" : "buggy@gym";

  const style = {
    top: "62%",
    left: "4%",
    "--dur": "8.6s",
    "--delay": "0.4s",
    "--rot": "-2deg",
  } as React.CSSProperties;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {/* Gradient frame + accent glow */}
      <div
        className="floater absolute w-[360px] rounded-2xl bg-gradient-to-br from-accent/70 via-neutral-700/40 to-accent-soft/60 p-px shadow-[0_24px_60px_-16px_rgb(var(--accent)/0.45)] transition-shadow"
        style={style}
      >
        <div className="overflow-hidden rounded-2xl bg-neutral-900/95 backdrop-blur">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/90" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              {persona === "engineer" ? "zsh — production" : "zsh — training"}
            </span>
          </div>

          {/* Session — keyed by persona so the stagger replays on switch */}
          <div key={persona} className="space-y-2 px-5 py-4 font-mono text-xs leading-relaxed">
            {lines.map((line, i) => (
              <p key={i} className="terminal-line" style={{ animationDelay: `${i * 0.35}s` }}>
                {line.cmd ? (
                  <>
                    <span className="font-semibold text-accent">{line.prompt}</span>
                    <span className="text-neutral-500"> % </span>
                    <span className="text-neutral-50">{line.cmd}</span>
                  </>
                ) : (
                  <span className="text-emerald-400/90">{line.out}</span>
                )}
              </p>
            ))}
            <p className="terminal-line" style={{ animationDelay: `${lines.length * 0.35}s` }}>
              <span className="font-semibold text-accent">{host}</span>
              <span className="text-neutral-500"> % </span>
              <span className="terminal-caret text-neutral-50">▌</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
