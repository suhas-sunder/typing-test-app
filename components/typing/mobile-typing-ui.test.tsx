import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VisualKeyboard } from "@/components/typing/visual-keyboard";
import { FULL_KEYBOARD_MIN_WIDTH_PX, isFullKeyboardEligible, MOBILE_KEYBOARD } from "@/lib/typing/keyboard";

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
    const view = render(<VisualKeyboard content="a1" expectedKey="a" onKeyPress={onKeyPress} />);
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

  it("uses available component width for stable full-keyboard eligibility", () => {
    expect(isFullKeyboardEligible(FULL_KEYBOARD_MIN_WIDTH_PX - 1)).toBe(false);
    expect(isFullKeyboardEligible(FULL_KEYBOARD_MIN_WIDTH_PX)).toBe(true);
    expect(isFullKeyboardEligible(1920)).toBe(true);
    expect(isFullKeyboardEligible(390)).toBe(false);
  });

  it("keeps the selected layer through harmless rerenders and resets on a new attempt", () => {
    const view = render(<VisualKeyboard content="a1" expectedKey="a" onKeyPress={() => undefined} resetToken={0} />);
    let compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;
    fireEvent.click(within(compact).getByRole("button", { name: "Numbers and symbols" }));
    expect(within(compact).getByRole("group", { name: /symbols layer/i })).toBeInTheDocument();

    view.rerender(<VisualKeyboard content="a12" expectedKey="2" onKeyPress={() => undefined} resetToken={0} />);
    compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;
    expect(within(compact).getByRole("group", { name: /symbols layer/i })).toBeInTheDocument();

    view.rerender(<VisualKeyboard content="abc" expectedKey="a" onKeyPress={() => undefined} resetToken={1} />);
    compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;
    expect(within(compact).getByRole("group", { name: /alphabet layer/i })).toBeInTheDocument();
  });

  it("emphasizes the layer switch without automatically changing layers", () => {
    const view = render(<VisualKeyboard content="a1" expectedKey="1" onKeyPress={() => undefined} />);
    const compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;
    const switcher = within(compact).getByRole("button", { name: "Numbers and symbols" });

    expect(switcher).toHaveAttribute("data-highlight", "next-layer");
    expect(switcher).toHaveAttribute("aria-describedby");
    expect(within(compact).getByRole("group", { name: /alphabet layer/i })).toBeInTheDocument();
  });

  it("provides one-shot contextual Shift and never adds Caps Lock", () => {
    const onKeyPress = vi.fn();
    const view = render(<VisualKeyboard content="A calm start" expectedKey="A" onKeyPress={onKeyPress} />);
    const compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;
    const shift = within(compact).getByRole("button", { name: "Shift" });

    fireEvent.click(shift);
    expect(shift).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(within(compact).getByRole("button", { name: "A" }));
    expect(onKeyPress).toHaveBeenCalledWith("A");
    expect(shift).toHaveAttribute("aria-pressed", "false");
    expect(within(compact).queryByText("Caps")).not.toBeInTheDocument();
  });

  it("marks disallowed keys as disabled without highlighting them", () => {
    const view = render(<VisualKeyboard allowedCharacters={["a"]} content="a" expectedKey="b" onKeyPress={() => undefined} />);
    const compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;
    const disallowed = within(compact).getByRole("button", { name: "B" });

    expect(disallowed).toBeDisabled();
    expect(disallowed).not.toHaveAttribute("data-highlight", "next");
    expect(within(compact).getByRole("button", { name: "A" })).not.toBeDisabled();
  });

  it("keeps the approved 40px compact key baseline and exposes Enter only when requested", () => {
    const view = render(<VisualKeyboard content="abc" expectedKey="a" onKeyPress={() => undefined} showEnter />);
    const compact = view.container.querySelector('[data-keyboard-layout="compact"]') as HTMLElement;
    expect(within(compact).getByRole("button", { name: "A" }).className).toContain("h-10");
    expect(within(compact).getByRole("button", { name: "Enter" })).toBeInTheDocument();
  });
});
