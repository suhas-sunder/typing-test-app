import { useContext, useEffect, useState } from "react";
import AccountAPI from "../../api/accountAPI";
import { MenuContext } from "../../providers/MenuProvider";
import Icon from "../../utils/Icon";

interface PropType {
  testScore: number;
  testTime: number;
  wpm: number;
}

//Used by GameOverMenu.tsx component
//performance stars: 20, 30, 40, 50, 60 + one hidden star with different colour codes for 70, 80, 90, 100. Add a tooltip for each star to show what wpm it depicts.
function TestScore({ testScore, testTime, wpm }: PropType) {
  const { difficultySettings, currentDifficulty, id } = useContext(MenuContext);
  const [bestStats, setBestStats] = useState({
    score: 0,
    wpm: 0,
  });

  useEffect(() => {
    const fetchScoreData = async () => {
      try {
        const response = await AccountAPI.get("/bestteststats", {
          method: "GET",
          params: {
            userId: id,
            difficulty_level:
              difficultySettings[currentDifficulty].difficultyLevel,
            test_time_sec: testTime,
          },
        })
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
            console.log(err);
          });

        const parseRes = await response;

        if (parseRes) {
          const bestScore = parseRes.bestscore;
          const bestWPM = parseRes.bestwpm;
          setBestStats({
            score: bestScore > testScore ? bestScore : testScore,
            wpm: bestWPM > wpm ? bestWPM : wpm,
          });
        } else {
          console.log("Error fetching best score and wpm");
        }
      } catch (err) {
        let message: string;

        if (err instanceof Error) {
          message = err.message;
        } else {
          message = String(err);
        }

        console.error(message);
      }
    };

    fetchScoreData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-2 flex w-full scale-90 flex-col items-center justify-evenly gap-10 sm:flex-row">
      <div className="flex min-w-[17em] flex-col gap-2 rounded-md border-2 border-yellow-800 border-opacity-40 p-6 py-4 text-lg">
        <span className="flex items-center justify-center gap-1 border-b-2 border-yellow-800 border-opacity-40 pb-2">
          <span className="inline-flex text-yellow-800 opacity-80">
            Performance:
          </span>
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              wpm >= 20 ? "text-yellow-600" : "text-yellow-800 opacity-40"
            }`}
            icon={wpm >= 20 ? "starFull" : "starEmpty"}
          />
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              wpm >= 30 ? "text-yellow-600" : "text-yellow-800 opacity-40"
            }`}
            icon={wpm >= 30 ? "starFull" : "starEmpty"}
          />
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              wpm >= 40 ? "text-yellow-600" : "text-yellow-800 opacity-40"
            }`}
            icon={wpm >= 40 ? "starFull" : "starEmpty"}
          />
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              wpm >= 50 ? "text-yellow-600" : "text-yellow-800 opacity-40"
            }`}
            icon={wpm >= 50 ? "starFull" : "starEmpty"}
          />
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              wpm >= 60 ? "text-yellow-600" : "text-yellow-800 opacity-40"
            }`}
            icon={wpm >= 60 ? "starFull" : "starEmpty"}
          />
        </span>
        <span className="flex  scale-75 items-center justify-center gap-1 opacity-75">
          <span className="inline-flex text-yellow-800">Best:</span>
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              bestStats.wpm >= 20
                ? "text-yellow-600"
                : "text-yellow-800 opacity-40"
            }`}
            icon={bestStats.wpm >= 20 ? "starFull" : "starEmpty"}
          />
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              bestStats.wpm >= 30
                ? "text-yellow-600"
                : "text-yellow-800 opacity-40"
            }`}
            icon={bestStats.wpm >= 30 ? "starFull" : "starEmpty"}
          />
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              bestStats.wpm >= 40
                ? "text-yellow-600"
                : "text-yellow-800 opacity-40"
            }`}
            icon={bestStats.wpm >= 40 ? "starFull" : "starEmpty"}
          />
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              bestStats.wpm >= 50
                ? "text-yellow-600"
                : "text-yellow-800 opacity-40"
            }`}
            icon={bestStats.wpm >= 50 ? "starFull" : "starEmpty"}
          />
          <Icon
            title="star-icon"
            customStyle={`inline-flex ${
              bestStats.wpm >= 60
                ? "text-yellow-600"
                : "text-yellow-800 opacity-40"
            }`}
            icon={bestStats.wpm >= 60 ? "starFull" : "starEmpty"}
          />
        </span>
      </div>
      <div className="flex min-w-[17em] flex-col gap-2 rounded-md border-2 border-yellow-800 border-opacity-40 p-6 py-4 text-lg">
        <div className="flex items-center justify-center gap-2 border-b-2 border-yellow-800 border-opacity-40 pb-2 text-yellow-600">
          <span className="inline-flex text-yellow-800 opacity-80">Score:</span>
          <span className="inline-flex gap-2  text-[1.2rem]  text-yellow-600">
            + {testScore.toLocaleString()}
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex  scale-105 text-yellow-600"
            icon="trophy"
          />
        </div>
        <div className="flex scale-75 items-center justify-center gap-2 text-yellow-800 opacity-75">
          <span>Best:</span>
          <span className="inline-flex text-[1.1rem]  text-yellow-600">
            + {bestStats.score.toLocaleString() || testScore}
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex  scale-105 text-yellow-600"
            icon="trophy"
          />
        </div>
      </div>
    </div>
  );
}

export default TestScore;
