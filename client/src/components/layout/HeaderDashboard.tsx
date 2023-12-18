import { useContext, useEffect, useState } from "react";
import { StatsContext } from "../../providers/ProfileStatsProvider";
import Icon from "../../utils/Icon";
import ProfileImageLink from "../navigation/ProfileImageLink";
import DateMenuWeekly from "../ui/DateMenuWeekly";
import HeaderStatsSummary from "./HeaderStatsSummary";

function HeaderDashboard() {
  const [level, setLevel] = useState<number>(0);
  const [nextMilestone, setNextMilestone] = useState<number>(0);
  const { totalScore } = useContext(StatsContext);

  // Calculate level and milestone
  useEffect(() => {
    const handleUpdateLevel = (totalMilestonePerLvl) => {
      const result = totalScore / totalMilestonePerLvl;

      setLevel(Math.floor(result));
      setNextMilestone(
        totalMilestonePerLvl - Math.round((result % 1) * totalMilestonePerLvl),
      );
    };

    // Determine level milestone based on total score
    if (totalScore < 1000000) {
      handleUpdateLevel(10000);
    } else if (totalScore < 5000000) {
      handleUpdateLevel(25000);
    } else if (totalScore < 10000000) {
      handleUpdateLevel(50000);
    } else if (totalScore < 100000000) {
      handleUpdateLevel(75000);
    } else {
      handleUpdateLevel(100000);
    }
  }, [totalScore]);

  return (
    <>
      <section className="relative mb-4 ml-4 mr-3 flex w-full flex-col items-center justify-center gap-4 tracking-wider sm:mb-12 sm:w-auto md:mr-2 lg:mb-3">
        <div className="relative flex min-h-[11.4em] w-[7em] cursor-pointer justify-center rounded-lg bg-slate-800 hover:scale-105 sm:min-h-[14.7em] sm:w-[9em]">
          <ProfileImageLink level={level} />
        </div>
        <div className="md:text-md z-10 flex flex-col items-center justify-center gap-2 lg:text-lg">
          <div className="flex items-center justify-start gap-2 ">
            <h2 className="whitespace-pre">Level:</h2>
            <p className=" text-sky-100">Seedling</p>
          </div>
          <div
            title="Points needed to reach next milestone"
            className="center absolute -bottom-8 flex cursor-default items-center justify-start text-[0.7rem] lg:-bottom-7 lg:text-[0.8rem]"
          >
            <div className="flex items-center justify-center">
              <Icon
                icon="upgrade"
                title="Points to next milestone icon"
                customStyle="scale-75"
              />
              <p className=" whitespace-pre text-sky-200">Next Milestone:</p>
            </div>
            <p className="flex items-center justify-center pl-1 tracking-widest text-sky-100">
              <span className="inline-flex">
                {nextMilestone.toLocaleString()}
              </span>
              <Icon icon="trophy" customStyle="inline-flex scale-75" />
            </p>
          </div>
        </div>
      </section>
      <section className="hidden w-full flex-col gap-8 tracking-wide sm:flex ">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="relative flex justify-center font-roboto text-[1.16rem] leading-8 text-sky-200 md:pl-3 md:text-[1.72rem] md:leading-9">
            My Weekly Summary
          </h1>
          <DateMenuWeekly />
        </div>
        <HeaderStatsSummary />
      </section>
    </>
  );
}

export default HeaderDashboard;
