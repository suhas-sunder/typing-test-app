import { useCallback, useEffect, useState } from "react";
import styles from "./styles/TextBox.module.css";

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
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started
  const [charIndexOffset, setCharIndexOffset] = useState<number>(0); //Used to manage # of chars displayed on screen

  const getTextBoxWidth = useCallback(() => {
    const textboxElement = document.getElementById("textbox");
    return (textboxElement && textboxElement.offsetWidth) || 0; //Add 20px to offset to account for padding
  }, []);

  const handleCharStyling = (charStatus: string) => {
    const errorCharStyling = "text-red-700 bg-red-600/10 rounded-lg";
    const correctCharStyling = "text-green-700 bg-lime-600/10 rounded-lg";
    const cursorCharStyling = "text-blue-700 border-b-2 border-blue-700";

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

  // Handle user keyboard input
  useEffect(() => {
    const validateCharInput = (key: string) => {
      if (key === "Backspace") {
        if (cursorPosition - 1 >= 0) setCursorPosition(cursorPosition - 1); // Move cursor one space back
        setCharStatus(cursorPosition, ""); //Update state as default input
      } else if (dummyText[cursorPosition] === key) {
        setCursorPosition(cursorPosition + 1); // Move cursor up one char space
        setCharStatus(cursorPosition, "correct"); //Update state as correct input
      } else {
        setCursorPosition(cursorPosition + 1); // Move cursor up one char space
        setCharStatus(cursorPosition, "error"); //Update state as wrong input
      }
    };

    const handleUserKeyPress = (e: KeyboardEvent) => {
      const pattern = /^[ A-Za-z0-9_@./#&+-,`"()*^%$!~=]$/; //Check for spacebar, letters, numbers, and special characters
      e.preventDefault(); //Prevents default key actions like tabbing etc. which we don't want active during typing test

      if (
        pattern.test(e.key) ||
        e.key === "Tab" ||
        e.key === "Enter" ||
        e.key === "Backspace"
      ) {
        if (e.key !== "Backspace" && !firstInputDetected) {
          updateStartTimer(true); //Start timer in TypingStats component.
          setFirstInputDetected(true); //Prevents timer from resetting on further user inputs.
        }

        const charElements = document.getElementsByClassName(`${styles.char}`);
        const widthOfTextBox = getTextBoxWidth();
        const charWidth = 25; // width 23px + 2px margin right
        let widthOfFirstRow = 0;
        let index = 0;

        // Calculate the index of the first character on the second row.
        while (widthOfFirstRow < widthOfTextBox * 2 && charElements[index]) {
          widthOfFirstRow += charWidth;
          index++;
        }

        console.log(index, index / 2);

        if (cursorPosition === charIndexOffset + index - 2) {
          setCharIndexOffset(charIndexOffset + Math.round(index / 2) - 1);
          setCursorPosition(0);
        }

        validateCharInput(e.key);
      }
    };

    window.addEventListener("keydown", handleUserKeyPress);

    // cleanup function
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [charStatus, dummyText, setCharStatus, updateStartTimer]);

  return (
    <div
      className={`${styles["text-box"]} flex w-11/12 overflow-hidden pt-5 pb-5 mb-24 shadow-inner rounded-lg`}
    >
      <p id="textbox" className={`block -mt-2 text-center`}>
        {dummyText.split("").map((word: string, index: number) => {
          if (index >= charIndexOffset + 0 && index <= charIndexOffset + 450) {
            return word === " " ? (
              <span
                key={index}
                className={`${
                  styles.char
                } inline-flex justify-center mt-1 pt-1 pb-2 mr-0.5 ${
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
                className={`${
                  styles.char
                } inline-flex justify-center mt-1 pt-1 pb-2 mr-0.5 ${
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
