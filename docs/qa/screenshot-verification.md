# Project screenshot verification

Every image below was re-captured from its own live URL on 2026-11-16 with
`node scripts/capture-projects.mjs`, then opened and checked against the live site's title, logo,
and palette. `cover-800` is a resize of the verified `cover`; AVIF and WebP are encoded from the
same verified PNG source.

| Slug | Source URL | Captured files | Matches |
| --- | --- | --- | --- |
| clarise | https://clarise.my.id | cover, cover-800, detail-01, detail-02, mobile (AVIF + WebP) | yes |
| safetrack-depin | https://safetrack-depin.vercel.app | cover, cover-800, detail-01, detail-02, mobile (AVIF + WebP) | yes |
| vascode | https://vascode.vercel.app | cover, cover-800, detail-01, detail-02, mobile (AVIF + WebP) | yes |
| pentas-seni | https://pentas-seni-tk-v2.vercel.app | cover, cover-800, mobile (AVIF + WebP); single-viewport page, no detail frames | yes |
| nana-bites | https://nana-bites.vercel.app | cover, cover-800, detail-01, detail-02, mobile (AVIF + WebP) | yes |
| scaffdev | https://scaffdev.my.id | cover, cover-800, detail-01, detail-02, mobile (AVIF + WebP) | yes |

Checks used: generated wordmark and headings (Clarise, SAFETRACK, VasCode, Pentas Seni / KB-TK
Aisyiyah 21, Nana Bites, Scaffdev), signature colors, and page-specific copy. No image is shared
between projects.
