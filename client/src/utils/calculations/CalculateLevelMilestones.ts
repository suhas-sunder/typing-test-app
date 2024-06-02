interface PropType {
  totalScore: number;
}

export default function CalculateLevelMilestones({ totalScore }: PropType) {
  let level = 0;
  let milestone = 0;
  const handleUpdateLevel = (totalMilestonePerLvl) => {
    const result = totalScore / totalMilestonePerLvl;

    level = Math.floor(result);
    milestone =
      totalMilestonePerLvl - Math.round((result % 1) * totalMilestonePerLvl);
  };

  //Have a different milestone for level based on score threshold
  const milestones: { [key: string]: number }[] = [
    { score: 1000000, level: 10000 },
    { score: 5000000, level: 25000 },
    { score: 10000000, level: 50000 },
    { score: 100000000, level: 75000 },
  ];

  //Once score reaches above a certain value, set this as default milestone for level
  const defaultLevelMilestone = 100000;

  // Determine level milestone based on total score
  milestones.forEach((milestone) => {
    if (totalScore < milestone.score) {
      handleUpdateLevel(milestone.level);
    } else {
      handleUpdateLevel(defaultLevelMilestone);
    }
  });

  return { level, milestone };
}
