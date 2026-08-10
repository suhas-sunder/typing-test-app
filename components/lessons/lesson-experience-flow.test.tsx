import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LessonExperience } from "@/components/lessons/lesson-experience";
import { CURRICULUM_LESSONS } from "@/lib/curriculum/registry";
import { recordLessonCompletion } from "@/lib/progress/repository";

vi.mock("@/components/typing/typing-test", () => ({
  TypingTest: ({
    completionActionLabel,
    onAttemptComplete,
    onCompletionAction,
  }: {
    completionActionLabel: string;
    onAttemptComplete: (result: {
      accuracy: number;
      correctKeystrokes: number;
      correctedErrors: number;
      elapsedMilliseconds: number;
      trackedKeystrokes: number;
      uncorrectedErrors: number;
      weakKeys: [];
      wpm: number;
    }) => void;
    onCompletionAction: () => void;
  }) => (
    <div data-testid="mock-stage-runner">
      <button
        type="button"
        onClick={() =>
          onAttemptComplete({
            accuracy: 100,
            correctKeystrokes: 20,
            correctedErrors: 0,
            elapsedMilliseconds: 60_000,
            trackedKeystrokes: 20,
            uncorrectedErrors: 0,
            weakKeys: [],
            wpm: 4,
          })
        }
      >
        Complete current stage
      </button>
      <button type="button" onClick={onCompletionAction}>{completionActionLabel}</button>
    </div>
  ),
}));

vi.mock("@/lib/progress/repository", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/progress/repository")>();
  return {
    ...original,
    readLocalProgress: vi.fn(() => ({ data: { weakKeys: [] }, status: "available" })),
    recordLessonCompletion: vi.fn(() => ({ changed: true, status: "available" })),
  };
});

describe("multi-stage lesson result flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows final Results only after every required typed stage", () => {
    const lesson = CURRICULUM_LESSONS[1];
    render(<LessonExperience lesson={lesson} fingerGuide="f and j index fingers" />);

    const typedStages = lesson.stages.filter((stage) => stage.type !== "instruction");
    for (let index = 0; index < typedStages.length; index += 1) {
      expect(screen.queryByText(/^Results$/i)).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Next lesson" })).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Complete current stage" }));
      fireEvent.click(screen.getByRole("button", { name: index === typedStages.length - 1 ? "Finish lesson" : "Continue to next stage" }));
    }

    expect(screen.getByText("Results")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Lesson complete/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/\d of 5 lesson stars/)).toBeInTheDocument();
    expect(screen.getByText("Corrected errors")).toBeInTheDocument();
    expect(screen.getByText("Uncorrected errors")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry final stage" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Repeat full lesson" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next lesson" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Related practice" })).toBeInTheDocument();
    expect(recordLessonCompletion).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Retry final stage" }));
    expect(screen.queryByText(/^Results$/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-stage-runner")).toBeInTheDocument();
  });
});
