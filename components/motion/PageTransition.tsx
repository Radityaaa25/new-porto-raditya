"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/motion/gsap";
import { fadeUpSm, resolveMotion } from "@/lib/motion/presets";
import { duration } from "@/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const preset = resolveMotion(fadeUpSm({ duration: duration.reveal }), prefersReduced);
      gsap.fromTo(element, preset.from, {
        ...preset.to,
        duration: preset.duration,
        ease: preset.ease,
        delay: preset.delay,
      });
    },
    { scope: ref, dependencies: [prefersReduced], revertOnUpdate: true },
  );

  return <div ref={ref}>{children}</div>;
}
