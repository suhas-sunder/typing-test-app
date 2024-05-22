import { useContext } from "react";
import BestStats from "./BestStats";
import { AuthContext } from "../../providers/AuthProvider";

//Used by Profile.tsx component
export default function ProfileStats() {
  const { userId } = useContext(AuthContext);

  return (
    <div
      id="profile-img"
      className="flex w-full -translate-y-6 flex-col items-center justify-center gap-10"
    >
      <header className="flex w-full max-w-[80%] flex-col items-center justify-center gap-12">
        <ul className="grid w-full grid-cols-2 items-center justify-between gap-x-4 gap-y-5 text-center sm:grid-cols-4">
          <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl border-2 py-3 text-slate-950 hover:border-sky-500 hover:text-sky-500 sm:col-span-2">
            Custom
          </li>
          <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl border-2 py-3 text-slate-950 hover:border-sky-500 hover:text-sky-500 sm:col-span-2">
            Troubled Keys
          </li>
          <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl border-2 py-3 text-slate-950 hover:border-sky-500  hover:text-sky-500">
            Overall
          </li>
          <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl border-2 border-sky-500 py-3 text-sky-500  hover:border-sky-500 hover:text-sky-500">
            Speed Test
          </li>
          <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl border-2 py-3 text-slate-950 hover:border-sky-500 hover:text-sky-500">
            Lessons
          </li>
          <li className="cursor-pointer rounded-tl-2xl rounded-tr-2xl border-2 py-3 text-slate-950 hover:border-sky-500 hover:text-sky-500">
            Games
          </li>
        </ul>
        {/* <h1 className="text-3xl">All time best stats across the board!</h1> */}
        <h1 className="text-3xl">All time best stats for Speed Test!</h1>
      </header>

      <main className="flex w-full flex-col items-center justify-center gap-5">
        <div>Print option for printing page or saving as pdf</div>
        <BestStats userId={userId} testName="speed-test" />
        <div>Display certificate here & provide options for download</div>
      </main>
    </div>
  );
}
