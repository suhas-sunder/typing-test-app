import React, { createContext, useState } from "react";

export type StatsProps = {
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
  weeklyStats: StatsProps;
  setWeeklyStats: (value: StatsProps) => void;
  lifetimeStats: StatsProps;
  setLifetimeStats: (value: StatsProps) => void;
}

export const StatsContext = createContext<ContextType>({
  totalScore: 0,
  setTotalScore: () => {},
  weeklyStats: {},
  setWeeklyStats: () => {},
  lifetimeStats: {},
  setLifetimeStats: () => {},
});

interface PropType {
  children: React.ReactNode;
}

export default function StatsProvider({ children }: PropType) {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [weeklyStats, setWeeklyStats] = useState<StatsProps>({});
  const [lifetimeStats, setLifetimeStats] = useState<StatsProps>({});

  return (
    <StatsContext.Provider
      value={{
        totalScore,
        setTotalScore,
        weeklyStats,
        setWeeklyStats,
        lifetimeStats,
        setLifetimeStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}
