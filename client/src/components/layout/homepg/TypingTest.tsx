import { useEffect, useLayoutEffect } from "react";
import loadable from "@loadable/component";
import UpdateCharStatus from "../../../utils/validation/ValidateChars";
import useTestDependencies from "../../hooks/useTestDependencies";
import useMenu from "../../hooks/useMenu";
import { useNavigate } from "react-router-dom";

const Keyboard = loadable(() => import("../../ui/shared/Keyboard"));

const TriggerMobileKeyboard = loadable(
  () => import("../../ui/shared/TriggerMobileKeyboard"),
);
const RestartMenuBtns = loadable(
  () => import("../../ui/shared/RestartMenuBtns"),
);
const SettingsModal = loadable(() => import("../../ui/homepg/SettingsModal"));
const DropDownMenu = loadable(() => import("../../ui/homepg/DropDownMenu"));
const Textbox = loadable(() => import("../shared/Textbox"));
const TypingStats = loadable(() => import("../shared/TypingStats"));

//Used by Home.tsx component for speed typing test
export default function TypingTest() {
  const { countDownTime, typingText } = useMenu();

  //Dependencies common to all typing tests
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
    handleEndTest,
    clearTestData,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
    setText,
  } = useTestDependencies({ defaultText: typingText });

  // Reset states for main menu
  const handleReturnToMenu = () => {
    clearTestData();
    setText("");
  };

  const navigate = useNavigate();

  // If home page route (logo) is clicked, reset the test.
  useEffect(() => {
    if (!typingText) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingText]);

  // Prelod all lazyloaded components after delay
  useLayoutEffect(() => {
    Textbox.load();
    TypingStats.load();
    TriggerMobileKeyboard.preload();
    RestartMenuBtns.preload();
    SettingsModal.preload();
    DropDownMenu.preload();
    Keyboard.preload();
  }, []);

  return (
    <main className="relative mx-auto flex max-w-[900px] flex-col">
      <div className="flex min-h-[5em]">
        <TypingStats
          accurateKeys={accurateKeys}
          troubledKeys={troubledKeys}
          charIsValid={charIsValid}
          startTimer={startTimer}
          endTest={handleEndTest}
          countDownTime={countDownTime}
          firstInputDetected={firstInputDetected}
          handleRestart={clearTestData}
          showMainMenu={handleReturnToMenu}
          showGameOverMenu={showGameOverMenu}
          setShowGameOverMenu={setShowGameOverMenu}
          testName={"speed-test"}
          testLength={text.length}
        />
      </div>
      {!showGameOverMenu && (
        <>
          <div className="min-h-[19.5em] sm:-translate-y-4">
            {" "}
            {!startTimer && (
              <div className="absolute -left-4 top-[3.5em] z-10 flex rounded-xl bg-sky-700 px-5 py-2 font-nunito text-white opacity-50 sm:-top-8">
                Start Typing!
              </div>
            )}
            <TriggerMobileKeyboard showGameOverMenu={showGameOverMenu}>
              <Textbox
                accurateKeys={accurateKeys}
                troubledKeys={troubledKeys}
                charStatus={charIsValid}
                charIsValid={charIsValid}
                setCharStatus={(cursorIndex, newValue) =>
                  UpdateCharStatus({ setCharIsValid, cursorIndex, newValue })
                }
                updateStartTimer={setStartTimer}
                dummyText={text}
                cursorPosition={cursorPosition}
                setCursorPosition={setCursorPosition}
                firstInputDetected={firstInputDetected}
                setFirstInputDetected={setFirstInputDetected}
                setTroubledKeys={setTroubledKeys}
                setAccurateKeys={setAccurateKeys}
                lessonsPgText={false}
              />
            </TriggerMobileKeyboard>
          </div>
          <section
            id="keyboard"
            className="hidden min-h-[23em] -translate-y-3 flex-col items-center justify-center gap-6 md:flex lg:min-h-[23em]"
          >
            <Keyboard
              handleRestartLesson={clearTestData}
              displayedText={[...text]}
              cursorPosition={cursorPosition}
              menuURL="/"
            />
          </section>
        </>
      )}
    </main>
  );
}
