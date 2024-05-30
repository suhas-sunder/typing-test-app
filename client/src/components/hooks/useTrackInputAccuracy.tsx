import { useEffect, useState } from "react";

interface PropType {
  displayedText: string[];
  cursorPosition: number;
  defaultCharsObj: { [key: string]: number };
  setCursorPosition: (value: number) => void;
  setStartGame: (value: boolean) => void;
  setLives: (value: (prevState: string[]) => string[]) => void;
  setScore: (value: (prevState: number) => number) => void;
  totalLives: number;
  gameOver: boolean;
  startGame: boolean;
  validInputKeys: string[];
}

//Update stats for valid/invalid user input for accuracy
//Optionally updates display styling for non-standard input keys
//Used by SpeedCalculatorGame.tsx
export default function useTrackInputAccuracy({
  displayedText,
  cursorPosition,
  totalLives,
  gameOver,
  defaultCharsObj,
  setCursorPosition,
  setLives,
  setScore,
  startGame,
  setStartGame,
  validInputKeys,
}: PropType) {
  const [accurateKeys, setAccurateKeys] = useState<{ [key: string]: number }>({
    ...defaultCharsObj,
  });
  const [troubledKeys, setTroubledKeys] = useState<{ [key: string]: number }>({
    ...defaultCharsObj,
  });
  const [inputValidity, setInputValidity] = useState<string[]>([]); //Tracks every user input as valid or invalid

  useEffect(() => {
    const handleUpdateStats = (e: KeyboardEvent) => {
      if (gameOver || e.key === "Tab") return; //If game ended, prevent default behaviour but don't track keys. Allow tab for accessability reasons but don't track the input for test.
      e.preventDefault();
      if (!startGame) setStartGame(true); //start game on key press

      const enteredKey = e.key === "Enter" ? "↵" : e.key;

      //Track stats based on user input
      if (displayedText[cursorPosition] === enteredKey) {
        setAccurateKeys((prevState: { [x: string]: number }) => ({
          ...prevState,
          [enteredKey]: prevState[enteredKey] + 1,
        }));
        setScore((prevState: number) =>
          Math.round(prevState + (100 * (7 - totalLives)) / 3.65),
        );
        setInputValidity((prevState: string[]) => [...prevState, "valid"]);
      } else {
        setTroubledKeys((prevState: { [x: string]: number }) => ({
          ...prevState,
          [enteredKey]: prevState[enteredKey] + 1,
        }));
        setInputValidity((prevState: string[]) => [...prevState, "invalid"]);
        //Each time an invalid input is entered, "empty" or delete one heart/life
        setLives((prevState: string[]) =>
          prevState.map((value, index) => {
            if (value === "full" && prevState[index - 1] !== "full") {
              return "empty";
            } else {
              return value;
            }
          }),
        );
      }

      if (cursorPosition < 13) {
        setCursorPosition(cursorPosition + 1);
      } else {
        setCursorPosition(0);
        setInputValidity((prevState: string[]) =>
          prevState.filter((value) => value === ""),
        );
      }
    };

    addEventListener("keydown", handleUpdateStats);

    return () => {
      removeEventListener("keydown", handleUpdateStats);
    };
  }, [
    cursorPosition,
    displayedText,
    totalLives,
    gameOver,
    setCursorPosition,
    setInputValidity,
    setAccurateKeys,
    setTroubledKeys,
    setLives,
    setScore,
    startGame,
    setStartGame,
    validInputKeys,
  ]);

  return {
    accurateKeys,
    troubledKeys,
    inputValidity,
    setInputValidity,
    setAccurateKeys,
    setTroubledKeys,
  };
}
