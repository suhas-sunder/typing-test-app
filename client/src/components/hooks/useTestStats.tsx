import { useEffect } from "react";

interface PropType {
  firstInputDetected?: boolean;
  seconds: number;
  setSeconds: (value: number) => void;
  setStats: (
    value: (prevState: { [key: string]: number }) => { [key: string]: number },
  ) => void;
  accurateKeys: { [key: string]: number };
  troubledKeys: { [key: string]: number };
}

//Calculate typing stats. Used by typingstats.tsx, games, and lessons.
function useTestStats({
  firstInputDetected,
  seconds,
  setStats,
  setSeconds,
  accurateKeys,
  troubledKeys,
}: PropType) {
  useEffect(() => {
    const charMistakes = Object.values(troubledKeys).reduce((a, b) => a + b, 0);
    const charCorrect = Object.values(accurateKeys).reduce((a, b) => a + b, 0);
    const totalCharsTyped = charCorrect + charMistakes;
    const avgCharsPerWord = 5.0;
    const timeElapsedMin = (seconds || 1) / 60;
    const netWPM = Math.ceil(charCorrect / avgCharsPerWord / timeElapsedMin);
    const netCPM = Math.ceil(charCorrect / timeElapsedMin);
    const accuracy =
      Math.floor((charCorrect / (charCorrect + charMistakes)) * 100) || 0;

    if (totalCharsTyped === 0 && !firstInputDetected) setSeconds(0); //Reset timer when test resets. Only applicable for speed test where timer is displayed.
    const finalWPM = accuracy > 0 ? Math.round(netWPM * (accuracy / 100)) : 0;
    const finalCPM = accuracy > 0 ? Math.round(netCPM * (accuracy / 100)) : 0;

    setStats((prevState) => ({
      ...prevState,
      correct: charCorrect,
      mistakes: charMistakes,
      wpm: netWPM,
      cpm: netCPM,
      accuracy,
      finalWPM,
      finalCPM,
    }));
  }, [
    firstInputDetected,
    seconds,
    accurateKeys,
    troubledKeys,
    setSeconds,
    setStats,
  ]);
}

export default useTestStats;
