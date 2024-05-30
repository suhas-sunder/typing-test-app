import { useState, useEffect, useContext } from "react";
import { MenuContext } from "../../providers/MenuProvider";
import loadable from "@loadable/component";
import Icon from "../../utils/Icon";
import useTestStats from "../hooks/useTestStats";
import CalculateTestScore from "../../utils/CalculateTestScore";

const GameOverMenu = loadable(() => import("./GameOverMenu"));

interface propTypes {
  charStats: string[];
  startTimer: boolean;
  testTime: number;
  firstInputDetected: boolean;
  showGameOverMenu: boolean;
  charIsValid?: string[];
  accurateKeys: { [key: string]: number };
  troubledKeys: { [key: string]: number };
  handleRestart: () => void;
  showMainMenu: () => void;
  setShowGameOverMenu: (value: boolean) => void;
  endTest: () => void;
}

//Used by MainMenu.tsx component
function TypingStats({
  startTimer,
  testTime,
  accurateKeys,
  troubledKeys,
  firstInputDetected,
  showGameOverMenu,
  charIsValid,
  setShowGameOverMenu,
  handleRestart,
  showMainMenu,
  endTest,
}: propTypes) {
  const { difficultySettings, currentDifficulty } = useContext(MenuContext);
  const [testStats, setTestStats] = useState<{ [key: string]: number }>({
    correct: 0,
    mistakes: 0,
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    minutesLeft: 0,
    secondsLeft: 0,
  });

  const [seconds, setSeconds] = useState<number>(0);
  const [displayTimer, setDisplayTimer] = useState<{
    [key: string]: string | boolean;
  }>({
    min: Math.ceil(testTime / 60).toString(),
    sec: "00 ",
    start: false,
  });

  // Update char stats as user input changes
  useTestStats({
    firstInputDetected,
    seconds,
    setStats: setTestStats,
    setSeconds,
    accurateKeys,
    charIsValid,
    troubledKeys,
  });

  // Start timer only when first valid input is entered
  useEffect(() => {
    const handleSetTimer = (sec: number) => {
      const minCount = Math.floor((testTime - sec) / 60);
      const secCount = (testTime - sec - minCount * 60).toLocaleString(
        "en-US",
        {
          minimumIntegerDigits: 2,
          useGrouping: false,
        },
      );

      setDisplayTimer({ min: minCount.toString(), sec: secCount, start: true });
    };

    if (startTimer) {
      // Update seconds
      const interval = setInterval(() => {
        if (
          displayTimer.min === "0" &&
          displayTimer.sec === "00" &&
          displayTimer.start
        ) {
          GameOverMenu.load();
          setShowGameOverMenu(true); //Show game over menu
          // handleSetTimer(0); //Display test length on timer when test ends. Eg. If test length is 1 min, it will display 1:00 instead of 0:00
          endTest(); //Reset all settings for test when test ends
        } else {
          setSeconds((seconds) => seconds + 1);
          handleSetTimer(seconds + 1); //Update clock countdown for display
        }
      }, 1000);

      // Cleanup timeout
      return () => {
        clearInterval(interval);
      };
    } else {
      displayTimer.start &&
        setDisplayTimer({
          min: Math.ceil(testTime / 60).toString(),
          sec: "00 ",
          start: false,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    startTimer,
    endTest,
    testTime,
    setShowGameOverMenu,
    seconds,
    showGameOverMenu,
    displayTimer,
  ]);

  //Preload/load all components on component mount
  useEffect(() => {
    GameOverMenu.preload();
  }, []);

  return (
    <div className="fit-content relative flex w-full flex-col items-center justify-center pb-5 pt-3 font-nunito sm:pb-[1.8em] sm:pt-[2em]">
      {!showGameOverMenu ? (
        <ul className="relative flex w-full justify-center gap-2 rounded-xl text-lg leading-7 text-sky-700 sm:max-w-xl sm:justify-evenly sm:gap-6 sm:text-[1.15rem]">
          <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* This div adds title as tooltip on hover*/}
            <div
              title="Words Per Min"
              className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default opacity-0"
            />
            <Icon
              title="paper quill icon"
              icon="paperQuill"
              customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
            />
            <span className="m-0 inline-flex min-w-[4.3em] justify-center leading-[0]">
              WPM {testStats.wpm}
            </span>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* This div adds title as tooltip on hover*/}
            <div
              title="Characters Per Min"
              className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default  opacity-0"
            />
            <Icon
              title="paper quill icon"
              icon="paperQuill"
              customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
            />
            <span className="fit-content m-0 inline-flex min-w-[4.48em]  justify-center leading-[0.1]">
              CPM {testStats.cpm}
            </span>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* This div adds title as tooltip on hover*/}
            <div
              title="Accuracy"
              className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default  opacity-0"
            />
            <Icon
              title="alarm clock icon"
              icon="circleCheckmark"
              customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
            />
            <span className="fit-content m-0 inline-flex min-w-[2.95em] justify-center leading-[0]">
              {testStats.accuracy}%
            </span>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* This div adds title as tooltip on hover*/}
            <div
              title="Timer"
              className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default  opacity-0"
            />
            <Icon
              title="alarm clock icon"
              icon="clock"
              customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
            />
            <span className="fit-content m-0 inline-flex min-w-[3.05em] justify-center leading-[0]">
              <span>{displayTimer.min}</span>
              <span className="ml-0.5 mr-0.5">:</span>
              <span>{displayTimer.sec}</span>
            </span>
          </li>
        </ul>
      ) : (
        <GameOverMenu
          handleRestart={handleRestart}
          showMainMenu={showMainMenu}
          stats={testStats}
          testTime={testTime}
          testName="speed-test"
          score={CalculateTestScore({
            wpm: testStats.wpm,
            accuracy: testStats.accuracy,
            testTime,
            difficultyScore:
              difficultySettings[currentDifficulty.toLowerCase()].scoreBonus,
          })}
        />
      )}
    </div>
  );
}

export default TypingStats;
