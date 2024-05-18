import { useEffect } from "react";

interface PropType {
  startGame: boolean;
  setStartGame: (value: boolean) => void;
  validInputKeys: string[];
  gameOver: boolean;
}

//Highlight calculator key if it matches user input & update stats for valid/invalid input
//Used by SpeedCalculatorGame.tsx
function useHighlightKeys({
  startGame,
  validInputKeys,
  setStartGame,
  gameOver,
}: PropType) {
  useEffect(() => {
    const handleHighlightKeys = (e: KeyboardEvent) => {
      if (!startGame) setStartGame(true); //start game on key press
      e.preventDefault();
      const enteredKey = e.key;
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
    };

    !gameOver && addEventListener("keyup", handleHighlightKeys);

    return () => removeEventListener("keyup", handleHighlightKeys);
  }, [startGame, setStartGame, validInputKeys, gameOver]);
}

export default useHighlightKeys;
