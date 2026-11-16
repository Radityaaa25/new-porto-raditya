import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Toolbox } from "@/components/work/Toolbox";
import { SceneBreak } from "@/components/graphics/SceneBreak";
import { getDictionary, isLocale, type Locale } from "@/content";
import { getEducation, getExperience, getLanguages, getSkillGroups } from "@/content/experience";
import { site } from "@/content/site";
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
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-16">
        <div className="flex flex-col gap-6">
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
          <p className="text-muted max-w-[var(--measure-wide)]">{content.about.intro}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
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

        <div className="grid gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.about.experienceLabel}
          </h2>
          <ul className="flex flex-col gap-8 md:col-span-7">
            {experience.map((item, index) => (
              <Reveal as="li" key={`${item.role}-${item.organization}`} delay={index * 0.04}>
                <div className="border-line flex flex-col gap-1 border-t pt-4">
                  <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                    {item.period}
                  </span>
                  <span className="text-h3 tracking-[-0.02em]">{item.role}</span>
                  <span className="text-muted">{item.organization}</span>
                  <span className="text-subtle">{item.summary}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.about.educationLabel}
          </h2>
          <ul className="flex flex-col gap-8 md:col-span-7">
            {education.map((item) => (
              <Reveal as="li" key={`${item.role}-${item.organization}`}>
                <div className="border-line flex flex-col gap-1 border-t pt-4">
                  <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                    {item.period}
                  </span>
                  <span className="text-h3 tracking-[-0.02em]">{item.role}</span>
                  <span className="text-muted">{item.organization}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.about.skillsLabel}
          </h2>
          <div className="md:col-span-7">
            <Toolbox groups={skillGroups} />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <h2 className="text-muted font-mono text-meta uppercase tracking-[0.18em] md:col-span-3">
            {content.about.languagesLabel}
          </h2>
          <ul className="flex flex-col gap-2 md:col-span-7">
            {languages.map((language) => (
              <li
                key={language.label}
                className="border-line flex items-baseline justify-between border-t py-3"
              >
                <span className="text-body">{language.label}</span>
                <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                  {language.level}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <SceneBreak />
        <p className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
          {content.about.cvNote} {site.email}
        </p>
      </div>
    </section>
  );
}
