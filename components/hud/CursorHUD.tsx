"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/motion/gsap";
import { hud } from "@/lib/motion/tokens";

const pad = (value: number): string => String(Math.round(value)).padStart(4, "0");

export function CursorHUD() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const readout = readoutRef.current;
    if (!dot || !ring || !label || !readout) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const moveX = gsap.quickTo(dot, "x", { duration: hud.coordsThrottleMs / 1000, ease: "power2.out" });
    const moveY = gsap.quickTo(dot, "y", { duration: hud.coordsThrottleMs / 1000, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.12, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.12, ease: "power2.out" });
    const labelX = gsap.quickTo(label, "x", { duration: 0.16, ease: "power2.out" });
    const labelY = gsap.quickTo(label, "y", { duration: 0.16, ease: "power2.out" });

    let frame = 0;
    let suppressed = false;
    const onMove = (event: PointerEvent) => {
      if (frame || suppressed) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        moveX(event.clientX);
        moveY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        labelX(event.clientX + 18);
        labelY(event.clientY + 18);
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        readout.style.opacity = "1";
        readout.textContent = `X ${pad(event.clientX)} / Y ${pad(event.clientY)}`;
      });
    };

    const setState = (mode: "default" | "link" | "view" | "text") => {
      const view = mode === "view";
      const link = mode === "link" || view;
      gsap.to(dot, { scale: view ? 0 : link ? 0.6 : 1, duration: 0.2, ease: "power2.out" });
      gsap.to(ring, { scale: view ? 2.2 : link ? 1.45 : mode === "text" ? 0.35 : 1, duration: 0.24, ease: "power2.out" });
      label.textContent = view ? "VIEW" : mode === "text" ? "" : "";
      gsap.to(label, { opacity: view ? 1 : 0, duration: 0.18 });
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button, input, textarea, [data-cursor]");
      if (!target) return setState("default");
      if (target.dataset.cursor === "view") return setState("view");
      if (target.matches("input, textarea")) return setState("text");
      setState("link");
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      label.style.opacity = "0";
      readout.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const footer = document.querySelector("footer");
    const observer = footer
      ? new IntersectionObserver(
          ([entry]) => {
            suppressed = entry.isIntersecting;
            if (suppressed) onLeave();
          },
          { threshold: 0.01 },
        )
      : null;
    if (observer && footer) observer.observe(footer);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      observer?.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-fine-only">
      <span ref={ringRef} className="border-accent pointer-events-none fixed top-0 left-0 z-cursor block size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0" />
      <span ref={dotRef} className="bg-accent pointer-events-none fixed top-0 left-0 z-cursor block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0" />
      <span ref={labelRef} className="text-accent pointer-events-none fixed top-0 left-0 z-cursor block font-mono text-meta uppercase tracking-[0.14em] opacity-0">
        VIEW
      </span>
      <span ref={readoutRef} className="cursor-readout text-muted pointer-events-none fixed bottom-[var(--hud-inset)] left-[var(--gutter)] z-hud font-mono text-meta tabular-nums opacity-0 transition-opacity duration-ui">
        X 0000 / Y 0000
      </span>
    </div>
  );
}
