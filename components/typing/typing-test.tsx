"use client";

import { Clock3, Gauge, RotateCcw, Save, Settings, Trophy, Type, X } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { apiRequest } from "@/lib/api/client";
import { buildTypingText, DIFFICULTIES, getDifficulty } from "@/lib/typing/content";
import { calculateTypingStats, formatClock, getPerformanceStars } from "@/lib/typing/metrics";
import { saveLocalTypingResult } from "@/lib/typing/progress";
import type { CharStatus, DifficultyId, TestMode, TestResultPayload } from "@/lib/typing/types";
import { VisualKeyboard } from "@/components/typing/visual-keyboard";

const DURATIONS = [15, 30, 60, 120];
const KEYBOARD_STATS_PLACEMENTS = ["right", "left", "hidden"] as const;
const ROW_SCROLL_THRESHOLD_PX = 4;

type KeyboardStatsPlacement = (typeof KEYBOARD_STATS_PLACEMENTS)[number];

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
  const auth = useAuth();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textViewportRef = useRef<HTMLDivElement>(null);
  const cursorCharRef = useRef<HTMLSpanElement | null>(null);
  const firstLineTopRef = useRef<number | null>(null);
  const lastScrollTopRef = useRef(0);
  const keyFeedbackTimeoutRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(defaultDuration);
  const [mode, setMode] = useState<TestMode>(defaultMode);
  const [difficulty, setDifficulty] = useState<DifficultyId>(defaultDifficulty);
  const [text, setText] = useState(() => initialText ?? buildTypingText({ mode: defaultMode, difficulty: defaultDifficulty, duration: defaultDuration }));
  const [statuses, setStatuses] = useState<CharStatus[]>(() => Array(text.length).fill("idle") as CharStatus[]);
  const [cursor, setCursor] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error" | "signed-out">("idle");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [keyboardStatsPlacement, setKeyboardStatsPlacement] = useState<KeyboardStatsPlacement>("right");
  const [keyFeedback, setKeyFeedback] = useState<{
    key: string;
    state: "correct" | "error" | "neutral";
    token: number;
  } | null>(null);

  const selectedDifficulty = getDifficulty(difficulty);
  const remainingSeconds = Math.max(0, duration - elapsedSeconds);
  const stats = useMemo(
    () =>
      calculateTypingStats({
        statuses,
        elapsedSeconds,
        difficultyScore: selectedDifficulty.scoreBonus,
      }),
    [elapsedSeconds, selectedDifficulty.scoreBonus, statuses],
  );
  const expectedKey = completed ? null : text[cursor] ?? null;

  const resetTypingViewport = useCallback(() => {
    const viewport = textViewportRef.current;
    if (viewport) {
      viewport.scrollTo({ top: 0, behavior: "auto" });
    }
    firstLineTopRef.current = null;
    lastScrollTopRef.current = 0;
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
    (nextText = text) => {
      setText(nextText);
      setStatuses(Array(nextText.length).fill("idle") as CharStatus[]);
      setCursor(0);
      setStarted(false);
      setCompleted(false);
      setElapsedSeconds(0);
      setSaveState("idle");
      setKeyFeedback(null);
      requestAnimationFrame(() => {
        resetTypingViewport();
        inputRef.current?.focus({ preventScroll: true });
      });
    },
    [resetTypingViewport, text],
  );

  const regenerate = useCallback(() => {
    const nextText = initialText && lockText ? initialText : buildTypingText({ mode, difficulty, duration, seed: Date.now() });
    resetTest(nextText);
  }, [difficulty, duration, initialText, lockText, mode, resetTest]);

  useEffect(() => {
    if (lockText) return;
    const nextText = buildTypingText({ mode, difficulty, duration, seed: 0 });
    setText(nextText);
    setStatuses(Array(nextText.length).fill("idle") as CharStatus[]);
    setCursor(0);
    setStarted(false);
    setCompleted(false);
    setElapsedSeconds(0);
    setSaveState("idle");
    setKeyFeedback(null);
    requestAnimationFrame(resetTypingViewport);
  }, [difficulty, duration, lockText, mode, resetTypingViewport]);

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));

    return () => {
      if (keyFeedbackTimeoutRef.current) {
        window.clearTimeout(keyFeedbackTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const viewport = textViewportRef.current;
    const cursorNode = cursorCharRef.current;
    if (!viewport) return;

    if (cursor === 0 || !cursorNode) {
      resetTypingViewport();
      return;
    }

    const cursorLineTop = cursorNode.offsetTop;

    if (firstLineTopRef.current === null) {
      firstLineTopRef.current = cursorLineTop;
    }

    const lineDelta = cursorLineTop - firstLineTopRef.current;
    const targetTop = lineDelta > ROW_SCROLL_THRESHOLD_PX ? Math.max(0, Math.round(cursorLineTop)) : 0;
    const changedLine = Math.abs(targetTop - lastScrollTopRef.current) > ROW_SCROLL_THRESHOLD_PX;
    if (!changedLine) return;

    viewport.scrollTo({ top: targetTop, behavior: "auto" });
    lastScrollTopRef.current = targetTop;
  }, [cursor, resetTypingViewport]);

  useEffect(() => {
    if (!started || completed) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((current) => {
        if (current + 1 >= duration) {
          setCompleted(true);
          return duration;
        }
        return current + 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [completed, duration, started]);

  const completeIfNeeded = useCallback(
    (nextCursor: number) => {
      if (nextCursor >= text.length) {
        setCompleted(true);
      }
    },
    [text.length],
  );

  const processKey = useCallback(
    (key: string) => {
      if (completed) return;

      if (key === "Backspace") {
        flashKey("Backspace", "neutral");
        setCursor((current) => {
          const nextCursor = Math.max(0, current - 1);
          setStatuses((currentStatuses) => {
            const nextStatuses = [...currentStatuses];
            nextStatuses[nextCursor] = "idle";
            return nextStatuses;
          });
          return nextCursor;
        });
        return;
      }

      if (key.length !== 1 && key !== " ") return;

      if (!started) {
        setStarted(true);
      }

      const expected = text[cursor];
      const isCorrect = key === expected;
      flashKey(key, isCorrect ? "correct" : "error");
      setStatuses((currentStatuses) => {
        const nextStatuses = [...currentStatuses];
        nextStatuses[cursor] = isCorrect ? "correct" : "error";
        return nextStatuses;
      });

      const nextCursor = cursor + 1;
      setCursor(nextCursor);
      completeIfNeeded(nextCursor);
    },
    [completeIfNeeded, completed, cursor, flashKey, started, text],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const key = event.key === " " ? " " : event.key;
      const valid = key === "Backspace" || key.length === 1;

      if (!valid) return;
      event.preventDefault();
      processKey(key);
    },
    [processKey],
  );

  useEffect(() => {
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (settingsOpen && event.key === "Escape") {
        setSettingsOpen(false);
        return;
      }

      if (settingsOpen || completed || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if (isInteractiveTypingTarget(event.target)) return;

      const key = event.key === " " ? " " : event.key;
      const valid = key === "Backspace" || key.length === 1;

      if (!valid) return;
      event.preventDefault();
      processKey(key);
      inputRef.current?.focus({ preventScroll: true });
    };

    window.addEventListener("keydown", handleDocumentKeyDown);
    return () => window.removeEventListener("keydown", handleDocumentKeyDown);
  }, [completed, processKey, settingsOpen]);

  useEffect(() => {
    if (!completed || saveState !== "idle") return;
    if (auth.isLoading) return;

    let active = true;

    if (!auth.isAuthenticated || !auth.userId) {
      saveLocalTypingResult({
        accuracy: stats.accuracy,
        createdAt: new Date().toISOString(),
        duration: elapsedSeconds,
        score: stats.score,
        stars: getPerformanceStars(stats.wpm, stats.accuracy),
        testName,
        wpm: stats.wpm,
      });
      if (active) {
        setSaveState("signed-out");
      }
      return () => {
        active = false;
      };
    }

    const payload: TestResultPayload = {
      user_id: auth.userId,
      difficultyLevel: selectedDifficulty.legacyLevel,
      test_name: testName,
      total_chars: stats.totalChars,
      correct_chars: stats.correctChars,
      misspelled_chars: stats.errorChars,
      cpm: stats.cpm,
      wpm: stats.wpm,
      test_score: stats.score,
      test_accuracy: stats.accuracy,
      test_time_sec: elapsedSeconds,
      screen_size_info: typeof window === "undefined" ? "unknown" : `${window.innerWidth}x${window.innerHeight}`,
      difficulty_name: selectedDifficulty.label,
      difficulty_settings: selectedDifficulty.legacySettings,
      difficultyScore: selectedDifficulty.scoreBonus,
    };

    setSaveState("saving");
    apiRequest<{ message?: string }>("/v1/api/account/score", {
      method: "POST",
      body: JSON.stringify({ data: payload }),
    })
      .then(() => {
        if (active) setSaveState("saved");
      })
      .catch(() => {
        if (active) setSaveState("error");
      });

    return () => {
      active = false;
    };
  }, [auth.isAuthenticated, auth.isLoading, auth.userId, completed, elapsedSeconds, saveState, selectedDifficulty, stats, testName]);

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
            />

            <div
              className="relative py-1"
              tabIndex={0}
              onClick={() => inputRef.current?.focus()}
              role="textbox"
              aria-label="Typing test text"
            >
              <textarea
                ref={inputRef}
                className="sr-only"
                value=""
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                onKeyDown={handleKeyDown}
                readOnly
              />

              {!started && !completed ? (
                <div className="pointer-events-none absolute -left-1 top-0 z-10 inline-flex items-center gap-2 rounded-2xl bg-camp-peach px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-camp-coral after:absolute after:left-9 after:top-[calc(100%-5px)] after:h-4 after:w-4 after:rotate-45 after:rounded-[3px] after:bg-camp-peach sm:-left-2 sm:-top-1">
                  <span className="h-2 w-2 rounded-full bg-camp-orange" />
                  Start typing
                </div>
              ) : null}

              <div className="relative">
                <div
                  ref={textViewportRef}
                  data-testid="typing-text-viewport"
                  className="relative h-[15.5rem] overflow-hidden whitespace-pre-wrap break-words pb-5 pt-5 pr-1 text-[1.35rem] font-semibold leading-[1.7] text-camp-ink sm:h-[16.5rem] sm:pt-6 sm:text-[1.5rem] lg:h-[17.5rem] lg:text-[1.6rem] lg:leading-[1.65]"
                >
                  {text.split("").map((char, index) => (
                    <span
                      key={`${char}-${index}`}
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
                  ))}
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
            onKeyPress={processKey}
          />

          <div className="mt-9 max-w-2xl">
            <p className="eyebrow">{completed ? "Results" : started ? "Keep going" : "Ready when you are"}</p>
            <h1 className="heading-lg mt-2">{title}</h1>
            <p className="body-lg mt-3 max-w-2xl">{subtitle}</p>
          </div>

          {completed ? (
            <ResultsPanel
              accuracy={stats.accuracy}
              chars={stats.totalChars}
              duration={elapsedSeconds}
              errors={stats.errorChars}
              onRetry={regenerate}
              saveState={saveState}
              score={stats.score}
              stars={getPerformanceStars(stats.wpm, stats.accuracy)}
              wpm={stats.wpm}
            />
          ) : null}

          {settingsOpen ? (
            <TypingSettingsModal
              difficulty={difficulty}
              duration={duration}
              lockText={lockText}
              mode={mode}
              onClose={() => setSettingsOpen(false)}
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
            <SettingsButton onOpenSettings={onOpenSettings} />
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

function SettingsButton({ onOpenSettings }: { onOpenSettings: () => void }) {
  return (
    <button
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
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-camp-ink/35 px-4 py-5 sm:items-center sm:justify-center" role="presentation" onMouseDown={onClose}>
      <div
        className="w-full max-w-xl rounded-[28px] bg-camp-paper p-5 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="typing-settings-title"
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

function isInteractiveTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target === document.body || target === document.documentElement) return false;
  return Boolean(target.closest("input, textarea, select, button, a, [contenteditable='true'], [role='button']"));
}

function ResultsPanel({
  accuracy,
  chars,
  duration,
  errors,
  onRetry,
  saveState,
  score,
  stars,
  wpm,
}: {
  accuracy: number;
  chars: number;
  duration: number;
  errors: number;
  onRetry: () => void;
  saveState: "idle" | "saving" | "saved" | "error" | "signed-out";
  score: number;
  stars: number;
  wpm: number;
}) {
  const saveMessage =
    saveState === "saved"
      ? "Saved to your progress."
      : saveState === "saving"
        ? "Saving your result..."
        : saveState === "error"
          ? "Result could not be saved."
          : saveState === "signed-out"
            ? "Sign in to save your progress."
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
      </div>

      <aside className="card flex flex-col justify-center p-6 text-center">
        <Save aria-hidden className="mx-auto text-camp-sage" size={32} />
        <h3 className="mt-4 font-display text-xl font-black text-camp-ink">Progress</h3>
        <p className="mt-2 text-sm leading-6 text-camp-muted">{saveMessage}</p>
      </aside>
    </div>
  );
}
