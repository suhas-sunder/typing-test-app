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

  // Set styling for each character
  const handleCharStyling = useCallback((status: string) => {
    const errorCharStyling = "text-red-700 bg-red-600/10 rounded-lg"; //Styling for incorrect user input
    const correctCharStyling = "text-green-700 bg-lime-600/10 rounded-lg"; //Styling for correct user input
    const cursorCharStyling = "text-blue-700 border-b-2 border-blue-700"; //Styling for current char to be typed

    if (status === "cursor") {
      return cursorCharStyling;
    } else if (status === "error") {
      return errorCharStyling;
    } else if (status === "correct") {
      return correctCharStyling;
    } else {
      return;
    }
  }, []);

  // Gets textbox width based on size of browser window
  const getTextBoxWidth = useCallback(() => {
    const textboxElement = document.getElementById("textbox") || null;
    return (textboxElement && textboxElement.offsetWidth) || 0;
  }, []);

  // Gets the max width of each row based on current textbox size.
  const getWidthOfRow = useCallback(() => {
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

    return index; //The final index is the total width of each row.
  }, [getTextBoxWidth]);

  const handleResize = useCallback(() => {
    const widthOfAllCharsPerRow = getWidthOfRow();

    let maxRows: number = 10; //This is the maximum additional rows we can have before a row is removed

    while (maxRows > 1) {
      if (
        cursorPosition >
        charIndexOffset + widthOfAllCharsPerRow * maxRows - 3 // Subtract by 2 because we want two character spaces after the 2nd row before removing a row
      ) {
        setCharIndexOffset(
          charIndexOffset + widthOfAllCharsPerRow * (maxRows - 1) - 1 // Subtract count by 1 because we want to preserve one row.
        );
        maxRows = 0; //Exit loop
      }

      maxRows--;
    }
  }, [charIndexOffset, getWidthOfRow, cursorPosition]);

  // Remove completed rows of text when screen is resized
  useEffect(() => {
    // Add delay to resize event since we only need to reset rows once resizing is complete.
    let resizeTimer: ReturnType<typeof setTimeout>;
    window.onresize = function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    // Cleanup function
    return () => {
      clearTimeout(resizeTimer);
      window.onresize = null;
    };
  }, [handleResize]);

  // Handle user keyboard input
  useEffect(() => {
    // Manage cursor position and store input validity to state
    const handleCursorPosition = (key: string) => {
      if (key === "Backspace") {
        if (
          charIndexOffset + cursorPosition > getWidthOfRow() &&
          cursorPosition - charIndexOffset === 0
        )
          setCharIndexOffset(charIndexOffset - getWidthOfRow());

        if (cursorPosition - 1 >= 0) setCursorPosition(cursorPosition - 1);
        setCharStatus(cursorPosition, "");
      } else if (dummyText[cursorPosition] === key) {
        setCursorPosition(cursorPosition + 1);
        setCharStatus(cursorPosition, "correct");
      } else {
        setCursorPosition(cursorPosition + 1);
        setCharStatus(cursorPosition, "error");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const pattern = /(^[ A-Za-z0-9_@./#&+-,'`"()*^%$!~=]$)/; //Check for space bar, letters, numbers, and special characters

      // Only validates input if input is within scope of test
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

        handleResize();

        handleCursorPosition(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleResize,
    dummyText,
    setCharStatus,
    updateStartTimer,
    cursorPosition,
    charIndexOffset,
    firstInputDetected,
    getWidthOfRow,
    setCursorPosition,
  ]);

  return (
    <div
      className={`${styles["text-box"]} flex w-11/12 overflow-hidden pt-5 pb-5 mb-24 shadow-inner border border-sky-50 rounded-lg`}
    >
      <p id="textbox" className={`block -mt-2 text-center `}>
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
