import { useState, useEffect } from "react";

interface propTypes {
  charStats: string[];
  startTimer: boolean;
  endTest: () => void;
  testTime: number;
  // dispResultsMenu: () => void;
  // resetTimer: (value: boolean) => void;
}

function TypingStats({ charStats, startTimer, endTest, testTime }: propTypes) {
  const [seconds, setSeconds] = useState<number>(0);

  const [stats, setStats] = useState<{
    correct: number;
    mistakes: number;
    timer: number;
  }>({
    correct: 0,
    mistakes: 0,
    timer: 0,
  });

  const calculateWPM = () => {
    const totalCharsTyped = stats.correct + stats.mistakes;
    const avgCharsPerWord = 5;
    const timeElapsedMin = 22 / 60;
    const grossWPM = Math.round(
      totalCharsTyped / avgCharsPerWord / timeElapsedMin
    );
    return grossWPM;
  };

  const calculateCPM = () => {
    const totalCharsTyped = stats.correct + stats.mistakes;
    const avgCharsPerWord = 5;
    const timeElapsedMin = 22 / 60;
    const grossWPM = Math.round(
      totalCharsTyped / avgCharsPerWord / timeElapsedMin
    );
    return grossWPM;
  };

  const calculatePercentAccuracy = () => {
    const totalCharsTyped = stats.correct + stats.mistakes;
    const avgCharsPerWord = 5;
    const timeElapsedMin = 22 / 60;
    const grossWPM = Math.round(
      totalCharsTyped / avgCharsPerWord / timeElapsedMin
    );
    return grossWPM;
  };

  // Update char stats as user input changes
  useEffect(() => {
    setStats((prevState) => ({
      ...prevState,
      correct: charStats.filter((stats: string) => stats.includes("correct"))
        .length,
      mistakes: charStats.filter((stats: string) => stats.includes("error"))
        .length,
    }));
  }, [charStats]);

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
        setSeconds(0);
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [startTimer, testTime]);

  return (
    <div className="flex justify-center w-full p-12 pb-8 pt-8">
      <ul className="flex justify-evenly w-full text-2xl  pt-4 pb-4 rounded-xl">
        {/* <li>Correct: {stats.correct}</li>
        <li>Mistakes: {stats.mistakes}</li> */}
        <li>WPM: {`${calculateWPM()}`} </li>
        <li>CPM: {`${calculateCPM()}`} </li>
        <li>🎯: {`${calculatePercentAccuracy()}`} </li>
        <li>⏰: {seconds}</li>
      </ul>
    </div>
  );
}

export default TypingStats;
