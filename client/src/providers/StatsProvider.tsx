import React, { createContext, useState } from "react";

interface ContextType {
  totalScore: number;
  setTotalScore: (value: number) => void;
  weeklyStats: { [key: string]: string | number };
  setWeeklyStats: (value: { [key: string]: string | number }) => void;
  lifetimeStats: { [key: string]: string | number };
  setLifetimeStats: (value: { [key: string]: string | number }) => void;
  performanceStats: { [key: string]: { testTime: number; bestWPM: number } };
  setPerformanceStats: (
    value: (prevState: {
      [key: string]: { testTime: number; bestWPM: number };
    }) => {
      [key: string]: { testTime: number; bestWPM: number };
    },
  ) => void;
  level: number;
  setLevel: (value: number) => void;
}

export const StatsContext = createContext<ContextType>({
  totalScore: 0,
  setTotalScore: () => {},
  weeklyStats: {},
  setWeeklyStats: () => {},
  lifetimeStats: {},
  setLifetimeStats: () => {},
  performanceStats: {},
  setPerformanceStats: () => {},
  level: 0,
  setLevel: () => 0,
});

interface PropType {
  children: React.ReactNode;
}

export default function StatsProvider({ children }: PropType) {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [weeklyStats, setWeeklyStats] = useState<{
    [key: string]: string | number;
  }>({});
  const [lifetimeStats, setLifetimeStats] = useState<{
    [key: string]: string | number;
  }>({});
  const [performanceStats, setPerformanceStats] = useState<{
    [key: string]: { testTime: number; bestWPM: number };
  }>({}); //The test name is the identifier (key) for the object values (value). eg. calculator-game will have a testTime and bestWPM associated with the keyword.

  return (
    <StatsContext.Provider
      value={{
        totalScore,
        setTotalScore,
        weeklyStats,
        setWeeklyStats,
        lifetimeStats,
        setLifetimeStats,
        level,
        setLevel,
        performanceStats,
        setPerformanceStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}
