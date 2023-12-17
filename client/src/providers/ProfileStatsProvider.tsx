import React, { createContext, useEffect, useState } from "react";
import AccountAPI from "../api/accountAPI";

interface StatsDataType {
  totalScore: number;
  averageWpm: number;
  averageAccuracy: number;
  totalTypingTime: number;
  totalCoursesCompleted: number;
  totalCoursesMastered: number;
  totalGamesMastered: number;
  highestLoginStreak: number;
  highestPerfectScoreStreak: number;
  achievementsUnlocked: number;
}

interface ContextType {
  stats: StatsDataType;
  setStats: (value: StatsDataType) => void;
  weeklyStats: StatsDataType;
  setWeeklyStats: (value: StatsDataType) => void;
  setStatsUserId: (value: string) => void;
  updateNavStats: (value: string) => void;
}

export const StatsContext = createContext<ContextType>({
  stats: {
    totalScore: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    totalTypingTime: 0,
    totalCoursesCompleted: 0,
    totalCoursesMastered: 0,
    totalGamesMastered: 0,
    highestLoginStreak: 0,
    highestPerfectScoreStreak: 0,
    achievementsUnlocked: 0,
  },
  setStats: () => {},
  weeklyStats: {
    totalScore: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    totalTypingTime: 0,
    totalCoursesCompleted: 0,
    totalCoursesMastered: 0,
    totalGamesMastered: 0,
    highestLoginStreak: 0,
    highestPerfectScoreStreak: 0,
    achievementsUnlocked: 0,
  },
  setWeeklyStats: () => {},
  setStatsUserId: () => {},
  updateNavStats: () => {},
});

interface PropType {
  children: React.ReactNode;
}

function ProfileStatsProvider({ children }: PropType) {
  const [statsUserId, setStatsUserId] = useState<string>();
  const [stats, setStats] = useState<StatsDataType>({
    totalScore: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    totalTypingTime: 0,
    totalCoursesCompleted: 0,
    totalCoursesMastered: 0,
    totalGamesMastered: 0,
    highestLoginStreak: 0,
    highestPerfectScoreStreak: 0,
    achievementsUnlocked: 0,
  });

  const [weeklyStats, setWeeklyStats] = useState<StatsDataType>({
    totalScore: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    totalTypingTime: 0,
    totalCoursesCompleted: 0,
    totalCoursesMastered: 0,
    totalGamesMastered: 0,
    highestLoginStreak: 0,
    highestPerfectScoreStreak: 0,
    achievementsUnlocked: 0,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateNavStats = async (userId) => {
    try {
      const response = await AccountAPI.get("/stats", {
        method: "GET",
        params: {
          userId,
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const parseRes = await response;

      if (parseRes) {
        setStats((prevStats) => ({
          ...prevStats,
          totalScore: parseRes.totalScore,
          averageWpm: parseRes.avgWpm,
          averageAccuracy: parseRes.avgAccuracy,
        }));
      } else {
        setStats({
          totalScore: 0,
          averageWpm: 0,
          averageAccuracy: 0,
          totalTypingTime: 0,
          totalCoursesCompleted: 0,
          totalCoursesMastered: 0,
          totalGamesMastered: 0,
          highestLoginStreak: 0,
          highestPerfectScoreStreak: 0,
          achievementsUnlocked: 0,
        });
      }
    } catch (err) {
      let message: string;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  useEffect(() => {
    statsUserId && updateNavStats(statsUserId);
  }, [statsUserId]);

  return (
    <StatsContext.Provider
      value={{
        stats,
        setStats,
        weeklyStats,
        setWeeklyStats,
        setStatsUserId,
        updateNavStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export default ProfileStatsProvider;
