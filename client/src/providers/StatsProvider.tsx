import React, { createContext, useState } from "react";

export type WeeklyStatsProps = {
  avgWpm?: string;
  avgAccuracy?: string;
  totalScore?: string;
  wordsTyped?: string;
  totalTypingMins?: string;
  totalTypingHours?: string;
  totalTypingDays?: string;
};
interface ContextType {
  totalScore: number;
  setTotalScore: (value: number) => void;
  weeklyStats: WeeklyStatsProps;
  setWeeklyStats: (value: WeeklyStatsProps) => void;
}

export const StatsContext = createContext<ContextType>({
  totalScore: 0,
  setTotalScore: () => {},
  weeklyStats: {},
  setWeeklyStats: () => {},
});

interface PropType {
  children: React.ReactNode;
}

export default function StatsProvider({ children }: PropType) {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStatsProps>({});

  return (
    <StatsContext.Provider
      value={{
        totalScore,
        setTotalScore,
        weeklyStats,
        setWeeklyStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}
