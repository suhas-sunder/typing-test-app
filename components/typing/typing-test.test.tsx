import { StrictMode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TypingTest } from "@/components/typing/typing-test";
import { saveLocalTypingResult } from "@/lib/typing/progress";

vi.mock("@/components/auth/auth-provider", () => ({
  useAuth: () => ({ isAuthenticated: false, isLoading: false, userId: null }),
}));

vi.mock("@/lib/typing/progress", () => ({
  saveLocalTypingResult: vi.fn(),
}));

describe("TypingTest input integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts only on the first valid character input", () => {
    renderTest("ab");
    const input = screen.getByLabelText("Typing input");

    fireEvent.keyDown(input, { key: "Shift" });
    fireEvent.keyDown(input, { key: "Escape" });
    fireEvent.keyDown(input, { key: "a", ctrlKey: true });
    fireEvent.keyDown(input, { key: "a", repeat: true });
    expect(screen.getByText("Start typing")).toBeInTheDocument();

    fireEvent.keyDown(input, { key: "a" });
    expect(screen.queryByText("Start typing")).not.toBeInTheDocument();
  });

  it("preserves corrected errors through lesson completion", () => {
    renderTest("ab");
    const input = screen.getByLabelText("Typing input");

    for (const key of ["x", "Backspace", "a", "b"]) {
      fireEvent.keyDown(input, { key });
    }

    expect(screen.getByText("Test complete")).toBeInTheDocument();
    expect(screen.getByText(/Corrected errors: 1/)).toHaveTextContent("Uncorrected errors: 0");
    expect(screen.getAllByText("66%").length).toBeGreaterThan(0);
  });

  it("reports an uncorrected final mistake", () => {
    renderTest("ab");
    const input = screen.getByLabelText("Typing input");
    fireEvent.keyDown(input, { key: "a" });
    fireEvent.keyDown(input, { key: "x" });

    expect(screen.getByText(/Corrected errors: 0/)).toHaveTextContent("Uncorrected errors: 1");
    expect(screen.getAllByText("50%").length).toBeGreaterThan(0);
  });

  it("blocks paste and incomplete composition without phantom progress", () => {
    renderTest("a");
    const input = screen.getByLabelText("Typing input");
    fireEvent.paste(input, { clipboardData: { getData: () => "a" } });
    fireEvent.keyDown(input, { isComposing: true, key: "a" });

    expect(screen.getByText("Start typing")).toBeInTheDocument();
    expect(screen.queryByText("Test complete")).not.toBeInTheDocument();
  });

  it("restarts in place and restores the typing target focus", () => {
    renderTest("ab");
    const input = screen.getByLabelText("Typing input");
    fireEvent.keyDown(input, { key: "a" });
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));

    expect(screen.getByText("Start typing")).toBeInTheDocument();
    fireEvent.blur(input);
    fireEvent.click(screen.getByTestId("typing-surface"));
    expect(input).toHaveFocus();
  });

  it("gives equivalent physical and virtual sequences the same result", () => {
    const physical = renderTest("a");
    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });
    expect(screen.getAllByText("100%").length).toBeGreaterThan(0);
    physical.unmount();

    renderTest("a");
    fireEvent.click(screen.getAllByRole("button", { name: "A" })[0]);
    expect(screen.getAllByText("100%").length).toBeGreaterThan(0);
  });

  it("supports shifted virtual characters and restores physical focus", async () => {
    renderTest("A");
    fireEvent.click(screen.getAllByRole("button", { name: "Shift" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "A" })[0]);

    expect(screen.getAllByText("100%").length).toBeGreaterThan(0);
    await waitFor(() => expect(screen.getByLabelText("Typing input")).toHaveFocus());
  });

  it("contains settings focus and returns it to the trigger", async () => {
    render(<TypingTest initialText="ab" />);
    const trigger = screen.getByRole("button", { name: "Open typing settings" });
    await waitFor(() => expect(screen.getByLabelText("Typing input")).toHaveFocus());
    fireEvent.click(trigger);

    const close = screen.getByRole("button", { name: "Close typing settings" });
    await waitFor(() => expect(close).toHaveFocus());
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(screen.getByRole("button", { name: "Hide" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Tab" });
    expect(close).toHaveFocus();

    fireEvent.keyDown(close, { key: "Escape" });
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("protects single completion and persistence under Strict Mode", async () => {
    render(
      <StrictMode>
        <TypingTest initialText="a" lockText />
      </StrictMode>,
    );

    const input = screen.getByLabelText("Typing input");
    fireEvent.keyDown(input, { key: "a" });
    fireEvent.keyDown(input, { key: "a" });

    expect(screen.getAllByText("Characters")[0].parentElement).toHaveTextContent("1");
    await waitFor(() => expect(saveLocalTypingResult).toHaveBeenCalledTimes(1));
  });

  it("removes the document key listener on unmount", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const view = renderTest("a");
    const keydownListener = addSpy.mock.calls.find(([type]) => type === "keydown")?.[1];

    view.unmount();
    expect(keydownListener).toBeDefined();
    expect(removeSpy).toHaveBeenCalledWith("keydown", keydownListener);
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});

function renderTest(text: string) {
  return render(<TypingTest initialText={text} lockText />);
}
