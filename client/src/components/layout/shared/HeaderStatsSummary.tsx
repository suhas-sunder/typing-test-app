
export default function HeaderStatsSummary({userStats}) {

  return (
    <ul className="grid w-full grid-cols-2 items-center justify-center gap-y-8 font-nunito text-[0.9rem] sm:grid-cols-4 md:gap-2 md:text-base">
      <li className="flex w-full flex-col items-center gap-2 normal-case  md:gap-0">
        Typing Time <span className="flex text-[.7rem]">(dd:hh:mm)</span>
        <div>
          {" "}
          {`${userStats?.totalTypingDays || "00"}:${
            userStats?.totalTypingHours || "00"
          }:${userStats?.totalTypingMins || "00"}`}
        </div>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Avg WPM <span className="flex text-[.7rem]">(words per min)</span>
        <div>{userStats?.avgWpm || "0"}</div>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Words Typed <span className="flex text-[.7rem]">(Words)</span>
        <div>{userStats?.wordsTyped || "0"}</div>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Points Earned <span className="flex text-[.7rem]">(Points)</span>
        <div>{userStats?.totalScore || "0"}</div>
      </li>
    </ul>
  );
}