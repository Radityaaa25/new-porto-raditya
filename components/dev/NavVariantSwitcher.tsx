"use client";

import { useCallback, useSyncExternalStore } from "react";

import { navVariant, type NavVariant } from "@/content/site";
import { cn } from "@/lib/utils/cn";

const VARIANTS: ReadonlyArray<NavVariant> = ["top", "bottom", "left", "right"];

const isVariant = (value: string | null): value is NavVariant =>
  value === "top" || value === "bottom" || value === "left" || value === "right";

export function NavVariantSwitcher() {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("portfolio:nav", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("portfolio:nav", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, []);

  const getSnapshot = (): NavVariant => {
    const value = new URLSearchParams(window.location.search).get("nav");
    return isVariant(value) ? value : navVariant;
  };

  const active = useSyncExternalStore(subscribe, getSnapshot, () => navVariant);

  const select = (next: NavVariant) => {
    const url = new URL(window.location.href);
    url.searchParams.set("nav", next);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new CustomEvent("portfolio:nav", { detail: next }));
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">Variant</span>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Navigation variant">
        {VARIANTS.map((variant) => (
          <button
            key={variant}
            type="button"
            aria-pressed={active === variant}
            onClick={() => select(variant)}
            className={cn(
              "rounded-pill border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors duration-ui",
              active === variant ? "border-accent text-accent" : "border-line text-muted hover:text-fg",
            )}
          >
            {variant}
          </button>
        ))}
      </div>
      <p className="text-muted text-body-sm">
        Side variants fall back to bottom below 768px. The query parameter only overrides the config
        on preview and development hosts.
      </p>
    </div>
  );
}
