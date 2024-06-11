import { useLayoutEffect, useEffect, useState, useMemo } from "react";
import Icon from "../../../utils/other/Icon";
import CalculateLevelMilestones from "../../../utils/calculations/CalculateLevelMilestones";
import useImg from "../../hooks/useImg";
import useStats from "../../hooks/useStats";
import loadable from "@loadable/component";
import { Link } from "react-router-dom";
import useLifetimeStats from "../../hooks/useUpdateLifetimeStats";

const SparkleAnim = loadable(() => import("../../ui/shared/SparkleAnim"));

// Fetch and format weekly stats data for header
function HeaderStatsSummary() {
  const {lifetimeStats} = useStats()

useLifetimeStats()

  return (
    <table
      className="flex w-full flex-col gap-1 font-nunito md:gap-2
    "
    >
      <thead className="flex w-full items-center text-[0.9rem] text-xs md:text-base">
        <tr className="flex w-full">
          <th className="flex w-full flex-col items-center gap-2 normal-case  md:gap-0">
            Typing Time <span className="flex text-[.7rem]">(dd:hh:mm)</span>
          </th>
          <th className="flex w-full flex-col items-center gap-2 md:gap-0">
            Avg WPM <span className="flex text-[.7rem]">(words per min)</span>
          </th>
          <th className="flex w-full flex-col items-center gap-2 md:gap-0">
            Words Typed <span className="flex text-[.7rem]">(Words)</span>
          </th>
          <th className="flex w-full flex-col items-center gap-2 md:gap-0">
            Points Earned <span className="flex text-[.7rem]">(Points)</span>
          </th>
        </tr>
      </thead>
      <tbody className="mt-1 flex w-full items-center text-xs text-sky-100 md:-mt-1 md:text-base">
        <tr className="flex w-full justify-center">
          <td
            title="Days:Hours:Mins"
            className="flex w-full cursor-default flex-col items-center justify-center"
          >
            {`${lifetimeStats?.totalTypingDays || "00"}:${
              lifetimeStats?.totalTypingHours || "00"
            }:${lifetimeStats?.totalTypingMins || "00"}`}
          </td>
          <td
            title="Words Per Minute"
            className="flex w-full cursor-default items-center justify-center"
          >
            {lifetimeStats?.avgWpm || "0"}
          </td>
          <td
            title="Words"
            className="flex w-full cursor-default justify-center"
          >
            {lifetimeStats?.wordsTyped || "0"}
          </td>
          <td
            title="Points"
            className="flex w-full  cursor-default justify-center"
          >
            {lifetimeStats?.totalScore || "0"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

//Displays profile image and user level info
function ProfileImageLink({ level }) {
  const { imageData } = useImg();
  const [profileImgURL, setProfileImgURL] = useState<string>("");

  useLayoutEffect(() => {
    const savedImgURL = imageData.profile_pathname;
    if (savedImgURL && profileImgURL !== savedImgURL) {
      setProfileImgURL(
        `https://www.honeycombartist.com${imageData.profile_pathname}`,
      );
    } else {
      setProfileImgURL(
        "https://www.honeycombartist.com/origami-style%2Fkitten%2Fkitten",
      );
    }
  }, [imageData, profileImgURL]);

  useLayoutEffect(() => {
    SparkleAnim.load();
  }, []);

  return (
    <SparkleAnim>
      <Link to="/profile/img">
        <picture className="flex  min-h-[190px] min-w-[144px]">
          <source srcSet={`${profileImgURL}.webp`} type="image/webp"></source>
          <img
            src={`${profileImgURL}.png`}
            alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
            className={`relative flex w-full rounded-lg border-slate-800 drop-shadow-lg`}
            width={144}
            height={190}
          />
        </picture>
        <p className="absolute -bottom-6 w-full rounded-full text-center text-[0.75rem] tracking-wider">
          Level: {level}
        </p>
      </Link>
    </SparkleAnim>
  );
}

//Displays dashboard with weekly stats when user is logged in
//Used by Home.tsx
export default function ProfileHeaderDashboard() {
  const [level, setLevel] = useState<number>(0);
  const [nextMilestone, setNextMilestone] = useState<number>(0);
  const { totalScore } = useStats();

  const levelMilestones = useMemo(
    () =>
      CalculateLevelMilestones({
        totalScore,
      }),
    [totalScore],
  );

  // Calculate level and milestone
  useEffect(() => {
    const handleLevelMilestone = () => {
      const { level, milestone } = levelMilestones;

      setLevel(level);
      setNextMilestone(milestone);
    };

    handleLevelMilestone();
  }, [levelMilestones, totalScore]);

  return (
    <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-0">
      <section className="relative mb-4 ml-4 mr-3 flex w-full flex-col items-center justify-center gap-5 tracking-wider sm:mb-12 sm:w-auto md:mr-2 lg:mb-4 ">
        <div className="relative flex min-h-[11.4em] max-w-[12em] justify-center rounded-xl bg-slate-800 px-[7px] pb-8 pt-[9px] hover:scale-105 sm:min-h-[14.7em] sm:w-[12em]">
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
      <div className=" flex w-full flex-col gap-5 tracking-wide md:gap-6">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="relative flex justify-center gap-1 font-roboto text-[1.16rem] leading-8 text-sky-200 md:pl-3 md:text-[1.72rem] md:leading-9">
            <span className="hidden md:flex">My</span> <span>Lifetime</span>{" "}
            <span>Summary</span>
          </h1>
        </div>
        <HeaderStatsSummary />
      </div>
    </div>
  );
}
