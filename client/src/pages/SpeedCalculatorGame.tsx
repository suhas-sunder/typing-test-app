import styles from "../components/layout/styles/TextBox.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { EmojiEventsOutlined } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useHighlightKeys from "../components/hooks/useHighlightKeys";
import useTrackInputAccuracy from "../components/hooks/useTrackInputAccuracy";
import GenerateRandNum from "../utils/GenerateRandNum";
import GameOverGamesMenu from "../components/layout/GameOverGamesMenu";

function SpeedCalculatorGame() {
  const [lives, setLives] = useState(new Array(6).fill("full"));
  const [startGame, setStartGame] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [calculations, setCalculations] = useState<string[]>([]);
  const [inputValidity, setInputValidity] = useState<string[]>([]); //Tracks every user input as valid or invalid
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
  const [accurateKeys, setAccurateKeys] = useState<{ [key: string]: number }>(
    defaultCharsObj,
  );
  const [troubledKeys, setTroubledKeys] = useState<{ [key: string]: number }>(
    defaultCharsObj,
  );

  const generateCalculations = (currentLives: number) => {
    //Array of nested operators from easy to hard difficulty
    const operators = [
      [],
      ["+", "+"],
      ["+", "+", "/"],
      ["+", "+", "/", "*"],
      ["+", "/", "*", "-"],
    ];
    const calcArr: string[] = [];

    //Adjust the string of numbers and operators being displayed depending on the difficulty "number of lives". Higher difficulty = more operators.
    for (let i = 1; i <= 13; i++) {
      const randDigit = GenerateRandNum({ max: 9 }).toString();
      if (i % currentLives === 0 && i !== 0 && i !== 13) {
        calcArr.push(
          operators[6 - currentLives][GenerateRandNum({ max: 3 })] || randDigit,
        );
      } else {
        calcArr.push(randDigit);
      }
    }

    setCalculations([...calcArr, "↵"]); //Save string of calculations & add enter to the end to complete each line
  };

  const calculatorKeys = [
    " ",
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
  useHighlightKeys({
    startGame,
    validInputKeys: calculatorKeys,
    setStartGame,
    gameOver,
  });

  useTrackInputAccuracy({
    startGame,
    validInputKeys: calculatorKeys,
    displayedText: calculations,
    cursorPosition,
    totalLives: lives.length,
    setInputValidity,
    setAccurateKeys,
    setTroubledKeys,
    setCursorPosition,
    setStartGame,
    setLives,
    setScore,
  });

  const handleDifficulty = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(<HeartBrokenIcon />, accurateKeys, troubledKeys, inputValidity); //Just a reminder to apply broken hearts when lives are lost
    const numLives = 6 - e.currentTarget.selectedIndex;

    //Since available options range from 0 to 5, doing 6 - option index gives you the number of lives
    setLives(new Array(numLives).fill("full"));

    generateCalculations(numLives > 1 ? numLives : 2);
  };

  //Apply styling to button based on input keys
  const handleBtnStyle = (key: string) => {
    let style = "";

    if (key === " ") {
      style = "col-span-1 h-full w-full px-5";
    } else if (key === "+" || key === "↵") {
      style = "row-span-2 flex mx-auto justify-center items-center px-5 py-8";
    } else if (key === "0") {
      style = "col-span-2 px-12 py-3";
    } else {
      style = "col-span-1 mx-auto px-5 py-3 w-full";
    }

    return style;
  };

  useEffect(() => {
    if (cursorPosition === 0) generateCalculations(lives.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  //End game if lives are over
  useEffect(() => {
    const livesRemaining = lives.filter((life) => life === "full").length;

    if (livesRemaining <= 0 && !gameOver) {
      setStartGame((prevState) => !prevState); //Reset start game because this controls the timer/interval in useEffect
      setGameOver((prevState) => !prevState); //Ends the game
    }
  }, [gameOver, lives]);

  //Start/end timer
  useEffect(() => {
    let interval;

    const incremintTimer = () => {
      setSeconds((prevState: number) => prevState + 1);
    };

    if (startGame) {
      interval = setInterval(() => incremintTimer(), 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startGame]);

  return (
    <>
      {gameOver ? (
        <GameOverGamesMenu
          accurateKeys={accurateKeys}
          troubledKeys={troubledKeys}
          seconds={seconds}
          score={score}
        />
      ) : (
        <div className="mx-auto flex max-w-[500px] flex-col gap-32 px-5 py-8 font-nunito">
          <header>
            <h1 className="flex w-full justify-center  text-2xl text-defaultblue">
              Speed Calculator
            </h1>
          </header>
          <main className="relative mx-auto flex w-full max-w-[45em] flex-col rounded-2xl border-[3px] p-10 tracking-wide text-slate-400">
            <div className="absolute -top-[6.5em] left-4 flex items-center justify-center gap-2 font-nunito">
              <label className="text-lg">Difficulty:</label>
              <select
                name="calculator_difficulty"
                onChange={(e) => handleDifficulty(e)}
                className="rounded-lg border-2 px-2 py-0.5 text-sky-700"
                disabled={startGame}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="very hard">Very Hard</option>
                <option value="extremely hard">Extremely Hard</option>
                <option value="impossibly hard">Impossibly Hard</option>
              </select>
              <button
                title="Save As Default"
                className="flex scale-75 text-slate-500 hover:text-sky-500"
              >
                <SaveIcon />
              </button>
            </div>
            <div className="absolute -top-12 left-3 flex items-center justify-center gap-1 text-base">
              <i className="text-yellow-500">
                <EmojiEventsOutlined />
              </i>
              <span>Score:</span>{" "}
              <span className="flex translate-y-[1px]">
                {score.toLocaleString()}
              </span>
            </div>
            <div className="absolute -top-12 right-8 flex w-full max-w-[9.1em] scale-125 justify-end">
              {lives.map((heart) => (
                <i
                  key={uuidv4()}
                  className={`${
                    heart === "full" ? "text-red-400" : "text-slate-600"
                  }`}
                >
                  {heart === "full" ? <FavoriteIcon /> : <HeartBrokenIcon />}
                </i>
              ))}
            </div>
            {!startGame && (
              <div className="absolute -left-4 top-7 flex w-36 items-center justify-center rounded-xl bg-sky-700 py-[0.5em] font-nunito tracking-wider text-white">
                Start Typing!
              </div>
            )}
            <div className="flex h-24 w-full max-w-[40em] items-center justify-end gap-[2.5px] rounded-lg border-[3px] px-3 font-mono text-2xl leading-10 tracking-tight sm:text-3xl">
              {calculations.map((char, index) => {
                if (index === cursorPosition) {
                  return (
                    <span
                      key={uuidv4()}
                      className={`${styles.cursor} flex w-full items-center justify-center border-b-2 border-current py-2 text-sky-700 `}
                    >
                      {char}
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={uuidv4()}
                      className={`${
                        inputValidity[index] === "invalid"
                          ? "rounded-md bg-red-400 text-white"
                          : "text-black"
                      }  ${
                        inputValidity[index] === "valid"
                          ? "rounded-md bg-sky-400 text-white"
                          : "text-black"
                      } border-b-grey-100 flex w-full items-center justify-center border-b-2 py-2`}
                    >
                      {char}
                    </span>
                  );
                }
              })}
            </div>
            <div
              className={`mt-8 grid w-full grid-cols-4 gap-8 gap-y-6 rounded-xl border-2 bg-sky-700 px-5 py-8 font-nunito text-sky-700 sm:px-8`}
            >
              {calculatorKeys.map((key) => {
                return (
                  <div
                    id={`calculator-${key}`}
                    key={uuidv4()}
                    className={`${handleBtnStyle(key)} ${
                      key === "↵" && "text-2xl"
                    } rounded-lg border-2 bg-white text-center`}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default SpeedCalculatorGame;
