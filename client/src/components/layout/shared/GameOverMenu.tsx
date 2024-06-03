import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import PostTestStats from "../../../utils/requests/PostTestStats";
import GetTotalScore from "../../../utils/requests/GetTotalScore";
import useAuth from "../../hooks/useAuth";
import useStats from "../../hooks/useStats";
import useMenu from "../../hooks/useMenu";
import usePreventDefaultInputs from "../../hooks/usePreventDefaultInputs";

const BestStats = loadable(() => import("./BestStats"));
const RestartMenuBtns = loadable(
  () => import("../../ui/shared/RestartMenuBtns"),
);
const Icon = loadable(() => import("../../../utils/other/Icon"));

interface propType {
  handleRestart: () => void;
  showMainMenu: () => void;
  testStats: { [prop: string]: number };
  testTime: number;
  difficulty?: string;
  score: number;
  testName: string;
}

type TestResultsProps = {
  mistakes: number;
  correct: number;
};

//Display test results
function TestResults({ mistakes, correct }: TestResultsProps) {
  return (
    <div
      className={`relative flex flex-col gap-6 overflow-hidden rounded-md bg-opacity-50 pb-1 sm:flex-row`}
    >
      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-sky-200 bg-white p-3 text-base text-sky-700">
        <thead>
          <tr className="mb-1 flex w-full justify-center border-b-2 border-sky-200 text-xl">
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex w-full flex-col">
            <td className="flex w-full justify-around gap-2">
              <span>Words:</span>
              <span>{Math.ceil((mistakes + correct) / 5) || 0}</span>
            </td>
            <td className="flex w-full justify-around gap-2">
              <span>Chars:</span>
              <span>{mistakes + correct}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-green-200 bg-white p-3 text-base text-green-700">
        <thead>
          <tr className="mb-1 flex w-full justify-center border-b-2 border-green-200 text-lg sm:text-xl">
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex w-full flex-col">
            <td className="flex w-full justify-around gap-2">
              <span>Words:</span>
              <span>{Math.floor(correct / 5) || 0}</span>
            </td>
            <td className="flex w-full justify-around gap-2">
              <span>Chars:</span>
              <span>{correct}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-red-200 bg-white p-3 text-base text-red-700">
        <thead>
          <tr className="mb-1 flex w-full justify-center border-b-2 border-red-200 text-lg sm:text-xl">
            <th>Misspelled</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex w-full flex-col">
            <td className="flex w-full justify-around gap-2">
              <span>Words:</span>
              <span>{Math.ceil(mistakes / 5) || 0}</span>
            </td>
            <td className="flex w-full justify-around gap-2">
              <span>Chars:</span>
              <span>{mistakes}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

//Display game over menu for speed test, lessons, and games
export default function GameOverMenu({
  handleRestart,
  showMainMenu,
  testStats,
  testTime,
  score,
  difficulty,
  testName,
}: propType) {
  const { setTotalScore } = useStats();
  const { isAuthenticated, userId } = useAuth();
  const { difficultySettings, currentDifficulty } = useMenu();
  const [displayBestStats, setDisplayBestStats] = useState<boolean>(false);

  usePreventDefaultInputs(); // Disable space bar to stop unwanted behaviour after test ends

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

    // Save typing testStats to db if user is logged in
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

      // Save test testStats to database
      handleSaveStats({
        wpm: testStats.finalWPM,
        cpm: testStats.finalCPM,
        test_score: score,
        correct_chars: testStats.correct,
        misspelled_chars: testStats.mistakes,
        total_chars: testStats.correct + testStats.mistakes,
        test_accuracy: testStats.accuracy,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    Icon.load();
    RestartMenuBtns.load();

    isAuthenticated && BestStats.load();
  }, [isAuthenticated]);

  return (
    // Display these testStats ins a more presentable manner.
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

        <TestResults
          mistakes={testStats.mistakes}
          correct={testStats.correct}
        />
        <h3 className="flex py-2 text-center text-2xl sm:text-4xl">
          {testStats.wpm} WPM x {testStats.accuracy}% Accuracy ={" "}
          {testStats.finalWPM} WPM
        </h3>
        <ul className="grid grid-cols-2 items-center justify-center gap-3 sm:grid-cols-4 ">
          <li>Time: {testTime}s</li>
          <li>WPM: {testStats.finalWPM}</li>
          <li>CPM: {testStats.finalCPM}</li>
          <li>Accuracy: {testStats.accuracy}%</li>
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
