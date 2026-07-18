import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { CURRICULUM_UNITS, ENABLED_CURRICULUM_LESSONS, getLessonHref } from "@/lib/curriculum/registry";
import { PRACTICE_DEFINITIONS } from "@/lib/practice/registry";

describe("XML sitemap", () => {
  it("contains exactly the 26 canonical indexable routes", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(26);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(26);
    expect(entries.every((entry) => entry.url.startsWith("https://freetypingcamp.com"))).toBe(true);
    expect(entries.every((entry) => entry.lastModified === undefined)).toBe(true);

    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(paths).not.toContain("/progress");
    expect(paths).not.toContain("/sitemap");
    expect(paths).not.toContain("/socials");
    expect(paths).not.toContain("/dashboard");
    expect(paths).not.toContain("/games");
    expect(paths).not.toContain("/login");
    expect(paths).not.toContain("/register");
    expect(paths).toEqual(expect.arrayContaining(CURRICULUM_UNITS.map((unit) => unit.route)));
    expect(paths).toEqual(expect.arrayContaining(PRACTICE_DEFINITIONS.map((practice) => `/typing-practice/${practice.id}`)));
    for (const lesson of ENABLED_CURRICULUM_LESSONS) expect(paths).not.toContain(getLessonHref(lesson));
  });
});
