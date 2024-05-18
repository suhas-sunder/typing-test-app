import { useEffect } from "react";

interface PropType {
  displayedText: string[];
  cursorPosition: number;
  setInputValidity: (value: (prevState: string[]) => string[]) => void;
  setCursorPosition: (value: number) => void;
  setAccurateKeys: (
    value: (prevState: { [x: string]: number }) => { [x: string]: number },
  ) => void;
  setTroubledKeys: (
    value: (prevState: { [x: string]: number }) => { [x: string]: number },
  ) => void;
  startGame: boolean;
  setStartGame: (value: boolean) => void;
  validInputKeys: string[];
  setLives: (value: (prevState: string[]) => string[]) => void;
  setScore: (value: (prevState: number) => number) => void;
  totalLives: number;
}

//Update stats for valid/invalid user input for accuracy (no timer)
//Optionally updates display styling for non-standard input keys
//Used by SpeedCalculatorGame.tsx
function useTrackInputAccuracy({
  displayedText,
  cursorPosition,
  totalLives,
  setInputValidity,
  setAccurateKeys,
  setTroubledKeys,
  setCursorPosition,
  setLives,
  setScore,
}: PropType) {
  useEffect(() => {
    const handleUpdateStats = (e: KeyboardEvent) => {
      e.preventDefault();
      const enteredKey = e.key === "Enter" ? "↵" : e.key;

      //Code below is so that I can try to manage highlighting non-standard keys within this function when I get time to look into this
      // if (!startGame) setStartGame(true); //start game on key press
      // let keyElement: HTMLElement | null = null;

      // const highlightKey = (element: HTMLElement) => {
      //   element.style.backgroundColor = "rgb(73, 160, 214)";
      //   element.style.color = "white";
      //   setTimeout(() => {
      //     element.style.backgroundColor = "white";
      //     element.style.color = "rgb(3 105 161)";
      //   }, 200);
      // };

      // //If key matches element id, get element
      // if (validInputKeys.includes(enteredKey.trim())) {
      //   keyElement = document.getElementById(`calculator-${enteredKey}`);
      // } else if (enteredKey.toLowerCase() === "enter") {
      //   keyElement = document.getElementById(`calculator-↵`);
      // }

      // //Apply styling to keys if element exists
      // if (keyElement) {
      //   highlightKey(keyElement);
      // }

      //Track stats based on user input
      if (displayedText[cursorPosition] === enteredKey) {
        setAccurateKeys((prevState: { [x: string]: number }) => ({
          ...prevState,
          [enteredKey]: prevState[enteredKey]++,
        }));
        setScore((prevState: number) =>
          Math.round(prevState + (100 * (7 - totalLives)) / 3.65),
        );
        setInputValidity((prevState: string[]) => [...prevState, "valid"]);
      } else {
        setTroubledKeys((prevState: { [x: string]: number }) => ({
          ...prevState,
          [enteredKey]: prevState[enteredKey]++,
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

    return () => removeEventListener("keydown", handleUpdateStats);
  }, [
    cursorPosition,
    displayedText,
    totalLives,
    setAccurateKeys,
    setCursorPosition,
    setInputValidity,
    setTroubledKeys,
    setLives,
    setScore,
  ]);
}

export default useTrackInputAccuracy;
