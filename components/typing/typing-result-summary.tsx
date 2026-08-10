"use client";

import Link from "next/link";
import { Check, Clipboard, RotateCcw, Star, Trophy } from "lucide-react";
import { useState } from "react";
import { getAchievement } from "@/lib/progress/achievements";
import {
  getAccuracyFeedback,
  type TypingTestComparison,
} from "@/lib/progress/typing-test-results";
import { QUOTE_CORPUS } from "@/lib/typing/corpus";
import { formatTestDuration } from "@/lib/typing/test-settings";
import type { DifficultyId, TestMode } from "@/lib/typing/types";

export type TypingResultViewModel = {
  accuracy: number;
  characters: number;
  comparison: TypingTestComparison | null;
  correctedErrors: number;
  difficulty: DifficultyId;
  duration: number;
  errors: number;
  isTypingTest: boolean;
  mode: TestMode;
  numbers: boolean;
  presentation: "standard" | "stage";
  punctuation: boolean;
  quoteIds: string[];
  saveState: "idle" | "saved" | "error";
  stars: number;
  uncorrectedErrors: number;
  unlockedAchievementIds: string[];
  wpm: number;
};

export function TypingResultSummary({
  completionActionLabel,
  onChangeSettings,
  onCompletionAction,
  onRetry,
  result,
}: {
  completionActionLabel?: string;
  onChangeSettings: () => void;
  onCompletionAction?: () => void;
  onRetry: () => void;
  result: TypingResultViewModel;
}) {
  const [copied, setCopied] = useState(false);
  const settingLabel = `${formatTestDuration(result.duration)} ${
    result.mode === "quote" ? "Quotes" : "Words"
  } · ${result.difficulty}${
    result.mode === "words"
      ? ` · ${result.punctuation ? "punctuation" : "plain"} · ${result.numbers ? "numbers" : "no numbers"}`
      : ""
  }`;
  const quoteAttributions = result.quoteIds
    .map((id) => QUOTE_CORPUS.find((quote) => quote.id === id))
    .filter((quote) => Boolean(quote));
  const isStage = result.presentation === "stage";

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(
        `Free Typing Camp: ${result.wpm} WPM, ${result.accuracy}% accuracy, ${result.stars} accuracy stars — ${settingLabel}`,
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      className="mt-10 bg-camp-tan/45 py-7 sm:py-9"
      aria-labelledby="typing-results-heading"
    >
      <div className="px-5 sm:px-8">
        <div className="mb-7 flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-camp-peach text-camp-coral">
            <Trophy aria-hidden size={23} />
          </span>
          <div>
            <p className="eyebrow">
              {isStage ? "Stage complete" : "Test complete"}
            </p>
            <h2 id="typing-results-heading" className="heading-md">
              {isStage
                ? "Review this stage, then continue when you are ready."
                : result.isTypingTest
                  ? getAccuracyFeedback(result.accuracy)
                  : "Nice work. Run it again while the rhythm is warm."}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
          {[
            ["WPM", result.wpm],
            ["Accuracy", `${result.accuracy}%`],
            ["Characters", result.characters],
            ["Errors", result.errors],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-3xl font-black text-camp-ink">{value}</div>
              <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-camp-muted">
                {label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          {completionActionLabel && onCompletionAction ? (
            <button
              type="button"
              className="button-primary"
              onClick={onCompletionAction}
            >
              {completionActionLabel}
            </button>
          ) : null}
          <button type="button" className="button-primary" onClick={onRetry}>
            <RotateCcw aria-hidden size={17} className="shrink-0" />
            {isStage ? "Retry stage" : "Try again"}
          </button>
          {!isStage ? (
            <StarRating
              label={result.isTypingTest ? "Accuracy stars" : "Stars"}
              value={result.stars}
            />
          ) : null}
        </div>
        {result.isTypingTest ? (
          <p className="mt-5 text-sm font-extrabold capitalize text-camp-ink">
            {settingLabel}
          </p>
        ) : null}
        {result.isTypingTest ? (
          <ComparisonSummary comparison={result.comparison} />
        ) : null}
        <p className="mt-4 text-sm font-bold text-camp-muted">
          Corrected errors: {result.correctedErrors} · Uncorrected errors:{" "}
          {result.uncorrectedErrors} · Total mistakes: {result.errors}
        </p>
        {result.unlockedAchievementIds.length > 0 ? (
          <div
            className="mt-5 bg-camp-peach/60 px-5 py-4"
            role="status"
            aria-live="polite"
          >
            <p className="font-black text-camp-coral">
              {result.unlockedAchievementIds.length === 1
                ? `Achievement unlocked: ${getAchievement(result.unlockedAchievementIds[0])?.name ?? "New achievement"}`
                : `${result.unlockedAchievementIds.length} achievements unlocked: ${result.unlockedAchievementIds
                    .map((id) => getAchievement(id)?.name)
                    .filter(Boolean)
                    .join(", ")}`}
            </p>
            <Link
              href="/progress"
              className="mt-2 inline-block font-black text-camp-ink underline decoration-2 underline-offset-4 hover:text-camp-coral focus-visible:bg-camp-peach focus-visible:text-camp-coral"
            >
              View achievements and themes
            </Link>
          </div>
        ) : null}
        {result.isTypingTest && quoteAttributions.length > 0 ? (
          <p className="mt-3 text-sm text-camp-muted">
            Passages:{" "}
            {quoteAttributions
              .map(
                (quote) => `${quote?.id} — ${quote?.author}, ${quote?.source}`,
              )
              .join("; ")}
          </p>
        ) : null}
        {result.isTypingTest ? (
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="pill" onClick={onChangeSettings}>
              Change settings
            </button>
            <Link className="pill" href="/progress">
              View local progress
            </Link>
            <button type="button" className="pill" onClick={copyResult}>
              {copied ? (
                <Check aria-hidden size={15} />
              ) : (
                <Clipboard aria-hidden size={15} />
              )}
              {copied ? "Copied" : "Copy result"}
            </button>
          </div>
        ) : null}
        {result.saveState === "error" ? (
          <p className="mt-3 text-sm font-bold text-camp-error">
            This result is complete, but this browser could not save it.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function StarRating({
  label = "Accuracy stars",
  value,
}: {
  label?: string;
  value: number;
}) {
  const filled = Math.max(0, Math.min(5, Math.floor(value)));
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`${label}: ${filled} of 5`}
    >
      <span className="flex gap-1 text-camp-orange" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={21}
            fill={star <= filled ? "currentColor" : "none"}
            strokeWidth={star <= filled ? 0 : 2}
          />
        ))}
      </span>
      <span className="text-sm font-black text-camp-muted">{label}</span>
    </div>
  );
}

function ComparisonSummary({
  comparison,
}: {
  comparison: TypingTestComparison | null;
}) {
  if (!comparison)
    return (
      <p className="mt-3 text-sm font-bold text-camp-muted">
        Comparison will appear after this result is saved.
      </p>
    );
  if (!comparison.prior)
    return (
      <p className="mt-3 text-sm font-bold text-camp-muted">
        First result with these exact settings. This is your local baseline.
      </p>
    );
  const changes = [
    `WPM ${formatDelta(comparison.wpmDelta)}`,
    `accuracy ${formatDelta(comparison.accuracyDelta, "%")}`,
  ];
  const bests = [
    comparison.isSpeedPersonalBest ? "controlled speed personal best" : "",
    comparison.isAccuracyPersonalBest ? "accuracy personal best" : "",
  ].filter(Boolean);
  return (
    <p className="mt-3 text-sm font-bold text-camp-muted">
      Compared with your prior matching test: {changes.join(", ")}.
      {bests.length ? ` New ${bests.join(" and ")}.` : ""}
    </p>
  );
}

function formatDelta(value: number | null, suffix = "") {
  if (value === null) return "not available";
  return `${value > 0 ? "+" : ""}${value}${suffix}`;
}
