"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Persona = "engineer" | "athlete";

const PersonaContext = createContext<{
  persona: Persona;
  setPersona: (p: Persona) => void;
  switching: boolean;
}>({ persona: "engineer", setPersona: () => {}, switching: false });

export const usePersona = () => useContext(PersonaContext);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("engineer");
  const [switching, setSwitching] = useState(false);

  const commit = useCallback((p: Persona) => {
    setPersonaState(p);
    try {
      document.documentElement.dataset.persona = p;
      localStorage.setItem("persona", p);
      // Shareable mode links: ?p=athlete deep-links into athlete mode.
      const url = new URL(window.location.href);
      if (p === "engineer") url.searchParams.delete("p");
      else url.searchParams.set("p", p);
      window.history.replaceState({}, "", url);
    } catch {
      /* SSR / blocked storage — state alone is enough */
    }
  }, []);

  // Initial persona: URL param wins, then the visitor's last choice.
  useEffect(() => {
    try {
      const param = new URLSearchParams(window.location.search).get("p");
      const stored = localStorage.getItem("persona");
      if (param === "athlete" || (param !== "engineer" && stored === "athlete")) {
        commit("athlete");
        // The anchor target may not exist until athlete sections render,
        // so re-run the browser's hash jump after the swap.
        const hash = window.location.hash;
        if (hash) {
          window.setTimeout(() => {
            try {
              document.querySelector(hash)?.scrollIntoView();
            } catch {
              /* invalid hash — ignore */
            }
          }, 100);
        }
      }
    } catch {
      /* default persona stands */
    }
  }, [commit]);

  const setPersona = useCallback(
    (p: Persona) => {
      setSwitching(true);
      window.setTimeout(() => {
        commit(p);
        window.scrollTo({ top: 0 });
        setSwitching(false);
      }, 200);
    },
    [commit]
  );

  return (
    <PersonaContext.Provider value={{ persona, setPersona, switching }}>
      {children}
    </PersonaContext.Provider>
  );
}

/** Segmented control shown in the hero. */
export function PersonaToggle() {
  const { persona, setPersona } = usePersona();

  return (
    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white p-1 font-mono text-xs">
      {(["engineer", "athlete"] as const).map((p) => (
        <button
          key={p}
          aria-pressed={persona === p}
          onClick={() => persona !== p && setPersona(p)}
          className={`rounded-full px-4 py-1.5 uppercase tracking-wider transition-colors ${
            persona === p
              ? "bg-accent text-white"
              : "text-neutral-400 hover:text-neutral-700"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

/** Inline button that jumps to the other persona (used in teaser bands). */
export function PersonaSwitchButton({
  to,
  className = "",
  children,
}: {
  to: Persona;
  className?: string;
  children: React.ReactNode;
}) {
  const { setPersona } = usePersona();
  return (
    <button onClick={() => setPersona(to)} className={className}>
      {children}
    </button>
  );
}
