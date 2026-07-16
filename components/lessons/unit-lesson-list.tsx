"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StarRating } from "@/components/typing/typing-test";
import { getLessonHref } from "@/lib/curriculum/registry";
import type { CurriculumLesson } from "@/lib/curriculum/types";
import { createEmptyProgress, readLocalProgress, subscribeToProgress } from "@/lib/progress/repository";

export function UnitLessonList({ lessons }: { lessons: CurriculumLesson[] }) {
  const [progress, setProgress] = useState(createEmptyProgress);
  useEffect(() => {
    const sync = () => setProgress(readLocalProgress().data);
    sync();
    return subscribeToProgress(sync);
  }, []);

  const completed = lessons.filter((lesson) => progress.lessons[lesson.id]?.completed).length;
  const stars = lessons.reduce((total, lesson) => total + (progress.lessons[lesson.id]?.bestStars ?? 0), 0);

  return (
    <section aria-labelledby="unit-lessons-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Your local progress</p><h2 id="unit-lessons-heading" className="heading-md mt-2">Lessons in this unit</h2></div>
        <p className="font-black text-camp-muted">{completed}/{lessons.length} complete · {stars}/{lessons.length * 5} stars</p>
      </div>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const record = progress.lessons[lesson.id];
          return (
            <li key={lesson.id}>
              <Link href={getLessonHref(lesson)} className="group block min-h-40 rounded-2xl bg-camp-paper px-5 py-5 transition hover:bg-camp-orange hover:text-white focus-visible:bg-camp-orange focus-visible:text-white">
                <div className="text-xs font-black uppercase tracking-[0.1em] text-camp-coral group-hover:text-white group-focus-visible:text-white">Lesson {lesson.sequence}</div>
                <h3 className="mt-2 text-lg font-black text-camp-ink group-hover:text-white group-focus-visible:text-white">{lesson.title}</h3>
                <p className="mt-2 text-sm font-bold text-camp-muted group-hover:text-white group-focus-visible:text-white">Targets: {lesson.standardWpm} standard · {lesson.masteryWpm} mastery WPM</p>
                <div className="mt-4 group-hover:[&_*]:text-white group-focus-visible:[&_*]:text-white"><StarRating value={record?.bestStars ?? 0} /></div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
