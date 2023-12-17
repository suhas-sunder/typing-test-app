import React, { createContext, useState } from "react"; 

interface ContextType {
  totalScore: number;
  setTotalScore: (value: number) => void;
}

export const StatsContext = createContext<ContextType>({
  totalScore: 0,
  setTotalScore: () => {},
});

interface PropType {
  children: React.ReactNode;
}

function ProfileStatsProvider({ children }: PropType) {
  const [totalScore, setTotalScore] = useState<number>(0);

  
  // interface StatsDataType {
  //   totalScore: number;
  //   averageWpm: number;
  //   averageAccuracy: number;
  //   totalTypingTime: number;
  //   totalCoursesCompleted: number;
  //   totalCoursesMastered: number;
  //   totalGamesMastered: number;
  //   highestLoginStreak: number;
  //   highestPerfectScoreStreak: number;
  //   achievementsUnlocked: number;
  // }

  // const [stats, setStats] = useState<StatsDataType>({
  //   totalScore: 0,
  //   averageWpm: 0,
  //   averageAccuracy: 0,
  //   totalTypingTime: 0,
  //   totalCoursesCompleted: 0,
  //   totalCoursesMastered: 0,
  //   totalGamesMastered: 0,
  //   highestLoginStreak: 0,
  //   highestPerfectScoreStreak: 0,
  //   achievementsUnlocked: 0,
  // });

  // const [weeklyStats, setWeeklyStats] = useState<StatsDataType>({
  //   totalScore: 0,
  //   averageWpm: 0,
  //   averageAccuracy: 0,
  //   totalTypingTime: 0,
  //   totalCoursesCompleted: 0,
  //   totalCoursesMastered: 0,
  //   totalGamesMastered: 0,
  //   highestLoginStreak: 0,
  //   highestPerfectScoreStreak: 0,
  //   achievementsUnlocked: 0,
  // });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const updateNavStats = async (userId) => {
  //   try {
  //     const response = await AccountAPI.get("/stats", {
  //       method: "GET",
  //       params: {
  //         userId,
  //       },
  //     })
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     const parseRes = await response;

  //     if (parseRes) {
  //       setStats((prevStats) => ({
  //         ...prevStats,
  //         totalScore: parseRes.totalScore,
  //         averageWpm: parseRes.avgWpm,
  //         averageAccuracy: parseRes.avgAccuracy,
  //       }));
  //     } else {
  //       setStats({
  //         totalScore: 0,
  //         averageWpm: 0,
  //         averageAccuracy: 0,
  //         totalTypingTime: 0,
  //         totalCoursesCompleted: 0,
  //         totalCoursesMastered: 0,
  //         totalGamesMastered: 0,
  //         highestLoginStreak: 0,
  //         highestPerfectScoreStreak: 0,
  //         achievementsUnlocked: 0,
  //       });
  //     }
  //   } catch (err) {
  //     let message: string;

  //     if (err instanceof Error) {
  //       message = err.message;
  //     } else {
  //       message = String(err);
  //     }

  //     console.error(message);
  //   }
  // };

  return (
    <StatsContext.Provider
      value={{
        totalScore,
        setTotalScore,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export default ProfileStatsProvider;
