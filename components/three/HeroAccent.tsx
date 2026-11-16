"use client";

import dynamic from "next/dynamic";

import { OrbitMark } from "@/components/graphics/OrbitMark";
import { useFinePointer, useMediaQuery, useMounted, usePrefersReducedMotion } from "@/lib/utils/hooks";
import { cn } from "@/lib/utils/cn";

const OrbitScene = dynamic(() => import("@/components/three/OrbitScene"), { ssr: false });

export function HeroAccent({ className }: { className?: string }) {
  const mounted = useMounted();
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const narrow = useMediaQuery("(max-width: 1023px)", true);
  const live = mounted && !reduced && fine && !narrow;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      <OrbitMark
        className={cn(
          "absolute inset-0 h-full w-full opacity-40 transition-opacity duration-cinematic",
          live && "opacity-20",
        )}
      />
      {live ? <OrbitScene /> : null}
    </div>
  );
}
