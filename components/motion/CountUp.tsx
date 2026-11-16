"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { counterStep, scrollDefaults } from "@/lib/motion/presets";
import { duration, ease } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  durationSeconds?: number;
};

const format = (value: number, decimals: number): string =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  durationSeconds = duration.cinematic,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      if (prefersReduced) {
        element.textContent = `${prefix}${format(value, decimals)}${suffix}`;
        return;
      }

      const state = { progress: 0 };
      element.textContent = `${prefix}${format(0, decimals)}${suffix}`;

      gsap.to(state, {
        progress: 1,
        duration: durationSeconds,
        ease: ease.expo,
        onUpdate: () => {
          element.textContent = `${prefix}${format(counterStep(state.progress, value, decimals), decimals)}${suffix}`;
        },
        scrollTrigger: {
          trigger: element,
          start: scrollDefaults.start,
          once: true,
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: ref, dependencies: [value, decimals, prefix, suffix, durationSeconds, prefersReduced], revertOnUpdate: true },
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${prefix}${format(value, decimals)}${suffix}`}
    </span>
  );
}
