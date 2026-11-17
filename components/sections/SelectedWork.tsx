"use client";

import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ProjectCard } from "@/components/work/ProjectCard";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { getProjects } from "@/content/projects";
import { featuredSlugs } from "@/content/projects";
import { Link } from "@/i18n/navigation";

export function SelectedWork() {
  const content = useSiteContent();
  const locale = useActiveLocale();
  const projects = getProjects(locale).filter((project) =>
    (featuredSlugs as ReadonlyArray<string>).includes(project.slug),
  );
  const work = content.home.work;

  return (
    <section className="gutter-x section-y" aria-labelledby="selected-work-title">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
              {work.label}
            </span>
            <SplitText
              as="h2"
              text={work.title}
              mode="words"
              className="font-display text-h2 tracking-[-0.03em]"
            />
          </div>
          <Link
            href="/work"
            className="group border-line hover:border-accent duration-ui ease-expo inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors"
          >
            {work.viewAll}
            <ArrowRightIcon
              size={14}
              className="duration-ui ease-expo transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <p className="text-muted max-w-[var(--measure-wide)]">{work.intro}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard
                project={{
                  slug: project.slug,
                  title: project.title,
                  category: project.category,
                  role: project.role === "Personal" ? content.ui.personal : content.ui.team,
                  stack: project.stack,
                  imageAlt: project.imageAlt,
                  flagship: project.flagship,
                  flagshipLabel: content.ui.flagship,
                }}
                stackLabel={content.ui.stack}
                viewLabel={content.ui.view}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
