import { useState, useEffect } from "react";
import GameOverMenu from "../layout/GameOverMenu";

interface propTypes {
  charStats: string[];
  startTimer: boolean;
  endTest: () => void;
  testTime: number;
  firstInputDetected: boolean;
  handleRestart: () => void;
  showMainMenu: () => void;
}

function TypingStats({
  charStats,
  startTimer,
  endTest,
  testTime,
  firstInputDetected,
  handleRestart,
  showMainMenu,
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
      console.log("timer started");

      const timeout = setTimeout(() => {
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
  }, [startTimer, endTest, testTime]);

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
    <div className="flex flex-col justify-center items-center w-full p-12 pb-8 pt-8">
      <ul className="flex justify-evenly w-full text-2xl  pt-4 pb-4 rounded-xl">
        <li>WPM {stats.wpm} </li>
        <li>CPM {stats.cpm} </li>
        <li>🎯 {stats.accuracy}%</li>
        <li>
          ⏰{" "}
          {testTime - seconds === 0 ? handleGetTime(0) : handleGetTime(seconds)}
        </li>
      </ul>
      {testTime - seconds === 0 && (
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
