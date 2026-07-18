import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { metadata } from "@/app/typing-test/page";

describe("typing-test route", () => {
  it("keeps one canonical indexable typing-test route", () => {
    expect(metadata.alternates).toMatchObject({ canonical: "/typing-test" });
    expect(metadata.title).toEqual({ absolute: "Free Typing Speed Test | FreeTypingCamp" });
    expect(sitemap().filter((entry) => new URL(entry.url).pathname.startsWith("/typing-test"))).toHaveLength(1);
  });
});
