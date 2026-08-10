import type { MetadataRoute } from "next";
import { marketCategoryPageSlugs, marketCategoryPath, routeMap } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fin-living-colour.subhayu435824.chatgpt.site";
  const topLevel = [...Object.values(routeMap.en), ...Object.values(routeMap.fr)];
  const categories = (["en", "fr"] as const).flatMap((locale) =>
    marketCategoryPageSlugs.map((slug) => marketCategoryPath(locale, slug)),
  );
  return [...topLevel, ...categories].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/en" || path === "/fr" ? "weekly" : "monthly",
    priority: path === "/en" || path === "/fr" ? 1 : path.includes("/market/") || path.includes("/poissonnerie/") ? 0.6 : 0.7,
  }));
}
