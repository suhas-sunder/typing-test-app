import { useEffect, useState } from "react";
import GetBestStats from "../../utils/GetBestStats";
import FormatDate from "../../utils/FormatDate";

//Display best stats for test, lesson, or game
function BestStats({ isAuthenticated, userId, difficultyLevel }) {
  const [bestStats, setBestStats] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchBestStats = async () => {
      const result = await GetBestStats({
        userId,
        testName: "calculator-game",
        difficultyLevel,
      });

      setBestStats(result);
    };

    isAuthenticated && fetchBestStats();
  }, [isAuthenticated, userId, difficultyLevel]);

  return (
    <>
      <div className="mb-3 mt-9 flex w-full flex-col items-center justify-center gap-7 px-4 font-nunito tracking-wider ">
        <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
          My Best Stats
        </h2>
        <ul className="grid grid-cols-2 items-center justify-center gap-x-8 gap-y-3 text-sky-700 sm:grid-cols-4">
          <li>Accuracy: {bestStats.test_accuracy || 0}%</li>
          <li>Score: {bestStats?.test_score?.toLocaleString() || 0}</li>
          <li>WPM: {bestStats.wpm || 0}</li>
          <li>CPM: {bestStats.cpm || 0}</li>
        </ul>
        {bestStats.created_at && (
          <p className="text-xs">
            Date accomplished:{" "}
            {FormatDate({ date: bestStats?.created_at.toString() })}
          </p>
        )}
      </div>
      <div className="mb-4 flex flex-col items-center justify-center gap-7 px-4 font-nunito tracking-wider">
        <h2 className="font-lora text-xl tracking-widest text-defaultblue">
          Achievements
        </h2>
        <ul className="grid grid-cols-3 text-center text-sky-700">
          <li>*</li>
          <li>*</li>
          <li>*</li>
        </ul>
      </div>
    </>
  );
}

export default BestStats;
