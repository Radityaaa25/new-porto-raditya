"use client";

import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

export function HomeClosing() {
  const closing = useSiteContent().home.closing;

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-8">
        <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
          {closing.label}
        </span>
        <SplitText
          as="h2"
          text={closing.title}
          mode="lines"
          className="font-display text-h1 max-w-[20ch] tracking-[-0.035em]"
        />
        <Reveal className="flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="group border-line hover:border-accent duration-ui ease-expo inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors"
          >
            {closing.cta}
            <ArrowUpRightIcon
              size={14}
              className="duration-ui ease-expo transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <span className="text-muted max-w-[var(--measure)]">{closing.body}</span>
          <a href={`mailto:${site.email}`} className="text-muted hover:text-fg font-mono text-meta uppercase tracking-[0.14em] transition-colors">
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
