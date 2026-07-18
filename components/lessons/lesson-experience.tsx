"use client";

import Link from "next/link";
import { type ReactNode, useMemo, useRef, useState } from "react";
import { TypingTest } from "@/components/typing/typing-test";
import { aggregateLessonResults, buildAdaptiveStage, type TypingAttemptResult } from "@/lib/curriculum/adaptive";
import { getLessonHref, getNextCurriculumLesson } from "@/lib/curriculum/registry";
import { calculateLessonStars } from "@/lib/curriculum/stars";
import type { CurriculumLesson, LessonStage } from "@/lib/curriculum/types";
import { readLocalProgress, recordLessonCompletion } from "@/lib/progress/repository";

export function LessonExperience({
  afterTypingSurface,
  fingerGuide,
  lesson,
}: {
  afterTypingSurface?: ReactNode;
  fingerGuide: string;
  lesson: CurriculumLesson;
}) {
  const initialStages = prepareStages(lesson);
  const [stageIndex, setStageIndex] = useState(() => getFirstTypedStageIndex(initialStages));
  const [stages, setStages] = useState(() => initialStages);
  const [currentResult, setCurrentResult] = useState<TypingAttemptResult | null>(null);
  const [finalResult, setFinalResult] = useState<ReturnType<typeof aggregateLessonResults> | null>(null);
  const resultsRef = useRef<TypingAttemptResult[]>([]);
  const adaptiveAddedRef = useRef(false);
  const savedRef = useRef(false);
  const stage = stages[stageIndex];
  const typedStageNumber = stages.slice(0, stageIndex + 1).filter((item) => item.type !== "instruction").length;
  const typedStageCount = stages.filter((item) => item.type !== "instruction").length;
  const subtitle = useMemo(
    () => `${lesson.objective}${fingerGuide ? ` Finger guide: ${fingerGuide}.` : ""}`,
    [fingerGuide, lesson.objective],
  );

  function advanceTypedStage() {
    if (!currentResult) return;
    const results = [...resultsRef.current, currentResult];
    resultsRef.current = results;
    setCurrentResult(null);

    const isLast = stageIndex === stages.length - 1;
    if (isLast && !adaptiveAddedRef.current) {
      const adaptive = buildAdaptiveStage(lesson.id, results, lesson.stages.at(-1)?.text ?? "");
      if (adaptive) {
        adaptiveAddedRef.current = true;
        setStages((current) => [...current, adaptive]);
        setStageIndex((index) => index + 1);
        return;
      }
    }

    if (!isLast) {
      setStageIndex((index) => index + 1);
      return;
    }

    finishLesson(results);
  }

  function finishLesson(results: TypingAttemptResult[]) {
    const aggregate = aggregateLessonResults(results);
    setFinalResult(aggregate);
    if (!savedRef.current) {
      savedRef.current = true;
      recordLessonCompletion({
        ...aggregate,
        completedAt: new Date().toISOString(),
        lessonId: lesson.id,
        stars: calculateLessonStars({ accuracy: aggregate.accuracy, wpm: aggregate.wpm, masteryWpm: lesson.masteryWpm, standardWpm: lesson.standardWpm }),
        weakKeys: aggregate.weakKeys,
      });
    }
  }

  function restartLesson() {
    resultsRef.current = [];
    adaptiveAddedRef.current = false;
    savedRef.current = false;
    const resetStages = prepareStages(lesson);
    setStages(resetStages);
    setStageIndex(getFirstTypedStageIndex(resetStages));
    setCurrentResult(null);
    setFinalResult(null);
  }

  function retryFinalStage() {
    resultsRef.current = resultsRef.current.slice(0, -1);
    savedRef.current = false;
    setCurrentResult(null);
    setFinalResult(null);
    setStageIndex(stages.length - 1);
  }

  if (finalResult) {
    const stars = calculateLessonStars({ accuracy: finalResult.accuracy, wpm: finalResult.wpm, masteryWpm: lesson.masteryWpm, standardWpm: lesson.standardWpm });
    const nextLesson = getNextCurriculumLesson(lesson.id);
    const practiceId = lesson.supportingPracticeIds[0];
    return (
      <section className="section-pad pt-8">
        <div className="page-shell max-w-4xl">
          <p className="sr-only" role="status" aria-live="polite">Lesson complete. Final results are available.</p>
          <p className="eyebrow">Results</p>
          <h1 className="heading-lg mt-2">Lesson complete: {lesson.sequence}. {lesson.title}</h1>
          <p className="body-lg mt-3">{stars > 0 ? "You completed every required stage." : "You finished every stage. Repeat the lesson to reach the 85% completion target."}</p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 bg-camp-tan/45 px-6 py-5">
            <Result label="Aggregate accuracy" value={`${finalResult.accuracy}%`} />
            <Result label="Aggregate WPM" value={String(finalResult.wpm)} />
            <Result label="Lesson stars" value={`${stars}/5`} accessibleValue={`${stars} of 5 lesson stars`} />
            <Result label="Corrected errors" value={String(finalResult.correctedErrors)} />
            <Result label="Uncorrected errors" value={String(finalResult.uncorrectedErrors)} />
          </div>
          {finalResult.weakKeys.length > 0 ? (
            <p className="mt-5 font-bold text-camp-muted">Keys to practise next: {finalResult.weakKeys.map((item) => item.key.toUpperCase()).join(", ")}.</p>
          ) : (
            <p className="mt-5 font-bold text-camp-muted">No repeated weak key stood out in this lesson.</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="button-secondary" onClick={retryFinalStage}>Retry final stage</button>
            <button type="button" className="button-primary" onClick={restartLesson}>Repeat full lesson</button>
            {nextLesson ? <Link className="button-primary" href={getLessonHref(nextLesson)}>Next lesson</Link> : null}
            {practiceId ? <Link className="button-secondary" href={`/typing-practice/${practiceId}`}>Related practice</Link> : null}
          </div>
        </div>
      </section>
    );
  }

  if (stage.type === "instruction") {
    return (
      <section className="section-pad pt-8">
        <div className="page-shell max-w-4xl">
          <p className="eyebrow">Lesson {lesson.sequence}</p>
          <h1 className="heading-lg mt-2">{lesson.title}</h1>
          <p className="body-lg mt-4">{stage.text}</p>
          {fingerGuide ? <p className="mt-5 font-bold leading-7 text-camp-muted">Finger guide: {fingerGuide}.</p> : null}
          <p className="mt-4 leading-7 text-camp-muted">This lesson has no typing stage available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <div>
      <TypingTest
        allowedCharacters={lesson.allowedCharacters}
        key={stage.id}
        initialText={stage.text}
        testName={lesson.id}
        defaultDuration={stage.timedSeconds ?? 120}
        defaultDifficulty="easy"
        lessonTargets={{ masteryWpm: lesson.masteryWpm, standardWpm: lesson.standardWpm }}
        lockText
        untimed={stage.timedSeconds === undefined}
        persistCompletion={false}
        loadSavedPreferences={false}
        completionActionLabel={stageIndex === stages.length - 1 ? "Finish lesson" : "Continue to next stage"}
        onCompletionAction={advanceTypedStage}
        onAttemptComplete={setCurrentResult}
        resultPresentation="stage"
        showAttemptContext={false}
      />
      {afterTypingSurface}
      <div className="page-shell section-pad pt-8" data-testid="lesson-stage-context">
        <p className="eyebrow">Lesson {lesson.sequence} of 45 - Stage {typedStageNumber} of {typedStageCount}</p>
        <h1 className="heading-md mt-2">{lesson.title}</h1>
        <p className="mt-2 text-sm font-black text-camp-muted">
          Typed stage {typedStageNumber} of {typedStageCount} - {stage.title}
          {stage.type === "adaptive-reinforcement" ? " - Added for focused accuracy practice" : ""}
        </p>
        <p className="mt-3 max-w-3xl leading-7 text-camp-muted">{subtitle}</p>
        {stage.type === "adaptive-reinforcement" ? (
          <button type="button" className="mt-3 font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" onClick={() => finishLesson(resultsRef.current)}>
            Skip optional reinforcement
          </button>
        ) : null}
      </div>
    </div>
  );
}

function prepareStages(lesson: CurriculumLesson): LessonStage[] {
  if (lesson.adaptiveSource !== "persistent-weak-keys") return lesson.stages;
  const weakKeys = readLocalProgress().data.weakKeys.slice(0, 2).map((item) => item.key);
  if (weakKeys.length === 0) return lesson.stages;
  return lesson.stages.map((stage, index) =>
    index === 1
      ? { ...stage, text: Array.from({ length: 10 }, (_, itemIndex) => weakKeys[itemIndex % weakKeys.length]).join(" "), title: "Your weak-key review" }
      : stage,
  );
}

function getFirstTypedStageIndex(stages: LessonStage[]) {
  const index = stages.findIndex((stage) => stage.type !== "instruction");
  return index >= 0 ? index : 0;
}

function Result({ accessibleValue, label, value }: { accessibleValue?: string; label: string; value: string }) {
  return <div><div className="text-2xl font-black text-camp-ink" aria-label={accessibleValue}>{value}</div><div className="text-xs font-black uppercase tracking-[0.12em] text-camp-muted">{label}</div></div>;
}
