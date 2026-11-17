import type { Metadata } from "next";
import Image from "next/image";

import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { HomeClosing } from "@/components/sections/HomeClosing";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollScrubText } from "@/components/motion/ScrollScrubText";
import { SceneBreak } from "@/components/graphics/SceneBreak";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Toolbox } from "@/components/work/Toolbox";
import { getDictionary, isLocale, type Locale } from "@/content";
import { getEducation, getExperience, getLanguages, getSkillGroups } from "@/content/experience";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
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
  return pageMetadata(locale, "/about", content.about.meta.title, content.about.meta.description);
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const content = getDictionary(locale);
  const experience = getExperience(locale);
  const education = getEducation(locale);
  const skillGroups = getSkillGroups(locale);
  const languages = getLanguages(locale);

  return (
    <article>
      <section className="gutter-x section-y" aria-label={content.about.label}>
        <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-8 md:grid-cols-12 md:items-center md:gap-10">
          <div className="order-2 flex flex-col gap-6 md:order-1 md:col-span-7">
            <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
              {content.about.label}
            </span>
            <SplitText
              as="h1"
              text={content.about.title}
              mode="lines"
              trigger="mount"
              className="font-display text-h1 max-w-[18ch] tracking-[-0.03em]"
            />
            <ScrollScrubText text={content.about.intro} className="text-muted max-w-[var(--measure-wide)]" />
            <dl className="border-line grid grid-cols-1 gap-x-6 gap-y-5 border-t pt-6 sm:grid-cols-2">
              {content.about.facts.map((fact, index) => (
                <Reveal key={fact.label} delay={index * 0.05}>
                  <div className="flex flex-col gap-1">
                    <dt className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                      {fact.label}
                    </dt>
                    <dd className="text-body-sm text-muted">{fact.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="bg-accent text-accent-ink group inline-flex items-center gap-2 rounded-pill px-5 py-3 font-mono text-meta uppercase tracking-[0.14em] transition-opacity hover:opacity-90"
              >
                {content.about.ctaContact}
                <ArrowUpRightIcon size={14} />
              </Link>
              <Link
                href="/work"
                className="border-line hover:border-accent group inline-flex items-center gap-2 rounded-pill border px-5 py-3 font-mono text-meta uppercase tracking-[0.14em] transition-colors"
              >
                {content.about.ctaWork}
                <ArrowRightIcon size={14} className="duration-ui ease-expo transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <Parallax className="relative order-1 aspect-[4/5] overflow-hidden rounded-sm border border-line md:order-2 md:col-span-5" amount={5} reveal>
            <Image
              src="/media/portrait/portrait-1200.webp"
              alt={content.about.photoAlt}
              fill
              priority
              sizes="(min-width: 768px) 38vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 z-content bg-bg/70 px-3 py-2 font-mono text-meta uppercase tracking-[0.14em] backdrop-blur-sm">
              {content.about.photoLabel} / {content.about.photoCaption}
            </span>
          </Parallax>
        </div>
      </section>

      <section className="gutter-x section-y" aria-label={content.about.profileLabel}>
        <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.about.profileLabel}
          </h2>
          <Reveal className="flex flex-col gap-5 md:col-span-7">
            {content.about.profile.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-body text-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <ExperienceTimeline />

      <section className="gutter-x section-y" aria-label={content.about.educationLabel}>
        <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.about.educationLabel}
          </h2>
          <ul className="flex flex-col gap-8 md:col-span-7">
            {education.map((item) => (
              <Reveal as="li" key={`${item.role}-${item.organization}`}>
                <div className="border-line flex flex-col gap-1 border-t pt-4">
                  <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{item.period}</span>
                  <span className="text-h3 tracking-[-0.02em]">{item.role}</span>
                  <span className="text-muted">{item.organization}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="gutter-x section-y" aria-label={content.about.skillsLabel}>
        <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.about.skillsLabel}
          </h2>
          <div className="md:col-span-7">
            <Toolbox groups={skillGroups} />
          </div>
        </div>
      </section>

      <section className="gutter-x section-y" aria-label={content.about.languagesLabel}>
        <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.about.languagesLabel}
          </h2>
          <ul className="flex flex-col gap-2 md:col-span-7">
            {languages.map((language) => (
              <li key={language.label} className="border-line flex items-baseline justify-between border-t py-3">
                <span className="text-body">{language.label}</span>
                <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{language.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gutter-x section-y" aria-label={content.home.aboutTeaser.currentlyLabel}>
        <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.home.aboutTeaser.currentlyLabel}
          </h2>
          <ul className="flex flex-col gap-3 md:col-span-7">
            {content.home.aboutTeaser.currently.map((item, index) => (
              <Reveal as="li" key={item} delay={index * 0.05}>
                <div className="border-line flex items-baseline gap-4 border-t py-3">
                  <span className="text-accent font-mono text-meta">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-body text-muted">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <p className="text-subtle mt-10 font-mono text-meta uppercase tracking-[0.14em]">
          {content.about.cvNote} {site.email}
        </p>
      </section>

      <SceneBreak />
      <HomeClosing />
    </article>
  );
}
