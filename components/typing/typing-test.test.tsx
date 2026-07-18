import { StrictMode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StarRating, TypingTest } from "@/components/typing/typing-test";
import { recordLessonCompletion, recordPracticeCompletion, recordTypingTestCompletion } from "@/lib/progress/repository";

vi.mock("@/lib/progress/repository", () => ({
  readLocalProgress: vi.fn(() => ({ data: { typingTests: { history: [] } }, status: "available" })),
  recordLessonCompletion: vi.fn(() => ({ changed: true, status: "available" })),
  recordPracticeCompletion: vi.fn(() => ({ changed: true, status: "available" })),
  recordTypingTestCompletion: vi.fn(() => ({ changed: true, status: "available" })),
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
    await waitFor(() => expect(recordTypingTestCompletion).toHaveBeenCalledTimes(1));
  });

  it("persists existing lessons through the lesson repository path", async () => {
    render(
      <TypingTest
        initialText="a"
        lockText
        lessonTargets={{ masteryWpm: 14, standardWpm: 8 }}
        testName="beginner-f-j-space"
      />,
    );
    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });

    await waitFor(() => expect(recordLessonCompletion).toHaveBeenCalledTimes(1));
    expect(recordTypingTestCompletion).not.toHaveBeenCalled();
    expect(recordLessonCompletion).toHaveBeenCalledWith(
      expect.objectContaining({ lessonId: "beginner-f-j-space" }),
    );
  });

  it("persists focused practice through its own comparable repository path", async () => {
    render(<TypingTest initialText="a" lockText practice={{ id: "asdf-jkl", length: "short", variant: "strict" }} />);
    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });
    await waitFor(() => expect(recordPracticeCompletion).toHaveBeenCalledWith(expect.objectContaining({ practiceId: "asdf-jkl", length: "short" })));
    expect(recordTypingTestCompletion).not.toHaveBeenCalled();
  });

  it("keeps a completed result usable when browser storage fails", async () => {
    vi.mocked(recordTypingTestCompletion).mockReturnValueOnce({ status: "quota" } as never);
    renderTest("a");
    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });

    expect(screen.getByText("Test complete")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("This result is complete, but this browser could not save it.")).toBeInTheDocument(),
    );
  });

  it("keeps locked lesson text unchanged when the shared renderer restarts", () => {
    render(<TypingTest initialText="fixed lesson text" lockText testName="beginner-f-j-space" />);

    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "f" });
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));

    expect(screen.getByTestId("typing-text-stream")).toHaveTextContent("fixed lesson text");
    expect(screen.queryByRole("button", { name: "Open typing settings" })).not.toBeInTheDocument();
  });

  it("keeps the open passage and keyboard geometry in the shared typing surface", () => {
    renderTest("calm typing");

    expect(screen.getByTestId("typing-text-viewport")).toHaveClass("overflow-hidden");
    expect(screen.getAllByRole("button", { name: "A" }).length).toBeGreaterThan(0);
    expect(screen.getByTestId("typing-surface")).toContainElement(screen.getByLabelText("Typing input"));
  });

  it("offers all five durations without changing the canonical route", async () => {
    render(<TypingTest loadSavedPreferences={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Open typing settings" }));

    expect(screen.getByRole("button", { name: "15s" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2 min" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5 min" })).toBeInTheDocument();
    expect(window.location.pathname).not.toContain("typing-test/");
  });

  it("applies independent word settings with a clean restart", async () => {
    render(<TypingTest initialText="ab" loadSavedPreferences={false} />);
    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });
    fireEvent.click(screen.getByRole("button", { name: "Open typing settings" }));
    fireEvent.click(screen.getByText("Punctuation").parentElement?.parentElement?.querySelector("button") as HTMLButtonElement);

    await waitFor(() => expect(screen.getByText("Start typing")).toBeInTheDocument());
    expect(screen.getByTestId("typing-text-stream").textContent).toMatch(/[A-Z].*\./);
  });

  it("explains quote-owned punctuation and hides inapplicable toggles", () => {
    render(<TypingTest defaultMode="quote" loadSavedPreferences={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Open typing settings" }));

    expect(screen.getByText(/Quotes keep their authored punctuation and numbers/)).toBeInTheDocument();
    expect(screen.queryByText("Use natural sentence-like material")).not.toBeInTheDocument();
  });

  it("renders five actual accuracy-star icons with one accessible label", () => {
    const view = render(<StarRating value={4} />);
    expect(screen.getByLabelText("Accuracy stars: 4 of 5")).toBeInTheDocument();
    expect(view.container.querySelectorAll("svg")).toHaveLength(5);
    expect(screen.queryByText("4/5")).not.toBeInTheDocument();
  });

  it("shows complete settings and accuracy-first actions in results", async () => {
    render(<TypingTest initialText="a" defaultDuration={300} defaultDifficulty="hard" loadSavedPreferences={false} lockText />);
    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });

    expect(await screen.findByText(/5 min Words · hard/)).toBeInTheDocument();
    expect(screen.getByLabelText("Accuracy stars: 5 of 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy result" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View local progress" })).toHaveAttribute("href", "/progress");
    expect(recordTypingTestCompletion).toHaveBeenCalledWith(expect.objectContaining({ accuracyStars: 5, durationSeconds: 300, numbers: false, punctuation: false }));
  });

  it("copies a plain-text result when the browser Clipboard API is available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<TypingTest initialText="a" defaultDuration={15} loadSavedPreferences={false} lockText />);
    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });

    fireEvent.click(await screen.findByRole("button", { name: "Copy result" }));

    await waitFor(() => expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledWith(expect.stringMatching(/^Free Typing Camp: \d+ WPM, 100% accuracy, 5 accuracy stars/));
  });

  it("does not make an account or progress API request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    renderTest("a");
    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });
    await waitFor(() => expect(recordTypingTestCompletion).toHaveBeenCalledTimes(1));
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
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
