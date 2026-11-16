"use client";

import Image from "next/image";
import { useState, type ComponentType, type ReactNode } from "react";

import * as iconSet from "@/components/icons";
import type { IconProps } from "@/components/icons";
import { Moni } from "@/components/mascot/Moni";
import {
  ContourField,
  DotGrid,
  Halftone,
  PaperFibre,
  Scanline,
} from "@/components/textures";
import { getProjects } from "@/content/projects";
import { moniCopy, moniPoses, type MoniPose } from "@/lib/motion/moni";
import { usePrefersReducedMotion } from "@/lib/utils/hooks";

const CAPTURED_AT = "2026-11-15";

const iconEntries = Object.entries(iconSet).filter(
  ([name, value]) => name.endsWith("Icon") && typeof value === "function",
) as Array<[string, ComponentType<IconProps>]>;

const TEXTURES = [
  {
    name: "Grain",
    meta: "feTurbulence 0.8, 4 octaves, 0.04",
    node: <div className="texture-grain absolute inset-0" style={{ opacity: 0.7 }} />,
  },
  { name: "Dot grid", meta: "radial-gradient, 24px pitch, 1px dot", node: <DotGrid /> },
  { name: "Contour", meta: "repeating-radial, 8px step", node: <ContourField /> },
  { name: "Halftone", meta: "radial dots, 6px pitch, 15%", node: <Halftone /> },
  { name: "Scanline", meta: "repeating-linear, 3px gap, 0.03", node: <Scanline /> },
  { name: "Paper fibre", meta: "feTurbulence 0.9, 3 octaves, 0.05", node: <PaperFibre /> },
] as const;

function SectionHead({
  index,
  title,
  meta,
  children,
}: {
  index: string;
  title: string;
  meta: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-line pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-h2 tracking-[-0.02em]">
          <span className="mr-3 font-mono text-meta text-muted">{index}</span>
          {title}
        </h2>
        <span className="font-mono text-meta uppercase tracking-[0.14em] text-muted">{meta}</span>
      </div>
      {children}
    </div>
  );
}

export function AssetGallery() {
  const projects = getProjects("en");
  const prefersReduced = usePrefersReducedMotion();
  const [pose, setPose] = useState<MoniPose>("idle");
  const [cardPose, setCardPose] = useState<MoniPose>("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const copyIconName = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <SectionHead index="01" title="Icon set" meta={`${iconEntries.length} icons / 24px / 1.5px`}>
        <p className="max-w-[var(--measure-wide)] text-muted">
          One grid, one stroke weight, currentColor throughout. Click any tile to copy its component
          name.
        </p>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {iconEntries.map(([name, Icon]) => (
            <button
              key={name}
              type="button"
              onClick={() => copyIconName(name)}
              className="group flex min-h-28 flex-col items-start justify-between gap-6 bg-bg p-4 text-left transition-colors duration-[var(--dur-fast)] hover:bg-surface"
            >
              <Icon size={26} className="text-fg transition-colors group-hover:text-accent" />
              <span className="font-mono text-meta leading-tight tracking-[0.04em] text-muted">
                {name.replace(/Icon$/, "")}
              </span>
            </button>
          ))}
        </div>
        {copied ? (
          <span className="font-mono text-meta text-accent" role="status">
            Copied {copied}
          </span>
        ) : null}
      </SectionHead>

      <SectionHead index="02" title="Moni" meta="original rig / 7 poses / 260x280">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="border-line bg-surface relative flex items-center justify-center overflow-hidden rounded-lg border p-6">
            <div className="texture-dot-grid pointer-events-none absolute inset-0 opacity-40" />
            <Moni pose={pose} className="relative h-auto w-full max-w-64" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {moniPoses.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setPose(name);
                                  }}
                  aria-pressed={pose === name}
                  className="border-line hover:border-fg aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-ink rounded-full border px-4 py-2 font-mono text-meta uppercase tracking-[0.12em] transition-colors duration-[var(--dur-fast)]"
                >
                  {moniCopy[name]}
                </button>
              ))}
            </div>
            <p className="max-w-[var(--measure)] text-body-sm text-muted">
              Named rig groups: body, head, eyes, lid-l, lid-r, arm-l, arm-r, ring, zzz, tick.
              Blink loop, idle float, and cursor-look run on mount; pose changes tween instead of
              remounting.
            </p>
            <div className="border-line grid gap-4 rounded-md border p-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-meta uppercase tracking-[0.14em] text-muted">
                  Reduced motion
                </span>
                <span className="text-body-sm">{prefersReduced ? "Active: loops off" : "Inactive"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-meta uppercase tracking-[0.14em] text-muted">
                  Hover reaction
                </span>
                <span className="text-body-sm">Hover the row below</span>
              </div>
            </div>
            <div
              onPointerEnter={() => setCardPose("type")}
              onPointerLeave={() => setCardPose("idle")}
              onFocus={() => setCardPose("type")}
              onBlur={() => setCardPose("idle")}
              tabIndex={0}
              className="border-line bg-surface focus-visible:border-accent flex items-center gap-5 rounded-md border p-4"
            >
              <Moni pose={cardPose} className="h-24 w-auto shrink-0" title="Moni typing" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-meta uppercase tracking-[0.14em] text-muted">
                  Index row hover
                </span>
                <span className="font-display text-h3 tracking-[-0.01em]">Clarise</span>
                <span className="text-body-sm text-muted">
                  Pointer enters, Moni switches to the typing pose for the hovered project.
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionHead>

      <SectionHead index="03" title="Textures" meta="procedural / zero bitmap bytes">
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {TEXTURES.map((texture) => (
            <div key={texture.name} className="flex flex-col gap-4 bg-bg p-4">
              <div className="bg-surface relative h-36 overflow-hidden rounded-sm">{texture.node}</div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-h3 tracking-[-0.01em]">{texture.name}</span>
                <span className="font-mono text-meta text-muted">{texture.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionHead>

      <SectionHead
        index="04"
        title="Project media"
        meta={`${projects.length} sites / captured ${CAPTURED_AT}`}
      >
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.slug} className="flex flex-col gap-4">
              <div className="border-line relative overflow-hidden rounded-md border">
                <Image
                  src={`/media/projects/${project.slug}/cover.avif`}
                  loading="eager"
                  alt={`${project.title} landing page, desktop cover`}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full"
                />
                <span className="absolute left-3 top-3 rounded-xs bg-bg/80 px-2 py-1 font-mono text-meta uppercase tracking-[0.12em] text-fg backdrop-blur-sm">
                  {project.slug}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-h3 tracking-[-0.01em]">{project.title}</span>
                  <span className="font-mono text-meta text-muted">
                    cover 1600x1000 / detail 1440x900
                  </span>
                </div>
                <div className="border-line shrink-0 overflow-hidden rounded-sm border">
                  <Image
                    src={`/media/projects/${project.slug}/mobile.avif`}
                  loading="eager"
                    alt={`${project.title} mobile view`}
                    width={390}
                    height={844}
                    className="h-28 w-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionHead>

      <SectionHead index="05" title="Social and app icons" meta="1200x630 / 180 / 192 / 512 / ico">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="border-line overflow-hidden rounded-md border">
            <Image
              src="/og.png"
              loading="eager"
              alt="Open Graph card: name, headline, and Jakarta clock mark"
              width={1200}
              height={630}
              className="h-auto w-full"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { src: "/icon-192.png", size: "192", alt: "App icon 192" },
                { src: "/icon-512.png", size: "512", alt: "App icon 512" },
                { src: "/apple-icon.png", size: "180", alt: "Apple touch icon" },
              ].map((icon) => (
                <div key={icon.src} className="flex flex-col items-center gap-2">
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={Number(icon.size)}
                    height={Number(icon.size)}
                    className="border-line h-20 w-20 rounded-md border"
                  />
                  <span className="font-mono text-meta text-muted">{icon.size}px</span>
                </div>
              ))}
            </div>
            <div className="border-line flex items-center justify-between rounded-sm border px-3 py-2 font-mono text-meta">
              <span className="text-muted">favicon.ico</span>
              <span>16 / 32 / 48</span>
            </div>
            <p className="text-body-sm text-muted">
              Source: app/icon.svg monogram. Exported with ImageMagick; OG captured from a generated
              HTML template at 1200x630.
            </p>
          </div>
        </div>
      </SectionHead>

    </div>
  );
}