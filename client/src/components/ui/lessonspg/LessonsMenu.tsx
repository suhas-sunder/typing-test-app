import useLoadAnimation from "../../hooks/useLoadAnimation";
import { Link } from "react-router-dom";

import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import useLessonText from "../../hooks/useLessonText";
import loadable from "@loadable/component";

const PerformanceStars = loadable(
  () => import("../../ui/shared/PerformanceStars"),
);

interface PropType {
  title?: string;
  sectionTitle?: string;
  sectionIndex?: number;
  lessonVisibility?: boolean[];
}

type LevelProps = {
  lessonIndex: number;
  sectionIndex: number;
  lesson: {
    sectionId: string;
    sectionData: { levelTitle: string; id: string }[];
  };
};

//Displays section title(s) for a set of levels
function SectionTitle({ sectionTitle }: PropType) {
  return (
    <div className="sm:justify-left flex -translate-x-2 items-center justify-center gap-3 text-slate-950 sm:translate-x-0">
      <h3 className="flex items-center justify-center gap-2 text-center font-lato text-base sm:pl-3 sm:text-left sm:text-xl">
        {/* <span className="text-base">{`${handlePerformanceScore()}`} </span> */}
        <span className="capitalize">{sectionTitle}</span>
      </h3>
    </div>
  );
}

//Each link redirects to a specific lesson page
function LevelLinks({ lesson, sectionIndex, lessonIndex }: LevelProps) {
  return (
    <ul className="mx-5 mb-4 grid w-full gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
      {lesson?.sectionData?.map((section, levelIndex) => (
        <li key={lesson.sectionId + "-" + section.id}>
          <Link
            to={`/lessons/lesson/${lessonIndex + 1}/sec-${
              sectionIndex + 1
            }/lvl-${levelIndex + 1}`}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 bg-slate-200 p-4 text-center  font-nunito text-base text-slate-950 hover:border-sky-400 hover:bg-white hover:text-sky-600"
          >
            <PerformanceStars
              customStyle={"absolute -bottom-[1.25rem] flex "}
              performanceScore={0}
            />
            <span>Level: {levelIndex + 1}</span>
            <span className="text-xs capitalize">{section.levelTitle}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

//Main title for lesson menu
function LessonTitle({ title }: PropType) {
  return (
    <h2 className={`flex items-center gap-2 text-2xl text-defaultblue`}>
      <span>{title} </span>
    </h2>
  );
}

//Displays all lessons depending on lesson selected in menu sidebar
export default function LessonsMenu() {
  const { allLessonData } = useLessonText();
  const [lessonIndex, setLessonIndex] = useState<number>(0);

  const path = location.pathname;

  useEffect(() => {
    allLessonData.forEach((data, index) => {
      if (data.id === path.split("/lessons/")[1]) {
        setLessonIndex(index);
        return;
      }
    });
  }, [allLessonData, path]);

  useLayoutEffect(() => {
    PerformanceStars.load();
  }, []);

  const { fadeAnim } = useLoadAnimation();

  return (
    <div className="flex min-h-[65em] w-full  overflow-hidden rounded-2xl rounded-tl-none rounded-tr-none bg-white md:rounded-tr-xl">
      <div
        key={allLessonData[lessonIndex].id}
        className={`${fadeAnim} flex w-full flex-col items-center gap-8  bg-white px-10 pb-20 pt-8 font-lora text-3xl text-defaultblue opacity-0`}
      >
        <LessonTitle title={allLessonData[lessonIndex].title} />

        {allLessonData[lessonIndex].lessonData.map((lesson, sectionIndex) => (
          <Fragment key={lesson.sectionId}>
            <SectionTitle
              sectionTitle={lesson.sectionTitle}
              sectionIndex={sectionIndex}
              title={allLessonData[lessonIndex].title}
            />
            <LevelLinks
              lesson={lesson}
              lessonIndex={lessonIndex}
              sectionIndex={sectionIndex}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
