"use client";

import { LiveClock } from "@/components/hud/LiveClock";
import { ArrowDownIcon, ArrowUpRightIcon, DotIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { DotGrid } from "@/components/textures";
import { SocialIcons } from "@/components/socials/SocialLinks";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const content = useSiteContent();
  const hero = content.hero;
  const [lineOne, lineTwo] = hero.lines;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <DotGrid className="mask-fade-b opacity-60" />

      <div className="gutter-x z-content relative mx-auto flex min-h-[calc(100dvh-var(--space-16))] w-full max-w-[var(--container-max)] flex-col justify-between gap-16 pb-10 pt-10 md:pb-14 md:pt-14">
        <Reveal
          waitForReady
          trigger="mount"
          className="border-line flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b pb-4"
        >
          <span className="text-muted flex items-center gap-2 font-mono text-meta uppercase tracking-[0.18em]">
            <span className="bg-accent inline-block h-1.5 w-1.5 rounded-full" />
            {hero.kicker}
          </span>
          <span className="text-subtle flex items-center gap-4 font-mono text-meta uppercase tracking-[0.14em]">
            <span>{site.location}</span>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <LiveClock className="text-muted" showLabel={false} />
          </span>
        </Reveal>

        <div className="flex flex-col gap-6">
          <h1
            id="hero-heading"
            className="font-display text-hero flex max-w-[22ch] flex-col gap-2 md:gap-4"
          >
            <SplitText
              as="span"
              text={lineOne}
              mode="lines"
              trigger="mount"
              waitForReady
              className="text-balance"
            />
            <SplitText
              as="span"
              text={lineTwo}
              mode="lines"
              trigger="mount"
              waitForReady
              accent={hero.accent}
              delay={0.12}
              className="text-balance"
            />
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal waitForReady trigger="mount" delay={0.2} className="md:col-span-6">
            <p className="max-w-[var(--measure-wide)] text-body text-muted">{hero.intro}</p>
            <SocialIcons labelled ariaLabel={hero.socials} className="mt-5" />
          </Reveal>

          <Reveal
            waitForReady
            trigger="mount"
            delay={0.3}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:justify-end"
          >
            <Link
              href="/work"
              className="group border-line hover:border-accent duration-ui ease-expo inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors"
            >
              {hero.selectedWork}
              <ArrowUpRightIcon
                size={14}
                className="duration-ui ease-expo transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="group text-muted hover:text-fg duration-ui inline-flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors"
            >
              {site.email}
            </a>
          </Reveal>

          <Reveal
            waitForReady
            trigger="mount"
            delay={0.4}
            className="border-line flex items-center justify-between gap-4 border-t pt-4 md:col-span-12"
          >
            <span className="text-subtle flex items-center gap-3 font-mono text-meta uppercase tracking-[0.14em]">
              <DotIcon size={8} className="text-accent" />
              {hero.shipped}
            </span>
            <span className="text-subtle flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em]">
              {hero.scroll}
              <ArrowDownIcon size={14} />
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}