import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/icons";
import { LiveClock } from "@/components/hud/LiveClock";
import { footerNote, nav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line border-t px-[var(--gutter)] py-12">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
              {site.name}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex w-fit items-center gap-2 text-body transition-colors hover:text-accent"
            >
              {site.email}
              <ArrowUpRightIcon
                size={16}
                className="transition-transform duration-ui group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-meta uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1">
            <LiveClock className="text-fg" />
            <span className="font-mono text-meta uppercase tracking-[0.14em] text-subtle">
              {site.location} / {site.timeZoneLabel}
            </span>
          </div>
        </div>

        <div className="border-line flex flex-col gap-2 border-t pt-6 font-mono text-meta uppercase tracking-[0.14em] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>
            {year} {site.name}
          </span>
          <span>{footerNote}</span>
        </div>
      </div>
    </footer>
  );
}
