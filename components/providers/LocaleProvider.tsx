"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Dictionary, Locale } from "@/content";

type LocaleContextValue = {
  locale: Locale;
  content: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  content,
  children,
}: LocaleContextValue & { children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale, content }}>{children}</LocaleContext.Provider>;
}

export function useSiteContent(): Dictionary {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useSiteContent must be used inside LocaleProvider");
  return context.content;
}

export function useActiveLocale(): Locale {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useActiveLocale must be used inside LocaleProvider");
  return context.locale;
}
