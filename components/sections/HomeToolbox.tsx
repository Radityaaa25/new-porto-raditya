"use client";

import { SplitText } from "@/components/motion/SplitText";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { Toolbox } from "@/components/work/Toolbox";
import { getSkillGroups } from "@/content/experience";

export function HomeToolbox() {
  const content = useSiteContent();
  const locale = useActiveLocale();
  const groups = getSkillGroups(locale);

  return (
    <section className="gutter-x section-y" aria-label={content.home.toolbox.label}>
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-8">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="flex flex-col gap-3 md:col-span-7">
            <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{content.home.toolbox.label}</span>
            <SplitText as="h2" text={content.home.toolbox.title} mode="words" className="font-display text-h2 tracking-[-0.03em]" />
          </div>
          <p className="text-muted md:col-span-5">{content.home.toolbox.intro}</p>
        </div>
        <Toolbox groups={groups} />
      </div>
    </section>
  );
}
