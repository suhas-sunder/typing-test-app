import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-links";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/typing-test",
    "/lessons",
    "/games",
    "/games/calculator",
    "/learn",
    "/about",
    "/contact",
    "/sitemap",
    "/socials",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/typing-test" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/typing-test" ? 0.9 : 0.7,
  }));
}
