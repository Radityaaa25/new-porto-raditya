import { distance, duration, ease, marquee, scale, stagger } from "./tokens";

export type TweenValues = Record<string, number | string>;

export type MotionPreset = {
  from: TweenValues;
  to: TweenValues;
  duration: number;
  ease: string;
  delay: number;
  stagger?: number;
};

export type PresetOptions = {
  delay?: number;
  duration?: number;
  ease?: string;
};

const base = (options: PresetOptions = {}) => ({
  duration: options.duration ?? duration.reveal,
  ease: options.ease ?? ease.cine,
  delay: options.delay ?? 0,
});

export const fadeIn = (options: PresetOptions = {}): MotionPreset => ({
  from: { opacity: 0 },
  to: { opacity: 1 },
  ...base({ duration: duration.ui, ease: ease.ui, ...options }),
});

export const fadeUp = (options: PresetOptions & { y?: number } = {}): MotionPreset => ({
  from: { opacity: 0, y: options.y ?? distance.y },
  to: { opacity: 1, y: 0 },
  ...base(options),
});

export const fadeUpSm = (options: PresetOptions = {}): MotionPreset => fadeUp({ ...options, y: distance.ySm });

export const maskReveal = (options: PresetOptions & { direction?: "up" | "down" } = {}): MotionPreset => ({
  from: {
    clipPath: options.direction === "down" ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
    y: options.direction === "down" ? -distance.ySm : distance.ySm,
    opacity: 0,
  },
  to: { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 },
  ...base(options),
});

export const lineReveal = (options: PresetOptions & { lines?: number } = {}): MotionPreset => ({
  from: { yPercent: 125, opacity: 0 },
  to: { yPercent: 0, opacity: 1 },
  ...base({ duration: duration.cinematic, ease: ease.cine, ...options }),
  stagger: stagger.loose,
});

export const lineStagger = (index: number, step: number = stagger.base): number => index * step;

export const cardIn = (index = 0, options: PresetOptions = {}): MotionPreset => ({
  from: { opacity: 0, y: distance.y, scale: 0.985 },
  to: { opacity: 1, y: 0, scale: 1 },
  ...base({ ...options, delay: (options.delay ?? 0) + lineStagger(index) }),
});

export const sectionEnter = (options: PresetOptions = {}): MotionPreset => ({
  from: { opacity: 0, y: distance.y },
  to: { opacity: 1, y: 0 },
  ...base({ duration: duration.reveal, ease: ease.expo, ...options }),
});

export const curtainIn = (options: PresetOptions = {}): MotionPreset => ({
  from: { scaleY: 0, transformOrigin: "top center" },
  to: { scaleY: 1, transformOrigin: "top center" },
  ...base({ duration: duration.cinematic, ease: ease.cine, ...options }),
});

export const curtainOut = (options: PresetOptions = {}): MotionPreset => ({
  from: { scaleY: 1, transformOrigin: "bottom center" },
  to: { scaleY: 0, transformOrigin: "bottom center" },
  ...base({ duration: duration.cinematic, ease: ease.cine, ...options }),
});

export const menuOverlay = (options: PresetOptions = {}): MotionPreset => ({
  from: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
  to: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  ...base({ duration: duration.reveal, ease: ease.cine, ...options }),
});

export const menuLink = (index = 0, options: PresetOptions = {}): MotionPreset => ({
  from: { opacity: 0, yPercent: 60 },
  to: { opacity: 1, yPercent: 0 },
  ...base({ duration: duration.reveal, ease: ease.expo, ...options, delay: (options.delay ?? 0) + lineStagger(index, stagger.tight) }),
});

export const pressIn = (options: PresetOptions = {}): MotionPreset => ({
  from: { scale: 1 },
  to: { scale: scale.press },
  ...base({ duration: duration.fast, ease: ease.ui, ...options }),
});

export const hoverLift = (options: PresetOptions = {}): MotionPreset => ({
  from: { y: 0 },
  to: { y: -4 },
  ...base({ duration: duration.fast, ease: ease.ui, ...options }),
});

export const imageZoom = (options: PresetOptions = {}): MotionPreset => ({
  from: { scale: 1.03 },
  to: { scale: 1 },
  ...base({ duration: duration.cinematic, ease: ease.cine, ...options }),
});

export const drawPath = (options: PresetOptions = {}): MotionPreset => ({
  from: { strokeDashoffset: 1 },
  to: { strokeDashoffset: 0 },
  ...base({ duration: duration.draw, ease: ease.inOut, ...options }),
});

export const marqueeTrack = (options: PresetOptions & { reverse?: boolean } = {}): MotionPreset => ({
  from: { xPercent: options.reverse ? -100 : 0 },
  to: { xPercent: options.reverse ? 0 : -100 },
  duration: options.duration ?? marquee.duration,
  ease: ease.linear,
  delay: options.delay ?? 0,
});

export const counterStep = (progress: number, target: number, decimals = 0): number => {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const eased = 1 - Math.pow(1 - clamped, 3);
  const value = eased * target;
  return decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value);
};

export const withDelay = (preset: MotionPreset, delay: number): MotionPreset => ({
  ...preset,
  delay: preset.delay + delay,
});

export const reduced = (preset: MotionPreset): MotionPreset => ({
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: duration.ui,
  ease: ease.ui,
  delay: preset.delay,
});

export const resolveMotion = (preset: MotionPreset, prefersReduced: boolean): MotionPreset =>
  prefersReduced ? reduced(preset) : preset;

export const scrollDefaults = {
  start: "top 80%",
  end: "bottom 20%",
  scrub: 0.6,
  anticipatePin: 1,
  once: true,
} as const;
