"use client";

import { ArrowUpRightIcon } from "@/components/icons";
import { Moni } from "@/components/mascot/Moni";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { SocialRows } from "@/components/socials/SocialLinks";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

export function HomeClosing() {
  const content = useSiteContent();
  const closing = content.home.closing;

  return (
    <section className="gutter-x section-y relative overflow-hidden" aria-label={closing.label}>
      <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-10 md:grid-cols-12">
        <div className="flex flex-col gap-8 md:col-span-8">
          <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{closing.label}</span>
          <SplitText as="h2" text={closing.title} mode="lines" className="font-display text-hero max-w-[18ch] tracking-[-0.04em]" />
          <Reveal className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="group border-line hover:border-accent inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors">
              {closing.cta}
              <ArrowUpRightIcon size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <span className="text-muted max-w-[var(--measure)]">{closing.body}</span>
            <a href={`mailto:${site.email}`} className="text-muted hover:text-fg font-mono text-meta uppercase tracking-[0.14em] transition-colors">
              {site.email}
            </a>
          </Reveal>
          <SocialRows ariaLabel={content.home.contact.socialsLabel} />
        </div>
        <div className="flex items-center justify-center md:col-span-4">
          <Moni pose="wave" className="w-full max-w-[280px]" />
        </div>
      </div>
    </section>
  );
}
