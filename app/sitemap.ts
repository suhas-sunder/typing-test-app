import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-links";
import { CURRICULUM_UNITS } from "@/lib/curriculum/registry";
import { PRACTICE_DEFINITIONS } from "@/lib/practice/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/typing-test",
    "/lessons",
    ...CURRICULUM_UNITS.map((unit) => unit.route),
    "/typing-practice",
    ...PRACTICE_DEFINITIONS.map((practice) => `/typing-practice/${practice.id}`),
    "/games/calculator",
    "/learn",
    "/about",
    "/contact",
    "/sitemap",
    "/socials",
    "/privacy",
    "/terms",
    "/cookies",
    "/accessibility",
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/typing-test" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/typing-test" ? 0.9 : 0.7,
  }));
}
