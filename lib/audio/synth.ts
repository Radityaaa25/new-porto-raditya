export type SoundName =
  | "click"
  | "tick"
  | "open"
  | "close"
  | "on"
  | "off"
  | "success"
  | "complete";

type Recipe = {
  type: OscillatorType;
  freq: number;
  to?: number;
  duration: number;
  gain: number;
  delay?: number;
};

const MASTER = 0.15;

const RECIPES: Record<SoundName, ReadonlyArray<Recipe>> = {
  click: [{ type: "triangle", freq: 660, duration: 0.06, gain: 0.5 }],
  tick: [{ type: "sine", freq: 1180, duration: 0.024, gain: 0.28 }],
  open: [{ type: "sine", freq: 240, to: 520, duration: 0.18, gain: 0.4 }],
  close: [{ type: "sine", freq: 520, to: 240, duration: 0.16, gain: 0.36 }],
  on: [
    { type: "square", freq: 880, duration: 0.07, gain: 0.18 },
    { type: "square", freq: 1320, duration: 0.07, gain: 0.12 },
  ],
  off: [
    { type: "square", freq: 660, duration: 0.07, gain: 0.18 },
    { type: "square", freq: 440, duration: 0.07, gain: 0.12 },
  ],
  success: [
    { type: "triangle", freq: 523, duration: 0.24, gain: 0.34 },
    { type: "triangle", freq: 659, duration: 0.24, gain: 0.28, delay: 0.06 },
    { type: "triangle", freq: 784, duration: 0.24, gain: 0.24, delay: 0.12 },
  ],
  complete: [
    { type: "triangle", freq: 660, duration: 0.2, gain: 0.3 },
    { type: "triangle", freq: 990, duration: 0.2, gain: 0.2, delay: 0.07 },
  ],
};

type AudioContextConstructor = typeof AudioContext;

let context: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!context) {
    const ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
    if (!ctor) return null;
    context = new ctor();
  }
  if (context.state === "suspended") {
    void context.resume();
  }
  return context;
}

export function primeAudio(): void {
  getContext();
}

export function playSound(name: SoundName, enabled: boolean): void {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;

  for (const recipe of RECIPES[name]) {
    const start = ctx.currentTime + (recipe.delay ?? 0);
    const end = start + recipe.duration;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = recipe.type;
    osc.frequency.setValueAtTime(recipe.freq, start);
    if (recipe.to !== undefined) {
      osc.frequency.linearRampToValueAtTime(recipe.to, end);
    }

    const peak = Math.max(recipe.gain * MASTER, 0.0001);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(end + 0.01);
  }
}
