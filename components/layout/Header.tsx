"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MenuIcon } from "@/components/icons";
import { LiveClock } from "@/components/hud/LiveClock";
import { ThemeToggle } from "@/components/hud/ThemeToggle";
import { MenuOverlay } from "@/components/motion/MenuOverlay";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils/cn";

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative inline-flex items-center py-2 font-mono text-meta uppercase tracking-[0.14em] transition-colors",
        active ? "text-fg" : "text-muted hover:text-fg",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "bg-accent absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-ui ease-expo",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="border-line bg-bg/80 fixed inset-x-0 top-0 z-sticky border-b backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-[var(--gutter)]">
          <Link
            href="/"
            className="text-fg flex items-baseline gap-2 font-mono text-meta uppercase tracking-[0.18em]"
          >
            <span className="text-subtle">RA</span>
            <span className="hidden sm:inline">{site.shortName}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden lg:inline-flex">
              <LiveClock className="text-muted mr-2" />
            </span>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => {
                setMenuOpen(true);
              }}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label="Open menu"
              className="border-line hover:border-fg ml-1 flex h-10 items-center gap-2 rounded-full border pr-4 pl-3 transition-colors"
            >
              <MenuIcon size={18} />
              <span className="font-mono text-meta uppercase tracking-[0.14em]">Menu</span>
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
