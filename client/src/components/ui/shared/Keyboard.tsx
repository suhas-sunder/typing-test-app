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
      style = "  px-[8em] lg:px-[10em]";
    } else if (key === "Enter") {
      style = "  px-6 lg:px-8";
    } else if (key === "Caps" || key === "Option" || key === "Menu") {
      style = "  px-4 lg:px-5";
    } else if (key === "Shift") {
      style = "  px-5 lg:px-6";
    } else {
      style = " px-[1.25em] lg:px-5";
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
                } relative flex w-full items-center justify-center`}
              >
                {key.shiftKey !== "" && (
                  <span
                    className={`absolute left-1/2 top-[12px] flex -translate-x-1/2 -translate-y-1/2 `}
                  >
                    {key.shiftKey}
                  </span>
                )}
                <span
                  className={` ${
                    key.defaultKey !== "Shift"
                      ? handleKeyStyling(key)
                      : "bg-white"
                  } ${handleBtnStyle(key.defaultKey)}  mx-auto rounded-lg`}
                >
                  <span
                    className={`${
                      key.shiftKey !== "" && "translate-y-[8.5px]"
                    } flex items-center justify-center py-3`}
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
