import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { education, experience, languages, skillGroups } from "@/content/experience";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, education, and experience of Raditya Ananda Satria.",
};

export default function AboutPage() {
  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-16">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">About</span>
          <SplitText
            as="h1"
            text="Designer by training. Developer by practice."
            mode="lines"
            trigger="mount"
            className="font-display text-h1 max-w-[18ch] tracking-[-0.03em]"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <h2 className="font-mono text-meta uppercase tracking-[0.18em] text-muted md:col-span-3">
            Profile
          </h2>
          <Reveal className="flex flex-col gap-5 md:col-span-7">
            <p className="text-body text-muted">
              I am {site.name}, based in {site.location}. I build web interfaces with Next.js and React,
              and I design them too. My path started in multimedia: graphic design, video editing, and
              content production, which still shapes how I approach layout, rhythm, and detail.
            </p>
            <p className="text-body text-muted">
              Today I study Sistem Informasi at Universitas Bina Sarana Informatika and keep shipping
              personal and team projects, from AI learning tools to event ticketing and business apps.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <h2 className="font-mono text-meta uppercase tracking-[0.18em] text-muted md:col-span-3">
            Experience
          </h2>
          <ul className="flex flex-col gap-8 md:col-span-7">
            {experience.map((item, index) => (
              <Reveal as="li" key={`${item.role}-${item.organization}`} delay={index * 0.04}>
                <div className="border-line flex flex-col gap-1 border-t pt-4">
                  <span className="font-mono text-meta uppercase tracking-[0.14em] text-subtle">
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
          <h2 className="font-mono text-meta uppercase tracking-[0.18em] text-muted md:col-span-3">
            Education
          </h2>
          <ul className="flex flex-col gap-8 md:col-span-7">
            {education.map((item) => (
              <Reveal as="li" key={`${item.role}-${item.organization}`}>
                <div className="border-line flex flex-col gap-1 border-t pt-4">
                  <span className="font-mono text-meta uppercase tracking-[0.14em] text-subtle">
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
          <h2 className="font-mono text-meta uppercase tracking-[0.18em] text-muted md:col-span-3">
            Skills
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            {skillGroups.map((group) => (
              <Reveal key={group.label} className="flex flex-col gap-3">
                <span className="font-mono text-meta uppercase tracking-[0.14em] text-subtle">
                  {group.label}
                </span>
                <ul className="flex flex-col gap-1">
                  {group.items.map((skill) => (
                    <li key={skill} className="text-body">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <h2 className="font-mono text-meta uppercase tracking-[0.18em] text-muted md:col-span-3">
            Languages
          </h2>
          <ul className="flex flex-col gap-2 md:col-span-7">
            {languages.map((language) => (
              <li
                key={language.label}
                className="border-line flex items-baseline justify-between border-t py-3"
              >
                <span className="text-body">{language.label}</span>
                <span className="font-mono text-meta uppercase tracking-[0.14em] text-subtle">
                  {language.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
