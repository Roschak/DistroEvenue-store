import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { JOURNAL } from "@/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/lookbook",
    "/journal",
    "/store",
    "/about",
    "/bag",
    "/checkout",
    "/account",
    "/case-study",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE.domain}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...PRODUCTS.filter((p) => p.status === "PUBLISHED").map((p) => ({
      url: `${SITE.domain}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...JOURNAL.filter((a) => a.status === "PUBLISHED").map((a) => ({
      url: `${SITE.domain}/journal/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
