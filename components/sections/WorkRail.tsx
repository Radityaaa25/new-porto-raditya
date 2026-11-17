"use client";

import Image from "next/image";

import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { StackIcons } from "@/components/work/StackIcons";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { featuredSlugs, getProjects } from "@/content/projects";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";

export function WorkRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const content = useSiteContent();
  const locale = useActiveLocale();
  const projects = getProjects(locale).filter((project) =>
    (featuredSlugs as ReadonlyArray<string>).includes(project.slug),
  );
  const work = content.home.work;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = track.scrollWidth - window.innerWidth + 48;
        if (distance <= 0) return;
        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        const images = track.querySelectorAll<HTMLElement>("[data-rail-image]");
        gsap.fromTo(
          images,
          { clipPath: "inset(0% 0% 100% 0%)", scale: 1.1 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1.04,
            duration: 1,
            ease: "cubic-bezier(0.66,0,0.01,1)",
            stagger: 0.08,
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          },
        );
        images.forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -5 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        return () => tween.scrollTrigger?.kill();
      });
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-8 lg:h-[260vh] lg:py-0"
      aria-label={work.label}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-center">
      <div className="gutter-x mx-auto flex w-full max-w-[var(--container-max)] items-end justify-between gap-6 pb-8">
        <div className="flex flex-col gap-3">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
            {work.label}
          </span>
          <SplitText as="h2" text={work.title} mode="words" className="font-display text-h2 tracking-[-0.03em]" />
        </div>
        <Link
          href="/work"
          className="group border-line hover:border-accent inline-flex shrink-0 items-center gap-2 rounded-pill border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors"
        >
          {work.viewAll}
          <ArrowRightIcon size={14} className="duration-ui transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-5 px-[var(--gutter)] max-lg:w-full max-lg:flex-col max-lg:gap-6">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              data-rail-card
              className="group relative flex w-[68vw] max-w-[52rem] shrink-0 flex-col overflow-hidden rounded-sm border border-line bg-surface max-lg:w-full"
            >
              <Link href={`/work/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                <Image
                  data-rail-image
                  src={`/media/projects/${project.slug}/cover.webp`}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 68vw, 100vw"
                  className="object-cover transition-transform duration-cinematic ease-expo group-hover:scale-[1.04] motion-reduce:transition-none"
                />
              </Link>
              <div className="pointer-events-none relative z-content flex items-end justify-between gap-6 p-5">
                <div className="flex flex-col gap-1">
                  <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                    {String(index + 1).padStart(2, "0")} / {project.category}
                  </span>
                  <span className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-h2 tracking-[-0.02em]">{project.title}</h3>
                    {project.flagship ? (
                      <span className="text-accent border-accent/40 rounded-pill border px-2 py-0.5 font-mono text-meta uppercase tracking-[0.12em]">
                        {content.ui.flagship}
                      </span>
                    ) : null}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <StackIcons items={project.stack} label={content.ui.stack} className="pointer-events-auto" />
                  <ArrowUpRightIcon size={18} className="text-muted" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="gutter-x mx-auto mt-6 w-full max-w-[var(--container-max)] lg:hidden">
        <Reveal>
          <Link href="/work" className="text-muted font-mono text-meta uppercase tracking-[0.14em] underline">
            {work.index}
          </Link>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
