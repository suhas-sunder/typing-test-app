import { Fragment, useEffect, useState } from "react";
import GenerateRandNum from "../utils/generators/GenerateRandNum";
import { HashLink } from "react-router-hash-link";
import loadable from "@loadable/component";
import { Link, useNavigate } from "react-router-dom";
import useTestStats from "../components/hooks/useTestStats";
import useTrackInputAccuracy from "../components/hooks/useTrackInputAccuracy";
import useUpdateLives from "../components/hooks/useUpdateLives";
import RestartMenuBtns from "../components/ui/shared/RestartMenuBtns";
import TriggerMobileKeyboard from "../components/ui/shared/TriggerMobileKeyboard";

const Icon = loadable(() => import("../utils/other/Icon"));
const Hearts = loadable(() => import("../components/ui/gamespg/Hearts"));
const Calculator = loadable(() => import("../components/ui/gamespg/Calculator"));
const GameOverMenu = loadable(
  () => import("../components/layout/shared/GameOverMenu"),
);
const GameDifficultySettings = loadable(
  () => import("../components/ui/gamespg/GameDifficultySettings"),
);

export default function CalculatorGame() {
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
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [calculations, setCalculations] = useState<string[]>([]);
  const [difficultyLevel, setDifficultyLevel] = useState<string>("medium");

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
          reasons. Also, keep in mind that unlike the typing speed test found on
          the home page, the 'backspace' key will not delete mistakes and will
          instead count as an invalid input.
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
          most, if not all, screen sizes. However, some functionality might be
          unfinished at this stage, or may not function due to something
          unaccounted for with your particular device. For example the "123/#+="
          key on mobile keypads will register as an invalid input when it
          shouldn't. Working on fixing such issues. Until this issue is fixed,
          you can play this game on very easy difficulty on smaller devices so
          that only numbers are displayed and you don't have to toggle between
          numbers and operators. Additionally, some features may work well on
          large screens but not on smaller screens. For example, simulated
          keyboard animations will be hidden on smaller screens due to the
          limited real-estate since the device keypad would obscure a portion of
          the screen when active. We try our best to account for various screen
          sizes and devices in order to ensure the best user experience
          possible. If you face any issues please feel free to contact us at{" "}
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
  const navigate = useNavigate();

  //Creates a string of numbers, operations, and 'enter key' symbol to be displayed on calculator
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
    showGameOverMenu,
    startGame,
    validInputKeys,
  });

  // Update test stats as user input changes, wpm, cpm, accuracy, etc.
  useTestStats({
    seconds,
    setStats,
    setSeconds,
    accurateKeys,
    troubledKeys,
  });

  const handleRestart = () => {
    setLives(new Array(lives.length).fill("full"));
    setSeconds(0);
    setStartGame(false);
    setShowGameOverMenu(false);
    setCursorPosition(0);
    setAccurateKeys({ ...defaultCharsObj });
    setTroubledKeys({ ...defaultCharsObj });
    setInputValidity([]);
    setScore(0);
  };

  //Update lives/hearts
  useUpdateLives({ lives, setSeconds, showGameOverMenu, setShowGameOverMenu });

  //Reset display values based on cursor position
  useEffect(() => {
    if (cursorPosition === 0) generateCalculations(lives.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  //Preload/load all components on component mount
  useEffect(() => {
    Icon.load();
    Hearts.load();
    Calculator.load();
    GameDifficultySettings.load();
    GameOverMenu.preload();
  }, []);

  return (
    <>
      <header className="mb-[3.8em] flex pt-8 font-nunito">
        <h1 className="flex w-full justify-center text-3xl text-defaultblue">
          Calculator Game
        </h1>
      </header>
      <main className="mx-auto flex max-w-[800px] flex-col items-center justify-center gap-6 font-nunito">
        {showGameOverMenu ? (
          <GameOverMenu
            handleRestart={handleRestart}
            stats={stats}
            score={score}
            testTime={seconds}
            difficulty={difficultyLevel}
            testName="calculator-game"
            showMainMenu={() => navigate("/games")}
          />
        ) : (
          <div className="mx-auto mt-10 flex max-w-[500px] flex-col gap-8 pb-2 sm:mt-0 sm:px-5">
            <div className="relative mx-auto mt-4 flex w-full max-w-[45em] flex-col rounded-2xl border-[3px] p-5 tracking-wide text-slate-400 sm:min-h-[39.5em] sm:min-w-[28.5em] sm:p-10">
              <div className="absolute -top-[5.5em] left-3 flex items-center justify-center gap-1 text-base sm:-top-12">
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
                <div className="absolute -left-4 top-3 flex w-32 items-center justify-center rounded-xl bg-sky-700 py-[0.5em] tracking-wider text-white sm:-left-4 sm:top-7 sm:w-36">
                  Start Typing!
                </div>
              )}
              <TriggerMobileKeyboard showGameOverMenu={showGameOverMenu}>
                <Calculator
                  inputValidity={inputValidity}
                  cursorPosition={cursorPosition}
                  calculations={calculations}
                  validInputKeys={validInputKeys}
                  showGameOverMenu={showGameOverMenu}
                />
              </TriggerMobileKeyboard>
            </div>
          </div>
        )}

        {!showGameOverMenu && (
          <GameDifficultySettings
            handleDifficulty={handleDifficulty}
            startGame={startGame}
            anchorURL={"/speed-calculator#difficulty-faq"}
            difficultyLevel={difficultyLevel}
          />
        )}
        {!showGameOverMenu && (
          <RestartMenuBtns
            handleRestart={handleRestart}
            showMainMenu={() => navigate("/games")}
            gameOver={showGameOverMenu}
          />
        )}
        <div
          className={`my-10 flex flex-col gap-4 px-4 font-nunito leading-loose tracking-wider`}
        >
          <h2 className="text-center text-3xl capitalize tracking-widest text-defaultblue">
            About this game
          </h2>
          {faq.map((data) => (
            <Fragment key={data.id}>
              {data.title && (
                <h3 id={data.id} className="font-lora text-2xl">
                  {data.title}
                </h3>
              )}
              {data.details && (
                <p className="pl-7 font-lato text-xl leading-loose ">
                  {data.details}
                </p>
              )}
            </Fragment>
          ))}
        </div>
      </main>
    </>
  );
}
