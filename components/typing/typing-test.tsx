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

    const viewportRect = viewport.getBoundingClientRect();
    const cursorRect = cursorNode.getBoundingClientRect();
    const cursorTopInContent = Math.max(0, cursorRect.top - viewportRect.top + viewport.scrollTop);

    if (firstLineTopRef.current === null) {
      firstLineTopRef.current = cursorTopInContent;
    }

    const targetTop = Math.max(0, cursorTopInContent - firstLineTopRef.current);
    const changedLine = Math.abs(targetTop - lastScrollTopRef.current) > 4;
    if (!changedLine) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollTo({ top: targetTop, behavior: prefersReducedMotion ? "auto" : "smooth" });
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
    <section className={compact ? "" : "pb-5 pt-6 sm:pb-6 sm:pt-8 lg:pb-7 lg:pt-9"}>
      <div className="page-shell">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <QuickSettingsBar
              difficulty={difficulty}
              duration={duration}
              lockText={lockText}
              mode={mode}
              onDifficultyChange={setDifficulty}
              onDurationChange={setDuration}
              onModeChange={setMode}
              onOpenSettings={() => setSettingsOpen(true)}
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
                <div className="pointer-events-none absolute -left-1 top-0 z-10 inline-flex items-center gap-2 rounded-2xl bg-camp-peach px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-camp-coral shadow-[0_12px_30px_rgba(241,111,70,0.14)] after:absolute after:left-9 after:top-[calc(100%-5px)] after:h-4 after:w-4 after:rotate-45 after:rounded-[3px] after:bg-camp-peach sm:-left-2 sm:-top-1">
                  <span className="h-2 w-2 rounded-full bg-camp-orange" />
                  Start typing
                </div>
              ) : null}

              <div
                ref={textViewportRef}
                data-testid="typing-text-viewport"
                className="relative h-[15.5rem] overflow-hidden whitespace-pre-wrap break-words pb-8 pt-8 pr-1 text-[1.35rem] font-semibold leading-[1.85] text-camp-ink sm:h-[16.5rem] sm:text-[1.5rem] lg:h-[17.5rem] lg:text-[1.6rem]"
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

              <div className="mt-5 h-2 overflow-hidden rounded-pill bg-camp-tan">
                <div
                  className="h-full rounded-pill bg-camp-orange transition-all"
                  style={{ width: `${Math.min(100, (cursor / text.length) * 100)}%` }}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <TypingUtilityRow
                className="flex flex-wrap items-center gap-2.5"
                onRestart={regenerate}
              />

              <div className="grid w-full max-w-sm grid-cols-3 gap-2.5 md:w-auto md:max-w-none md:gap-7">
                {displayStats.map((item) => (
                  <TypingStat key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>
          </div>

          <VisualKeyboard expectedKey={expectedKey} keyFeedback={keyFeedback} onKeyPress={processKey} />

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
              onModeChange={setMode}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function QuickSettingsBar({
  difficulty,
  duration,
  lockText,
  mode,
  onDifficultyChange,
  onDurationChange,
  onModeChange,
  onOpenSettings,
}: {
  difficulty: DifficultyId;
  duration: number;
  lockText: boolean;
  mode: TestMode;
  onDifficultyChange: (value: DifficultyId) => void;
  onDurationChange: (value: number) => void;
  onModeChange: (value: TestMode) => void;
  onOpenSettings: () => void;
}) {
  if (lockText) return null;

  return (
    <div className="mb-3 flex justify-end">
      <div className="flex max-w-full flex-wrap items-center justify-end gap-x-4 gap-y-2">
        <QuickOptionGroup icon={<Clock3 aria-hidden size={14} />} label="time">
          {DURATIONS.map((item) => (
            <QuickOption key={item} active={duration === item} label={`${item} seconds`} onClick={() => onDurationChange(item)}>
              {item}
            </QuickOption>
          ))}
        </QuickOptionGroup>

        <QuickOptionGroup icon={<Type aria-hidden size={14} />} label="mode">
          {(["words", "quote"] as TestMode[]).map((item) => (
            <QuickOption key={item} active={mode === item} label={`${item} mode`} onClick={() => onModeChange(item)}>
              {item}
            </QuickOption>
          ))}
        </QuickOptionGroup>

        <QuickOptionGroup icon={<Gauge aria-hidden size={14} />} label="level">
          {DIFFICULTIES.map((item) => (
            <QuickOption key={item.id} active={difficulty === item.id} label={`${item.label} difficulty`} onClick={() => onDifficultyChange(item.id)}>
              {item.label}
            </QuickOption>
          ))}
        </QuickOptionGroup>

        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-camp-paper text-camp-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-camp-peach hover:text-camp-coral focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-camp-orange/20"
          aria-label="Open typing settings"
          onClick={onOpenSettings}
        >
          <Settings aria-hidden size={16} />
        </button>
      </div>
    </div>
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
        "inline-flex h-7 items-center justify-center rounded-pill px-2.5 text-xs font-black leading-none text-camp-muted transition hover:bg-camp-tan/70 hover:text-camp-coral focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-camp-orange/20",
        active ? "bg-camp-orange text-white shadow-[0_8px_18px_rgba(241,111,70,0.18)] hover:bg-camp-coral hover:text-white" : "",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function TypingStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-[4.25rem] py-1 text-center md:min-w-[4.75rem]">
      <div className="text-lg font-black leading-none text-camp-ink">{value}</div>
      <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-camp-muted">{label}</div>
    </div>
  );
}

function TypingUtilityRow({
  className,
  onRestart,
}: {
  className: string;
  onRestart: () => void;
}) {
  return (
    <div className={className}>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-pill bg-camp-paper px-5 py-3 text-sm font-extrabold text-camp-ink shadow-soft transition hover:bg-camp-peach hover:text-camp-coral focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-camp-orange/20"
        onClick={onRestart}
      >
        <RotateCcw aria-hidden size={17} />
        Restart
      </button>
    </div>
  );
}

function TypingSettingsModal({
  difficulty,
  duration,
  lockText,
  mode,
  onClose,
  onDifficultyChange,
  onDurationChange,
  onModeChange,
}: {
  difficulty: DifficultyId;
  duration: number;
  lockText: boolean;
  mode: TestMode;
  onClose: () => void;
  onDifficultyChange: (value: DifficultyId) => void;
  onDurationChange: (value: number) => void;
  onModeChange: (value: TestMode) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-camp-ink/35 px-4 py-5 backdrop-blur-sm sm:items-center sm:justify-center" role="presentation" onMouseDown={onClose}>
      <div
        className="w-full max-w-xl rounded-[28px] bg-camp-paper p-5 shadow-lift sm:p-6"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-camp-surface text-camp-ink shadow-soft transition hover:-translate-y-0.5 hover:text-camp-coral focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-camp-orange/20"
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
            <RotateCcw aria-hidden size={17} />
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
