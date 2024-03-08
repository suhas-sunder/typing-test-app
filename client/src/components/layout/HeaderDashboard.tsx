import { useContext, useEffect, useState } from "react";
import { StatsContext } from "../../providers/StatsProvider";
import Icon from "../../utils/Icon";
import ProfileImageLink from "../navigation/ProfileImageLink";
import CalculateLevelMilestones from "../../utils/CalculateLevelMilestones";
import MyWeeklySummary from "./MyWeeklySummary";

//Used by Home.tsx component
function HeaderDashboard() {
  const [level, setLevel] = useState<number>(0);
  const [nextMilestone, setNextMilestone] = useState<number>(0);
  const { totalScore } = useContext(StatsContext);

  // Calculate level and milestone
  useEffect(() => {
    const handleLevelMilestone = async () => {
      const { level, milestone } = await CalculateLevelMilestones({
        totalScore,
      });

      setLevel(level);
      setNextMilestone(milestone);
    };

    handleLevelMilestone();
  }, [totalScore]);

  return (
    <>
      <section className="relative mb-4 ml-4 mr-3 flex w-full flex-col items-center justify-center gap-5 tracking-wider sm:mb-12 sm:w-auto md:mr-2 lg:mb-4">
        <div className="relative flex min-h-[11.4em] max-w-[12em] cursor-pointer justify-center rounded-xl bg-slate-800 px-[7px] pb-8 pt-[9px] hover:scale-105 sm:min-h-[14.7em] sm:w-[12em]">
          <ProfileImageLink level={level} />
        </div>
        <div className="md:text-md z-10 flex flex-col items-center justify-center gap-2 md:mb-3 lg:text-lg">
          <div className="flex items-center justify-start gap-2 ">
            <h2 className="whitespace-pre">Mastery:</h2>
            <p className=" text-sky-100">Novice</p>
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
      <MyWeeklySummary />
    </>
  );
}

export default HeaderDashboard;
