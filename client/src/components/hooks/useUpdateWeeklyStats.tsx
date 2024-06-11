import { useEffect } from "react";
import GetHeaderStats from "../../utils/requests/GetHeaderStats";
import useAuth from "./useAuth";
import useStats from "./useStats";

interface PropType {
  startDate: Date;
  endDate: Date;
}

function useUpdateWeeklyStats({ startDate, endDate }: PropType) {
  const { userId } = useAuth();
  const { totalScore } = useStats(); //Since total score is updated in game over menu, using this as state dependency forces weekly stats to update too
  const { setWeeklyStats } = useStats();

  //Update stats
  useEffect(() => {
    const updateWeeklyStats = async () => {
      const data = await GetHeaderStats({
        userId,
        startDate: endDate.toUTCString(),
        endDate: startDate.toUTCString(),
      });

      const wordsTyped = Math.floor(
        data.avgWpm * (data.totalTypingTimeSec / 60),
      ).toLocaleString("en");

      const totalTypingMins = Math.floor(
        data.totalTypingTimeSec ? (data.totalTypingTimeSec / 60) % 60 : 0,
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const totalTypingDays = Math.floor(
        data.totalTypingTimeSec
          ? (data.totalTypingTimeSec / (60 * 60 * 24)) % 60
          : 0,
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const totalTypingHours = Math.floor(
        data.totalTypingTimeSec
          ? (data.totalTypingTimeSec / (60 * 60)) % 24
          : 0,
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const totalScore = parseInt(data.totalScore).toLocaleString("en"); //Format total score before saving

      setWeeklyStats({
        avgWpm: data.avgWpm,
        avgAccuracy: data.avgAccuracy,
        totalScore,
        wordsTyped,
        totalTypingDays,
        totalTypingHours,
        totalTypingMins,
      });
    };

    userId && updateWeeklyStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, userId, setWeeklyStats, totalScore]);
}

export default useUpdateWeeklyStats;
