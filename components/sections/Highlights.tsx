"use client";

import { DotIcon } from "@/components/icons";
import { CountUp } from "@/components/motion/CountUp";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { getProjects } from "@/content/projects";

export function Highlights() {
  const content = useSiteContent();
  const locale = useActiveLocale();
  const projectCount = getProjects(locale).length;
  const highlights = {
    ...content.home.highlights,
    counters: content.home.highlights.counters.map((counter, index) =>
      index === 0 ? { ...counter, value: projectCount } : counter,
    ),
  };
  const rowA = content.home.marquee.slice(0, 3);
  const rowB = content.home.marquee.slice(3);

  return (
    <section className="section-y">
      <div className="gutter-x mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
            {highlights.label}
          </span>
          <SplitText
            as="h2"
            text={highlights.title}
            mode="words"
            className="font-display text-h2 max-w-[24ch] tracking-[-0.03em]"
          />
          <p className="text-muted max-w-[var(--measure-wide)]">{highlights.intro}</p>
        </div>

        <dl className="border-line grid grid-cols-2 gap-px border-y md:grid-cols-4">
          {highlights.counters.map((counter, index) => (
            <Reveal key={counter.label} delay={index * 0.05}>
              <div className="flex flex-col gap-2 py-8 pr-4">
                <dt className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
                  {counter.label}
                </dt>
                <dd className="font-display text-h1 tracking-[-0.03em]">
                  <CountUp value={counter.value} />
                  {counter.suffix ?? ""}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mt-14 flex flex-col gap-2 border-y border-line py-6">
        <Marquee>
          <span className="flex items-center gap-8 whitespace-nowrap pr-8">
            {rowA.map((item) => (
              <span key={item} className="flex items-center gap-8">
                <span className="font-display text-display uppercase tracking-[-0.03em]">{item}</span>
                <DotIcon size={14} className="text-accent" />
              </span>
            ))}
          </span>
        </Marquee>
        <Marquee reverse>
          <span className="flex items-center gap-8 whitespace-nowrap pr-8">
            {rowB.map((item) => (
              <span key={item} className="flex items-center gap-8">
                <span className="font-display text-display uppercase tracking-[-0.03em]">{item}</span>
                <DotIcon size={14} className="text-accent" />
              </span>
            ))}
          </span>
        </Marquee>
      </div>
    </section>
  );
}
