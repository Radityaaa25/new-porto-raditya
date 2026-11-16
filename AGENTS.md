# PROJECT: Personal Portfolio of Raditya Ananda Satria

## Goal
Build an ORIGINAL, award-level personal portfolio in Next.js, deployed on Vercel. UI, UX, and
animation language is inspired by 4 references, blended into one cohesive identity. NOT a
1:1 clone. I will customize it over time, so everything must be token-driven and easy to edit.

## References and what to take from each
1. https://www.chrisp.design/
   - Cinematic preloader with progress and rotating, personality-driven status messages
   - Optional UI sound (must be muted by default, with a toggle)
   - Overall polish and micro-copy personality
2. https://about.senbuzy.com/
   - [VERIFY] Fully client-rendered, so analyze it with a real browser. Report what it does
     best (scroll storytelling, transitions, about-section interactions) and propose what
     to adopt.
3. https://www.newformcap.com/
   - Preloader counter (0 to 100), fullscreen menu overlay with staggered links
   - Large hero headline revealed line by line / word by word
   - Scroll-driven text and image reveals, horizontal marquee rows
   - Numbered lists (01, 02, 03), animated stat counters
   - Arrow-link hover style, dark base palette with ONE strong accent color
4. https://haoqi.design/
   - HUD details: live local clock (GMT+7, Jakarta), cursor X/Y coordinates readout
   - Theme toggle and sound toggle in the header
   - Index-style project list (title, year, category) with hover preview
   - Mono / technical typography accents, "design engineer" feel

## About me (content source of truth, do NOT invent facts beyond this)
Name: Raditya Ananda Satria. Based in Jakarta, Indonesia.
Role positioning: Web developer (Next.js / React) who also designs. Background in
multimedia (graphic design, video editing, content production).
Education: Sistem Informasi, Universitas Bina Sarana Informatika (2025 - now);
Multimedia, SMK Pusaka 1 Jakarta (2021 - 2024).
Skills: React.js, Next.js, HTML, CSS, JavaScript (familiar); Python, PHP, Laravel, MySQL
(basic); Git/GitHub, Vercel; Canva, Figma, CapCut.
Languages: Indonesian (active), English (passive), Korean (passive).
Email: radityaanandasatria@gmail.com
Do NOT publish my home address or phone number anywhere. Contact = email + a form/mailto.

Projects (use the live URLs; screenshot them yourself for thumbnails):
- Clarise (clarise.my.id) - Personal. AI-powered adaptive learning platform: interactive
  courses, AI tutor, gamification (XP, badges, streaks), AI Course Builder. Next.js, custom domain.
- SafeTrack Depin (safetrack-depin.vercel.app) - Team, Hackathon 0G, DePIN track. IoT + AI
  logistics system for real-time shipment security monitoring.
- VasCode Creative (vascode.vercel.app) - Team. Company profile for a creative agency and
  production house (web dev, video, photography, graphic design).
- Pentas Seni TK Aisyiyah 21 (pentas-seni-tk-v2.vercel.app) - Personal. Registration and
  digital e-ticket app for a school performance event, used by real attendees.
- Nana Bites (nana-bites.vercel.app) - Personal. Landing page and pre-order system for a
  snack business, integrated with WhatsApp ordering.
- Joy Reminder (joy-reminder.vercel.app) - Personal. Archive management and tax-expiry
  reminder app for business customers.

Experience:
- Graphic Design Staff, Kominfo Division, Himpunan Mahasiswa Sistem Informasi UBSI (2025 - now):
  posters, banners, Instagram feeds, flyers.
- Content Design & Editor, PKL at KFT (Apr - Sep 2023): social media visuals, photo/video editing
  in a professional production environment.
- Videographer & Editor, SMK Pusaka 1 Jakarta competency exam (2024): full video production.

## Tech stack (fixed)
Next.js (App Router) + TypeScript + Tailwind CSS, GSAP (+ScrollTrigger) for animation,
Lenis for smooth scroll, next/font for fonts, deployed on Vercel. Use Motion/Framer Motion
only if GSAP is awkward for a specific case. Add WebGL/OGL/Three ONLY if the analysis shows
a reference truly needs it, and justify it first.

## HARD RULES
1. NO EMOJI anywhere: not in UI, copy, code comments, console logs, commit messages, or docs.
   (chrisp.design uses emoji in its loader; replace with custom SVG icons.)
2. All assets are created or sourced by you (see ASSET POLICY). No placeholder boxes in the final result.
3. Do not copy references' images, logos, copywriting, proprietary fonts, or source code. Recreate
   behavior and visual language in your own code.
4. Every color, font size, spacing, duration, and easing comes from tokens. Zero magic numbers in components.
5. Animate transform/opacity/clip-path only. Respect prefers-reduced-motion. No custom cursor on touch devices.
6. All text content lives in /content (typed TS/JSON) so I can edit in one place.
7. Work in phases. After each phase: summarize, list decisions made, and STOP for my approval.
8. Never write fake testimonials, fake metrics, or fake clients. If content is missing, leave a clearly
   marked TODO in /content and tell me.

## ASSET POLICY
- Icons: build a custom inline-SVG icon set (consistent 1.5px stroke, 24px grid) in /components/icons.
  Open-license libraries (Lucide, Phosphor, Tabler) are allowed as a base; record license in /docs/ASSETS.md.
- Characters / illustrations / mascot: design ORIGINAL vector characters in SVG (code-drawn, animatable
  with GSAP: blinking, floating, reacting to the cursor). Do not use copyrighted characters.
  CC0 / permissive sources (e.g. Open Peeps, unDraw) are OK only if license permits modification;
  log source and license for each.
- Photos / textures / noise / grain: generate procedurally (SVG filters, canvas, CSS) or use CC0 /
  Pexels / Unsplash with license logged. Prefer generated.
- Project thumbnails: capture real screenshots of my live project URLs with Playwright, at consistent
  viewport and framing, optimized to WebP/AVIF.
- Fonts: free Google Fonts or Fontshare only. Pick a display + body + mono trio. Self-host via next/font.
- Sound: generate tiny UI sounds (WebAudio synthesis) or use CC0 audio. Muted by default.
- Every asset must be logged in /docs/ASSETS.md (file, source, license, author).

Acknowledge these rules, list any questions, and wait. Do not write code yet.