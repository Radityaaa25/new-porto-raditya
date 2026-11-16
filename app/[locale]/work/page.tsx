import type { Metadata } from "next";

import { SplitText } from "@/components/motion/SplitText";
import { WorkIndex } from "@/components/work/WorkIndex";
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

        <WorkIndex
          projects={projects.map((project, index) => ({
            slug: project.slug,
            title: project.title,
            summary: project.summary,
            role: project.role === "Personal" ? content.ui.personal : content.ui.team,
            stack: project.stack,
            index: String(index + 1).padStart(2, "0"),
          }))}
          hint={content.home.work.previewHint}
          stackLabel={content.ui.stack}
        />
      </div>
    </section>
  );
}
