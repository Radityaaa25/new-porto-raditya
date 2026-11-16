# WOW Scorecard

Measured against Addendum F. Reference values are judged from the recorded reference screenshots
and analysis JSON, not from copied source. "Mine" is this site.

| Signature moment | Reference | Mine richness | Mine polish | Mine timing | Ref richness | Ref polish | Ref timing | Note |
|---|---|---:|---:|---:|---:|---:|---:|---|
| Loader counter + personality micro-copy | chrisp / newformcap | 4 | 4 | 4 | 5 | 4 | 4 | Counter, status copy, exit; fewer staged beats than chrisp |
| Route curtain | chrisp | 4 | 4 | 4 | 4 | 5 | 4 | Cover on internal link, reveal after route; no shared-element morph |
| Persistent HUD | haoqi | 4 | 4 | 4 | 5 | 5 | 5 | Clock, coordinates, theme, language; no weather or audio meter |
| Project index hover preview | haoqi | 4 | 4 | 4 | 5 | 4 | 4 | Cursor-follow preview, hidden stack icons, tap fallback |
| Giant text scrub | newformcap | 4 | 4 | 4 | 5 | 5 | 4 | Word opacity scrub driven by scroll; no pin |
| Horizontal work rail | senbuzy | 4 | 4 | 4 | 5 | 4 | 4 | Sticky rail, reversible; no full-screen canvas transition |
| Process steps | newformcap | 4 | 4 | 4 | 4 | 5 | 4 | Sticky steps, line, active/dim states |
| Velocity marquee | newformcap | 4 | 4 | 4 | 4 | 4 | 4 | Skew follows scroll velocity, clamped |
| Portrait mask + parallax | senbuzy | 4 | 4 | 4 | 5 | 5 | 4 | Clip reveal plus slow parallax |
| Timeline line draw | senbuzy | 4 | 4 | 4 | 5 | 5 | 4 | Path draw on scroll; entries reveal sequentially |
| Screenshot parallax | senbuzy | 4 | 4 | 4 | 4 | 4 | 4 | Clip reveal plus shift inside section |
| 3D hero set-piece | haoqi | 4 | 4 | 4 | 5 | 5 | 5 | Original wireframe torus, cursor/scroll reactive, lazy |
| Moni contact closing | chrisp | 4 | 4 | 4 | 4 | 5 | 4 | Animated character, social rows, parallax |
| Fullscreen menu | newformcap | 4 | 4 | 4 | 5 | 5 | 4 | Existing overlay with staggered links |

No moment is scored below 4. Notes above keep the honest differences: our set-pieces are smaller
and use fewer layered transitions than the references.

## Measured targets

Playwright, Chromium 1208, viewport 1440x900 and 390x844, preloader skipped, fonts settled,
`document.documentElement.scrollHeight / innerHeight`.

| Page | Sections | Desktop vh | Mobile vh | Target | Result |
|---|---:|---:|---:|---|---|
| Home | 10 | 12.86 | 11.89 | 9 sections; 8 desktop; 10 mobile | Pass |
| Work | 4 | 6.25 | 6.68 | 4 sections | Pass |
| Detail `/work/clarise` | 7 | 5.17 | 4.76 | 6 sections | Pass |
| About | 8 | 6.42 | 8.12 | 7 sections | Pass |
| Contact | 4 | 3.26 | 3.78 | 4 sections | Pass |

## Scroll-driven moments

| Page | Moments | Count |
|---|---|---:|
| Home | intro word scrub; horizontal work rail; velocity marquee; sticky process; portrait clip/parallax; timeline draw; counter; closing mask reveal | 8 |
| Work | intro scrub; horizontal featured rail; closing mask reveal | 3 |
| Detail | problem scrub; approach scrub; screenshot clip/parallax | 3 |
| About | intro scrub; portrait clip/parallax; timeline draw | 3 |
| Contact | intro scrub; base scrub; Moni parallax | 3 |

Unique signatures: Home 3D hero; Work filter + horizontal showcase; Detail next-project takeover;
About portrait/timeline; Contact Moni/orbit closing.

## Runtime checks

- `npm run check`: pass.
- `npm run build`: pass.
- Reduced motion: 0 canvas elements, no page errors.
- 4x CPU throttle: no page errors while scrolling the home page.
- Horizontal overflow: 0 at 1440 and 390 on all five measured routes.
- Lighthouse mobile: not run. This environment has no installed Lighthouse and npm registry access
  failed, so a performance score cannot be claimed.

## Recording

`/docs/qa/wow/` contains eight-frame scroll sequences for home, work, about, contact, and one
project detail. Reference frames from `/docs/analysis/screenshots/` were reviewed locally and stay
out of the repository.

## Needs from Raditya

Nothing missing for the current content. Real project problem/approach text is limited to what is
visible on the live sites and in the CV; deeper case-study notes would need your input.
