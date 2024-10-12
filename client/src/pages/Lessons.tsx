import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LessonMenuData from "../data/LessonMenuData";
import useLessonText from "../components/hooks/useLessonText";
import usePerformanceStats from "../components/hooks/usePerformanceStats";
import SidebarMenu from "../components/ui/navigation/SidebarMenu";

type lessonURLType = { [key: string]: [{ testName: string }] };

export default function Lessons() {
  const [displayLesson, setDisplayLesson] = useState<number>(0); //Used to manage which menu section is to be displayed
  const navigate = useNavigate();
  const sidebarMenuData = useMemo(() => LessonMenuData(), []);
  const [lessonURLs, setLessonURLs] = useState<lessonURLType>({}); //List of all urls for each lesson section

  const { allLessonData } = useLessonText();
  const lessonName = location.pathname.split("/")[2];

  //Generates a list of all lesson urls which are the same as the test names saved in db for each lesson. It will be used to fetch performance scores for all lessons.
  useEffect(() => {
    const handelGenURLs = () => {
      const allURLs = {};
      allLessonData.forEach((lesson, lessonIndex) =>
        lesson.lessonData.forEach((section, sectionIndex) =>
          section.sectionData.forEach((_level, levelIndex) => {
            if (allURLs[lesson.id]) {
              allURLs[lesson.id].push({
                testName: `lesson/${lessonIndex + 1}/sec-${
                  sectionIndex + 1
                }/lvl-${levelIndex + 1}`,
              });
            } else {
              allURLs[lesson.id] = [
                {
                  testName: `lesson/${lessonIndex + 1}/sec-${
                    sectionIndex + 1
                  }/lvl-${levelIndex + 1}`,
                },
              ];
            }
          }),
        ),
      );

      setLessonURLs(allURLs);
    };

    if (
      Object.keys(lessonURLs).length === 0 &&
      !location.pathname.includes("lessons/lesson/")
    )
      handelGenURLs();
  }, [allLessonData, lessonName, lessonURLs]);

  usePerformanceStats({
    testNameList: lessonURLs[lessonName],
  }); //Handles fetching of performance scores and saves to context

  useLayoutEffect(() => {
    if (location.pathname === "/lessons") navigate("/lessons/beginner");
  }, [navigate]);

  return (
    <>
      {location.pathname.includes("/lesson/") ? (
        <Outlet />
      ) : (
        <div className={`mx-auto flex max-w-[1200px] flex-col gap-10 py-12 `}>
          <header>
            <h1 className="flex w-full justify-center font-nunito text-3xl text-white">
              Typing Lessons
            </h1>
            {/* <div>Progress summary: Continue where you left off</div> */}
          </header>
          <main className="mb-10 flex flex-col rounded-2xl  md:flex-row">
            <section
              role="navigation"
              aria-label="Sidebar lessons menu"
              className="mb-auto flex min-w-[13em] items-start rounded-l-2xl md:min-h-[28em] md:bg-slate-200"
            >
              <SidebarMenu
                displayMenuItem={displayLesson}
                setDisplayMenuItem={setDisplayLesson}
                menuData={sidebarMenuData}
              />
            </section>
            <section className="flex min-h-[66em] w-full rounded-2xl rounded-tl-none rounded-tr-none bg-white md:rounded-tr-xl">
              <Outlet />
            </section>
            {/* <LessonMenu displayLesson={displayLesson} menuData={menuData} /> */}
          </main>
        </div>
      )}
    </>
    // ADD advert for games and additional BOOKS/NOVELS at very bottom that levels to the book/novel typing test site. Also level ads for other sites. Add bible to books site, not here.
  );
}
