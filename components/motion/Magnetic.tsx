"use client";

import { useRef, type ReactNode } from "react";

import { gsap } from "@/lib/motion/gsap";
import { cursor, duration, ease } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/utils/hooks";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = cursor.followLerp, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const prefersReduced = usePrefersReducedMotion();

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element || !finePointer || prefersReduced) return;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * strength;
    const y = (event.clientY - bounds.top - bounds.height / 2) * strength;
    gsap.to(element, { x, y, duration: duration.ui, ease: ease.expo, overwrite: "auto" });
  };

  const onPointerLeave = () => {
    const element = ref.current;
    if (!element) return;
    gsap.to(element, { x: 0, y: 0, duration: duration.reveal, ease: ease.expo, overwrite: "auto" });
  };

  return (
    <div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </div>
  );
}
