import { useEffect } from "react";

//Highlight calculator key if it matches user input
function useHighlightKeys({ startGame, setStartGame, validInputKeys }) {
  useEffect(() => {
    const handleHighlightKeys = (e: KeyboardEvent) => {
      if (!startGame) setStartGame(true); //start game on key press
      e.preventDefault();
      const enteredKey = e.key;
      let keyElement: HTMLElement | null = null;

      const highlightKey = (element) => {
        element.style.backgroundColor = "rgb(73, 160, 214)";
        element.style.color = "white";
        setTimeout(() => {
          element.style.backgroundColor = "white";
          element.style.color = "rgb(3 105 161)";
        }, 200);
      };

      if (validInputKeys.includes(enteredKey.trim())) {
        keyElement = document.getElementById(`calculator-${enteredKey}`);
      } else if (enteredKey.toLowerCase() === "enter") {
        keyElement = document.getElementById(`calculator-↵`);
      }

      if (keyElement) highlightKey(keyElement);
    };

    addEventListener("keydown", handleHighlightKeys);

    return () => removeEventListener("keydown", handleHighlightKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startGame]);
}

export default useHighlightKeys;
