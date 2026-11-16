"use client";

import { useRef, type ElementType, type HTMLAttributes } from "react";

import { gsap, useGSAP } from "@/lib/motion/gsap";
import { fadeUp, resolveMotion, scrollDefaults } from "@/lib/motion/presets";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  delay?: number;
  y?: number;
  once?: boolean;
  duration?: number;
  ease?: string;
  waitForReady?: boolean;
  trigger?: "scroll" | "mount";
};

const READY_EVENT = "portfolio:ready";

export function Reveal({
  as: Tag = "div",
  delay = 0,
  y,
  once = true,
  duration,
  ease,
  waitForReady = false,
  trigger = "scroll",
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const preset = resolveMotion(fadeUp({ delay, y, duration, ease }), prefersReduced);

      const play = () => {
        gsap.fromTo(element, preset.from, {
          ...preset.to,
          duration: preset.duration,
          ease: preset.ease,
          delay: preset.delay,
          scrollTrigger:
            trigger === "scroll"
              ? {
                  trigger: element,
                  start: scrollDefaults.start,
                  once,
                }
              : undefined,
        });
      };

      if (waitForReady && document.documentElement.dataset.ready !== "true") {
        gsap.set(element, preset.from);
        const onReady = () => play();
        window.addEventListener(READY_EVENT, onReady, { once: true });
        return () => window.removeEventListener(READY_EVENT, onReady);
      }

      play();
    },
    {
      scope: ref,
      dependencies: [prefersReduced, delay, y, once, duration, ease, waitForReady, trigger],
      revertOnUpdate: true,
    },
  );

  return (
    <Tag ref={ref} className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
