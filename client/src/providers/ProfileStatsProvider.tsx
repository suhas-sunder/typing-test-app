import React, { createContext, useEffect, useState } from "react";
import AccountAPI from "../api/accountAPI";

interface TestDataType {
  correct: number;
  mistakes: number;
  wpm: number;
  cpm: number;
  accuracy: number;
  minutesLeft: number;
  secondsLeft: number;
}

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
  handleUpdateDatabase: (
    stats: TestDataType,
    testTime: number,
    testName: string,
    userId: string,
    difficultySettings: string[] | boolean,
    difficultyName: string,
    difficultyScore: number,
  ) => void;
  setStatsUserId: (value: string) => void;
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
  handleUpdateDatabase: () => {},
  setStatsUserId: () => {},
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

  const handleUpdateDatabase = async (
    stats,
    testTime,
    testName,
    userId,
    difficultySettings,
    difficultyName,
    difficultyScore,
  ) => {
    const user_id = userId;
    const test_name = testName;
    const total_chars = stats.correct + stats.mistakes;
    const correct_chars = stats.correct;
    const misspelled_chars = stats.mistakes;
    const performance_score = 5; //Needs to be calculated once I decide how
    const test_accuracy = stats.accuracy;
    const test_time_sec = testTime;
    const screen_size_info = `screen height: ${window.screen.height}px + screen width: ${window.screen.width}px`;
    const wpm = stats.wpm;
    const cpm = stats.cpm;
    const difficulty_name = difficultyName;
    const difficulty_settings = difficultySettings;
    const test_score = Math.ceil(
      difficultyScore *
        (1 + (testTime / (60 * 10) + wpm / 100)) *
        (test_accuracy / 100) *
        (wpm / 40 > 1 ? 1 : wpm / 40),
    ); //Base difficulty score times 1 min + test time/Max test time + wpm % * penalize wpm below 40 so that if user doesn't type much or is too slow, they don't score too high * test accuracy %.

    try {
      const response = await AccountAPI.post("/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          user_id,
          test_name,
          total_chars,
          correct_chars,
          misspelled_chars,
          test_accuracy,
          test_time_sec,
          screen_size_info,
          wpm,
          cpm,
          test_score,
          performance_score,
          difficulty_name,
          difficulty_settings,
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
        getStats(userId);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getStats = async (userId) => {
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
    statsUserId && getStats(statsUserId);
  }, [statsUserId]);

  return (
    <StatsContext.Provider
      value={{
        stats,
        setStats,
        weeklyStats,
        setWeeklyStats,
        handleUpdateDatabase,
        setStatsUserId,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export default ProfileStatsProvider;
