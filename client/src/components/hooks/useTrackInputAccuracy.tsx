import { useEffect } from "react";

interface PropType {
  displayedText: string[];
  cursorPosition: number;
  remainingLives: number;
  setInputValidity: (value: (prevState: string[]) => string[]) => void;
  setCursorPosition: (value: number) => void;
  setAccurateKeys: (
    value: (prevState: { [x: string]: number }) => { [x: string]: number },
  ) => void;
  setTroubledKeys: (
    value: (prevState: { [x: string]: number }) => { [x: string]: number },
  ) => void;
  setRemainingLives: (value: number) => void;
  startGame: boolean;
  setStartGame: (value: boolean) => void;
  validInputKeys: string[];
}

//Update stats for valid/invalid user input for accuracy (no timer)
//Optionally updates display styling for non-standard input keys
//Used by SpeedCalculatorGame.tsx
function useTrackInputAccuracy({
  displayedText,
  cursorPosition,
  remainingLives,
  setInputValidity,
  setAccurateKeys,
  setTroubledKeys,
  setCursorPosition,
  setRemainingLives,
  startGame,
  validInputKeys,
  setStartGame,
}: PropType) {
  useEffect(() => {
    const handleUpdateStats = (e: KeyboardEvent) => {
      e.preventDefault();
      const enteredKey = e.key === "Enter" ? "↵" : e.key;
      if (!startGame) setStartGame(true); //start game on key press
      let keyElement: HTMLElement | null = null;

      const highlightKey = (element: HTMLElement) => {
        element.style.backgroundColor = "rgb(73, 160, 214)";
        element.style.color = "white";
        setTimeout(() => {
          element.style.backgroundColor = "white";
          element.style.color = "rgb(3 105 161)";
        }, 200);
      };

      //If key matches element id, get element
      if (validInputKeys.includes(enteredKey.trim())) {
        keyElement = document.getElementById(`calculator-${enteredKey}`);
      } else if (enteredKey.toLowerCase() === "enter") {
        keyElement = document.getElementById(`calculator-↵`);
      }

      //Apply styling to keys if element exists
      if (keyElement) {
        highlightKey(keyElement);
      }

      //Track stats based on user input
      if (displayedText[cursorPosition] === enteredKey) {
        setAccurateKeys((prevState: { [x: string]: number }) => ({
          ...prevState,
          [enteredKey]: prevState[enteredKey]++,
        }));
        setInputValidity((prevState: string[]) => [...prevState, "valid"]);
        cursorPosition < 13
          ? setCursorPosition(cursorPosition + 1)
          : setCursorPosition(0);
      } else {
        setTroubledKeys((prevState: { [x: string]: number }) => ({
          ...prevState,
          [enteredKey]: prevState[enteredKey]++,
        }));
        setInputValidity((prevState: string[]) => [...prevState, "invalid"]);
        setRemainingLives(remainingLives - 1);
      }
    };

    addEventListener("keydown", handleUpdateStats);

    return () => removeEventListener("keydown", handleUpdateStats);
  }, [
    cursorPosition,
    displayedText,
    remainingLives,
    setAccurateKeys,
    setCursorPosition,
    setInputValidity,
    setTroubledKeys,
    setRemainingLives,
    startGame,
    setStartGame,
    validInputKeys,
  ]);
}

export default useTrackInputAccuracy;
