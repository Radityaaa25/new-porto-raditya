import { en } from "./en";
import { id } from "./id";
import type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, id };

export const locales: ReadonlyArray<Locale> = ["en", "id"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "id";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "id" : "en";
}

export type { Dictionary, Locale } from "./types";
export { getProjects, getProject, getNextProject, getProjectSlugs, featuredSlugs } from "./projects";
export { getExperience, getEducation, getSkillGroups, getLanguages } from "./experience";
