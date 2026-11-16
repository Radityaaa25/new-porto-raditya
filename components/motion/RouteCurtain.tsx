"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useActiveLocale } from "@/components/providers/LocaleProvider";
import { useEffect, useRef } from "react";

import { gsap } from "@/lib/motion/gsap";
import { duration, ease } from "@/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

export function RouteCurtain() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useActiveLocale();
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef(pathname);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    const panels = element.querySelectorAll<HTMLElement>("[data-panel]");
    const mark = element.querySelector<HTMLElement>("[data-mark]");

    const cover = (href: string) => {
      gsap.set(element, { pointerEvents: "auto" });
      gsap.timeline({ onComplete: () => router.push(href) })
        .fromTo(panels, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top center", duration: 0.55, ease: ease.cine, stagger: 0.04 })
        .fromTo(mark, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.3);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || url.hash) return;
      const prefix = `/${locale}`;
      const next = url.pathname.startsWith(prefix) ? url.pathname.slice(prefix.length) || "/" : url.pathname;
      if (next === pathname) return;
      event.preventDefault();
      cover(`${next}${url.search}`);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [locale, pathname, reduced, router]);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    const element = ref.current;
    if (!element || reduced) return;
    const panels = element.querySelectorAll<HTMLElement>("[data-panel]");
    const mark = element.querySelector<HTMLElement>("[data-mark]");
    gsap.set(element, { pointerEvents: "auto" });
    gsap.timeline({ onComplete: () => gsap.set(element, { pointerEvents: "none" }) })
      .to(mark, { opacity: 0, duration: 0.18 })
      .fromTo(panels, { scaleY: 1 }, { scaleY: 0, transformOrigin: "bottom center", duration: duration.cinematic, ease: ease.cine, stagger: 0.05 }, 0.15);
  }, [pathname, reduced]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-overlay flex">
      <span data-panel className="bg-bg h-full w-1/2 origin-top scale-y-0 border-r border-line" />
      <span data-panel className="bg-bg h-full w-1/2 origin-top scale-y-0" />
      <span data-mark className="text-accent absolute inset-0 flex items-center justify-center font-mono text-meta uppercase tracking-[0.4em] opacity-0">
        RA / Loading
      </span>
    </div>
  );
}
