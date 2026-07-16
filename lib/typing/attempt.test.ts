import { describe, expect, it } from "vitest";
import { applyTypingInput, createTypingAttempt, summarizeTypingAttempt } from "@/lib/typing/attempt";

describe("typing attempt state", () => {
  it("tracks correct and incorrect keypresses without conflating display state", () => {
    let state = createTypingAttempt("ab");
    state = applyTypingInput(state, { type: "character", key: "a" }).state;
    state = applyTypingInput(state, { type: "character", key: "x" }).state;

    expect(state.statuses).toEqual(["correct", "error"]);
    expect(summarizeTypingAttempt(state)).toEqual({
      correctedErrors: 0,
      correctKeystrokes: 1,
      incorrectKeypresses: 1,
      trackedKeystrokes: 2,
      uncorrectedErrors: 1,
    });
  });

  it("retains a corrected mistake after backspace and correction", () => {
    let state = createTypingAttempt("a");
    state = applyTypingInput(state, { type: "character", key: "x" }).state;
    state = applyTypingInput(state, { type: "backspace" }).state;
    state = applyTypingInput(state, { type: "character", key: "a" }).state;

    expect(state.statuses).toEqual(["correct"]);
    expect(summarizeTypingAttempt(state)).toEqual({
      correctedErrors: 1,
      correctKeystrokes: 1,
      incorrectKeypresses: 1,
      trackedKeystrokes: 2,
      uncorrectedErrors: 0,
    });
  });

  it("counts multiple corrected mistakes at the same position once each", () => {
    let state = createTypingAttempt("a");
    for (const key of ["x", "Backspace", "y", "Backspace", "a"]) {
      state = applyTypingInput(state, key === "Backspace" ? { type: "backspace" } : { type: "character", key }).state;
    }

    expect(summarizeTypingAttempt(state)).toMatchObject({ correctedErrors: 2, incorrectKeypresses: 2, uncorrectedErrors: 0 });
  });

  it("backspaces correct text without fabricating or removing mistakes", () => {
    let state = createTypingAttempt("ab");
    state = applyTypingInput(state, { type: "character", key: "a" }).state;
    state = applyTypingInput(state, { type: "backspace" }).state;

    expect(state.cursor).toBe(0);
    expect(state.statuses).toEqual(["idle", "idle"]);
    expect(summarizeTypingAttempt(state)).toMatchObject({ correctKeystrokes: 1, incorrectKeypresses: 0 });
  });

  it("treats repeated backspace at position zero as a harmless no-op", () => {
    const initial = createTypingAttempt("a");
    const first = applyTypingInput(initial, { type: "backspace" });
    const second = applyTypingInput(first.state, { type: "backspace" });

    expect(second.state).toBe(initial);
    expect(second.state.cursor).toBe(0);
  });

  it("signals completion only on the transition that exhausts the text", () => {
    const initial = createTypingAttempt("a");
    const complete = applyTypingInput(initial, { type: "character", key: "a" });
    const duplicate = applyTypingInput(complete.state, { type: "character", key: "a" });

    expect(complete.becameComplete).toBe(true);
    expect(duplicate.becameComplete).toBe(false);
    expect(duplicate.accepted).toBe(false);
  });

  it("creates fresh attempt-scoped metrics on restart", () => {
    const used = applyTypingInput(createTypingAttempt("a"), { type: "character", key: "x" }).state;
    const restarted = createTypingAttempt(used.text);
    expect(restarted).toEqual(createTypingAttempt("a"));
  });
});
