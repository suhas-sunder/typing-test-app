const text =
  "It seemed like it should have been so simple. There was nothing inherently difficult with getting the project done. It was simple and straightforward enough that even a child should have been able to complete it on time, but that wasn't the case. The deadline had arrived and the project remained unfinished.                                                                                                                                                                                                                                                                                                                                                                        ";

import { useCallback, useState } from "react";
import TypingStats from "../ui/TypingStats";
import TextBox from "./TextBox";
import GameOverMenu from "../forms/GameOverMenu";
import StartMenu from "../forms/StartMenu";

function MainMenu() {
  const [startTest, setStartTest] = useState<boolean>(true);
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const [charIsValid, setCharIsValid] = useState<string[]>(
    new Array(text.length).fill("")
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
    setCharIsValid(new Array(text.length).fill(""));
    setShowGameOverMenu(false);
    setCursorPosition(0);
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
          testTime={5}
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
        />
      )}
      {showGameOverMenu && (
        <GameOverMenu
          handleRestart={handleRestartTest}
          showMainMenu={handleReturnToMenu}
        />
      )}
      {!showGameOverMenu && startTest && (
        <button onClick={handleReturnToMenu}>Main Menu</button>
      )}
      <label className="justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hidden">
        Show Keyboard (Make this a toggle setting top right.)
        <input type="checkbox" className="hidden" />
      </label>
    </div>
  );
}

export default MainMenu;
