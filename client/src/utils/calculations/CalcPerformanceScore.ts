interface PropType {
  wpmScore: number;
}

export default function CalcPerformanceScore({ wpmScore }: PropType) {
  //Above 19 = 1 star, 39 = 2 star, etc.
  const halfStarWPM = 10;
  const oneStarWPM = 20;
  const oneHalfStarWPM = 30;
  const twoStarWPM = 40;
  const twoHalfStarWPM = 45;
  const threeStarWPM = 50;
  const threeHalfStarWPM = 60;
  const fourStarWPM = 70;
  const fourHalfStarWPM = 80;
  const fiveStarWPM = 90;
  const sixStarWPM = 120;
  const sevenStarWPM = 150;

  const wpmArrReverseOrder = [
    sevenStarWPM,
    sixStarWPM,
    fiveStarWPM,
    fourHalfStarWPM,
    fourStarWPM,
    threeHalfStarWPM,
    threeStarWPM,
    twoHalfStarWPM,
    twoStarWPM,
    oneHalfStarWPM,
    oneStarWPM,
    halfStarWPM,
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
