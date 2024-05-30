import { useContext, useEffect, useState } from "react";
import TestResults from "./TestResults";
import { AuthContext } from "../../providers/AuthProvider";
import PostTestStats from "../../utils/PostTestStats";
import { MenuContext } from "../../providers/MenuProvider";
import { StatsContext } from "../../providers/StatsProvider";
import GetTotalScore from "../../utils/GetTotalScore";
import Icon from "../../utils/Icon";
import BestStats from "./BestStats";
import RestartMenuBtns from "../ui/RestartMenuBtns";
import { Link } from "react-router-dom";

interface propType {
  handleRestart: () => void;
  showMainMenu?: () => void;
  stats: { [prop: string]: number };
  testTime: number;
  difficulty?: string;
  score: number;
  testName: string;
  url?: string;
}

//Used by TypingStats.tsx component
//This game over menu includes all available metrics for typing tst including WPM/CPM/Accuracy/Troubled Keys
export default function GameOverMenu({
  handleRestart,
  showMainMenu,
  stats,
  testTime,
  score,
  difficulty,
  testName,
  url,
}: propType) {
  const { setTotalScore } = useContext(StatsContext);
  const { isAuthenticated, userId } = useContext(AuthContext);
  const [displayBestStats, setDisplayBestStats] = useState<boolean>(false);
  const { difficultySettings, currentDifficulty } = useContext(MenuContext);

  // If score is already calculated by component use score (some components like games display score to user, so score info already exists), otherwise calculate score using utility function

  useEffect(() => {
    const updateNavStats = async () => {
      const result = await GetTotalScore({ userId });
      setTotalScore(result);
    };

    // If data in handleSaveStats is saved successfully, update score on nav bar
    const handleSaveStats = async (props) => {
      const updateStatsOnDB = await PostTestStats({ ...props });

      if (updateStatsOnDB === "update header score") {
        updateNavStats();
        setDisplayBestStats(true);
      } else {
        console.log("Error updating score on nav bar");
      }
    };

    // Save typing tats to db if user is logged in
    if (isAuthenticated) {
      const difficulty_settings =
        testName === "speed-test"
          ? difficultySettings[currentDifficulty.toLowerCase()].settings
          : [];

      const difficultyScore =
        testName === "speed-test"
          ? difficultySettings[currentDifficulty.toLowerCase()].scoreBonus
          : 0;

      const difficultyLevel =
        testName === "speed-test"
          ? difficultySettings[currentDifficulty.toLowerCase()].difficultyLevel
          : difficulty;

      // Save test stats to database
      handleSaveStats({
        wpm: stats.finalWPM,
        cpm: stats.finalCPM,
        test_score: score,
        correct_chars: stats.correct,
        misspelled_chars: stats.mistakes,
        total_chars: stats.correct + stats.mistakes,
        test_accuracy: stats.accuracy,
        test_time_sec: testTime,
        difficultyLevel,
        test_name: testName,
        user_id: userId.toString(),
        difficulty_settings,
        difficulty_name:
          testName === "speed-test" ? currentDifficulty : difficultyLevel,
        difficultyScore,
      });
    }

    // Disable space bar to stop unwanted behaviour after test ends
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Display these stats ins a more presentable manner.
    <>
      <div
        data-testid="game-over-menu"
        className={`text-l mx-5 mb-4 flex flex-col items-center gap-8 text-sky-600 ${
          testName !== "speed-test" ? "-translate-y-5" : "mt-1"
        }`}
      >
        {testName === "speed-test" && (
          <h2 className="flex w-full items-center justify-center gap-5 text-center text-xl leading-relaxed text-sky-700 sm:text-2xl sm:text-[1.72rem]">
            <span className="uppercase">
              Congratulations on completing the <span>{testTime / 60} min</span>{" "}
              test!
            </span>
          </h2>
        )}

        <TestResults mistakes={stats.mistakes} correct={stats.correct} />
        <h3 className="flex py-2 text-center text-2xl sm:text-4xl">
          {stats.wpm} WPM x {stats.accuracy}% Accuracy = {stats.finalWPM} WPM
        </h3>
        <ul className="grid grid-cols-2 items-center justify-center gap-3 sm:grid-cols-4 ">
          <li>Time: {testTime}s</li>
          <li>WPM: {stats.finalWPM}</li>
          <li>CPM: {stats.finalCPM}</li>
          <li>Accuracy: {stats.accuracy}%</li>
        </ul>
        <div className="text-sm capitalize">
          Difficulty: {difficulty ? difficulty : currentDifficulty}
        </div>
        {/* Add sparkle anim and zoom in out animation */}
        {isAuthenticated ? (
          <div className="flex items-center justify-center gap-3 pb-1 pt-2 text-3xl text-yellow-600">
            <span>+{score.toLocaleString()}</span>
            <span className="-translate-y-[1px] scale-[1.6]">
              <Icon title="trophy-icon" customStyle="" icon="trophy" />
            </span>
          </div>
        ) : (
          <p className="mb-5 flex flex-col items-center justify-center gap-3 text-yellow-600">
            <span>
              <Link
                to="/register"
                className="text-yellow-700 underline hover:text-yellow-500"
              >
                Sign up free
              </Link>{" "}
              and start tracking your progress.
            </span>{" "}
            <span>You would have earned +{score.toLocaleString()} points!</span>
          </p>
        )}

        {/* <p className="text-xl text-defaultblue">
        Difficulty: Trouble keys: (expandable details menu)
      </p> */}

        <RestartMenuBtns
          handleRestart={handleRestart}
          gameOver={true}
          url={url}
          showMainMenu={showMainMenu}
        />
      </div>
      {isAuthenticated && displayBestStats && (
        <BestStats
          userId={userId}
          difficultyLevel={
            testName === "speed-test" ? currentDifficulty : difficulty
          }
          testName={testName}
          gameOver={true}
        />
      )}
    </>
  );
}
