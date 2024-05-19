import { useEffect, useState } from "react";

interface PropType {
  troubledKeys: { [key: string]: number };
  accurateKeys: { [key: string]: number };
  seconds: number;
  score: number;
  handleRestart: () => void;
}

//This is a simplified game over menu for games that only tracks accuracy & troubled keys
//Used by SpeedCalculatorGame.tsx
export default function GameOverGamesMenu({
  troubledKeys,
  accurateKeys,
  seconds,
  score,
}: PropType) {
  const [stats, setStats] = useState<{ [key: string]: number }>({
    troubledKeys: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const totalAccurateKeys =
      Object.values(accurateKeys).reduce((a, b) => a + b, 0) || 0;
    const totalTroubledKeys =
      Object.values(troubledKeys).reduce((a, b) => a + b, 0) || 0;

    const percentageAccuracy =
      Math.round(
        (totalAccurateKeys / (totalAccurateKeys + totalTroubledKeys)) * 100,
      ) || 0;

    setStats({ totalAccurateKeys, totalTroubledKeys, percentageAccuracy });
  }, [accurateKeys, troubledKeys]);

  return (
    <div className="mb-14 flex flex-col items-center justify-center gap-3 tracking-wider">
      <ul className="grid grid-cols-2 items-center justify-center gap-3 ">
        <li>score: {score}</li>
        <li>Time: {seconds}</li>
        <li>WPM: {seconds}</li>
        <li>CPM: {seconds}</li>
      </ul>
      <div>X mistakes/Xtotal keys * 100% = %{stats.accuracy}</div>
      {/* If there are mistakes, display table with few rows of mistakes made and number of mistakes. Then have a link to all troubled keys page.*/}
      <div>Troubled keys: </div>
      {/* If achiement is unlocked, display it here */}
      {/* If best score is beat, display it here */}
    </div>
  );
}
