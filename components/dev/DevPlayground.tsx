"use client";

import { useState } from "react";

import { ArrowUpRightIcon } from "@/components/icons";
import { CountUp } from "@/components/motion/CountUp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { MenuOverlay } from "@/components/motion/MenuOverlay";
import { Preloader } from "@/components/motion/Preloader";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { site } from "@/content/site";
import { duration as durationTokens, ease as easeTokens } from "@/lib/motion/tokens";

const easeKeys = Object.keys(easeTokens) as Array<keyof typeof easeTokens>;

export function DevPlayground() {
  const [durationMs, setDurationMs] = useState(Math.round(durationTokens.reveal * 1000));
  const [easeKey, setEaseKey] = useState<keyof typeof easeTokens>("cine");
  const [runKey, setRunKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderKey, setPreloaderKey] = useState(0);

  const presetOptions = { duration: durationMs / 1000, ease: easeTokens[easeKey] };

  return (
    <div className="flex flex-col gap-16">
      <div className="border-line flex flex-col gap-6 border-y py-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-meta uppercase tracking-[0.14em] text-muted">
              Duration: {durationMs} ms
            </span>
            <input
              type="range"
              min={100}
              max={2000}
              step={50}
              value={durationMs}
              onChange={(event) => setDurationMs(Number(event.target.value))}
              className="accent-accent"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-meta uppercase tracking-[0.14em] text-muted">Easing</span>
            <select
              value={easeKey}
              onChange={(event) => setEaseKey(event.target.value as keyof typeof easeTokens)}
              className="border-line bg-surface rounded-sm border px-3 py-2 font-mono text-meta"
            >
              {easeKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setRunKey((value) => value + 1)}
            className="border-line hover:border-fg inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em]"
          >
            Replay primitives
            <ArrowUpRightIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => setPreloaderKey((value) => value + 1)}
            className="border-line hover:border-fg inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em]"
          >
            Play preloader
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="border-line hover:border-fg inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-meta uppercase tracking-[0.14em]"
          >
            Open menu
          </button>
        </div>
      </div>

      <section className="flex flex-col gap-4" aria-labelledby="split-heading">
        <h2 id="split-heading" className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
          SplitText / lines
        </h2>
        <SplitText
          key={`lines-${runKey}`}
          as="p"
          text={site.headline}
          mode="lines"
          trigger="mount"
          duration={presetOptions.duration}
          className="font-display text-h1 max-w-[18ch] tracking-[-0.03em]"
        />
        <SplitText
          key={`words-${runKey}`}
          as="p"
          text="Words rise one after another, masked by their own box."
          mode="words"
          trigger="mount"
          delay={0.1}
          duration={presetOptions.duration}
          className="text-h3"
        />
        <SplitText
          key={`chars-${runKey}`}
          as="p"
          text="Characters"
          mode="chars"
          trigger="mount"
          duration={presetOptions.duration}
          className="font-mono text-h3 uppercase tracking-[0.2em]"
        />
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="reveal-heading">
        <h2 id="reveal-heading" className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
          Reveal / scroll
        </h2>
        <div className="flex flex-col gap-3">
          <Reveal key={`reveal-${runKey}`} {...presetOptions} className="border-line border p-6">
            Reveal block one
          </Reveal>
          <Reveal key={`reveal2-${runKey}`} {...presetOptions} delay={0.1} className="border-line border p-6">
            Reveal block two
          </Reveal>
        </div>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="magnetic-heading">
        <h2 id="magnetic-heading" className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
          Magnetic
        </h2>
        <Magnetic>
          <button
            type="button"
            className="bg-accent text-accent-ink rounded-full px-6 py-3 font-mono text-meta uppercase tracking-[0.14em]"
          >
            Hover me
          </button>
        </Magnetic>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="marquee-heading">
        <h2 id="marquee-heading" className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
          Marquee
        </h2>
        <Marquee>
          <span className="flex items-center gap-6 pr-6 font-mono text-h3 uppercase">
            Design engineer / Jakarta / 2026 /
          </span>
        </Marquee>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="count-heading">
        <h2 id="count-heading" className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
          CountUp
        </h2>
        <CountUp key={`count-${runKey}`} value={100} suffix="%" className="font-display text-display" />
      </section>

      {menuOpen ? <MenuOverlay onClose={() => setMenuOpen(false)} /> : null}
      {preloaderKey > 0 ? <Preloader key={preloaderKey} force /> : null}
    </div>
  );
}
