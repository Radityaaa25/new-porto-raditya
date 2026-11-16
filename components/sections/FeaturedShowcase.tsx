"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowUpRightIcon } from "@/components/icons";
import { StackIcons } from "@/components/work/StackIcons";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { featuredSlugs, getProjects } from "@/content/projects";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { Link } from "@/i18n/navigation";

export function FeaturedShowcase() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const content = useSiteContent();
  const locale = useActiveLocale();
  const projects = getProjects(locale).filter((project) =>
    (featuredSlugs as ReadonlyArray<string>).includes(project.slug),
  ).slice(0, 3);

  useGSAP(
    () => {
      const section = ref.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = track.scrollWidth - window.innerWidth + 64;
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
        return () => tween.scrollTrigger?.kill();
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={ref} className="relative border-line border-t py-14 lg:h-[240vh] lg:py-0" aria-label={content.work.featuredLabel}>
      <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-center">
      <div className="gutter-x mx-auto flex w-full max-w-[var(--container-max)] items-end justify-between gap-6 pb-8">
        <div className="flex flex-col gap-3">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{content.work.featuredLabel}</span>
          <h2 className="font-display text-h2 tracking-[-0.03em]">{content.home.work.title}</h2>
        </div>
        <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">01 - 03</span>
      </div>
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-5 px-[var(--gutter)] max-lg:w-full max-lg:flex-col">
          {projects.map((project, index) => (
            <article key={project.slug} className="group w-[62vw] max-w-[48rem] shrink-0 overflow-hidden rounded-sm border border-line bg-surface max-lg:w-full">
              <Link href={`/work/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                <Image src={`/media/projects/${project.slug}/cover.webp`} alt={project.imageAlt} fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover transition-transform duration-cinematic ease-expo group-hover:scale-[1.04]" />
              </Link>
              <div className="pointer-events-none relative z-content flex items-end justify-between gap-4 p-5">
                <span className="flex flex-col gap-1">
                  <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{String(index + 1).padStart(2, "0")} / {project.category}</span>
                  <span className="font-display text-h2 tracking-[-0.02em]">{project.title}</span>
                </span>
                <span className="flex items-center gap-4">
                  <StackIcons items={project.stack} label={content.ui.stack} className="pointer-events-auto" />
                  <ArrowUpRightIcon size={18} className="text-muted" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
