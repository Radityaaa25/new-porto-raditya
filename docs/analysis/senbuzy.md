# Reference Analysis: about.senbuzy.com

Analyzed: 2026-11-13. Viewport 1440x900, 768x1024, 390x844, DPR 1, Chromium (SwiftShader WebGL).
Evidence: `raw/senbuzy.json`, `assets/senbuzy/index.css`, `assets/senbuzy/index.js`,
`screenshots/senbuzy/`. Values marked `measured` come from runtime inspection; `estimated`
values come from fitting sampled data; any guess is labeled.

Site is the personal "About" page of Sen Zheng (creative technologist, Shenzhen), in Chinese
and English. It is a scroll-driven 3D storytelling page: one WebGL scene behind the whole
document, a resume timeline, and a horizontal works gallery.

---

## 1. Tech detection

| Fact | Evidence |
|---|---|
| Vite build | `assets/index-Xi6D-mUj.js` (1.9 MB), `assets/index-CYaUks6u.css` (21 KB) |
| Three.js + GLTFLoader | 206 `THREE` hits, 63 `fragmentShader`, custom GLSL in bundle |
| Motion (framer-motion lineage) | motion symbols in bundle (spring/animate internals) |
| GSAP / ScrollTrigger / Lenis | **absent** (no strings in bundle). Smooth scroll is custom |
| React | `#root`, React 18-ish runtime inside Vite bundle |
| Fonts | Mansalva, Cormorant Upright, Chiron GoRound TC, Helvetica Neue fallback |
| i18n | custom `lang` toggling on sections + `about[lang=zh]` CSS branches |
| DOM size | 8712 px document at 1440x900 (9.7 viewports) |

No CSS framework. Handwritten BEM-ish class names (`wk-card`, `tl-entry`, `hm-tl`).

**Rolling wheel**: the page intercepts wheel input (custom smooth scroll). `scrollTo()` moves
only ~2px, so all captures used successive `mouse.wheel` deltas with the pointer at (720,450).

---

## 2. Design tokens (verbatim from `:root` and computed styles)

```css
:root{
  --ink:#f4f1ea;                      /* bone white */
  --muted:rgba(244,241,234,.6);
  --panel:rgba(12,16,24,.72);
  --line:rgba(244,241,234,.14);
  font-family: Helvetica Neue, Chiron GoRound TC, PingFang SC,
               Microsoft YaHei, system-ui, sans-serif;
}
body bg: #0a0e16        /* near-black navy */
hero gradient: #09211680 -> #09211600   (deep green, bottom 35vh)
accent (single): #ffd9b3   /* warm sand: scroll dot, timeline dots, numbers, links */
```

Accent is used only for: scroll-cue dot, timeline dots, percentages/numbers (`wk-line-num`),
detail-link border, loading arc. Everything else is bone/ink on navy. This is a textbook
"dark base + ONE accent" system.

### Type scale (measured `computed` at 1440)

| Role | Font | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero name / about title | Mansalva (cursive) | `clamp(30px,7.2vw,80px)` -> 80px | 400 | 1 | .01em |
| Hero intro h1 | Helvetica Neue | `clamp(34px,7vw,92px)` | 800 | .95 | .01em |
| Section display (works title, resume title) | Cormorant Upright | `clamp(22-28px,3-5vw,38-56px)` | 600 | 1.1 | .02em |
| About body | Cormorant Upright | `clamp(8px,1.05vw,16px)` | 500 | 1.2 | normal |
| Card title | Helvetica Neue | `clamp(24px,3.4vw,44px)` | 600 | 1.06 | .01em |
| Timeline place | Helvetica Neue | `clamp(18px,2.4vw,26px)` | 600 | 1.25 | normal |
| Body / points | Helvetica Neue | 14px | 400 | 1.6 | normal |
| Micro-label / HUD | Helvetica Neue | 9-13px | 400-500 | 1.6 | .18-.42em, uppercase |

Note the deliberate pairing: formal serif (Cormorant) + hand-drawn cursive (Mansalva) + neutral
grotesk (Helvetica). Three voices, no mono.

### Spacing / layout tokens

```css
--m: clamp(16px, 2.4vh, 30px);      /* hero HUD inset */
--wk-card-w: min(880px, 78vw);      /* works card width */
timeline width: min(480px, 90vw), margin: 8vh 6vw 0 auto;
timeline dot: 11px, ring shadow 0 0 0 4px #ffd9b31f
entry rhythm: padding-bottom 46vh (last 38vh)  /* very airy, ~1 entry per 0.5 viewport */
```

### Radius / blur / shadow

- Radius: 999px pills, 20px detail panel, 14px work rows, 12px images.
- Blur: glass rail 9px, detail panel 22px + saturate(1.2), toggles 10px.
- Shadow: detail `0 50px 140px #0009`; accent glow `0 0 6px rgba(255,217,179,.55)`.

---

## 3. Section structure

```
body                                   h=8712
├ .scene-bg (fixed, z0)                full-viewport WebGL canvas
├ .scrim (fixed, z1)                   gradient to right, opacity animated with scroll
├ .hero-gradient (fixed, z2, 35vh)     green glow bottom
├ .glass-rail (fixed, z3, right 52vw)  blur 9px + mask fade left  (desktop only)
├ .stage-fog (fixed, z4)               bg alpha animated 0 -> .41 before works
├ .content (z10)
│  ├ section.hero                      900 (100vh)  about title + body + scroll cue
│  ├ section.resume                    3392         sticky-ish right column timeline
│  │   └ .timeline (480 wide, right)   2892, 5 entries, one per ~46vh
│  └ section.works                     4420         horizontal pinned gallery, 4 cards
├ .hero-chrome (fixed, z12)            corner "+" marks, frame line, HUD meta
├ .credit (fixed top-center, z11)      "CREATIVE TECHNOLOGIST — CHROME / THREE"
├ .lang-toggle (fixed top-right, z110)
├ .github-link (fixed, right 88px, z110)
└ .loading-screen (fixed, z9999)       spinner ring, fades out
```

Hero (900px) holds only: `About Sen` (Mansalva), 2-3 lines of body, and a scroll cue
(`SCROLL` + 1px track + 9px accent dot). Everything sits bottom-aligned, center.

Resume: title right-aligned at `margin: 0 6vw 0 auto`, then a 1px vertical gradient rule with
11px accent dots. Each entry is `period` / `place + logo chip` / `role` / bullet list / logo row.
Entries are separated by 46vh of whitespace, so scrolling reads as "one job at a time" while the
3D character animates on the left. 5 entries: university (2013-17), studio co-founder (2017-20),
own studio (2020-25), creator (2025-), indie dev (2026-).

Works (4420px): a `position:sticky` 100vh viewport containing `.wk-track`
(`display:flex; padding-left:100vw`). Four cards, each `min(880px,78vw)` wide:
1. Advertising (project list)
2. Self-media (video list w/ view counts)
3. Product (ZOOOP / SoBricks)
4. Personal experiments (Raymarching / WebGL / Blender)

Left half of the viewport stays WebGL; cards slide in from the right over the blurred rail.

### Responsive

| Width | Document h | Hero | Resume | Works |
|---|---|---|---|---|
| 1440 | 8712 | 900 | 3392 | 4420 (pinned horizontal, 880px cards) |
| 768 | 8121 | 1024 | 3677 | 3420 (pinned horizontal still on; breakpoint is 640) |
| 390 | 7304 | 844 | 3478 | 2982 (**vertical stack**, transform disabled) |

`@media (max-width:640px)` does the real work: `.wk-track{flex-direction:column;transform:none!important}`,
`.wk-gallery-sticky{position:static;height:auto}`, `.glass-rail{display:none}`,
`.wk-progress,.wk-hint{display:none}`, `.hm-right{display:none}`, smaller timeline body panel.
So mobile = "same content, no pinning, no rail" — not a separate layout.

---

## 4. Animation inventory (measured unless marked)

### 4.1 Scroll-linked (JS, per-frame)

| Name | Trigger | Target | Property | From -> To | Notes |
|---|---|---|---|---|---|
| Scene scrub | scroll 0 -> end | Three.js camera/character | position/scale/rotation | one long take | character zooms + pans through resume and works (observed in load + scroll frames) |
| Scrim fade | scroll 0 -> ~1300 | `.scrim` | `opacity` | 0 -> 0.4 | measured `min(0.4, scrollY/1300)`, then holds |
| Fog build | scroll ~3366 -> 3905 | `.stage-fog` | `background-color` alpha | 0 -> 0.41 | measured; reaches full just as works pin starts |
| Works track | scroll = galleryTop -> +3520 | `.wk-track` | `translateX` | 0 -> -3520 | **exactly 1:1 with scroll**, `translateX = -(scrollY - galleryTop)`, clamped |
| Works progress | same range | `.wk-progress-fill` | `scaleX` | 0 -> 1 | measured linear: `(scrollY-4292)/3520`; `transform-origin:left` |
| Detail drawer | scroll past works | (not scroll) | — | — | see interaction |

Pin math (1440): gallery top 4292, track content = 100vw padding (1440) + 4 x 880 = 4960,
overflow = 4960 - 1440 = 3520. Gallery height = 900 (sticky) + 3520 = 4420. So the section's
extra height *is* the horizontal travel. No ScrollTrigger; a scroll listener writes
`transform: translate3d(x,0,0)` (measured output as `matrix(1,0,0,1,-3520,0)`).

### 4.2 CSS keyframes

| Name | Target | Props | Duration | Easing | Iteration |
|---|---|---|---|---|---|
| `cueDot` | scroll-cue dot | translateY(-10px)->44px, opacity 0/1/1/0 | 1.9s | cubic-bezier(.65,0,.35,1) | infinite |
| `cueLabelPulse` | "SCROLL" | opacity .6 -> 1 -> .6 | 2.4s | ease-in-out | infinite |
| `fadeDown` | `.about-intro`, `.credit` | opacity 0 + translateY(-16px) -> 0 | 1.8s / 1.9s | ease, `both` | once |
| `fadePulse` | hint | opacity .4 -> .85 -> .4 | 3.5s | ease-in-out | infinite |
| `lrSpin` | loader ring | rotate 360 | 2.4s | linear | infinite (only while loading) |

### 4.3 Transitions (measured groups)

| Target | Property | Duration | Easing | Delay |
|---|---|---|---|---|
| lang toggle, github, tl-logo, about-link | color / border / background / transform | 0.2s | ease | 0 |
| works list row | `padding-left` 0 -> 10px | 0.3s | cubic-bezier(.16,1,.3,1) | 0 |
| detail drawer | `transform` translate(100%) -> 0 | 0.5s | cubic-bezier(.16,1,.3,1) | 0 |
| detail close | background / transform rotate(90deg) on hover | 0.2s | ease | 0 |
| detail link (underline) | gap .6em -> .9em, bg | 0.2s | ease | 0 |

Easing family: one "expo-out"-ish curve `cubic-bezier(.16,1,.3,1)` for movement; plain `ease`
for color. No bounce, no elastic.

### 4.4 Load sequence (observed frames)

| t | State |
|---|---|
| 150 ms | `.loading-screen` present, full navy, page behind already painted |
| 400 ms | loader gone (CSS `is-hidden`, 0.6s opacity) — content visible |
| 400-2600 ms | scene still compiling: WebGL canvas blank/black until GLTF + shaders ready; `About Sen` already readable |
| ~7000 ms | full scene visible (SwiftShader software GL; on real GPU estimated 1-2 s) |

Note: no fake progress counter. The loader is a single 2.4s spinner ring with an accent arc whose
`stroke-dashoffset` is nudged as progress advances (`transition .35s ease`). Much calmer than a
0-100 counter.

---

## 5. Interaction inventory

| Trigger | Response | Feedback |
|---|---|---|
| Wheel (anywhere) | custom smooth scroll, pointer must be over page | scene + content lag with soft damping |
| Language toggle (top-right pill) | all copy swaps zh/en, some font-size/line-height changes via `[lang=zh]` | 0.2s color/bg |
| Github icon | external link | 0.2s color |
| Timeline logo chips | occasional external links | translateY(-2px) on hover |
| Works list rows | hover: row indents 10px, name turns accent; if a `detail` exists the drawer opens | 0.3s expo-out |
| Works detail drawer | slides from right (`min(460px,92vw)`), backdrop `#04060a99` + 6px blur, close rotates 90deg | 0.5s expo-out |
| Hover on cards | border/bg lift (`#ffffff0a`, translate -4px) | 0.2s |

Cursor stays native. No custom cursor, no drag, no click sounds on this page.

---

## 6. UX flow / narrative

1. **Cold open** — spinner for <0.5s, then a bone-white sentence on navy. No menu, no logo wall.
   The only affordances are a tiny `SCROLL` cue and four `+` corner marks (HUD framing).
2. **Who is this** — top HUD reads `CREATIVE TECHNOLOGIST`, `PORTFOLIO — 2026`,
   `CODE · ART · PLAY`, `BASED IN SHENZHEN`. Identity is delivered as telemetry, not as a hero
   paragraph.
3. **Career scan** — 5 timeline entries, each ~46vh apart, so the reader's own scroll rhythm
   becomes the pacing. The 3D character changes pose/zoom behind them; it reads as a
   "documentary camera" rather than a gimmick.
4. **Portfolio proof** — the page stops scrolling vertically and the works cards travel
   horizontally under the reader's finger. Progress bar + `KEEP SCROLLING` hint removes the
   "is this stuck?" doubt.
5. **End** — last card is `Personal experiments`, then the page releases; no footer CTA, no
   contact block. Contact lives in the HUD/GitHub. Intentional: the page is a resume, not a
   funnel.

The whole page is one continuous take. There is no section that "starts" with its own entrance
animation; motion is a function of scroll position, so it is reversible and scrub-safe.

---

## 7. What to steal (ranked, with effort)

| # | Pattern | Why it works | Effort |
|---|---|---|---|
| 1 | **Horizontal pinned works gallery driven 1:1 by scroll**, section height = sticky viewport + horizontal overflow, `translateX = -(scrollY - top)` | Cheapest possible pin; no ScrollTrigger needed; the math is one subtraction. Reversible, no state | S (2-3 h) |
| 2 | **Dark navy + single warm accent (#ffd9b3)** with ink `#f4f1ea` and hairline `rgba(...,.14)` | Instantly premium; accent only on numbers/dots/links keeps it disciplined | XS (tokens only) |
| 3 | **HUD frame**: 1px inset border, `+` at 4 corners, 4 micro-labels in the corners, vertical right-edge label | Sells "design engineer" identity with 20 lines of CSS; no images | S |
| 4 | **Scroll cue**: 1px vertical track + 3x9 accent dot looping 44px over 1.9s with expo curve | Teaches the interaction without text noise | XS |
| 5 | **Timeline with 46vh entry spacing + gradient rule + 11px accent dots** | Turns a boring resume into a paced read; works with plain HTML | S |
| 6 | **Scrim/gradient that responds to scroll** (`opacity = min(0.4, y/1300)`) to protect text over 3D | Copy legibility over WebGL without per-section backgrounds | XS |
| 7 | **Calm loader** (single spin ring, accent arc, no counter, <0.6s fade) | Contrast to chrisp/newform counters; feels confident | XS |
| 8 | **Progress bar + "keep scrolling" hint on horizontal section** | Removes the #1 failure mode of pinned galleries | XS |

Do **not** steal: the WebGL character pipeline (GLTF + custom shaders) unless a 3D mascot is
truly required — it is the single largest cost here and is the reason load takes seconds on weak
GPUs. A CSS/SVG substitute delivers 80% of the vibe.

Conflicts to resolve later: this page has no preloader counter and no sound, which is the
opposite of chrisp; and it has no numbered index list, which is newformcap's strength. The
portfolio concept needs to pick one preloader story (calm ring vs 0-100) — see `00-summary.md`.