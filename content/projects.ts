import { en } from "./en";
import { id } from "./id";
import type { Locale, Project, ProjectBase, ProjectCopy } from "./types";

// TODO(Raditya): confirm each project year. 2026 is the year printed on every live site.
const bases: ReadonlyArray<ProjectBase> = [
  {
    slug: "scaffdev",
    url: "https://scaffdev.my.id",
    role: "Team",
    year: "2026",
    stack: ["Next.js", "Laravel", "AI", "Supabase", "Xendit", "Cloudinary", "Resend"],
    details: true,
    flagship: true,
  },
  {
    slug: "clarise",
    url: "https://clarise.my.id",
    role: "Personal",
    year: "2026",
    stack: ["Next.js", "React", "AI"],
    details: true,
    flagship: true,
  },
  {
    slug: "safetrack-depin",
    url: "https://safetrack-depin.vercel.app",
    role: "Team",
    year: "2026",
    stack: ["Next.js", "IoT", "AI"],
    details: true,
  },
  {
    slug: "vascode",
    url: "https://vascode.vercel.app",
    role: "Team",
    year: "2026",
    stack: ["Next.js", "Video", "Photo"],
    details: true,
  },
  {
    slug: "pentas-seni",
    url: "https://pentas-seni-tk-v2.vercel.app",
    role: "Personal",
    year: "2026",
    stack: ["Next.js", "Tickets"],
    details: false,
  },
  {
    slug: "nana-bites",
    url: "https://nana-bites.vercel.app",
    role: "Personal",
    year: "2026",
    stack: ["Next.js", "WhatsApp"],
    details: true,
  },
];

const dictionaries = { en, id } as const;

export const projectBases = bases;

export function getProjects(locale: Locale): ReadonlyArray<Project> {
  const copy = dictionaries[locale].projectCopy as Record<string, ProjectCopy>;
  return bases.map((base) => ({ ...base, ...copy[base.slug] }));
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getProjectSlugs(): ReadonlyArray<string> {
  return bases.map((project) => project.slug);
}

export function getNextProject(locale: Locale, slug: string): Project {
  const list = getProjects(locale);
  const index = list.findIndex((project) => project.slug === slug);
  return list[(index + 1) % list.length];
}

export const featuredSlugs = ["scaffdev", "clarise", "safetrack-depin", "vascode"] as const;
