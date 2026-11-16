"use client";

import { useRef } from "react";

import { DotIcon } from "@/components/icons";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { getSkillGroups } from "@/content/experience";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function MarqueeBand() {
  const ref = useRef<HTMLDivElement>(null);
  const content = useSiteContent();
  const locale = useActiveLocale();
  const words = content.home.marquee;
  const skills = getSkillGroups(locale).flatMap((group) => group.items.map((item) => item.name));

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const skew = gsap.quickTo(element, "skewY", { duration: 0.4, ease: "power3.out" });
      let last = window.scrollY;
      const onScroll = () => {
        const current = window.scrollY;
        const velocity = gsap.utils.clamp(-7, 7, (current - last) * 0.04);
        skew(velocity);
        last = current;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="border-line relative overflow-hidden border-y py-10" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8">
            {words.map((word) => (
              <span key={`${copy}-${word}`} className="flex items-center gap-8">
                <span className="font-display text-display uppercase tracking-[-0.03em]">{word}</span>
                <DotIcon size={14} className="text-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex w-max animate-marquee-reverse gap-6 whitespace-nowrap opacity-50">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-6">
            {skills.map((skill) => (
              <span key={`${copy}-${skill}`} className="font-mono text-meta uppercase tracking-[0.18em]">
                {skill} /
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
