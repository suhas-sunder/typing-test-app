function FormatFetchedStats({ data }) {
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
    data.totalTypingTimeSec ? (data.totalTypingTimeSec / (60 * 60)) % 24 : 0,
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const totalScore = parseInt(data.totalScore).toLocaleString("en"); //Format total score before saving

  return {
    avgWpm: data.avgWpm,
    avgAccuracy: data.avgAccuracy,
    totalScore,
    wordsTyped,
    totalTypingDays,
    totalTypingHours,
    totalTypingMins,
  };
}

export default FormatFetchedStats;
