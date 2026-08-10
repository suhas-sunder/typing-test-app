import type { ReactNode } from "react";
import type { TypingAttemptResult } from "@/lib/curriculum/adaptive";
import type { PracticeId, PracticeLength } from "@/lib/progress/types";
import type { DifficultyId, TestMode } from "@/lib/typing/types";

export const KEYBOARD_STATS_PLACEMENTS = ["right", "left", "hidden"] as const;

export type KeyboardStatsPlacement = (typeof KEYBOARD_STATS_PLACEMENTS)[number];

export type TypingKeyFeedback = {
  key: string;
  state: "correct" | "error" | "neutral";
  token: number;
};

export type TypingTestProps = {
  allowedCharacters?: readonly string[];
  title?: string;
  subtitle?: string;
  initialText?: string;
  testName?: string;
  defaultDuration?: number;
  defaultMode?: TestMode;
  defaultDifficulty?: DifficultyId;
  defaultNumbers?: boolean;
  defaultPunctuation?: boolean;
  defaultShowLiveStats?: boolean;
  lockText?: boolean;
  compact?: boolean;
  lessonTargets?: { masteryWpm: number; standardWpm: number };
  practice?: { id: PracticeId; length: PracticeLength; variant: string };
  titleHeading?: "h1" | "h2";
  loadSavedPreferences?: boolean;
  untimed?: boolean;
  persistCompletion?: boolean;
  completionActionLabel?: string;
  onCompletionAction?: () => void;
  onAttemptComplete?: (result: TypingAttemptResult) => void;
  resultPresentation?: "standard" | "stage";
  showAttemptContext?: boolean;
  afterTypingSurface?: ReactNode;
  setupControls?: ReactNode;
};

export type TypingSessionSettings = {
  difficulty: DifficultyId;
  duration: number;
  keyboardStatsPlacement: KeyboardStatsPlacement;
  mode: TestMode;
  numbers: boolean;
  open: boolean;
  punctuation: boolean;
  showLiveStats: boolean;
};

export type TypingSettingsUpdate = Partial<Omit<TypingSessionSettings, "open">>;

export type TypingDisplayStat = {
  label: string;
  value: string | number;
};
