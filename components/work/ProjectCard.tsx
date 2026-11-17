"use client";

import Image from "next/image";

import { ArrowUpRightIcon } from "@/components/icons";
import { StackIcons } from "@/components/work/StackIcons";
import { Link } from "@/i18n/navigation";

export type ProjectCardItem = {
  slug: string;
  title: string;
  category: string;
  role: string;
  stack: ReadonlyArray<string>;
  imageAlt: string;
  flagship?: boolean;
  flagshipLabel?: string;
};

export function ProjectCard({
  project,
  stackLabel,
  viewLabel,
}: {
  project: ProjectCardItem;
  stackLabel: string;
  viewLabel: string;
}) {
  return (
    <article className="group border-line bg-surface relative flex flex-col overflow-hidden rounded-sm border">
      <Link href={`/work/${project.slug}`} className="relative block" aria-label={project.title}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={`/media/projects/${project.slug}/cover-800.webp`}
            alt={project.imageAlt}
            width={800}
            height={500}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="duration-cinematic ease-expo h-full w-full object-cover transition-transform group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      </Link>
      <div className="pointer-events-none relative z-content flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-subtle flex flex-wrap items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]">
              {project.category}
              {project.flagship && project.flagshipLabel ? (
                <span className="text-accent border-accent/40 rounded-pill border px-1.5 py-0.5 tracking-[0.12em]">
                  {project.flagshipLabel}
                </span>
              ) : null}
            </span>
            <h3 className="font-display text-h3 tracking-[-0.02em]">{project.title}</h3>
          </div>
          <ArrowUpRightIcon
            size={18}
            className="duration-ui ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-muted transition-transform"
          />
        </div>
        <div className="mt-auto flex items-end justify-between gap-4">
          <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
            {project.role}
          </span>
          <StackIcons items={project.stack} label={stackLabel} className="pointer-events-auto" />
        </div>
        <span className="text-subtle sr-only">{viewLabel}</span>
      </div>
    </article>
  );
}
