# Animation Catalog

Source mapping for the follow-up pass. Techniques are reimplemented in original code; no reference
source, copy, or assets were copied.

| Technique | Reference | Implementation | Route |
|---|---|---|---|
| 0-100 counter with rotating personality status lines | newformcap + chrisp | `components/motion/Preloader.tsx`, status copy in `content/en.ts` / `content/id.ts` | all |
| Line-by-line and word-by-word masked reveals | newformcap | `components/motion/SplitText.tsx`, used by Hero, section titles, Work and Contact headings | Home, Work, About, Contact |
| Scroll-triggered fade/translate with stagger | senbuzy | `components/motion/Reveal.tsx`, delays on cards, counters, capability rows | all |
| Two-row oversized marquee, opposite directions, hover pause | newformcap | `components/sections/Highlights.tsx` + `components/motion/Marquee.tsx` | Home |
| Animated stat counters from real counts | newformcap | `components/motion/CountUp.tsx`, values from content | Home |
| Numbered 01/02/03 capability list | newformcap | `components/sections/Capabilities.tsx` | Home |
| Persistent HUD: GMT+7 clock, cursor coordinates, theme, language | haoqi | `components/hud/*`, `components/layout/Header.tsx` | all |
| Index-style project rows with cursor-follow preview | haoqi + senbuzy | `components/work/WorkIndex.tsx`, `components/work/StackIcons.tsx` | Work |
| Full-bleed scene break with grid and orbital mark | haoqi | `components/graphics/SceneBreak.tsx` | Work, About |
| Timeline pacing with hairline rules and accent dots | senbuzy | `app/[locale]/about/page.tsx` experience list | About |
| Orbit motif used as a quiet background accent | haoqi | `components/graphics/OrbitMark.tsx` | Home, About, Contact |
| Wireframe torus responding to cursor and scroll | original | `components/three/OrbitScene.tsx` via `components/three/HeroAccent.tsx` | Home hero |

## WebGL justification

The 3D accent is a single wireframe torus with a second ring, drawn with OGL (MIT) on one canvas.
It is not decorative stock: it carries the technical HUD idea into depth, and it is the only
runtime WebGL use on the site. The bundle stays small because OGL is a small renderer and the scene
is dynamically imported with `ssr: false`.

Guards: no canvas at `prefers-reduced-motion`, on coarse pointers, or below 1024px. The scene also
bails out at four or fewer logical cores or 4GB or less reported device memory. In every fallback
case the original SVG `OrbitMark` remains visible. Rendering stops when the hero leaves the
viewport, the pixel ratio is capped at 2, and only transforms/render calls run per frame.

## Motion tokens

All timing uses `styles/tokens.css` (`--dur-*`, `--curve-*`, `--stagger-*`). SVG orbit loops use
CSS keyframes and are disabled under `prefers-reduced-motion`. No layout, width, height, or color
animation is used for the motion set-pieces.

## Addendum F primitives

| Technique | Reference | Implementation | Route |
|---|---|---|---|
| Word-by-word scroll scrub with optional pin | newformcap, senbuzy | `components/motion/ScrollScrubText.tsx` | Home, Work, About, Contact, detail |
| Sticky horizontal work rail, reversible, vertical on touch | senbuzy | `components/sections/WorkRail.tsx`, `FeaturedShowcase.tsx` | Home, Work |
| Sticky process steps with sequential scrub and SVG line | newformcap, senbuzy | `components/sections/Process.tsx` | Home |
| Velocity-reactive marquee skew | newformcap | `components/sections/MarqueeBand.tsx` | Home |
| Portrait clip-path reveal plus parallax | senbuzy, chrisp | `components/motion/Parallax.tsx`, `AboutTeaser` | Home, About, Contact, detail |
| Timeline line draw and sequential entries | senbuzy | `components/sections/ExperienceTimeline.tsx` | Home, About |
| Curtain cover then reveal on internal navigation | chrisp, newformcap | `components/motion/RouteCurtain.tsx` | all |
| Scroll progress indicator | haoqi | `components/motion/ScrollProgress.tsx` | all |
| Cursor states: default, link, view, text | haoqi | `components/hud/CursorHUD.tsx` | all fine-pointer |
| Filter layout transition via native View Transitions | newformcap | `components/work/WorkBrowser.tsx` | Work |
| Huge footer wordmark and back-to-top | chrisp, newformcap | `components/layout/Footer.tsx` | all |

## Known gaps

Per-letter hover roll, text scramble, image RGB split, and per-section palette scrubbing are not
implemented. The 3D scene is a wireframe set-piece, not a character or full particle system.
