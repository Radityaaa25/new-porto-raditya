export const duration = {
  instant: 0.08,
  fast: 0.16,
  ui: 0.3,
  reveal: 0.6,
  cinematic: 1.2,
  draw: 0.66,
} as const;

export const ease = {
  ui: "cubic-bezier(0, 0, 0.2, 1)",
  cine: "cubic-bezier(0.66, 0, 0.01, 1)",
  expo: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
} as const;

export const stagger = {
  tight: 0.06,
  base: 0.09,
  loose: 0.15,
} as const;

export const distance = {
  y: 24,
  ySm: 12,
  x: 32,
} as const;

export const scale = {
  press: 0.98,
  hover: 1.01,
} as const;

export const scroll = {
  start: "top 80%",
  end: "bottom 20%",
  scrub: 0.6,
  anticipatePin: 1,
  once: true,
  pinSpacing: true,
} as const;

export const preloader = {
  minMs: 1400,
  maxMs: 2500,
  counterMs: 1800,
  statusEveryMs: 900,
  exitMs: 900,
} as const;

export const marquee = {
  duration: 40,
  ease: "none",
  repeat: -1,
  pausedOnHover: true,
} as const;

export const character = {
  blinkInterval: 4.2,
  blinkClose: 0.12,
  floatDuration: 6,
  floatDistance: 6,
  waveDuration: 1.2,
  typeStep: 0.4,
  lookLerp: 0.12,
  lookMax: 3,
  headMax: 8,
  poseDuration: 0.45,
} as const;

export const hud = {
  clockTickMs: 1000,
  coordsThrottleMs: 40,
  coordsEaseScale: 6,
} as const;

export const cursor = {
  size: 8,
  ring: 28,
  followLerp: 0.18,
  labelThreshold: 1,
} as const;

export const query = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
  coarsePointer: "(hover: none), (pointer: coarse)",
  darkScheme: "(prefers-color-scheme: dark)",
} as const;

export const zIndex = {
  below: -1,
  base: 0,
  content: 10,
  sticky: 20,
  hud: 40,
  cursor: 45,
  overlay: 60,
  menu: 70,
  preloader: 90,
} as const;

export const ms = (value: number): number => value / 1000;

export type DurationToken = keyof typeof duration;
export type EaseToken = keyof typeof ease;
export type StaggerToken = keyof typeof stagger;
export type QueryToken = keyof typeof query;
