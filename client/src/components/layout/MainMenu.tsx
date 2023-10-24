import { useCallback, useState } from "react";
import TypingStats from "../ui/TypingStats";
import TextBox from "./TextBox";
import StartMenu from "../forms/StartMenuForm";
import placeholder from "../../assets/dummyText_1.json";

function MainMenu() {
  const [startTest, setStartTest] = useState<boolean>(false);
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [testTimeSeconds, setTestTimeSeconds] = useState(60);
  const [cursorPosition, setCursorPosition] = useState(0); //Keeps track of cursor position while typing
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started
  const [text, setText] = useState<string>("asdf");

  const [charIsValid, setCharIsValid] = useState<string[]>([""]); //Tracks every character input as valid or invalid

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
  };

  // Reset states for main menu
  const handleReturnToMenu = () => {
    setStartTest(false);
    clearTestData();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-6xl m-1 -mt-[14em]  bg-white rounded-3xl shadow-md overflow-hidden">
      {!startTest && (
        <StartMenu
          startTest={setStartTest}
          setText={setText}
          setTestTime={setTestTimeSeconds}
          placeholderText={placeholder.text}
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

      {/* I may just make this the same for both game over menu and test menu for simplicity. Overcomplicated this. */}
      {!showGameOverMenu && startTest && (
        <div>
          <button type="button" onClick={handleReturnToMenu}>
            Main Menu
          </button>
          <button type="button" onClick={clearTestData}>
            Restart
          </button>
        </div>
      )}

      {/* Feature to be added in the future */}
      <label className="justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hidden">
        Show Keyboard (Make this a toggle setting top right.) Hide/Show stats
        <input type="checkbox" className="hidden" />
      </label>
    </div>
  );
}

export default MainMenu;
