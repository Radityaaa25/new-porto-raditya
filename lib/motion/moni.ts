import { character } from "./tokens";

export type MoniPose =
  | "idle"
  | "wave"
  | "type"
  | "sleep"
  | "celebrate"
  | "confused"
  | "static";

export type MoniTargets = {
  armL: number;
  armR: number;
  head: number;
  lid: number;
  zzz: number;
  ring: number;
  tick: number;
  float: number;
};

export const moni = {
  viewBox: "0 0 260 280",
  headOrigin: "130 150",
  shoulderL: "82 190",
  shoulderR: "178 190",
  eyeOrigin: "130 112",
  ...character,
} as const;

const POSES: Record<MoniPose, MoniTargets> = {
  idle: { armL: 0, armR: 0, head: 0, lid: 0, zzz: 0, ring: 0, tick: 0, float: 1 },
  wave: { armL: 0, armR: -118, head: -3, lid: 0, zzz: 0, ring: 0, tick: 0, float: 1 },
  type: { armL: 34, armR: -34, head: 4, lid: 0, zzz: 0, ring: 0, tick: 0, float: 1 },
  sleep: { armL: 5, armR: -5, head: 7, lid: 1, zzz: 1, ring: 0, tick: 0, float: 0.45 },
  celebrate: { armL: -148, armR: 148, head: 0, lid: 0, zzz: 0, ring: 1, tick: 0, float: 1 },
  confused: { armL: 0, armR: -22, head: -9, lid: 0, zzz: 0, ring: 0, tick: 1, float: 1 },
  static: { armL: 0, armR: 0, head: 0, lid: 0, zzz: 0, ring: 0, tick: 0, float: 0 },
};

export const moniPose = (pose: MoniPose): MoniTargets => POSES[pose];

export const moniPoses = Object.keys(POSES) as MoniPose[];

export const moniCopy: Record<MoniPose, string> = {
  idle: "Idle",
  wave: "Wave",
  type: "Type",
  sleep: "Sleep",
  celebrate: "Celebrate",
  confused: "Confused",
  static: "Static",
};