import { useEffect } from "react";
import Icon from "../../utils/Icon";
import TestResults from "./TestResults";

interface PropType {
  troubledKeys: { [key: string]: number };
  accurateKeys: { [key: string]: number };
  seconds: number;
  score: number;
  handleRestart: () => void;
  stats: { [key: string]: number };
  setStats: (
    value: (prevState: { [key: string]: number }) => { [key: string]: number },
  ) => void;
}

//This is a simplified game over menu for games that only tracks accuracy & troubled keys
//Used by SpeedCalculatorGame.tsx
export default function GameOverGamesMenu({
  troubledKeys,
  accurateKeys,
  seconds,
  score,
  stats,
  setStats,
}: PropType) {
  useEffect(() => {
    const correct = Object.values(accurateKeys).reduce((a, b) => a + b, 0) || 0;
    const mistakes =
      Object.values(troubledKeys).reduce((a, b) => a + b, 0) || 0;

    const accuracy = Math.round((correct / (correct + mistakes)) * 100) || 0;

    setStats((prevState) => ({
      ...prevState,
      mistakes,
      correct,
      accuracy,
    }));
  }, [accurateKeys, troubledKeys]);

  return (
    <div className="-mt-6 mb-4 flex flex-col items-center justify-center gap-10 tracking-wider text-sky-600">
      <TestResults mistakes={stats.mistakes} correct={stats.correct} />

      <h3 className="flex py-2 text-center text-2xl sm:text-4xl ">
        {stats.wpm} WPM x {stats.accuracy}% Accuracy = {stats.finalWPM} WPM
      </h3>
      <ul className="grid grid-cols-4 items-center justify-center gap-3 ">
        <li>Time: {seconds}</li>
        <li>WPM: {stats.wpm}</li>
        <li>CPM: {stats.cpm}</li>
        <li>Accuracy: {stats.accuracy}%</li>
      </ul>
      {troubledKeys.length > 0 && <div>Troubled keys: </div>}
      {/* Add sparkle anim and zoom in out animation */}
      <div className="flex items-center justify-center gap-5 text-3xl text-yellow-600">
        <span>+{score.toLocaleString()}</span>
        <span className="-translate-y-[4px] scale-[1.6]">
          <Icon title="trophy-icon" customStyle="" icon="trophy" />
        </span>
      </div>
    </div>
  );
}
