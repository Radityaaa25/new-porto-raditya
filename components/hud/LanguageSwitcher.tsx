"use client";

import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useActiveLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils/cn";

const LABELS: Record<string, string> = { en: "EN", id: "ID" };

export function LanguageSwitcher({ className }: { className?: string }) {
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
        "border-line bg-bg/40 relative flex h-10 items-center rounded-full border p-1",
        pending && "opacity-70",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="bg-surface-2 absolute top-1 bottom-1 left-1 w-9 rounded-full transition-transform duration-ui ease-expo"
        style={{ transform: `translateX(${index * 2.25}rem)` }}
      />
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => change(item)}
          aria-pressed={item === locale}
          aria-label={`${content.ui.languageHint}: ${LABELS[item]}`}
          className={cn(
            "text-muted hover:text-fg relative z-content h-8 w-9 rounded-full font-mono text-meta uppercase tracking-[0.12em] transition-colors",
            item === locale && "text-fg",
          )}
        >
          {LABELS[item]}
        </button>
      ))}
    </div>
  );
}