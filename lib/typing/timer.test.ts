import { describe, expect, it } from "vitest";
import {
  completeActiveTimer,
  createActiveTimer,
  elapsedActiveTime,
  pauseActiveTimer,
  resumeActiveTimer,
  startActiveTimer,
} from "@/lib/typing/timer";

describe("active typing timer", () => {
  it("starts once and measures timestamps rather than callback counts", () => {
    const started = startActiveTimer(createActiveTimer(), 1_000);
    expect(elapsedActiveTime(started, 8_250)).toBe(7_250);
    expect(startActiveTimer(started, 9_000)).toBe(started);
  });

  it("pauses hidden time and resumes without a jump", () => {
    const started = startActiveTimer(createActiveTimer(), 1_000);
    const hidden = pauseActiveTimer(started, 4_000);
    expect(elapsedActiveTime(hidden, 40_000)).toBe(3_000);

    const visible = resumeActiveTimer(hidden, 40_000);
    expect(elapsedActiveTime(visible, 42_000)).toBe(5_000);
  });

  it("makes repeated visibility transitions idempotent", () => {
    const started = startActiveTimer(createActiveTimer(), 0);
    const hidden = pauseActiveTimer(started, 1_000);
    expect(pauseActiveTimer(hidden, 5_000)).toBe(hidden);

    const visible = resumeActiveTimer(hidden, 5_000);
    expect(resumeActiveTimer(visible, 6_000)).toBe(visible);
  });

  it("does not start or change before the first accepted input", () => {
    const initial = createActiveTimer();
    expect(elapsedActiveTime(initial, 5_000)).toBe(0);
    expect(pauseActiveTimer(initial, 5_000)).toBe(initial);
    expect(resumeActiveTimer(initial, 5_000)).toBe(initial);
  });

  it("completes exactly once and ignores later visibility changes", () => {
    const started = startActiveTimer(createActiveTimer(), 0);
    const completed = completeActiveTimer(started, 2_500);
    expect(elapsedActiveTime(completed, 50_000)).toBe(2_500);
    expect(completeActiveTimer(completed, 60_000)).toBe(completed);
    expect(pauseActiveTimer(completed, 60_000)).toBe(completed);
    expect(resumeActiveTimer(completed, 60_000)).toBe(completed);
  });

  it("never subtracts time when a timestamp moves backwards", () => {
    const started = startActiveTimer(createActiveTimer(), 1_000);
    expect(elapsedActiveTime(started, 500)).toBe(0);
  });
});
