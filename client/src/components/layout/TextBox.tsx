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
    const errorCharStyling = "text-red-700 bg-red-600/10 rounded-lg"; //Styling for incorrect user input
    const correctCharStyling = "text-green-700 bg-lime-600/10 rounded-lg"; //Styling for correct user input
    const cursorCharStyling = "text-blue-700 border-b-2 border-blue-700"; //Styling for current char to be typed

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

  const hideLinesOfText = useCallback(() => {
    console.log("running");
    const charElements = document.getElementsByClassName(`${styles.char}`);
    const widthOfTextBox = getTextBoxWidth(); //Width of the entire text box
    const widthOfEachChar = 25; // width 23px + 2px margin right
    let widthOfTypedChars = 0; // Sum of all widths for COMPLETED chars *currently rendered on screen*
    let index = 0;

    // Calculate the index of the first character on the second row.
    while (widthOfTypedChars < widthOfTextBox && charElements[index]) {
      widthOfTypedChars += widthOfEachChar;
      index++;
    }

    const widthOfAllCharsPerRow = index; //The final index is the total width of each row.

    //Shift the offset index (controls chars  displayed) by the number of rows to be removed.
    if (cursorPosition > charIndexOffset + widthOfAllCharsPerRow * 4 - 2) {
      setCharIndexOffset(charIndexOffset + widthOfAllCharsPerRow * 3 - 1); //This is for when window resizes. If there are 4 lines, remove two.
    } else if (
      cursorPosition >
      charIndexOffset + widthOfAllCharsPerRow * 3 - 2
    ) {
      setCharIndexOffset(charIndexOffset + widthOfAllCharsPerRow * 2 - 1); //This is for when window resizes. If there are 3 lines, remove one.
    } else if (
      cursorPosition ===
      charIndexOffset + widthOfAllCharsPerRow * 2 - 2
    ) {
      setCharIndexOffset(charIndexOffset + widthOfAllCharsPerRow - 1); //This removes one line of text when two lines are completed.
    }
  }, [charIndexOffset, cursorPosition, getTextBoxWidth]);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    window.onresize = function () {
      clearTimeout(resizeTimer);
      setTimeout(hideLinesOfText, 100);
    };

    // Cleanup function
    return () => {
      clearTimeout(resizeTimer);
      window.onresize = null;
    };
  });

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

        hideLinesOfText();

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
