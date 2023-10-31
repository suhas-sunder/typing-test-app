import { useCallback, useEffect, useState } from "react";
import TypingStats from "../ui/TypingStats";
import TextBox from "./TextBox";
import StartMenu from "../forms/StartMenuForm";
import placeholder from "../../../public/data/dummyText_1.json";
import { useLocation } from "react-router-dom";

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
        index === cursorIndex ? newValue : charStatus
      )
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
  }, [location]);

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-4xl -mt-[14em] bg-white shadow-md overflow-hidden sm:rounded-3xl">
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
      )}

      {!showGameOverMenu && startTest && (
        <div className="flex justify-evenly w-3/4 font-nunito">
          <button
            type="button"
            onClick={handleReturnToMenu}
            className="px-6 py-2 my-6 rounded-md bg-start-btn-green text-white tracking-wider hover:brightness-105"
          >
            Main Menu
          </button>
          <button
            type="button"
            onClick={clearTestData}
            className="px-6 py-2 my-6 rounded-md bg-start-btn-green text-white tracking-wider hover:brightness-105"
          >
            Restart
          </button>
        </div>
      )}

      {/* Feature to be added in the future */}
      <label className="justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hidden ">
        Show Keyboard (Make this a toggle setting top right.) Hide/Show stats
        <input type="checkbox" className="hidden" />
      </label>
    </div>
  );
}

export default MainMenu;
