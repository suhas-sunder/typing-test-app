import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { metadata as home } from "@/app/page";
import { metadata as typingTest } from "@/app/typing-test/page";
import { metadata as lessons } from "@/app/lessons/page";
import { generateMetadata as unitMetadata } from "@/app/lessons/[unitId]/page";
import { metadata as practiceHub } from "@/app/typing-practice/page";
import { generateMetadata as practiceMetadata } from "@/app/typing-practice/[practiceId]/page";
import { metadata as calculator } from "@/app/games/calculator/page";
import { metadata as learn } from "@/app/learn/page";
import { metadata as about } from "@/app/about/page";
import { metadata as contact } from "@/app/contact/page";
import { metadata as privacy } from "@/app/privacy/page";
import { metadata as terms } from "@/app/terms/page";
import { metadata as cookies } from "@/app/cookies/page";
import { metadata as accessibility } from "@/app/accessibility/page";
import { CURRICULUM_UNITS } from "@/lib/curriculum/registry";
import { PRACTICE_DEFINITIONS } from "@/lib/practice/registry";
import { getIndexablePaths, getNoindexPaths, REDIRECT_ROUTES } from "@/lib/routes";
import { WEB_APPLICATION_JSON_LD, WEBSITE_JSON_LD } from "@/lib/seo";

function absoluteTitle(metadata: Metadata) {
  const title = metadata.title;
  return typeof title === "object" && title && "absolute" in title ? title.absolute : title;
}

describe("final canonical and indexing inventory", () => {
  it("keeps one explicit 26-route indexable inventory", () => {
    expect(getIndexablePaths()).toHaveLength(26);
    expect(new Set(getIndexablePaths()).size).toBe(26);
    expect(getNoindexPaths()).toHaveLength(48);
    expect(REDIRECT_ROUTES).toEqual([
      { source: "/dashboard", destination: "/progress", status: 307 },
      { source: "/games", destination: "/games/calculator", status: 308 },
    ]);
  });

  it("gives every indexable route unique complete metadata", async () => {
    const dynamicUnits = await Promise.all(CURRICULUM_UNITS.map((unit) => unitMetadata({ params: Promise.resolve({ unitId: unit.id }) })));
    const dynamicPractice = await Promise.all(PRACTICE_DEFINITIONS.map((practice) => practiceMetadata({ params: Promise.resolve({ practiceId: practice.id }) })));
    const all = [home, typingTest, lessons, practiceHub, calculator, learn, about, contact, privacy, terms, cookies, accessibility, ...dynamicUnits, ...dynamicPractice];
    expect(all).toHaveLength(26);

    const titles = all.map(absoluteTitle);
    const descriptions = all.map((item) => item.description);
    expect(new Set(titles).size).toBe(26);
    expect(new Set(descriptions).size).toBe(26);
    all.forEach((item) => {
      expect(absoluteTitle(item)).toEqual(expect.any(String));
      expect(item.description).toEqual(expect.any(String));
      expect(item.alternates?.canonical).toEqual(expect.any(String));
      expect(item.openGraph).toMatchObject({ title: expect.any(String), description: expect.any(String), url: expect.any(String) });
      expect(item.robots).not.toMatchObject({ index: false });
    });
  });

  it("uses the non-www canonical host consistently in sitemap and robots", () => {
    expect(sitemap().every((entry) => entry.url.startsWith("https://freetypingcamp.com"))).toBe(true);
    const robots = readFileSync(join(process.cwd(), "public/robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://freetypingcamp.com/sitemap.xml");
    expect(robots).not.toContain("www.freetypingcamp.com");
    expect(robots).not.toContain("Crawl-delay");
  });

  it("serves the exact authorized seller line once", () => {
    const ads = readFileSync(join(process.cwd(), "public/ads.txt"), "utf8").trim().split(/\r?\n/);
    expect(ads.filter((line) => line === "google.com, pub-4810616735714570, DIRECT, f08c47fec0942fa0")).toHaveLength(1);
  });

  it("emits only factual WebSite and WebApplication structured-data types", () => {
    const layout = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
    const homeSource = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    const allSource = `${layout}\n${homeSource}`;
    expect(allSource.match(/application\/ld\+json/g)).toHaveLength(2);
    expect([WEBSITE_JSON_LD["@type"], WEB_APPLICATION_JSON_LD["@type"]]).toEqual(["WebSite", "WebApplication"]);
    expect(JSON.stringify([WEBSITE_JSON_LD, WEB_APPLICATION_JSON_LD])).not.toMatch(/AggregateRating|Review|Course|ratingValue/);
  });
});
