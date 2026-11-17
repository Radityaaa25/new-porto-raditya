"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils/cn";
import { useSiteContent } from "@/components/providers/LocaleProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const content = useSiteContent();

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={theme === "dark" ? content.ui.themeDark : content.ui.themeLight}
      aria-pressed={theme === "light"}
      suppressHydrationWarning
      className={cn(
        "border-line hover:border-fg flex size-10 items-center justify-center rounded-full border transition-colors",
        className,
      )}
    >
      <MoonIcon size={18} className="theme-icon-moon" />
      <SunIcon size={18} className="theme-icon-sun" />
    </button>
  );
}
