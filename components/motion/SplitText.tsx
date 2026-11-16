"use client";

import { useEffect, useRef, type ElementType } from "react";

import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { lineReveal, resolveMotion, scrollDefaults, fadeUpSm } from "@/lib/motion/presets";
import { duration, ease, stagger } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

type SplitMode = "lines" | "words" | "chars";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  mode?: SplitMode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: "scroll" | "mount";
  accent?: string;
  waitForReady?: boolean;
};

const READY_EVENT = "portfolio:ready";

function stripWord(word: string): string {
  return word.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

const LINE_TOLERANCE = 2;

function makeWord(text: string): HTMLSpanElement {
  const wrapper = document.createElement("span");
  wrapper.className = "split-mask inline-block align-bottom";
  const inner = document.createElement("span");
  inner.className = "inline-block";
  inner.textContent = text;
  wrapper.append(inner);
  return wrapper;
}

function makeChar(text: string): HTMLSpanElement {
  const wrapper = document.createElement("span");
  wrapper.className = "split-mask inline-block align-bottom";
  const inner = document.createElement("span");
  inner.className = "inline-block";
  inner.textContent = text;
  wrapper.append(inner);
  return wrapper;
}

export function SplitText({
  text,
  as: Tag = "span",
  mode = "lines",
  className,
  delay = 0,
  duration: durationOverride,
  stagger: staggerOverride,
  trigger = "scroll",
  accent,
  waitForReady = false,
}: SplitTextProps) {
  const outerRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let cancelled = false;
    let animated = false;
    let context: gsap.Context | null = null;
    let lastWidth = 0;
    let detachReady: (() => void) | null = null;

    const accentClass = (word: string) =>
      accent && stripWord(word) === stripWord(accent) ? "text-accent" : "";

    const cleanupUnits = () => {
      context?.revert();
      context = null;
    };

    const splitIntoUnits = (): HTMLElement[] => {
      inner.textContent = "";
      const units: HTMLElement[] = [];
      const tokens = text.trim().split(/\s+/).filter(Boolean);
      const chars = Array.from(text.trim());
      const effectiveMode: SplitMode = prefersReduced ? "words" : mode;

      if (effectiveMode === "chars") {
        for (const char of chars) {
          if (char === " ") {
            inner.append(document.createTextNode(" "));
            continue;
          }
          const wrapper = makeChar(char);
          inner.append(wrapper);
          units.push(wrapper.firstElementChild as HTMLElement);
        }
        return units;
      }

      if (effectiveMode === "words") {
        tokens.forEach((word, index) => {
          const wrapper = makeWord(word);
          const wordInner = wrapper.firstElementChild as HTMLElement;
          wordInner.className = cn("inline-block", accentClass(word));
          inner.append(wrapper);
          if (index < tokens.length - 1) inner.append(document.createTextNode(" "));
          units.push(wrapper.firstElementChild as HTMLElement);
        });
        return units;
      }

      const probes = tokens.map((word) => {
        const probe = document.createElement("span");
        probe.className = cn("inline-block whitespace-pre align-bottom", accentClass(word));
        probe.textContent = word;
        inner.append(probe);
        inner.append(document.createTextNode(" "));
        return probe;
      });

      const groups: HTMLSpanElement[][] = [];
      let currentTop = Number.NaN;
      for (const probe of probes) {
        const top = Math.round(probe.offsetTop);
        if (Number.isNaN(currentTop) || Math.abs(top - currentTop) > LINE_TOLERANCE) {
          groups.push([]);
          currentTop = top;
        }
        groups[groups.length - 1].push(probe);
      }

      probes.forEach((probe) => probe.remove());
      while (inner.lastChild && inner.lastChild.nodeType === Node.TEXT_NODE) {
        inner.lastChild.remove();
      }

      for (const group of groups) {
        const line = document.createElement("span");
        line.className = "split-mask block";
        const lineInner = document.createElement("span");
        lineInner.className = "block";
        group.forEach((probe) => {
          lineInner.append(probe);
          lineInner.append(document.createTextNode(" "));
        });
        line.append(lineInner);
        inner.append(line);
        units.push(lineInner);
      }

      return units;
    };

    const animate = (units: HTMLElement[]) => {
      if (animated || units.length === 0) return;
      animated = true;

      const basePreset =
        mode === "lines" ? lineReveal({ delay, duration: durationOverride }) : fadeUpSm({ delay, duration: durationOverride });
      const preset = resolveMotion(basePreset, prefersReduced);
      const unitStagger =
        staggerOverride ?? (mode === "chars" ? stagger.tight : mode === "lines" ? stagger.loose : stagger.base);

      context = gsap.context(() => {
        const play = () => {
          gsap.fromTo(units, preset.from, {
            ...preset.to,
            duration: preset.duration ?? duration.reveal,
            ease: preset.ease ?? ease.cine,
            delay: preset.delay,
            stagger: prefersReduced ? 0 : unitStagger,
            scrollTrigger:
              trigger === "scroll"
                ? {
                    trigger: outer,
                    start: scrollDefaults.start,
                    once: true,
                  }
                : undefined,
          });
        };

        if (waitForReady && document.documentElement.dataset.ready !== "true") {
          gsap.set(units, preset.from);
          const onReady = () => {
            detachReady?.();
            play();
          };
          window.addEventListener(READY_EVENT, onReady, { once: true });
          detachReady = () => window.removeEventListener(READY_EVENT, onReady);
          return;
        }

        play();
      }, outer);

      ScrollTrigger.refresh();
    };

    const build = (allowAnimation: boolean) => {
      cleanupUnits();
      const units = splitIntoUnits();
      if (allowAnimation) animate(units);
    };

    const start = () => {
      if (cancelled) return;
      build(true);
      lastWidth = outer.getBoundingClientRect().width;
    };

    const observer = new ResizeObserver(() => {
      const width = outer.getBoundingClientRect().width;
      if (Math.abs(width - lastWidth) < 1) return;
      lastWidth = width;
      build(false);
    });
    observer.observe(outer);

    if (document.fonts?.ready) {
      document.fonts.ready.then(start).catch(start);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      detachReady?.();
      cleanupUnits();
    };
  }, [text, mode, delay, durationOverride, staggerOverride, trigger, prefersReduced, accent, waitForReady]);

  return (
    <Tag ref={outerRef} className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span ref={innerRef} aria-hidden="true" className="block">
        {text}
      </span>
    </Tag>
  );
}
