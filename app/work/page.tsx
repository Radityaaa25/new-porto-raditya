import type { Metadata } from "next";

import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by Raditya Ananda Satria.",
};

export default function WorkPage() {
  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-12">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">Index / Work</span>
          <SplitText
            as="h1"
            text="Selected projects"
            mode="lines"
            trigger="mount"
            className="font-display text-h1 tracking-[-0.03em]"
          />
          <p className="max-w-[var(--measure-wide)] text-muted">
            Personal and team projects shipped on the web. Every entry links to the live site.
          </p>
        </div>

        <ul className="border-line border-t">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={index * 0.04} className="border-line border-b">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group grid gap-4 py-8 md:grid-cols-12 md:items-baseline"
              >
                <span className="font-mono text-meta text-subtle md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-h3 tracking-[-0.02em] transition-colors group-hover:text-accent md:col-span-4">
                  {project.title}
                </span>
                <span className="text-muted md:col-span-5">{project.summary}</span>
                <span className="flex items-center justify-between gap-4 font-mono text-meta uppercase tracking-[0.14em] text-subtle md:col-span-2 md:justify-end">
                  <span className="flex flex-col items-start gap-1 md:items-end">
                    <span>{project.role}</span>
                    {project.stack ? <span className="text-subtle">{project.stack.join(" / ")}</span> : null}
                  </span>
                  <ArrowUpRightIcon
                    size={16}
                    className="shrink-0 transition-transform duration-ui ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
