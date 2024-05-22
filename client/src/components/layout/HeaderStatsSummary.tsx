import { useContext, useEffect, useState } from "react";
import GetHeaderStats from "../../utils/GetHeaderStats";
import { AuthContext } from "../../providers/AuthProvider";

type DateType = { day: number; month: number; year: number };
interface PropType {
  firstDate: DateType;
  lastDate: DateType;
}

//Used by HeaderDashboard.tsx component
function HeaderStatsSummary({ firstDate, lastDate }: PropType) {
  const [weeklyStats, setWeeklyStats] = useState<{
    avgWpm?: string;
    avgAccuracy?: string;
    totalScore?: string;
    wordsTyped?: string;
    totalTypingMins?: string;
    totalTypingHours?: string;
    totalTypingDays?: string;
  }>({});

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const handleWeeklyStats = async () => {
      const startDate = `${firstDate.year}-${firstDate.month + 1}-${
        firstDate.day
      }`;

      const endDate = `${lastDate.year}-${lastDate.month + 1}-${lastDate.day}`;

      const data = await GetHeaderStats({ userId, startDate, endDate });

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

    userId && firstDate.year && handleWeeklyStats();
  }, [firstDate, lastDate, userId]);

  return (
    <table
      className="flex w-full flex-col gap-2 font-nunito
    "
    >
      <thead className="flex w-full items-center text-[0.9rem]">
        <tr className="flex w-full">
          <th className="flex w-full flex-col items-center gap-1 normal-case">
            Typing Time (d/h/m)
          </th>
          <th className="flex w-full flex-col items-center gap-1">Avg WPM</th>
          <th className="flex w-full flex-col items-center gap-1">
            Words Typed
          </th>
          <th className="flex w-full flex-col items-center gap-1">
            Points Earned
          </th>
        </tr>
      </thead>
      <tbody className="flex w-full items-center text-sky-100">
        <tr className="flex w-full justify-center">
          <td
            title="Days:Hours:Mins"
            className="flex w-full cursor-default flex-col items-center justify-center gap-2"
          >
            {`${weeklyStats.totalTypingDays}:${weeklyStats.totalTypingHours}:${weeklyStats.totalTypingMins}`}
          </td>
          <td
            title="Words Per Minute"
            className="flex w-full cursor-default items-center justify-center gap-1"
          >
            {weeklyStats.avgWpm}
          </td>
          <td
            title="Words"
            className="flex w-full cursor-default justify-center"
          >
            {weeklyStats.wordsTyped}
          </td>
          <td
            title="Points"
            className="flex w-full  cursor-default justify-center"
          >
            {weeklyStats.totalScore}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default HeaderStatsSummary;
