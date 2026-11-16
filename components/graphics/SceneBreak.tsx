import { cn } from "@/lib/utils/cn";

export function SceneBreak({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "border-line relative isolate overflow-hidden border-y py-16 md:py-24",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-accent"
        fill="none"
      >
        <defs>
          <pattern id="scene-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" stroke="currentColor" strokeOpacity="0.12" />
          </pattern>
        </defs>
        <rect width="1440" height="320" fill="url(#scene-grid)" />
        <g className="scene-pulse" style={{ transformOrigin: "720px 160px" }}>
          <circle cx="720" cy="160" r="80" stroke="currentColor" strokeOpacity="0.5" />
          <circle cx="720" cy="160" r="132" stroke="currentColor" strokeOpacity="0.28" strokeDasharray="3 12" />
          <circle cx="720" cy="160" r="190" stroke="currentColor" strokeOpacity="0.16" />
          <path d="M720 18v284M578 160h284" stroke="currentColor" strokeOpacity="0.2" />
          <path d="M720 56l34 70 74 34-74 34-34 70-34-70-74-34 74-34z" stroke="currentColor" strokeOpacity="0.55" />
        </g>
      </svg>
      <div className="gutter-x relative mx-auto flex w-full max-w-[var(--container-max)] items-end justify-between gap-6">
        <span className="text-subtle font-mono text-meta uppercase tracking-[0.18em]">
          RA / Interaction study
        </span>
        <span className="text-subtle font-mono text-meta uppercase tracking-[0.18em]">
          06.2088 S / 106.8456 E
        </span>
      </div>
    </div>
  );
}
