import { useState } from "react";
import AccountAPI from "../api/accountAPI";

interface StatsDataType {
  totalScore: number;
  avgWpm: number;
  avgAccuracy: number;
  totalTypingTime: number;
  totalCoursesCompleted: number;
  totalCoursesMastered: number;
  totalGamesMastered: number;
  highestLoginStreak: number;
  achievementsUnlocked: number;
}

interface PropType {
  userId: string;
}

export default async function GetWeeklyStats({ userId }: PropType) {
  const [weeklyStats, setWeeklyStats] = useState<StatsDataType>({
    totalScore: 0,
    avgWpm: 0,
    avgAccuracy: 0,
    totalTypingTime: 0,
    totalCoursesCompleted: 0,
    totalCoursesMastered: 0,
    totalGamesMastered: 0,
    highestLoginStreak: 0,
    // highestPerfectScoreStreak: 0, Don't fetch this here, but can be a stat in profile dashboard
    achievementsUnlocked: 0,
  });

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
      console.log(weeklyStats, setWeeklyStats)
      // setWeeklyStats((prevStats) => ({
      //   ...prevStats,
      //   totalScore: parseRes.totalScore,
      //   averageWpm: parseRes.avgWpm,
      //   averageAccuracy: parseRes.avgAccuracy,
      // }));
    } else {
      console.log("Error: Unable to fetch weekly stats");
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
}
