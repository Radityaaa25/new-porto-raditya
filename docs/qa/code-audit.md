# Code audit - baseline

Date: 2026-11-16
Baseline commit: `e564f99`
Viewports captured: 1440 / 768 / 390
Output: `docs/qa/before/`

Baseline screenshots are taken with `scripts/screenshot-routes.mjs`. The script seeds
`sessionStorage["preloader-seen"]`, walks the page so ScrollTrigger reveals run, hides the
Next dev badge, then captures the full page.

## Confirmed root causes

### 1. Hero renders project imagery

`components/sections/Hero.tsx` imports `Image`, reads `projects`, picks `safetrack-depin`, and
renders:

- a desktop inline `<span>` thumbnail inside the h1 beside "Then I build it."
- a separate `aspect-[16/6]` mobile `<Image>` block under the h1.

Both are confirmed in `before/home-1440.png` and `before/home-390.png`. Hero must be typography
only. Removing them also removes `next/image` and `projects` from this component.

### 2. Descenders are clipped in SplitText

`styles/tokens.css` sets `--lh-hero: 0.9` and `--lh-h1: 1`. `components/motion/SplitText.tsx`
wraps every line, word, and character in `overflow-hidden`. Tight leading plus the mask cuts the
bottom of `g`, `y`, `p`, `j`, `q`.

Evidence: baseline home, about, and contact screenshots. "design" reads "desiqn", "something"
loses the `g` tail. This affects all three split modes because each mode uses the same
`overflow-hidden` wrapper class.

Fix: keep the mask but add vertical bleed (`padding-bottom` plus equal negative
`margin-bottom`) through a token, so glyph extents live inside the clipped box without changing
layout height.

### 3. CursorHUD collides with the hero bottom bar

`components/hud/CursorHUD.tsx` puts the coordinate readout at
`fixed right-[var(--gutter)] bottom-[var(--gutter)]`. The hero bottom bar puts "Scroll" at the
same bottom-right corner. On pointer move both occupy the same area. The readout already fades
near the footer and is inside a `pointer-fine-only` wrapper, but its position is wrong. Move it
to the bottom-left gutter and leave the bottom bar re-laid so "6 shipped projects" and "Scroll"
keep their own space.

### 4. Sound is fully wired

Sound is not an optional stub. It is actively imported and used:

- `components/providers/SoundProvider.tsx`
- `components/hud/SoundToggle.tsx`
- `lib/audio/synth.ts`
- `components/layout/Header.tsx`, `components/motion/MenuOverlay.tsx`,
  `components/motion/Preloader.tsx`, `components/hud/CopyEmail.tsx`,
  `components/hud/ThemeToggle.tsx`, `app/layout.tsx`,
  `components/dev/AssetGallery.tsx`
- storage key `sound`, `data-sound` CSS, docs and README text.

The pass removes the feature end to end, not only the toggle.

### 5. No internationalization

All copy is hardcoded in English across pages and components. `content/site.ts`,
`content/projects.ts`, and `content/experience.ts` are single-locale. There is no locale routing,
no language switcher, no `hreflang`, no localized metadata, and no locale-aware 404.

### 6. Socials are empty

`content/site.ts` has `socials: []` and a TODO. GitHub, Instagram, and email are absent from
Header, MenuOverlay, Hero, Footer, and Contact.

### 7. Portrait asset is unused and misspelled

`public/assets/source/raditya-potrait.png` is 767x1259, typo in the filename, never imported in
any page. It has a small sparkle watermark in the lower-right area. No derived AVIF/WebP,
`blurDataURL`, or responsive sizes exist.

### 8. Icons and Moni are only used on dev routes

`components/icons/index.tsx` contains brand lookalikes and UI icons. `components/mascot/Moni.tsx`
exists with seven poses. Both are rendered only in `app/dev` / `app/dev/assets`. No public page
uses a tool icon, stack icon, or Moni.

### 9. Home is one viewport

`app/page.tsx` returns only `<Hero />`. There is no statement, selected work, about teaser,
toolbox, experience, highlights, or contact CTA.

### 10. Work has no detail routes

`app/work/page.tsx` links straight to external project URLs. There is no `/work/[slug]`, no
sticky meta, no screenshot sequence, and no next-project footer. The index has no filter and no
hover preview.

## Additional findings

- `app/template.tsx` only fades up. There is no signature route transition, no clip-path wipe,
  no scroll progress, no command palette, and no in-view nav highlighting.
- `Header` hides primary nav below `md`; MenuOverlay is the only mobile navigation path. The
  overlay has no language switch or socials.
- `app/not-found.tsx` is a root route with static English copy and no Moni.
- No `sitemap.ts`, `robots.ts`, or locale alternates. The `<html lang>` is hardcoded `en`.
- No skip link; keyboard users tab through Header on every route.
- `Hero` uses `priority` on a decorative project thumbnail. That was the largest LCP candidate
  and is removed with the thumbnail.
- Project `stack` data is incomplete: only Clarise has a stack entry. SafeTrack, VasCode,
  Pentas Seni, Nana Bites, and Joy Reminder need real stack labels for the new stack icons.
- `CountUp` formats numbers with a fixed `en-US` locale. This needs to follow the active locale.
- `Reveal` hides content with `opacity: 0` until ScrollTrigger runs. This is acceptable, but a
  no-JS or failed-hydration fallback should not leave the page blank. The new pass keeps the
  technique but verifies content in real browsers.
- `next.config.ts` has no `allowedDevOrigins`; screenshots must use `localhost`, not
  `127.0.0.1`, or hydration fails and the preloader stays on screen.
- Baseline work and about full-page captures hide below-fold rows unless the page is scrolled
  before capture. The QA script now scrolls, so the before/after set is comparable.
- No CV download. No per-project OG image. No Person JSON-LD. No print/scroll restoration
  affordance.

## Not changed

The approved colour palette in `styles/tokens.css` is frozen for this pass.