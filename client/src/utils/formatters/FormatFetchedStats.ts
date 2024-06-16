interface DataType {
  avgWpm: number;
  totalTypingTimeSec: number;
  totalScore: string;
  avgAccuracy: number;
}

interface PropType {
  data: DataType;
}

function FormatFetchedStats({ data }: PropType) {
  const wordsTyped = Math.abs(
    Math.floor(data.avgWpm * (data.totalTypingTimeSec / 60)),
  ).toLocaleString("en");

  const totalTypingMins = Math.abs(
    Math.floor(
      data.totalTypingTimeSec ? (data.totalTypingTimeSec / 60) % 60 : 0,
    ),
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

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

  const totalScore = Math.abs(parseInt(data.totalScore))?.toLocaleString("en"); //Format total score before saving

  return {
    avgWpm: data.avgWpm.toString(),
    avgAccuracy: data.avgAccuracy.toString(),
    totalScore,
    wordsTyped,
    totalTypingDays,
    totalTypingHours,
    totalTypingMins,
  };
}

export default FormatFetchedStats;
