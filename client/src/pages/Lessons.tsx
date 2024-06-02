import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";

import LessonsData from "../data/LessonsData";
import PerformanceStars from "../components/ui/shared/PerformanceStars";
import SidebarMenu from "../components/ui/navigation/SidebarMenu";

const Lesson = loadable(() => import("./Lesson"));
interface PropType {
  title?: string;
  sectionTitle?: string;
  performanceScore: number[][][];
  lessonIndex?: number;
  sectionIndex?: number;
  lessonVisibility?: boolean[];
}

type SectionType = {
  lessonIndex: number;
  sectionIndex: number;
  performanceScore: number[];
  lesson: {
    sectionId: string;
    sectionData: { levelTitle: string; id: string }[];
  };
};

//Displays section title(s) for a set of levels
function SectionTitle({
  sectionTitle,
  sectionIndex = 0,
  lessonIndex = 0,
  performanceScore,
}: PropType) {
  const handleperformanceScore = () => {
    return `(${
      performanceScore[lessonIndex][sectionIndex].filter(Boolean).length
    }/${performanceScore[lessonIndex][sectionIndex].length})`;
  };

  return (
    <div className="sm:justify-left flex -translate-x-2 items-center justify-center gap-3 text-slate-950 sm:translate-x-0">
      <h3 className="flex items-center justify-center gap-2 text-center font-lato text-base sm:pl-3 sm:text-left sm:text-xl">
        <span className="text-base">{`${handleperformanceScore()}`} </span>
        <span>{sectionTitle}</span>
      </h3>
    </div>
  );
}

//Each link redirects to a specific lesson page
function LevelLinks({
  lesson,
  lessonIndex,
  sectionIndex,
  performanceScore,
}: SectionType) {
  return (
    <ul className="mx-5 mb-4 grid w-full gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
      {lesson?.sectionData?.map((section, levelIndex) => (
        <li key={lesson.sectionId + "-" + section.id}>
          <Link
            to={`/lessons/lesson/${lessonIndex + 1}/sec-${
              sectionIndex + 1
            }/lvl-${levelIndex + 1}`}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 bg-slate-200 p-4  font-nunito text-base text-slate-950 hover:border-sky-400 hover:bg-white hover:text-sky-600"
          >
            <PerformanceStars performanceScore={performanceScore[levelIndex]} />
            <span>Level: {levelIndex + 1}</span>
            <span className="text-xs">{section.levelTitle}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

//Main title for lesson menu
function LessonTitle({ title, lessonIndex = 0, performanceScore }: PropType) {
  return (
    <h2 className={`flex items-center gap-2 text-2xl text-defaultblue`}>
      <span className="text-base">
        {`(${
          performanceScore[lessonIndex].filter((section) =>
            section.every(Boolean),
          ).length
        }/${performanceScore[lessonIndex].length})`}{" "}
      </span>
      <span>{title} </span>
    </h2>
  );
}

//Displays all lessons depending on lesson selected in menu sidebar
function LessonMenu({ displayLesson }: { displayLesson: number }) {
  const menuData = LessonsData();

  //First array is for lesson, second array is sublesson, third array are the tests for each section to track completion status of all tests
  const [performanceScore] = useState<number[][][]>(
    menuData.map((lesson) =>
      lesson.lessonData.map((section) =>
        new Array(section.sectionData.length).fill(0),
      ),
    ),
  );

  return (
    <div className="flex min-h-[58em] w-full">
      {menuData.map((lessons, lessonIndex) => {
        return lessonIndex === displayLesson ? (
          <div
            key={lessons.id}
            className="flex w-full flex-col items-center gap-8 rounded-xl rounded-tl-none rounded-tr-none bg-white px-10 pb-20 pt-8 font-lora text-3xl text-defaultblue md:rounded-tr-xl"
          >
            <LessonTitle
              performanceScore={performanceScore}
              title={lessons.title}
              lessonIndex={lessonIndex}
            />
            {lessons.lessonData.map((lesson, sectionIndex) => (
              <Fragment key={lesson.sectionId}>
                <SectionTitle
                  performanceScore={performanceScore}
                  sectionTitle={lesson.sectionTitle}
                  sectionIndex={sectionIndex}
                  lessonIndex={lessonIndex}
                  title={lessons.title}
                />
                <LevelLinks
                  performanceScore={performanceScore[lessonIndex][sectionIndex]}
                  lesson={lesson}
                  lessonIndex={lessonIndex}
                  sectionIndex={sectionIndex}
                />
              </Fragment>
            ))}
          </div>
        ) : null;
      })}
    </div>
  );
}

export default function Lessons() {
  const [displayLesson, setDisplayLesson] = useState<number>(0); //Used to manage which menu section is to be displayed

  useEffect(() => {
    Lesson.preload();
  }, []);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 py-12">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-3xl text-white">
          Typing Lessons
        </h1>
        {/* <div>Progress summary: Continue where you left off</div> */}
      </header>
      <main className="mb-10 flex flex-col md:flex-row">
        <section role="navigation" aria-label="Sidebar lessons menu">
          <SidebarMenu
            displayMenuItem={displayLesson}
            setDisplayMenuItem={setDisplayLesson}
            menuData={LessonsData()}
          />
        </section>
        <LessonMenu displayLesson={displayLesson} />
      </main>
    </div>
    // ADD advert for games and additional BOOKS/NOVELS at very bottom that levels to the book/novel typing test site. Also level ads for other sites. Add bible to books site, not here.
  );
}
