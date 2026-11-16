# Asset Plan

Status: PHASE 2. Plan plus logging stub. Assets produced in phases 3-5.
Policy: `AGENTS.md` ASSET POLICY. Original work first; generated before downloaded; every file
logged in `docs/ASSETS.md` with source, licence, and author.

---

## 1. Inventory

| Class | Count | Formats | Target size | Method |
|---|---|---|---|---|
| Icon set | 20 | inline SVG | under 2KB each raw, under 8KB gzip total | hand-drawn on a 24px grid |
| Character (MONI) | 1 rig, 8 poses | single inline SVG with named groups | under 12KB gzip | original vector, code-drawn |
| Textures | 6 | CSS + SVG filters | 0 bitmap bytes | procedural |
| Project covers | 6 (one per site) | AVIF + WebP + JPG fallback | 60-110KB each at 1600w | Playwright capture of live sites |
| Project detail frames | 12 (6 x 2) | AVIF + WebP | 45-80KB each at 1440w | Playwright capture |
| OG images | 10 | PNG 1200x630 | under 180KB each | `next/og` at build |
| Favicon set | 5 | SVG, PNG 180/192/512, ICO | under 40KB total | vector source, exported |
| UI sounds | 7 | WebAudio synthesis | 0 bytes | runtime oscillator + envelope |
| Fonts | 3 | woff2, latin subset | 40-50KB each | `next/font/google` self-hosted |
| Grain overlay | 1 | SVG feTurbulence | under 1KB | procedural |

Total bitmap payload on the home route: under 600KB, with only two thumbnails eager.

---

## 2. Icon set

Spec: 24x24 viewBox, 1.5px stroke, round caps and joins, `currentColor`, no fills except the
status dot and accent marks. Drawn by me from scratch; the geometry pattern (2px padding, 20px
live area) follows the Lucide convention, which is ISC licensed, but no Lucide paths are copied.

| Name | Use |
|---|---|
| `arrow-up-right` | external project links, CTA |
| `arrow-down` | scroll cue |
| `arrow-left` / `arrow-right` | carousel, pager |
| `chevron-down` | accordion, menu groups |
| `menu` / `close` | overlay |
| `grid` / `list` | index view switch (if shipped) |
| `play` / `pause` | sound, marquee control |
| `volume-on` / `volume-off` | sound toggle |
| `sun` / `moon` | theme toggle |
| `mail` | contact |
| `external` | live site |
| `copy` | copy email |
| `clock` | local time |
| `crosshair` | coordinate HUD |
| `dot` | status marker |
| `plus` | expand row |

Deliverable: `components/icons/*.tsx`, each a typed component with `size` and `aria-hidden`
defaults. One `index.ts` barrel with a name map for the asset log.

---

## 3. Character: MONI

Original vector character: a small monitor-headed figure with two antenna ticks and simple
gloved hands, referencing a CRT edit monitor rather than any existing mascot. Drawn as one SVG
with named groups so GSAP can animate parts without a skeleton library. Rendered only in the
about strip, the 404 page, and the contact success state.

| Pose | Where | Notes |
|---|---|---|
| idle | about, default | float 6s, blink loop |
| look | about on pointer move | head rotate +/-8deg, eyes +/-3px |
| wave | about first in view, once | 1.2s, forearm rotate |
| type | project row hover (desktop) | 0.4s alternation, hands only |
| sleep | footer, after 30s idle | closed lids, two drift ticks |
| celebrate | contact form success | 0.9s arm raise + accent ring |
| confused | 404 | head tilt 6deg, question tick |
| static | reduced motion | neutral pose, no loop |

Rig groups: `#moni`, `#moni-head`, `#moni-screen`, `#moni-eye-l`, `#moni-eye-r`, `#moni-lid-l`,
`#moni-lid-r`, `#moni-antenna`, `#moni-arm-l`, `#moni-arm-r`, `#moni-foot-l`, `#moni-foot-r`,
`#moni-zzz`, `#moni-tick`.

Animation params: blink 4.2s interval with 120ms lid close; float 6s `ease-inout` +/-6px; look
lerp 0.12 at 40ms throttle; wave 1.2s `ease-ui`; type 0.4s steps; sleep trigger 30s; celebrate
0.9s. All disabled under reduced motion except pose changes.

Files: `public/media/mascot/moni.svg` (rig), `components/mascot/Moni.tsx` (inline import),
`lib/motion/moni.ts` (timeline builders).

---

## 4. Textures

All procedural, no downloads, no bitmap grain.

| Name | Tech | Params | Use |
|---|---|---|---|
| grain | SVG `feTurbulence` fractalNoise | baseFrequency 0.8, 4 octaves, opacity 0.04, fixed overlay | whole site |
| dot-grid | CSS `radial-gradient` 1px dot | 24px pitch, `--line` colour | scene break, about band |
| contour | generated SVG paths | 1.5px stroke, 8px step, `--line` | capabilities band |
| halftone | CSS `mask-image` radial dots | 6px pitch, 40% coverage | contact burst |
| scanline | `repeating-linear-gradient` | 1px / 3px, alpha 0.03 | project media hover (subtle) |
| paper-fibre | `feTurbulence` + `feDisplacementMap` | scale 2, opacity 0.05 | paper bands only |

Rules: textures sit at `--z-below`, never intercept pointer events, never animate more than
`background-position` under reduced motion.

---

## 5. Project thumbnails and frames

Source: live URLs from `AGENTS.md`.

- clarise.my.id
- safetrack-depin.vercel.app
- vascode.vercel.app
- pentas-seni-tk-v2.vercel.app
- nana-bites.vercel.app
- joy-reminder.vercel.app

Capture spec (Playwright, Chromium 1208 already installed):

| Setting | Value |
|---|---|
| Cover viewport | 1600x1000, DPR 1 |
| Detail viewport | 1440x900, DPR 1 |
| Motion | `prefers-reduced-motion: reduce` plus 2500ms settle |
| Fonts | `document.fonts.ready` awaited |
| Chrome UI | hidden scrollbars, no caret, no selection |
| Cookie banners | dismissed if present, otherwise crop |
| Output | AVIF q55, WebP q82, JPG q86 fallback |
| Variants | 1600w, 1200w, 800w |
| Naming | `cover`, `detail-01`, `detail-02` per slug |

Framing rules: cover shows the first viewport with the site's own header intact; detail-01 is one
scroll below, detail-02 is a representative inner view (dashboard, form, or ticket). No browser
chrome, no device frames, no annotations burned into the image.

Capture script lives at `scripts/capture-projects.mjs` (phase 3), writes to
`public/media/projects/<slug>/`, and prints a manifest that is copied into `docs/ASSETS.md`.

Risk: sites may block headless requests or change. Mitigation: manual fallback screenshots,
quarterly re-capture, and a `capturedAt` field in `content/projects.ts`.

---

## 6. OG images and social

| File | Size | Content |
|---|---|---|
| `opengraph-image` (home) | 1200x630 | name, positioning line, lime tick, local time |
| `work/opengraph-image` | 1200x630 | "Selected work", six titles |
| `about/opengraph-image` | 1200x630 | portrait mark + bio line |
| `contact/opengraph-image` | 1200x630 | email + availability |
| `work/[slug]/opengraph-image` | 1200x630 x6 | project title, year, category, cover crop |

Generated with `next/og` `ImageResponse`, using the same fonts (subset embedded) and tokens.
Alt text is written in `content/og.ts`. Twitter card uses `summary_large_image` and reuses the
same image.

---

## 7. Favicon and app icons

Source: SVG monogram "R" with a lime square tick at the baseline, 24px grid, 1.5px strokes.

| File | Size | Notes |
|---|---|---|
| `app/icon.svg` | 32 | sharp at small sizes |
| `app/apple-icon.png` | 180 | solid dark background, no transparency |
| `app/icon-192.png` | 192 | manifest |
| `app/icon-512.png` | 512 | manifest, maskable with 20% safe zone |
| `app/favicon.ico` | 16/32/48 | legacy |

---

## 8. UI sounds

Synthesised at runtime with WebAudio, no audio files, muted by default, master gain 0.15, all
sounds under 220ms. Triggered only by direct user action; never on load or scroll.

| Name | Osc | Freq | Envelope | Duration | Use |
|---|---|---|---|---|---|
| `click` | triangle | 660 | 2ms attack, exp decay | 60ms | primary buttons, toggles |
| `tick` | sine | 1180 | 1ms attack, exp decay | 24ms | hover on index rows |
| `open` | sine sweep | 240 -> 520 | linear glide, exp decay | 180ms | menu open |
| `close` | sine sweep | 520 -> 240 | linear glide, exp decay | 160ms | menu close |
| `on` | square | 880 + 1320 | 3ms attack, short decay | 70ms | sound enable |
| `off` | square | 660 + 440 | 3ms attack, short decay | 70ms | sound disable |
| `success` | triangle triad | 523, 659, 784 | 60ms stagger | 240ms | form success |

Implementation: `lib/audio/synth.ts` with an `AudioContext` created on first gesture, a
`MuteContext` provider, and a persisted preference. Respect `prefers-reduced-motion` for the
visual pulse, not the sound.

---

## 9. Fonts

| Family | Role | Source | Licence |
|---|---|---|---|
| Space Grotesk | display | Google Fonts | SIL OFL 1.1 |
| Instrument Sans | body | Google Fonts | SIL OFL 1.1 |
| JetBrains Mono | data | Google Fonts | SIL OFL 1.1 |

Self-hosted via `next/font/google` (latin subset, `display: swap`). No CDN request at runtime.
Fallback stacks are declared in `--font-display`, `--font-body`, `--font-mono` to limit layout
shift.

---

## 10. Folders and naming

```
public/
├── media/
│   ├── projects/<slug>/cover.avif|webp|jpg
│   ├── projects/<slug>/detail-01.avif|webp
│   ├── projects/<slug>/detail-02.avif|webp
│   └── mascot/moni.svg
components/
├── icons/<Name>.tsx
└── mascot/Moni.tsx
lib/
├── audio/synth.ts
└── motion/{tokens,presets,moni}.ts
scripts/
└── capture-projects.mjs
docs/
└── ASSETS.md
```

Naming: lowercase kebab for files, PascalCase for components, slug = live domain first label
(`clarise`, `safetrack-depin`, `vascode`, `pentas-seni`, `nana-bites`, `joy-reminder`).

---

## 11. Payload budget

| Route | Images | Fonts | JS (initial) | Total transfer target |
|---|---|---|---|---|
| Home | 2 eager covers, 4 lazy | 1-2 woff2 | under 200KB gzip | under 800KB |
| Work | 6 covers, lazy | cached | under 180KB | under 900KB |
| Project detail | 3 frames | cached | under 180KB | under 700KB |
| About | mascot SVG + portrait | cached | under 150KB | under 400KB |

No icon fonts, no sprite sheets, no video, no raster textures.

---

## 12. Logging rule

Every produced or downloaded file gets a row in `docs/ASSETS.md` before merge:

`| File | Class | Source | Author | Licence | Notes |`

Screenshots are logged as "own capture of own project, captured on <date>, <viewport>". Anything
without a licence entry blocks release.

---

## 13. TODOs and risks

- Need Raditya's approval on the character name and the three usage spots.
- Need GitHub, LinkedIn, and Instagram URLs if they should be linked (not in the brief).
- Need a CV PDF only if the site should offer a download.
- Screenshot drift: re-capture quarterly; keep `capturedAt` in content.
- Headless capture may be blocked by a project's bot protection; fallback is manual capture with
  the same framing.
- Sound is optional and off by default; if any sound feels like noise, it gets removed rather
  than tuned down.
