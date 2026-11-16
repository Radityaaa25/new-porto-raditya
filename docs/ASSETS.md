# Asset Log

Every asset must have a row before merge. No row, no release.
Plan: `docs/asset-plan.md`. Policy: `AGENTS.md` ASSET POLICY.
Phase 4 additions logged below with the generating script and the capture date.

| File | Class | Source | Author | Licence | Notes |
|---|---|---|---|---|---|
| Space Grotesk (variable, latin) | font | Google Fonts | Florian Karsten | SIL OFL 1.1 | display role, self-hosted via next/font |
| Instrument Sans (variable, latin) | font | Google Fonts | Rodrigo Fuenzalida, Jordan Egstad | SIL OFL 1.1 | body role, self-hosted via next/font |
| JetBrains Mono (variable, latin) | font | Google Fonts | JetBrains | SIL OFL 1.1 | data role, self-hosted via next/font |
| components/icons/index.tsx | icon set | original drawing | Raditya Ananda Satria | project-owned | 55 icons, 24px grid, 1.5px stroke, currentColor; Lucide used only as a geometry convention, no paths copied |
| components/mascot/Moni.tsx | character | original vector drawing | Raditya Ananda Satria | project-owned | CRT-monitor head, 260x280 viewBox, 7 poses, named rig groups body/head/eyes/lid-l/lid-r/arm-l/arm-r/ring/zzz/tick |
| lib/motion/moni.ts | character motion | original | Raditya Ananda Satria | project-owned | pose target table; loops pull timings from lib/motion/tokens.ts character block |
| components/textures/index.tsx + styles/tailwind.css utilities | texture | procedural CSS and inline SVG | Raditya Ananda Satria | project-owned | grain, dot grid, contour, halftone, scanline, paper fibre; 0 bitmap bytes |
| scripts/generate-assets.mjs | tooling | original script | Raditya Ananda Satria | project-owned | exports favicons with ImageMagick, renders og.png with Playwright |
| app/icon.svg | favicon source | original drawing | Raditya Ananda Satria | project-owned | monogram R with lime tick |
| public/favicon.ico | favicon | generated from app/icon.svg | Raditya Ananda Satria | project-owned | 16/32/48, 14.7KB |
| public/icon-192.png | favicon | generated from app/icon.svg | Raditya Ananda Satria | project-owned | 192x192 transparent, 35.4KB |
| public/icon-512.png | favicon | generated from app/icon.svg | Raditya Ananda Satria | project-owned | 512x512 transparent, 210.3KB |
| public/apple-icon.png | favicon | generated from app/icon.svg | Raditya Ananda Satria | project-owned | 180x180, dark solid background, 29.3KB |
| public/og.png | OG image | generated HTML template rendered by Playwright | Raditya Ananda Satria | project-owned | 1200x630, Space Grotesk + Instrument Sans + JetBrains Mono loaded from Google Fonts at render time, 252KB |
| public/media/projects/clarise/* | screenshot | own project, own capture 2026-11-15 | Raditya Ananda Satria | project-owned | cover 1600x1000 + 800w, detail-01/02 1440x900, mobile 390x844 DPR2; AVIF q50-52, WebP q80-82 |
| public/media/projects/safetrack-depin/* | screenshot | own project, own capture 2026-11-15 | Raditya Ananda Satria | project-owned | cover, detail-01/02, mobile; same variants |
| public/media/projects/vascode/* | screenshot | own project, own capture 2026-11-15 | Raditya Ananda Satria | project-owned | cover, detail-01/02, mobile; same variants |
| public/media/projects/pentas-seni/* | screenshot | own project, own capture 2026-11-15 | Raditya Ananda Satria | project-owned | cover + mobile only; page is a single viewport, no detail frames |
| public/media/projects/nana-bites/* | screenshot | own project, own capture 2026-11-15 | Raditya Ananda Satria | project-owned | cover, detail-01/02, mobile; same variants |
| public/media/projects/joy-reminder/* | screenshot | own project, own capture 2026-11-15 | Raditya Ananda Satria | project-owned | cover + mobile only; landing is a single viewport, no detail frames |
| public/media/projects/manifest.json | metadata | capture script output | Raditya Ananda Satria | project-owned | per-slug status, capturedAt, viewport sizes, page height |
| scripts/capture-projects.mjs | tooling | original script | Raditya Ananda Satria | project-owned | Playwright capture + ImageMagick transcode; ONLY env filters slugs, retries navigation |
| components/dev/AssetGallery.tsx + app/dev/assets/page.tsx | dev tooling | original | Raditya Ananda Satria | project-owned | review route, noindex, not linked publicly |

## Tool and library licences

| Tool | Version | Licence |
|---|---|---|
| ImageMagick | system 6.9 | ImageMagick licence |
| Playwright Core | 1.65.1 | Apache-2.0 |
| Chromium build | playwright chromium-1208 | BSD-style |
| Google Fonts CSS (generation only) | live fetch | SIL OFL 1.1 for the three families above |

## Notes and limits

- Screenshots are of Raditya's own live projects and are used only as thumbnails on this site.
- `pentas-seni` and `joy-reminder` expose no second viewport; the capture script omits detail frames when the page height is under 1200px.
- OG images are static PNGs generated at authoring time, not runtime next/og routes. Re-run `node scripts/generate-assets.mjs` after changing the monogram or headline copy.
- Project captures are dated in `manifest.json`. Re-run `node scripts/capture-projects.mjs` quarterly or when a project changes.
- Both scripts need `playwright-core` on NODE_PATH; it is a local tool dependency, not a site dependency.
