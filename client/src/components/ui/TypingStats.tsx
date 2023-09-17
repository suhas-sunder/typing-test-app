import { useState, useEffect } from "react";

interface propTypes {
  charStats: string[];
  startTimer: boolean;
  endTest: () => void;
  testTime: number;
  firstInputDetected: boolean;
}

function TypingStats({
  charStats,
  startTimer,
  endTest,
  testTime,
  firstInputDetected,
}: propTypes) {
  const [stats, setStats] = useState<{
    correct: number;
    mistakes: number;
    wpm: number;
    cpm: number;
    accuracy: number;
    timer: number;
  }>({
    correct: 0,
    mistakes: 0,
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    timer: 0,
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
    const timeElapsedMin = (seconds || 1) / 60.0;
    const netWPM = Math.round(charCorrect / avgCharsPerWord / timeElapsedMin);

    const netCPM = Math.round(charCorrect / timeElapsedMin);

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
  }, [firstInputDetected, seconds, charStats, setStats]);

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

  return (
    <div className="flex justify-center w-full p-12 pb-8 pt-8">
      <ul className="flex justify-evenly w-full text-2xl  pt-4 pb-4 rounded-xl">
        <li>WPM: {stats.wpm} </li>
        <li>CPM: {stats.cpm} </li>
        <li>🎯: {stats.accuracy}%</li>
        <li> ⏰: {testTime - seconds === 0 ? testTime : testTime - seconds}</li>
      </ul>
    </div>
  );
}

export default TypingStats;
