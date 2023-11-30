import { useCallback, useEffect, useState } from "react";
import TypingStats from "./TypingStats";
import TextBox from "./Textbox";
import StartMenu from "../forms/StartMenu";
import placeholder from "../../data/dummyText_1.json";
import { useLocation } from "react-router-dom";
import Button from "../ui/Button";
import MenuProvider from "../../providers/MenuProvider";

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

  return (
    <MenuProvider>
      <div
        id="main-menu"
        className="relative z-50 -mt-[14em] mb-28 flex w-full max-w-4xl flex-col items-center justify-center bg-white shadow-md sm:rounded-3xl"
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
              className="bg-red absolute flex h-full w-full border-2 -translate-y-10 border-none bg-transparent caret-transparent outline-none"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
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
          <div className="flex w-3/4 justify-evenly font-nunito">
            <Button
              title=""
              text="Main Menu"
              handleOnClick={handleReturnToMenu}
              type="button"
              customStyle="px-6 py-2 my-6 bg-sky-500 text-white"
            />
            <Button
              title=""
              text="Restart"
              handleOnClick={clearTestData}
              type="button"
              customStyle="px-6 py-2 my-6 bg-sky-500 text-white"
            />
          </div>
        )}
      </div>
    </MenuProvider>
  );
}

export default MainMenu;
