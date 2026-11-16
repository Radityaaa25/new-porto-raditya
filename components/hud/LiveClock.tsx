"use client";

import { useEffect, useRef } from "react";

import { site } from "@/content/site";
import { hud } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: site.timeZone,
});

type LiveClockProps = {
  className?: string;
  showLabel?: boolean;
};

export function LiveClock({ className, showLabel = true }: LiveClockProps) {
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      if (timeRef.current) {
        timeRef.current.textContent = formatter.format(new Date());
      }
    };
    update();
    const timer = window.setInterval(update, hud.clockTickMs);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={cn("inline-flex items-baseline gap-2 font-mono text-meta tabular-nums", className)}>
      {showLabel ? <span className="text-subtle uppercase tracking-[0.14em]">JKT</span> : null}
      <span ref={timeRef}>--:--:--</span>
    </span>
  );
}
