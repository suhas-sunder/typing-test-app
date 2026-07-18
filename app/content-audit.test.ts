import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getIndexablePaths, getNoindexPaths } from "@/lib/routes";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : /\.(ts|tsx)$/.test(name) && !name.includes(".test.") ? [path] : [];
  });
}

describe("launch content and navigation audit", () => {
  const activeSource = [...sourceFiles(join(process.cwd(), "app")), ...sourceFiles(join(process.cwd(), "components")), readFileSync(join(process.cwd(), "lib/site-links.ts"), "utf8")]
    .map((entry) => typeof entry === "string" && entry.endsWith(".ts") || entry.endsWith(".tsx") ? readFileSync(entry, "utf8") : entry)
    .join("\n");

  it("contains no stale product, account-action, removed-game, or unfinished language", () => {
    expect(activeSource).not.toMatch(/Word Dash|Drill Streak|Student Path|Sign in|Sign up|Create account|Coming soon|Under development|30-lesson|first MVP/i);
  });

  it("keeps creator and similar-project destinations separate and accurate", () => {
    const links = readFileSync(join(process.cwd(), "lib/site-links.ts"), "utf8");
    expect(links).toContain("creatorLinks");
    expect(links).toContain("similarProjectLinks");
    expect(links).toContain("MorseWords");
    expect(links).toContain("I Love Word Search");
    expect(links).toContain("iLoveSVG");
  });

  it("contains no duplicate review or rating schema", () => {
    expect(activeSource).not.toMatch(/AggregateRating|ratingValue|reviewCount/);
  });

  it("keeps every literal internal destination on a real non-redirect route", () => {
    const allowed = new Set([...getIndexablePaths(), ...getNoindexPaths()]);
    const literalHrefs = [...activeSource.matchAll(/href\s*[:=]\s*["'](\/[^"]*?)["']/g)].map((match) => match[1]);
    const paths = literalHrefs.map((href) => href.split(/[?#]/)[0]);
    expect(paths.filter((path) => !allowed.has(path))).toEqual([]);
  });

  it("links the homepage to every implemented primary product destination", () => {
    const home = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    for (const href of ["/typing-test", "/lessons", "/typing-practice", "/learn", "/games/calculator", "/progress"]) {
      expect(home).toContain(href);
    }
  });
});
