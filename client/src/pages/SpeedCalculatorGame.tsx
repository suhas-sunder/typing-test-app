import { useEffect, useState } from "react";
// import useHighlightKeys from "../components/hooks/useHighlightKeys";
import useTrackInputAccuracy from "../components/hooks/useTrackInputAccuracy";
import GenerateRandNum from "../utils/GenerateRandNum";
import loadable from "@loadable/component";
import { Link } from "react-router-dom";

const Icon = loadable(() => import("../utils/Icon"));
const Hearts = loadable(() => import("../components/ui/Hearts"));
const Calculator = loadable(() => import("../components/ui/Calculator"));
const GameOverGamesMenu = loadable(
  () => import("../components/layout/GameOverGamesMenu"),
);
const GameDifficultySettings = loadable(
  () => import("../components/ui/GameDifficultySettings"),
);

function SpeedCalculatorGame() {
  const [lives, setLives] = useState(new Array(6).fill("full"));
  const [startGame, setStartGame] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [calculations, setCalculations] = useState<string[]>([]);
  //List of all possible character inputs to track
  const defaultCharsObj = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "~": 0,
    "!": 0,
    "@": 0,
    "#": 0,
    $: 0,
    "%": 0,
    "^": 0,
    "&": 0,
    "*": 0,
    "(": 0,
    ")": 0,
    _: 0,
    "-": 0,
    "+": 0,
    "=": 0,
    "/": 0,
    "?": 0,
    ".": 0,
    ",": 0,
    " ": 0,
    "{": 0,
    "}": 0,
    "|": 0,
    ">": 0,
    "<": 0,
    "↵": 0,
  };
  //List of all acceptable input keys for this game
  const validInputKeys = [
    "placeholder",
    "/",
    "*",
    "-",
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "↵",
    "0",
    ".",
  ];

  const generateCalculations = (currentLives: number) => {
    currentLives = currentLives + 1; //When current life is 1, i % current life = 0 always so to keep currentLive > 1 always, I add 1 and adjust for it in calculations below
    const maxLives = 7; //Adjusted for currentLives + 1 so 6 becomes 7
    //Array of nested operators from easy to hard difficulty
    const operators = [
      [],
      ["+", "+"],
      ["+", "+", "/"],
      ["+", "+", "/", "*"],
      ["+", "/", "*", "-"],
      ["+", "/", "*", "-"],
    ];
    const operatorsIndex = maxLives - currentLives; //Lives represent the difficulty and so does the matching index in the operators array therefore this calculation works
    const calcArr: string[] = [];

    //Adjust the string of numbers and operators being displayed depending on the difficulty "number of lives". Higher difficulty = more operators.
    for (let i = 1; i <= 13; i++) {
      const randDigit = GenerateRandNum({ max: 9 }).toString();
      if (i % currentLives === 0 && i !== 0 && i !== 13) {
        calcArr.push(
          operators[operatorsIndex][GenerateRandNum({ max: 3 })] || randDigit,
        );
      } else {
        calcArr.push(randDigit);
      }
    }

    setCalculations([...calcArr, "↵"]); //Save string of calculations & add enter to the end to complete each line
  };

  const {
    accurateKeys,
    troubledKeys,
    inputValidity,
    setInputValidity,
    setAccurateKeys,
    setTroubledKeys,
  } = useTrackInputAccuracy({
    displayedText: calculations,
    cursorPosition,
    totalLives: lives.length,
    setCursorPosition,
    setStartGame,
    defaultCharsObj,
    setLives,
    setScore,
    gameOver,
    startGame,
    validInputKeys,
  });

  const handleDifficulty = (e: React.FormEvent<HTMLSelectElement>) => {
    const numLives = 6 - e.currentTarget.selectedIndex;

    //Since available options range from 0 to 5, doing 6 - option index gives you the number of lives
    setLives(new Array(numLives).fill("full"));

    generateCalculations(numLives);
  };

  const handleRestart = () => {
    setLives(new Array(6).fill("full"));
    setSeconds(0);
    setStartGame(false);
    setGameOver(false);
    setCursorPosition(0);
    setAccurateKeys({ ...defaultCharsObj });
    setTroubledKeys({ ...defaultCharsObj });
    setInputValidity([]);
    setScore(0);
  };

  useEffect(() => {
    if (cursorPosition === 0) generateCalculations(lives.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  useEffect(() => {
    const livesRemaining = lives.filter((life) => life === "full").length;
    let interval;

    const incremintTimer = () => {
      setSeconds((prevState: number) => prevState + 1);
    };

    //Start/end timer
    if (!gameOver && livesRemaining > 0) {
      interval = setInterval(() => incremintTimer(), 1000);
    }

    //End game if lives are over
    if (livesRemaining <= 0 && !gameOver) {
      setGameOver((prevState) => !prevState); //Ends the game
    }

    return () => {
      clearInterval(interval);
    };
  }, [gameOver, lives]);

  //Preload/load all components on component mount
  useEffect(() => {
    Icon.load();
    Hearts.load();
    Calculator.load();
    GameDifficultySettings.load();
    GameOverGamesMenu.preload();
  }, []);

  return (
    <>
      <header className="mb-[3.8em] flex py-8 font-nunito">
        <h1 className="flex w-full justify-center  text-2xl text-defaultblue">
          Speed Calculator
        </h1>
      </header>
      <main className="mx-auto flex max-w-[800px] flex-col items-center justify-center gap-6 font-nunito">
        {gameOver ? (
          <GameOverGamesMenu
            accurateKeys={accurateKeys}
            troubledKeys={troubledKeys}
            seconds={seconds}
            score={score}
            handleRestart={handleRestart}
          />
        ) : (
          <div className="mx-auto flex max-w-[500px] flex-col gap-10 px-5 py-8">
            <div className="relative mx-auto flex w-full max-w-[45em] flex-col rounded-2xl border-[3px] p-10 tracking-wide text-slate-400">
              <GameDifficultySettings
                handleDifficulty={handleDifficulty}
                startGame={startGame}
              />
              <div className="absolute -top-12 left-3 flex items-center justify-center gap-1 text-base">
                <Icon
                  title="trophy-icon"
                  customStyle="text-yellow-500"
                  icon="trophy"
                />
                <span>Score:</span>{" "}
                <span className="flex translate-y-[1px]">
                  {score.toLocaleString()}
                </span>
              </div>
              <Hearts lives={lives} />
              {!startGame && (
                <div className="absolute -left-4 top-7 flex w-36 items-center justify-center rounded-xl bg-sky-700 py-[0.5em] tracking-wider text-white">
                  Start Typing!
                </div>
              )}
              <Calculator
                inputValidity={inputValidity}
                cursorPosition={cursorPosition}
                calculations={calculations}
                startGame={startGame}
                validInputKeys={validInputKeys}
              />
            </div>
            <div className="flex w-full items-center justify-center gap-10">
              <Link
                to="/games"
                className="min-w-12 flex min-w-[8em] items-center justify-center rounded-lg border-2 bg-sky-700 px-4 py-2 text-white hover:scale-105"
              >
                Games Menu
              </Link>
              <button
                className="flex min-w-[8em] items-center  justify-center rounded-lg border-2 bg-sky-700 px-4 py-2 text-white hover:scale-105"
                onClick={handleRestart}
              >
                Restart
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center px-4 font-lora tracking-wider">
          <h2 className="text-xl tracking-widest text-defaultblue">
            Achievements
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center px-4 font-lora tracking-wider">
          <h2 className="text-xl tracking-widest text-defaultblue">
            My Best Stats
          </h2>
          <ul className="flex">
            <li>Score:</li>
            <li>% Accuracy:</li>
            <li>WPM:</li>
            <li>CPM:</li>
          </ul>
        </div>
        <div className="flex flex-col px-4 font-lora tracking-wider">
          <h2 className="text-xl tracking-widest text-defaultblue">
            About the speed calculator
          </h2>
          <p>
            This calculator is designed based on the number pad on the right
            side of a traditional keyboard. This game is more about accuracy
            than wpm/cpm so take your time and focus on getting your keys
            correct.
          </p>
          <h2>How to play</h2>
          <p></p>
          <h2>How difficulty settings work</h2>
          <p></p>
          <h2>How score is calculated</h2>
          <p></p>
        </div>
      </main>
    </>
  );
}

export default SpeedCalculatorGame;
