import type { MetadataRoute } from "next";

import { en } from "@/content/en";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: en.meta.title,
    short_name: site.shortName,
    description: en.meta.description,
    start_url: "/en",
    display: "standalone",
    background_color: "#0d0e10",
    theme_color: "#0d0e10",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
