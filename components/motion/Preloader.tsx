"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/motion/gsap";
import { duration, ease, preloader } from "@/lib/motion/tokens";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

const STATUS = [
  "Warming up the grid",
  "Measuring the margins",
  "Setting the type",
  "Ready when you are",
];

const STORAGE_KEY = "preloader-seen";
const READY_EVENT = "portfolio:ready";

function signalReady() {
  document.documentElement.dataset.ready = "true";
  window.dispatchEvent(new Event(READY_EVENT));
}

type PreloaderProps = {
  onComplete?: () => void;
  force?: boolean;
};

export function Preloader({ onComplete, force = false }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const signRef = useRef<HTMLSpanElement>(null);
  const callbackRef = useRef(onComplete);
  const { stop, start } = useSmoothScroll();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    callbackRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen && !force) {
      root.style.display = "none";
      signalReady();
      callbackRef.current?.();
      return;
    }

    stop();

    let finished = false;
    let signalled = false;
    let statusTimer = 0;
    const statusIndex = { value: 0 };

    const signal = () => {
      if (signalled) return;
      signalled = true;
      signalReady();
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      signal();
      window.clearInterval(statusTimer);
      root.style.display = "none";
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        void 0;
      }
      start();
      callbackRef.current?.();
    };

    const setStatus = () => {
      if (!statusRef.current) return;
      statusIndex.value = (statusIndex.value + 1) % STATUS.length;
      statusRef.current.textContent = STATUS[statusIndex.value];
    };

    const context = gsap.context(() => {
      const counter = { value: 0 };

      if (prefersReduced) {
        signal();
        if (signRef.current) signRef.current.style.opacity = "1";
        if (countRef.current) countRef.current.textContent = "100";
        if (barRef.current) barRef.current.style.transform = "scaleX(1)";
        gsap.to(root, {
          opacity: 0,
          duration: duration.fast,
          ease: ease.ui,
          onComplete: finish,
        });
        return;
      }

      if (statusRef.current) statusRef.current.textContent = STATUS[0];
      statusTimer = window.setInterval(setStatus, preloader.statusEveryMs);

      const timeline = gsap.timeline({
        defaults: { ease: ease.cine },
        onComplete: finish,
      });

      timeline.to(
        counter,
        {
          value: 100,
          duration: preloader.counterMs / 1000,
          ease: "none",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
            }
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${counter.value / 100})`;
            }
          },
        },
        0,
      );

      timeline.to(contentRef.current, { opacity: 0, duration: duration.ui }, preloader.counterMs / 1000);

      if (signRef.current) {
        timeline.fromTo(
          signRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: duration.reveal, ease: ease.expo },
          (preloader.counterMs - 500) / 1000,
        );
      }

      timeline.call(signal, [], (preloader.counterMs - duration.ui * 0.5) / 1000);

      timeline.fromTo(
        root,
        { clipPath: "inset(0% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: preloader.exitMs / 1000,
          ease: ease.expo,
        },
        preloader.counterMs / 1000 - duration.ui * 0.5,
      );
    }, root);

    return () => {
      window.clearInterval(statusTimer);
      context.revert();
      if (!finished) start();
    };
  }, [force, prefersReduced, start, stop]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="bg-bg text-fg fixed inset-0 z-preloader flex flex-col justify-between px-[var(--gutter)] py-[var(--gutter)]"
    >
      <div className="flex items-center justify-between font-mono text-meta uppercase tracking-[0.18em] text-muted">
        <span className="flex items-center gap-2">
          <span className="border-line-strong inline-flex h-6 w-6 items-center justify-center rounded-xs border text-[0.5625rem] tracking-[0.04em] text-fg">
            RA
          </span>
          <span>Raditya Ananda Satria</span>
        </span>
        <span className="text-subtle">Jakarta / GMT+7</span>
      </div>

      <div ref={contentRef} className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-6">
          <span className="flex flex-col gap-3">
            <span
              ref={statusRef}
              className="font-mono text-meta uppercase tracking-[0.14em] text-muted"
            >
              {STATUS[0]}
            </span>
            <span
              ref={signRef}
              className="font-display text-h3 tracking-[-0.01em] opacity-0"
            >
              Cut with care.
            </span>
          </span>
          <span className="flex items-start gap-1">
            <span
              ref={countRef}
              className="font-mono text-h1 leading-none tabular-nums tracking-[-0.04em]"
            >
              000
            </span>
            <span className="font-mono text-label leading-none text-subtle">%</span>
          </span>
        </div>
        <span className="bg-line relative block h-px w-full overflow-hidden">
          <span ref={barRef} className="bg-fg absolute inset-0 origin-left scale-x-0" />
        </span>
      </div>
    </div>
  );
}
