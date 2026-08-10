import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LessonExperience } from "@/components/lessons/lesson-experience";
import { TypingTest } from "@/components/typing/typing-test";
import { CURRICULUM_LESSONS } from "@/lib/curriculum/registry";

vi.mock("@/lib/progress/repository", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/progress/repository")>();
  return {
    ...original,
    readLocalProgress: vi.fn(() => ({ data: { weakKeys: [] }, status: "available" })),
    recordLessonCompletion: vi.fn(() => ({ changed: true, status: "available" })),
  };
});

describe("lesson stage hierarchy", () => {
  it("places lesson title and guidance after the active typing surface", () => {
    const lesson = CURRICULUM_LESSONS[1];
    render(<LessonExperience lesson={lesson} fingerGuide="f: left index; j: right index; Space: thumb" />);

    const stageTitle = screen.getByText(new RegExp(lesson.stages[1].title, "i"));
    const typingSurface = screen.getByTestId("typing-surface");
    expect(typingSurface.compareDocumentPosition(stageTitle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("Lesson 2 of 45 - Stage 1 of 5")).toBeInTheDocument();
    expect(screen.queryByText(/^Results$/i)).not.toBeInTheDocument();
  });

  it("labels an intermediate completion as a stage, not final Results", () => {
    render(
      <TypingTest
        completionActionLabel="Continue to next stage"
        initialText="a"
        loadSavedPreferences={false}
        lockText
        onCompletionAction={() => undefined}
        persistCompletion={false}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText("Typing input"), { key: "a" });

    expect(screen.getByText("Stage complete")).toBeInTheDocument();
    expect(screen.queryByText(/^Results$/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Stars:/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue to next stage" })).toBeInTheDocument();
  });
});
