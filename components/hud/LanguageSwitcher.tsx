"use client";

import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils/cn";

const LABELS: Record<string, string> = { en: "EN", id: "ID" };

export function LanguageSwitcher({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  const locale = useActiveLocale();
  const content = useSiteContent();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const index = routing.locales.indexOf(locale);

  const change = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname ?? "/", { locale: next, scroll: false });
    });
  };

  return (
    <div
      role="group"
      aria-label={content.ui.language}
      className={cn(
        "border-line bg-bg/40 relative flex items-center rounded-full border p-1",
        vertical ? "w-10 flex-col" : "h-10",
        pending && "opacity-70",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "bg-surface-2 absolute rounded-full transition-transform duration-ui ease-expo",
          vertical ? "top-1 right-1 left-1 h-8" : "top-1 bottom-1 left-1 w-9",
        )}
        style={{ transform: vertical ? `translateY(${index * 2}rem)` : `translateX(${index * 2.25}rem)` }}
      />
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => change(item)}
          aria-pressed={item === locale}
          aria-label={`${content.ui.languageHint}: ${LABELS[item]}`}
          className={cn(
            "text-muted hover:text-fg relative z-content h-8 rounded-full font-mono text-meta uppercase tracking-[0.12em] transition-colors",
            vertical ? "w-8" : "w-9",
            item === locale && "text-fg",
          )}
        >
          {LABELS[item]}
        </button>
      ))}
    </div>
  );
}