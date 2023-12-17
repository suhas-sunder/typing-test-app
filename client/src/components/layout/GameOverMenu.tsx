import { useContext, useEffect } from "react";
import Button from "../ui/Button";
import TestResults from "./TestResults";
import TestScore from "./TestScore";
// import { StatsContext } from "../../providers/ProfileStatsProvider";
import { AuthContext } from "../../providers/AuthProvider";
import { StatsContext } from "../../providers/ProfileStatsProvider";
import PostTestStats from "../../utils/PostTestStats";
import { MenuContext } from "../../providers/MenuProvider";

interface propType {
  handleRestart: () => void;
  showMainMenu: () => void;
  testStats: { [prop: string]: number };
  testTime: number;
  difficultyScore: number;
}

function GameOverMenu({
  handleRestart,
  showMainMenu,
  testStats,
  testTime,
  difficultyScore,
}: propType) {
  const { updateNavStats } = useContext(StatsContext);
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { difficultySettings, currentDifficulty } = useContext(MenuContext);

  const finalWPM = Math.round(testStats.wpm * (testStats.accuracy / 100));
  const finalCPM = Math.round(testStats.cpm * (testStats.accuracy / 100));

  //Base difficulty score times 1 min + test time/Max test time + wpm % * penalize wpm below 40 so that if user doesn't type much or is too slow, they don't score too high * test accuracy %.
  const testScore = Math.ceil(
    difficultyScore *
      (1 + testTime / (60 * 10) + finalWPM / 100) *
      (testStats.accuracy / 100) *
      (finalWPM / 40 > 1 ? 1 : finalWPM / 40),
  );

  useEffect(() => {
    const handleSaveStats = async (props) => {
      // Save test stats to database
      const updateStatsOnDB = await PostTestStats({ ...props });

      // If data is saved successfully, update score on nav bar
      if (updateStatsOnDB === "update header score") updateNavStats(userId);
    };

    // Save typing tats to db
    if (isAuthenticated) {
      const testDifficultySettings =
        difficultySettings[currentDifficulty.toLowerCase()].settings;

      const difficultyScore =
        difficultySettings[currentDifficulty.toLowerCase()].scoreBonus;

      const difficultyLevel =
        difficultySettings[currentDifficulty.toLowerCase()].difficultyLevel;

      console.log(difficultyLevel);

      console.log(testStats);

      handleSaveStats({
        wpm: finalWPM,
        cpm: finalCPM,
        test_score: testScore,
        correct_chars: testStats.correct,
        misspelled_chars: testStats.mistakes,
        total_chars: testStats.correct + testStats.mistakes,
        test_accuracy: testStats.accuracy,
        test_time_sec: testTime,
        difficultyLevel,
        test_name: "speed-test",
        user_id: userId.toString(),
        difficulty_settings: testDifficultySettings,
        difficulty_name: currentDifficulty,
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
      className="text-l  mx-5 mb-4 mt-6 flex flex-col items-center gap-8 text-sky-600 sm:text-2xl"
    >
      <div>
        <h2 className="flex w-full items-center justify-center gap-5 text-center text-xl leading-relaxed  text-sky-700 sm:text-2xl sm:text-[1.72rem]">
          <span className="uppercase">
            Congratulations on completing the <span>{testTime / 60} min</span>{" "}
            test!
          </span>
        </h2>
      </div>

      <TestResults mistakes={testStats.mistakes} correct={testStats.correct} />

      <h3 className="flex py-2 text-center text-2xl sm:text-4xl">
        {testStats.wpm} WPM x {testStats.accuracy}% Accuracy = {finalWPM} WPM
      </h3>

      {isAuthenticated ? (
        <>
          <TestScore testScore={testScore} testTime={testTime} wpm={finalWPM} />
          <p className="text-xl text-yellow-800 opacity-80">
            Progress and list of unlocked items as icon.
          </p>
        </>
      ) : (
        <p className="mb-5 flex flex-col items-center justify-center gap-3">
          <span>Sign up free and start tracking your progress.</span>{" "}
          <span>You would have earned +{testScore} points!</span>
        </p>
      )}

      <p className="text-xl text-defaultblue">
        Difficulty: Trouble keys: (expandable details menu)
      </p>

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
    </div>
  );
}

export default GameOverMenu;
