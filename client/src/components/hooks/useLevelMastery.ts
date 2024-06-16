import { useEffect, useMemo, useState } from "react";
import CalculateLevelMilestones from "../../utils/calculations/CalculateLevelMilestones";
import useStats from "./useStats";

function useLevelMastery() {
  const [level, setLevel] = useState<number>(0);
  const [nextMilestone, setNextMilestone] = useState<number>(0);
  const [masteryName, setMasteryName] = useState<string>("");

  const { lifetimeStats,  totalScore, weeklyStats } = useStats();
  


  const levelMilestones = useMemo(
    () =>
      CalculateLevelMilestones({
        totalScore,
      }),
    [totalScore],
  );

  // Calculate level and milestone
  useEffect(() => {
    const handleLevelMilestone = () => {
      const { level, milestone, mastery } = levelMilestones;

      setLevel(level);
      setNextMilestone(milestone);
      setMasteryName(mastery);
    };
    handleLevelMilestone();
  }, [levelMilestones, totalScore]);

  return {level, nextMilestone, masteryName, lifetimeStats, weeklyStats}
}

export default useLevelMastery