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
    totalAccurateKeys: 0,
    totalTroubledKeys: 0,
    percentageAccuracy: 0,
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
      <h2>Game Over!</h2>
      <ul className="flex items-center justify-center gap-3 ">
        <li>Seconds: {seconds}</li>
        <li>score: {score}</li>
        <li>percentageAccuracy: {stats.percentageAccuracy}%</li>
      </ul>
      <div className="flex w-full flex-col items-center justify-center px-4 font-lora tracking-wider">
        <h2 className="text-xl tracking-widest text-defaultblue">
          My Best Stats
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
          <li>Score:</li>
          <li>Accuracy:</li>
          <li>WPM:</li>
          <li>CPM:</li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center px-4 font-lora tracking-wider">
        <h2 className="text-xl tracking-widest text-defaultblue">
          Achievements
        </h2>
        <ul className="grid grid-cols-3 text-center">
          <li>*</li>
          <li>*</li>
          <li>*</li>
        </ul>
        <p>Add note if user unlocks achievement</p>
      </div>
    </div>
  );
}
