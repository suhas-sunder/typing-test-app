import { describe, expect, it } from "vitest";
import { actionFromBeforeInput, actionFromKeydown, actionFromVirtualKey } from "@/lib/typing/input";

describe("typing input policy", () => {
  it("accepts ordinary, spaced, and shifted characters", () => {
    expect(actionFromKeydown({ key: "a" })).toEqual({ type: "character", key: "a" });
    expect(actionFromKeydown({ key: " " })).toEqual({ type: "character", key: " " });
    expect(actionFromKeydown({ key: "A" })).toEqual({ type: "character", key: "A" });
    expect(actionFromKeydown({ key: "!" })).toEqual({ type: "character", key: "!" });
  });

  it("does not track modifiers, controls, shortcuts, or unsupported keys", () => {
    for (const input of [
      { key: "Shift" },
      { key: "Control" },
      { key: "Escape" },
      { key: "Tab" },
      { key: "r", ctrlKey: true },
      { key: "c", metaKey: true },
      { key: "x", altKey: true },
    ]) {
      expect(actionFromKeydown(input)).toBeNull();
    }
  });

  it("rejects held key repeats deliberately", () => {
    expect(actionFromKeydown({ key: "a", repeat: true })).toBeNull();
    expect(actionFromKeydown({ key: "Backspace", repeat: true })).toBeNull();
    expect(actionFromKeydown({ key: "Enter", repeat: true })).toBeNull();
  });

  it("ignores incomplete composition input", () => {
    expect(actionFromKeydown({ key: "Process", isComposing: true })).toBeNull();
    expect(actionFromBeforeInput({ data: "a", inputType: "insertCompositionText", isComposing: true, isTrusted: true })).toBeNull();
  });

  it("accepts trusted mobile text and deletion input", () => {
    expect(actionFromBeforeInput({ data: "a", inputType: "insertText", isTrusted: true })).toEqual({ type: "character", key: "a" });
    expect(actionFromBeforeInput({ data: null, inputType: "deleteContentBackward", isTrusted: true })).toEqual({ type: "backspace" });
  });

  it("rejects paste, multi-character, and programmatic before-input", () => {
    expect(actionFromBeforeInput({ data: "abc", inputType: "insertFromPaste", isTrusted: true })).toBeNull();
    expect(actionFromBeforeInput({ data: "abc", inputType: "insertText", isTrusted: true })).toBeNull();
    expect(actionFromBeforeInput({ data: "a", inputType: "insertText", isTrusted: false })).toBeNull();
  });

  it("gives physical and virtual characters the same action shape", () => {
    expect(actionFromKeydown({ key: "A" })).toEqual(actionFromVirtualKey("A"));
    expect(actionFromKeydown({ key: "Backspace" })).toEqual(actionFromVirtualKey("Backspace"));
  });
});
