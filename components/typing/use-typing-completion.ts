"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TypingAttemptResult } from "@/lib/curriculum/adaptive";
import { isKnownLessonId } from "@/lib/progress/ids";
import {
  readLocalProgress,
  recordLessonCompletion,
  recordPracticeCompletion,
  recordTypingTestCompletion,
} from "@/lib/progress/repository";
import type { PracticeId, PracticeLength } from "@/lib/progress/types";
import {
  compareTypingTestResult,
  type TypingTestComparison,
} from "@/lib/progress/typing-test-results";
import type { TrackedKeystroke } from "@/lib/typing/attempt";
import type { DifficultyId, TestMode, TypingStats } from "@/lib/typing/types";

type UseTypingCompletionOptions = {
  completed: boolean;
  difficulty: DifficultyId;
  duration: number;
  elapsedMilliseconds: number;
  isStandaloneTest: boolean;
  keystrokes: TrackedKeystroke[];
  mode: TestMode;
  numbers: boolean;
  onAttemptComplete?: (result: TypingAttemptResult) => void;
  persistCompletion: boolean;
  practice?: { id: PracticeId; length: PracticeLength; variant: string };
  punctuation: boolean;
  stars: number;
  stats: TypingStats;
  testName: string;
};

export function useTypingCompletion({
  completed,
  difficulty,
  duration,
  elapsedMilliseconds,
  isStandaloneTest,
  keystrokes,
  mode,
  numbers,
  onAttemptComplete,
  persistCompletion,
  practice,
  punctuation,
  stars,
  stats,
  testName,
}: UseTypingCompletionOptions) {
  const savedAttemptRef = useRef(false);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">(
    "idle",
  );
  const [comparison, setComparison] = useState<TypingTestComparison | null>(
    null,
  );
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<
    string[]
  >([]);

  const reset = useCallback(() => {
    savedAttemptRef.current = false;
    setSaveState("idle");
    setComparison(null);
    setUnlockedAchievementIds([]);
  }, []);

  useEffect(() => {
    if (!completed || saveState !== "idle" || savedAttemptRef.current) return;
    savedAttemptRef.current = true;
    const completedAt = new Date().toISOString();
    const resultDurationSeconds = Math.max(
      1,
      Math.ceil(elapsedMilliseconds / 1_000),
    );
    const testConfiguration = {
      accuracy: stats.accuracy,
      difficulty,
      durationSeconds: duration,
      mode,
      numbers: mode === "words" ? numbers : false,
      punctuation: mode === "words" ? punctuation : false,
      wpm: stats.wpm,
    };

    onAttemptComplete?.({
      accuracy: stats.accuracy,
      correctKeystrokes: stats.correctKeystrokes,
      correctedErrors: stats.correctedErrors,
      elapsedMilliseconds,
      trackedKeystrokes: stats.trackedKeystrokes,
      uncorrectedErrors: stats.uncorrectedErrors,
      weakKeys: summarizeWeakKeys(keystrokes),
      wpm: stats.wpm,
    });

    if (!persistCompletion) {
      setSaveState("saved");
      return;
    }

    if (isStandaloneTest) {
      setComparison(
        compareTypingTestResult(
          readLocalProgress().data.typingTests.history,
          testConfiguration,
        ),
      );
    }

    const result = isKnownLessonId(testName)
      ? recordLessonCompletion({
          accuracy: stats.accuracy,
          characters: stats.correctChars + stats.uncorrectedErrors,
          completedAt,
          correctedErrors: stats.correctedErrors,
          lessonId: testName,
          stars,
          uncorrectedErrors: stats.uncorrectedErrors,
          wpm: stats.wpm,
        })
      : practice
        ? recordPracticeCompletion({
            accuracy: stats.accuracy,
            completedAt,
            correctedErrors: stats.correctedErrors,
            elapsedSeconds: resultDurationSeconds,
            length: practice.length,
            practiceId: practice.id,
            uncorrectedErrors: stats.uncorrectedErrors,
            variant: practice.variant,
            wpm: stats.wpm,
          })
        : recordTypingTestCompletion({
            accuracy: stats.accuracy,
            accuracyStars: stars,
            characters: stats.correctChars + stats.uncorrectedErrors,
            completedAt,
            contentVersion: 1,
            correctedErrors: stats.correctedErrors,
            difficulty,
            durationSeconds: duration,
            elapsedSeconds: resultDurationSeconds,
            mode,
            numbers: mode === "words" ? numbers : false,
            punctuation: mode === "words" ? punctuation : false,
            score: stats.score,
            uncorrectedErrors: stats.uncorrectedErrors,
            wpm: stats.wpm,
          });

    setSaveState(result.status === "available" ? "saved" : "error");
    setUnlockedAchievementIds(result.unlockedAchievementIds ?? []);
  }, [
    completed,
    difficulty,
    duration,
    elapsedMilliseconds,
    isStandaloneTest,
    keystrokes,
    mode,
    numbers,
    onAttemptComplete,
    persistCompletion,
    practice,
    punctuation,
    saveState,
    stars,
    stats,
    testName,
  ]);

  return {
    comparison,
    reset,
    saveState,
    unlockedAchievementIds,
  };
}

function summarizeWeakKeys(keystrokes: TrackedKeystroke[]) {
  const misses = new Map<string, number>();
  for (const keystroke of keystrokes) {
    if (
      !keystroke.correct &&
      keystroke.expected.length === 1 &&
      keystroke.expected !== " "
    ) {
      misses.set(
        keystroke.expected.toLowerCase(),
        (misses.get(keystroke.expected.toLowerCase()) ?? 0) + 1,
      );
    }
  }

  return [...misses.entries()]
    .map(([key, count]) => ({ key, misses: count }))
    .sort((a, b) => b.misses - a.misses || a.key.localeCompare(b.key))
    .slice(0, 2);
}
