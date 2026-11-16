"use client";

import { useRef } from "react";

import { SplitText } from "@/components/motion/SplitText";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const content = useSiteContent().home.process;

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const steps = wrapper.querySelectorAll<HTMLElement>("[data-step]");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
        steps.forEach((step, index) => {
          if (index === 0) return;
          timeline.fromTo(
            step,
            { opacity: 0.18, y: 24 },
            { opacity: 1, y: 0, duration: 1 },
            index,
          );
        });
        return () => timeline.scrollTrigger?.kill();
      });
      return () => mm.revert();
    },
    { scope: wrapperRef, dependencies: [content.steps.length], revertOnUpdate: true },
  );

  return (
    <div ref={wrapperRef} className="relative lg:h-[300vh]">
      <section className="gutter-x flex h-full w-full flex-col justify-center py-20 lg:sticky lg:top-0 lg:h-dvh" aria-label={content.label}>
        <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-5 md:col-span-4">
            <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{content.label}</span>
            <SplitText as="h2" text={content.title} mode="words" className="font-display text-h2 tracking-[-0.03em]" />
            <p className="text-muted max-w-[var(--measure)]">{content.intro}</p>
            <svg viewBox="0 0 220 120" className="mt-4 hidden w-full max-w-[220px] text-accent md:block" fill="none" aria-hidden="true">
              <path className="process-line" d="M4 92C48 92 44 28 88 28s44 64 88 64h40" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="4 8" />
              <circle cx="4" cy="92" r="3" fill="currentColor" />
              <circle cx="216" cy="92" r="3" fill="currentColor" />
            </svg>
          </div>
          <ol className="flex flex-col gap-5 md:col-span-8">
            {content.steps.map((step, index) => (
              <li
                key={step.title}
                data-step
                className="border-line grid gap-3 border-t pt-5 sm:grid-cols-[4rem_1fr]"
              >
                <span className="text-accent font-mono text-meta uppercase tracking-[0.14em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-h3 tracking-[-0.02em]">{step.title}</h3>
                  <p className="text-muted max-w-[var(--measure-wide)]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
