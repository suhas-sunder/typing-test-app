import UpdateCharStatus from "../utils/UpdateCharStatus";
import loadable from "@loadable/component";
import LessonsData from "../data/LessonsData";
import TypingStats from "../components/layout/TypingStats";
import TestDependencies from "../components/hooks/useTestDependencies";

const Textbox = loadable(() => import("../components/layout/Textbox"));

function Lesson() {
  const lessonText = "Lessons are still under development!";

  const lessonIndex: number = parseInt(location.pathname.split("/")[3]) - 1;
  const sectionIndex: number =
    parseInt(location.pathname.split("/")[4].split("-")[1]) - 1;
  const levelIndex: number =
    parseInt(location.pathname.split("/")[5].split("-")[1]) - 1;

  const lessonName = LessonsData()[lessonIndex].title;
  const sectionName =
    LessonsData()[lessonIndex].lessonData[sectionIndex].sectionTitle;
  const levelName =
    LessonsData()[lessonIndex].lessonData[sectionIndex].sectionData[levelIndex]
      .levelTitle;

  const {
    firstInputDetected,
    charIsValid,
    showGameOverMenu,
    startTimer,
    setStartTimer,
    cursorPosition,
    setCursorPosition,
    text,
    accurateKeys,
    troubledKeys,
    navigate,
    handleEndTest,
    clearTestData,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
  } = TestDependencies({ defaultText: lessonText });

  return (
    <div className="mx-auto flex  max-w-[1200px] flex-col pb-12 pt-3">
      <header>
        <h1 className="mb-20 flex w-full items-center justify-center  font-nunito text-xs  text-defaultblue sm:gap-6 md:text-sm">
          <span className=" translate-y-[1px] ">
            Lesson {lessonIndex + 1} - Section {sectionIndex + 1} - Level{" "}
            {levelIndex + 1}
          </span>{" "}
          <span className="hidden sm:flex">|</span>{" "}
          <span className="hidden translate-y-[1px] sm:flex">
            {lessonName} - {sectionName} - {levelName}
          </span>
        </h1>
      </header>
      <main className="relative mx-auto flex max-w-[900px] flex-col gap-10">
        <div className="relative">
          <input
            tabIndex={0}
            type="text"
            id="trigger-mobile-keyboard"
            name="trigger-mobile-keyboard"
            className="absolute flex h-full w-full -translate-y-10 border-2 border-none bg-transparent caret-transparent outline-none"
            onClick={(e) => {
              e.preventDefault();
            }}
          />

          {!startTimer && (
            <div className="absolute -top-5 z-30 flex rounded-xl bg-sky-700 bg-opacity-80 px-5 py-2 font-nunito text-white">
              Start Typing!
            </div>
          )}
          <label
            htmlFor="trigger-mobile-keyboard"
            className="resize-none outline-none "
          >
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
              <Textbox
                charStatus={charIsValid}
                setCharStatus={(cursorIndex, newValue) =>
                  UpdateCharStatus({ setCharIsValid, cursorIndex, newValue })
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
            )}
          </label>
        </div>
        <div className="flex flex-col gap-5 px-5 text-slate-600">
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
