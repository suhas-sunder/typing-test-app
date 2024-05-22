import { useEffect, useState } from "react";
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
      console.log(result);
    };

    const fetchTimeout = setTimeout(() => fetchBestStats(), 1000); //Add a delay so that updated data is fetched from database AFTER the db is updated otherwise the data becomes stale

    return () => clearTimeout(fetchTimeout);
  }, [difficultyLevel, testName, userId, gameOver]);

  return (
    <>
      <div className="mb-3 mt-9 flex w-full flex-col items-center justify-center gap-7 px-4 font-nunito tracking-wider ">
        {/* {gameOver && (
          <div>
            IF NEW BEST add animation to the new best below & add an animated
            notice here.
          </div>
        )} */}
        <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
          Best WPM
        </h2>
        <ul className="grid w-full grid-cols-2 items-center justify-center gap-y-3 text-sky-700 sm:grid-cols-4">
          <li className="text-yellow-600">
            WPM: {bestStats?.bestWPM?.finalWPM || 0}
          </li>
          <li>CPM: {bestStats?.bestWPM?.finalCPM || 0}</li>
          <li>Accuracy: {bestStats?.bestWPM?.accuracy || 0}%</li>
          <li>Score: {bestStats?.bestWPM?.score?.toLocaleString() || 0}</li>
          <li>Time: {bestStats?.bestWPM?.seconds || 0}s</li>
          <li>Words: {bestStats?.bestWPM?.words || 0}</li>
          <li>Chars: {bestStats?.bestWPM?.chars || 0}</li>
        </ul>
        <ul className="flex w-full max-w-[40em] flex-col items-center justify-between gap-y-5 text-xs sm:flex-row">
          <li>
            Difficulty: {bestStats?.bestWPM?.difficulty || difficultyLevel}
          </li>
          <li>
            Date accomplished:{" "}
            {FormatDate({
              date: bestStats?.bestWPM?.createdAt.toString() || "N/A",
            })}
          </li>
        </ul>

        <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
          Best Score
        </h2>
        <ul className="grid w-full grid-cols-2 items-center justify-center gap-y-3 text-sky-700 sm:grid-cols-4">
          <li>WPM: {bestStats?.bestScore?.finalWPM || 0}</li>
          <li>CPM: {bestStats?.bestScore?.finalCPM || 0}</li>
          <li>Accuracy: {bestStats?.bestScore?.accuracy || 0}%</li>
          <li className="text-yellow-600">
            Score: {bestStats?.bestScore?.score?.toLocaleString() || 0}
          </li>
          <li>Time: {bestStats?.bestScore?.seconds || 0}s</li>
          <li>Words: {bestStats?.bestScore?.words || 0}</li>
          <li>Chars: {bestStats?.bestScore?.chars || 0}</li>
        </ul>
        <ul className="flex w-full max-w-[40em] flex-col items-center justify-between gap-y-5 text-xs sm:flex-row">
          <li>
            Difficulty: {bestStats?.bestScore?.difficulty || difficultyLevel}
          </li>
          <li>
            Date accomplished:{" "}
            {FormatDate({
              date: bestStats?.bestScore?.createdAt.toString() || "N/A",
            })}
          </li>
        </ul>
        <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
          Longest Time
        </h2>
        <ul className="grid w-full grid-cols-2 items-center justify-center gap-y-3 text-sky-700 sm:grid-cols-4">
          <li>WPM: {bestStats?.bestTime?.finalWPM || 0}</li>
          <li>CPM: {bestStats?.bestTime?.finalCPM || 0}</li>
          <li>Accuracy: {bestStats?.bestTime?.accuracy || 0}%</li>
          <li>Score: {bestStats?.bestTime?.score?.toLocaleString() || 0}</li>
          <li className="text-yellow-600">
            Time: {bestStats?.bestTime?.seconds || 0}s
          </li>
          <li>Words: {bestStats?.bestTime?.words || 0}</li>
          <li>Chars: {bestStats?.bestTime?.chars || 0}</li>
        </ul>
        <ul className="flex w-full max-w-[40em] flex-col items-center justify-between gap-y-5 text-xs sm:flex-row">
          <li>
            Difficulty: {bestStats?.bestTime?.difficulty || difficultyLevel}
          </li>
          <li>
            Date accomplished:{" "}
            {FormatDate({
              date: bestStats?.bestTime?.createdAt.toString() || "N/A",
            })}
          </li>
        </ul>
        <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
          Words Typed
        </h2>
        <ul className="grid w-full grid-cols-2 items-center justify-center gap-y-3 text-sky-700 sm:grid-cols-4">
          <li>WPM: {bestStats?.bestWords?.finalWPM || 0}</li>
          <li>CPM: {bestStats?.bestWords?.finalCPM || 0}</li>
          <li>Accuracy: {bestStats?.bestWords?.accuracy || 0}%</li>
          <li>Score: {bestStats?.bestWords?.score?.toLocaleString() || 0}</li>
          <li>Time: {bestStats?.bestWords?.seconds || 0}s</li>
          <li className="text-yellow-600">
            Words: {bestStats?.bestWords?.words || 0}
          </li>
          <li>Chars: {bestStats?.bestWords?.chars || 0}</li>
        </ul>
        <ul className="flex w-full max-w-[40em] flex-col items-center justify-between gap-y-5 text-xs sm:flex-row">
          <li>
            Difficulty: {bestStats?.bestWords?.difficulty || difficultyLevel}
          </li>
          <li>
            Date accomplished:{" "}
            {FormatDate({
              date: bestStats?.bestWords?.createdAt.toString() || "N/A",
            })}
          </li>
        </ul>
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
