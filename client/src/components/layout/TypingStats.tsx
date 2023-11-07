import { useState, useEffect } from "react";
import GameOverMenu from "./GameOverMenu";

interface propTypes {
  charStats: string[];
  startTimer: boolean;
  testTime: number;
  firstInputDetected: boolean;
  showGameOverMenu: boolean;
  handleRestart: () => void;
  showMainMenu: () => void;
  setShowGameOverMenu: (value: boolean) => void;
  endTest: () => void;
}

function TypingStats({
  charStats,
  startTimer,
  testTime,
  firstInputDetected,
  showGameOverMenu,
  setShowGameOverMenu,
  handleRestart,
  showMainMenu,
  endTest,
}: propTypes) {
  const [stats, setStats] = useState<{
    correct: number;
    mistakes: number;
    wpm: number;
    cpm: number;
    accuracy: number;
    minutesLeft: number;
    secondsLeft: number;
  }>({
    correct: 0,
    mistakes: 0,
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    minutesLeft: 0,
    secondsLeft: 0,
  });

  const [seconds, setSeconds] = useState<number>(0);

  // Update char stats as user input changes
  useEffect(() => {
    const charMistakes = charStats.filter((stats: string) =>
      stats.includes("error")
    ).length;
    const charCorrect = charStats.filter((stats: string) =>
      stats.includes("correct")
    ).length;
    const totalCharsTyped = charCorrect + charMistakes;
    const avgCharsPerWord = 5.0;
    const timeElapsedMin = (seconds || 1) / 60;
    const netWPM = Math.ceil(charCorrect / avgCharsPerWord / timeElapsedMin);
    const netCPM = Math.ceil(charCorrect / timeElapsedMin);

    if (totalCharsTyped === 0 && !firstInputDetected) setSeconds(0); //Reset timer when test resets.

    setStats((prevState) => ({
      ...prevState,
      correct: charCorrect,
      mistakes: charMistakes,
      wpm: netWPM,
      cpm: netCPM,
      accuracy:
        Math.floor((charCorrect / (charCorrect + charMistakes)) * 100) || 0,
    }));
  }, [testTime, firstInputDetected, seconds, charStats, setStats]);

  // Start timer only when first valid input is entered
  useEffect(() => {
    if (startTimer) {
      const timeout = setTimeout(() => {
        setShowGameOverMenu(true);
        endTest();
      }, 1000 * testTime);

      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      return () => {
        console.log("timer cleared");
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [startTimer, endTest, testTime, setShowGameOverMenu]);

  const handleGetTime = (sec: number) => {
    const minCount = Math.floor((testTime - sec) / 60);
    const secCount = (testTime - sec - minCount * 60).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return (
      <span>
        <span>{minCount}</span>
        <span className="ml-0.5 mr-0.5">:</span>
        <span>{secCount}</span>
      </span>
    );
  };

  return (
    <div className="flex relative flex-col justify-center items-center w-full py-6 font-nunito">
      <ul className="flex relative justify-evenly w-full text-xl rounded-xl">
        <li>WPM {stats.wpm} </li>
        <li>CPM {stats.cpm} </li>
        <li>🎯 {stats.accuracy}%</li>
        <li>
          ⏰ {showGameOverMenu ? handleGetTime(0) : handleGetTime(seconds)}
        </li>
      </ul>
      {showGameOverMenu && (
        <GameOverMenu
          handleRestart={handleRestart}
          showMainMenu={showMainMenu}
          stats={stats}
          testTime={testTime}
        />
      )}
    </div>
  );
}

export default TypingStats;
