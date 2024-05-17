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
}

//IUpdate stats for valid/invalid user input
//Used by SpeedCalculatorGame.tsx
function useTrackInputAccuracy({
  displayedText,
  cursorPosition,
  setInputValidity,
  setAccurateKeys,
  setTroubledKeys,
  setCursorPosition,
}: PropType) {
  useEffect(() => {
    const handleHighlightKeys = (e: KeyboardEvent) => {
      e.preventDefault();
      const enteredKey = e.key;

      //Track stats based on user input
      if (displayedText[cursorPosition] === enteredKey) {
        setAccurateKeys((prevState: { [x: string]: number }) => ({
          ...prevState,
          [enteredKey]: prevState[enteredKey]++,
        }));
        setInputValidity((prevState: string[]) => [...prevState, "valid"]);
        cursorPosition < 12
          ? setCursorPosition(cursorPosition++)
          : setCursorPosition(0);
      } else {
        setTroubledKeys((prevState: { [x: string]: number }) => ({
          ...prevState,
          [enteredKey]: prevState[enteredKey]++,
        }));
        setInputValidity((prevState: string[]) => [...prevState, "invalid"]);
      }
    };

    addEventListener("keydown", handleHighlightKeys);

    return () => removeEventListener("keydown", handleHighlightKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAccurateKeys, setCursorPosition, setInputValidity, setTroubledKeys]);
}

export default useTrackInputAccuracy;
