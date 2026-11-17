"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

import { gsap } from "@/lib/motion/gsap";
import { duration, ease } from "@/lib/motion/tokens";

type Theme = "dark" | "light";

type Origin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: (origin?: Origin) => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    callback: () => void | Promise<void>,
  ) => { finished: Promise<void> };
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem("theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function persistTheme(theme: Theme): void {
  try {
    window.localStorage.setItem("theme", theme);
  } catch {
    return;
  }
}

function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function themeColor(theme: Theme): string {
  if (typeof document === "undefined") return "";
  const name = theme === "dark" ? "--theme-bg-dark" : "--theme-bg-light";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  const color = themeColor(theme);
  if (meta && color) {
    meta.setAttribute("content", color);
  }
  persistTheme(theme);
  window.dispatchEvent(new CustomEvent("portfolio:theme", { detail: theme }));
}

function clampOrigin(origin?: Origin): Origin {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  if (origin) return origin;
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

function revealRadius(x: number, y: number): number {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme() ?? currentTheme());
  const targetRef = useRef<Theme>(theme);
  const animatingRef = useRef(false);
  const queuedRef = useRef<{ theme: Theme; origin?: Origin } | null>(null);
  const animateRef = useRef<(next: Theme, origin?: Origin) => void>(() => {});

  const finish = useCallback(() => {
    animatingRef.current = false;
    const queued = queuedRef.current;
    queuedRef.current = null;
    if (queued && queued.theme !== currentTheme()) {
      animateRef.current(queued.theme, queued.origin);
    }
  }, []);

  const animateTheme = useCallback(
    (next: Theme, origin?: Origin) => {
      if (typeof document === "undefined") return;
      const point = clampOrigin(origin);
      const radius = revealRadius(point.x, point.y);
      const root = document.documentElement;
      root.style.setProperty("--theme-x", `${point.x}px`);
      root.style.setProperty("--theme-y", `${point.y}px`);
      root.style.setProperty("--theme-r", `${radius}px`);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setThemeState(next);
        applyTheme(next);
        return;
      }

      const startTransition = (document as ViewTransitionDocument).startViewTransition;
      if (typeof startTransition === "function") {
        animatingRef.current = true;
        root.dataset.themeTransition = "true";
        try {
          const transition = startTransition.call(document, () => {
            flushSync(() => {
              setThemeState(next);
            });
            applyTheme(next);
          });
          transition.finished.finally(() => {
            delete root.dataset.themeTransition;
            finish();
          });
          return;
        } catch {
          delete root.dataset.themeTransition;
          animatingRef.current = false;
        }
      }

      animatingRef.current = true;
      const overlay = document.createElement("div");
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.pointerEvents = "none";
      overlay.style.zIndex = "var(--z-preloader)";
      overlay.style.background = themeColor(next);
      overlay.style.clipPath = `circle(0px at ${point.x}px ${point.y}px)`;
      overlay.style.willChange = "clip-path, opacity";
      document.body.appendChild(overlay);

      gsap.to(overlay, {
        clipPath: `circle(${radius}px at ${point.x}px ${point.y}px)`,
        duration: duration.theme,
        ease: ease.expo,
        onComplete: () => {
          setThemeState(next);
          applyTheme(next);
          gsap.to(overlay, {
            opacity: 0,
            duration: duration.fast,
            ease: ease.ui,
            onComplete: () => {
              overlay.remove();
              finish();
            },
          });
        },
      });
    },
    [finish],
  );

  useEffect(() => {
    animateRef.current = animateTheme;
  }, [animateTheme]);

  const setTheme = useCallback((next: Theme) => {
    targetRef.current = next;
    setThemeState(next);
    applyTheme(next);
  }, []);

  const toggle = useCallback((origin?: Origin) => {
    const next: Theme = targetRef.current === "dark" ? "light" : "dark";
    targetRef.current = next;
    if (animatingRef.current) {
      queuedRef.current = { theme: next, origin };
      return;
    }
    animateRef.current(next, origin);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggle }),
    [theme, setTheme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
