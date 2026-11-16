export type Experience = {
  role: string;
  organization: string;
  period: string;
  summary: string;
};

export const experience: ReadonlyArray<Experience> = [
  {
    role: "Graphic Design Staff",
    organization: "Kominfo Division, Himpunan Mahasiswa Sistem Informasi UBSI",
    period: "2025 - now",
    summary: "Posters, banners, Instagram feeds, and flyers.",
  },
  {
    role: "Content Design and Editor",
    organization: "PKL at KFT",
    period: "Apr - Sep 2023",
    summary: "Social media visuals, photo and video editing in a professional production environment.",
  },
  {
    role: "Videographer and Editor",
    organization: "SMK Pusaka 1 Jakarta competency exam",
    period: "2024",
    summary: "Full video production for the competency exam.",
  },
];

export const education: ReadonlyArray<Experience> = [
  {
    role: "Sistem Informasi",
    organization: "Universitas Bina Sarana Informatika",
    period: "2025 - now",
    summary: "Current degree.",
  },
  {
    role: "Multimedia",
    organization: "SMK Pusaka 1 Jakarta",
    period: "2021 - 2024",
    summary: "Vocational foundation in multimedia.",
  },
];

export const skillGroups = [
  { label: "Familiar", items: ["React.js", "Next.js", "HTML", "CSS", "JavaScript"] },
  { label: "Basic", items: ["Python", "PHP", "Laravel", "MySQL"] },
  { label: "Tools", items: ["Git", "GitHub", "Vercel", "Canva", "Figma", "CapCut"] },
] as const;

export const languages = [
  { label: "Indonesian", level: "Active" },
  { label: "English", level: "Passive" },
  { label: "Korean", level: "Passive" },
] as const;
