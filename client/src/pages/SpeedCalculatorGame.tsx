import { Fragment, useContext, useEffect, useState } from "react";
import GenerateRandNum from "../utils/GenerateRandNum";
import { HashLink } from "react-router-hash-link";
import loadable from "@loadable/component";
import { Link } from "react-router-dom";
import useTestStats from "../components/hooks/useTestStats";
import useTrackInputAccuracy from "../components/hooks/useTrackInputAccuracy";
import { AuthContext } from "../providers/AuthProvider";

const Icon = loadable(() => import("../utils/Icon"));
const Hearts = loadable(() => import("../components/ui/Hearts"));
const Calculator = loadable(() => import("../components/ui/Calculator"));
const GameOverMenu = loadable(
  () => import("../components/layout/GameOverMenu"),
);
const GameDifficultySettings = loadable(
  () => import("../components/ui/GameDifficultySettings"),
);

function SpeedCalculatorGame() {
  const [stats, setStats] = useState<{ [key: string]: number }>({
    mistakes: 0,
    correct: 0,
    wpm: 0,
    cpm: 0,
    finalWPM: 0,
    accuracy: 0,
  });
  const [lives, setLives] = useState(new Array(4).fill("full"));
  const [startGame, setStartGame] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [calculations, setCalculations] = useState<string[]>([]);
  const [difficultyLevel, setDifficultyLevel] = useState<string>("medium");
  const { isAuthenticated } = useContext(AuthContext);
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

  // Update char stats as user input changes
  useTestStats({
    seconds,
    setStats,
    setSeconds,
    accurateKeys,
    troubledKeys,
  });

  const generateCalculations = (currentLives: number) => {
    currentLives = currentLives <= 2 ? 2 : currentLives - 1; //When current life is 1, i % current life = 0 so adjusting for value so that it doesn't mess up the logic/calculation below
    const maxLives = 5;
    //Array of nested operators from easy to hard difficulty
    const operators = [
      [],
      ["+", "/", "+", "/"],
      ["+", "/", "*", "-", "."],
      ["+", "/", "*", "-", "."],
      ["+", "/", "*", "-", "."],
      ["+", "/", "*", "-", "."],
    ];
    const operatorsIndex = maxLives - currentLives; //Lives represent the difficulty and so does the matching index in the operators array therefore this calculation works
    const calcArr: string[] = [];

    //Adjust the string of numbers and operators being displayed depending on the difficulty "number of lives". Higher difficulty = more operators.
    for (let i = 1; i <= 13; i++) {
      const randDigit = GenerateRandNum({ max: 9 }).toString();
      if (i % currentLives === 0 && i !== 0 && i !== 13) {
        calcArr.push(
          operators[operatorsIndex][GenerateRandNum({ max: 5 })] || randDigit,
        );
      } else {
        calcArr.push(randDigit);
      }
    }

    setCalculations([...calcArr, "↵"]); //Save string of calculations & add enter to the end to complete each line
  };

  const handleDifficulty = (e: React.FormEvent<HTMLSelectElement>) => {
    setDifficultyLevel(e.currentTarget.value.toLowerCase());

    const numLives = 6 - e.currentTarget.selectedIndex;

    //Since available options range from 0 to 5, doing 6 - option index gives you the number of lives
    setLives(new Array(numLives).fill("full"));

    generateCalculations(numLives);
  };

  const handleRestart = () => {
    setLives(new Array(4).fill("full"));
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

    const incrementTimer = () => {
      setSeconds((prevState: number) => prevState + 1);
    };

    //Start/end timer
    if (!gameOver && livesRemaining > 0) {
      interval = setInterval(() => incrementTimer(), 1000);
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
    GameOverMenu.preload();
  }, []);

  const faq = [
    {
      id: "how-faq",
      title: "How to play?",
      details: (
        <span>
          The rules are simple. You are given a fixed amount of lives/hearts
          based on the difficulty you select. Each mistake costs you a life and
          once you lose all lives the game ends. If you input a row of
          characters without losing all lives, a new row will be generated
          automatically. The characters displayed and the score awarded depends
          on the{" "}
          {
            <span className="text-sky-700 underline hover:text-sky-500">
              <HashLink to="/speed-calculator#difficulty-faq">
                difficulty settings
              </HashLink>
            </span>
          }
          . The test starts as soon as you press any key on the keyboard except
          for the 'Tab' key, which is not tracked for website accessability
          reasons.
        </span>
      ),
    },
    {
      id: "how-faq-1",
      details:
        "This game is more about improving your accuracy with the number pad as opposed to how fast you can type out numbers/calculations. So, take your time and focus on getting your keys correct. Over time, as your accuracy improves, your typing speed will naturally improve as a consequence.",
    },
    {
      id: "layout-faq",
      title: "Layout and positioning?",
      details:
        "The layout of this calculator is designed based on the number pad found on the right side of a traditional keyboard, however, valid inputs are not limited to just the keys found on the number pad. If you are using the number pad, on most keyboards, you will find a little indent or 'bump' on the number 5 key which can be used to correctly position your fingers without looking at the keyboard. Place your index finger on number 4, middle finger on number 5, and ring finger on number 6. Regardless of which key you press on the number pad, it is good practice to always have at least one finger one of the aforementioned keys at all times. Use your thumb to press the zero key, and use your pinky to press enter.",
    },
    {
      id: "score",
      title: "How is score calculated?",
      details:
        "Your score will not be recorded until the game ends. Therefore, if you decide to quit mid-game, don't forget to exhaust your lives. Once you are redirected to the game over screen your points will automatically be updated and stored. More info on this soon...",
    },
    {
      id: "difficult-faq",
      title: "How do difficulty settings work?",
      details: "More info on this soon...",
    },
    {
      id: "device-faq",
      title: "Will it work on smaller screens?",
      details: (
        <span>
          {" "}
          This page has been designed to be mobile responsive and should work on
          most, if not all, screen sizes. Some features may work well on large
          screens but not on smaller screens. For example, simulated keyboard
          animations will be made available for larger screens, however, it will
          be automatically hidden on smaller screens due to the limited
          real-estate since the device keypad would obscure a portion of the
          screen when active. Other layout changes may be applied depending on
          the screen size to ensure the best user experience possible. If you
          face any issues please feel free to contact us at{" "}
          <span>
            <Link
              className="text-sky-700 underline hover:text-sky-500"
              to="mailto:admin@freetypingcamp.com"
            >
              admin@freetypingcamp.com
            </Link>{" "}
          </span>
          with details about the device you are using, any feedback you may
          have, and screenshots as needed.
        </span>
      ),
    },
  ];

  return (
    <>
      <header className="mb-[3.8em] flex pb-2 pt-8 font-nunito">
        <h1 className="flex w-full justify-center  text-2xl text-defaultblue">
          Speed Calculator
        </h1>
      </header>
      <main className="mx-auto flex max-w-[800px] flex-col items-center justify-center gap-6 font-nunito">
        {gameOver ? (
          <GameOverMenu
            handleRestart={handleRestart}
            stats={stats}
            score={score}
            testTime={seconds}
            difficulty={difficultyLevel}
            testName="calculator-game"
          />
        ) : (
          <div className="mx-auto flex max-w-[500px] flex-col gap-8 px-5 pb-2 ">
            <div className="relative mx-auto flex w-full max-w-[45em] flex-col rounded-2xl border-[3px] p-10 tracking-wide text-slate-400 ">
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
          </div>
        )}
        {!gameOver && (
          <GameDifficultySettings
            handleDifficulty={handleDifficulty}
            startGame={startGame}
            anchorURL={"/speed-calculator#difficulty-faq"}
          />
        )}
        <div className="mt-2 flex w-full items-center justify-center gap-10">
          <Link
            to="/games"
            className="min-w-12 flex min-w-[8em] items-center justify-center rounded-lg bg-sky-700 px-4 py-2 text-white hover:scale-105"
          >
            Games Menu
          </Link>
          <button
            className="flex min-w-[8em] items-center  justify-center rounded-lg bg-sky-700 px-4 py-2 text-white hover:scale-105"
            onClick={handleRestart}
          >
            {gameOver ? "Play Again" : "Restart"}
          </button>
        </div>
        {isAuthenticated && (
          <>
            <div className="mb-3 mt-9 flex w-full flex-col items-center justify-center gap-7 px-4 font-nunito tracking-wider ">
              <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
                My Best Stats
              </h2>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sky-700 sm:grid-cols-4">
                <li>Accuracy:</li>
                <li>Score:</li>
                <li>WPM:</li>
                <li>CPM:</li>
              </ul>
              <p className="text-xs">Date accomplished: 01/01/2024</p>
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
        )}
        <div
          className={`flex flex-col gap-4 px-4 font-nunito leading-loose tracking-wider ${
            !isAuthenticated && "mt-10"
          }`}
        >
          <h2 className="text-center font-lora text-2xl capitalize tracking-widest text-defaultblue">
            About this game
          </h2>
          {faq.map((data) => (
            <Fragment key={data.id}>
              {data.title && (
                <h3 id={data.id} className="text-lg">
                  {data.title}
                </h3>
              )}
              {data.details && <p className="pl-7">{data.details}</p>}
            </Fragment>
          ))}
        </div>
      </main>
    </>
  );
}

export default SpeedCalculatorGame;
