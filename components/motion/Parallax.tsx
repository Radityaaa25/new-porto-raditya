"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/motion/gsap";

export function Parallax({
  children,
  className,
  amount = 8,
  reveal = false,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        element,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
      if (reveal) {
        gsap.fromTo(
          element,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "cubic-bezier(0.66,0,0.01,1)",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          },
        );
      }
    },
    { scope: ref, dependencies: [amount, reveal], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
