import { useEffect } from "react";

interface PropType {
  validInputKeys: string[];
  cursorPosition: number;
  displayedText: string[];
  showGameOverMenu: boolean;
  setKeyStyles: (
    value: (prevState: { [key: string]: string }) => { [key: string]: string },
  ) => void;
}

//Highlight calculator key if it matches user input & update stats for valid/invalid input
//Used by Calculator.tsx
export default function useHighlightKeys({
  validInputKeys,
  showGameOverMenu,
  cursorPosition,
  displayedText,
  setKeyStyles,
}: PropType) {
  useEffect(() => {
    const handleHighlightKeys = (e: KeyboardEvent) => {
      if (showGameOverMenu || e.key === "Tab") return; //If game ended, prevent default behaviour but don't track keys. Allow tab for accessability reasons but don't track the input for test.
      e.preventDefault();

      const enteredKey = e.key === "Enter" ? "↵" : e.key;
      setKeyStyles((prevState: { [key: string]: string }) => ({
        ...prevState,
        [enteredKey]:
          displayedText[cursorPosition] === enteredKey
            ? "bg-sky-400 text-white"
            : "bg-red-400 text-white",
      }));

      setTimeout(() => {
        setKeyStyles((prevState: { [key: string]: string }) => ({
          ...prevState,
          [enteredKey]: "bg-white",
        }));
      }, 200);
    };

    addEventListener("keydown", handleHighlightKeys);

    return () => removeEventListener("keydown", handleHighlightKeys);
  }, [
    validInputKeys,
    showGameOverMenu,
    displayedText,
    cursorPosition,
    setKeyStyles,
  ]);
}
