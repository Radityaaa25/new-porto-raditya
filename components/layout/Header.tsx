"use client";

import { useState } from "react";

import { MenuIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/hud/LanguageSwitcher";
import { LiveClock } from "@/components/hud/LiveClock";
import { ThemeToggle } from "@/components/hud/ThemeToggle";
import { MenuOverlay } from "@/components/motion/MenuOverlay";
import { SocialIcons } from "@/components/socials/SocialLinks";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import type { NavItem } from "@/content/types";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

function NavItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative inline-flex items-center py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors",
        active ? "text-fg" : "text-muted hover:text-fg",
      )}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={cn(
          "bg-accent duration-ui ease-expo absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const content = useSiteContent();

  return (
    <>
      <header className="border-line bg-bg/80 z-sticky fixed inset-x-0 top-0 border-b backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-[var(--gutter)]">
          <Link
            href="/"
            className="text-fg flex items-baseline gap-2 font-mono text-meta uppercase tracking-[0.18em]"
          >
            <span className="text-subtle">RA</span>
            <span className="hidden sm:inline">Raditya</span>
          </Link>

          <nav aria-label={content.ui.primary} className="hidden items-center gap-8 md:flex">
            {content.nav.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden lg:inline-flex">
              <LiveClock className="text-muted mr-2" />
            </span>
            <SocialIcons
              ariaLabel={content.footer.socials}
              className="mr-1 hidden lg:flex"
            />
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => {
                setMenuOpen(true);
              }}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={content.ui.openMenu}
              className="border-line hover:border-fg ml-1 flex h-10 items-center gap-2 rounded-full border pr-4 pl-3 transition-colors"
            >
              <MenuIcon size={18} />
              <span className="font-mono text-meta uppercase tracking-[0.14em]">
                {content.ui.menu}
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <MenuOverlay
          onClose={() => {
            setMenuOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
