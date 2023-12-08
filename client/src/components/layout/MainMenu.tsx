import { useCallback, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import MenuProvider from "../../providers/MenuProvider";
import placeholder from "../../data/dummyText_1.json";
import loadable from "@loadable/component";
import StartMenu from "../forms/StartMenu";

const Button = loadable(() => import("../ui/Button"));
const TextBox = loadable(() => import("./Textbox"));
const TypingStats = loadable(() => import("./TypingStats"));

function MainMenu() {
  const [charIsValid, setCharIsValid] = useState<string[]>([""]); //Tracks every character input as valid or invalid
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [startTest, setStartTest] = useState<boolean>(false);
  const [testTimeSeconds, setTestTimeSeconds] = useState(60);
  const [cursorPosition, setCursorPosition] = useState(0); //Keeps track of cursor position while typing
  const [text, setText] = useState<string>(placeholder.text);

  const location = useLocation();

  // Updates character input validity **Need to rename this function**
  const handleStateChange = (cursorIndex: number, newValue: string) => {
    setCharIsValid(
      charIsValid.map((charStatus, index) =>
        index === cursorIndex ? newValue : charStatus,
      ),
    );
  };

  // Reset states for end test
  const handleEndTest = useCallback(() => {
    setShowGameOverMenu(true);
    setStartTimer(false);
  }, []);

  // For clearing all data when test is restarted or ended
  const clearTestData = () => {
    setCharIsValid(new Array(text.length).fill(""));
    setShowGameOverMenu(false);
    setCursorPosition(0);
    setFirstInputDetected(false);
    setStartTimer(false);
    setText(placeholder.text);
  };

  // Reset states for main menu
  const handleReturnToMenu = () => {
    setStartTest(false);
    clearTestData();
  };

  // If home page route (logo) is clicked, reset the test.
  useEffect(() => {
    if (location.pathname === "/") {
      handleReturnToMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Prelod all lazyloaded components after delay
  useEffect(() => {
    const handlePreload = () => {
      Button.preload();
      TextBox.preload();
      TypingStats.preload();
    };

    const timer = setTimeout(handlePreload, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MenuProvider>
      <div
        id="main-menu"
        className="relative z-50 -mt-[14.5em] mb-28 flex w-full max-w-4xl flex-col items-center justify-center bg-white shadow-md md:rounded-3xl"
      >
        {!startTest && (
          <StartMenu
            startTest={setStartTest}
            setText={setText}
            text={text}
            setTestTime={setTestTimeSeconds}
            setCharIsValid={setCharIsValid}
          />
        )}
        {startTest && (
          <TypingStats
            charStats={charIsValid}
            startTimer={startTimer}
            endTest={handleEndTest}
            testTime={testTimeSeconds}
            firstInputDetected={firstInputDetected}
            handleRestart={clearTestData}
            showMainMenu={handleReturnToMenu}
            showGameOverMenu={showGameOverMenu}
            setShowGameOverMenu={setShowGameOverMenu}
          />
        )}
        {!showGameOverMenu && startTest && (
          <>
            <input
              tabIndex={0}
              type="textarea"
              id="trigger-mobile-keyboard"
              name="trigger-mobile-keyboard"
              className="bg-red absolute flex h-full w-full -translate-y-10 border-2 border-none bg-transparent caret-transparent outline-none"
              onClick={(e) => {
                e.preventDefault();
              }}
            />

            {!startTimer && (
              <div className="absolute left-1 top-11 z-30 flex rounded-xl bg-sky-700 px-5 py-2 font-nunito text-white lg:-left-6">
                Start Typing!
              </div>
            )}
            <label
              htmlFor="trigger-mobile-keyboard"
              className="resize-none outline-none "
            >
              <TextBox
                charStatus={charIsValid}
                setCharStatus={handleStateChange}
                updateStartTimer={setStartTimer}
                dummyText={text}
                cursorPosition={cursorPosition}
                setCursorPosition={setCursorPosition}
                firstInputDetected={firstInputDetected}
                setFirstInputDetected={setFirstInputDetected}
              />
            </label>
          </>
        )}

        {!showGameOverMenu && startTest && (
          <div className="z-10 flex w-3/4 justify-evenly font-nunito">
            <Button
              title=""
              text="Main Menu"
              handleOnClick={handleReturnToMenu}
              type="button"
              customStyle="px-6 py-2 my-6 bg-sky-700 text-white"
            />
            <Button
              title=""
              text="Restart"
              handleOnClick={clearTestData}
              type="button"
              customStyle="px-6 py-2 my-6 bg-sky-700 text-white"
            />
          </div>
        )}
      </div>
    </MenuProvider>
  );
}

export default MainMenu;
