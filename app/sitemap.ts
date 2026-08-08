import type { MetadataRoute } from "next";
import { routeMap } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fin-living-colour.subhayu435824.chatgpt.site";
  return [...Object.values(routeMap.en), ...Object.values(routeMap.fr)].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "/en" || path === "/fr" ? "weekly" : "monthly", priority: path === "/en" || path === "/fr" ? 1 : 0.7 }));
}
