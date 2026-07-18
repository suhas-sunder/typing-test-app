import { describe, expect, it } from "vitest";
import { metadata } from "@/app/progress/page";

describe("progress metadata", () => {
  it("is noindex,follow", () => {
    expect(metadata.robots).toMatchObject({ follow: true, index: false });
  });
});

