import { useLayoutEffect, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetHeaderStats from "../../../utils/requests/GetHeaderStats";
import useAuth from "../../hooks/useAuth";
import Icon from "../../../utils/other/Icon";
import loadable from "@loadable/component";
import { ImageContext } from "../../../providers/ImageProvider";
import CalculateLevelMilestones from "../../../utils/calculations/CalculateLevelMilestones";
import { StatsContext } from "../../../providers/StatsProvider";
const SparkleAnim = loadable(() => import("../../ui/SparkleAnim"));

type DateType = { day: number; month: number; year: number };

interface PropType {
  firstDate: DateType;
  lastDate: DateType;
  setFirstDate?: (value: DateType) => void;
  setLastDate?: (value: DateType) => void;
}

type SquareArrowProps = {
  customStyle: string;
  handleClick: () => void;
};

// Fetch and format weekly stats data for header
function HeaderStatsSummary({ firstDate, lastDate }: PropType) {
  const [weeklyStats, setWeeklyStats] = useState<{
    avgWpm?: string;
    avgAccuracy?: string;
    totalScore?: string;
    wordsTyped?: string;
    totalTypingMins?: string;
    totalTypingHours?: string;
    totalTypingDays?: string;
  }>({});

  const { userId } = useAuth();

  useEffect(() => {
    const handleWeeklyStats = async () => {
      const startDate = `${firstDate.year}-${firstDate.month + 1}-${
        firstDate.day
      }`;

      const endDate = `${lastDate.year}-${lastDate.month + 1}-${lastDate.day}`;

      const data = await GetHeaderStats({ userId, startDate, endDate });

      const wordsTyped = Math.floor(
        data.avgWpm * (data.totalTypingTimeSec / 60),
      ).toLocaleString("en");

      const totalTypingMins = Math.floor(
        data.totalTypingTimeSec ? (data.totalTypingTimeSec / 60) % 60 : 0,
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const totalTypingDays = Math.floor(
        data.totalTypingTimeSec
          ? (data.totalTypingTimeSec / (60 * 60 * 24)) % 60
          : 0,
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const totalTypingHours = Math.floor(
        data.totalTypingTimeSec
          ? (data.totalTypingTimeSec / (60 * 60)) % 24
          : 0,
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const totalScore = parseInt(data.totalScore).toLocaleString("en"); //Format total score before saving

      setWeeklyStats({
        avgWpm: data.avgWpm,
        avgAccuracy: data.avgAccuracy,
        totalScore,
        wordsTyped,
        totalTypingDays,
        totalTypingHours,
        totalTypingMins,
      });
    };

    userId && firstDate.year && handleWeeklyStats();
  }, [firstDate, lastDate, userId]);

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
function DateMenuWeekly({
  firstDate,
  lastDate,
  setFirstDate,
  setLastDate,
}: PropType) {
  const [dateValue, setDateValue] = useState<Date>();

  const handleSetDate = (date) => {
    if (!setFirstDate || !setLastDate) return; //Required due to state update fcn being conditional in prop type

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

//Displays profile image and user level info
function ProfileImageLink({ level }) {
  const { imageData } = useContext(ImageContext);
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
  const { totalScore } = useContext(StatsContext);
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
          <DateMenuWeekly
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
          />
        </div>
        <HeaderStatsSummary firstDate={firstDate} lastDate={lastDate} />
      </div>
    </>
  );
}
