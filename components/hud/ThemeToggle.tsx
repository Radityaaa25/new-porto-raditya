"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useSound } from "@/components/providers/SoundProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils/cn";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const { play } = useSound();

  return (
    <button
      type="button"
      onClick={() => {
        play("tick");
        toggle();
      }}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
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
