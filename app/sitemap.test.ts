import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("XML sitemap", () => {
  it("excludes local progress and removed credential routes", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(paths).not.toContain("/progress");
    expect(paths).not.toContain("/login");
    expect(paths).not.toContain("/register");
  });
});

