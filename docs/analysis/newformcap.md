# Reference Analysis: newformcap.com

Analyzed: 2026-11-13. Viewport 1440x900, 768x1024, 390x844. DPR 1. Chromium with SwiftShader WebGL.
Evidence: `raw/newformcap.json`, `screenshots/newformcap/`, `assets/newformcap/`,
`/tmp/opencode/refanalysis/newformcap-dump.txt`.

Site is the marketing page of New Form Capital (NYC venture firm). It is a long, editorial,
scroll-driven page: cream hero with photographic type, dark statement sections, a pinned radial
"primitives" diagram, animated stats, giant marquees, and a fullscreen sliding menu.

---

## 1. Tech detection

| Fact | Evidence |
|---|---|
| Gatsby | `#___gatsby`, `#gatsby-focus-wrapper`, `app-*.js`, `webpack-runtime-*.js` |
| styled-components | `sc-*` hashed class names on every component (`Transition__Content-sc-10pvtj9-7`) |
| GSAP | 66 hits in bundles |
| ScrollTrigger | 6 hits — pins, reveals, counters |
| **ScrollSmoother** | 10 hits, plus `#smooth-wrapper` / `#smooth-content` wrappers |
| Lenis / locomotive | absent — smooth scroll is ScrollSmoother |
| 3D | none in page content; `BackgroundCanvas` is a 2D canvas (menu background) |
| TypeScript | typed bundle helpers, `.ts`-style chunk naming |
| Fonts | TWK Lausanne (200/350/550), PP Mondwest, Editorial New — all commercial licences |
| Document height | 13361 (1440), 13416 (768), 12315 (390) |

`styles.8f7e51d20e539357272e.css` is only the 5.6 KB reset; all layout lives in
styled-components inside `app-*.js`.

---

## 2. Design tokens (measured)

```css
white        #ffffff
paper cream  #fafffa
ink dark     #121613
muted        rgba(46,56,48,0.8)
accent       #2bee4b   /* rgb(43,238,75), bright spring green */
```

One accent only. Green appears on: menu bars, small arrows/chevrons, stat punctuation, marquee
pixel blocks. Everything else is cream/ink. No gradients in the layout itself (the canvas menu
background supplies texture).

### Type scale (measured computed, 1440)

| Role | Font | Size | Weight | Line-height / tracking |
|---|---|---|---|---|
| Hero headline | TWK Lausanne | 155px | 550 | tracking -6.2px, tight leading |
| Giant marquee | Editorial New | 240px | 400 | 1.0 |
| Marquee alt (pixelated) | PP Mondwest | 295px | 400 | 1.0 |
| Primitive wedges | PP Mondwest | 165px | 400 | 1.0 |
| Section statement | TWK Lausanne | 72px | 550 | 1.05 |
| Body / subtext | TWK Lausanne | 16px | 200 | 22.4px (1.4) |
| Eyebrow / link | TWK Lausanne | 11px | 550 | wide tracking, uppercase |
| Footer small | TWK Lausanne | 11-12px | 350 | 1.4 |

Three-voice system: a restrained grotesk for everything functional, an editorial serif for
display, and a pixel/tall serif for kinetic type. The accent type size jump (16px -> 155px ->
240px) is the whole hierarchy; there is no mid-size tier.

### Shape / layout

- Radius: 8px (buttons/chips), 10px (image tiles), 14px (menu/CTA blocks).
- Images: inline inside headline words (the hero letters are partly replaced by B/W photo
  tiles), and a masonry/offset grid in the "Wall Street Capitalism" section.
- Section rhythm: full-bleed, alternating cream / ink, each statement vertically centered with
  generous 20-30vh padding.
- Menu: fullscreen overlay, links set very large, left-aligned column.

---

## 3. Section structure (1440, h=13361)

```
body 13361
└ #___gatsby > #gatsby-focus-wrapper
  └ Transition__Content        (page shell, survives route change)
    ├ Header__Wrapper          fixed logo "New Form" + right "Menu" + green 3-bar icon
    ├ SideNav__Wrapper         fullscreen menu (off-canvas at rest)
    │  ├ SideNav__BG           dim/blur layer
    │  └ SideNav__Sidebar      Home / Portfolio / Team / Email / Linkedin / Get inTouch
    ├ BackgroundCanvas__Canvas menu background canvas
    └ #smooth-wrapper > #smooth-content
       ├ Transition__Wrapper   preloader (0% counter + "Loading...")
       ├ hero                  cream + noise; "Advancing the Economic Networks of the Future"
       │                       inline photo tiles; "New" underlined; Scroll cue
       ├ statement             dark: "Our existing financial system is archaic..."
       ├ innovators            "The Innovators" + one-liner + VIEW PORTFOLIO (/portfolio/)
       ├ capitalism            "Wall Street Capitalism / Running on Blockchain Rails"
       │                       offset image grid
       ├ founders              "Next-gen markets need next-gen founders" + VIEW PORTFOLIO
       ├ primitives            pinned radial diagram: 01 Financial Primitives (Finance),
       │                       02 Immutable Data (Data), 03 Blockchain Rails (Blockchain)
       │                       on contour-line background, PP Mondwest wedges rotating
       ├ approach              "Our Unique Approach" + copy + GET IN TOUCH + stats:
       │                       90%+ / 100% / 30+ / 100 M+ / 2019  (count-up on enter)
       ├ team                  "MEET THE TEAM" (/team/) + 4 member cards
       ├ bridging              giant marquee row "Bridging the Old With the New"
       │                       two overlapping rows: Editorial New 240px + pixel PP Mondwest
       └ footer                info@newformcap.com, Get inTouch, Home/Portfolio/Team/
                               Linkedin/Terms/Privacy Policy, (c) New Form Capital 2023,
                               809 Broadway 10th Fl. New York, NY 10003, Top of Page
```

Responsive: 768 keeps the same sections (h 13416) with smaller type and a 1-2 column grid;
390 (h 12315) stacks everything, hero type drops to a fraction of 155px, marquee still full-bleed.
No separate mobile menu pattern — the same overlay is used.

---

## 4. Animation inventory

### 4.1 Preloader (measured frames)

| t | State |
|---|---|
| 150 ms | full-screen overlay, cream, counter "0%" |
| 400 ms | counter climbing ("75%" observed mid-run), "Loading..." label |
| 4000 ms | overlay gone, hero readable |
| keyframe `dquRQZ` | opacity ramp with stops at 0% / 50% / 100% (fade-out curve) |

Counter is decorative — it does not track bytes, it is time/step driven to 100 and then the
overlay fades. Total ~1.5-2 s on normal hardware; 4 s here only because of SwiftShader.

### 4.2 Keyframes captured from the runtime stylesheet

| Name | Target | Property / values | Notes |
|---|---|---|---|
| `dquRQZ` | loader overlay | opacity, stops 0 / 50 / 100% | fade out |
| `eQmCIX` | menu/keyword blob | translate, stops 0/10/30/50/70/90%, moves of `10rem` | multi-step drift, not a loop |
| `fzuGoj` | marquee track | `translateX(0)` -> `translateX(-100%)` | linear, infinite |
| `kzSOBj` | menu link / arrow | `translateY(0)` -> `52px` -> `0` | hover or scroll-cue pulse |
| `ZYTNK` | menu link indicator | `rotate(-90deg) translateX(0 -> 20px -> 0)` | animated arrow/chevron |
| `scroll-indicator-bounce` | scroll cue (from a third-party widget) | translateY bounce | not core design |

Stop values that were not captured are described, not invented. The important finding: the
marquee is a pure `translateX(-100%)` loop, and menu motion is a 52px vertical nudge plus a
20px chevron push, both cheap transform-only effects.

### 4.3 Scroll-linked (GSAP ScrollTrigger + ScrollSmoother)

| Effect | Trigger | Property | Notes |
|---|---|---|---|
| Smooth scroll | global | ScrollSmoother | `#smooth-wrapper`/`#smooth-content`; content lags input with damping |
| Section reveal | each section enters ~80% viewport | opacity + translateY | estimated 0.6-0.9s; per-line stagger on statements |
| Hero line reveal | on load + scroll | clip/translate per line | headline appears line by line, not letter by letter |
| Primitives pin | primitives section | pin + rotate | the radial wedge diagram rotates as you scroll through 3 steps |
| Stat counters | stats in view | number text | count up from 0; 90%+ / 100% / 30+ / 100 M+ / 2019 |
| Marquee | continuous | translateX loop | CSS keyframe, not ScrollTrigger |
| Image parallax | capitalism grid | translateY at different rates | subtle, per-column |

Transitions measured: `transform 0.4s ease-in-out` on 8 selectors, plus a `transform 0.5s`
group (truncated in capture). The 0.4s ease-in-out is the house curve for hover/menu movement.

### 4.4 Menu

Open: overlay slides/fades in, `SideNav__BG` darkens the page, links enter staggered (estimated
0.05-0.08s offset each, 0.4s each). Close: reverse. The header "Menu" label becomes "Close Menu"
and the green bars animate into an X (green bars = 3 spans).

---

## 5. Interaction inventory

| Trigger | Response | Feedback |
|---|---|---|
| Menu (top-right) | fullscreen overlay: Home, Portfolio, Team, Email, Linkedin, Get inTouch | staggered link entrance, canvas background animates |
| Close Menu | overlay retracts | 0.4s transform |
| VIEW PORTFOLIO / MEET THE TEAM | route to `/portfolio/` and `/team/` | ScrollSmoother resets, page transition |
| Inline links | Home `/`, Terms `/terms/`, Privacy `/privacy/`, mailto | 0.4s hover underline/arrow |
| Scroll | whole page glides (ScrollSmoother), statements reveal, pin + rotate diagram, stats count | continuous |
| Marquee | infinite horizontal loop, no interaction | — |
| Top of Page | scroll to top | smooth |

All interactive elements are real `<a>`/`<button>`; keyboard focus states exist (styled-components
`:focus` rules in the reset). No custom cursor, no audio, no drag.

---

## 6. UX flow / narrative

1. **Counter** — 0 -> 100 while "Loading..." sits under it. Short, familiar, and it guarantees a
   clean reveal.
2. **Statement hero** — the thesis sentence *is* the hero, broken across lines, with photographs
   inlined into the words. No product shot, no CTA above the fold.
3. **Problem** — dark section, one paragraph, no graphics.
4. **Proof of thesis** — "The Innovators" and two "VIEW PORTFOLIO" exits, so a reader can leave
   the narrative at any point for the actual portfolio.
5. **Model** — the pinned radial diagram explains three primitives (Finance / Data / Blockchain)
   as one system. This is the only "explainer" and it is image-free.
6. **Credibility** — approach paragraph, then big animated numbers.
7. **People** — team cards, with a route for more.
8. **Brand** — typographic marquee as a palate cleanser, then a dense, plain footer.

The rhythm is: cream (warm) -> dark (serious) -> cream (proof) -> dark (model) -> cream (numbers)
-> marquee -> footer. Alternation does the pacing work; there is almost no decorative motion
outside the marquee and the pinned diagram.

---

## 7. What to steal (ranked, with effort)

| # | Pattern | Why it works | Effort |
|---|---|---|---|
| 1 | **ScrollSmoother-style glide + per-section reveal** (opacity/translateY, per-line stagger) | Makes a long page feel authored; cheap per line; standard in GSAP | S |
| 2 | **Thesis-as-hero typography with inline photo tiles** | Turns a sentence into the visual; no hero image needed; scales down well | M (layout care at 390) |
| 3 | **Numbered 01/02/03 pinned radial diagram** | Explains three skills/services as one system, using only type + rotation | L (pin math + responsive) |
| 4 | **Animated stat counters with real numbers** | Credibility without testimonials; only usable where true data exists | S |
| 5 | **Giant two-row marquee** (serif + pixelated overlay) | Big, brand-forward, no assets; one CSS keyframe | S |
| 6 | **Fullscreen menu with staggered links and changing label (Menu -> Close Menu)** | Cinematic and simple; no icons required | M |
| 7 | **Cream/dark section alternation with subtle noise** | Free texture, strong rhythm, easy tokens | XS |
| 8 | **Counter preloader with personality label** | Safe, expected, fast; contrast to chrisp's calm loader | XS |

Do **not** steal: the fonts (TWK Lausanne, PP Mondwest, Editorial New are commercial — substitute
with a free grotesk, a free editorial serif, and a pixel/tech face), the exact copy, or the
photographic team/portfolio images.

Conflict to resolve in `00-summary.md`: this page is the "numbered list + counter + marquee"
reference, while haoqi is "index list + HUD + two scroll scenes" and senbuzy is "3D + horizontal
gallery". All three want the same scroll budget; the portfolio must choose one spine and use the
others as isolated moments.