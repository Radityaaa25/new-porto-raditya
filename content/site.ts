export const site = {
  name: "Raditya Ananda Satria",
  shortName: "Raditya",
  initials: "RA",
  role: "Web developer and designer",
  location: "Jakarta, Indonesia",
  timeZone: "Asia/Jakarta",
  timeZoneLabel: "GMT+7",
  email: "radityaanandasatria@gmail.com",
  headline: "I design the interface. Then I build it.",
  heroKicker: "Front-end / Design engineer",
  heroLines: ["I design the interface.", "Then I build it."] as const,
  heroAccent: "build",
  // TODO: pending approval of hero option 2 from docs/creative-direction.md
  intro:
    "Front-end developer in Jakarta working in Next.js, React, and a multimedia background.",
  // TODO: Raditya to confirm availability line before launch.
  availability: null,
  // TODO: add GitHub, LinkedIn, Instagram URLs if they should appear.
  socials: [] as ReadonlyArray<{ label: string; href: string }>,
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNote = "Dibuat di Jakarta";
