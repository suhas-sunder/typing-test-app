import useLifetimeStats from "../../hooks/useUpdateLifetimeStats";
import useLevelMastery from "../../hooks/useLevelMastery";
import ProfileImg from "../shared/ProfileImg";
import HeaderStatsSummary from "../shared/HeaderStatsSummary";


//Displays dashboard with weekly stats when user is logged in
//Used by Home.tsx
export default function ProfileHeaderDashboard() {
  const { level, nextMilestone, masteryName, lifetimeStats } =
    useLevelMastery();

  useLifetimeStats();


  return (
    <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-0">
      <ProfileImg
        level={level}
        nextMilestone={nextMilestone}
        redirectUrl={"/profile/img"}
        mastery={masteryName}
      />
      <div className=" flex w-full flex-col gap-5 tracking-wide md:gap-6">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="relative flex justify-center gap-1 font-roboto text-[1.72rem] leading-8 text-sky-200 sm:mb-0 sm:text-[1.16rem] md:pl-3 md:text-[1.72rem] md:leading-9">
            <span className="hidden md:flex">My</span> <span>Lifetime</span>{" "}
            <span>Summary</span>
          </h1>
        </div>
        <HeaderStatsSummary userStats={lifetimeStats} />
      </div>
    </div>
  );
}
