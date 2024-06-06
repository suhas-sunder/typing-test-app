import { useMemo, useState } from "react";
import useHighlightKeys from "../../hooks/useHighlightKeys";
import KeyboardData from "../../../data/KeyboardData";
import GenerateDefaultStylingForKeys from "../../../utils/generators/GenerateDefaultStylingForKeys";
import { v4 as uuidv4 } from "uuid";

//Theres a lot of object/array manipulation for the initial setup so to improve readability it is going into it's own function
function DefaultKeyboardSetup() {
  //Used to track validity of inputs
  const validKeys: string[] = useMemo(() => [], []);

  const keyboardData = useMemo(() => KeyboardData(), []); //Saved presets for keyboard layout

  //Generate list of valid keys from saved data
  Object.values(keyboardData).forEach((row) =>
    row.map((data) => {
      validKeys.push(data.defaultKey);
      validKeys.push(data.shiftKey);
    }),
  );

  //Updating all valid keys with uppercase letters too
  const allValidKeys = useMemo(
    () => [
      ...new Set([...validKeys, ...validKeys.join("").toUpperCase().split("")]),
    ],
    [validKeys],
  );

  //Used to mange styling for each key
  const allKeyStyles = useMemo(
    () =>
      GenerateDefaultStylingForKeys({
        keyArr: allValidKeys,
        styling: "bg-white",
      }),
    [allValidKeys],
  );

  return {
    keyboardData,
    allKeyStyles,
  };
}

export default function Keyboard({
  cursorPosition,
  displayedText,
  showGameOverMenu,
}) {
  const { allKeyStyles, keyboardData } = DefaultKeyboardSetup();

  const [keyStyles, setKeyStyles] = useState<{ [key: string]: string }>(
    allKeyStyles,
  );

  useHighlightKeys({
    showGameOverMenu,
    cursorPosition,
    displayedText,
    setKeyStyles,
  });

  const handleKeyStyling = (key) => {
    return keyStyles[`${key.shiftKey}`] !== "bg-white"
      ? keyStyles[`${key.shiftKey}`]
      : keyStyles[`${key.defaultKey}`];
  };

  //Apply styling to button based on input keys
  const handleBtnStyle = (key: string) => {
    let style = "";

    if (key === " ") {
      style = " mx-auto px-[8em] lg:px-[10em] py-3";
    } else if (key === "+" || key === "↵") {
      style =
        " flex mx-auto justify-center items-center px-[1.2em] px-2 lg:px-5 py-8";
    } else {
      style = " mx-auto px-[1.2em] lg:px-5 py-3";
    }

    return style;
  };

  return (
    <div
      className={`mx-auto mt-8 hidden min-h-[26em] select-none flex-col gap-y-8 rounded-xl border-2 bg-sky-700 p-6 text-xs text-sky-700 md:flex lg:text-base `}
    >
      {Object.values(keyboardData).map((keysArr) => {
        return (
          <div key={uuidv4()} className="flex gap-3">
            {keysArr.map((key) => (
              <div
                key={key.id}
                className={`${
                  keyStyles[`${key.defaultKey} `]
                } relative flex w-full`}
              >
                {key.shiftKey !== "" && (
                  <span
                    className={`absolute left-1/2 top-[12px] flex -translate-x-1/2 -translate-y-1/2`}
                  >
                    {key.shiftKey}
                  </span>
                )}
                <span
                  className={` ${
                    key.defaultKey !== "Shift"
                      ? handleKeyStyling(key)
                      : "bg-white"
                  } ${handleBtnStyle(key.defaultKey)}  rounded-lg `}
                >
                  <span
                    className={`flex ${
                      key.shiftKey !== "" && "translate-y-[8.5px]"
                    }`}
                  >
                    {key.defaultKey === " " ? "Spacebar" : key.defaultKey}
                  </span>
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
