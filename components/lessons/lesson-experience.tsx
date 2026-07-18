"use client";

import { useMemo, useRef, useState } from "react";
import { TypingTest } from "@/components/typing/typing-test";
import { aggregateLessonResults, buildAdaptiveStage, type TypingAttemptResult } from "@/lib/curriculum/adaptive";
import { calculateLessonStars } from "@/lib/curriculum/stars";
import type { CurriculumLesson, LessonStage } from "@/lib/curriculum/types";
import { readLocalProgress, recordLessonCompletion } from "@/lib/progress/repository";

export function LessonExperience({ lesson, fingerGuide }: { lesson: CurriculumLesson; fingerGuide: string }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [stages, setStages] = useState(() => prepareStages(lesson));
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

  function advanceInstruction() {
    setStageIndex((index) => Math.min(index + 1, stages.length - 1));
  }

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
    setStages(prepareStages(lesson));
    setStageIndex(0);
    setCurrentResult(null);
    setFinalResult(null);
  }

  if (finalResult) {
    const stars = calculateLessonStars({ accuracy: finalResult.accuracy, wpm: finalResult.wpm, masteryWpm: lesson.masteryWpm, standardWpm: lesson.standardWpm });
    return (
      <section className="section-pad pt-8">
        <div className="page-shell max-w-4xl">
          <p className="eyebrow">Lesson complete</p>
          <h1 className="heading-lg mt-2">{lesson.sequence}. {lesson.title}</h1>
          <p className="body-lg mt-3">{stars > 0 ? "You completed every required stage." : "You finished every stage. Repeat the lesson to reach the 85% completion target."}</p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 bg-camp-tan/45 px-6 py-5">
            <Result label="Aggregate accuracy" value={`${finalResult.accuracy}%`} />
            <Result label="Aggregate WPM" value={String(finalResult.wpm)} />
            <Result label="Stars" value={`${stars}/5`} />
            <Result label="Mistakes" value={String(finalResult.correctedErrors + finalResult.uncorrectedErrors)} />
          </div>
          <button type="button" className="button-primary mt-8" onClick={restartLesson}>Repeat full lesson</button>
        </div>
      </section>
    );
  }

  if (stage.type === "instruction") {
    return (
      <section className="section-pad pt-8">
        <div className="page-shell max-w-4xl">
          <p className="eyebrow">Lesson {lesson.sequence} · Stage 1 of {stages.length}</p>
          <h1 className="heading-lg mt-2">{lesson.title}</h1>
          <p className="body-lg mt-4">{stage.text}</p>
          {fingerGuide ? <p className="mt-5 font-bold leading-7 text-camp-muted">Finger guide: {fingerGuide}.</p> : null}
          <p className="mt-4 leading-7 text-camp-muted">Instruction stages are not timed and do not affect WPM, accuracy, errors, or stars.</p>
          <button type="button" className="button-primary mt-8" onClick={advanceInstruction}>Start stage 2</button>
        </div>
      </section>
    );
  }

  return (
    <div>
      <div className="page-shell pt-5 text-sm font-black text-camp-muted">
        Stage {stageIndex + 1} of {stages.length} · Typed stage {typedStageNumber} of {typedStageCount}
        {stage.type === "adaptive-reinforcement" ? " · Added because this attempt needs more accuracy practice" : ""}
        {stage.type === "adaptive-reinforcement" ? (
          <button type="button" className="ml-4 font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" onClick={() => finishLesson(resultsRef.current)}>
            Skip optional reinforcement
          </button>
        ) : null}
      </div>
      <TypingTest
        key={stage.id}
        title={`${lesson.sequence}. ${lesson.title}: ${stage.title}`}
        subtitle={subtitle}
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
      />
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

function Result({ label, value }: { label: string; value: string }) {
  return <div><div className="text-2xl font-black text-camp-ink">{value}</div><div className="text-xs font-black uppercase tracking-[0.12em] text-camp-muted">{label}</div></div>;
}
