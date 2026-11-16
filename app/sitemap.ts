import type { MetadataRoute } from "next";

import { locales } from "@/content";
import { getProjectSlugs } from "@/content/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/contact"];
  const now = new Date();

  const localized = locales.flatMap((locale) =>
    pages.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [item, `${siteUrl}/${item}${path}`]),
        ),
      },
    })),
  );

  const details = locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({
      url: `${siteUrl}/${locale}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [item, `${siteUrl}/${item}/work/${slug}`]),
        ),
      },
    })),
  );

  return [...localized, ...details];
}
