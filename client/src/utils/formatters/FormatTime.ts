function FormatTime(totalTimeSec) {
  const hours = Math.floor(totalTimeSec / 3600).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const minutes = Math.floor((totalTimeSec % 3600) / 60).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    },
  );
  const seconds = Math.floor((totalTimeSec % 3600) % 60).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    },
  );

  return { hours, minutes, seconds };
}

export default FormatTime;
