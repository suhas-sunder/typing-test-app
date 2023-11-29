import { useState, useEffect } from "react";
import GameOverMenu from "./GameOverMenu";
import Icon from "../../utils/Icon";

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
      stats.includes("error"),
    ).length;
    const charCorrect = charStats.filter((stats: string) =>
      stats.includes("correct"),
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
    <div className="fit-content relative flex w-full flex-col items-center justify-center pb-5 pt-3 font-nunito sm:pb-[1.8em] sm:pt-[2em]">
      <ul className="relative flex w-full justify-center gap-6 rounded-xl text-lg leading-7 text-sky-600 sm:justify-evenly sm:text-[1.15rem]">
        <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
          {/* This div adds title as tooltip on hover*/}
          <div
            title="Words Per Min"
            className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default bg-black opacity-0"
          />
          <Icon
            title="paper quill icon"
            icon="paperQuill"
            customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
          />
          <span className="m-0 inline-flex leading-[0]">WPM {stats.wpm}</span>
        </li>
        <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
          {/* This div adds title as tooltip on hover*/}
          <div
            title="Characters Per Min"
            className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default bg-black opacity-0"
          />
          <Icon
            title="paper quill icon"
            icon="paperQuill"
            customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
          />
          <span className="m-0 inline-flex leading-[0]">CPM {stats.cpm}</span>
        </li>
        <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
          {/* This div adds title as tooltip on hover*/}
          <div
            title="Accuracy"
            className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default bg-black opacity-0"
          />
          <Icon
            title="alarm clock icon"
            icon="circleCheckmark"
            customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
          />
          <span className="m-0 inline-flex leading-[0]">{stats.accuracy}%</span>
        </li>
        <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
          {/* This div adds title as tooltip on hover*/}
          <div
            title="Timer"
            className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default bg-black opacity-0"
          />
          <Icon
            title="alarm clock icon"
            icon="clock"
            customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
          />
          <span className="m-0 inline-flex leading-[0]">
            {showGameOverMenu ? handleGetTime(0) : handleGetTime(seconds)}
          </span>
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
