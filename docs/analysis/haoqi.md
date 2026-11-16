# Reference Analysis: haoqi.design

Analyzed: 2026-11-13. Viewport 1440x900 (primary), 768, 390. DPR 1. Chromium with SwiftShader WebGL.
Evidence: `raw/haoqi.json`, `screenshots/haoqi/`, `assets/haoqi/` (CSS + 5 JS chunks, partial),
`/tmp/opencode/refanalysis/haoqi-probe.json`, `haoqi2.json`, `haoqi-dump.txt`.

Site is Haoqi Wen's personal portfolio ("design engineer"): a dark-blue HUD-framed hero with a
glossy 3D word, a project grid on paper, two full-screen scroll "scenes", and a contact footer.
The page is one Lenis-scrolled container with a persistent technical HUD.

---

## 1. Tech detection

| Fact | Evidence |
|---|---|
| Next.js App Router + turbopack | `/_next/static/chunks/turbopack-*.js`, `data-precedence` stylesheet |
| Tailwind CSS v4 | `@layer theme`, `--spacing:.25rem`, `font-mono-2`, arbitrary values |
| React Three Fiber + three | `react-three`/`useFrame`/`WebGLRenderer`/`EffectComposer` in main chunk |
| Lenis 1.3.23 | `.lenis` scroll container class + `Lenis` hits; smooth scroll on an inner div |
| GSAP / ScrollTrigger | **absent** (no `ScrollTrigger`, no plugin strings). One `GSap` hit is a minified identifier |
| Spline | **not used** — the `Spline` hits are `THREE.SplineCurve`/`SplineCurve3` classes |
| Custom fonts | `tiktok` (display), `tronica-mono` (mono variant), `mono` — self-hosted, files not in the downloaded chunk subset |
| Document model | body/html `overflow:hidden`; inner `.lenis` scroller scrollHeight 12917, clientHeight 900 |

Scroll caveat for future passes: `window.scrollTo()` does nothing. Wheel must be sent over the
inner `div.w-full.h-full.overflow-y-auto.overscroll-contain.no-scrollbar.lenis`, then read
`el.scrollTop`. Max scroll = 12917 - 900 = **12017**.

---

## 2. Design tokens (verbatim from the stylesheet)

Two themes declared as CSS variables; default is light in `:root`, `.dark` flips it. The hero is
dark (site sets dark on load), the works paper section is light — the palette is applied per
section as well as per theme.

```css
:root{                                   /* light */
  --label:0,0,0;            --label-d:54,54,48;
  --label-1:rgba(var(--label),1);
  --label-2:rgba(var(--label-d),.6);
  --label-3:rgba(var(--label-d),.32);
  --label-4:rgba(var(--label-d),.18);
  --background-deep:251,250,244;          /* #fbfaf4 paper */
  --background-1:rgb(var(--background-deep));
  --background-elevated:#efede7;
  --line:rgba(var(--label-d),.1);
  --selection-bg:#c0fe04;                 /* accent lime */
  --cubic-66:cubic-bezier(.66,0,.01,1);
  color-scheme:light;
}
.dark{
  --label:255,255,255;      --label-d:230,232,232;
  --background-deep:15,17,17;             /* #0f1111 */
  --background-elevated:#191b1b;
  --line:rgba(var(--label-d),.08);
  color-scheme:dark;
}
```

**The exact accent is `#c0fe04`** (lime, selection + project tags). An early estimate of
`#c6ff00` was close; use `#c0fe04`.

Additional theme accents: the hero blue is not a token in the captured CSS — it is the 3D
lighting/background of the scene, sampled around deep indigo/blue. Do not token-pick it from the
screenshot; treat the scene as a separate art direction.

### Type scale (measured computed, 1440)

| Role | Font family | Size | Weight | Notes |
|---|---|---|---|---|
| Hero statement | `tiktok` | 81px | 700 | uppercase, tight (0.95-1.0) |
| Hero secondary | `tiktok` | 60px | 400 | "Design & Engineering" etc. |
| Section/statement | `tiktok` | 30px | 500 | 1.1 |
| Wordmark / nav | `tiktok` | 16px | 700 | "HAOQI.DESIGN" |
| HUD meta | `tronica-mono` | 12-16px | 400 | uppercase, tracking .02-.08em |
| Mono body / tags | `mono` | 16px | 400 | project titles, years |

Note `--font-mono-2:"tronica-mono"` and `--font-mono:"mono"` are two distinct mono faces: one
for UI micro-labels, one for project metadata. Both are custom; free substitutes must preserve the
contrast (a square tech mono + a lighter mono).

### Shape / layout

- Grid: 12-column, 56px page gutters (`px-14` at lg), 1px crosshair guides at the 1/3 and 2/3
  lines, plus a dotted paper texture behind the works section.
- Cards: full-bleed collage card (885x917), then 553x585 pair, then 332x364 tiles — a deliberate
  shrinking cascade, not a uniform grid.
- Project tag: lime `#c0fe04` chip, uppercase mono, sitting on the card's top-right corner.
- Card caption: title left, year right, both mono, baseline-aligned under the card.
- HUD bars: fixed, 56px side padding, 28px top/bottom inset, mono 12-14px, letterspaced.
- Scrollbar: custom 4-6px thumb on the right, present over the whole document.
- Cursor: `z-20 fixed inset-0 mix-blend-difference` overlay (a blend-mode layer, not a drawn SVG).

---

## 3. Structure (1440)

```
body (overflow hidden, h=900)
└ div.lenis (overflow-y auto, scrollHeight 12917)
  ├ canvas (fixed, -z-1, w-full h-dvh)            R3F scene: glossy 3D word, particles
  ├ HUD (z-50, fixed, pointer-events:none)
  │   top:    HAOQI.DESIGN   WORK  CONTACT  THEME[A]  SOUND[-]
  │   bottom: GMT+8 CN 14:47 20C        0720 X 0450 Y        (globe icon)
  │   + 1px crosshair guides + corner ticks
  ├ cursor layer (z-20, fixed, mix-blend-difference)
  ├ hero (h 900)
  │   "Design & Engineering" / "Thinking in systems. Designing with care." / bio paragraph
  │   3D "Hello" calligraphy center
  │   "I BRING CRAFT & TASTE TO DIGITAL WORK" 81px, 3 lines
  ├ intro/about (text block, ~y 900-1587)
  │   "I explore how to shape AI-era workflows with craft and taste..."
  ├ section#selected-work (top 1587, h 3229)      light paper + dotted texture
  │   Reunimos collage card 885x917
  │   Inspire Mono 553x585 | Wasm Design Utils 553x585
  │   VectorSymbols 332 | DarkSide 332
  │   aDrive 332 | Shore Icon 332 | Teambition 332
  │   FOF event cards
  ├ scene A (~y 4800, full viewport)  black, radial cyan/purple line burst, "INNOVATE WITH PURPOSE"
  ├ long dark stretch with statement + links (~y 5000-10500)
  ├ scene B (~y 10560, full viewport) light grid, giant blue starburst, "FUTURE-FIRST ALWAYS"
  └ footer#contact (top 12017, h 900)
      "LET'S CREATE SOMETHING EXTRAORDINARY"
      CURIOSITY.WEN@GMAIL.COM / TWITTER-X / FIGMA / GITHUB
```

Measured card rects (used as the grid model, 1440):

| Card | x, y | w x h | Link |
|---|---|---|---|
| Reunimos | 499, 1744 | 885 x 917 | `/reunimos` |
| Inspire Mono | 56, 2772 | 553 x 585 | `/inspire_mono` |
| Wasm Design Utils | 720, 2772 | 553 x 585 | `/wasm_design_utils` |
| VectorSymbols | 609, 3468 | 332 x 364 | Figma community |
| DarkSide | 1052, 3468 | 332 x 364 | Figma community |
| aDrive | 56, 3943 | 332 x 364 | `/adrive` |
| Shore Icon | 499, 3943 | 332 x 364 | `/shore_icon` |
| Teambition | 942, 3943 | 332 x 364 | `/teambition` |

The 56px left gutter and 720 = 56 + 553 + 111 gap show a 12-col grid with explicit offsets, not
`gap`-based flex. Projects alternate internal (`/slug`) and external (Figma community) links.

### Responsive

- 768: hero copy reduces to two columns, HUD collapses metadata (still mono, 12px), cards go
  1-2 per row; the inner scroller stays.
- 390: single column cards, HUD keeps clock/coords, theme + sound remain (no touch cursor),
  3D word stays but scales; final `768-top.png` was captured mid-loader so it does not represent
  the layout.

---

## 4. Animation inventory

### 4.1 CSS, measured (verbatim)

| Name | Target | Props | Duration | Easing |
|---|---|---|---|---|
| `caret-blink` | mono caret after SOUND/clock | opacity 1 -> 0 at 50% | `1s` step | steps |
| `ltBlink` | blinking glyph | opacity 1 -> 0 -> 1 | declared | — |
| `rtSpin` | rotating arrow/glyph | rotate 0 -> 360 | declared | linear (loop) |
| `hsstFadeIn` | scene overlay | opacity 0 -> .22 -> .55 -> 1 at 0/32/62/100% | declared | — |
| `hsstFadeOut` | scene overlay | opacity 1 -> .62 -> .28 -> 0 at 0/38/72/100% | declared | — |
| `svg-sign-draw` | SVG signature | `stroke-dashoffset` -> 0 | 0.66s | `--cubic-66` |
| `svg-sign-show` | SVG signature | opacity -> 1 | 0.66s | `--cubic-66` |

House transitions (measured groups):

| Target | Property | Duration | Easing | Delay |
|---|---|---|---|---|
| links, tags, HUD items | color / background / border | 0.3s | cubic-bezier(0,0,0.2,1) | 0 |
| card caption, rows | text-decoration-color | 0.15s | — | 0 |
| reveal wrappers | `all` | 1.2s | cubic-bezier(.66,0,.01,1) | 0 |
| reveal wrappers (variant) | `all` | 1.2s | same | 0.15s |
| SVG line/icon | stroke-opacity, stroke-width | 0.66s | `--cubic-66` | 0 |
| scene text in | opacity | 0.3s | ease | 0.6s |
| scene text out | opacity | 0.5s | cubic-bezier(0.4,0,0.2,1) | 0 |

Two curves total: a UI curve `cubic-bezier(0,0,0.2,1)` at 0.3s, and a long cinematic curve
`cubic-bezier(.66,0,.01,1)` at 1.2s / 0.66s. That is the whole motion system.

### 4.2 Scroll-linked

| Effect | Trigger | Target | Notes |
|---|---|---|---|
| Lenis smoothing | wheel | scroll position | content follows with damping; no pinning |
| Hero word scrub | y 0 -> ~900 | R3F word transform | rotates/parallaxes out of frame (useFrame) |
| Works reveal | section enter | cards | 1.2s reveal per card, scroll-triggered via IntersectionObserver-class logic (no ScrollTrigger) |
| Scene A transition | viewport enters ~4800 | full-screen overlay | black burst, hero text fades per `hsstFadeIn`/`Out` |
| Scene B | ~10560 | overlay | light grid + blue starburst, same fade pair |
| Card hover | pointer over card | media scale/opacity + caption | hover preview is a video/image; under SwiftShader it showed a grey placeholder with a spinner, so the exact effect is unverified |
| HUD clock | 1s tick | `GMT+8 HH:MM` | real Jakarta/Shanghai time |
| HUD coords | pointermove | `0720 X 0450 Y` | 4-digit padded cursor coordinates |

Important: the 1.2s reveal + 0.15s stagger is what makes this site feel slow-luxury. It is not a
spring; it is a long ease with no overshoot.

### 4.3 Text scramble

The hero copy uses a per-letter scramble/decrypt effect that resolves to the final string, with
lime glyphs on the still-scrambled characters. Implemented in JS (no GSAP), driven by timers and a
character pool. Timing not captured frame-by-frame — estimated 30-60ms per character, whole line
under 1s.

---

## 5. Interaction inventory

| Trigger | Response | Feedback |
|---|---|---|
| Scroll | Lenis smooth scroll of the inner container; scenes swap | 1.2s reveals, word scrub |
| THEME[A] -> THEME[L] | toggles `html.light`, swaps variable set, body becomes `#fbfaf4` | 0.3s color transitions |
| SOUND[-] -> SOUND[|] | toggles audio (off by default); the caret glyph is the state | caret blink |
| WORK / CONTACT | anchor scroll to `#selected-work` / `#contact` | smooth |
| Project card hover | media preview + caption emphasis | unverified under SwiftShader |
| Project card click | internal case study route or external plugin page | — |
| Cursor move | HUD coordinates update; difference-blend layer follows | live |
| Logo | scroll to top / home | — |

Contact is email-only (`mailto:`), plus TWITTER/X, FIGMA, GITHUB in the footer. No form.

---

## 6. UX flow / narrative

1. **Hero as poster** — the 3D "Hello" is the only image; type and HUD carry everything else.
   The visitor immediately knows this person builds interfaces (theme/sound/clock/coords are all
   interactive proof).
2. **Positioning line** — "I bring craft & taste to digital work" states the offer before any list.
3. **Bio** — two short columns, no photo, no CV dump.
4. **Work index as gallery** — cards shrink from hero-size to index-size; each has a year and a
   type tag. Scanning is visual first, metadata second.
5. **Scene break** — a full-bleed kinetic statement resets attention ("Innovate with purpose").
6. **Second scene** — same device, opposite palette, keeps the long page from flattening.
7. **Contact** — one loud line, one email, three socials. No form, no calendar.

The site has no separate about page and no case-study depth on the home page; depth is behind
`/reunimos`, `/inspire_mono`, etc. Home page = index + manifesto.

---

## 7. What to steal (ranked, with effort)

| # | Pattern | Why it works | Effort |
|---|---|---|---|
| 1 | **Persistent HUD: real local clock (GMT+7), cursor X/Y readout, theme + sound toggles** | Directly matches the AGENTS brief; proves "design engineer" with working detail, not copy | S |
| 2 | **Index gallery with shrinking card cascade (885 / 553 / 332) + year + category chip** | Shows 8 projects in one scroll without a uniform grid; hierarchy by size | M |
| 3 | **Exact lime accent `#c0fe04` on a neutral paper/ink base** | Acid accent reads as tool-maker; used only for tags/selection | XS |
| 4 | **Two-curve motion system: 0.3s UI, 1.2s/0.66s cinematic with `cubic-bezier(.66,0,.01,1)`** | One variable, consistent everything; the signature "slow luxury" feel | XS |
| 5 | **Full-bleed scroll scenes between content blocks** | Gives a long page two "acts" without adding sections | S (CSS/SVG substitute for the WebGL burst) |
| 6 | **Text scramble resolve on the statement headline** | Personality in <50 lines; no dependency needed | S |
| 7 | **Dotted paper texture + 1px crosshair guides in the work grid** | Makes a plain card grid feel plotted/technical | XS |
| 8 | **Theme toggle implemented as a token set swap (`html.light`), not per-component colors** | Cheap, and matches the AGENTS token rule | S |

Do **not** steal: the custom `tiktok` / `tronica-mono` / `mono` fonts (self-hosted, not
redistributable — substitute free faces), the R3F glossy word (a CSS/SVG 3D-ish word or a
pre-rendered WebP gives most of the look for a fraction of the cost), or the project thumbnails.

Open question for `00-summary.md`: this site proves that "HUD + index list + long-luxury easing"
is the strongest fit for Raditya's "web developer who also designs" positioning, but it has *no
storytelling preloader* and *no fullscreen menu* — those come from chrisp and newformcap.