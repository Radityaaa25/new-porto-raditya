# Reference Analysis: chrisp.design

Analyzed: 2026-11-13. Viewport 1440x900 (primary), 768, 390. DPR 1. Chromium with SwiftShader WebGL.
Evidence: `raw/chrisp.json`, `screenshots/chrisp/`, `assets/chrisp/style.css`; probes
`/tmp/opencode/refanalysis/chrisp{,-2,-3}.json`.

Site is Chris P's personal portfolio: a single-screen 3D "room" you explore, entered through a
permission card. There is no page scroll. Content is placed on objects inside the scene, and the
bottom navigation cycles projects/rooms.

**Read this first — coverage limits.** The 3D scene did not render under software WebGL: the
canvas stays blank (WebGL context lost), and the network log captured no scene requests. So
everything about the *room* (geometry, object placement, in-scene panels) is unknown. Only
chrome, copy, DOM layers, CSS, and audio elements are measured. The 390 pass also stalled in the
loader in one run; mobile screenshots exist but may show the loader only.

---

## 1. Tech detection

| Fact | Evidence |
|---|---|
| Next.js (turbopack) | `/_next/static/chunks/*`, Next font CSS variables |
| Tailwind CSS v4 | `oklab()` colors, `bg-black/16`, arbitrary values `z-[601]`, `-top-[62.5px]` |
| Spline 3D | `/spline/scene.splinecode` + Spline runtime chunks |
| Audio files | `<audio src="/audio/coffee-sip.mp3">`, plus `ai-voice-chat-start`, `ai-voice-auto-pause` |
| Fonts | Poppins (body, `next/font`), Marcellus SC (declared), Patrick Hand SC + Caveat (Google Fonts at runtime) |
| GSAP / ScrollTrigger / Lenis | absent (single screen, no scroll) |
| Document height | 900 px at 1440 (no scroll at any breakpoint) |

Two declared `:root` blocks: light (`--background:#fff; --foreground:#171717`) and a
`@media (prefers-color-scheme:dark)` override (`#0a0a0a` / `#ededed`). The app then forces a black
page (`body bg = rgb(0,0,0)` measured), so the token pair is decorative — the design is
dark-chrome regardless.

Audio elements exist with `muted=false`, `paused=true` at rest: sound is preloaded and played on
interaction, not on load. There is no visible sound toggle in the captured chrome.

---

## 2. Design tokens (measured / verbatim)

```css
:root{
  --background:#fff; --foreground:#171717;
  --font-poppins:"Poppins",sans-serif;
  --font-marcellus:"Marcellus SC",serif;
}
@media (prefers-color-scheme:dark){:root{--background:#0a0a0a;--foreground:#ededed}}

/* forced app chrome */
body                 bg rgb(0,0,0), text rgb(237,237,237)
UI text dim          oklab(0.999994 0.0000456 0.0000201 / 0.7)
gate card            rgba(0,0,0,0.8) + backdrop-blur, text #fff
tip chip             rgba(0,0,0,0.75), 12px
arrow button         rgba(0,0,0,0.16), 56px
accent (single)      estimated #00b8cc
```

Accent is **estimated**: the only saturated pixels sampled were a ring stroke `#3ca1b7`
(anti-aliased edge) and an icon fill `#005d72`; the true value is likely brighter than both,
around cyan `#00b8cc`. Treat as a direction, not a value.

### Type scale (measured computed, 1440)

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Gate h1 | Poppins | 24px (`text-2xl`) | 300 (`font-light`) | "Hi, I'm Chris" |
| Gate body | Poppins | 16px | 300 | 3 lines, max-w-md |
| Gate button | Poppins | 16px | 500 | white on black text |
| Nav pill buttons | Poppins | 16px | 400 | work / about / writing |
| Loader wordmark | Poppins | 16px | 500 | tracking .3em, uppercase "LOADING" |
| Loader status line | Poppins | 14px | 400 | rotating micro-copy |
| Tip chip | Poppins | 12px | 400 | one line |

No display serif is actually set in body copy; Marcellus SC and the handwriting fonts are
likely used inside the 3D texture artwork (unverified).

### Shape / depth tokens

- Radius: 999px pills and round buttons, 12px card (`rounded-xl`), 6px button + tip.
- Blur: nav pill 8px backdrop blur; gate card default backdrop blur (8px).
- Shadow: gate card `shadow-2xl`; nav pill `shadow-lg` (two soft black shadows).
- Avatar: 125px circle, 2px black border, overlaps card top by 62.5px.
- Chrome sizes: 40px round icon buttons, 56px round arrows, nav pill 386x84.

---

## 3. Structure

One viewport, layered by z-index (all `position:fixed`):

```
canvas.w-full.h-full.cursor-default            full-screen Spline scene
nav.fixed top-0 h-16 z-600                     invisible holder (opacity-animated)
  button 40px  (16,12)    aria "Go to homepage"
  button 40px  (1384,12)  aria "Open help menu"
div.fixed inset-0 z-601 flex items-end         welcome gate
  div.relative bg-[rgba(0,0,0,0.8)] rounded-xl p-8 pt-20 max-w-md mb-12 text-center
    avatar 125px  -top-[62.5px] centered, border-2 border-black
    h1  "Hi, I'm Chris"
    p   "Explore the space around you to learn about my design work, ideas, and process."
    button "Start exploring"  bg-white text-black px-6 py-2 rounded-md
div.fixed inset-0 z-40 bg-black origin-top     route curtain (top half), h=0 at rest
div.fixed inset-0 z-40 bg-black origin-bottom  route curtain (bottom half), h=0 at rest

after entering:
nav pill  (527,784) 386x84  backdrop-blur rounded-full shadow-lg h-[84px] px-4
  arrow 56px  "Previous project"   (543,798)
  buttons "work" (607,802) "about" (685,802) "writing" (763,802)
  arrow 56px  "Next project"
tip chip  (617,738)  "Tip: Use the arrows to move"
badge     (1387,364) 53x171   hidden below md  (vertical award/credential ribbon)
help overlay: "Click or tap to rotate the camera and explore. Interact with objects to view
               my work and learn what I'm all about." + "Close help"
```

The gate card and the help overlay are the only real DOM content. Everything else is Spline.
The right-edge 53x171 element is a vertical badge (award/nomination style) — small type rotated.

---

## 4. Animation inventory

### 4.1 Measured CSS

| Name | Target | Props | Duration | Easing | Iteration |
|---|---|---|---|---|---|
| `spin` | loader ring | rotate 0 -> 360 | 300 ms (live CSSTransition) | cubic-bezier(0,0,0.2,1) | while loading |
| `pulse` | loader/status dot | opacity .5 at 50% | — | — | infinite |
| nav button color | nav buttons | color, bg, border, outline, text-decoration, fill, stroke | 0.2s | cubic-bezier(0.4,0,0.2,1) | once |
| arrow button | 56px arrows | `all` (bg/color) | 0.2s | cubic-bezier(0.4,0,0.2,1) | once |
| loader/gate opacity | overlays | opacity | 0.3s | cubic-bezier(0.4,0,0.2,1) | once |
| pointer affordance | misc | `all` | 0.3s | cubic-bezier(0,0,0.2,1) | once |

The live animated element during load is an SVG circle with `CSSTransition`-driven style,
duration 300 ms — a ring/spinner, not a progress bar.

### 4.2 Load sequence (observed frames)

| t | State |
|---|---|
| 150 ms | black screen, "LOADING" + first status line |
| 400-2600 ms | same; status line rotates through emoji-prefixed messages |
| 4000 ms | still loading (SwiftShader); gate not yet shown |
| ~13000-60000 ms | Spline reported ready ("Spline load time: 59783.6ms"); gate card appears |
| GPU estimate | 2-4 s to gate on real hardware (Spline scene is small) |

Status micro-copy (emoji stripped here; the site uses emoji glyphs that must be replaced with
custom SVG icons in the rebuild): "Sketching wireframes...", "Aligning pixels...".

### 4.3 Gate / entry

Card enters by opacity + small upward translate (opacity measured 1 with `transform:none` after
settle; entrance timing not captured — estimated 0.3-0.4s). "Start exploring" removes the gate;
the scene then accepts pointer input. Two half-height black curtains (`origin-top` /
`origin-bottom`, height 0 at rest) are the route transition apparatus: scale to full, swap view,
scale away. Duration unknown — estimated 0.5-0.8s on the same expo-ish family.

### 4.4 In-scene motion (unverified)

Camera orbits with pointer drag; objects have hover and click states. All of it lives inside the
Spline runtime, so no per-property numbers exist without the scene file. Do not copy these.

---

## 5. Interaction inventory

| Trigger | Response | Feedback |
|---|---|---|
| Click "Start exploring" | gate dismissed, pointer control enabled | card fade |
| Drag on canvas | orbit camera around the room | direct manipulation |
| Move pointer over objects | object hover state (pill/outline, unknown) | in-scene |
| Click objects | opens work/about content (panel or route) | curtains |
| Bottom arrows | previous / next project | 0.2s color, project swap |
| Pill buttons work/about/writing | switch room/view | curtains |
| Top-right 40px button | help overlay (camera controls explanation) | overlay fade |
| Top-left 40px button | home | curtains |
| Audio | one-shot sounds on interactions (`coffee-sip.mp3`, voice clips) | audible only after user gesture |
| Hover chrome | white-ish fill on black buttons | 0.2s |

Cursor stays native. No custom cursor, no scroll hijack, no drag-scroll.

---

## 6. UX flow / narrative

1. **Cold open** — black, "LOADING", and a line of personality copy that rotates. The wait is
   treated as a scene-setter, not a technical delay.
2. **Permission gate** — a centered card with Chris's face, one sentence, one button. This is
   both an audio-gesture unlock and a framing device: "explore the space".
3. **Exploration** — the visitor is inside a room. Movement is spatial (orbit), discovery is
   optional. Two affordances prevent confusion: a temporary "use the arrows" tip and a persistent
   pill nav with arrows.
4. **Content** — work/about/writing are reachable by objects *and* by nav, so the 3D is never a
   dead end.
5. **Help** — one click explains the interaction model in two sentences. Nobody has to guess.
6. **Exit paths** — top-left home, badge credit, email implied in about content (not captured).

Design lesson: the 3D is an *interface*, but every destination also has a 2D shortcut. That is
what keeps a gimmick from becoming a maze.

---

## 7. What to steal (ranked, with effort)

| # | Pattern | Why it works | Effort |
|---|---|---|---|
| 1 | **Single permission card with avatar + one CTA** before entering the experience | Novel, cheap, and doubles as audio/pointer unlock. Fits a portfolio of 6 projects | XS (30 min) |
| 2 | **Loader with rotating personality status lines** (no percentage) | Makes waiting feel authored; sets tone before content | XS |
| 3 | **Bottom-center pill nav with prev/next arrows** on a non-scrolling page | Teaches "there are N things, move between them" without a menu | S |
| 4 | **Black chrome over a light 3D world** (inverted vs. the usual dark scene) | High contrast, instantly distinctive, and text stays legible | S (token work) |
| 5 | **Two-half curtain route transition** (`origin-top` / `origin-bottom`, h=0 at rest) | One transform pair, feels expensive | S |
| 6 | **A help overlay with two plain sentences** | Accessibility of the interaction model; prevents "what do I do" bounce | XS |
| 7 | **Preloaded one-shot UI sounds, muted until gesture** | Personality without autoplay; matches the AGENTS sound rule | S |
| 8 | **Vertical badge ribbon on the right edge** | Compact credential/award slot that does not compete with the hero | XS |

Do **not** steal: the Spline room pipeline. It is the most expensive part of this site, it is
unverifiable without the scene asset, and it fails completely on weak GPUs (blank screen). Also do
not copy the emoji status copy — AGENTS rule 1 requires custom SVG icons.

Conflict to resolve in `00-summary.md`: this site's gate + no-scroll model excludes scroll
storytelling, while senbuzy and newformcap are scroll-first. The portfolio needs one primary
navigation model, not two.