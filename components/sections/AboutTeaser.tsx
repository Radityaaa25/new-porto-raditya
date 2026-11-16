"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { CountUp } from "@/components/motion/CountUp";
import { SplitText } from "@/components/motion/SplitText";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { Link } from "@/i18n/navigation";

export function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const content = useSiteContent();
  const teaser = content.home.aboutTeaser;
  const facts = content.home.about.facts;

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const image = section.querySelector<HTMLElement>("[data-portrait]");
      const inner = section.querySelector<HTMLElement>("[data-portrait-inner]");
      if (!image || !inner) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        image,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "cubic-bezier(0.66,0,0.01,1)",
          scrollTrigger: { trigger: image, start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        inner,
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref, revertOnUpdate: true },
  );

  return (
    <section ref={ref} className="gutter-x section-y" aria-label={teaser.label}>
      <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-10 md:grid-cols-12">
        <div data-portrait className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line md:col-span-5">
          <div data-portrait-inner className="absolute inset-[-8%]">
            <Image
              src="/media/portrait/portrait-1200.webp"
              alt={content.about.photoAlt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <span className="absolute bottom-4 left-4 z-content bg-bg/70 px-3 py-2 font-mono text-meta uppercase tracking-[0.14em] backdrop-blur-sm">
            {content.about.photoLabel}
          </span>
        </div>

        <div className="flex flex-col gap-6 md:col-span-7">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{teaser.label}</span>
          <SplitText as="h2" text={teaser.title} mode="lines" className="font-display text-h2 max-w-[16ch] tracking-[-0.03em]" />
          <p className="text-muted max-w-[var(--measure-wide)]">{teaser.body}</p>
          <div className="border-line grid grid-cols-2 gap-px border-y">
            {facts.slice(0, 2).map((fact, index) => (
              <div key={fact.label} className="flex flex-col gap-1 py-4">
                <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{fact.label}</span>
                <span className="text-body">{fact.value}</span>
                <span className="sr-only">{index}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{teaser.currentlyLabel}</span>
            <ul className="flex flex-col gap-2">
              {teaser.currently.map((item) => (
                <li key={item} className="text-muted flex items-baseline gap-3">
                  <span className="bg-accent inline-block size-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="group border-line hover:border-accent inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors">
              {teaser.cta}
              <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
              <CountUp value={facts.length} /> / facts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
