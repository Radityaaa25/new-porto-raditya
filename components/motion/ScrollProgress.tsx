"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/motion/gsap";

export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      gsap.set(bar, { scaleX: gsap.utils.clamp(0, 1, progress) });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-fine-only fixed inset-x-0 top-0 z-hud h-px">
      <span ref={ref} className="bg-accent block h-px origin-left scale-x-0" />
    </div>
  );
}
