import { Link } from "react-router-dom";
import { Fragment, useMemo } from "react";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import SitemapData from "../data/SitemapData";
import useAuth from "../components/hooks/useAuth";
import AllLessonsData from "../data/AllLessonsData";

export function PageLinks({ links }) {
  return (
    <ul className="flex flex-col gap-5 py-3 sm:gap-10">
      {links.links.map((linkData) => (
        <Fragment key={links.id + linkData.id}>
          <li className="pl-5">
            <Link
              className=" font-lato text-slate-600 hover:text-sky-500"
              to={linkData.url}
            >
              {linkData.name}
            </Link>
          </li>
          <div className="flex w-full border-b sm:hidden"></div>
        </Fragment>
      ))}
    </ul>
  );
}

function Sitemap() {
  const { fadeAnim } = useLoadAnimation();
  const pages = useMemo(() => SitemapData(), []);
  const lessonsData = useMemo(() => AllLessonsData(), []);
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={` mx-auto flex max-w-[900px] flex-col gap-5 py-12  font-nunito tracking-wider text-sky-700 capitalize`}
    >
      <header>
        <h1 className="flex w-full justify-center text-3xl text-defaultblue">
          Sitemap
        </h1>
      </header>
      <main className={`${fadeAnim} items mx-5 flex flex-col gap-5`}>
        <h2 className="font-lora text-xl text-slate-950">Pages</h2>
        <ul className="mx-5 flex flex-col gap-5">
          {pages.map((links) => (
            <li key={links.id}>
              <h3>
                <Link
                  to={links.url}
                  className="text-slate-600 hover:text-sky-500"
                >
                  {links.title}
                </Link>
              </h3>
              <PageLinks links={links} />
            </li>
          ))}
          <li>
            <h3 className="mb-5 text-slate-600 hover:text-sky-500">
              <Link to={"/lessons/lesson"}>Lessons</Link>
            </h3>
            <ul className="flex flex-col pl-5">
              {lessonsData.map((lesson, lessonIndex) => (
                <li key={lesson.id} className=" font-lato text-slate-500">
                  <h4 className="cursor-pointer hover:text-sky-500">
                    <Link to={`/lessons/${lesson.id}`}>
                      Lesson {lessonIndex + 1}: {lesson.title}
                    </Link>
                  </h4>
                  <ul>
                    {lesson.lessonData.map((section, sectionIndex) => (
                      <li key={section.sectionId} className="px-5 py-2">
                        <h5 className="cursor-pointer hover:text-sky-500">
                          <Link to={`/lessons/${section.sectionId}`}>
                            Section {sectionIndex + 1}: {section.sectionTitle}
                          </Link>
                        </h5>
                        <ul className="flex flex-col">
                          {section.sectionData.map((level, levelIndex) => (
                            <li
                              key={level.id}
                              className="mr-auto cursor-pointer p-5 hover:text-sky-500"
                            >
                              <Link
                                to={`/lessons/lesson/${lessonIndex + 1}/sec-${sectionIndex + 1}/lvl-${levelIndex + 1}`}
                              >
                                Level {levelIndex + 1}: {level.levelTitle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
          {isAuthenticated && (
            <li>
              <h3>
                <Link
                  to={"profile/summary"}
                  className="font-lora text-slate-600 hover:text-sky-500"
                >
                  Profile
                </Link>
              </h3>
              <ul className="flex flex-col gap-5 py-3 sm:gap-10">
                <>
                  <li className="pl-5">
                    <Link
                      className=" font-lato text-slate-600 hover:text-sky-500"
                      to="/profile/img"
                    >
                      Image
                    </Link>
                  </li>
                  <div className="flex w-full border-b sm:hidden"></div>
                </>
                <>
                  <li className="pl-5">
                    <Link
                      className=" font-lato text-slate-600 hover:text-sky-500"
                      to="/profile/stats"
                    >
                      Stats
                    </Link>
                  </li>
                  <div className="flex w-full border-b sm:hidden"></div>
                </>
                <>
                  <li className="pl-5">
                    <Link
                      className=" font-lato text-slate-600 hover:text-sky-500"
                      to="/profile/achievements"
                    >
                      Achievements
                    </Link>
                  </li>
                  <div className="flex w-full border-b sm:hidden"></div>
                </>
                <>
                  <li className="pl-5">
                    <Link
                      className=" font-lato text-slate-600 hover:text-sky-500"
                      to="/profile/themes"
                    >
                      Themes
                    </Link>
                  </li>
                  <div className="flex w-full border-b sm:hidden"></div>
                </>
                <>
                  <li className="pl-5">
                    <Link
                      className=" font-lato text-slate-600 hover:text-sky-500"
                      to="/profile/account"
                    >
                      Account
                    </Link>
                  </li>
                  <div className="flex w-full border-b sm:hidden"></div>
                </>
              </ul>
            </li>
          )}
        </ul>
      </main>
    </div>
  );
}

export default Sitemap;
