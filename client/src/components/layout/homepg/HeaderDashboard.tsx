import { useLayoutEffect, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../utils/other/Icon";
import loadable from "@loadable/component";
import CalculateLevelMilestones from "../../../utils/calculations/CalculateLevelMilestones";
import useImg from "../../hooks/useImg";
import useStats from "../../hooks/useStats";
import useUpdateWeeklyStats from "../../hooks/useUpdateWeeklyStats";
import GenerateStartEndDates from "../../../utils/calculations/CalculateStartEndDates";

const SparkleAnim = loadable(() => import("../../ui/shared/SparkleAnim"));

type SquareArrowProps = {
  customStyle: string;
  handleClick: () => void;
};

// Fetch and format weekly stats data for header
function HeaderStatsSummary() {
  const { weeklyStats } = useStats();

  return (
    <table
      className="flex w-full flex-col gap-2 font-nunito
    "
    >
      <thead className="flex w-full items-center text-[0.9rem]">
        <tr className="flex w-full">
          <th className="flex w-full flex-col items-center gap-1 normal-case">
            Typing Time (d/h/m)
          </th>
          <th className="flex w-full flex-col items-center gap-1">Avg WPM</th>
          <th className="flex w-full flex-col items-center gap-1">
            Words Typed
          </th>
          <th className="flex w-full flex-col items-center gap-1">
            Points Earned
          </th>
        </tr>
      </thead>
      <tbody className="flex w-full items-center text-sky-100">
        <tr className="flex w-full justify-center">
          <td
            title="Days:Hours:Mins"
            className="flex w-full cursor-default flex-col items-center justify-center gap-2"
          >
            {`${weeklyStats.totalTypingDays}:${weeklyStats.totalTypingHours}:${weeklyStats.totalTypingMins}`}
          </td>
          <td
            title="Words Per Minute"
            className="flex w-full cursor-default items-center justify-center gap-1"
          >
            {weeklyStats.avgWpm}
          </td>
          <td
            title="Words"
            className="flex w-full cursor-default justify-center"
          >
            {weeklyStats.wordsTyped}
          </td>
          <td
            title="Points"
            className="flex w-full  cursor-default justify-center"
          >
            {weeklyStats.totalScore}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

//Square arrow buttons for date menu
function SquareArrowBtn({ customStyle, handleClick }: SquareArrowProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${customStyle} flex cursor-pointer items-center justify-center hover:scale-105 hover:text-defaultgreen`}
    >
      <Icon
        icon="chevron"
        title="Left Arrow Button"
        customStyle="inline-flex rotate-90 text-white scale-75 md:scale-100 "
      />
      <div className="absolute flex h-6 w-6 items-center justify-center rounded-md border-2 bg-white bg-opacity-30 hover:border-defaultgreen hover:bg-defaultgreen hover:bg-opacity-50 md:h-7 md:w-7"></div>
    </button>
  );
}

//Handles weekly date adjustment and display functionality
function DateMenuWeekly() {
  const { generatedStartDate, generatedEndDate } = useMemo(
    () => GenerateStartEndDates({ numWeeksBeforeToday: 0 }),
    [],
  );

  const [numWeeksBeforeToday, setnumWeeksBeforeToday] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>(generatedStartDate);
  const [endDate, setEndDate] = useState<Date>(generatedEndDate);

  const [startSwitchingDates, setStartSwitchingDates] =
    useState<boolean>(false); //Ensures date isn't switched unnecessairly on load which causes weekly stats to update too many times unnecessairly

  useUpdateWeeklyStats({ startDate, endDate }); //update weekly stats

  const handleLeftArrow = () => {
    setnumWeeksBeforeToday((PrevState) => PrevState + 1);
    setStartSwitchingDates(true);
  };

  const handleRightArrow = () => {
    if (numWeeksBeforeToday > 0) {
      setnumWeeksBeforeToday((PrevState) =>
        PrevState - 1 <= 0 ? 0 : PrevState - 1,
      );
      setStartSwitchingDates(true);
    }
  };

  //Update start and end date by shifting it by a certain number of weeks before today.
  useEffect(() => {
    const handleShiftDate = () => {
      const { generatedStartDate, generatedEndDate } = GenerateStartEndDates({
        numWeeksBeforeToday,
      });

      setStartDate(generatedStartDate);
      setEndDate(generatedEndDate);
    };

    startSwitchingDates && handleShiftDate(); //This ensures this component doesn't run until a date switch operation has been triggered
  }, [startSwitchingDates, numWeeksBeforeToday, setStartDate, setEndDate]);

  return (
    <div className="min-h-7 flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-center md:gap-2 lg:gap-4">
      <div className="flex min-w-[14.1em] items-center justify-between md:min-w-[16.3em]">
        <SquareArrowBtn handleClick={handleLeftArrow} customStyle="" />
        <div className="flex items-center justify-center gap-1 text-sm text-sky-100 md:text-base ">
          <p className="whitespace-pre">
            {new Date(endDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}
          </p>
          <Icon
            icon="horizontalLine"
            title="horizontal line icon"
            customStyle="scale-75 text-sky-200"
          />
          <p className="whitespace-pre">
            {new Date(startDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <SquareArrowBtn
          handleClick={handleRightArrow}
          customStyle="rotate-180"
        />
      </div>
    </div>
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

  return (
    <SparkleAnim>
      <Link to="/profile/summary">
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
export default function HeaderDashboard() {
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

  useLayoutEffect(() => {
    SparkleAnim.load();
  }, []);

  return (
    <>
      <section className="relative mb-4 ml-4 mr-3 flex w-full flex-col items-center justify-center gap-5 tracking-wider sm:mb-12 sm:w-auto md:mr-2 lg:mb-4 ">
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
      <div className="hidden w-full flex-col gap-8 tracking-wide sm:flex">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="relative flex justify-center font-roboto text-[1.16rem] leading-8 text-sky-200 md:pl-3 md:text-[1.72rem] md:leading-9">
            My Weekly Summary
          </h1>
          <DateMenuWeekly />
        </div>
        <HeaderStatsSummary />
      </div>
    </>
  );
}
