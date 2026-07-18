import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VisualKeyboard } from "@/components/typing/visual-keyboard";
import { MOBILE_KEYBOARD } from "@/lib/typing/keyboard";

describe("responsive mobile typing UI contract", () => {
  it("uses the approved compact alphabet rows instead of a permanent number row", () => {
    expect(MOBILE_KEYBOARD.slice(0, 3).map((row) => row.map((key) => key.value))).toEqual([
      [..."qwertyuiop"],
      [..."asdfghjkl"],
      [..."zxcvbnm", ",", "."],
    ]);
    expect(MOBILE_KEYBOARD.flat().some((key) => /^\d$/.test(key.value))).toBe(false);
  });

  it("renders a named compact keyboard without desktop modifier keys", () => {
    const view = render(<VisualKeyboard expectedKey="a" onKeyPress={() => undefined} />);
    const compact = view.container.querySelector('[data-keyboard-layout="compact"]');

    expect(compact).not.toBeNull();
    expect(within(compact as HTMLElement).getByRole("button", { name: "Numbers and symbols" })).toBeInTheDocument();
    expect(within(compact as HTMLElement).getByRole("button", { name: "Space" })).toBeInTheDocument();
    expect(within(compact as HTMLElement).getByRole("button", { name: "Delete" })).toBeInTheDocument();
    for (const modifier of ["Tab", "Caps Lock", "Control", "Option", "Alt", "Fn", "Menu"]) {
      expect(within(compact as HTMLElement).queryByText(modifier)).not.toBeInTheDocument();
    }
  });

  it("opens a content-specific secondary layer and returns to letters", () => {
    const onKeyPress = vi.fn();
    const view = render(<VisualKeyboard expectedKey="1" onKeyPress={onKeyPress} />);
    const compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;

    fireEvent.click(within(compact).getByRole("button", { name: "Numbers and symbols" }));
    expect(within(compact).getByRole("button", { name: "Letters" })).toHaveAttribute("aria-pressed", "true");
    expect(within(compact).getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(within(compact).queryByRole("button", { name: "Tab" })).not.toBeInTheDocument();

    fireEvent.click(within(compact).getByRole("button", { name: "Letters" }));
    expect(within(compact).getByRole("button", { name: "Numbers and symbols" })).toBeInTheDocument();
  });

  it("does not expose Shift for a lowercase-only active target", () => {
    const view = render(<VisualKeyboard expectedKey="a" onKeyPress={() => undefined} />);
    const compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;
    expect(within(compact).queryByRole("button", { name: "Shift" })).not.toBeInTheDocument();
  });
});
