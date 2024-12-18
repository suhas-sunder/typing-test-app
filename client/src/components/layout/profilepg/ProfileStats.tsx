import useAuth from "../../hooks/useAuth";
import useLoadAnimation from "../../hooks/useLoadAnimation";
import BestStats from "../shared/BestStats";

function ProfileStatsMenu() {
  return (
    <ul className="top-1 grid w-full grid-cols-2 items-center  justify-between gap-6 px-2 text-center font-nunito tracking-widest sm:px-12 md:absolute md:grid-cols-4">
      {/* <h1 className="text-3xl">All time best stats across the board!</h1> */}
      <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-defaultblue px-5 py-3 text-white hover:bg-defaultblue hover:text-white">
        Speed Test
      </li>
      {/* <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-slate-200 px-5 py-3 text-slate-950 hover:bg-defaultblue hover:text-white">
        Lessons
      </li>
      <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-slate-200 px-5 py-3 text-slate-950 hover:bg-defaultblue hover:text-white">
        Games
      </li>
      <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-slate-200 px-5 py-3 text-slate-950 hover:bg-defaultblue hover:text-white">
        All
      </li> */}
    </ul>
  );
}

//Used by Profile.tsx component
export default function ProfileStats() {
  const { userId } = useAuth();

  const { fadeAnim } = useLoadAnimation();

  return (
    <div
      id="profile-img"
      className={`${fadeAnim} flex w-full -translate-y-6 flex-col items-center justify-center gap-10`}
    >
      <div className="flex w-full flex-col  items-center justify-center gap-12 text-center">
        <ProfileStatsMenu />
        <h2 className="mt-24 text-3xl">All time best stats for Speed Test!</h2>
      </div>

      <div className="flex min-h-[68em] w-full flex-col items-center justify-center gap-5">
        {/* <div>Print option for printing page or saving as pdf</div> */}
        <BestStats userId={userId} testName="speed-test" />
        {/* <div>Display certificate here & provide options for download</div> */}
        <h3 className="font-lora text-xl tracking-widest text-defaultblue underline underline-offset-8 sm:no-underline">
          Certificate
        </h3>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}
