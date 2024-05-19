import { useEffect } from "react";

interface PropType {
  validInputKeys: string[];
  cursorPosition: number;
  displayedText: string[];
  gameOver: boolean;
  setKeyStyles: (
    value: (prevState: { [key: string]: string }) => { [key: string]: string },
  ) => void;
}

//Highlight calculator key if it matches user input & update stats for valid/invalid input
//Used by SpeedCalculatorGame.tsx
export default function useHighlightKeys({
  validInputKeys,
  gameOver,
  cursorPosition,
  displayedText,
  setKeyStyles,
}: PropType) {
  useEffect(() => {
    const handleHighlightKeys = (e: KeyboardEvent) => {
      e.preventDefault();
      if (gameOver) return; //If game ended, prevent default behaviour but don't track keys

      const enteredKey = e.key === "Enter" ? "↵" : e.key;
      setKeyStyles((prevState: { [key: string]: string }) => ({
        ...prevState,
        [enteredKey]:
          displayedText[cursorPosition] === enteredKey
            ? "bg-sky-400 text-white"
            : "bg-red-400 text-white",
      }));

      // displayedText[cursorPosition] === enteredKey
      //     ? setKeyStyles((prevState: { [key: string]: string }) => ({...prevState, prevState[enteredKey] = "bg-black"}))
      //     : calculatorKeyElement.classList.add(styles.testing);
      // calculatorKeyElement.style.color = "white";
      setTimeout(() => {
        setKeyStyles((prevState: { [key: string]: string }) => ({
          ...prevState,
          [enteredKey]: "bg-white",
        }));
        // calculatorKeyElement.style.color = "rgb(3 105 161)";
      }, 200);
    };

    addEventListener("keydown", handleHighlightKeys);

    return () => removeEventListener("keydown", handleHighlightKeys);
  }, [validInputKeys, gameOver, displayedText, cursorPosition, setKeyStyles]);
}
