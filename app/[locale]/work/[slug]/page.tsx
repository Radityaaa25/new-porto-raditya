import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { StackIcons } from "@/components/work/StackIcons";
import { getDictionary, isLocale, type Locale } from "@/content";
import { getNextProject, getProject, getProjectSlugs } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";

async function readLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) throw new Error("Unsupported locale");
  return locale;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const project = getProject(rawLocale, slug);
  if (!project) return {};
  return pageMetadata(rawLocale, `/work/${slug}`, project.title, project.summary);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const project = getProject(locale, slug);
  if (!project) notFound();

  const content = getDictionary(locale);
  const next = getNextProject(locale, slug);
  const role = project.role === "Personal" ? content.ui.personal : content.ui.team;
  const base = `/media/projects/${project.slug}`;

  return (
    <article className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-16">
        <div className="flex flex-col gap-6">
          <Link
            href="/work"
            className="text-subtle hover:text-fg duration-ui ease-expo inline-flex w-fit items-center gap-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors"
          >
            {content.ui.backToWork}
          </Link>
          <SplitText
            as="h1"
            text={project.title}
            mode="lines"
            trigger="mount"
            className="font-display text-h1 tracking-[-0.03em]"
          />
          <p className="text-muted max-w-[var(--measure-wide)]">{project.summary}</p>
        </div>

        <Reveal className="group">
          <div className="border-line bg-surface relative aspect-[16/10] overflow-hidden rounded-sm border">
            <Image
              src={`${base}/cover.webp`}
              alt={project.imageAlt}
              fill
              priority
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
              {content.work.detail.brief}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {project.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-body text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <dl className="flex flex-col gap-4 md:col-span-5">
            <div className="border-line flex items-baseline justify-between gap-4 border-t pt-3">
              <dt className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                {content.work.detail.roleLabel}
              </dt>
              <dd className="text-body">{role}</dd>
            </div>
            <div className="border-line flex items-baseline justify-between gap-4 border-t pt-3">
              <dt className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                {content.work.detail.yearLabel}
              </dt>
              <dd className="text-body">{project.year}</dd>
            </div>
            <div className="border-line flex flex-col gap-2 border-t pt-3">
              <dt className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                {content.work.detail.stackLabel}
              </dt>
              <dd>
                <StackIcons items={project.stack} label={content.ui.stack} visible />
              </dd>
            </div>
            <div className="border-line border-t pt-3">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group text-body hover:text-accent duration-ui inline-flex items-center gap-2 transition-colors"
              >
                {content.work.detail.liveLabel}
                <ArrowUpRightIcon
                  size={14}
                  className="duration-ui ease-expo transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
            {content.work.detail.screensLabel}
          </h2>
          {project.details ? (
            <div className="grid gap-6 md:grid-cols-2">
              <Reveal className="md:col-span-2">
                <Image
                  src={`${base}/detail-01.webp`}
                  alt={`${project.imageAlt} - ${content.work.detail.overview}`}
                  width={1440}
                  height={900}
                  sizes="(min-width: 1200px) 1200px, 100vw"
                  className="border-line w-full rounded-sm border"
                />
              </Reveal>
              <Reveal>
                <Image
                  src={`${base}/detail-02.webp`}
                  alt={`${project.imageAlt} - ${content.work.detail.overview} 2`}
                  width={1440}
                  height={900}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="border-line w-full rounded-sm border"
                />
              </Reveal>
              <Reveal className="mx-auto w-full max-w-[320px]">
                <Image
                  src={`${base}/mobile.webp`}
                  alt={`${project.imageAlt} - mobile`}
                  width={390}
                  height={844}
                  sizes="320px"
                  className="border-line w-full rounded-sm border"
                />
              </Reveal>
            </div>
          ) : (
            <Reveal className="mx-auto w-full max-w-[360px]">
              <Image
                src={`${base}/mobile.webp`}
                alt={`${project.imageAlt} - mobile`}
                width={390}
                height={844}
                sizes="360px"
                className="border-line w-full rounded-sm border"
              />
            </Reveal>
          )}
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group border-line flex items-end justify-between gap-6 border-t pt-6"
        >
          <span className="flex flex-col gap-2">
            <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
              {content.work.detail.nextLabel}
            </span>
            <span className="font-display text-h2 tracking-[-0.02em]">{next.title}</span>
          </span>
          <ArrowUpRightIcon
            size={28}
            className="duration-ui ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 shrink-0 transition-transform"
          />
        </Link>
      </div>
    </article>
  );
}
