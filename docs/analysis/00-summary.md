# Reference Analysis: Synthesis

Analyzed: 2026-11-13. Four references, three captured with real Chromium at 1440x900 / 768 / 390
(DPR 1, SwiftShader WebGL). Per-site detail: `senbuzy.md`, `chrisp.md`, `newformcap.md`,
`haoqi.md`. Evidence: `raw/`, `assets/`, `screenshots/`.

Purpose: choose one coherent identity for Raditya's portfolio instead of cloning four sites, and
fix the token system before any component is written.

---

## 1. Comparison matrix

| Dimension | senbuzy | chrisp | newformcap | haoqi |
|---|---|---|---|---|
| Type of site | personal about page | personal portfolio | venture firm marketing | personal portfolio |
| Base palette | near-black navy `#0a0e16` | black chrome + light 3D world | cream `#fafffa` / ink `#121613` | dark indigo hero / paper `#fbfaf4` work |
| Accent | warm sand `#ffd9b3` | cyan (estimated `#00b8cc`) | green `#2bee4b` | lime `#c0fe04` |
| Accent usage | dots, numbers, links | scene highlights only | bars, arrows, stat punctuation | project tags, selection |
| Type voices | serif + cursive + grotesk | one grotesk (Poppins) | grotesk + editorial serif + pixel | display grotesk + 2 monos |
| Preloader | single spin ring, <0.6s | LOADING + rotating status lines | 0-100 counter + "Loading..." | none (content-first) |
| Navigation | HUD + language toggle, no menu | bottom pill + arrows, no scroll | fullscreen overlay menu | fixed HUD links, no overlay |
| Scroll model | custom wheel + horizontal pin | none (single viewport) | ScrollSmoother + ScrollTrigger | Lenis on inner container |
| Signature motion | 1:1 scroll-driven horizontal gallery | 3D room orbit + curtains | pinned radial diagram, marquees, counters | 1.2s reveals, two full-bleed scenes |
| Project presentation | horizontal cards | objects in a room | portfolio route + team cards | shrinking card cascade + year |
| Sound | none | one-shot audio, no toggle seen | none | toggle in HUD, off by default |
| 3D / WebGL | required (character) | required (Spline room) | none | decorative (R3F glossy word) |
| Main risk | 3D cost, GPU blank | 3D cost, GPU blank, no scroll | heavy scroll choreography | custom fonts, WebGL scene |

What each does best, in one line:

- **senbuzy** — pacing. A resume becomes a documentary by putting 46vh between entries and moving
  a scene behind it.
- **chrisp** — permission and personality. A gate card and rotating loader copy make the wait feel
  authored.
- **newformcap** — hierarchy. A 155px thesis, 11px labels, and three numbers do all the work; no
  imagery needed.
- **haoqi** — proof of craft. A live clock, cursor coordinates, theme/sound toggles, and exact
  timing curves are the portfolio.

---

## 2. Token proposal (derived, not final)

All values must live in one token file. This is the smallest set that reproduces the four
languages without copying any one.

### Color

```
--bg              #0d0e10   near-black, neutral (not navy)
--bg-elevated     #16181b
--fg              #f2f2ee   bone white
--fg-2            rgba(242,242,238,.62)
--fg-3            rgba(242,242,238,.34)
--line            rgba(242,242,238,.10)
--accent          #c0fe04   lime (haoqi exact)
--accent-ink      #0d0e10   text on accent
--paper           #f7f6f0   inverted band background
--paper-fg        #16181b
```

Rationale: dark base + one accent is required by the brief (newformcap), and lime is chosen over
sand/green/cyan because it reads "tooling / design engineer", which is the positioning. Paper is
kept as an *inverted band* (works section) rather than a second theme.

### Type (free substitutes — final choice in phase 2)

| Role | Candidate | Why |
|---|---|---|
| Display | Space Grotesk or Archivo Expanded | neutral but characterful grotesk; wide caps like `tiktok` |
| Body | Instrument Sans or Inter Tight | quiet, high x-height, good at 14-16px |
| Mono | JetBrains Mono or IBM Plex Mono | engineering tone; two weights cover both mono roles |

Do not use: Mansalva, Cormorant, Poppins, Marcellus, TWK Lausanne, PP Mondwest, Editorial New,
`tiktok`, `tronica-mono` (commercial or reference-identity-defining).

### Scale

```
--fs-display   clamp(48px, 7vw, 96px)     hero statement
--fs-h1        clamp(32px, 4.4vw, 64px)   section statements
--fs-h2        clamp(22px, 2.4vw, 32px)
--fs-body      16px / 1.55
--fs-label     12px, tracking .08em, uppercase
--fs-meta      11px, tracking .06em, uppercase, mono
```

### Space / shape

```
--gutter       clamp(20px, 4vw, 56px)
--section-y    clamp(80px, 12vh, 160px)
--radius-sm    6px
--radius-md    12px
--radius-pill  999px
--hairline     1px
```

### Motion

```
--dur-ui       0.3s
--dur-reveal   1.2s
--dur-draw     0.66s
--ease-ui      cubic-bezier(0,0,0.2,1)
--ease-cine    cubic-bezier(.66,0,.01,1)
--stagger      0.15s
--preloader-min 1400ms
--preloader-max 2500ms
```

Two curves only. Anything that needs a third curve is probably over-animated.

---

## 3. The identity: what to combine

Proposed spine: **"Instrument panel over a poster."** A scroll-first portfolio with a persistent
HUD, one oversized typographic hero, an index-style work cascade on paper, and two full-bleed
kinetic breaks. No runtime 3D.

| Element | Taken from | Adaptation |
|---|---|---|
| Preloader: 0-100 counter + rotating status lines | newformcap + chrisp | Custom SVG status icons (no emoji), copy in Radit's voice, hard cap 2.5s, skipped within a session |
| Persistent HUD: GMT+7 clock, cursor X/Y, theme + sound | haoqi | Sound synth (WebAudio) muted by default; cursor dot desktop-only |
| Hero: oversized statement + line-by-line reveal | newformcap | "Web developer who designs." statement, not a name-only hero; mono meta row |
| Work index: shrinking card cascade with year + category | haoqi | 6 real projects, live screenshots via Playwright, tags Personal/Team/Hackathon |
| One horizontal pinned strip | senbuzy | Optional phase-4 set-piece: process frames, not the whole project list |
| Numbered 01/02/03 | newformcap | Three capabilities: Design, Build, Ship (mapped to real background) |
| Timeline pacing at ~40-46vh per entry | senbuzy | Experience section with 3 real entries |
| Skills marquee | newformcap | Role/skill ticker between sections, paused on hover, reduced-motion safe |
| Fullscreen menu | newformcap | `01 Index / 02 About / 03 Experience / 04 Contact`, staggered |
| Two full-bleed scenes | haoqi | CSS/SVG bursts, no WebGL; one dark, one paper |
| Loud contact line | haoqi | Email + mailto form; no fake form endpoint |
| Gate card | chrisp | **Skipped** — it conflicts with scroll-first; replaced by a one-time hint chip |

Why skip 3D: three references use it and two of them render nothing under software GL; the brief
allows WebGL only if truly required. A glossy CSS/SVG word + generated grain gives the poster
feel at a fraction of the payload.

---

## 4. Conflicts and resolutions

| Conflict | Options | Decision | Reason |
|---|---|---|---|
| Preloader style | counter (newform) / calm ring (senbuzy) / none (haoqi) | Counter with rotating status, capped | Matches brief ("preloader counter" + "cinematic preloader"); ring alone is too quiet for a first impression |
| Base theme | dark (senbuzy/chrisp) / light (newformcap) / both (haoqi) | Dark default + token-swap light toggle + paper bands | Brief asks for dark base with one accent; toggle is a HUD proof point |
| Navigation | no-scroll room (chrisp) / scroll page + menu (newformcap) / HUD anchors (haoqi) | Scroll page + fullscreen menu + HUD anchors | Content volume (6 projects, 3 roles) needs scroll; menu gives structure |
| Project format | horizontal pin (senbuzy) / index cascade (haoqi) / route cards (newformcap) | Index cascade primary; one optional pinned strip | Cascade holds 6 items with hierarchy; pinning all projects is a mobile/accessibility cost |
| Numbering | 01/02/03 as project list vs capabilities | Capabilities | Inventing numbered project order adds no meaning; capabilities map to real facts |
| Cursor | native / difference-blend layer (haoqi) | Difference-blend dot, desktop only | Cheap signature; rule 5 keeps it off touch |
| Sound | none / one-shot / toggle | Toggle, synth clicks, muted by default | Brief requires it; avoid reference audio files |
| Stats | animated counters (newformcap) | Only true counts (projects shipped, languages, years) | AGENTS rule 8 forbids fake metrics |

---

## 5. Risks and guards

| Risk | Guard |
|---|---|
| Preloader feels like a delay | Cap 2.5s, start content paint behind it, skip on repeat visit, respects reduced motion |
| Text scramble hurts readability | Scramble once on hero only, resolve <1s, disable under `prefers-reduced-motion` |
| Long 1.2s reveals feel slow on every element | Apply to section headers and cards only; body copy gets 0.4s |
| Marquee motion sickness | Pause on hover/focus, `prefers-reduced-motion` stops it, no autoplay loop in view |
| Pinned horizontal section breaks mobile | Desktop-only or vertical fallback below 768; never pin on touch |
| HUD clutter | HUD is `pointer-events:none` except toggles; hide coordinates below 768 |
| Custom font licensing | Free fonts only, self-hosted via `next/font`, recorded in `docs/ASSETS.md` |
| Screenshot thumbnails look inconsistent | Fixed viewport 1440x900, same crop, WebP/AVIF, logged in `docs/ASSETS.md` |
| Accent overuse | Lime only on: active nav, tags, one word per section, focus rings |

---

## 6. Approved decisions (2026-11-13)

| Decision | Choice |
|---|---|
| Spine | **Hybrid, per-section** — maximum fidelity to each reference's signature moment |
| Accent | Lime `#c0fe04` |
| Theme | Dark default + light toggle (token swap) |
| Fonts | Space Grotesk (display) / Instrument Sans (body) / JetBrains Mono (mono) |
| 3D | No runtime 3D; CSS/SVG/rendered layers only |
| Sound | Synthesised UI sounds, muted by default, toggle in HUD |

### Per-section source map (approved)

| Section | Primary reference | Fidelity target |
|---|---|---|
| Preloader | newformcap counter + chrisp rotating status lines | 0-100 counter, "Loading..." label, status micro-copy, fade at 100 |
| Header / HUD | haoqi | Logo left, links right, GMT+7 clock, cursor X/Y, theme + sound toggles, crosshair guides |
| Hero | haoqi poster + newformcap line reveal | Oversized statement, line-by-line reveal, mono meta row, kinetic accent word |
| About | senbuzy intro spacing | 2-column short bio, airy rhythm, no photo dump |
| Work index | haoqi | Cascade 885/553/332 (adapted), year right, category chip, one card per project |
| Pinned strip (optional) | senbuzy | 1:1 scroll-driven horizontal travel, desktop only, vertical fallback |
| Capabilities 01/02/03 | newformcap | Numbered list, pinned radial/rotating diagram on contour background |
| Experience | senbuzy | Vertical rule, accent dots, ~40-46vh per entry |
| Skill ticker | newformcap | Two-row marquee, pause on hover, reduced-motion stop |
| Scene break A | haoqi "Innovate with purpose" | Full-bleed dark burst, CSS/SVG |
| Scene break B | haoqi "Future-first" | Full-bleed paper grid + burst |
| Menu | newformcap | Fullscreen overlay, numbered links, staggered entrance, Menu -> Close |
| Contact | haoqi | Loud statement line, email, socials, mailto |
| Cursor | haoqi | Difference-blend dot, desktop only |

Constraint reminder: "as close as possible" means *behavior, timing, and visual language* — not
assets, fonts, copy, screenshots, or source code (AGENTS rules 1-4). Every section still uses
Raditya's real content from `AGENTS.md`; no invented metrics.

No code until phase 2 is approved. Phase 2 = tokens + layout shell only; preloader/HUD in phase 3.