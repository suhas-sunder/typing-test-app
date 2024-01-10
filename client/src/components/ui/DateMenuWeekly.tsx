import { useEffect, useState } from "react";
import Icon from "../../utils/Icon";
import SquareArrowBtn from "./SquareArrowBtn";

function DateMenuWeekly() {
  const [dateValue, setDateValue] = useState<Date>();
  const [firstDate, setFirstDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });

  const [lastDate, setLastDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });

  const handleSetDate = (date) => {
    const prevWeek = new Date(date);
    prevWeek.setDate(date.getDate() - 6);

    setFirstDate({
      day: prevWeek.getDate(),
      month: prevWeek.getMonth(),
      year: prevWeek.getFullYear(),
    });

    setLastDate({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    });
  };

  const handleLeftArrow = () => {
    const date = dateValue ? new Date(dateValue) : new Date();
    date.setDate(date.getDate() - 7);

    setDateValue(date); //Keeps track of date value being displayed
    handleSetDate(date); //Display date
  };

  const handleRightArrow = () => {
    const date = dateValue ? new Date(dateValue) : new Date();
    const currentDate = new Date();
    currentDate.setHours(date.getHours() - 24); //Set current date to 24 hrs before so that the rest of the code works as intended

    // Check if current date is reached to stop date change
    if (date < currentDate) {
      date.setDate(date.getDate() + 7);
    }

    setDateValue(date); //Keeps track of date value being displayed
    handleSetDate(date); //Display date
  };

  useEffect(() => {
    const date = new Date();
    handleSetDate(date);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="min-h-7 flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-center md:gap-2 lg:gap-4">
      <div className="flex min-w-[14.1em] items-center justify-between md:min-w-[16.3em]">
        <SquareArrowBtn handleClick={handleLeftArrow} customStyle="" />
        <div className="flex items-center justify-center gap-1 text-sm text-sky-100 md:text-base ">
          <p className="whitespace-pre">{`${months.filter(
            (_month, index) => index === firstDate.month,
          )} ${firstDate.day}`}</p>
          <Icon
            icon="horizontalLine"
            title="horizontal line icon"
            customStyle="scale-75 text-sky-200"
          />
          <p className="whitespace-pre">{`${months.filter(
            (_month, index) => index === lastDate.month,
          )} ${lastDate.day}, ${lastDate.year}`}</p>
        </div>

        <SquareArrowBtn
          handleClick={handleRightArrow}
          customStyle="rotate-180"
        />
      </div>
      <button
        type="button"
        className="min-w-7 min-h-7 flex items-center justify-center p-1 hover:scale-105 hover:text-defaultgreen"
      >
        <Icon
          icon="settingsSparkle"
          customStyle="flex"
          title="stats settings icon"
        />
      </button>
    </div>
  );
}

export default DateMenuWeekly;
