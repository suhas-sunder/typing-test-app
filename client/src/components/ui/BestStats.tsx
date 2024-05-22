import { Fragment, useEffect, useState } from "react";
import GetBestStats from "../../utils/GetBestStats";
import FormatDate from "../../utils/FormatDate";

//Display best stats for test, lesson, or game
function BestStats({ userId, difficultyLevel, testName, gameOver }) {
  const [bestStats, setBestStats] = useState<{
    [key: string]: { [key: string]: number | string };
  }>({});

  useEffect(() => {
    const fetchBestStats = async () => {
      const result = await GetBestStats({
        userId,
        testName,
        difficultyLevel,
      });

      setBestStats((prevState) => ({ ...prevState, ...result }));
    };

    fetchBestStats();
  }, [difficultyLevel, testName, userId, gameOver]);
  return (
    <div className="mb-6 mt-8 flex w-full flex-col items-center justify-center gap-7 px-16 font-nunito capitalize tracking-wider">
      {/* {gameOver && (
          <div>
            IF NEW BEST add animation to the new best below & add an animated
            notice here.
          </div>
        )} */}

      <div className="mb-4 flex flex-col items-center justify-center gap-7 px-4 text-center font-nunito tracking-wider">
        <h2 className="font-lora text-xl tracking-widest text-defaultblue">
          Achievements
        </h2>
        <ul className="grid grid-cols-3 text-center text-sky-700">
          <li>*</li>
          <li>*</li>
          <li>*</li>
        </ul>
      </div>
      {Object.values(bestStats).map((stats) => (
        <Fragment key={stats.id}>
          <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
            {stats.title}
          </h2>
          <ul className="grid w-full grid-cols-2 items-center justify-center gap-y-3  text-center text-sky-700 sm:grid-cols-4">
            <li className={`${stats.id === "best-wpm" && "text-yellow-600"}`}>
              WPM: {stats?.finalWPM || 0}
            </li>
            <li>CPM: {stats?.finalCPM || 0}</li>
            <li>Accuracy: {stats?.accuracy || 0}%</li>
            <li className={`${stats.id === "best-score" && "text-yellow-600"}`}>
              Score: {stats?.score?.toLocaleString() || 0}
            </li>
            <li className={`${stats.id === "best-time" && "text-yellow-600"}`}>
              Time: {stats?.seconds || 0}s
            </li>
            <li className={`${stats.id === "best-words" && "text-yellow-600"}`}>
              Words: {stats?.words || 0}
            </li>
            <li>Chars: {stats?.chars || 0}</li>
          </ul>
          <ul className="flex w-full flex-col items-center justify-between  gap-y-5 text-center text-xs sm:flex-row">
            <li>Test: {testName.split("-").join(" ")}</li>
            <li>Difficulty: {stats?.difficulty || difficultyLevel}</li>
            <li>
              Date:{" "}
              {(stats?.createdAt &&
                FormatDate({
                  date: stats?.createdAt?.toString(),
                })) ||
                "N/A"}
            </li>
          </ul>
        </Fragment>
      ))}

      <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
        Troubled Keys
      </h2>
      <div>coming soon...</div>
    </div>
  );
}

export default BestStats;
