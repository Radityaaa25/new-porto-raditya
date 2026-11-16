"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/motion/gsap";
import { hud } from "@/lib/motion/tokens";

const pad = (value: number): string => String(Math.round(value)).padStart(4, "0");

export function CursorHUD() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const readout = readoutRef.current;
    if (!dot || !readout) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const moveX = gsap.quickTo(dot, "x", { duration: hud.coordsThrottleMs / 1000, ease: "power2.out" });
    const moveY = gsap.quickTo(dot, "y", { duration: hud.coordsThrottleMs / 1000, ease: "power2.out" });

    let frame = 0;
    let suppressed = false;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      if (suppressed) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        moveX(event.clientX);
        moveY(event.clientY);
        dot.style.opacity = "1";
        readout.textContent = `X ${pad(event.clientX)} / Y ${pad(event.clientY)}`;
        readout.style.opacity = "1";
      });
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      readout.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const footer = document.querySelector("footer");
    const observer = footer
      ? new IntersectionObserver(
          ([entry]) => {
            suppressed = entry.isIntersecting;
            if (suppressed) {
              dot.style.opacity = "0";
              readout.style.opacity = "0";
            }
          },
          { threshold: 0.01 },
        )
      : null;
    if (observer && footer) observer.observe(footer);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      observer?.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-fine-only">
      <span
        ref={dotRef}
        className="border-accent pointer-events-none fixed top-0 left-0 z-cursor block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0 mix-blend-difference"
      />
      <span
        ref={readoutRef}
        className="text-muted pointer-events-none fixed right-[var(--gutter)] bottom-[var(--gutter)] z-hud font-mono text-meta tabular-nums opacity-0 transition-opacity duration-ui"
      >
        X 0000 / Y 0000
      </span>
    </div>
  );
}
