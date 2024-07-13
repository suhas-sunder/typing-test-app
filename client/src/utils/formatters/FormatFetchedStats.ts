interface DataType {
  totalTypingTimeSec: number;
  totalScore: number;
  totalDaysActive: number;
  totalChars: number;
  avgWPM: number;
  avgAccuracy: number;
}

interface PropType {
  data: DataType;
}

function FormatFetchedStats({ data }: PropType) {
  const wordsTyped = Math.ceil(data.totalChars / 5);

  const totalTypingMins = data.totalTypingTimeSec
    ? Math.floor((data.totalTypingTimeSec / 60) % 60)
    : 0;

  const avgWpm = Math.round(data.avgWPM).toLocaleString("en");

  const avgAccuracy = data.avgAccuracy.toFixed(1);

  const totalTypingDays = Math.abs(
    Math.floor(
      data.totalTypingTimeSec
        ? (data.totalTypingTimeSec / (60 * 60 * 24)) % 60
        : 0,
    ),
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const totalTypingHours = Math.abs(
    Math.floor(
      data.totalTypingTimeSec ? (data.totalTypingTimeSec / (60 * 60)) % 24 : 0,
    ),
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const totalScore = Math.abs(data.totalScore)?.toLocaleString("en"); //Format total score before saving

  return {
    avgAccuracy,
    avgWpm,
    totalKeysPressed: data?.totalChars?.toLocaleString("en") || "0",
    totalScore,
    totalDaysActive: data?.totalDaysActive?.toLocaleString("en") || "0",
    wordsTyped: wordsTyped?.toLocaleString("en") || "0",
    totalTypingDays,
    totalTypingHours,
    totalTypingMins: totalTypingMins.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
  };
}

export default FormatFetchedStats;
