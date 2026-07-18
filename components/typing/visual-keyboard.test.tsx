import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VisualKeyboard } from "@/components/typing/visual-keyboard";
import { buildTypingText } from "@/lib/typing/content";
import { buildCompactSymbolRows, keyOutput, MOBILE_KEYBOARD } from "@/lib/typing/keyboard";

describe("VisualKeyboard", () => {
  it("covers every character currently generated at compact widths", () => {
    for (const mode of ["words", "quote"] as const) {
      for (const difficulty of ["easy", "medium", "hard"] as const) {
        for (const duration of [15, 30, 60, 120, 300]) {
          const text = buildTypingText({ mode, difficulty, duration, seed: 0 });
          const available = compactCharactersFor(text);
          expect([...text].filter((character) => !available.has(character))).toEqual([]);
        }
      }
    }

    for (const punctuation of [false, true]) {
      for (const numbers of [false, true]) {
        const text = buildTypingText({ mode: "words", difficulty: "hard", duration: 300, punctuation, numbers, seed: 71 });
        const available = compactCharactersFor(text);
        expect([...text].filter((character) => !available.has(character))).toEqual([]);
      }
    }
  });

  it("includes the previously missing G and H compact keys", () => {
    const values = MOBILE_KEYBOARD.flat().map((key) => key.value);
    expect(values).toContain("g");
    expect(values).toContain("h");
  });

  it("uses Shift for uppercase virtual input and resets after one character", () => {
    const onKeyPress = vi.fn();
    render(<VisualKeyboard expectedKey="A" onKeyPress={onKeyPress} />);

    fireEvent.click(screen.getAllByRole("button", { name: "Shift" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "A" })[0]);
    expect(onKeyPress).toHaveBeenCalledWith("A");
    expect(screen.getAllByRole("button", { name: "Shift" })[0]).toHaveAttribute("aria-pressed", "false");
  });

  it("uses the secondary layer for punctuation characters", () => {
    const onKeyPress = vi.fn();
    render(<VisualKeyboard expectedKey="!" onKeyPress={onKeyPress} />);

    fireEvent.click(screen.getAllByRole("button", { name: "!" })[0]);
    expect(onKeyPress).toHaveBeenCalledWith("!");
  });

  it("keeps inert modifier labels out of the tab order", () => {
    render(<VisualKeyboard expectedKey="a" onKeyPress={() => undefined} />);
    expect(screen.queryByRole("button", { name: "Tab" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Control" })).not.toBeInTheDocument();
  });

  it("uses fill and text focus treatment without adding a focus ring", () => {
    render(<VisualKeyboard expectedKey="a" onKeyPress={() => undefined} />);
    const key = screen.getAllByRole("button", { name: "A" })[0];
    expect(key.className).toContain("focus-visible:bg-camp-orange");
    expect(key.className).not.toContain("focus-visible:ring");
  });
});

function compactCharactersFor(text: string) {
  const available = new Set<string>([" "]);
  for (const key of [...MOBILE_KEYBOARD.flat(), ...buildCompactSymbolRows(text).flat()]) {
    if (key.action === "character") {
      available.add(keyOutput(key, false));
      available.add(keyOutput(key, true));
    }
  }
  return available;
}
