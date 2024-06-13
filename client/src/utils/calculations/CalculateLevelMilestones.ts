interface PropType {
  totalScore: number;
}

export default function CalculateLevelMilestones({ totalScore }: PropType) {
  // Define milestones directly
  const totalMilestonePerLv = [
    { score: 0, scorePerLvl: 1000 },
    { score: 10000, scorePerLvl: 2000 },
    { score: 50000, scorePerLvl: 3000 },
    { score: 100000, scorePerLvl: 4000 },
    { score: 500000, scorePerLvl: 5000 },
    { score: 600000, scorePerLvl: 10000 },
    { score: 700000, scorePerLvl: 20000 },
    { score: 800000, scorePerLvl: 30000 },
    { score: 9000000, scorePerLvl: 40000 },
    { score: 10000000, scorePerLvl: 50000 },
    { score: 50000000, scorePerLvl: 60000 },
    { score: 75000000, scorePerLvl: 70000 },
    { score: 100000000, scorePerLvl: 80000 },
  ];

  let level = 0;
  let milestone = 0;
  let remainingScore = totalScore;

  for (
    let i = totalMilestonePerLv.length - 1;
    i >= 0 && remainingScore >= 0 && level < 99999;
    i--
  ) {
    const { score, scorePerLvl } = totalMilestonePerLv[i];

    if (remainingScore >= score) {
      const levelsToAdd = Math.min(
        99999 - level,
        Math.floor((remainingScore - score) / scorePerLvl) + 1,
      );
      level += levelsToAdd;
      milestone = remainingScore - (levelsToAdd - 1) * scorePerLvl;
      remainingScore -= levelsToAdd * scorePerLvl;

      if (level >= 99999) {
        milestone = 0;
        break;
      }
    }
  }

  return { level, milestone };
}
