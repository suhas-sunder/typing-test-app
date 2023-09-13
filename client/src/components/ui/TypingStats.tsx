import { useState, useEffect } from "react";

interface propTypes {
  charStats: string[],
  startTimer: boolean,
  testTime: number,
}

function TypingStats({ charStats, startTimer, testTime }: propTypes) {
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

  // Start timer when a valid keyboard input is detected
  useEffect(() => {
    setTimeout(() => {
      
    }, 1000 * testTime )
  })

  return (
    <div className="flex justify-center w-full p-12 pb-8 pt-8">
      <ul className="flex justify-evenly w-full text-2xl  pt-4 pb-4 rounded-xl">
        {/* <li>Correct: {stats.correct}</li>
        <li>Mistakes: {stats.mistakes}</li> */}
        <li>WPM: {`${calculateWPM()}`} </li>
        <li>CPM: {`${calculateCPM()}`} </li>
        <li>🎯: {`${calculatePercentAccuracy()}`} </li>
        <li>⏰: 1:27</li>
      </ul>
    </div>
  );
}

export default TypingStats;
