"use client";

import { useRef } from "react";

import { SplitText } from "@/components/motion/SplitText";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { getExperience } from "@/content/experience";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function ExperienceTimeline() {
  const ref = useRef<HTMLElement>(null);
  const content = useSiteContent();
  const locale = useActiveLocale();
  const experience = getExperience(locale);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const line = section.querySelector<SVGPathElement>("[data-timeline-line]");
      const items = section.querySelectorAll<HTMLElement>("[data-entry]");
      if (line) {
        const length = line.getTotalLength();
        gsap.fromTo(
          line,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
          },
        );
      }
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.25, x: 18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "cubic-bezier(0.16,1,0.3,1)",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: ref, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={ref} className="gutter-x section-y" aria-label={content.home.experience.label}>
      <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-10 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-4">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{content.home.experience.label}</span>
          <SplitText as="h2" text={content.home.experience.title} mode="words" className="font-display text-h2 tracking-[-0.03em]" />
          <p className="text-muted max-w-[var(--measure)]">{content.home.experience.intro}</p>
          <svg viewBox="0 0 120 360" className="mt-4 hidden h-[360px] w-[120px] text-accent md:block" fill="none" aria-hidden="true">
            <path data-timeline-line d="M60 2V358" stroke="currentColor" strokeOpacity="0.4" />
            <circle cx="60" cy="32" r="5" fill="currentColor" />
            <circle cx="60" cy="180" r="5" fill="currentColor" fillOpacity="0.65" />
            <circle cx="60" cy="328" r="5" fill="currentColor" fillOpacity="0.4" />
          </svg>
        </div>
        <ol className="flex flex-col gap-10 md:col-span-8">
          {experience.map((item, index) => (
            <li key={`${item.role}-${item.organization}`} data-entry className="border-line grid gap-3 border-t pt-5 sm:grid-cols-[1fr_auto]">
              <div className="flex flex-col gap-1">
                <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{item.period}</span>
                <span className="font-display text-h3 tracking-[-0.02em]">{item.role}</span>
                <span className="text-muted">{item.organization}</span>
                <span className="text-subtle">{item.summary}</span>
              </div>
              <span className="text-accent font-mono text-meta uppercase tracking-[0.14em]">{String(index + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
