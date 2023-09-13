import { useEffect, useState } from "react";
import styles from "./TextBox.module.css";

interface propTypes {
  charStatus: string[];
  setCharStatus: (index: number, text: string) => void;
  updateStartTimer: (value: boolean) => void;
  dummyText: string;
  cursorPosition: number;
  setCursorPosition: (value: number) => void;
}

function TextBox({
  charStatus,
  setCharStatus,
  updateStartTimer,
  dummyText,
  cursorPosition,
  setCursorPosition,
}: propTypes) {
  const [firstInputDetected, setFirstInputDetected] = useState(false); //Used to track if test started

  // Handle user keyboard input
  useEffect(() => {
    const handleUserKeyPress = (e: KeyboardEvent) => {
      const pattern = /^[ A-Za-z0-9_@./#&+-,`"()*^%$!~=]$/; //Check for spacebar, letters, numbers, and special characters
      e.preventDefault(); //Prevents default key actions like tabbing etc. which we don't want active during typing test

      if (
        (pattern.test(e.key) || e.key === "Tab" || e.key === "Enter") &&
        !firstInputDetected
      ) {
        console.log("runs");
        updateStartTimer(true); //Start timer in TypingStats component.
        setFirstInputDetected(true); //Prevents timer from resetting on further user inputs.
      }

      if (e.key === "Backspace") {
        if (cursorPosition - 1 >= 0) setCursorPosition(cursorPosition - 1); // Move cursor one space back
        setCharStatus(cursorPosition, ""); //Update state as default input
      } else if (pattern.test(e.key) && dummyText[cursorPosition] === e.key) {
        setCursorPosition(cursorPosition + 1); // Move cursor up one char space
        setCharStatus(cursorPosition, "correct"); //Update state as correct input
      } else if (pattern.test(e.key) || e.key === "Tab" || e.key === "Enter") {
        setCursorPosition(cursorPosition + 1); // Move cursor up one char space
        setCharStatus(cursorPosition, "error"); //Update state as wrong input
      }
    };

    window.addEventListener("keydown", handleUserKeyPress);

    // cleanup function
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [charStatus, dummyText, setCharStatus, updateStartTimer]);

  const handleCharStyling = (charStatus: string) => {
    const errorCharStyling = "text-red-700 bg-red-600/10 pl-1 pr-1 rounded-lg";
    const correctCharStyling =
      "text-green-700 bg-lime-600/10 pl-1 pr-1 rounded-lg";
    const cursorCharStyling =
      "text-blue-700 p-1 mr-0.5 mb-2 border-b-2 border-blue-700";

    if (charStatus === "cursor") {
      return cursorCharStyling;
    } else if (charStatus === "error") {
      return errorCharStyling;
    } else if (charStatus === "correct") {
      return correctCharStyling;
    } else {
      return;
    }
  };

  return (
    <div
      className={`${styles["text-box"]} flex w-11/12 overflow-hidden p-5 shadow-inner rounded-lg`}
    >
      <p className={`block bg-white`}>
        {dummyText.split("").map((word: string, index: number) => {
          if (index >= 0 && index <= 450) {
            return word === " " ? (
              <span
                key={index}
                className={`${styles.char} inline-block p-1 pb-3 mr-0.5 ${
                  index === cursorPosition
                    ? handleCharStyling("cursor")
                    : handleCharStyling(charStatus[index])
                }`}
              >
                &nbsp;
              </span>
            ) : (
              <span
                key={index}
                className={`${styles.char} inline-block p-1 pb-3 mr-0.5 ${
                  index === cursorPosition
                    ? handleCharStyling("cursor")
                    : handleCharStyling(charStatus[index])
                }`}
              >
                {word}
              </span>
            );
          }
        })}
      </p>
    </div>
  );
}

export default TextBox;
