"use client";

import { ArrowUpRightIcon } from "@/components/icons";
import { LiveClock } from "@/components/hud/LiveClock";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { site } from "@/content/site";
import { SocialIcons } from "@/components/socials/SocialLinks";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const year = new Date().getFullYear();
  const content = useSiteContent();

  return (
    <footer className="border-line border-t px-[var(--gutter)] py-12">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col gap-2">
            <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">
              {site.name}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="text-body hover:text-accent group inline-flex w-fit items-center gap-2 transition-colors"
            >
              {site.email}
              <ArrowUpRightIcon
                size={16}
                className="duration-ui group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
            <SocialIcons ariaLabel={content.footer.socials} className="mt-3" />
          </div>

          <nav aria-label={content.ui.footerNav} className="flex flex-wrap gap-x-8 gap-y-2">
            {content.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted hover:text-fg font-mono text-meta uppercase tracking-[0.14em] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1">
            <LiveClock className="text-fg" />
            <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">
              {site.location} / {site.timeZoneLabel}
            </span>
          </div>
        </div>

        <div className="border-line text-subtle flex flex-col gap-2 border-t pt-6 font-mono text-meta uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between">
          <span>
            {year} {site.name}
          </span>
          <span>{content.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
