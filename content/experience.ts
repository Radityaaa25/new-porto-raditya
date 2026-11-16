import { en } from "./en";
import { id } from "./id";
import type { Locale } from "./types";

const dictionaries = { en, id } as const;

export const getExperience = (locale: Locale) => dictionaries[locale].experience;
export const getEducation = (locale: Locale) => dictionaries[locale].education;
export const getSkillGroups = (locale: Locale) => dictionaries[locale].skillGroups;
export const getLanguages = (locale: Locale) => dictionaries[locale].languages;

export type { ExperienceItem, SkillGroup, SkillItem } from "./types";
