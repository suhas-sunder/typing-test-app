import { useCallback, useState } from "react";
import TypingStats from "../ui/TypingStats";
import TextBox from "./TextBox";
import GameOverMenu from "./GameOverMenu";
import StartMenu from "../forms/StartMenu";

interface propTypes {
  dummyText: string;
}

function MainMenu({ dummyText }: propTypes) {
  const [startTest, setStartTest] = useState<boolean>(false);
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started

  const [charIsValid, setCharIsValid] = useState<string[]>(
    new Array(dummyText.length).fill("")
  );

  const handleStateChange = (cursorIndex: number, newValue: string) => {
    setCharIsValid(
      charIsValid.map((charStatus, index) =>
        index === cursorIndex ? newValue : charStatus
      )
    );
  };

  const handleEndTest = useCallback(() => {
    console.log("Test ended");
    setShowGameOverMenu(true);
    setStartTimer(false);
  }, []);

  const clearTestData = () => {
    setCharIsValid(new Array(dummyText.length).fill(""));
    setShowGameOverMenu(false);
    setCursorPosition(0);
    setFirstInputDetected(false);
    setStartTimer(false);
  };

  const handleRestartTest = () => {
    clearTestData();
  };

  const handleReturnToMenu = () => {
    setStartTest(false);
    clearTestData();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-6xl m-1 -mt-36  bg-white rounded-3xl shadow-md overflow-hidden">
      {!startTest && <StartMenu startTest={setStartTest} />}
      {startTest && (
        <TypingStats
          charStats={charIsValid}
          startTimer={startTimer}
          endTest={handleEndTest}
          testTime={60}
          firstInputDetected={firstInputDetected}
        />
      )}
      {!showGameOverMenu && startTest && (
        <TextBox
          charStatus={charIsValid}
          setCharStatus={handleStateChange}
          updateStartTimer={setStartTimer}
          dummyText={dummyText}
          cursorPosition={cursorPosition}
          setCursorPosition={setCursorPosition}
          firstInputDetected={firstInputDetected}
          setFirstInputDetected={setFirstInputDetected}
        />
      )}
      {showGameOverMenu && (
        <GameOverMenu
          handleRestart={handleRestartTest}
          showMainMenu={handleReturnToMenu}
        />
      )}
      {!showGameOverMenu && startTest && (
        <div>
          <button onClick={handleReturnToMenu}>Main Menu</button>
          <button onClick={handleRestartTest}>Restart</button>
        </div>
      )}
      <label className="justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hidden">
        Show Keyboard (Make this a toggle setting top right.) Hide/Show CPM,
        Hide/Show WPM,
        <input type="checkbox" className="hidden" />
      </label>
    </div>
  );
}

export default MainMenu;
