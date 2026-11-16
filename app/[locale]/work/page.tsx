import type { Metadata } from "next";

import { SceneBreak } from "@/components/graphics/SceneBreak";
import { OrbitMark } from "@/components/graphics/OrbitMark";
import { FeaturedShowcase } from "@/components/sections/FeaturedShowcase";
import { HomeClosing } from "@/components/sections/HomeClosing";
import { ScrollScrubText } from "@/components/motion/ScrollScrubText";
import { SplitText } from "@/components/motion/SplitText";
import { WorkBrowser } from "@/components/work/WorkBrowser";
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
    <article>
      <section className="gutter-x section-y relative isolate overflow-hidden" aria-label={content.work.label}>
        <OrbitMark className="absolute -right-24 top-0 z-below hidden h-[28rem] w-[28rem] opacity-20 lg:block" />
        <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-8 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-8">
            <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{content.work.label}</span>
            <SplitText as="h1" text={content.work.title} mode="lines" trigger="mount" className="font-display text-h1 tracking-[-0.03em]" />
            <ScrollScrubText text={content.work.intro} className="text-muted max-w-[var(--measure-wide)]" />
          </div>
          <div className="flex flex-col justify-end gap-1 md:col-span-4 md:items-end">
            <span className="font-display text-display leading-none tracking-[-0.04em]">{String(projects.length).padStart(2, "0")}</span>
            <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">live sites / 2023 - 2026</span>
          </div>
        </div>
      </section>

      <section className="gutter-x section-y" aria-label={content.work.filterLabel}>
        <div className="mx-auto w-full max-w-[var(--container-max)]">
          <WorkBrowser
            projects={projects.map((project, index) => ({
              slug: project.slug,
              title: project.title,
              summary: project.summary,
              role: project.role === "Personal" ? content.ui.personal : content.ui.team,
              roleKey: project.role,
              stack: project.stack,
              index: String(index + 1).padStart(2, "0"),
            }))}
            filters={{
              label: content.work.filterLabel,
              all: content.ui.all,
              personal: content.ui.personal,
              team: content.ui.team,
            }}
            hint={content.home.work.previewHint}
            stackLabel={content.ui.stack}
          />
        </div>
      </section>

      <FeaturedShowcase />
      <HomeClosing />
      <SceneBreak />
    </article>
  );
}
