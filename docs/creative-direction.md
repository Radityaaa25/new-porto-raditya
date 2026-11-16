# Creative Direction

Status: PHASE 2 proposal. No page code until approved.
Inputs: `docs/analysis/00-summary.md`, per-site analyses, `AGENTS.md`.
Locked decisions: dark default + light toggle, lime `#c0fe04`, hybrid per-section reference mix,
free font trio, no runtime 3D, no audio.

---

## 1. Concept

This portfolio is an instrument panel built by someone who learned to see before he learned to
ship. Raditya came up through multimedia, so the site behaves like a well-edited piece of work:
frames are deliberate, cuts land on the beat, typography carries the voice, and every element has
a reason to be on screen. The interface is dark, precise, and quietly confident, with one lime
signal colour used like a marker on a light table. Live telemetry (Jakarta time, cursor
coordinates), a numbered index of projects, and exact timing curves frame the work as measured
craft rather than decoration. Nothing floats without a function: the preloader counts, the HUD
orients, the index cascades, the timeline keeps time. The result should read as a web developer
who designs like a creative, not a designer who occasionally writes markup.

---

## 2. Two directions

### Direction A: INSTRUMENT

The site is a console for inspecting a developer's work. Dark base, lime signal colour, mono
labels, thin rules, visible coordinates and a local clock. Projects appear as a numbered index
that expands into detail; capabilities are numbered primitives; motion is treated as measurement
(counters, staggered rows, 1.2s cinematic reveals on a single curve).

| Borrowed from | What exactly |
|---|---|
| haoqi | HUD layout and telemetry, lime `#c0fe04`, index cascade proportions, `cubic-bezier(.66,0,.01,1)` |
| newformcap | 0-100 preloader counter, fullscreen numbered menu, numbered capability list, marquee |
| senbuzy | timeline discipline, scene-to-scene pacing, section breathing room |
| chrisp | personality in micro-copy (recreated without emoji), preloader restraint |

Strengths: matches the "web developer who designs" positioning; ages well; cheap to run (no
video, no WebGL); content-first so six projects are enough; scales to a case-study template.
Risks: can drift cold or dashboard-like. Mitigation: an about strip with the multimedia story,
one original character, paper-colour inversion bands, and dry micro-copy in the loader and HUD.

### Direction B: CUTTING ROOM

The site is an edit suite. Chapter markers, a scrub-style timeline, cuts between scenes, subtle
grain, warm sand accent, editorial serif display over a sans body, and projects presented as a
reel. The multimedia origin becomes the literal metaphor.

| Borrowed from | What exactly |
|---|---|
| senbuzy | scroll-driven storytelling, depth, horizontal reel |
| chrisp | cinematic preloader and status copy |
| newformcap | oversized display type, marquee rows |
| haoqi | index-style list and mono accents |

Strengths: more emotionally distinctive; strong narrative arc; showcases video/editing taste.
Risks: heavier first paint, harder accessibility, metaphor can overpower the actual work; six
projects may not sustain a cinematic arc; invites video assets the policy wants us to avoid.

### Decision

Chosen: **INSTRUMENT**, with the Cutting Room's pacing absorbed as rhythm (chapter numerals,
cut-style section transitions, restrained grain, beat-driven reveals). The instrument is the
structure; the edit is the timing.

Why:

1. Positioning. The brief is "web developer who also designs", not "filmmaker". The instrument
   proves engineering taste and design judgement at the same time.
2. Content fit. Six projects, three roles, two schools. An index handles that honestly. A reel
   implies volume that does not exist yet.
3. Performance. No runtime 3D, no video hero, no large texture sets. Fast on mid-range Android,
   which matters for a Jakarta audience.
4. Approved decisions already point here: lime accent, dark default, HUD spine, hybrid sections.
5. Maintainability. Token-driven rows and cards are easy to extend as projects are added; a
   cinematic timeline is not.

---

## 3. Sitemap and pages

```
/
├── work                    index of all projects
├── work/[slug]             project detail template (6 instances)
├── about                   bio, skills, experience, education, languages
├── contact                 email + form
├── 404                     not found, in-voice
├── api/contact             POST handler (rate limited, no secrets in client)
├── sitemap.ts
├── robots.ts
└── opengraph-image.tsx     plus per-route and per-project variants
```

| Route | Purpose | Primary content | Primary reference |
|---|---|---|---|
| `/` | Convince in one scroll | hero statement, 6 projects, capabilities, about strip, experience, contact | haoqi + newformcap |
| `/work` | Full index, scannable | 6 rows with year, category, role; hover/focus preview | haoqi index |
| `/work/[slug]` | Proof of thinking | brief, constraints, stack, role, selected frames, live link | senbuzy case rhythm |
| `/about` | Human context | bio, multimedia story, skills matrix, experience, education, languages | newformcap editorial |
| `/contact` | Convert | email, mailto, short form, local time, availability note | haoqi loud line |
| `/404` | Keep the voice | one line, one way back | chrisp micro-copy |

Route rules:

- Project detail exists for all six projects even when the live site is the real artifact; the
  detail page adds context the live site cannot (role, constraints, stack, what changed).
- `work/[slug]` is statically generated from `/content/projects.ts`.
- Contact form posts to a route handler; no third-party form service, no secrets in the bundle.
- No blog, no CMS, no auth in v1. Content is typed TS.

---

## 4. Home section order

| # | Section | Purpose | Primary reference | Signature motion |
|---|---|---|---|---|
| 00 | Preloader | Mask font and image load, set tone, show progress honestly | newformcap counter + chrisp status lines | 0-100 counter, rotating status, curtain exit |
| 01 | HUD / header | Orientation: identity, nav, local time, theme, language | haoqi | clock tick, coordinate readout, toggle states |
| 02 | Hero | State the positioning in one readable line | haoqi poster + newformcap line reveal | masked line reveal, one accent word, meta row |
| 03 | Selected work | Prove it: six projects as an index that expands | haoqi | index cascade with 60-90ms stagger |
| 04 | Capabilities 01-03 | Explain the offer: design, build, ship | newformcap numbered list | sticky numbered rail, dot travel |
| 05 | About strip | Human context: multimedia origin, current study | senbuzy intro spacing | two-column fade-up, portrait treatment |
| 06 | Experience | Credibility over time | senbuzy timeline | rule draw, accent dots, per-entry reveal |
| 07 | Scene break | Reset attention before contact | haoqi kinetic statement | full-bleed burst, 1.2s curve |
| 08 | Tooling marquee | Show breadth without a wall of logos | newformcap ticker | two-row marquee, pause on hover |
| 09 | Contact | One action: email | haoqi loud line | line reveal, hover arrow |
| 10 | Footer | Close: nav, socials, local time, credit | newformcap + haoqi HUD | static, mono meta |

Section exit criteria: each section must be understandable with animation disabled and with
JavaScript off (content visible, no opacity 0 traps).

---

## 5. Copy tone guide

### Language strategy

Recommendation: **English-first, single locale in v1.** Indonesian is the flavour, not a second
build.

Reasoning:

1. Audience. Jakarta studios and remote international clients both read English portfolios;
   Indonesian-only would narrow the top of the funnel.
2. Ownership. Written English is easier for Raditya to review than to author under time pressure;
   passive English is sufficient to approve short, concrete copy.
3. Cost. A full bilingual build doubles copy, QA, animation timing checks, and meta tags, for a
   six-project site.
4. Quality. Mixed-language micro-copy reads improvised. One language, executed well, reads
   intentional.

Mitigation: the content layer is keyed by locale from day one (`content/en/*.ts`), so `/id` can be
added later without refactoring. One Indonesian signature line is allowed in the footer
("Dibuat di Jakarta") as flavour.

### Voice

- First person, present tense, short declaratives.
- Concrete verbs and real nouns. Name the stack, the constraint, the outcome.
- Numbers only when true. No invented metrics, clients, or testimonials.
- Dry confidence. No hype, no humility theatre.
- Sensory but controlled: the copy can sound like an edit, not like a pitch deck.
- Headings sentence case. Mono labels uppercase with 0.08em tracking. Micro-copy and
  status lines lowercase. Buttons imperative.

### Lexicon

| Use | Avoid |
|---|---|
| build, ship, cut, measure, index, system | passionate, creative, dream, journey, unleash |
| Next.js, React, GSAP, Lenis, Figma | "cutting-edge", "next-level", "synergy" |
| "six projects", "three roles", "2025" | "10+ years", "award-winning", "world-class" |
| "I design the interface, then I build it" | "I turn ideas into reality" |

### Micro-copy samples

- Loader status: `compiling layout`, `measuring type`, `checking links`, `almost there`
- Language switch: `EN / ID`
- Theme toggle: `theme dark` / `theme light`
- Empty filter: `nothing here yet. six projects, all live.`
- Form success: `sent. I reply within two days.`
- 404: `this frame is missing. the work is not.`
- Contact meta: `Jakarta, GMT+7` / `open to freelance and full-time`

### Hero headline options

| # | Headline | Sub-line | Assessment |
|---|---|---|---|
| 1 | Web development, cut with care. | Web developer in Jakarta. Multimedia instincts, production discipline. | Distinctive and on-concept, but "cut" needs the rest of the site to pay it off. |
| 2 | I design the interface. Then I build it. | Web developer in Jakarta working in Next.js and React, with a multimedia background and an interest in AI. | Clearest positioning, two-beat rhythm, easy to animate line by line. |
| 3 | From storyboard to shipped product. | Design-led development for real users, not demos. | Process-led and credible, but "shipped" and "storyboard" are common portfolio language. |

Recommendation: **#2**, with the mono kicker `FRONT-END / DESIGN ENGINEER` above it and the word
"build" carrying the accent colour. Keep #1 as the loader sign-off line ("cut with care") so the
concept still lands without costing the headline its clarity.

Indonesian alternates for later (do not ship in v1): "Saya rancang antarmukanya, lalu saya
bangun produknya." / "Dari papan cerita ke produk yang dipakai."

---

## 6. Non-goals for v1

- No runtime 3D, no Spline scene, no WebGL hero.
- No video backgrounds or autoplay reels.
- No CMS, blog, or auth.
- No fake counters, testimonials, or client logos.
- No custom cursor on touch or coarse pointers.
- No emoji anywhere, including metadata and console output.
- No duplicated light/dark image sets; theme is token-swapped.

---

## 7. Content TODOs (blocked on Raditya)

- Approve one-line descriptions for the six projects (draft from `AGENTS.md`, needs his words).
- Confirm whether team projects should name teammates or only the role.
- Provide GitHub, LinkedIn, and Instagram URLs if they should appear; none are in the brief.
- Provide a CV PDF if the site should offer a download; otherwise omit.
- Confirm availability sentence for the contact section.
- Approve the footer signature line.
