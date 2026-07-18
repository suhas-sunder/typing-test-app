import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-links";
import { getIndexablePaths } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = getIndexablePaths();
  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" || path === "/typing-test" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/typing-test" ? 0.9 : 0.7,
  }));
}
