"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

export function Marquee({ children, reverse = false, pauseOnHover = true, className }: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden", pauseOnHover && "marquee-paused", className)}
      role="presentation"
    >
      <div className={cn("flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
