import { Fragment, useEffect, useState } from "react";
import Icon from "../../../utils/other/Icon";
import { v4 as uuidv4 } from "uuid";
import CalcPerformanceScore from "../../../utils/calculations/CalcPerformanceScore";
import useLessonText from "../../hooks/useLessonText";

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
  const { lessonIndex } = useLessonText();
  const [performanceScore, setPerformanceScore] = useState<number>(0);

  const starArr = new Array(5).fill("");
  const styleArr = [
    "scale-[0.8] translate-x-1 -translate-y-2",
    "scale-[1.15] z-[1] -translate-y-1",
    "scale-[1.3] z-[2]",
    "scale-[1.15] -translate-y-1",
    "scale-[0.8] -translate-x-1 -translate-y-2",
  ];

  useEffect(() => {
    const handlePerformanceScore = () => {
      let starOffset = 0;

      if (testName === "calculator-game" && wpm > 10) starOffset = Math.ceil(testTime / 60); //For this test the player is rewarded for both wpm and how long they last in the game. For each minute the player survives they get 1 extra star.

      console.log(testName, testTime);

      //For the first 3 lessons be more lenient and award 3 extra points.
      if (typeof lessonIndex === "number" && lessonIndex <= 2 && wpm > 10)
        starOffset = 3;

      const score = CalcPerformanceScore({
        wpmScore: wpm || 0,
      });

      return score + starOffset;
    };

    setPerformanceScore(handlePerformanceScore());
  }, [lessonIndex, testName, testTime, wpm]);

  return (
    <div className={customStyle}>
      {starArr.map((_star, index) => (
        <Fragment key={uuidv4()}>
          <Icon
            icon={`${index + 1 <= performanceScore ? "starFull" : "starEmpty"}`}
            title="Performance Stars Based On WPM"
            customStyle={`${styleArr[index]} ${
              index + 1 <= performanceScore ? "text-sky-500" : "text-slate-400"
            } bg-white rounded-full`}
          />
        </Fragment>
      ))}
    </div>
  );
}
