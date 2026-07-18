import { describe, expect, it } from "vitest";
import { buildThemeBootstrapScript } from "@/lib/themes/bootstrap";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/types";

describe("theme bootstrap", () => {
  it("is SSR safe and reads only the canonical browser record at execution time", () => {
    const script = buildThemeBootstrapScript();
    expect(script).toContain(PROGRESS_STORAGE_KEY);
    expect(script).toContain("document.documentElement");
    expect(script).toContain("localStorage.getItem");
    expect(script).not.toContain("fetch(");
  });
});
