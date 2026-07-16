import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProgressClient } from "@/components/progress/progress-client";
import { createEmptyProgress, readLocalProgress, resetLocalProgress, subscribeToProgress } from "@/lib/progress/repository";

vi.mock("@/lib/progress/repository", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/progress/repository")>();
  return {
    ...actual,
    readLocalProgress: vi.fn(),
    resetLocalProgress: vi.fn(),
    subscribeToProgress: vi.fn(() => () => undefined),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(subscribeToProgress).mockReturnValue(() => undefined);
  vi.mocked(readLocalProgress).mockReturnValue({ data: createEmptyProgress(), migrated: false, status: "available" });
});

describe("ProgressClient", () => {
  it("shows an honest empty state without account prompts or fake data", async () => {
    render(<ProgressClient />);
    expect(await screen.findByText("No completed practice is stored here yet.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Take a typing test" })).toHaveAttribute("href", "/typing-test");
    expect(screen.queryByText(/sign in|create an account|save with an account/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Completed tests")).not.toBeInTheDocument();
  });

  it("shows only summaries supported by populated local data", async () => {
    const data = createEmptyProgress();
    data.typingTests.totalCompleted = 1;
    data.typingTests.history = [
      {
        accuracy: 98,
        activityId: "typing-test:words:60:medium",
        completedAt: "2026-07-16T12:00:00.000Z",
        difficulty: "medium",
        durationSeconds: 60,
        elapsedSeconds: 60,
        id: "test-1",
        mode: "words",
        wpm: 42,
      },
    ];
    vi.mocked(readLocalProgress).mockReturnValue({ data, migrated: false, status: "available" });
    render(<ProgressClient />);

    expect(await screen.findByRole("heading", { name: "Recent accuracy and comparable bests" })).toBeInTheDocument();
    expect(screen.getAllByText("42 WPM · 98%", { exact: false }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("heading", { name: "Current lesson progress" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Calculator Sprint" })).not.toBeInTheDocument();
  });

  it("requires accessible confirmation before reset and returns focus", async () => {
    vi.mocked(resetLocalProgress).mockReturnValue({
      changed: true,
      data: createEmptyProgress(),
      migrated: false,
      status: "available",
    });
    render(<ProgressClient />);
    const trigger = await screen.findByRole("button", { name: "Reset local progress" });
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Remove local progress from this device?" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Keep progress" })).toHaveFocus();
    fireEvent.click(screen.getAllByRole("button", { name: "Reset local progress" })[1]);
    expect(resetLocalProgress).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.getByText("No completed practice is stored here yet.")).toBeInTheDocument();
  });

  it("reports corrupted storage without crashing", async () => {
    vi.mocked(readLocalProgress).mockReturnValue({ data: createEmptyProgress(), migrated: false, status: "corrupt" });
    render(<ProgressClient />);
    expect(await screen.findByText(/Some saved progress could not be read/)).toBeInTheDocument();
  });
});
