import { useEffect, useMemo, useState } from "react";
import useTestDependencies from "../components/hooks/useTestDependencies";
import ValidateChars from "../utils/validation/ValidateChars";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import useLessonText from "../components/hooks/useLessonText";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LessonNavData from "../data/LessonNavData";
import TypingStats from "../components/layout/shared/TypingStats";
import TriggerMobileKeyboard from "../components/ui/shared/TriggerMobileKeyboard";
import Textbox from "../components/layout/shared/Textbox";
import Keyboard from "../components/ui/shared/Keyboard";

function Lesson() {
  const {
    lessonIndex,
    levelIndex,
    sectionIndex,
    lessonName,
    sectionName,
    levelName,
    lessonText,
  } = useLessonText(); //gets lesson text and data obtained from pathname

  const {
    firstInputDetected,
    charIsValid,
    showGameOverMenu,
    startTimer,
    cursorPosition,
    accurateKeys,
    troubledKeys,
    setStartTimer,
    handleEndTest,
    clearTestData,
    setCursorPosition,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
  } = useTestDependencies({ defaultText: lessonText }); //Variables and other dependencies shared among all test components: typing test, lessons, games etc.

  const { fadeAnim } = useLoadAnimation();

  const location = useLocation();
  const navigate = useNavigate();

  const [navPageLinks, setNavPageLinks] = useState({
    prevPageUrl: "",
    nextPageUrl: "",
  });

  const lessonNavData: string[] = useMemo(() => LessonNavData(), []); //Saved nav data to track navigation links for lessons

  //Handles page navigation pathname (allows users to navigate from current lesson to prev/next lesson based on saved nav data)
  useEffect(() => {
    if (lessonNavData.length <= 0 || !lessonNavData) return;
    const loc = location.pathname;
    const lessonIndex = lessonNavData.indexOf(loc);

    if (lessonIndex - 1 >= 0)
      setNavPageLinks((prevState) => ({
        ...prevState,
        prevPageUrl: lessonNavData[lessonIndex - 1],
      }));

    if (lessonIndex + 1 <= lessonNavData.length)
      setNavPageLinks((prevState) => ({
        ...prevState,
        nextPageUrl: lessonNavData[lessonIndex + 1],
      }));
  }, [lessonNavData, location]);

  return (
    <div
      className={` ${fadeAnim} mx-auto flex max-w-[1200px] flex-col pb-12 pt-3`}
    >
      <header className=" mt-2 flex flex-col items-center justify-center gap-2">
        <nav className="flex w-full max-w-[600px] justify-between gap-8 px-5">
          <Link
            to={navPageLinks.prevPageUrl}
            className="mr-auto whitespace-nowrap rounded-xl border-2 border-slate-200 px-3 py-1 font-nunito text-sm text-slate-400 hover:border-slate-400 hover:text-slate-600"
          >
            Prev Lesson
          </Link>
          <Link
            to={navPageLinks.nextPageUrl}
            className="ml-auto whitespace-nowrap rounded-xl border-2 border-slate-200 px-3 py-1 font-nunito text-sm text-slate-400 hover:border-slate-400 hover:text-slate-600"
          >
            Next Lesson
          </Link>
        </nav>
        <h1
          className={`${
            showGameOverMenu ? "mb-5" : "mb-2"
          } mt-2 flex w-full items-center justify-center  font-nunito text-xs  text-defaultblue sm:gap-2 md:text-sm`}
        >
          <span className=" translate-y-[1px]">
            Lesson {lessonIndex + 1} - Section {sectionIndex + 1} - Level{" "}
            {levelIndex + 1}
          </span>{" "}
          <span className="hidden translate-y-[1px] capitalize sm:flex">
            ({lessonName} - {sectionName} - {levelName})
          </span>
        </h1>
      </header>
      <main className="relative mx-auto flex max-w-[900px] flex-col">
        <div className="flex min-h-[5em]">
          <TypingStats
            accurateKeys={accurateKeys}
            troubledKeys={troubledKeys}
            charIsValid={charIsValid}
            startTimer={startTimer}
            endTest={handleEndTest}
            firstInputDetected={firstInputDetected}
            handleRestart={clearTestData}
            showMainMenu={() => navigate("/lessons")}
            showGameOverMenu={showGameOverMenu}
            difficulty={lessonName}
            setShowGameOverMenu={setShowGameOverMenu}
            testName={`lesson/${lessonIndex + 1}/sec-${sectionIndex + 1}/lvl-${levelIndex + 1}`}
            testLength={lessonText.length}
            lessonIndex={lessonIndex}
          />
        </div>
        {!showGameOverMenu && (
          <>
            <div className="min-h-[14.5em] sm:-translate-y-4">
              {" "}
              {!startTimer && (
                <div className="absolute left-2 top-[5em] z-10 flex rounded-xl bg-sky-700 px-5 py-2 font-nunito text-white opacity-50 sm:top-0">
                  Start Typing!
                </div>
              )}
              <TriggerMobileKeyboard showGameOverMenu={showGameOverMenu}>
                <Textbox
                  charStatus={charIsValid}
                  setCharStatus={(cursorIndex, newValue) =>
                    ValidateChars({ setCharIsValid, cursorIndex, newValue })
                  }
                  updateStartTimer={setStartTimer}
                  dummyText={lessonText}
                  cursorPosition={cursorPosition}
                  setCursorPosition={setCursorPosition}
                  firstInputDetected={firstInputDetected}
                  setFirstInputDetected={setFirstInputDetected}
                  troubledKeys={troubledKeys}
                  setTroubledKeys={setTroubledKeys}
                  accurateKeys={accurateKeys}
                  setAccurateKeys={setAccurateKeys}
                  lessonsPgText={true}
                />
              </TriggerMobileKeyboard>
            </div>
            <section
              id="keyboard"
              className="hidden min-h-[23em] -translate-y-3 flex-col items-center justify-center gap-6 md:flex lg:min-h-[23em]"
            >
              <Keyboard
                handleRestartLesson={clearTestData}
                displayedText={[...lessonText]}
                cursorPosition={cursorPosition}
                menuURL={"/lessons"}
              />
            </section>
          </>
        )}

        <div className="mt-10 flex flex-col gap-5 px-5 capitalize text-slate-600">
          <h2 className="text-center font-lora text-2xl">Lesson Details</h2>
          <ul className="flex flex-col items-center justify-center gap-4 font-lato text-xl">
            <li className="flex gap-3">
              Lesson {lessonIndex + 1}: {lessonName}
            </li>
            <li>
              Section {sectionIndex + 1}: {sectionName}
            </li>
            <li>
              Level {levelIndex + 1}: "{levelName}"
            </li>
          </ul>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Lesson;
