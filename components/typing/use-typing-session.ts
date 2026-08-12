"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { calculateLessonStars } from "@/lib/curriculum/stars";
import { isKnownLessonId } from "@/lib/progress/ids";
import { calculateAccuracyStars } from "@/lib/progress/typing-test-results";
import {
  applyTypingInput,
  createTypingAttempt,
  extendTypingAttempt,
  summarizeTypingAttempt,
} from "@/lib/typing/attempt";
import type { TypingInputAction } from "@/lib/typing/attempt";
import { buildTypingContent } from "@/lib/typing/corpus";
import {
  actionFromBeforeInput,
  actionFromKeydown,
  actionFromVirtualKey,
} from "@/lib/typing/input";
import {
  calculateTypingStats,
  formatClock,
  getPerformanceStars,
} from "@/lib/typing/metrics";
import {
  completeActiveTimer,
  createActiveTimer,
  elapsedActiveTime,
  pauseActiveTimer,
  resumeActiveTimer,
  startActiveTimer,
} from "@/lib/typing/timer";
import {
  readTypingTestPreferences,
  writeTypingTestPreferences,
} from "@/lib/typing/test-settings";
import type { TypingTestDuration } from "@/lib/typing/test-settings";
import type {
  KeyboardStatsPlacement,
  TypingKeyFeedback,
  TypingSessionSettings,
  TypingSettingsUpdate,
  TypingTestProps,
} from "@/components/typing/typing-test-types";
import { useTypingCompletion } from "@/components/typing/use-typing-completion";

type UseTypingSessionOptions = Pick<
  TypingTestProps,
  | "defaultDifficulty"
  | "defaultDuration"
  | "defaultMode"
  | "defaultNumbers"
  | "defaultPunctuation"
  | "defaultShowLiveStats"
  | "initialText"
  | "lessonTargets"
  | "loadSavedPreferences"
  | "lockText"
  | "onAttemptComplete"
  | "persistCompletion"
  | "practice"
  | "testName"
  | "untimed"
> & {
  resultPresentation: "standard" | "stage";
};

export function useTypingSession({
  defaultDifficulty = "medium",
  defaultDuration = 60,
  defaultMode = "words",
  defaultNumbers = false,
  defaultPunctuation = false,
  defaultShowLiveStats = true,
  initialText,
  lessonTargets,
  loadSavedPreferences = true,
  lockText = false,
  onAttemptComplete,
  persistCompletion = true,
  practice,
  resultPresentation,
  testName = "words",
  untimed = false,
}: UseTypingSessionOptions) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const settingsTriggerRef = useRef<HTMLButtonElement>(null);
  const keyFeedbackTimeoutRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const timerRef = useRef(createActiveTimer());
  const extensionCountRef = useRef(0);
  const initialContentRef = useRef(
    initialText
      ? { contentVersion: 1, quoteIds: [] as string[], text: initialText }
      : buildTypingContent({
          mode: defaultMode,
          difficulty: defaultDifficulty,
          duration: defaultDuration,
          numbers: defaultNumbers,
          punctuation: defaultPunctuation,
        }),
  );
  const [duration, setDuration] = useState(
    defaultDuration as TypingTestDuration,
  );
  const [mode, setMode] = useState(defaultMode);
  const [difficulty, setDifficulty] = useState(defaultDifficulty);
  const [numbers, setNumbers] = useState(defaultNumbers);
  const [punctuation, setPunctuation] = useState(defaultPunctuation);
  const [showLiveStats, setShowLiveStats] = useState(defaultShowLiveStats);
  const [preferencesReady, setPreferencesReady] = useState(
    lockText || !loadSavedPreferences,
  );
  const [text, setText] = useState(initialContentRef.current.text);
  const [quoteIds, setQuoteIds] = useState(initialContentRef.current.quoteIds);
  const [attempt, setAttempt] = useState(() => createTypingAttempt(text));
  const attemptRef = useRef(attempt);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  const [announcement, setAnnouncement] = useState("Typing ready.");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [keyboardStatsPlacement, setKeyboardStatsPlacement] =
    useState<KeyboardStatsPlacement>("right");
  const [keyFeedback, setKeyFeedback] = useState<TypingKeyFeedback | null>(
    null,
  );
  const [resetToken, setResetToken] = useState(0);

  const cursor = attempt.cursor;
  const statuses = attempt.statuses;
  const attemptSummary = useMemo(
    () => summarizeTypingAttempt(attempt),
    [attempt],
  );
  const remainingSeconds = Math.max(
    0,
    duration - Math.floor(elapsedMilliseconds / 1_000),
  );
  const stats = useMemo(
    () =>
      calculateTypingStats({
        attemptSummary,
        statuses,
        elapsedMilliseconds,
      }),
    [attemptSummary, elapsedMilliseconds, statuses],
  );
  const expectedKey = completed ? null : (text[cursor] ?? null);
  const isStandaloneTest = !isKnownLessonId(testName) && !practice;
  const resultStars = lessonTargets
    ? calculateLessonStars({
        accuracy: stats.accuracy,
        wpm: stats.wpm,
        ...lessonTargets,
      })
    : practice
      ? Math.round(getPerformanceStars(stats.wpm, stats.accuracy))
      : calculateAccuracyStars(stats.accuracy);
  const completion = useTypingCompletion({
    completed,
    difficulty,
    duration,
    elapsedMilliseconds,
    isStandaloneTest,
    keystrokes: attempt.keystrokes,
    mode,
    numbers,
    onAttemptComplete,
    persistCompletion,
    practice,
    punctuation,
    stars: resultStars,
    stats,
    testName,
  });
  const resetCompletion = completion.reset;

  const focusInput = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const flashKey = useCallback(
    (key: string, state: TypingKeyFeedback["state"]) => {
      if (keyFeedbackTimeoutRef.current) {
        window.clearTimeout(keyFeedbackTimeoutRef.current);
      }

      setKeyFeedback({ key, state, token: Date.now() });
      keyFeedbackTimeoutRef.current = window.setTimeout(() => {
        setKeyFeedback(null);
        keyFeedbackTimeoutRef.current = null;
      }, 260);
    },
    [],
  );

  const resetTest = useCallback(
    (nextText: string, nextQuoteIds: string[] = []) => {
      const nextAttempt = createTypingAttempt(nextText);
      setText(nextText);
      setQuoteIds(nextQuoteIds);
      attemptRef.current = nextAttempt;
      setAttempt(nextAttempt);
      timerRef.current = createActiveTimer();
      extensionCountRef.current = 0;
      completedRef.current = false;
      setStarted(false);
      setCompleted(false);
      setElapsedMilliseconds(0);
      resetCompletion();
      setKeyFeedback(null);
      setResetToken((current) => current + 1);
      setAnnouncement("Typing ready.");
      requestAnimationFrame(focusInput);
    },
    [focusInput, resetCompletion],
  );

  const regenerate = useCallback(() => {
    if (initialText && lockText) {
      resetTest(initialText);
      return;
    }
    const content = buildTypingContent({
      mode,
      difficulty,
      duration,
      numbers,
      punctuation,
      seed: Date.now(),
    });
    resetTest(content.text, content.quoteIds);
  }, [
    difficulty,
    duration,
    initialText,
    lockText,
    mode,
    numbers,
    punctuation,
    resetTest,
  ]);

  const updateSettings = useCallback((update: TypingSettingsUpdate) => {
    if (update.difficulty !== undefined) setDifficulty(update.difficulty);
    if (update.duration !== undefined)
      setDuration(update.duration as TypingTestDuration);
    if (update.keyboardStatsPlacement !== undefined)
      setKeyboardStatsPlacement(update.keyboardStatsPlacement);
    if (update.mode !== undefined) setMode(update.mode);
    if (update.numbers !== undefined) setNumbers(update.numbers);
    if (update.punctuation !== undefined) setPunctuation(update.punctuation);
    if (update.showLiveStats !== undefined)
      setShowLiveStats(update.showLiveStats);
  }, []);

  useEffect(() => {
    if (lockText || !loadSavedPreferences) return;
    const saved = readTypingTestPreferences();
    if (saved) updateSettings(saved);
    setPreferencesReady(true);
  }, [loadSavedPreferences, lockText, updateSettings]);

  useEffect(() => {
    if (lockText || !preferencesReady) return;
    const content = buildTypingContent({
      mode,
      difficulty,
      duration,
      numbers,
      punctuation,
      seed: 0,
    });
    resetTest(content.text, content.quoteIds);
    writeTypingTestPreferences({
      mode,
      difficulty,
      duration,
      numbers,
      punctuation,
      showLiveStats,
    });
  }, [
    difficulty,
    duration,
    lockText,
    mode,
    numbers,
    preferencesReady,
    punctuation,
    resetTest,
    showLiveStats,
  ]);

  useEffect(() => {
    if (
      lockText ||
      mode !== "words" ||
      !started ||
      completed ||
      text.length - cursor > 800
    )
      return;
    extensionCountRef.current += 1;
    const additional = ` ${
      buildTypingContent({
        mode,
        difficulty,
        duration: 60,
        numbers,
        punctuation,
        seed: duration + extensionCountRef.current * 104729,
      }).text
    }`;
    const extendedAttempt = extendTypingAttempt(attemptRef.current, additional);
    attemptRef.current = extendedAttempt;
    setAttempt(extendedAttempt);
    setText(extendedAttempt.text);
  }, [
    completed,
    cursor,
    difficulty,
    duration,
    lockText,
    mode,
    numbers,
    punctuation,
    started,
    text.length,
  ]);

  useEffect(() => {
    requestAnimationFrame(focusInput);
    return () => {
      if (keyFeedbackTimeoutRef.current) {
        window.clearTimeout(keyFeedbackTimeoutRef.current);
      }
    };
  }, [focusInput]);

  const completeAttempt = useCallback(
    (nowMs: number, elapsedLimitMs?: number) => {
      if (completedRef.current) return false;

      completedRef.current = true;
      const completedTimer = completeActiveTimer(timerRef.current, nowMs);
      const finalElapsed = Math.min(
        elapsedLimitMs ?? Number.POSITIVE_INFINITY,
        elapsedActiveTime(completedTimer, nowMs),
      );
      timerRef.current = { ...completedTimer, accumulatedMs: finalElapsed };
      setElapsedMilliseconds(finalElapsed);
      setCompleted(true);
      setAnnouncement(
        resultPresentation === "stage"
          ? "Stage complete. Stage feedback is available."
          : "Typing complete. Results are available.",
      );
      return true;
    },
    [resultPresentation],
  );

  useEffect(() => {
    if (!started || completed || untimed) return;

    const durationMs = duration * 1_000;
    const tick = () => {
      const nowMs = performance.now();
      const elapsed = elapsedActiveTime(timerRef.current, nowMs);
      if (elapsed >= durationMs) {
        completeAttempt(nowMs, durationMs);
        return;
      }
      setElapsedMilliseconds(elapsed);
    };

    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [completeAttempt, completed, duration, started, untimed]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!timerRef.current.started || completedRef.current) return;
      const nowMs = performance.now();

      if (document.visibilityState === "hidden") {
        timerRef.current = pauseActiveTimer(timerRef.current, nowMs);
        setElapsedMilliseconds(elapsedActiveTime(timerRef.current, nowMs));
        setAnnouncement("Typing paused while this tab is hidden.");
        return;
      }

      timerRef.current = resumeActiveTimer(timerRef.current, nowMs);
      setAnnouncement("Typing resumed.");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const processAction = useCallback(
    (action: TypingInputAction) => {
      if (completedRef.current) return false;

      const transition = applyTypingInput(attemptRef.current, action);
      if (!transition.accepted) return false;

      attemptRef.current = transition.state;
      setAttempt(transition.state);

      if (!transition.characterInput) {
        flashKey("Backspace", "neutral");
        return true;
      }

      const nowMs = performance.now();
      if (!timerRef.current.started) {
        timerRef.current = startActiveTimer(timerRef.current, nowMs);
        setStarted(true);
        setAnnouncement("Typing started.");
      }

      const key = action.type === "character" ? action.key : "";
      flashKey(key, transition.correct ? "correct" : "error");

      if (transition.becameComplete) completeAttempt(nowMs);
      return true;
    },
    [completeAttempt, flashKey],
  );

  const processVirtualKey = useCallback(
    (key: string) => {
      const action = actionFromVirtualKey(key);
      if (action) processAction(action);
      requestAnimationFrame(focusInput);
    },
    [focusInput, processAction],
  );

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    requestAnimationFrame(() =>
      settingsTriggerRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent) => {
      const action = actionFromKeydown({
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        isComposing: event.nativeEvent.isComposing,
        key: event.key,
        metaKey: event.metaKey,
        repeat: event.repeat,
      });
      if (!action) return;
      event.preventDefault();
      processAction(action);
    },
    [processAction],
  );

  const handleBeforeInput = useCallback(
    (event: FormEvent<HTMLTextAreaElement>) => {
      const inputEvent = event.nativeEvent as InputEvent;
      const action = actionFromBeforeInput({
        data: inputEvent.data,
        inputType: inputEvent.inputType,
        isComposing: inputEvent.isComposing,
        isTrusted: inputEvent.isTrusted,
      });
      event.preventDefault();
      if (action) processAction(action);
    },
    [processAction],
  );

  useEffect(() => {
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (settingsOpen && event.key === "Escape") {
        closeSettings();
        return;
      }

      if (settingsOpen || completedRef.current || event.defaultPrevented)
        return;
      if (isInteractiveTypingTarget(event.target)) return;

      const action = actionFromKeydown(event);
      if (!action) return;
      event.preventDefault();
      processAction(action);
      focusInput();
    };

    window.addEventListener("keydown", handleDocumentKeyDown);
    return () => window.removeEventListener("keydown", handleDocumentKeyDown);
  }, [closeSettings, focusInput, processAction, settingsOpen]);

  const displayStats = useMemo(
    () =>
      showLiveStats
        ? [
            {
              label: "time",
              value: formatClock(
                untimed
                  ? Math.floor(elapsedMilliseconds / 1_000)
                  : remainingSeconds,
              ),
            },
            { label: "WPM", value: stats.wpm },
            { label: "accuracy", value: `${stats.accuracy}%` },
          ]
        : [],
    [
      elapsedMilliseconds,
      remainingSeconds,
      showLiveStats,
      stats.accuracy,
      stats.wpm,
      untimed,
    ],
  );

  const onCompositionEnd = useCallback(
    () =>
      setAnnouncement(
        "Composition committed. Type the expected English character to continue.",
      ),
    [],
  );
  const onCompositionStart = useCallback(
    () => setAnnouncement("Composition input is not counted until committed."),
    [],
  );
  const actions = useMemo(
    () => ({
      closeSettings,
      focusInput,
      handleBeforeInput,
      handleKeyDown,
      onCompositionEnd,
      onCompositionStart,
      openSettings,
      processVirtualKey,
      regenerate,
      updateSettings,
    }),
    [
      closeSettings,
      focusInput,
      handleBeforeInput,
      handleKeyDown,
      onCompositionEnd,
      onCompositionStart,
      openSettings,
      processVirtualKey,
      regenerate,
      updateSettings,
    ],
  );
  const settings = useMemo<TypingSessionSettings>(
    () => ({
      difficulty,
      duration,
      keyboardStatsPlacement,
      mode,
      numbers,
      open: settingsOpen,
      punctuation,
      showLiveStats,
    }),
    [
      difficulty,
      duration,
      keyboardStatsPlacement,
      mode,
      numbers,
      punctuation,
      settingsOpen,
      showLiveStats,
    ],
  );

  return {
    actions,
    keyboard: {
      displayStats,
      expectedKey,
      feedback: keyFeedback,
      resetToken,
    },
    metrics: {
      comparison: completion.comparison,
      stars: resultStars,
      stats,
    },
    refs: {
      input: inputRef,
      settingsTrigger: settingsTriggerRef,
    },
    result: {
      isStandaloneTest,
      quoteIds,
      saveState: completion.saveState,
      unlockedAchievementIds: completion.unlockedAchievementIds,
    },
    settings,
    state: {
      announcement,
      completed,
      cursor,
      started,
      statuses,
      text,
    },
  };
}

function isInteractiveTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target === document.body || target === document.documentElement)
    return false;
  return Boolean(
    target.closest(
      "input, textarea, select, button, a, [contenteditable='true'], [role='button']",
    ),
  );
}
