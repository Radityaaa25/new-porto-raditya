"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { LiveClock } from "@/components/hud/LiveClock";
import { LanguageSwitcher } from "@/components/hud/LanguageSwitcher";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { site } from "@/content/site";
import { SocialIcons } from "@/components/socials/SocialLinks";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const year = new Date().getFullYear();
  const content = useSiteContent();
  const { scrollToTop } = useSmoothScroll();

  return (
    <footer className="site-footer border-line relative overflow-hidden border-t pt-10">
      <div className="gutter-x mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-10 pb-8">
        <a
          href="#main"
          onClick={(event) => {
            event.preventDefault();
            scrollToTop();
          }}
          className="group border-line hover:border-accent flex items-center justify-between gap-4 rounded-sm border px-5 py-4 transition-colors"
        >
          <span className="font-display text-h3 tracking-[-0.02em]">{content.footer.backToTop}</span>
          <ArrowRightIcon size={20} className="-rotate-90 transition-transform group-hover:-translate-y-1" />
        </a>
        <div className="grid gap-8 md:grid-cols-12">
          <div className="flex flex-col gap-2 md:col-span-5">
            <span className="text-muted font-mono text-meta uppercase tracking-[0.18em]">{site.name}</span>
            <a href={`mailto:${site.email}`} className="text-h3 hover:text-accent inline-flex w-fit items-center gap-2 tracking-[-0.02em] transition-colors">
              {site.email}
              <ArrowUpRightIcon size={18} />
            </a>
            <SocialIcons ariaLabel={content.footer.socials} className="mt-2" />
          </div>
          <nav aria-label={content.ui.footerNav} className="flex flex-col gap-2 md:col-span-4">
            {content.nav.map((item, index) => (
              <Link key={item.href} href={item.href} className="group flex items-center justify-between gap-4 border-line border-t py-2">
                <span className="font-mono text-meta uppercase tracking-[0.14em]">{String(index + 1).padStart(2, "0")}</span>
                <span className="group-hover:text-accent font-display text-h3 tracking-[-0.02em] transition-colors">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 md:col-span-3 md:items-end">
            <LiveClock className="text-fg" />
            <span className="text-subtle font-mono text-meta uppercase tracking-[0.14em]">{site.location} / {site.timeZoneLabel}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="gutter-x mx-auto w-full max-w-[var(--container-max)] overflow-hidden">
        <span className="font-display block translate-y-[0.12em] whitespace-nowrap text-[clamp(4rem,17vw,16rem)] leading-[0.78] tracking-[-0.05em] text-fg/10">
          RADITYA
        </span>
      </div>
      <div className="gutter-x mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-2 border-line border-t py-5 font-mono text-meta uppercase tracking-[0.14em] text-subtle sm:flex-row sm:items-center sm:justify-between">
        <span>{year} {site.name}</span>
        <span>{content.footer.note}</span>
      </div>
    </footer>
  );
}
