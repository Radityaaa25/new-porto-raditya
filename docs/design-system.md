# Design System

Status: PHASE 2. Tokens and motion primitives implemented; no page code yet.
Sources: `docs/analysis/*`, `docs/creative-direction.md`, `AGENTS.md`.

---

## 1. Principles

1. One source of truth. Values live in `styles/tokens.css`; Tailwind and TypeScript reference
   those variables. No hex codes, pixel values, durations, or curves inside components.
2. Two motion curves, three durations that matter. UI uses `ease-ui` at 300ms; reveals use
   `ease-cine` at 1200ms; entrances may use `ease-expo`. Anything else needs a documented reason.
3. Three voices. Display (Space Grotesk), body (Instrument Sans), data (JetBrains Mono). Each has
   one job; do not mix them inside a single line.
4. One accent. Lime `#c0fe04` is a signal, not a surface. On paper it is fill-only; text uses
   `--accent-strong`.
5. Motion is optional. Every animated element renders readable with animation disabled. Reduced
   motion collapses presets to a 300ms opacity fade.
6. Transform, opacity, clip-path only. No animated width, height, top, left, or box-shadow.

---

## 2. Color

Semantic tokens only. Dark is the default; `html.light` swaps the same names.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#0d0e10` | `#f7f6f0` | page background |
| `--bg-elevated` | `#16181b` | `#ffffff` | cards, HUD pill, menu surface |
| `--bg-elevated-2` | `#1e2125` | `#efeee8` | hover row, inset panel |
| `--fg` | `#f2f2ee` | `#16181b` | primary text |
| `--fg-muted` | `#8a8f98` | `#5a6068` | secondary text, meta |
| `--fg-subtle` | `#5f656e` | `#8b9097` | decorative only, never body |
| `--line` | `rgba(242,242,238,.10)` | `rgba(22,24,27,.12)` | hairlines, dividers |
| `--line-strong` | `rgba(242,242,238,.18)` | `rgba(22,24,27,.22)` | focus rings, active borders |
| `--accent` | `#c0fe04` | `#c0fe04` | fills, dots, marks, hover ink |
| `--accent-strong` | `#c0fe04` | `#557300` | accent text on light backgrounds |
| `--accent-ink` | `#0d0e10` | `#16181b` | text on accent fill |
| `--accent-soft` | `rgba(192,254,4,.12)` | `rgba(85,115,0,.12)` | tinted bands, chart area |
| `--focus` | `#c0fe04` | `#557300` | focus-visible outline |
| `--paper` | `#f7f6f0` | `#f7f6f0` | inverted band, always paper |
| `--paper-fg` | `#16181b` | `#16181b` | text on paper band |
| `--paper-muted` | `#5a6068` | `#5a6068` | meta on paper band |
| `--paper-line` | `rgba(22,24,27,.12)` | `rgba(22,24,27,.12)` | rules on paper band |
| `--danger` | `#ff6b5e` | `#ff6b5e` | form errors only |
| `--success` | `#7ee787` | `#7ee787` | form success only |

Measured contrast (WCAG 2.1, sRGB):

| Pair | Ratio | Verdict |
|---|---|---|
| `#c0fe04` on `#0d0e10` | 16.02:1 | AAA |
| `#f2f2ee` on `#0d0e10` | 17.21:1 | AAA |
| `#8a8f98` on `#0d0e10` | 5.94:1 | AA |
| `#16181b` on `#f7f6f0` | 16.43:1 | AAA |
| `#5a6068` on `#f7f6f0` | 5.86:1 | AA |
| `#557300` on `#f7f6f0` | 5.05:1 | AA |
| `#c0fe04` on `#f7f6f0` | 1.11:1 | never text; fill only |
| `#c0fe04` on `#16181b` | 14.76:1 | AAA |

Rules:

- Accent as text is allowed on dark only. On paper, accent is a fill or a 2px mark.
- Paper bands stay paper in both themes; they are a rhythm device, not a theme.
- `--fg-subtle` is for rules, ticks, and disabled glyphs. Never for sentences.
- Opacity is not a colour token. Use `--fg-muted` instead of `text-fg/60`.

---

## 3. Typography

| Role | Family | Weights | Why |
|---|---|---|---|
| Display | Space Grotesk | 500, 600, 700 | Technical grotesque with a warm quirk; holds at 96px and at 32px |
| Body | Instrument Sans | 400, 500 | Neutral, screen-first, generous x-height, variable |
| Data | JetBrains Mono | 400, 500 | Telemetry, labels, code, coordinates; matches the instrument concept |

All three are OFL, self-hosted through `next/font/google`, latin subset, `display: swap`.
Next/font exposes `--font-space-grotesk`, `--font-instrument-sans`, `--font-jetbrains-mono`;
`--ff-display`, `--ff-body`, `--ff-mono` point at them; Tailwind exposes the same trio as
`font-display`, `font-body`, `font-mono`.

| Token | Size (clamp) | Line-height | Tracking | Family | Use |
|---|---|---|---|---|---|
| `display` | 48-96px | 0.92 | -0.03em | display | hero only, max 2 lines |
| `h1` | 32-64px | 1.00 | -0.02em | display | page titles, section leads |
| `h2` | 22-32px | 1.12 | -0.01em | display | section headings |
| `h3` | 18-24px | 1.25 | -0.005em | display | card titles |
| `body` | 15-17px | 1.55 | 0 | body | paragraphs |
| `body-sm` | 14px | 1.45 | 0 | body | captions, form help |
| `label` | 12px | 1.20 | 0.08em | mono | HUD labels, nav, eyebrows (uppercase) |
| `meta` | 11px | 1.20 | 0.06em | mono | timestamps, counts, coordinates |
| `code` | 13px | 1.45 | 0 | mono | inline stack names, tags |

Rules:

- Headings are sentence case. Labels are uppercase mono with `letter-spacing: 0.08em`.
- Display text never exceeds 14 words; hero line breaks are authored, not wrapped by chance.
- Body measure is `--measure` (34rem) for prose, `--measure-wide` (44rem) for intros.
- Numbers in HUD, counters, and tables use `font-variant-numeric: tabular-nums`.
- Minimum body size 15px; never set text below 11px.
- Emphasis uses weight 500 plus colour, not italics.

---

## 4. Space and layout

Base unit 4px. Named tokens: `--space-1` (4) through `--space-32` (128), in the
1,2,3,4,5,6,8,10,12,16,20,24,32 rhythm.

| Token | Value | Use |
|---|---|---|
| `--gutter` | `clamp(20px, 4vw, 56px)` | horizontal page padding |
| `--section-y` | `clamp(80px, 12vh, 160px)` | vertical section rhythm |
| `--stack-tight` | 8px | label to value |
| `--stack-base` | 16px | paragraph to paragraph |
| `--stack-loose` | 32px | heading to body |
| `--container-max` | 1440px | page shell |
| `--measure` | 544px | prose |
| `--measure-wide` | 704px | intros |
| `--hud-h` | 56px | HUD bar height |

Grid: 12 columns above 1024px, 8 columns at 768-1023, 4 columns below 768. Project index uses
the reference proportions adapted to our content: featured row full width, then a 2-up, then a
3-up, never more than six visible at once.

---

## 5. Radius, border, shadow, blur

| Token | Value | Use |
|---|---|---|
| `--r-xs` | 4px | tags, focus ring |
| `--r-sm` | 6px | inputs, small buttons |
| `--r-md` | 10px | cards |
| `--r-lg` | 14px | panels, menu rows |
| `--r-xl` | 20px | media frames |
| `--r-pill` | 999px | HUD chips, toggles |
| `--bw` | 1px | all hairlines |
| `--elev-sm` (`shadow-sm`) | 0 1px 2px rgba(0,0,0,.24) | sticky HUD |
| `--elev-md` (`shadow-md`) | 0 8px 24px rgba(0,0,0,.32) | menus, popovers |
| `--elev-lg` (`shadow-lg`) | 0 24px 64px rgba(0,0,0,.44) | modal media |
| `--backdrop-sm` (`blur-sm`) | 8px | HUD backdrop |
| `--backdrop-md` (`blur-md`) | 16px | menu overlay backdrop |

Light theme overrides shadows to warm-tinted equivalents. Cards use borders, not shadows, by
default; shadow is reserved for things that float above content.

---

## 6. Z-index

| Token | Value | Layer |
|---|---|---|
| `--z-below` | -1 | background canvas, grain |
| `--z-base` | 0 | flow content |
| `--z-content` | 10 | sticky section headers |
| `--z-sticky` | 20 | project preview follow layer |
| `--z-hud` | 40 | header, HUD |
| `--z-cursor` | 45 | custom cursor |
| `--z-overlay` | 60 | scrim, drawer |
| `--z-menu` | 70 | fullscreen menu |
| `--z-preloader` | 90 | preloader |
| `--z-debug` | 100 | dev overlay, never shipped |

---

## 7. Breakpoints

| Token | Value | Behaviour |
|---|---|---|
| `xs` | 390px | smallest supported viewport |
| `sm` | 640px | single column, larger type |
| `md` | 768px | 8-column grid, 2-up index |
| `lg` | 1024px | 12-column grid, pinned strip allowed, cursor enabled |
| `xl` | 1280px | full HUD telemetry, 3-up index |
| `2xl` | 1536px | container capped at 1440px, margins grow |

Rules: mobile-first; no hover-only affordance below `lg`; pinned/horizontal sections degrade to
vertical stacks below `lg`; the custom cursor only exists under
`(hover: hover) and (pointer: fine)`.

---

## 8. Motion

### Durations

| Token | CSS | TS | Use |
|---|---|---|---|
| `instant` | 80ms | 0.08 | state blink, tick |
| `fast` | 160ms | 0.16 | hover, press, toggle |
| `ui` | 300ms | 0.3 | colour, borders, small moves |
| `reveal` | 600ms | 0.6 | section entrances, cards |
| `cinematic` | 1200ms | 1.2 | hero lines, curtains, scene |
| `draw` | 660ms | 0.66 | SVG strokes |
| `marquee` | 40s | 40 | ticker loop |

### Easings

| Token | Curve | Origin | Use |
|---|---|---|---|
| `ease-ui` | `cubic-bezier(0, 0, 0.2, 1)` | haoqi / Material standard | UI state changes |
| `ease-cine` | `cubic-bezier(0.66, 0, 0.01, 1)` | haoqi `--cubic-66` | reveals, masks, curtains |
| `ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | derived | entrances that must feel quick then settled |
| `ease-inout` | `cubic-bezier(0.4, 0, 0.2, 1)` | newformcap / Material | SVG draws, small toggles |
| `linear` | `linear` | — | marquee, scroll-linked progress |

No bounce, elastic, or spring curves in v1. Adding a curve requires a doc update and a reason.

### Stagger

`tight` 60ms (menu links, HUD items), `base` 90ms (index rows, cards), `loose` 150ms (hero
lines, contact lines). Stagger never exceeds 6 items; beyond that, group and stagger groups.

### Scroll defaults

`start: "top 80%"`, `end: "bottom 20%"`, `scrub: 0.6`, `anticipatePin: 1`, `once: true` for
reveals, `once: false` only for scrubbed scenes.

### Budgets

| Element | Rule |
|---|---|
| Preloader | visible 1.4s minimum, 2.5s maximum, exits in 0.9s even if assets are late |
| HUD clock | 1000ms tick, no animation, no layout shift |
| Cursor follow | lerp 0.18, throttle 40ms, disabled on coarse pointers |
| Marquee | 40s per loop, pause on hover and focus, static under reduced motion |
| Scroll reveals | one per element, `once: true`; never re-animate on scroll up |

### Reduced motion

CSS collapses transitions globally; JS calls `resolveMotion(preset, prefersReduced)` which returns
a 300ms opacity fade with no transform. Marquee, pinned strip, cursor, and grain drift are
disabled, not shortened.

---

## 9. Animation catalog

Priority: M = must-have for v1, N = nice-to-have.

| Name | Trigger | Params | Source | P |
|---|---|---|---|---|
| PreloaderCounter | mount | `counterStep` 0->100 over 1800ms, `ease-expo`, clamp 1400-2500ms | newformcap | M |
| PreloaderStatus | interval | status swap every 900ms, 160ms fade, 4 messages max | chrisp | M |
| CurtainExit | counter complete | `scaleY` 1->0, origin bottom, 1200ms `ease-cine` | chrisp / newformcap | M |
| HudClock | 1000ms tick | `Asia/Jakarta`, `HH:MM:SS`, tabular-nums | haoqi | M |
| HudCoords | pointermove | throttle 40ms, lerp 0.18, 3-digit padded, desktop only | haoqi | N |
| ThemeSwap | toggle | token swap, 300ms `ease-ui` on bg/colour only | haoqi | M |
| HeroLineReveal | after exit | `maskReveal` per line, 1200ms `ease-cine`, 150ms stagger | newformcap / haoqi | M |
| HeroAccentWord | after line 2 | underline draw 660ms, `ease-inout`, colour to `--accent` | haoqi | M |
| IndexCascade | in view | `cardIn` per row, 90ms stagger, y 24, 600ms `ease-expo` | haoqi | M |
| WorkHoverPreview | hover / focus | image `scale` 1.03->1 1200ms `ease-cine`; meta shift 4px, 160ms | haoqi | M |
| MenuOverlay | menu button | `clip-path inset(0 0 100% 0)->0`, 600ms `ease-cine` | newformcap | M |
| MenuLinks | overlay open | 60ms stagger, `yPercent` 60->0, 600ms `ease-expo` | newformcap | M |
| SectionReveal | top 80% | `fadeUp` y 24, 600ms `ease-expo`, once | newformcap | M |
| TimelineDraw | scroll | rule `scaleY` 0->1, scrub 0.6; dots pop 160ms | senbuzy | M |
| StickyNumberedRail | capabilities scroll | active index swap, dot `translateY` 300ms `ease-ui` | newformcap | N |
| Marquee | in view | `xPercent` 0->-100, 40s linear, pause on hover/focus | newformcap | M |
| PinnedStrip | desktop scroll | pin + x travel, scrub 0.6, `anticipatePin` 1; mobile stack | senbuzy | N |
| SceneBurst | in view | `scale` 1.06->1 + opacity, 1200ms `ease-cine` | haoqi | N |
| ContactLineReveal | in view | `lineReveal` 1200ms, 150ms stagger | haoqi | M |
| ArrowHover | hover | arrow 4px x/y, 160ms `ease-ui`; link rule grows | newformcap | M |
| PressState | pointerdown | `scale` 0.98, 160ms; release 300ms | iOS-native | M |
| PageTransition | route change | curtain in/out 1200ms, scroll reset before in | chrisp | N |
| CursorBlend | fine pointer | 8px dot, `mix-blend-difference`, lerp 0.18, label on cards | haoqi | N |
| GrainDrift | always | CSS `steps()` background-position, 8s, opacity 0.04 | chrisp texture | N |
| StatCounter | in view | true counts only (projects, years); never invented metrics | newformcap | N |

---

## 10. Implementation

Created in this phase:

| File | Contents |
|---|---|
| `styles/tokens.css` | all CSS custom properties, dark default, `html.light` override |
| `styles/tailwind.css` | Tailwind v4 import, `@theme inline` mapping, base layer, duration/z utilities |
| `lib/motion/tokens.ts` | durations, easings, stagger, distance, scroll, preloader, HUD, cursor, queries, z |
| `lib/motion/presets.ts` | pure preset factories plus `resolveMotion`, `withDelay`, `counterStep` |

Consumption rules:

- CSS: `var(--space-6)`, `var(--curve-cine)`, `var(--dur-ui)`. Never a literal.
- Tailwind: `font-display text-h1 text-fg`, `bg-surface border-line`, `ease-cine`, `duration-ui`,
  `z-hud`, `gutter-x`, `section-y`.
- GSAP: `const p = fadeUp(); gsap.fromTo(el, p.from, { ...p.to, duration: p.duration, ease: p.ease })`.
- ScrollTrigger: spread `scrollDefaults`, override only per scene.
- Reduced motion: `resolveMotion(p, prefersReduced)` from `lib/motion/presets.ts`.
- Tailwind v3 fallback: if the project pins v3, port `@theme inline` to `theme.extend` referencing
  the same `var()` names; values still live only in `tokens.css`.

Fonts (`app/layout.tsx`, phase 3):

```
Space_Grotesk   -> variable: "--font-space-grotesk", weight ["500","600","700"]
Instrument_Sans -> variable: "--font-instrument-sans", weight ["400","500"]
JetBrains_Mono  -> variable: "--font-jetbrains-mono", weight ["400","500"]
```

Forbidden in components: hex colours, rgb literals, font sizes in px, `transition: all`,
`ease-in-out` keyword, `cubic-bezier(...)` literals, z-index numbers, `!important` outside the
reduced-motion block.

---

## 11. Accessibility

- Contrast: all body and UI text meets AA on both themes (table in section 2). Accent text on
  paper is banned; use `--accent-strong`.
- Focus: 2px `--focus` outline, 3px offset, visible on dark and light; never `outline: none`
  without a replacement.
- Targets: 44x44px minimum for toggles, menu items, and index rows.
- Motion: reduced motion respected in CSS and JS; no autoplay motion that cannot be stopped.
- Cursor: custom cursor never replaces the native one on touch; the native cursor stays visible
  under the overlay on desktop.
- Semantics: one `h1` per route, sections labelled, toggles use `aria-pressed`, menu uses
  `aria-expanded` plus focus trap, marquee content is duplicated with `aria-hidden`.
- Forms: visible labels, `aria-describedby` for errors, no placeholder-as-label.
- Content: with JS disabled, preloader is CSS-hidden and all copy renders (no `opacity: 0`
  inline styles).

---

## 12. Performance budget

| Item | Budget |
|---|---|
| LCP (mid-tier Android, 4G) | under 2.5s |
| Initial JS (gzip) | under 200KB before project screenshots |
| Fonts | 3 variable woff2, latin subset, display preloaded only |
| Home images | under 600KB total, lazy below fold, AVIF/WebP with sizes |
| Animation | transform/opacity/clip-path only; no scroll listener without rAF throttle |
| Grain/noise | CSS/SVG only, no bitmap texture |
| Third-party | none on first paint; no analytics unless approved |
