"use client";

import { useState } from "react";

import { WorkIndex } from "@/components/work/WorkIndex";

type Item = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  roleKey: "Personal" | "Team";
  stack: ReadonlyArray<string>;
  index: string;
};

export function WorkBrowser({
  projects,
  filters,
  hint,
  stackLabel,
}: {
  projects: ReadonlyArray<Item>;
  filters: { label: string; all: string; personal: string; team: string };
  hint: string;
  stackLabel: string;
}) {
  const [active, setActive] = useState<"all" | "Personal" | "Team">("all");
  const visible = projects.filter((project) => active === "all" || project.roleKey === active);
  const change = (next: typeof active) => {
    const transition = (document as Document & { startViewTransition?: (callback: () => void) => void }).startViewTransition;
    if (transition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      transition.call(document, () => setActive(next));
    } else {
      setActive(next);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{filters.label}</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label={filters.label}>
          {[
            ["all", filters.all],
            ["Personal", filters.personal],
            ["Team", filters.team],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={active === key}
              onClick={() => change(key as typeof active)}
              className={`rounded-pill border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors duration-ui ${
                active === key
                  ? "border-accent text-accent"
                  : "border-line text-muted hover:text-fg"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div key={active} className="animate-[fade-in_.3s_var(--curve-ui)]" style={{ viewTransitionName: "work-list" }}>
        <WorkIndex
          projects={visible.map((project) => ({
            slug: project.slug,
            title: project.title,
            summary: project.summary,
            role: project.role,
            stack: project.stack,
            index: project.index,
          }))}
          hint={hint}
          stackLabel={stackLabel}
        />
      </div>
    </div>
  );
}
