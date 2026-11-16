"use client";

import { ScrollScrubText } from "@/components/motion/ScrollScrubText";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function IntroStatement() {
  const statement = useSiteContent().home.statement;

  return (
    <section className="gutter-x section-y" aria-label={statement.label}>
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-8">
        <div className="border-line flex items-center justify-between border-t pt-4">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
            {statement.label}
          </span>
          <span className="text-subtle font-mono text-meta uppercase tracking-[0.18em]">
            {statement.title}
          </span>
        </div>
        <ScrollScrubText
          text={statement.body}
          className="font-display text-h1 max-w-[24ch] tracking-[-0.03em]"
        />
      </div>
    </section>
  );
}
