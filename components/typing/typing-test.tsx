"use client";

import { Clock3, Gauge, RotateCcw, Save, Settings, Trophy, Type, X } from "lucide-react";
import { type ReactNode, type RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { isKnownLessonId } from "@/lib/progress/ids";
import { recordLessonCompletion, recordTypingTestCompletion } from "@/lib/progress/repository";
import { applyTypingInput, createTypingAttempt, summarizeTypingAttempt, type TypingInputAction } from "@/lib/typing/attempt";
import { buildTypingText, DIFFICULTIES, getDifficulty } from "@/lib/typing/content";
import { actionFromBeforeInput, actionFromKeydown, actionFromVirtualKey } from "@/lib/typing/input";
import { calculateTypingStats, formatClock, getPerformanceStars } from "@/lib/typing/metrics";
import {
  completeActiveTimer,
  createActiveTimer,
  elapsedActiveTime,
  pauseActiveTimer,
  resumeActiveTimer,
  startActiveTimer,
} from "@/lib/typing/timer";
import type { CharStatus, DifficultyId, TestMode } from "@/lib/typing/types";
import { VisualKeyboard } from "@/components/typing/visual-keyboard";

const DURATIONS = [15, 30, 60, 120];
const KEYBOARD_STATS_PLACEMENTS = ["right", "left", "hidden"] as const;
const LINE_TOP_TOLERANCE_PX = 3;

type KeyboardStatsPlacement = (typeof KEYBOARD_STATS_PLACEMENTS)[number];

type TypingWord = {
  wordIndex: number;
  start: number;
  end: number;
  text: string;
  trailing: string;
  trailingStart: number;
};

type TypingTestProps = {
  title?: string;
  subtitle?: string;
  initialText?: string;
  testName?: string;
  defaultDuration?: number;
  defaultMode?: TestMode;
  defaultDifficulty?: DifficultyId;
  lockText?: boolean;
  compact?: boolean;
};

export function TypingTest({
  title = "Typing Test",
  subtitle = "Focus on accuracy first. Speed follows the rhythm you build.",
  initialText,
  testName = "words",
  defaultDuration = 60,
  defaultMode = "words",
  defaultDifficulty = "medium",
  lockText = false,
  compact = false,
}: TypingTestProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textViewportRef = useRef<HTMLDivElement>(null);
  const textStreamRef = useRef<HTMLDivElement>(null);
  const cursorCharRef = useRef<HTMLSpanElement | null>(null);
  const settingsTriggerRef = useRef<HTMLButtonElement>(null);
  const keyFeedbackTimeoutRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const savedAttemptRef = useRef(false);
  const timerRef = useRef(createActiveTimer());
  const [duration, setDuration] = useState(defaultDuration);
  const [mode, setMode] = useState<TestMode>(defaultMode);
  const [difficulty, setDifficulty] = useState<DifficultyId>(defaultDifficulty);
  const [text, setText] = useState(() => initialText ?? buildTypingText({ mode: defaultMode, difficulty: defaultDifficulty, duration: defaultDuration }));
  const [attempt, setAttempt] = useState(() => createTypingAttempt(text));
  const attemptRef = useRef(attempt);
  const [measuredLines, setMeasuredLines] = useState<Array<{ firstWordIndex: number; top: number }>>([{ firstWordIndex: 0, top: 0 }]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  const [announcement, setAnnouncement] = useState("Typing ready.");
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [keyboardStatsPlacement, setKeyboardStatsPlacement] = useState<KeyboardStatsPlacement>("right");
  const [keyFeedback, setKeyFeedback] = useState<{
    key: string;
    state: "correct" | "error" | "neutral";
    token: number;
  } | null>(null);

  const cursor = attempt.cursor;
  const statuses = attempt.statuses;
  const attemptSummary = useMemo(() => summarizeTypingAttempt(attempt), [attempt]);
  const selectedDifficulty = getDifficulty(difficulty);
  const typingWords = useMemo(() => buildTypingWords(text), [text]);
  const activeWordIndex = useMemo(() => getActiveWordIndex(typingWords, cursor), [cursor, typingWords]);
  const remainingSeconds = Math.max(0, duration - Math.floor(elapsedMilliseconds / 1_000));
  const stats = useMemo(
    () =>
      calculateTypingStats({
        attemptSummary,
        statuses,
        elapsedMilliseconds,
        difficultyScore: selectedDifficulty.scoreBonus,
      }),
    [attemptSummary, elapsedMilliseconds, selectedDifficulty.scoreBonus, statuses],
  );
  const expectedKey = completed ? null : text[cursor] ?? null;
  const streamOffset = measuredLines[activeLineIndex]?.top ?? 0;
  const resultDurationSeconds = Math.max(1, Math.ceil(elapsedMilliseconds / 1_000));

  const resetTypingViewport = useCallback(() => {
    const viewport = textViewportRef.current;
    if (viewport) {
      viewport.scrollTop = 0;
    }
    setActiveLineIndex(0);
  }, []);

  const flashKey = useCallback((key: string, state: "correct" | "error" | "neutral") => {
    if (keyFeedbackTimeoutRef.current) {
      window.clearTimeout(keyFeedbackTimeoutRef.current);
    }

    setKeyFeedback({ key, state, token: Date.now() });
    keyFeedbackTimeoutRef.current = window.setTimeout(() => {
      setKeyFeedback(null);
      keyFeedbackTimeoutRef.current = null;
    }, 260);
  }, []);

  const resetTest = useCallback(
    (nextText: string) => {
      const nextAttempt = createTypingAttempt(nextText);
      setText(nextText);
      attemptRef.current = nextAttempt;
      setAttempt(nextAttempt);
      timerRef.current = createActiveTimer();
      completedRef.current = false;
      savedAttemptRef.current = false;
      setStarted(false);
      setCompleted(false);
      setElapsedMilliseconds(0);
      setSaveState("idle");
      setKeyFeedback(null);
      setAnnouncement("Typing ready.");
      requestAnimationFrame(() => {
        resetTypingViewport();
        inputRef.current?.focus({ preventScroll: true });
      });
    },
    [resetTypingViewport],
  );

  const regenerate = useCallback(() => {
    const nextText = initialText && lockText ? initialText : buildTypingText({ mode, difficulty, duration, seed: Date.now() });
    resetTest(nextText);
  }, [difficulty, duration, initialText, lockText, mode, resetTest]);

  useEffect(() => {
    if (lockText) return;
    const nextText = buildTypingText({ mode, difficulty, duration, seed: 0 });
    resetTest(nextText);
  }, [difficulty, duration, lockText, mode, resetTest]);

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));

    return () => {
      if (keyFeedbackTimeoutRef.current) {
        window.clearTimeout(keyFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const measureTypingLines = useCallback(() => {
    const stream = textStreamRef.current;
    if (!stream) return;

    const wordNodes = Array.from(stream.querySelectorAll<HTMLElement>("[data-word-index]"));
    if (wordNodes.length === 0) {
      setMeasuredLines([{ firstWordIndex: 0, top: 0 }]);
      return;
    }

    const nextLines: Array<{ firstWordIndex: number; top: number }> = [];
    for (const wordNode of wordNodes) {
      const wordIndex = Number(wordNode.dataset.wordIndex ?? 0);
      const top = wordNode.offsetTop;
      const line = nextLines.find((item) => Math.abs(item.top - top) <= LINE_TOP_TOLERANCE_PX);

      if (line) {
        line.firstWordIndex = Math.min(line.firstWordIndex, wordIndex);
      } else {
        nextLines.push({ firstWordIndex: wordIndex, top });
      }
    }

    nextLines.sort((a, b) => a.top - b.top);
    setMeasuredLines((current) => (measuredLinesEqual(current, nextLines) ? current : nextLines));
  }, []);

  useLayoutEffect(() => {
    measureTypingLines();

    let frame = 0;
    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measureTypingLines);
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    if (textViewportRef.current) resizeObserver.observe(textViewportRef.current);
    if (textStreamRef.current) resizeObserver.observe(textStreamRef.current);

    window.addEventListener("resize", scheduleMeasure);
    document.fonts?.ready.then(scheduleMeasure).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [measureTypingLines, text]);

  useEffect(() => {
    const nextLineIndex = getLineIndexForWord(measuredLines, activeWordIndex);
    setActiveLineIndex((current) => (current === nextLineIndex ? current : nextLineIndex));
  }, [activeWordIndex, measuredLines]);

  const completeAttempt = useCallback(
    (nowMs: number, elapsedLimitMs?: number) => {
      if (completedRef.current) return false;

      completedRef.current = true;
      const completedTimer = completeActiveTimer(timerRef.current, nowMs);
      const finalElapsed = Math.min(elapsedLimitMs ?? Number.POSITIVE_INFINITY, elapsedActiveTime(completedTimer, nowMs));
      timerRef.current = { ...completedTimer, accumulatedMs: finalElapsed };
      setElapsedMilliseconds(finalElapsed);
      setCompleted(true);
      setAnnouncement("Typing complete. Results are available.");
      return true;
    },
    [],
  );

  useEffect(() => {
    if (!started || completed) return;

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
  }, [completeAttempt, completed, duration, started]);

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
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
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

      if (transition.becameComplete) {
        completeAttempt(nowMs);
      }

      return true;
    },
    [completeAttempt, flashKey],
  );

  const processVirtualKey = useCallback(
    (key: string) => {
      const action = actionFromVirtualKey(key);
      if (action) processAction(action);
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    },
    [processAction],
  );

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    requestAnimationFrame(() => settingsTriggerRef.current?.focus({ preventScroll: true }));
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
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
    (event: React.FormEvent<HTMLTextAreaElement>) => {
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

      if (settingsOpen || completedRef.current || event.defaultPrevented) return;
      if (isInteractiveTypingTarget(event.target)) return;

      const action = actionFromKeydown(event);
      if (!action) return;
      event.preventDefault();
      processAction(action);
      inputRef.current?.focus({ preventScroll: true });
    };

    window.addEventListener("keydown", handleDocumentKeyDown);
    return () => window.removeEventListener("keydown", handleDocumentKeyDown);
  }, [closeSettings, processAction, settingsOpen]);

  useEffect(() => {
    if (!completed || saveState !== "idle") return;
    if (savedAttemptRef.current) return;
    savedAttemptRef.current = true;
    const completedAt = new Date().toISOString();
    const stars = getPerformanceStars(stats.wpm, stats.accuracy);
    const result = isKnownLessonId(testName)
      ? recordLessonCompletion({
          accuracy: stats.accuracy,
          completedAt,
          lessonId: testName,
          stars,
          wpm: stats.wpm,
        })
      : recordTypingTestCompletion({
          accuracy: stats.accuracy,
          completedAt,
          correctedErrors: stats.correctedErrors,
          difficulty,
          durationSeconds: duration,
          elapsedSeconds: resultDurationSeconds,
          mode,
          score: stats.score,
          uncorrectedErrors: stats.uncorrectedErrors,
          wpm: stats.wpm,
        });
    setSaveState(result.status === "available" ? "saved" : "error");
  }, [completed, difficulty, duration, mode, resultDurationSeconds, saveState, stats, testName]);

  const displayStats = [
    { label: "time", value: formatClock(remainingSeconds) },
    { label: "WPM", value: stats.wpm },
    { label: "accuracy", value: `${stats.accuracy}%` },
  ];

  return (
    <section className={compact ? "" : "pb-5 pt-4 sm:pb-6 sm:pt-6 lg:pb-7 lg:pt-7"}>
      <div className="page-shell">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <TypingTopControls
              difficulty={difficulty}
              duration={duration}
              lockText={lockText}
              mode={mode}
              onDifficultyChange={setDifficulty}
              onDurationChange={setDuration}
              onModeChange={setMode}
              onOpenSettings={() => setSettingsOpen(true)}
              onRestart={regenerate}
              settingsTriggerRef={settingsTriggerRef}
            />

            <div
              className="relative rounded-[12px] py-1 focus-within:bg-camp-paper/40"
              data-testid="typing-surface"
              onClick={() => inputRef.current?.focus({ preventScroll: true })}
            >
              <textarea
                ref={inputRef}
                className="sr-only"
                value=""
                aria-label="Typing input"
                autoCapitalize="off"
                autoCorrect="off"
                inputMode="text"
                spellCheck={false}
                onBeforeInput={handleBeforeInput}
                onChange={() => undefined}
                onCompositionEnd={() => setAnnouncement("Composition committed. Type the expected English character to continue.")}
                onCompositionStart={() => setAnnouncement("Composition input is not counted until committed.")}
                onKeyDown={handleKeyDown}
                onPaste={(event) => event.preventDefault()}
              />

              <p className="sr-only" role="status" aria-live="polite">
                {announcement}
              </p>

              {!started && !completed ? (
                <div className="pointer-events-none absolute -left-1 top-0 z-10 inline-flex items-center gap-2 rounded-2xl bg-camp-peach px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-camp-coral after:absolute after:left-9 after:top-[calc(100%-5px)] after:h-4 after:w-4 after:rotate-45 after:rounded-[3px] after:bg-camp-peach sm:-left-2 sm:-top-1">
                  <span className="h-2 w-2 rounded-full bg-camp-orange" />
                  Start typing
                </div>
              ) : null}

              <div className="relative pt-5 sm:pt-6">
                <div
                  ref={textViewportRef}
                  data-testid="typing-text-viewport"
                  className="relative h-[calc(var(--typing-visible-lines)*var(--typing-line-height))] overflow-hidden whitespace-normal break-normal pr-1 text-[1.35rem] font-semibold leading-[var(--typing-line-height)] text-camp-ink [--typing-line-height:2.295rem] [--typing-visible-lines:4] sm:text-[1.5rem] sm:[--typing-line-height:2.55rem] sm:[--typing-visible-lines:5] lg:text-[1.6rem] lg:[--typing-line-height:2.64rem]"
                >
                  <div
                    ref={textStreamRef}
                    data-testid="typing-text-stream"
                    className="typingStream"
                    style={{ transform: `translate3d(0, -${streamOffset}px, 0)` }}
                  >
                    {typingWords.map((word) => (
                      <span key={word.wordIndex}>
                        <span data-word-index={word.wordIndex} className="inline-block whitespace-nowrap">
                          {renderTypingChars({ completed, cursor, cursorCharRef, startIndex: word.start, statuses, text: word.text })}
                        </span>
                        {renderTypingChars({ completed, cursor, cursorCharRef, startIndex: word.trailingStart, statuses, text: word.trailing })}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-pill bg-camp-tan">
                <div
                  className="h-full rounded-pill bg-camp-orange transition-all"
                  style={{ width: `${Math.min(100, (cursor / text.length) * 100)}%` }}
                />
              </div>
            </div>

          </div>

          <KeyboardPracticeArea
            displayStats={displayStats}
            expectedKey={expectedKey}
            keyFeedback={keyFeedback}
            keyboardStatsPlacement={keyboardStatsPlacement}
            onKeyPress={processVirtualKey}
          />

          <div className="mt-9 max-w-2xl">
            <p className="eyebrow">{completed ? "Results" : started ? "Keep going" : "Ready when you are"}</p>
            <h1 className="heading-lg mt-2">{title}</h1>
            <p className="body-lg mt-3 max-w-2xl">{subtitle}</p>
          </div>

          {completed ? (
            <ResultsPanel
              accuracy={stats.accuracy}
              chars={stats.trackedKeystrokes}
              correctedErrors={stats.correctedErrors}
              duration={resultDurationSeconds}
              errors={stats.incorrectKeypresses}
              onRetry={regenerate}
              saveState={saveState}
              score={stats.score}
              stars={getPerformanceStars(stats.wpm, stats.accuracy)}
              uncorrectedErrors={stats.uncorrectedErrors}
              wpm={stats.wpm}
            />
          ) : null}

          {settingsOpen ? (
            <TypingSettingsModal
              difficulty={difficulty}
              duration={duration}
              lockText={lockText}
              mode={mode}
              onClose={closeSettings}
              onDifficultyChange={setDifficulty}
              onDurationChange={setDuration}
              onKeyboardStatsPlacementChange={setKeyboardStatsPlacement}
              onModeChange={setMode}
              keyboardStatsPlacement={keyboardStatsPlacement}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function TypingTopControls({
  difficulty,
  duration,
  lockText,
  mode,
  onDifficultyChange,
  onDurationChange,
  onModeChange,
  onOpenSettings,
  onRestart,
  settingsTriggerRef,
}: {
  difficulty: DifficultyId;
  duration: number;
  lockText: boolean;
  mode: TestMode;
  onDifficultyChange: (value: DifficultyId) => void;
  onDurationChange: (value: number) => void;
  onModeChange: (value: TestMode) => void;
  onOpenSettings: () => void;
  onRestart: () => void;
  settingsTriggerRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div className="relative z-20 mb-1 flex min-h-9 justify-end">
      <div className="flex max-w-full items-center justify-end gap-x-3 overflow-hidden whitespace-nowrap">
        {!lockText ? (
          <>
            <div className="hidden md:block">
              <QuickTimeOptions duration={duration} onDurationChange={onDurationChange} />
            </div>
            <div className="hidden lg:block">
              <QuickModeOptions mode={mode} onModeChange={onModeChange} />
            </div>
            <div className="hidden xl:block">
              <QuickLevelOptions difficulty={difficulty} onDifficultyChange={onDifficultyChange} />
            </div>
            <SettingsButton buttonRef={settingsTriggerRef} onOpenSettings={onOpenSettings} />
          </>
        ) : null}

        <button
          type="button"
          className="inline-flex h-8 shrink-0 items-center justify-center gap-2 rounded-pill bg-camp-paper px-4 text-sm font-extrabold text-camp-ink shadow-[var(--button-depth-muted)] transition hover:-translate-y-0.5 hover:bg-camp-peach hover:text-camp-coral focus-visible:bg-camp-peach focus-visible:text-camp-coral focus-visible:outline-none active:translate-y-[2px] active:shadow-[var(--button-depth-pressed)]"
          onClick={onRestart}
        >
          <RotateCcw aria-hidden size={16} className="shrink-0" />
          Restart
        </button>
      </div>
    </div>
  );
}

function KeyboardPracticeArea({
  displayStats,
  expectedKey,
  keyFeedback,
  keyboardStatsPlacement,
  onKeyPress,
}: {
  displayStats: Array<{ label: string; value: string | number }>;
  expectedKey: string | null;
  keyFeedback: {
    key: string;
    state: "correct" | "error" | "neutral";
    token: number;
  } | null;
  keyboardStatsPlacement: KeyboardStatsPlacement;
  onKeyPress: (key: string) => void;
}) {
  const desktopStatAlign = keyboardStatsPlacement === "left" ? "left" : "right";

  return (
    <div className="mt-7">
      <div className="relative mx-auto max-w-6xl">
        {keyboardStatsPlacement !== "hidden" ? (
          <div
            className={[
              "pointer-events-none absolute inset-y-0 z-10 hidden flex-col justify-center gap-3 xl:flex",
              keyboardStatsPlacement === "left" ? "left-5 items-start" : "right-5 items-end",
            ].join(" ")}
          >
            {displayStats.map((item) => (
              <KeyboardSideStat key={item.label} align={desktopStatAlign} label={item.label} value={item.value} />
            ))}
          </div>
        ) : null}
        <div className="mb-3 grid grid-cols-3 items-end px-2 xl:hidden">
          {displayStats.map((item, index) => (
            <KeyboardSideStat key={item.label} align={index === 0 ? "left" : index === 1 ? "center" : "right"} label={item.label} value={item.value} />
          ))}
        </div>
        <VisualKeyboard className="mt-0" expectedKey={expectedKey} keyFeedback={keyFeedback} onKeyPress={onKeyPress} />
      </div>
    </div>
  );
}

function QuickTimeOptions({ duration, onDurationChange }: { duration: number; onDurationChange: (value: number) => void }) {
  return (
    <QuickOptionGroup icon={<Clock3 aria-hidden size={14} />} label="time">
      {DURATIONS.map((item) => (
        <QuickOption key={item} active={duration === item} label={`${item} seconds`} onClick={() => onDurationChange(item)}>
          {item}
        </QuickOption>
      ))}
    </QuickOptionGroup>
  );
}

function QuickModeOptions({ mode, onModeChange }: { mode: TestMode; onModeChange: (value: TestMode) => void }) {
  return (
    <QuickOptionGroup icon={<Type aria-hidden size={14} />} label="mode">
      {(["words", "quote"] as TestMode[]).map((item) => (
        <QuickOption key={item} active={mode === item} label={`${item} mode`} onClick={() => onModeChange(item)}>
          {item}
        </QuickOption>
      ))}
    </QuickOptionGroup>
  );
}

function QuickLevelOptions({ difficulty, onDifficultyChange }: { difficulty: DifficultyId; onDifficultyChange: (value: DifficultyId) => void }) {
  return (
    <QuickOptionGroup icon={<Gauge aria-hidden size={14} />} label="level">
      {DIFFICULTIES.map((item) => (
        <QuickOption key={item.id} active={difficulty === item.id} label={`${item.label} difficulty`} onClick={() => onDifficultyChange(item.id)}>
          {item.label}
        </QuickOption>
      ))}
    </QuickOptionGroup>
  );
}

function SettingsButton({ buttonRef, onOpenSettings }: { buttonRef: RefObject<HTMLButtonElement | null>; onOpenSettings: () => void }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-camp-paper text-camp-ink shadow-[var(--button-depth-muted)] transition hover:-translate-y-0.5 hover:bg-camp-peach hover:text-camp-coral focus-visible:bg-camp-peach focus-visible:text-camp-coral focus-visible:outline-none active:translate-y-[2px] active:shadow-[var(--button-depth-pressed)]"
      aria-label="Open typing settings"
      onClick={onOpenSettings}
    >
      <Settings aria-hidden size={16} />
    </button>
  );
}

function QuickOptionGroup({ children, icon, label }: { children: ReactNode; icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={label}>
      <span className="inline-flex items-center gap-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-camp-muted">
        {icon}
        {label}
      </span>
      <div className="flex items-center gap-0.5">{children}</div>
    </div>
  );
}

function QuickOption({ active, children, label, onClick }: { active: boolean; children: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      className={[
        "inline-flex h-7 items-center justify-center rounded-pill px-2.5 text-xs font-black leading-none text-camp-muted shadow-[var(--button-depth-muted)] transition hover:-translate-y-0.5 hover:bg-camp-peach hover:text-camp-coral focus-visible:bg-camp-peach focus-visible:text-camp-coral focus-visible:outline-none active:translate-y-[2px] active:shadow-[var(--button-depth-pressed)]",
        active ? "bg-camp-orange text-white shadow-[var(--button-depth-primary)] hover:bg-camp-coral hover:text-white focus-visible:bg-camp-coral focus-visible:text-white" : "",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function KeyboardSideStat({ align = "left", label, value }: { align?: "left" | "center" | "right"; label: string; value: string | number }) {
  const alignClass = align === "right" ? "items-end text-right" : align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex min-w-[3.5rem] flex-col py-0.5 text-camp-ink ${alignClass}`}>
      <div className="text-base font-black leading-none">{value}</div>
      <div className="mt-0.5 text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-camp-muted">{label}</div>
    </div>
  );
}

function TypingSettingsModal({
  difficulty,
  duration,
  keyboardStatsPlacement,
  lockText,
  mode,
  onClose,
  onDifficultyChange,
  onDurationChange,
  onKeyboardStatsPlacementChange,
  onModeChange,
}: {
  difficulty: DifficultyId;
  duration: number;
  keyboardStatsPlacement: KeyboardStatsPlacement;
  lockText: boolean;
  mode: TestMode;
  onClose: () => void;
  onDifficultyChange: (value: DifficultyId) => void;
  onDurationChange: (value: number) => void;
  onKeyboardStatsPlacementChange: (value: KeyboardStatsPlacement) => void;
  onModeChange: (value: TestMode) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });
  }, []);

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = getFocusableElements(dialogRef.current);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-camp-ink/35 px-4 py-5 sm:items-center sm:justify-center" role="presentation" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className="w-full max-w-xl rounded-[28px] bg-camp-paper p-5 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="typing-settings-title"
        onKeyDown={handleDialogKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow">Typing setup</p>
            <h2 id="typing-settings-title" className="heading-md mt-1">
              Tune the test
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-camp-surface text-camp-ink shadow-[var(--button-depth-muted)] transition hover:-translate-y-0.5 hover:bg-camp-peach hover:text-camp-coral focus-visible:bg-camp-peach focus-visible:text-camp-coral focus-visible:outline-none active:translate-y-[2px] active:shadow-[var(--button-depth-pressed)]"
            aria-label="Close typing settings"
            onClick={onClose}
          >
            <X aria-hidden size={18} />
          </button>
        </div>

        <div className="grid gap-5">
          {!lockText ? (
            <>
              <SettingGroup label="Time">
                {DURATIONS.map((item) => (
                  <button key={item} type="button" className={`pill ${duration === item ? "pill-active" : ""}`} onClick={() => onDurationChange(item)}>
                    {item}s
                  </button>
                ))}
              </SettingGroup>

              <SettingGroup label="Mode">
                {(["words", "quote"] as TestMode[]).map((item) => (
                  <button key={item} type="button" className={`pill ${mode === item ? "pill-active" : ""}`} onClick={() => onModeChange(item)}>
                    {item}
                  </button>
                ))}
              </SettingGroup>

              <SettingGroup label="Difficulty">
                {DIFFICULTIES.map((item) => (
                  <button key={item.id} type="button" className={`pill ${difficulty === item.id ? "pill-active" : ""}`} onClick={() => onDifficultyChange(item.id)}>
                    {item.label}
                  </button>
                ))}
              </SettingGroup>

              <SettingGroup label="Desktop keyboard stats">
                {KEYBOARD_STATS_PLACEMENTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`pill ${keyboardStatsPlacement === item ? "pill-active" : ""}`}
                    onClick={() => onKeyboardStatsPlacementChange(item)}
                  >
                    {item === "right" ? "Right side" : item === "left" ? "Left side" : "Hide"}
                  </button>
                ))}
              </SettingGroup>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SettingGroup({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div>
      <div className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-camp-muted">{label}</div>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </div>
  );
}

function renderTypingChars({
  completed,
  cursor,
  cursorCharRef,
  startIndex,
  statuses,
  text,
}: {
  completed: boolean;
  cursor: number;
  cursorCharRef: RefObject<HTMLSpanElement | null>;
  startIndex: number;
  statuses: CharStatus[];
  text: string;
}) {
  return text.split("").map((char, offset) => {
    const index = startIndex + offset;

    return (
      <span
        key={`${index}-${char}`}
        ref={cursor === index ? cursorCharRef : null}
        data-current={cursor === index && !completed ? "true" : undefined}
        className={[
          "relative rounded-[6px] px-0.5 transition duration-150",
          statuses[index] === "correct" ? "text-camp-sage" : "",
          statuses[index] === "error" ? "bg-camp-peach text-camp-coral" : "",
          cursor === index && !completed ? "after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:rounded-pill after:bg-camp-orange" : "",
        ].join(" ")}
      >
        {char}
      </span>
    );
  });
}

function buildTypingWords(text: string): TypingWord[] {
  const words: TypingWord[] = [];
  const matches = text.matchAll(/\S+\s*/g);

  for (const match of matches) {
    const token = match[0];
    const wordText = token.match(/^\S+/)?.[0] ?? "";
    if (!wordText) continue;

    const start = match.index ?? 0;
    const end = start + wordText.length;
    words.push({
      wordIndex: words.length,
      start,
      end,
      text: wordText,
      trailing: token.slice(wordText.length),
      trailingStart: end,
    });
  }

  return words;
}

function getActiveWordIndex(words: TypingWord[], cursor: number) {
  if (words.length === 0) return 0;

  for (const word of words) {
    const trailingEnd = word.trailingStart + word.trailing.length;
    if (cursor >= word.start && cursor < trailingEnd) {
      return word.wordIndex;
    }
    if (cursor < word.start) {
      return word.wordIndex;
    }
  }

  return words[words.length - 1].wordIndex;
}

function getLineIndexForWord(lines: Array<{ firstWordIndex: number }>, wordIndex: number) {
  if (lines.length === 0) return 0;

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (wordIndex >= lines[index].firstWordIndex) {
      return index;
    }
  }

  return 0;
}

function measuredLinesEqual(current: Array<{ firstWordIndex: number; top: number }>, next: Array<{ firstWordIndex: number; top: number }>) {
  if (current.length !== next.length) return false;

  return current.every((line, index) => line.firstWordIndex === next[index].firstWordIndex && Math.abs(line.top - next[index].top) <= LINE_TOP_TOLERANCE_PX);
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"));
}

function isInteractiveTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target === document.body || target === document.documentElement) return false;
  return Boolean(target.closest("input, textarea, select, button, a, [contenteditable='true'], [role='button']"));
}

function ResultsPanel({
  accuracy,
  chars,
  correctedErrors,
  duration,
  errors,
  onRetry,
  saveState,
  score,
  stars,
  uncorrectedErrors,
  wpm,
}: {
  accuracy: number;
  chars: number;
  correctedErrors: number;
  duration: number;
  errors: number;
  onRetry: () => void;
  saveState: "idle" | "saved" | "error";
  score: number;
  stars: number;
  uncorrectedErrors: number;
  wpm: number;
}) {
  const saveMessage =
    saveState === "saved"
      ? "Saved in this browser on this device."
      : saveState === "error"
        ? "This result is complete, but this browser could not save it."
        : "";

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_18rem]">
      <div className="card p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-camp-peach text-camp-coral">
            <Trophy aria-hidden size={23} />
          </span>
          <div>
            <p className="eyebrow">Test complete</p>
            <h2 className="heading-md">Nice work. Run it again while the rhythm is warm.</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            ["WPM", wpm],
            ["Accuracy", `${accuracy}%`],
            ["Characters", chars],
            ["Errors", errors],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-camp-paper p-4">
              <div className="text-3xl font-black text-camp-ink">{value}</div>
              <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-camp-muted">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" className="button-primary" onClick={onRetry}>
            <RotateCcw aria-hidden size={17} className="shrink-0" />
            Try again
          </button>
          <span className="text-sm font-bold text-camp-muted">Score {score} - {duration}s - {stars}/5 stars</span>
        </div>
        <p className="mt-4 text-sm font-bold text-camp-muted">
          Corrected errors: {correctedErrors} · Uncorrected errors: {uncorrectedErrors} · Total mistakes: {errors}
        </p>
      </div>

      <aside className="card flex flex-col justify-center p-6 text-center">
        <Save aria-hidden className="mx-auto text-camp-sage" size={32} />
        <h3 className="mt-4 font-display text-xl font-black text-camp-ink">Progress</h3>
        <p className="mt-2 text-sm leading-6 text-camp-muted">{saveMessage}</p>
      </aside>
    </div>
  );
}
