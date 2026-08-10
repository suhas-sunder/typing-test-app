"use client";

import {
  TypingTopControls,
  TypingSettingsModal,
} from "@/components/typing/typing-controls";
import { TypingKeyboardArea } from "@/components/typing/typing-keyboard-area";
import {
  TypingResultSummary,
  type TypingResultViewModel,
} from "@/components/typing/typing-result-summary";
import type { TypingTestProps } from "@/components/typing/typing-test-types";
import { TypingViewport } from "@/components/typing/typing-viewport";
import { useTypingSession } from "@/components/typing/use-typing-session";

export function TypingTest({
  allowedCharacters,
  title = "Typing Test",
  subtitle = "Focus on accuracy first. Speed follows the rhythm you build.",
  initialText,
  testName = "words",
  defaultDuration = 60,
  defaultMode = "words",
  defaultDifficulty = "medium",
  defaultNumbers = false,
  defaultPunctuation = false,
  defaultShowLiveStats = true,
  lockText = false,
  compact = false,
  lessonTargets,
  practice,
  titleHeading = "h1",
  loadSavedPreferences = true,
  untimed = false,
  persistCompletion = true,
  completionActionLabel,
  onCompletionAction,
  onAttemptComplete,
  resultPresentation: requestedResultPresentation,
  showAttemptContext,
  afterTypingSurface,
  setupControls,
}: TypingTestProps) {
  const resultPresentation =
    requestedResultPresentation ??
    (completionActionLabel ? "stage" : "standard");
  const shouldShowAttemptContext =
    showAttemptContext ?? resultPresentation === "standard";
  const TitleHeading = titleHeading;
  const session = useTypingSession({
    defaultDifficulty,
    defaultDuration,
    defaultMode,
    defaultNumbers,
    defaultPunctuation,
    defaultShowLiveStats,
    initialText,
    lessonTargets,
    loadSavedPreferences,
    lockText,
    onAttemptComplete,
    persistCompletion,
    practice,
    resultPresentation,
    testName,
    untimed,
  });

  const result: TypingResultViewModel = {
    accuracy: session.metrics.stats.accuracy,
    characters:
      session.metrics.stats.correctChars +
      session.metrics.stats.uncorrectedErrors,
    comparison: session.metrics.comparison,
    correctedErrors: session.metrics.stats.correctedErrors,
    difficulty: session.settings.difficulty,
    duration: session.settings.duration,
    errors: session.metrics.stats.incorrectKeypresses,
    isTypingTest: session.result.isStandaloneTest,
    mode: session.settings.mode,
    numbers:
      session.settings.mode === "words" ? session.settings.numbers : false,
    presentation: resultPresentation,
    punctuation:
      session.settings.mode === "words" ? session.settings.punctuation : false,
    quoteIds: session.result.quoteIds,
    saveState: session.result.saveState,
    stars: session.metrics.stars,
    uncorrectedErrors: session.metrics.stats.uncorrectedErrors,
    unlockedAchievementIds: session.result.unlockedAchievementIds,
    wpm: session.metrics.stats.wpm,
  };

  return (
    <section
      className={compact ? "" : "pb-5 pt-4 sm:pb-6 sm:pt-6 lg:pb-7 lg:pt-7"}
    >
      <div className="page-shell">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <TypingTopControls
              lockText={lockText}
              onOpenSettings={session.actions.openSettings}
              onRestart={session.actions.regenerate}
              onUpdateSettings={session.actions.updateSettings}
              settings={session.settings}
              settingsTriggerRef={session.refs.settingsTrigger}
              setupControls={setupControls}
            />

            <TypingViewport
              announcement={session.state.announcement}
              completed={session.state.completed}
              cursor={session.state.cursor}
              inputRef={session.refs.input}
              onBeforeInput={session.actions.handleBeforeInput}
              onCompositionEnd={session.actions.onCompositionEnd}
              onCompositionStart={session.actions.onCompositionStart}
              onFocusInput={session.actions.focusInput}
              onKeyDown={session.actions.handleKeyDown}
              resetToken={session.keyboard.resetToken}
              started={session.state.started}
              statuses={session.state.statuses}
              text={session.state.text}
            />
          </div>

          <TypingKeyboardArea
            allowedCharacters={allowedCharacters}
            content={session.state.text}
            displayStats={session.keyboard.displayStats}
            expectedKey={session.keyboard.expectedKey}
            keyFeedback={session.keyboard.feedback}
            keyboardStatsPlacement={session.settings.keyboardStatsPlacement}
            onKeyPress={session.actions.processVirtualKey}
            resetToken={session.keyboard.resetToken}
          />

          {afterTypingSurface}

          {shouldShowAttemptContext ? (
            <div className="mt-9 max-w-2xl">
              <p className="eyebrow">
                {session.state.completed
                  ? "Results"
                  : session.state.started
                    ? "Keep going"
                    : "Ready when you are"}
              </p>
              <TitleHeading className="heading-lg mt-2">{title}</TitleHeading>
              <p className="body-lg mt-3 max-w-2xl">{subtitle}</p>
            </div>
          ) : null}

          {session.state.completed ? (
            <TypingResultSummary
              completionActionLabel={completionActionLabel}
              onChangeSettings={session.actions.openSettings}
              onCompletionAction={onCompletionAction}
              onRetry={session.actions.regenerate}
              result={result}
            />
          ) : null}

          {session.settings.open ? (
            <TypingSettingsModal
              lockText={lockText}
              onClose={session.actions.closeSettings}
              onUpdateSettings={session.actions.updateSettings}
              settings={session.settings}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export { StarRating } from "@/components/typing/typing-result-summary";
export type { TypingTestProps } from "@/components/typing/typing-test-types";
