interface PropType {
  wpmScore: number;
}

export default function CalcPerformanceScore({ wpmScore }: PropType) {
  //Above 19 = 1 star, 39 = 2 star, etc.
  const oneStarWPM = 20;
  const twoStarWPM = 40;
  const threeStarWPM = 60;
  const fourStarWPM = 80;
  const fiveStarWPM = 90;
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

  return performanceScore;
}
