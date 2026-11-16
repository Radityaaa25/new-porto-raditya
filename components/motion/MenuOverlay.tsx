"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type KeyboardEvent } from "react";

import { CloseIcon } from "@/components/icons";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { gsap } from "@/lib/motion/gsap";
import { menuLink, menuOverlay, resolveMotion } from "@/lib/motion/presets";
import { duration, ease, stagger } from "@/lib/motion/tokens";
import { nav, site } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

type MenuOverlayProps = {
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MenuOverlay({ onClose }: MenuOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  const router = useRouter();
  const { stop, start } = useSmoothScroll();
  const prefersReduced = usePrefersReducedMotion();

  const requestClose = (href?: string) => {
    if (closingRef.current) return;
    closingRef.current = true;

    const root = rootRef.current;
    const finish = () => {
      if (href) router.push(href);
      onClose();
    };

    if (!root || prefersReduced) {
      finish();
      return;
    }

    gsap.to(root, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: duration.ui,
      ease: ease.cine,
      onComplete: finish,
    });
  };

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    closingRef.current = false;
    stop();
    closeRef.current?.focus();

    return () => {
      start();
      restoreRef.current?.focus();
    };
  }, [start, stop]);

  useEffect(() => {
    const root = rootRef.current;
    const list = listRef.current;
    if (!root || !list) return;

    const preset = resolveMotion(menuOverlay(), prefersReduced);
    const linkPreset = resolveMotion(menuLink(), prefersReduced);
    const links = Array.from(list.querySelectorAll("li"));

    const context = gsap.context(() => {
      gsap.fromTo(root, preset.from, {
        ...preset.to,
        duration: preset.duration,
        ease: preset.ease,
      });
      gsap.fromTo(links, linkPreset.from, {
        ...linkPreset.to,
        duration: linkPreset.duration,
        ease: linkPreset.ease,
        stagger: prefersReduced ? 0 : stagger.tight,
        delay: prefersReduced ? 0 : duration.ui,
      });
    }, root);

    return () => context.revert();
  }, [prefersReduced]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
      return;
    }

    if (event.key !== "Tab") return;

    const root = rootRef.current;
    if (!root) return;
    const focusables = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => element.offsetParent !== null,
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      onKeyDown={onKeyDown}
      className="bg-bg text-fg fixed inset-0 z-menu flex flex-col justify-between px-[var(--gutter)] py-[var(--gutter)]"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">Menu</span>
        <button
          ref={closeRef}
          type="button"
          onClick={() => requestClose()}
          className="border-line hover:border-fg flex size-11 items-center justify-center rounded-full border transition-colors"
          aria-label="Close menu"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      <nav aria-label="Primary">
        <ul ref={listRef} className="flex flex-col gap-2">
          {nav.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  requestClose(item.href);
                }}
                className="group flex items-baseline gap-4"
              >
                <span className="font-mono text-meta text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-h1 leading-none tracking-[-0.03em] transition-colors group-hover:text-accent">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-2 font-mono text-meta uppercase tracking-[0.14em] text-muted">
        <a href={`mailto:${site.email}`} className="hover:text-fg w-fit transition-colors">
          {site.email}
        </a>
        <span>
          {site.location} / {site.timeZoneLabel}
        </span>
      </div>
    </div>
  );
}
