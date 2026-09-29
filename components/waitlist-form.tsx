"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { fitness, site } from "@/content/site";
import { usePersona } from "./persona";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Real waitlist signup — POSTs to the serverless backend (see
 * infra/waitlist.tf). Until NEXT_PUBLIC_API_BASE_URL is configured
 * the component degrades to the old mailto CTA, so the static site
 * works before (and without) the backend deployment.
 */
export function WaitlistForm({ variant }: { variant: "amber" | "accent" }) {
  const { persona } = usePersona();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const solid =
    variant === "amber"
      ? "bg-amber-700 hover:bg-amber-800"
      : "bg-accent hover:bg-accent-strong";
  const ring = variant === "amber" ? "focus:border-amber-400" : "focus:border-accent";

  if (!API_BASE) {
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(fitness.cta.subject)}`;
    return (
      <a
        href={mailto}
        className={`rounded-full px-6 py-3 text-sm font-medium text-white transition-colors ${solid}`}
      >
        {fitness.cta.text}
      </a>
    );
  }

  if (state === "done") {
    return (
      <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-700">
        <Check size={16} /> You&apos;re on the list — talk soon!
      </p>
    );
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = (new FormData(e.currentTarget).get("website") as string) || "";
    setState("loading");
    try {
      const res = await fetch(`${API_BASE}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, persona, website: honeypot }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      {/* Honeypot — hidden from humans, tempting for bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className={`w-full flex-1 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm outline-none transition-colors ${ring}`}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-colors disabled:opacity-60 ${solid}`}
      >
        {state === "loading" && <Loader2 size={16} className="animate-spin" />}
        {fitness.cta.text}
      </button>
      {state === "error" && (
        <p className="text-sm text-red-600 sm:self-center">
          Something broke — try again in a minute.
        </p>
      )}
    </form>
  );
}
