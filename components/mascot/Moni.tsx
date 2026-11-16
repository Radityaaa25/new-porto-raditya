"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/motion/gsap";
import { duration, ease } from "@/lib/motion/tokens";
import { moni, moniPose, type MoniPose } from "@/lib/motion/moni";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

type MoniProps = {
  pose?: MoniPose;
  className?: string;
  title?: string;
};

const HEAD_ORIGIN = moni.headOrigin;
const SHOULDER_L = moni.shoulderL;
const SHOULDER_R = moni.shoulderR;

export function Moni({ pose = "idle", className, title = "Moni" }: MoniProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const poseRef = useRef<MoniPose>(pose);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    poseRef.current = pose;
  }, [pose]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pick = (rig: string) => root.querySelector<SVGGElement>(`[data-rig="${rig}"]`);

    const context = gsap.context(() => {
      const head = pick("head");
      const armL = pick("arm-l");
      const armR = pick("arm-r");
      const lidL = pick("lid-l");
      const lidR = pick("lid-r");
      const ring = pick("ring");

      if (head) gsap.set(head, { svgOrigin: HEAD_ORIGIN });
      if (armL) gsap.set(armL, { svgOrigin: SHOULDER_L });
      if (armR) gsap.set(armR, { svgOrigin: SHOULDER_R });
      for (const lid of [lidL, lidR]) {
        if (lid) gsap.set(lid, { transformOrigin: "center top", transformBox: "fill-box", scaleY: 0 });
      }
      if (ring) gsap.set(ring, { transformOrigin: "center", scale: 0.9 });
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pick = (rig: string) => root.querySelector<SVGGElement>(`[data-rig="${rig}"]`);

    const targets = moniPose(pose);
    const durationValue = prefersReduced ? 0.01 : moni.poseDuration;

    const context = gsap.context(() => {
      const tween = { duration: durationValue, ease: ease.ui, overwrite: "auto" as const };
      if (pick("head")) gsap.to(pick("head"), { rotation: targets.head, ...tween });
      if (pick("arm-l")) gsap.to(pick("arm-l"), { rotation: targets.armL, ...tween });
      if (pick("arm-r")) gsap.to(pick("arm-r"), { rotation: targets.armR, ...tween });
      if (pick("lid-l")) gsap.to(pick("lid-l"), { scaleY: targets.lid, ...tween });
      if (pick("lid-r")) gsap.to(pick("lid-r"), { scaleY: targets.lid, ...tween });
      if (pick("zzz")) gsap.to(pick("zzz"), { opacity: targets.zzz, ...tween });
      if (pick("tick")) gsap.to(pick("tick"), { opacity: targets.tick, ...tween });
      if (pick("ring")) gsap.to(pick("ring"), { opacity: targets.ring, scale: targets.ring ? 1 : 0.9, ...tween });
    }, root);

    return () => context.revert();
  }, [pose, prefersReduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReduced || pose === "sleep" || pose === "static") return;
    const lids = ["lid-l", "lid-r"]
      .map((rig) => root.querySelector<SVGGElement>(`[data-rig="${rig}"]`))
      .filter((lid): lid is SVGGElement => Boolean(lid));
    if (lids.length === 0) return;

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: moni.blinkInterval });
    timeline
      .to(lids, { scaleY: 1, duration: moni.blinkClose, ease: "power2.in", stagger: 0 })
      .to(lids, { scaleY: 0, duration: moni.blinkClose * 0.8, ease: "power2.out", stagger: 0 });

    return () => {
      timeline.kill();
      gsap.set(lids, { scaleY: 0 });
    };
  }, [pose, prefersReduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReduced || pose === "static") return;
    const float = root.querySelector<SVGGElement>('[data-rig="float"]');
    if (!float) return;

    const timeline = gsap.to(float, {
      y: moni.floatDistance,
      duration: moni.floatDuration / 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      timeline.kill();
      gsap.set(float, { y: 0 });
    };
  }, [pose, prefersReduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReduced || pose === "static" || pose === "sleep") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const head = root.querySelector<SVGGElement>('[data-rig="head"]');
    const eyes = root.querySelector<SVGGElement>('[data-rig="eyes"]');
    if (!head || !eyes) return;

    const headTo = gsap.quickTo(head, "rotation", { duration: 0.5, ease: "power2.out" });
    const eyesX = gsap.quickTo(eyes, "x", { duration: 0.3, ease: "power2.out" });
    const eyesY = gsap.quickTo(eyes, "y", { duration: 0.3, ease: "power2.out" });

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
      headTo(nx * moni.headMax);
      eyesX(nx * moni.lookMax);
      eyesY(ny * moni.lookMax);
    };

    const onLeave = () => {
      headTo(0);
      eyesX(0);
      eyesY(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      gsap.set([head, eyes], { rotation: 0, x: 0, y: 0 });
    };
  }, [pose, prefersReduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReduced) return;
    const armR = root.querySelector<SVGGElement>('[data-rig="arm-r"]');
    if (!armR) return;

    let done = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || done || poseRef.current !== "idle") return;
        done = true;
        observer.disconnect();
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(armR, { rotation: -118, duration: duration.ui })
          .to(armR, { rotation: -96, duration: duration.ui })
          .to(armR, { rotation: -118, duration: duration.ui })
          .to(armR, { rotation: 0, duration: duration.reveal });
      },
      { threshold: 0.6 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [prefersReduced]);

  return (
    <svg
      ref={rootRef}
      viewBox={moni.viewBox}
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      <title>{title}</title>
      <ellipse cx="130" cy="263" rx="54" ry="6" fill="var(--line-strong)" />
      <g data-rig="float">
        <circle
          data-rig="ring"
          cx="130"
          cy="164"
          r="104"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="6 10"
          opacity="0"
        />
        <g data-rig="body">
          <rect x="122" y="162" width="16" height="16" rx="4" fill="var(--line-strong)" />
          <rect
            x="94"
            y="174"
            width="72"
            height="54"
            rx="22"
            fill="var(--bg-elevated)"
            stroke="var(--line-strong)"
            strokeWidth="2"
          />
          <circle cx="130" cy="196" r="4" fill="var(--accent)" />
          <path d="M116 210h28" stroke="var(--line-strong)" strokeWidth="2" strokeLinecap="round" />
          <rect x="102" y="225" width="20" height="10" rx="5" fill="var(--bg-elevated-2)" />
          <rect x="138" y="225" width="20" height="10" rx="5" fill="var(--bg-elevated-2)" />
        </g>
        <g data-rig="arm-l">
          <path
            d="M96 188c-12 6-18 16-16 30"
            stroke="var(--bg-elevated-2)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="80" cy="220" r="7" fill="var(--bg-elevated)" stroke="var(--line-strong)" strokeWidth="2" />
        </g>
        <g data-rig="arm-r">
          <path
            d="M164 188c12 6 18 16 16 30"
            stroke="var(--bg-elevated-2)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="180" cy="220" r="7" fill="var(--bg-elevated)" stroke="var(--line-strong)" strokeWidth="2" />
        </g>
        <g data-rig="head">
          <path d="M104 60 96 38M156 60 164 38" stroke="var(--fg-muted)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="96" cy="37" r="3.5" fill="var(--accent)" />
          <circle cx="164" cy="37" r="3.5" fill="var(--accent)" />
          <rect
            x="58"
            y="60"
            width="144"
            height="112"
            rx="18"
            fill="var(--bg-elevated)"
            stroke="var(--line-strong)"
            strokeWidth="2"
          />
          <rect x="50" y="104" width="8" height="22" rx="3" fill="var(--bg-elevated-2)" />
          <rect x="202" y="104" width="8" height="22" rx="3" fill="var(--bg-elevated-2)" />
          <circle cx="206" cy="115" r="2.5" fill="var(--accent)" />
          <rect x="72" y="74" width="116" height="84" rx="12" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
          <path d="M80 80h42" stroke="var(--fg)" strokeOpacity="0.08" strokeWidth="4" strokeLinecap="round" />
          <g data-rig="eyes">
            <rect x="102" y="101" width="24" height="22" rx="8" fill="var(--accent)" />
            <rect x="134" y="101" width="24" height="22" rx="8" fill="var(--accent)" />
            <rect x="110" y="107" width="8" height="11" rx="3" fill="var(--bg)" opacity="0.86" />
            <rect x="142" y="107" width="8" height="11" rx="3" fill="var(--bg)" opacity="0.86" />
          </g>
          <g data-rig="lid-l">
            <rect x="100" y="99" width="28" height="26" rx="9" fill="var(--bg)" />
          </g>
          <g data-rig="lid-r">
            <rect x="132" y="99" width="28" height="26" rx="9" fill="var(--bg)" />
          </g>
          <path d="M119 140q11 8 22 0" stroke="var(--fg-muted)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="112" cy="138" r="4" fill="var(--accent)" opacity="0.18" />
          <circle cx="148" cy="138" r="4" fill="var(--accent)" opacity="0.18" />
        </g>
        <g data-rig="zzz" opacity="0" stroke="var(--fg-muted)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M186 88h10l-10 10h10" />
          <path d="M200 66h8l-8 8h8" />
          <path d="M212 46h6l-6 6h6" />
        </g>
        <g data-rig="tick" opacity="0" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round">
          <path d="M189 74q10-7 10 3 0 6-8 8v3" />
          <circle cx="191" cy="93" r="2" fill="var(--accent)" stroke="none" />
        </g>
      </g>
    </svg>
  );
}