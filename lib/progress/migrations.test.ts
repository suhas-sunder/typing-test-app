import { describe, expect, it } from "vitest";
import { readLocalProgress } from "@/lib/progress/repository";
import {
  LEGACY_RESULTS_KEY,
  PREVIOUS_PROGRESS_STORAGE_KEY,
  PROGRESS_STORAGE_KEY,
  VERSION_THREE_PROGRESS_STORAGE_KEY,
  VERSION_TWO_PROGRESS_STORAGE_KEY,
} from "@/lib/progress/types";

describe("legacy progress migration failures", () => {
  it.each([
    ["v4", PREVIOUS_PROGRESS_STORAGE_KEY],
    ["v3", VERSION_THREE_PROGRESS_STORAGE_KEY],
    ["v2", VERSION_TWO_PROGRESS_STORAGE_KEY],
    ["v1 results", LEGACY_RESULTS_KEY],
  ])("fails safely for malformed %s JSON without writing v5", (_version, sourceKey) => {
    const storage = new MemoryStorage({ [sourceKey]: "{malformed" });

    const result = readLocalProgress(storage);

    expect(result.status).toBe("corrupt");
    expect(result.migrated).toBe(false);
    expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBeNull();
    expect(storage.getItem(sourceKey)).toBe("{malformed");
  });
});

class MemoryStorage {
  private readonly values: Map<string, string>;

  constructor(seed: Record<string, string>) {
    this.values = new Map(Object.entries(seed));
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}
