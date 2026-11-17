"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ClockIcon, ListIcon, MailIcon, MenuIcon, SparkIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/hud/LanguageSwitcher";
import { LiveClock } from "@/components/hud/LiveClock";
import { ThemeToggle } from "@/components/hud/ThemeToggle";
import { MenuOverlay } from "@/components/motion/MenuOverlay";
import { SocialIcons } from "@/components/socials/SocialLinks";
import { useSiteContent } from "@/components/providers/LocaleProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { navVariant, site, type NavVariant } from "@/content/site";
import type { NavItem } from "@/content/types";
import { Link, usePathname } from "@/i18n/navigation";
import { gsap } from "@/lib/motion/gsap";
import { duration, ease, nav } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { siteUrl } from "@/lib/seo";

const NAV_ICONS = {
  work: ListIcon,
  about: SparkIcon,
  contact: MailIcon,
} as const;

const isVariant = (value: string | null): value is NavVariant =>
  value === "top" || value === "bottom" || value === "left" || value === "right";

function queryOverride(): NavVariant | null {
  if (typeof window === "undefined") return null;
  const productionHost = new URL(siteUrl).hostname;
  const preview = process.env.NODE_ENV !== "production" || window.location.hostname !== productionHost;
  if (!preview) return null;
  const value = new URLSearchParams(window.location.search).get("nav");
  return isVariant(value) ? value : null;
}

function useNavVariant(): NavVariant {
  const [variant, setVariant] = useState<NavVariant>(navVariant);

  useEffect(() => {
    const apply = (next: NavVariant) => {
      const mobile = window.matchMedia("(max-width: 47.999rem)").matches;
      const effective = mobile && (next === "left" || next === "right") ? "bottom" : next;
      setVariant(effective);
      document.documentElement.dataset.nav = effective;
    };

    const sync = () => apply(queryOverride() ?? navVariant);
    const onNav = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (isVariant(detail)) apply(detail);
    };

    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("popstate", sync);
    window.addEventListener("portfolio:nav", onNav);
    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("portfolio:nav", onNav);
    };
  }, []);

  return variant;
}

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

function shouldHideForPointer(target: EventTarget | null, header: HTMLElement): boolean {
  if (!(target instanceof Node)) return false;
  return header.contains(target);
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const variant = useNavVariant();
  const content = useSiteContent();
  const { subscribe } = useSmoothScroll();
  const headerRef = useRef<HTMLElement>(null);
  const menuOpenRef = useRef(false);
  const overRef = useRef(false);
  const focusRef = useRef(false);
  const hiddenRef = useRef(false);
  const variantRef = useRef(variant);
  const lastScrollRef = useRef(0);
  const idleRef = useRef<number | null>(null);
  const isDock = variant === "left" || variant === "right";

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  const clearIdle = useCallback(() => {
    if (idleRef.current === null) return;
    window.clearTimeout(idleRef.current);
    idleRef.current = null;
  }, []);

  const setHidden = useCallback(
    (hide: boolean) => {
      const header = headerRef.current;
      if (!header || hiddenRef.current === hide) return;
      hiddenRef.current = hide;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const current = variantRef.current;
      const vertical = current === "left" || current === "right";
      const towardEdge = current === "top" || current === "left" ? -1 : 1;
      const origin =
        current === "top"
          ? "top center"
          : current === "bottom"
            ? "bottom center"
            : current === "left"
              ? "left center"
              : "right center";
      const vars: gsap.TweenVars = {
        opacity: hide ? 0 : 1,
        duration: reduced ? duration.fast : duration.ui,
        ease: reduced ? ease.ui : ease.expo,
        overwrite: true,
        pointerEvents: hide ? "none" : "auto",
        transformOrigin: origin,
      };
      if (!reduced) {
        vars[vertical ? "xPercent" : "yPercent"] = hide ? towardEdge * nav.hiddenTravel : 0;
        vars.scale = hide ? nav.hiddenScale : 1;
      }
      gsap.to(header, vars);
    },
    [],
  );

  const show = useCallback(() => {
    clearIdle();
    setHidden(false);
  }, [clearIdle, setHidden]);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen) show();
  }, [menuOpen, show]);

  useEffect(() => {
    return subscribe((scroll) => {
      const atTop = scroll <= nav.topThreshold;
      const delta = scroll - lastScrollRef.current;
      lastScrollRef.current = scroll;

      if (menuOpenRef.current || overRef.current || focusRef.current || atTop) {
        show();
        return;
      }

      if (Math.abs(delta) > 1) setHidden(true);
      clearIdle();
      idleRef.current = window.setTimeout(() => {
        idleRef.current = null;
        setHidden(false);
      }, nav.hideDelayMs);
    });
  }, [clearIdle, setHidden, show, subscribe]);

  useEffect(() => () => clearIdle(), [clearIdle]);

  const onPointerEnter = () => {
    overRef.current = true;
    show();
  };

  const onPointerLeave = () => {
    overRef.current = false;
  };

  const onFocus = () => {
    focusRef.current = true;
    show();
  };

  const onBlur = (event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    focusRef.current = shouldHideForPointer(next, event.currentTarget) ? true : false;
  };

  const menuButton = (
    <button
      type="button"
      onClick={() => {
        setMenuOpen(true);
      }}
      aria-expanded={menuOpen}
      aria-controls="site-menu"
      aria-label={content.ui.openMenu}
      className="border-line hover:border-fg group relative ml-1 flex h-10 items-center gap-2 rounded-full border pr-4 pl-3 transition-colors"
    >
      <MenuIcon size={18} />
      <span className="font-mono text-meta uppercase tracking-[0.14em]">{content.ui.menu}</span>
    </button>
  );

  return (
    <>
      <header
        ref={headerRef}
        data-variant={variant}
        className="site-nav"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onFocusCapture={onFocus}
        onBlurCapture={onBlur}
      >
        <div className="site-nav-surface">
          {isDock ? (
            <>
              <Link
                href="/"
                aria-label={site.name}
                className="site-nav-dock-link site-nav-dock-trigger"
              >
                <span aria-hidden="true" className="font-mono text-meta tracking-[0.14em]">
                  {site.initials}
                </span>
                <span aria-hidden="true" className="site-nav-tooltip">
                  {site.name}
                </span>
              </Link>

              <nav aria-label={content.ui.primary} className="site-nav-links">
                {content.nav.map((item) => {
                  const Icon = NAV_ICONS[item.key];
                  return (
                    <DockNavItem key={item.href} item={item} Icon={Icon} />
                  );
                })}
              </nav>

              <div className="site-nav-tools">
                <div className="site-nav-dock-trigger" aria-label={`JKT ${site.timeZoneLabel}`}>
                  <ClockIcon size={18} />
                  <span aria-hidden="true" className="site-nav-tooltip">
                    <LiveClock showLabel={false} />
                  </span>
                </div>
                <SocialIcons ariaLabel={content.footer.socials} className="flex-col gap-1" />
                <LanguageSwitcher vertical />
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(true);
                  }}
                  aria-expanded={menuOpen}
                  aria-controls="site-menu"
                  aria-label={content.ui.openMenu}
                  className="site-nav-dock-trigger"
                >
                  <MenuIcon size={18} />
                  <span aria-hidden="true" className="site-nav-tooltip">
                    {content.ui.menu}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="text-fg flex items-baseline gap-2 font-mono text-meta uppercase tracking-[0.18em]"
              >
                <span className="text-subtle">{site.initials}</span>
                <span className="hidden sm:inline">{site.shortName}</span>
              </Link>

              <nav aria-label={content.ui.primary} className="site-nav-links">
                {content.nav.map((item) => (
                  <NavItem key={item.href} item={item} />
                ))}
              </nav>

              <div className="site-nav-tools">
                <span className="hidden lg:inline-flex">
                  <LiveClock className="text-muted mr-2" />
                </span>
                <SocialIcons ariaLabel={content.footer.socials} className="mr-1 hidden lg:flex" />
                <LanguageSwitcher className="hidden sm:flex" />
                <ThemeToggle />
                {menuButton}
              </div>
            </>
          )}
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

function DockNavItem({
  item,
  Icon,
}: {
  item: NavItem;
  Icon: (typeof NAV_ICONS)[NavItem["key"]];
}) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className="site-nav-dock-link"
    >
      <Icon size={18} />
      <span aria-hidden="true" className="site-nav-indicator" />
      <span aria-hidden="true" className="site-nav-tooltip">
        {item.label}
      </span>
    </Link>
  );
}
