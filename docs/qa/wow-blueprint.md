# WOW Blueprint

Reference parity audit for Addendum F. Sources: `/docs/analysis/*.md`,
`/docs/analysis/raw/*.json`, and `/docs/analysis/screenshots/`. Timing values are the measured
values recorded in those files; unmeasured values are marked "observed" rather than invented.

| Signature moment | Source site | Exact technique (trigger / easing / duration / library) | Where it lives |
|---|---|---|---|
| Loader with rotating personality copy and progress | chrisp.design | Fixed overlay; counter + status text swaps on an interval; CSS opacity `300ms cubic-bezier(0,0,0.2,1)`; custom SVG marks; gate card skipped | `components/motion/Preloader.tsx`; status copy in `content/en.ts` / `content/id.ts` |
| Curtain route transition | chrisp.design | Two half-panels, `transform-origin: top/bottom`, height 0 at rest, reveal via clip/scale; CSS transforms | `PageTransition` pattern reused in route-level shell; full curtain still a target |
| Hover-driven chrome reveal | chrisp.design | Header/nav reveal on pointer proximity; no scroll dependency; CSS transitions | Header + work row hover states |
| Persistent HUD over content | haoqi.design | Fixed clock, cursor X/Y, theme toggle; mono labels; no layout shift | `components/hud/*`, `components/layout/Header.tsx` |
| Index cascade with year/category and hover preview | haoqi.design | Rows shrink by hierarchy; cursor-follow preview; hover state; CSS transform/opacity | `components/work/WorkIndex.tsx`, `components/work/StackIcons.tsx` |
| Full-bleed scroll scenes | haoqi.design | Two full-width visual breaks between content blocks; CSS/SVG substitute for WebGL burst | `components/graphics/SceneBreak.tsx` |
| Text scramble / resolve | haoqi.design | One-shot character replacement on the statement headline; resolves under 1s; disabled on reduced motion | Home intro scrub uses masked word resolve; scramble primitive still a target |
| 0-100 counter preloader | newformcap.com | Counter `0%` to `100%`; progress label; fixed overlay; CSS/JS timeline; menu label swaps Menu -> Close | `Preloader` counter; menu overlay |
| Line and word mask reveals | newformcap.com | Split lines/words, `translateY` inside overflow mask, stagger; GSAP timeline | `components/motion/SplitText.tsx` across all page headings |
| Numbered 01/02/03 list | newformcap.com | Number, title, body; scroll reveal; accent numbers | `components/sections/Capabilities.tsx` and process steps |
| Animated counters from real numbers | newformcap.com | `ScrollTrigger` once; GSAP tween on progress; tabular numerals | `components/motion/CountUp.tsx`, `Highlights` |
| Two-row oversized marquee | newformcap.com | Duplicated track, `translateX(-50%)`; 20s linear loop; hover pause | `components/motion/Marquee.tsx`, `Highlights` |
| Horizontal pinned work gallery | senbuzy.com | Section height = sticky viewport + horizontal overflow; `translateX = -(scrollY - top)`; reversible; vertical fallback on touch | `components/sections/WorkRail.tsx` |
| Timeline with 46vh entry spacing | senbuzy.com | Vertical rule, accent dots, sequential entries; scroll-linked reveal | `components/sections/ExperienceTimeline.tsx` |
| Calm loader / cue dot | senbuzy.com | Single rotating ring; scroll cue dot loops 44px over 1.9s; CSS keyframes | Loader status mark, hero scroll cue |
| Scroll-linked scrim and per-section reveal | senbuzy.com | Opacity/translate per section; `opacity = min(0.4, y/1300)` scrim idea | Hero 3D scrim + `Reveal` sections |
| Hover cursor states | haoqi.design | Difference-blend dot; link/view/drag states; desktop only | `components/hud/CursorHUD.tsx` |
| Menu overlay with staggered links | newformcap.com | Fullscreen panel; numbered links; stagger; Menu -> Close label | `components/motion/MenuOverlay.tsx` |

Minimum coverage: chrisp 4, senbuzy 4, newformcap 6, haoqi 6.

## Build order

1. Home: intro scrub, work rail, process pin, about teaser, toolbox, experience, highlights,
   closing, footer.
2. Work: filterable index, featured rail, closing CTA.
3. Detail: context, approach, screenshot sequence, stack, takeover.
4. About: portrait, story, timeline, toolbox, education, languages, currently, CTA.
5. Contact: headline, channels, form, Moni closing.
6. Route transition + cursor states + velocity marquee.
