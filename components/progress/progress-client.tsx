"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createEmptyProgress, readLocalProgress, resetLocalProgress, subscribeToProgress } from "@/lib/progress/repository";
import { summarizeTypingTests } from "@/lib/progress/summary";
import type { LocalProgress, ProgressReadResult } from "@/lib/progress/types";
import { LESSON_CATEGORIES } from "@/lib/typing/lessons";
import { buildLessonId } from "@/lib/progress/ids";

const lessonCatalog = LESSON_CATEGORIES.flatMap((category) =>
  category.sections.flatMap((section) =>
    section.levels.map((level) => ({
      href: `/lessons/lesson/${category.id}/${section.id}/${level.id}`,
      id: buildLessonId(category.id, section.id, level.id),
      label: `${section.title}: ${level.label}`,
    })),
  ),
);

const initialRead: ProgressReadResult = { data: createEmptyProgress(), migrated: false, status: "available" };

export function ProgressClient() {
  const [readResult, setReadResult] = useState<ProgressReadResult>(initialRead);
  const [ready, setReady] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const resetTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => {
      setReadResult(readLocalProgress());
      setReady(true);
    };
    sync();
    return subscribeToProgress(sync);
  }, []);

  const summary = useMemo(() => summarizeProgress(readResult.data), [readResult.data]);

  function confirmReset() {
    const result = resetLocalProgress();
    setReadResult(result);
    setResetOpen(false);
    setStatusMessage(
      result.status === "available"
        ? "Local progress was reset on this device."
        : "Local progress could not be reset because browser storage is unavailable.",
    );
    requestAnimationFrame(() => resetTriggerRef.current?.focus({ preventScroll: true }));
  }

  return (
    <main className="section-pad">
      <div className="page-shell">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="eyebrow">Progress</p>
            <h1 className="heading-lg mt-2">Your practice on this device.</h1>
            <p className="body-lg mt-4">
              Completed practice is saved in this browser on this device. Clearing browser data may remove it. Free Typing Camp does not currently use accounts or cloud synchronization.
            </p>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {statusMessage}
          </p>

          {!ready ? (
            <p className="mt-12 text-camp-muted">Loading local progress...</p>
          ) : summary.hasProgress ? (
            <PopulatedProgress progress={readResult.data} />
          ) : (
            <EmptyProgress storageStatus={readResult.status} />
          )}

          {ready ? (
            <section className="mt-12 bg-camp-tan/55 px-5 py-7 sm:px-8" aria-labelledby="local-data-heading">
              <h2 id="local-data-heading" className="heading-md">
                Local data controls
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-camp-muted">
                Reset removes typing-test history, existing lesson progress, Calculator Sprint results, and activity dates saved by Free Typing Camp in this browser. It does not clear unrelated browser data.
              </p>
              <button
                ref={resetTriggerRef}
                type="button"
                className="button-secondary mt-5"
                onClick={() => setResetOpen(true)}
              >
                Reset local progress
              </button>
            </section>
          ) : null}
        </div>
      </div>

      {resetOpen ? (
        <ResetDialog
          onCancel={() => {
            setResetOpen(false);
            requestAnimationFrame(() => resetTriggerRef.current?.focus({ preventScroll: true }));
          }}
          onConfirm={confirmReset}
        />
      ) : null}
    </main>
  );
}

function EmptyProgress({ storageStatus }: { storageStatus: ProgressReadResult["status"] }) {
  const storageMessage =
    storageStatus === "corrupt"
      ? "Some saved progress could not be read. New completed activities can create a clean local record."
      : storageStatus === "unsupported"
        ? "This browser contains a progress version this page cannot safely read. It has not been overwritten."
        : storageStatus === "unavailable" || storageStatus === "quota"
          ? "Browser storage is unavailable, so completed activities may not remain after you leave the page."
          : null;

  return (
    <section className="mt-12 bg-camp-paper px-5 py-8 sm:px-8" aria-labelledby="empty-progress-heading">
      <p className="eyebrow">Start where you are</p>
      <h2 id="empty-progress-heading" className="heading-md mt-2">
        No completed practice is stored here yet.
      </h2>
      <p className="mt-4 max-w-3xl leading-7 text-camp-muted">
        Completed typing tests, current lessons, and Calculator Sprint sessions will appear here. Opening a page without finishing an activity does not create progress.
      </p>
      {storageMessage ? <p className="mt-4 font-bold leading-7 text-camp-coral">{storageMessage}</p> : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/typing-test" className="button-primary">
          Take a typing test
        </Link>
        <Link href="/lessons" className="button-secondary">
          Browse lessons
        </Link>
        <Link href="/games/calculator" className="button-secondary">
          Play Calculator Sprint
        </Link>
      </div>
    </section>
  );
}

function PopulatedProgress({ progress }: { progress: LocalProgress }) {
  const summary = summarizeProgress(progress);
  const typing = summarizeTypingTests(progress);

  return (
    <div className="mt-12 grid gap-12">
      <section className="bg-camp-peach/45 px-5 py-7 sm:px-8" aria-labelledby="continue-heading">
        <p className="eyebrow">Continue practicing</p>
        <h2 id="continue-heading" className="heading-md mt-2">
          {summary.continueLabel}
        </h2>
        <Link href={summary.continueHref} className="button-primary mt-5">
          Continue practice
        </Link>
      </section>

      {typing.totalCompleted > 0 ? (
        <section aria-labelledby="typing-summary-heading">
          <p className="eyebrow">Typing tests</p>
          <h2 id="typing-summary-heading" className="heading-md mt-2">
            Recent accuracy and comparable bests
          </h2>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-6 bg-camp-paper px-5 py-6 sm:px-8">
            <Metric label="Completed tests" value={String(typing.totalCompleted)} />
            <Metric label="Recent average accuracy" value={typing.averageRecentAccuracy === null ? "--" : `${typing.averageRecentAccuracy}%`} />
            <Metric label="Most recent" value={typing.mostRecent ? `${typing.mostRecent.wpm} WPM · ${typing.mostRecent.accuracy}%` : "--"} />
          </div>

          {typing.bestByActivity.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-xl font-black text-camp-ink">Personal best by comparable mode</h3>
              <ul className="mt-4 grid gap-3">
                {typing.bestByActivity.map((best) => (
                  <li key={best.activityId} className="flex flex-col gap-2 bg-camp-tan/45 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-black text-camp-ink">{formatActivityMode(best.record)}</span>
                    <span className="font-bold text-camp-muted">{best.wpm} WPM · {best.accuracy}% accuracy</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {summary.completedLessons > 0 ? (
        <section aria-labelledby="lesson-summary-heading">
          <p className="eyebrow">Lessons</p>
          <h2 id="lesson-summary-heading" className="heading-md mt-2">
            Current lesson progress
          </h2>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-6 bg-camp-paper px-5 py-6 sm:px-8">
            <Metric label="Completed lessons" value={`${summary.completedLessons}/${lessonCatalog.length}`} />
            <Metric label="Best lesson accuracy" value={`${summary.bestLessonAccuracy}%`} />
            <Metric label="Most recent lesson" value={summary.mostRecentLessonLabel ?? "--"} />
          </div>
          {summary.nextLesson ? (
            <Link href={summary.nextLesson.href} className="button-secondary mt-5">
              Continue with {summary.nextLesson.label}
            </Link>
          ) : null}
        </section>
      ) : null}

      {summary.calculator ? (
        <section aria-labelledby="game-summary-heading">
          <p className="eyebrow">Games</p>
          <h2 id="game-summary-heading" className="heading-md mt-2">
            Calculator Sprint
          </h2>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-6 bg-camp-paper px-5 py-6 sm:px-8">
            <Metric label="Completed sessions" value={String(summary.calculator.completedSessions)} />
            <Metric label="Best score" value={String(summary.calculator.bestScore)} />
            <Metric label="Latest completion" value={formatDate(summary.calculator.mostRecentCompletedAt)} />
          </div>
          <Link href="/games/calculator" className="button-secondary mt-5">
            Play again
          </Link>
        </section>
      ) : null}

      {summary.activity.length > 0 ? (
        <section aria-labelledby="recent-activity-heading">
          <p className="eyebrow">Activity</p>
          <h2 id="recent-activity-heading" className="heading-md mt-2">
            Recent completed practice
          </h2>
          <ul className="mt-6 grid gap-3">
            {summary.activity.map((item) => (
              <li key={item.key} className="bg-camp-tan/45 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="break-words font-black text-camp-ink">{item.title}</span>
                  <time className="shrink-0 text-sm font-bold text-camp-muted" dateTime={item.completedAt}>
                    {formatDate(item.completedAt)}
                  </time>
                </div>
                <p className="mt-1 break-words text-sm leading-6 text-camp-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 max-w-full">
      <div className="break-words text-2xl font-black text-camp-ink">{value}</div>
      <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.1em] text-camp-muted">{label}</div>
    </div>
  );
}

function ResetDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus({ preventScroll: true });
  }, []);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? []);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-camp-ink/60 px-5 py-8" role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-progress-heading"
        aria-describedby="reset-progress-description"
        className="w-full max-w-lg rounded-[28px] bg-camp-surface p-6 sm:p-8"
        onKeyDown={handleKeyDown}
      >
        <p className="eyebrow">Confirm reset</p>
        <h2 id="reset-progress-heading" className="heading-md mt-2">
          Remove local progress from this device?
        </h2>
        <p id="reset-progress-description" className="mt-4 leading-7 text-camp-muted">
          This removes saved typing-test results, current lesson progress, Calculator Sprint results, and activity dates from this browser. This action cannot be undone.
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button ref={cancelRef} type="button" className="button-secondary" onClick={onCancel}>
            Keep progress
          </button>
          <button type="button" className="button-primary" onClick={onConfirm}>
            Reset local progress
          </button>
        </div>
      </div>
    </div>
  );
}

function summarizeProgress(progress: LocalProgress) {
  const typing = summarizeTypingTests(progress);
  const lessons = Object.values(progress.lessons);
  const lessonByRecent = [...lessons].sort((a, b) => b.mostRecentCompletedAt.localeCompare(a.mostRecentCompletedAt));
  const mostRecentLesson = lessonByRecent[0];
  const mostRecentLessonEntry = lessonCatalog.find((lesson) => lesson.id === mostRecentLesson?.lessonId);
  const nextLesson = lessonCatalog.find((lesson) => !progress.lessons[lesson.id]) ?? null;
  const calculator = progress.games["calculator-sprint"] ?? null;
  const activity = [
    ...typing.recent.map((record) => ({
      completedAt: record.completedAt,
      detail: `${record.wpm} WPM · ${record.accuracy}% accuracy`,
      key: record.id,
      title: formatActivityMode(record),
    })),
    ...lessonByRecent.map((lesson) => ({
      completedAt: lesson.mostRecentCompletedAt,
      detail: `${lesson.bestWpm} best WPM · ${lesson.bestAccuracy}% best accuracy`,
      key: `activity-${lesson.lessonId}`,
      title: lessonCatalog.find((entry) => entry.id === lesson.lessonId)?.label ?? "Typing lesson",
    })),
    ...(calculator
      ? [
          {
            completedAt: calculator.mostRecentCompletedAt,
            detail: `Best score ${calculator.bestScore}`,
            key: "activity-calculator-sprint",
            title: "Calculator Sprint",
          },
        ]
      : []),
  ]
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, 10);
  const latest = activity[0];
  const continueTarget = latest?.key.startsWith("activity-lesson-")
    ? lessonCatalog.find((lesson) => `activity-${lesson.id}` === latest.key)
    : null;

  return {
    activity,
    bestLessonAccuracy: lessons.reduce((best, lesson) => Math.max(best, lesson.bestAccuracy), 0),
    calculator,
    completedLessons: lessons.length,
    continueHref: continueTarget?.href ?? (latest?.key === "activity-calculator-sprint" ? "/games/calculator" : "/typing-test"),
    continueLabel: continueTarget?.label ?? (latest?.key === "activity-calculator-sprint" ? "Return to Calculator Sprint" : "Build on your latest typing test"),
    hasProgress: typing.totalCompleted > 0 || lessons.length > 0 || Boolean(calculator),
    mostRecentLessonLabel: mostRecentLessonEntry?.label ?? null,
    nextLesson,
  };
}

function formatActivityMode(record: LocalProgress["typingTests"]["history"][number]) {
  const mode = record.mode === "quote" ? "Quote test" : "Words test";
  const difficulty = record.difficulty === "legacy" ? "legacy result" : record.difficulty;
  return `${mode} · ${record.durationSeconds}s · ${difficulty}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

