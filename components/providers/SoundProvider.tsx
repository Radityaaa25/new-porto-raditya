"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { playSound, primeAudio, type SoundName } from "@/lib/audio/synth";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

function readStoredSound(): boolean {
  try {
    return window.localStorage.getItem("sound") === "on";
  } catch {
    return false;
  }
}

function persistSound(enabled: boolean): void {
  try {
    window.localStorage.setItem("sound", enabled ? "on" : "off");
  } catch {
    return;
  }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(readStoredSound);

  const play = useCallback(
    (name: SoundName) => {
      playSound(name, enabled);
    },
    [enabled],
  );

  const toggle = useCallback(() => {
    setEnabled((previous) => {
      const next = !previous;
      persistSound(next);
      if (next) {
        primeAudio();
        playSound("on", true);
      } else {
        playSound("off", previous);
      }
      return next;
    });
  }, []);

  const value = useMemo<SoundContextValue>(() => ({ enabled, toggle, play }), [enabled, toggle, play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundContextValue {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used inside SoundProvider");
  return context;
}
