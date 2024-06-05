import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import useHighlightKeys from "../../hooks/useHighlightKeys";

export default function Calculator({
  cursorPosition,
  calculations,
  validInputKeys,
  showGameOverMenu,
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
    showGameOverMenu,
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
    <div
      className={`hidden sm:grid mx-auto mt-8 max-w-[15em] select-none grid-cols-4 gap-x-2 gap-y-6 rounded-xl border-2 bg-sky-700 p-4 text-sky-700 sm:max-w-none sm:gap-x-8 sm:px-8 sm:py-8`}
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
  );
}
