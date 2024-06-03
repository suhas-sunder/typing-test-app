import { useEffect } from "react";

interface PropType {
  numWeeksBeforeToday: number;
  setStartDate: (value: Date) => void;
  setEndDate: (value: Date) => void;
}

export default function useShiftDateWeekly({
  numWeeksBeforeToday,
  setStartDate,
  setEndDate,
}: PropType) {
  //Update start and end date by shifting it by a certain number of weeks before today.
  useEffect(() => {
    const daysInAWeek = 7;
    const oneDayInSeconds = 86400000;
    setStartDate(
      new Date(
        new Date().valueOf() -
          oneDayInSeconds * (numWeeksBeforeToday * daysInAWeek + daysInAWeek),
      ),
    );

    setEndDate(
      new Date(
        new Date().valueOf() -
          oneDayInSeconds * numWeeksBeforeToday * daysInAWeek,
      ),
    );
  }, [numWeeksBeforeToday, setStartDate, setEndDate]);
}

