# Copy audit

Scope: every user-facing string in `content/en.ts` and `content/id.ts` was read. The table below
records the lines that changed; unchanged lines were reviewed and kept because they were already
clear and specific. No facts were added beyond the CV and the project brief.

## Pronoun decision (Indonesian)

Indonesian copy uses first person **saya**. It does not use **aku**, **gue**, or possessive **-ku**.
The subject is dropped when the sentence already makes the actor clear, which keeps the tone modern
and direct instead of repeating "saya" in every line. "Kamu" appears only in second-person form
prompts and form feedback, where it reads naturally.

## English

| Key | Old | New | Reason |
| --- | --- | --- | --- |
| `preloader.sign` | Cut with care. | Built with care. | "Cut" reads like a film metaphor; the site is built. |
| `home.work.title` | Projects with a pulse. | Projects I have shipped. | Removes an empty marketing line and says what the section contains. |
| `home.work.intro` | Shipped sites: personal tools, team builds, and a hackathon entry. Screenshots are real, links are live. | Six live sites: personal tools, team builds, and a hackathon entry. Screenshots come from the real sites. | Specific count and plainer wording. |
| `home.aboutTeaser.title` | Multimedia first. Code after. | From multimedia to code. | Keeps the background but drops the forced word order. |
| `home.aboutTeaser.currently` | Learning Laravel and backend basics. | Leading Scaffdev as project manager and full-stack developer. Exploring AI integration in web products. | The old line contradicted the Scaffdev work. The new lines use only the brief and CV. |
| `home.process.title` | How a build moves. | How I build. | Direct and human. |
| `home.process.intro` | Four steps I actually repeat. No discovery theatre. | Four steps I repeat on every project. | Removes jargon and defensive phrasing. |
| `home.capabilities.title` | One loop: design, build, ship. | How I work: design, build, ship. | Clear and consistent with the process section. |
| `home.capabilities.intro` | Three things I actually do on a project, in the order they happen. | Three things I do on a project, in the order they happen. | Removes the filler "actually". |
| `home.closing.title` | Need a site that feels considered? | Tell me what you are building. | Removes the vague question and gives the visitor a next action. |
| `home.closing.body` | Email is the fastest route. Jakarta, GMT+7. | Email is the fastest way to reach me. Jakarta, GMT+7. | Natural sentence instead of a fragment. |
| `home.toolbox.title` | The working set. | Tools I actually use. | Specific and easier to scan. |
| `home.toolbox.intro` | Grouped by how I actually use them. Familiar first, basic where I am still learning. | Grouped by how I use them. Familiar tools first; basics where I am still learning. | Less filler, same honest skill framing. |
| `home.highlights.title` | Facts, not vanity metrics. | A quick count. | Stops arguing with the reader and simply labels the section. |
| `home.highlights.intro` | Numbers taken from what is actually on this site and in my CV. | Pulled from this site and my CV. | Shorter and specific. |
| `contact.intro` | Tell me what you are making. Email is the fastest route; the form opens your mail client if no delivery channel is configured. | Tell me what you are making. Email is the fastest route; the form opens your email app if no delivery service is connected. | Plainer language for the same behavior. |
| `contact.form.successBody` | Your mail client should open with the message. | Your email app should open with the message. | Consistent with the contact intro. |
| `contact.form.fallback` | This form uses your mail client because no delivery service is configured yet. | This form opens your email app because no delivery service is connected yet. | Describes the result, not the implementation. |
| `projectCopy.vascode.description` | The site had to present several production disciplines without losing one clear identity. | The site needed to show several production disciplines without losing one clear identity. | Natural verb and tense. |
| `home.marquee` | Web developer, Interface designer, Multimedia background, Next.js, React | Adds Laravel, AI | Reflects Scaffdev and the current backend and AI work. |

## Indonesian

| Key | Old | New | Reason |
| --- | --- | --- | --- |
| `preloader.statuses[3]` | Siap kapan pun kamu siap | Siap saat kamu siap. | Shorter and less repetitive. |
| `preloader.sign` | Digarap dengan teliti. | Dibuat dengan teliti. | "Dibuat" is the natural verb for a website. |
| `hero.lines` | Saya rancang antarmukanya. / Lalu saya bangun. | Antarmuka saya rancang. / Lalu saya bangun. | Keeps the reveal rhythm and drops an unnecessary pronoun. |
| `hero.intro` | Web developer di Jakarta yang bekerja dengan Next.js dan React, berlatar multimedia dan tertarik pada AI. | Web developer di Jakarta. Bekerja dengan Next.js dan React, berlatar multimedia, dan tertarik pada AI. | Short sentences, active voice. |
| `home.statement.label` | Pendirian | Pendekatan | "Pendirian" reads like a stance or foundation, not a working approach. |
| `home.statement.body` | Saya peduli pada rasa sebuah antarmuka sebelum ia dijelaskan... | Saya peduli pada rasa antarmuka sebelum dijelaskan... | Removes stiff pronouns and filler. |
| `home.work.title` | Proyek yang punya denyut. | Proyek yang sudah saya bangun. | The old line was a literal translation and did not sound natural. |
| `home.work.intro` | ... Screenshot asli, tautannya hidup. | ... Tangkapan layar asli, tautannya hidup. | Consistent Indonesian term while keeping "screenshot" out of body copy. |
| `about.title` | Terlatih desain. Berlatih jadi developer. | Berlatar desain, berlatih jadi developer. | Keeps the meaning with a more natural parallel. |
| `about.profile` | Saya bangun antarmuka... Jalan saya mulai dari multimedia... | Saya membangun antarmuka... Saya mulai dari multimedia... | Active voice and a direct first-person sentence. |
| `home.aboutTeaser.title` | Multimedia dulu. Kode setelahnya. | Dari multimedia ke kode. | Natural phrase instead of a literal contrast. |
| `home.aboutTeaser.currently` | Belajar Laravel dan dasar backend. | Memimpin tim Scaffdev sebagai project manager dan full-stack developer. Mengeksplorasi integrasi AI di produk web. | Aligns with the Scaffdev role without overstating the CV skill levels. |
| `home.process.title` | Cara sebuah build bergerak. | Cara saya membangun. | Drops the metaphor. |
| `home.process.intro` | Empat langkah yang benar-benar saya ulang. Tanpa teater discovery. | Empat langkah yang saya pakai di tiap proyek. | Removes jargon. |
| `home.capabilities.title` | Satu alur: desain, bangun, rilis. | Cara saya bekerja: desain, bangun, rilis. | Clearer section label. |
| `home.capabilities.intro` | Tiga hal yang benar-benar saya kerjakan, sesuai urutannya. | Tiga hal yang saya kerjakan di tiap proyek, sesuai urutannya. | Less filler and more specific. |
| `home.closing.title` | Butuh situs yang terasa dipikirkan? | Punya proyek yang ingin dibangun? | Plain question that invites a reply. |
| `home.closing.body` | Email adalah jalur tercepat. | Email cara tercepat. | Shorter conversational sentence. |
| `home.toolbox.title` | Perangkat kerja. | Alat yang saya pakai. | More direct and personal. |
| `home.toolbox.intro` | ... Yang familiar dulu, yang masih dasar jujur diakui. | ... Yang familiar dulu, yang masih dasar saya akui. | Natural phrasing without extra filler. |
| `home.highlights.label` | Sorotan | Rekap | "Sorotan" sounds like a highlight reel; these are counts. |
| `home.highlights.title` | Fakta, bukan angka pajangan. | Angka yang bisa dicek. | Confident without sounding defensive. |
| `home.highlights.intro` | Angka yang memang ada di situs ini dan di CV saya. | Hitungan dari situs ini dan CV saya. | Shorter. |
| `work.intro` | ... tautan hidup. | ... tautan ke situs aslinya. | Clearer meaning. |
| `work.detail.liveLabel` | Situs hidup | Situs live | Natural Indonesian with the tech term kept in English. |
| `contact.intro` | ... mail client ... belum disetel. | ... aplikasi email ... belum tersambung. | Plain language for the same behavior. |
| `contact.baseBody` | Email adalah cara tercepat untuk menghubungi saya. | Email cara tercepat untuk menghubungi saya. | Conversational and still complete. |
| `contact.form.namePlaceholder` | Nama kamu | Nama lengkap | More useful form hint. |
| `contact.form.messagePlaceholder` | Sedang membangun apa? | Apa yang sedang kamu bangun? | Full sentence reads better. |
| `contact.form.successBody` | Mail client kamu akan terbuka... | Aplikasi email kamu akan terbuka... | Consistent term. |
| `contact.form.fallback` | ... memakai mail client ... belum disetel. | ... membuka aplikasi email ... belum tersambung. | Describes what happens. |
| `notFound.body` | ... Indeks karya tempat paling gampang untuk mulai lagi. | ... Indeks karya bisa jadi titik mulai. | Less casual, more polished. |
| `projectCopy.clarise.description` | Di dalamnya ada ... produknya menyimpan banyak status belajar. | Ada ... banyak status belajar di dalamnya. | Removes stiff pronoun and literal translation. |
| `projectCopy.vascode.description` | Situsnya harus menampilkan... | Situsnya perlu menampilkan... | Softer, natural obligation. |
| `projectCopy.nana-bites.description` | ... tetap dekat dengan cara bisnisnya memang melayani pelanggan. | ... mengikuti cara bisnisnya memang melayani pelanggan. | Clearer relationship between ordering and the business. |

## Notes

- The tone is consistent across home, about, work, project details, contact, footer, toasts,
  loader messages, 404, metadata, and aria-labels.
- English stays direct and specific. Indonesian stays conversational without corporate jargon.
- "Aku" and "gue" do not appear anywhere. The "saya" tone does not feel wrong in the existing
  sections; the only place a first-person pronoun is repeated heavily is the about profile, and
  those sentences need a subject.
- Counter labels in Home Highlights were intentionally left unchanged. Two stronger alternatives
  using only true facts are in `docs/qa/proposals.md`.
