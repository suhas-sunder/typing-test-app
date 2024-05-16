import styles from "../components/layout/styles/TextBox.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { EmojiEventsOutlined } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useHighlightKeys from "../components/hooks/useHighlightKeys";
import GenerateRandNum from "../utils/GenerateRandNum";

function SpeedCalculatorGame() {
  const [lives, setLives] = useState(new Array(6).fill(<FavoriteIcon />));
  const [startGame, setStartGame] = useState<boolean>(false);
  const [calculations, setCalculations] = useState<string[]>([]);

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

    setCalculations([...calcArr, "↵"]);
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

  useHighlightKeys({ startGame, setStartGame, validInputKeys: calculatorKeys }); //Custom hook to highlight calculator keys

  //max char length is 12.
  //Generate between 4 to 12 chars based on levels (lvl 1 is 4, lvl 2 is 5, lvl 3 is 7 lvl 4 is 9 lvl 5 is )
  //Once each row is finished, reset row and add points to score
  //Does not have a timer because this game rewards the user for accuracy, so the user can take as long as they need
  {
    /* Calc keys displayed which reflects keys to be pressed (fill highlight)
          and keys being pressed (outline highlight or animation) Easy (numbers)
          medium (decimals) hard (addition & enter key) very hard (/*-)
          exteremely hard ( 3 lives) Impossibly Hard (1 life) 6 lives Timer
          counts up to calculate best score */
  }

  const handleDifficulty = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(<HeartBrokenIcon />); //Just a reminder to apply broken hearts when lives are lost
    const numLives = 6 - e.currentTarget.selectedIndex;

    //Since available options range from 0 to 5, doing 6 - option index gives you the number of lives
    setLives(new Array(numLives).fill(<FavoriteIcon />));

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
    generateCalculations(lives.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
        <div className="absolute -top-11 left-3 flex items-center justify-center gap-1 text-base">
          <EmojiEventsOutlined />
          <span>Score:</span> <span className="flex translate-y-[1px]">0</span>
        </div>
        <div className="absolute -top-12 right-8 flex w-full max-w-[9.1em] scale-125 justify-end text-red-600">
          {lives.map((heart) => (
            <i key={uuidv4()}>{heart}</i>
          ))}
        </div>
        {!startGame && (
          <div className="absolute -left-4 top-7 flex w-36 items-center justify-center rounded-xl bg-sky-700 py-[0.5em] font-nunito tracking-wider text-white">
            Start Typing!
          </div>
        )}
        <div className="flex h-24 w-full max-w-[40em] items-center justify-end gap-2 rounded-lg border-[3px] px-6 font-mono text-2xl leading-10 tracking-tight sm:text-3xl">
          {calculations.map((char, index) => {
            if (index === 0) {
              return (
                <span
                  key={uuidv4()}
                  className={`${styles.cursor} flex w-5 items-center justify-center border-b-2 border-current text-sky-700`}
                >
                  {char}
                </span>
              );
            } else {
              return (
                <span
                  key={uuidv4()}
                  className="border-b-grey-100 flex w-5 items-center justify-center border-b-2 text-black"
                >
                  {char}
                </span>
              );
            }
          })}
        </div>
        <div className="mt-8 grid w-full grid-cols-4 gap-8 gap-y-6 rounded-xl border-2 bg-sky-700 px-5 py-8 font-nunito text-sky-700 sm:px-8">
          {calculatorKeys.map((key) => {
            return (
              <div
                id={`calculator-${key}`}
                key={uuidv4()}
                className={`${handleBtnStyle(
                  key,
                )} rounded-lg border-2 bg-white text-center`}
              >
                {key}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default SpeedCalculatorGame;
