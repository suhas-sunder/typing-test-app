import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("route advertisement placement integration", () => {
  it("places the above-header banner below navigation instead of above the nav", () => {
    const frame = source("components/page-frame.tsx");
    expect(frame.indexOf("<SiteNav />")).toBeLessThan(frame.indexOf('placement="above_header"'));
  });

  it("keeps sidebar rails close to the header ad area", () => {
    expect(source("app/globals.css")).toContain("top: 1.5rem;");
    expect(source("app/globals.css")).toContain("margin-top: 3rem;");
  });

  it("places the secondary banner after the complete typing tool", () => {
    const page = source("app/typing-test/page.tsx");
    expect(page.indexOf('afterTypingSurface={<AdPlacement placement="below_header_or_tool" />}')).toBeGreaterThan(page.indexOf("<TypingTest"));
    expect(source("components/typing/typing-test.tsx").indexOf("{afterTypingSurface}")).toBeLessThan(source("components/typing/typing-test.tsx").indexOf("{shouldShowAttemptContext"));
    expect(source("components/typing/typing-test.tsx")).not.toContain("AdPlacement");
    expect(source("components/typing/visual-keyboard.tsx")).not.toContain("AdPlacement");
  });

  it("places lesson ads after the staged lesson experience and never inside its controls", () => {
    const page = source("app/lessons/lesson/[category]/[section]/[level]/page.tsx");
    expect(page).toContain('afterTypingSurface={<AdPlacement placement="below_header_or_tool" />}');
    expect(source("components/lessons/lesson-experience.tsx")).not.toContain("AdPlacement");
  });

  it("places focused-practice ads after the complete practice tool", () => {
    const page = source("components/practice/focused-practice-page.tsx");
    expect(page).toContain('afterTypingSurface={<AdPlacement placement="below_header_or_tool" />}');
    expect(source("components/practice/practice-experience.tsx")).not.toContain("AdPlacement");
  });

  it("keeps Calculator Sprint controls ad-free and gives the post-game placement 150 pixels of separation", () => {
    const page = source("app/games/calculator/page.tsx");
    expect(page.indexOf("<CalculatorSprint")).toBeLessThan(page.indexOf('className="pt-[150px]"'));
    expect(page).toContain('placement="below_header_or_tool"');
    expect(source("components/games/calculator-sprint.tsx")).not.toContain("AdPlacement");
  });

  it("does not render square content ads on live pages", () => {
    for (const path of [
      "app/page.tsx",
      "app/typing-test/page.tsx",
      "app/lessons/page.tsx",
      "app/lessons/[unitId]/page.tsx",
      "app/games/calculator/page.tsx",
      "app/learn/page.tsx",
      "app/typing-practice/page.tsx",
      "components/practice/focused-practice-page.tsx",
    ]) {
      expect(source(path)).not.toContain('placement="main_content_rectangle"');
    }
  });

  it("keeps progress explicitly ad-free", () => {
    const page = source("app/progress/page.tsx");
    expect(page).toContain('routeFamily="progress"');
    expect(page).not.toContain("AdPlacement");
  });

  it("does not make the approved keyboard or lesson hierarchy part of advertisement integration", () => {
    expect(source("components/typing/visual-keyboard.tsx")).not.toContain("@/lib/ads");
    expect(source("lib/typing/keyboard.ts")).not.toContain("ads");
    expect(source("components/lessons/lesson-experience.tsx")).not.toContain("@/lib/ads");
  });
});
