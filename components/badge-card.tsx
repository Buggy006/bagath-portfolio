"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { usePersona } from "./persona";

/**
 * Floating ID badge, bottom-left of the hero — a conference-style
 * dev pass in engineer mode, a gym pass in athlete mode. 3D tilt,
 * glare sweep, barcode strip. Desktop only, decorative.
 */

const passes = {
  engineer: {
    kind: "ENGINEER PASS",
    role: "Software Engineer",
    rows: [
      { label: "GITHUB", value: "@Buggy006" },
      { label: "BASE", value: "Chennai · IN" },
      { label: "STACK", value: "Python · AWS · Terraform" },
    ],
    id: "BS-2022 · PROD ACCESS",
  },
  athlete: {
    kind: "ATHLETE PASS",
    role: "Strength & Systems",
    rows: [
      { label: "INSTA", value: "@_buggy.so_" },
      { label: "BASE", value: "Chennai · IN" },
      { label: "FOCUS", value: "Train · Fuel · Repeat" },
    ],
    id: "BS-2022 · GYM FLOOR",
  },
} as const;

export function BadgeCard() {
  const { persona } = usePersona();
  const pass = passes[persona];

  const style = {
    top: "58%",
    left: "5%",
    "--dur": "8.6s",
    "--delay": "0.4s",
    "--rot": "0deg",
  } as React.CSSProperties;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="floater absolute w-[290px]" style={style}>
        <div
          key={persona}
          className="badge-glare relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_28px_60px_-18px_rgb(var(--accent)/0.5)]"
          style={{ transform: "perspective(900px) rotateX(4deg) rotateY(-7deg)" }}
        >
          {/* Accent band + lanyard slot */}
          <div className="h-2 bg-gradient-to-r from-accent to-accent-soft" />
          <div className="mx-auto mt-3 h-2.5 w-16 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]" />

          <div className="px-6 pb-5 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
              {pass.kind}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <Image
                src="/images/about.jpg"
                alt=""
                width={64}
                height={80}
                className="h-20 w-16 rounded-lg border border-white/15 object-cover"
              />
              <div>
                <p className="text-lg font-semibold leading-tight text-white">{site.name}</p>
                <p className="mt-1 font-mono text-[11px] text-accent">{pass.role}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
              {pass.rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">
                    {row.label}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-200">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Barcode strip */}
            <div className="mt-5 flex items-center gap-3">
              <div
                className="h-8 flex-1 opacity-80"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 4px, #fff 4px 5px, transparent 5px 9px, #fff 9px 12px, transparent 12px 14px)",
                }}
              />
              <span className="font-mono text-[9px] tracking-wider text-neutral-500">
                {pass.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
