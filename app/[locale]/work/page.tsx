import type { Metadata } from "next";

import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { getDictionary, getProjects, isLocale, type Locale } from "@/content";
import { pageMetadata } from "@/lib/seo";

async function readLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) throw new Error("Unsupported locale");
  return locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await readLocale(params);
  const content = getDictionary(locale);
  return pageMetadata(locale, "/work", content.work.meta.title, content.work.meta.description);
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const content = getDictionary(locale);
  const projects = getProjects(locale);

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-12">
        <div className="flex flex-col gap-6">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
            {content.work.label}
          </span>
          <SplitText
            as="h1"
            text={content.work.title}
            mode="lines"
            trigger="mount"
            className="font-display text-h1 tracking-[-0.03em]"
          />
          <p className="text-muted max-w-[var(--measure-wide)]">{content.work.intro}</p>
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
                <span className="text-subtle font-mono text-meta md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-h3 group-hover:text-accent tracking-[-0.02em] transition-colors md:col-span-4">
                  {project.title}
                </span>
                <span className="text-muted md:col-span-5">{project.summary}</span>
                <span className="text-subtle flex items-center justify-between gap-4 font-mono text-meta uppercase tracking-[0.14em] md:col-span-2 md:justify-end">
                  <span className="flex flex-col items-start gap-1 md:items-end">
                    <span>{project.role === "Personal" ? content.ui.personal : content.ui.team}</span>
                    <span className="text-subtle">{project.stack.join(" / ")}</span>
                  </span>
                  <ArrowUpRightIcon
                    size={16}
                    className="duration-ui ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 transition-transform"
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
