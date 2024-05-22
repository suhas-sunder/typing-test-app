import { useEffect } from "react";

function useUpdateLives({ lives, setSeconds, gameOver, setGameOver }) {
  useEffect(() => {
    const livesRemaining = lives.filter((life) => life === "full").length;
    let interval;

    const incrementTimer = () => {
      setSeconds((prevState: number) => prevState + 1);
    };

    //Start/end timer
    if (!gameOver && livesRemaining > 0) {
      interval = setInterval(() => incrementTimer(), 1000);
    }

    //End game if lives are over
    if (livesRemaining <= 0 && !gameOver) {
      setGameOver((prevState) => !prevState); //Ends the game
    }

    return () => {
      clearInterval(interval);
    };
  }, [gameOver, lives, setGameOver, setSeconds]);
}

export default useUpdateLives;
