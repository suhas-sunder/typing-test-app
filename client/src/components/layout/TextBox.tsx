import { useEffect, useRef } from "react";
import styles from "./TextBox.module.css";

interface propTypes {
  charStatus: string[];
  setCharStatus: (index: number, text: string) => void;
  updateStartTimer: (value: boolean) => void;
  dummyText: string;
}

function TextBox({
  charStatus,
  setCharStatus,
  updateStartTimer,
  dummyText,
}: propTypes) {
  const cursorPositionRef = useRef<number>(0);

  // Handle user keyboard input
  useEffect(() => {
    const handleUserKeyPress = (e: KeyboardEvent) => {
      const cursorIndex = cursorPositionRef.current;
      const pattern = /^[ A-Za-z0-9_@./#&+-,`"()*^%$!~=]$/; //Check for spacebar, letters, numbers, and special characters
      e.preventDefault(); //Prevents default key actions like tabbing etc. which we don't want active during typing test

      console.log(e.key);
      if (e.key === "Backspace") {
        console.log("backspace input", cursorIndex);
        if (cursorIndex - 1 >= 0) cursorPositionRef.current = cursorIndex - 1; // Move cursor one space back
        setCharStatus(cursorIndex, ""); //Update state as default input
        updateStartTimer(true); //Signal start timer in TypingStats component.
      } else if (pattern.test(e.key) && dummyText[cursorIndex] === e.key) {
        console.log("correct input", cursorIndex);
        cursorPositionRef.current = cursorIndex + 1; // Move cursor up one char space
        setCharStatus(cursorIndex, "correct"); //Update state as correct input
      } else if (pattern.test(e.key) || e.key === "Tab" || e.key === "Enter") {
        console.log("wrong input", cursorIndex);
        cursorPositionRef.current = cursorIndex + 1; // Move cursor up one char space
        setCharStatus(cursorIndex, "error"); //Update state as wrong input
        updateStartTimer(true); //Signal start timer in TypingStats component.
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
                  index === cursorPositionRef.current
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
                  index === cursorPositionRef.current
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
