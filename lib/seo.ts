import type { Metadata } from "next";

import type { Locale } from "@/content";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://raditya-as.vercel.app").replace(/\/+$/, "");

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const clean = path === "/" ? "" : path;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}${clean}`,
      languages: {
        en: `${siteUrl}/en${clean}`,
        id: `${siteUrl}/id${clean}`,
        "x-default": `${siteUrl}/en${clean}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}${clean}`,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

