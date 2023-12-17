import Icon from "../../utils/Icon";
import HeaderStatsSummary from "./HeaderStatsSummary";
import DateMenuWeekly from "../ui/DateMenuWeekly";
import ProfileImageLink from "../ui/ProfileImageLink";
import { useContext, useEffect, useState } from "react";
import { StatsContext } from "../../providers/ProfileStatsProvider";

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
      <section className="flex w-full flex-col items-center justify-center gap-4 tracking-wider sm:w-auto">
        <ProfileImageLink level={level} />
        <div className="md:text-md z-10 flex flex-col items-center justify-center gap-2 lg:text-lg">
          <div className="flex items-center justify-start gap-2 ">
            <h2 className="whitespace-pre">Level:</h2>
            <p className=" text-sky-100">Seedling</p>
          </div>
          <div
            title="Points needed to reach next milestone"
            className="center flex cursor-default items-center justify-start md:text-[0.7rem] lg:text-[0.8rem]"
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
        <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row md:justify-between">
          <h1 className="relative flex justify-center font-roboto text-[1.4rem] leading-8 text-sky-200 md:pl-3 lg:text-3xl">
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
