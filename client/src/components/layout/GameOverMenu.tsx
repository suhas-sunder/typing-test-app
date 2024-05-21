import { useContext, useEffect } from "react";
import Button from "../ui/Button";
import TestResults from "./TestResults";
import { AuthContext } from "../../providers/AuthProvider";
import PostTestStats from "../../utils/PostTestStats";
import { MenuContext } from "../../providers/MenuProvider";
import CalculateTestScore from "../../utils/CalculateTestScore";
import { StatsContext } from "../../providers/StatsProvider";
import GetTotalScore from "../../utils/GetTotalScore";
import Icon from "../../utils/Icon";

interface propType {
  handleRestart: () => void;
  showMainMenu?: () => void;
  stats: { [prop: string]: number };
  testTime: number;
  difficulty?: string;
  difficultyScore?: number;
  score?: number;
  testName: string;
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
  difficultyScore,
  testName,
}: propType) {
  const { setTotalScore } = useContext(StatsContext);
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { difficultySettings, currentDifficulty } = useContext(MenuContext);

  // If score is already calculated by component use score (some components like games display score to user, so score info already exists), otherwise calculate score using utility function
  const testScore = score
    ? score
    : CalculateTestScore({
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        testTime,
        difficultyScore,
      });

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
        test_score: testScore,
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

    // Disable spacebar to stop unwanted behaviour after test ends
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
    <div
      data-testid="game-over-menu"
      className="text-l  mx-5 mb-4 mt-6 flex flex-col items-center gap-8 text-sky-600"
    >
      {testName === "speed-test" && (
        <h2 className="flex w-full items-center justify-center gap-5 text-center text-xl leading-relaxed  text-sky-700 sm:text-2xl sm:text-[1.72rem]">
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
      {/* {troubledKeys.length > 0 && <div>Troubled keys: </div>} */}
      {/* Add sparkle anim and zoom in out animation */}
      {isAuthenticated ? (
        <div className="flex items-center justify-center gap-5 text-3xl text-yellow-600">
          <span>+{testScore.toLocaleString()}</span>
          <span className="-translate-y-[4px] scale-[1.6]">
            <Icon title="trophy-icon" customStyle="" icon="trophy" />
          </span>
        </div>
      ) : (
        <p className="mb-5 flex flex-col items-center justify-center gap-3">
          <span>Sign up free and start tracking your progress.</span>{" "}
          <span>You would have earned +{testScore} points!</span>
        </p>
      )}

      {/* <p className="text-xl text-defaultblue">
        Difficulty: Trouble keys: (expandable details menu)
      </p> */}

      {showMainMenu && (
        <div className="max-w-3/4  text-md flex w-full justify-evenly sm:text-lg ">
          <Button
            title=""
            text="Try Again"
            handleOnClick={handleRestart}
            type="button"
            customStyle="px-6 py-2 rounded-md bg-sky-700 text-white "
          />

          <Button
            title=""
            text="Main Menu"
            handleOnClick={showMainMenu}
            type="button"
            customStyle="px-6 py-2 rounded-md bg-sky-700 text-white "
          />
        </div>
      )}
      {/* The stats below will be based on the exact specifications of the test eg. 10 min with medium difficulty is diff from 1 min with medium difficulty is diff from 1 min with custom difficulty etc.*/}
      <div>
        <div className="mb-3 mt-9 flex w-full flex-col items-center justify-center gap-5 px-4 font-nunito tracking-wider">
          <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
            My Best Stats
          </h2>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
            <li>Accuracy:</li>
            <li>Score:</li>
            <li>WPM:</li>
            <li>CPM:</li>
          </ul>
          <p>Date accomplished: 01/01/2024</p>
        </div>
        <div className="mb-8 flex flex-col items-center justify-center px-4 font-nunito tracking-wider">
          <h2 className="font-lora text-xl tracking-widest text-defaultblue">
            Achievements
          </h2>
          <ul className="grid grid-cols-3 text-center">
            <li>*</li>
            <li>*</li>
            <li>*</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
