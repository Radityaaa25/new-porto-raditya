"use client";

import { VolumeOffIcon, VolumeOnIcon } from "@/components/icons";
import { useSound } from "@/components/providers/SoundProvider";
import { cn } from "@/lib/utils/cn";

type SoundToggleProps = {
  className?: string;
};

export function SoundToggle({ className }: SoundToggleProps) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      data-sound={enabled ? "on" : "off"}
      aria-label={enabled ? "Mute interface sound" : "Enable interface sound"}
      aria-pressed={enabled}
      suppressHydrationWarning
      className={cn(
        "border-line hover:border-fg flex size-10 items-center justify-center rounded-full border transition-colors",
        className,
      )}
    >
      <VolumeOffIcon size={18} className="sound-off-icon" />
      <VolumeOnIcon size={18} className="sound-on-icon" />
    </button>
  );
}
