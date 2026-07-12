import type { MetadataRoute } from "next";

const baseUrl = "https://freetypingcamp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/typing-test",
    "/lessons",
    "/games",
    "/games/calculator",
    "/learn",
    "/login",
    "/register",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/typing-test" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/typing-test" ? 0.9 : 0.7,
  }));
}
