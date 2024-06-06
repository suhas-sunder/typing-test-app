import { useLayoutEffect, useMemo } from "react";
import loadable from "@loadable/component";
import useTestDependencies from "../components/hooks/useTestDependencies";
import LessonData from "../data/LessonData";
import ValidateChars from "../utils/validation/ValidateChars";
import useLoadAnimation from "../components/hooks/useLoadAnimation";

const Keyboard = loadable(() => import("../components/ui/shared/Keyboard"));
const TriggerMobileKeyboard = loadable(
  () => import("../components/ui/shared/TriggerMobileKeyboard"),
);
const Textbox = loadable(() => import("../components/layout/shared/Textbox"));
const TypingStats = loadable(
  () => import("../components/layout/shared/TypingStats"),
);

function Lesson() {
  const lessonText =
    "Lessons are still under development! Lessons are still under development! Lessons are still under development!";

  const lessonIndex: number = parseInt(location.pathname.split("/")[3]) - 1;
  const sectionIndex: number =
    parseInt(location.pathname.split("/")[4].split("-")[1]) - 1;
  const levelIndex: number =
    parseInt(location.pathname.split("/")[5].split("-")[1]) - 1;
  const lessonData = useMemo(() => LessonData(), []);
  const lessonName = lessonData[lessonIndex].title;
  const sectionName =
    lessonData[lessonIndex].lessonData[sectionIndex].sectionTitle;
  const levelName =
    lessonData[lessonIndex].lessonData[sectionIndex].sectionData[levelIndex]
      .levelTitle;

  const {
    firstInputDetected,
    charIsValid,
    showGameOverMenu,
    startTimer,
    cursorPosition,
    text,
    accurateKeys,
    troubledKeys,
    navigate,
    setStartTimer,
    handleEndTest,
    clearTestData,
    setCursorPosition,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
  } = useTestDependencies({ defaultText: lessonText });

  const { fadeAnim } = useLoadAnimation();

  // / Prelod all lazyloaded components after delay
  useLayoutEffect(() => {
    Textbox.load();
    TypingStats.load();
    TriggerMobileKeyboard.load();
    Keyboard.load();
  }, []);

  return (
    <div
      className={` ${fadeAnim} mx-auto flex max-w-[1200px] flex-col pb-12 pt-3`}
    >
      <header>
        <h1
          className={`${
            showGameOverMenu ? "mb-5" : "mb-2"
          } mt-2 flex w-full items-center justify-center  font-nunito text-xs  text-defaultblue sm:gap-2 md:text-sm`}
        >
          <span className=" translate-y-[1px] ">
            Lesson {lessonIndex + 1} - Section {sectionIndex + 1} - Level{" "}
            {levelIndex + 1}
          </span>{" "}
          <span className="hidden translate-y-[1px] sm:flex">
            ({lessonName} - {sectionName} - {levelName})
          </span>
        </h1>
      </header>
      <main className="relative mx-auto flex max-w-[900px] flex-col">
        <TypingStats
          accurateKeys={accurateKeys}
          troubledKeys={troubledKeys}
          charStats={charIsValid}
          charIsValid={charIsValid}
          startTimer={startTimer}
          endTest={handleEndTest}
          firstInputDetected={firstInputDetected}
          handleRestart={clearTestData}
          showMainMenu={() => navigate("/lessons")}
          showGameOverMenu={showGameOverMenu}
          difficulty={lessonName}
          setShowGameOverMenu={setShowGameOverMenu}
          testName={"lesson"}
          testLength={text.length}
        />
        {!showGameOverMenu && (
          <>
            <div className="sm:-translate-y-4">
              {" "}
              {!startTimer && (
                <div className="absolute -left-4 top-[3.5em] z-10 flex rounded-xl bg-sky-700 px-5 py-2 font-nunito text-white opacity-50 sm:-top-8">
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
                  dummyText={text}
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
              className="hidden  min-h-[25em] -translate-y-3 flex-col items-center justify-center gap-6 md:flex lg:min-h-[30em]"
            >
              <Keyboard
                handleRestartLesson={clearTestData}
                displayedText={lessonText}
                cursorPosition={cursorPosition}
              />
            </section>
          </>
        )}

        <div className="mt-10 flex flex-col gap-5 px-5 text-slate-600">
          <h2 className="text-center font-lora text-2xl">Lesson Details</h2>
          <ul className="flex flex-col gap-4 font-lato text-xl">
            <li className="flex gap-3">
              <span>Lesson {lessonIndex + 1}:</span> <span>{lessonName}</span>
            </li>
            <li>
              Section {sectionIndex + 1}: {sectionName}
            </li>
            <li>
              Level {levelIndex + 1}: "{levelName}"
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Lesson;
