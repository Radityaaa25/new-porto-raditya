"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { duration } from "@/lib/motion/tokens";

type ScrollApi = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number) => void;
  scrollToTop: () => void;
  subscribe: (listener: (scroll: number) => void) => () => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const listeners = useRef(new Set<(scroll: number) => void>());
  const pathname = usePathname();

  useEffect(() => {
    const emit = (scroll: number) => {
      listeners.current.forEach((listener) => listener(scroll));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const onScroll = () => {
        ScrollTrigger.update();
        emit(window.scrollY);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;

    const onScroll = () => {
      ScrollTrigger.update();
      emit(lenis.scroll);
    };
    lenis.on("scroll", onScroll);

    const onPageshow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("pageshow", onPageshow);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("pageshow", onPageshow);
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.classList.add("is-locked");
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.classList.remove("is-locked");
  }, []);

  const scrollTo = useCallback((target: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target);
      return;
    }
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: duration.cinematic });
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const subscribe = useCallback((listener: (scroll: number) => void) => {
    listeners.current.add(listener);
    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const value = useMemo<ScrollApi>(
    () => ({ stop, start, scrollTo, scrollToTop, subscribe }),
    [stop, start, scrollTo, scrollToTop, subscribe],
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

export function useSmoothScroll(): ScrollApi {
  const context = useContext(ScrollContext);
  if (!context) throw new Error("useSmoothScroll must be used inside SmoothScrollProvider");
  return context;
}
