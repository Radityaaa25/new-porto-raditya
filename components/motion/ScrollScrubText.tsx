"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { ease } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

export function ScrollScrubText({
  text,
  className,
  pin = false,
}: {
  text: string;
  className?: string;
  pin?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const words = element.querySelectorAll<HTMLElement>("[data-word]");
      if (reduced || words.length === 0) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: ease.linear,
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
              end: pin ? "+=42%" : "bottom 58%",
              scrub: 0.7,
              pin: pin,
              pinSpacing: pin,
              anticipatePin: 1,
            },
          },
        );
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: ease.linear,
            scrollTrigger: { trigger: element, start: "top 85%", end: "bottom 65%", scrub: 0.6 },
          },
        );
      });

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: ref, dependencies: [reduced, pin, text], revertOnUpdate: true },
  );

  return (
    <p ref={ref} className={cn("flex flex-wrap gap-x-[0.28em] gap-y-1", className)}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} data-word className="inline-block will-change-[opacity]">
          {word}
        </span>
      ))}
    </p>
  );
}
