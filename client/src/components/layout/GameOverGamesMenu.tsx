import { useEffect, useState } from "react";

interface PropType {
  troubledKeys: { [key: string]: number };
  accurateKeys: { [key: string]: number };
  seconds: number;
  score: number;
}

//This is a simplified game over menu that only tracks accuracy & troubled keys
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
    const totalAccurateKeys = Object.values(accurateKeys).reduce(
      (a, b) => a + b,
      0,
    );
    const totalTroubledKeys = Object.values(troubledKeys).reduce(
      (a, b) => a + b,
      0,
    );

    const percentageAccuracy = Math.round(
      (totalAccurateKeys / (totalAccurateKeys + totalTroubledKeys)) * 100,
    );

    console.log(
      totalAccurateKeys,
      totalTroubledKeys,
      percentageAccuracy,
      seconds,
      score,
    );

    setStats({ totalAccurateKeys, totalTroubledKeys, percentageAccuracy });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      Seconds: {seconds}
      Accuracy: {stats.percentageAccuracy}
    </div>
  );
}
