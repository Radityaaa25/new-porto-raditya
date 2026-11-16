import type { Metadata } from "next";

import type { Locale } from "@/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://raditya.vercel.app";

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
      canonical: `/${locale}${clean}`,
      languages: {
        en: `/en${clean}`,
        id: `/id${clean}`,
        "x-default": `/en${clean}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${clean}`,
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

export const siteUrl = baseUrl;
