import { cn } from "@/lib/utils/cn";

export function OrbitMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      fill="none"
      className={cn("text-accent", className)}
    >
      <g className="orbit-spin-slow" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeOpacity="0.22" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeDasharray="2 10" />
        <circle cx="350" cy="200" r="5" fill="currentColor" />
        <circle cx="50" cy="200" r="3" fill="currentColor" fillOpacity="0.7" />
      </g>
      <g className="orbit-spin-reverse" style={{ transformOrigin: "200px 200px" }}>
        <ellipse
          cx="200"
          cy="200"
          rx="150"
          ry="58"
          stroke="currentColor"
          strokeOpacity="0.4"
          transform="rotate(-24 200 200)"
        />
        <circle cx="330" cy="146" r="4" fill="currentColor" />
      </g>
      <circle cx="200" cy="200" r="92" stroke="currentColor" strokeOpacity="0.14" />
      <circle cx="200" cy="200" r="54" stroke="currentColor" strokeOpacity="0.1" />
      <path d="M200 84v232M84 200h232" stroke="currentColor" strokeOpacity="0.12" />
      <path d="M118 118l164 164M282 118L118 282" stroke="currentColor" strokeOpacity="0.08" />
      <circle cx="200" cy="200" r="3" fill="currentColor" />
    </svg>
  );
}
