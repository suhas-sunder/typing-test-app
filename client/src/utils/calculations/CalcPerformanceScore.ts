interface PropType {
  wpmScore: number;
  starOffset?: number; //For some lessons, it is tough to get a high WPM score so to compensate, I am artificially inflating the score for those tests alone. Eg. for beginner intermediate and advanced lessons my score tends to fall closer to 40-60wpm even though my normal average is 75 to 80
}

export default function CalcPerformanceScore({
  wpmScore,
  starOffset,
}: PropType) {
  const oneStarWPM = 20;
  const twoStarWPM = 38;
  const threeStarWPM = 50;
  const fourStarWPM = 60;
  const fiveStarWPM = 70;
  const sixStarWPM = 120;

  const wpmArrReverseOrder = [
    sixStarWPM,
    fiveStarWPM,
    fourStarWPM,
    threeStarWPM,
    twoStarWPM,
    oneStarWPM,
  ];

  let performanceScore = 0;

  if (wpmScore < oneStarWPM) return performanceScore; //If wpm is below 20 return 0

  //Return performance score using array index after comparing wpm values with benchmarks.
  wpmArrReverseOrder.forEach((wpm, index) => {
    if (wpmScore >= wpm && performanceScore === 0) {
      performanceScore = wpmArrReverseOrder.length - index;
    }
  });

  console.log(
    starOffset ? starOffset + performanceScore : performanceScore,
    "score",
    starOffset,
  );

  return starOffset ? starOffset + performanceScore : performanceScore;
}
