import { useState } from "react";
import DateMenuWeekly from "../ui/DateMenuWeekly";
import HeaderStatsSummary from "./HeaderStatsSummary";

function MyWeeklySummary() {
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

  return (
    <section className="hidden w-full flex-col gap-8 tracking-wide sm:flex ">
      <div className="flex w-full flex-col items-center justify-between sm:flex-row">
        <h1 className="relative flex justify-center font-roboto text-[1.16rem] leading-8 text-sky-200 md:pl-3 md:text-[1.72rem] md:leading-9">
          My Weekly Summary
        </h1>
        <DateMenuWeekly
          firstDate={firstDate}
          setFirstDate={setFirstDate}
          lastDate={lastDate}
          setLastDate={setLastDate}
        />
      </div>
      <HeaderStatsSummary firstDate={firstDate} lastDate={lastDate} />
    </section>
  );
}

export default MyWeeklySummary;
