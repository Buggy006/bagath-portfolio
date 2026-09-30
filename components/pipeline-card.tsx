"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { usePersona } from "./persona";

/**
 * Floating status card, bottom-left of the hero — a minimal stepper
 * where each stage checks off in sequence along a filling progress
 * line, then the run summary appears. Engineer mode rotates between
 * the CI/CD and data-pipeline runs; athlete mode shows the training
 * week. Desktop only, decorative.
 */

type Step = { label: string; meta: string };
type Flow = { caption: string; status: string; steps: Step[] };

const flows: Record<string, Flow[]> = {
  engineer: [
    {
      caption: "ci/cd — portfolio deploy",
      status: "Deployed to prod · 34s",
      steps: [
        { label: "Commit · git push", meta: "2s" },
        { label: "Build · tests green", meta: "18s" },
        { label: "Terraform · apply", meta: "9s" },
        { label: "Deploy · CloudFront", meta: "5s" },
      ],
    },
    {
      caption: "etl — daily metrics run",
      status: "Pipeline healthy · 5 metrics",
      steps: [
        { label: "S3 · ingest raw data", meta: "1.2 GB" },
        { label: "Glue · transform", meta: "41s" },
        { label: "Lambda · process", meta: "12s" },
        { label: "Publish · dashboards", meta: "ok" },
      ],
    },
  ],
  athlete: [
    {
      caption: "training — week 6",
      status: "Streak intact · no misses",
      steps: [
        { label: "Train · push day", meta: "5×5" },
        { label: "Fuel · on target", meta: "2.8k kcal" },
        { label: "Sleep · recovery", meta: "8 h" },
        { label: "Repeat · next block", meta: "wk 7" },
      ],
    },
  ],
};

const ROTATE_MS = 8000;

export function PipelineCard() {
  const { persona } = usePersona();
  const list = flows[persona];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
    if (list.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % list.length), ROTATE_MS);
    return () => window.clearInterval(t);
  }, [list]);

  const flow = list[idx] ?? list[0];

  const style = {
    top: "58%",
    left: "4.5%",
    "--dur": "8.6s",
    "--delay": "0.4s",
    "--rot": "0deg",
  } as React.CSSProperties;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="floater absolute w-[300px]" style={style}>
        <div
          key={`${persona}-${flow.caption}`}
          className="pipe-swap rounded-2xl border border-neutral-200/80 bg-white/85 px-6 py-5 shadow-[0_24px_50px_-24px_rgb(var(--accent)/0.4)] backdrop-blur"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[11px] tracking-wide text-neutral-500">
                {flow.caption}
              </span>
            </span>
            {list.length > 1 && (
              <span className="flex gap-1.5">
                {list.map((f, i) => (
                  <span
                    key={f.caption}
                    className={`h-1 w-1 rounded-full ${i === idx ? "bg-accent" : "bg-neutral-300"}`}
                  />
                ))}
              </span>
            )}
          </div>

          {/* Steps along a filling progress line */}
          <div className="relative mt-4">
            <span className="absolute bottom-4 left-[9px] top-4 w-px bg-neutral-200" />
            <span className="step-fill absolute bottom-4 left-[9px] top-4 w-px bg-accent" />

            {flow.steps.map((step, i) => (
              <div
                key={step.label}
                className="step-row relative flex items-center gap-3.5 py-2"
                style={{ "--sd": `${0.3 + i * 0.9}s` } as React.CSSProperties}
              >
                <span className="step-dot relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-neutral-300 bg-white">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span className="flex-1 font-mono text-xs text-neutral-700">{step.label}</span>
                <span className="font-mono text-[10px] text-neutral-400">{step.meta}</span>
              </div>
            ))}
          </div>

          {/* Run summary */}
          <div className="step-status mt-3 border-t border-neutral-100 pt-3">
            <span className="flex items-center gap-2 font-mono text-[11px] text-emerald-600">
              <Check size={12} strokeWidth={3} />
              {flow.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
