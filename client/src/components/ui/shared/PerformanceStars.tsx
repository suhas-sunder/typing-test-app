import { Fragment, useEffect, useState } from "react";
import Icon from "../../../utils/other/Icon";
import { v4 as uuidv4 } from "uuid";
import CalcPerformanceScore from "../../../utils/calculations/CalcPerformanceScore";

interface PropType {
  customStyle: string;
  testName?: string;
  testTime: number;
  wpm: number;
}

//Displays performance score for each level in the form of stars
export default function PerformanceStars({
  customStyle,
  testName,
  testTime,
  wpm,
}: PropType) {
  const [performanceScore, setPerformanceScore] = useState<number>(0);

  const starArr = new Array(5).fill("");
  const styleArr = [
    "scale-[0.8] translate-x-1 -translate-y-2",
    "scale-[1.15] z-[1] -translate-y-1",
    "scale-[1.3] z-[2]",
    "scale-[1.15] -translate-y-1",
    "scale-[0.8] -translate-x-1 -translate-y-2",
  ];

  //Displays Half, Full, or Empty star icon based on performance score.
  const handleStarIcon = (index) => {
    let icon = "starEmpty";

    if (index + 1 <= performanceScore / 2) icon = "starFull";

    if (
      index + 1 === Math.ceil(performanceScore / 2) &&
      performanceScore % 2 !== 0
    )
      icon = "starHalf";

    return icon;
  };

  useEffect(() => {
    const handlePerformanceScore = () => {
      let starOffset = 0;
      const timeOffset = Math.ceil(testTime / 20) + 5;

      if (testName === "calculator-game" && wpm >= 10)
        starOffset = timeOffset > 7 ? 7 : timeOffset; //For this test the player is rewarded for both wpm and how long they last in the game. For each minute the player survives they get 1 extra star.

      if (
        (testName?.includes("lesson/1/") ||
          testName?.includes("lesson/2/") ||
          testName?.includes("lesson/3/")) &&
        wpm > 10
      )
        starOffset = 3;

      const score = CalcPerformanceScore({
        wpmScore: wpm || 0,
      });

      return score + starOffset;
    };

    setPerformanceScore(handlePerformanceScore());
  }, [testName, testTime, wpm]);

  return (
    <div className={customStyle}>
      {starArr.map((_star, index) => (
        <Fragment key={uuidv4()}>
          <Icon
            icon={`${handleStarIcon(index)}`}
            title="Performance Stars Based On WPM"
            customStyle={`${styleArr[index]} ${
              handleStarIcon(index) !== "starFull"
                ? "text-slate-400"
                : "text-sky-500"
            } bg-white rounded-full`}
          />
        </Fragment>
      ))}
    </div>
  );
}
