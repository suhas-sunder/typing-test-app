import { v4 as uuidv4 } from "uuid";
import styles from "../../components/layout/styles/TextBox.module.css";
import { useState } from "react";
import useHighlightKeys from "../hooks/useHighlightKeys";

export default function Calculator({
  inputValidity,
  cursorPosition,
  calculations,
  validInputKeys,
  gameOver,
}) {
  const calculatorKeys = [
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
  const [keyStyles, setKeyStyles] = useState<{ [key: string]: string }>({
    placeholder: "bg-white",
    "/": "bg-white",
    "*": "bg-white",
    "-": "bg-white",
    "7": "bg-white",
    "8": "bg-white",
    "9": "bg-white",
    "+": "bg-white",
    "4": "bg-white",
    "5": "bg-white",
    "6": "bg-white",
    "1": "bg-white",
    "2": "bg-white",
    "3": "bg-white",
    "↵": "bg-white",
    "0": "bg-white",
    ".": "bg-white",
  });

  useHighlightKeys({
    validInputKeys,
    gameOver,
    cursorPosition,
    displayedText: calculations,
    setKeyStyles,
  });

  //Apply styling to button based on input keys
  const handleBtnStyle = (key: string) => {
    let style = "";

    if (key === " ") {
      style = "col-span-1 h-full sm:px-5";
    } else if (key === "+" || key === "↵") {
      style =
        "row-span-2 flex mx-auto justify-center items-center sm:px-5 py-8";
    } else if (key === "0") {
      style = "col-span-2 sm:px-12 py-3";
    } else {
      style = "col-span-1 mx-auto sm:px-5 py-3";
    }

    return style;
  };

  return (
    <>
      <div className="flex h-24 w-full items-center justify-end gap-[2.5px] rounded-lg border-[3px] px-3 font-mono text-2xl leading-10 tracking-tight sm:min-w-[12.45em] sm:text-3xl">
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
        className={`mx-auto mt-8 grid max-w-[15em] select-none grid-cols-4 gap-x-2 gap-y-6 rounded-xl border-2 bg-sky-700 p-4 text-sky-700 sm:max-w-none sm:gap-x-8 sm:px-8 sm:py-8`}
      >
        {calculatorKeys.map((key) => {
          return (
            <div
              id={`calculator-${key}`}
              key={uuidv4()}
              className={`${keyStyles[key]} ${handleBtnStyle(key)} ${
                key === "placeholder" && "text-transparent"
              } ${
                key === "↵" ? "text-lg sm:text-2xl" : "text-xs sm:text-base"
              } w-full rounded-lg  border-2 text-center`}
            >
              {key}
            </div>
          );
        })}
      </div>
    </>
  );
}
