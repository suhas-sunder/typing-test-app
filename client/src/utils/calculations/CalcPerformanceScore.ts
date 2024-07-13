interface PropType {
  wpmScore: number;
}

function CalcPerformanceScore({ wpmScore }: PropType) {
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

  return performanceScore;
}

export default CalcPerformanceScore;
