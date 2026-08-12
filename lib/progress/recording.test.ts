import { describe, expect, it } from "vitest";
import {
  prepareGameCompletion,
  prepareLessonCompletion,
  preparePracticeCompletion,
} from "@/lib/progress/recording";
import { createEmptyProgress } from "@/lib/progress/repository";
import { MAX_CALCULATOR_HISTORY, MAX_TYPING_TEST_HISTORY } from "@/lib/progress/types";

describe("progress completion mutations", () => {
  it("aggregates lesson facts and weak-key summaries without storage concerns", () => {
    const first = prepareLessonCompletion({
      accuracy: 96,
      completedAt: "2026-07-15T12:00:00.000Z",
      eventId: "lesson-first",
      lessonId: "beginner-f-j-space",
      stars: 2,
      weakKeys: [{ key: "F", misses: 2 }],
      wpm: 20,
    });
    const second = prepareLessonCompletion({
      accuracy: 98,
      completedAt: "2026-07-16T12:00:00.000Z",
      eventId: "lesson-second",
      lessonId: "beginner-f-j-space",
      stars: 3,
      weakKeys: [{ key: "f", misses: 1 }],
      wpm: 24,
    });

    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    const progress = second!.update(first!.update(createEmptyProgress()));

    expect(progress.lessons["beginner-f-j-space"]).toMatchObject({
      attemptCount: 2,
      bestAccuracy: 98,
      bestStars: 3,
      bestWpm: 24,
    });
    expect(progress.weakKeys).toEqual([
      { attempts: 2, key: "f", lastSeenAt: "2026-07-16T12:00:00.000Z", misses: 3 },
    ]);
  });

  it("records lesson speed bests only from attempts with controlled accuracy", () => {
    const controlled = prepareLessonCompletion({
      accuracy: 97,
      completedAt: "2026-07-15T12:00:00.000Z",
      eventId: "lesson-controlled",
      lessonId: "beginner-f-j-space",
      stars: 4,
      wpm: 40,
    });
    const rushed = prepareLessonCompletion({
      accuracy: 60,
      completedAt: "2026-07-16T12:00:00.000Z",
      eventId: "lesson-rushed",
      lessonId: "beginner-f-j-space",
      stars: 0,
      wpm: 90,
    });
    const improved = prepareLessonCompletion({
      accuracy: 95,
      completedAt: "2026-07-17T12:00:00.000Z",
      eventId: "lesson-improved",
      lessonId: "beginner-f-j-space",
      stars: 3,
      wpm: 42,
    });

    const progress = improved!.update(rushed!.update(controlled!.update(createEmptyProgress())));

    expect(progress.lessons["beginner-f-j-space"]).toMatchObject({
      attemptCount: 3,
      bestAccuracy: 97,
      bestWpm: 42,
    });
  });

  it("keeps practice and game histories bounded at the domain mutation boundary", () => {
    let practice = createEmptyProgress();
    for (let index = 0; index < MAX_TYPING_TEST_HISTORY + 2; index += 1) {
      const mutation = preparePracticeCompletion({
        accuracy: 98,
        completedAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(),
        correctedErrors: 0,
        elapsedSeconds: 30,
        eventId: `practice-${index}`,
        length: "short",
        practiceId: "asdf-jkl",
        uncorrectedErrors: 0,
        variant: "strict",
        wpm: 24,
      });
      practice = mutation!.update(practice);
    }

    let games = createEmptyProgress();
    for (let index = 0; index < MAX_CALCULATOR_HISTORY + 2; index += 1) {
      const mutation = prepareGameCompletion({
        cleanRounds: 5,
        completedAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(),
        contentVersion: 1,
        correctedRounds: 0,
        eventId: `game-${index}`,
        gameId: "calculator-sprint",
        livesRemaining: 3,
        outcome: "completed",
        roundsCompleted: 5,
        score: index,
      });
      games = mutation!.update(games);
    }

    expect(practice.practice.history).toHaveLength(MAX_TYPING_TEST_HISTORY);
    expect(practice.practice.totalCompleted).toBe(MAX_TYPING_TEST_HISTORY + 2);
    expect(games.games["calculator-sprint"]?.history).toHaveLength(MAX_CALCULATOR_HISTORY);
    expect(games.games["calculator-sprint"]?.completedSessions).toBe(MAX_CALCULATOR_HISTORY + 2);
  });
});
