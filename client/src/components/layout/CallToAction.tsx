import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";

function CallToAction() {
  return (
    <section className="flex w-full flex-col items-center gap-16 bg-defaultblue py-24 sm:py-16">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-around gap-12 px-5  capitalize text-white md:flex-row">
        <div className="flex max-w-[9em] flex-col gap-7  text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-5 right-[35%] h-10 w-10 rotate-45 rounded-md bg-slate-950 opacity-20"></div>
            <Icon
              icon="trophy"
              title="trophy"
              customStyle="scale-[1.65] flex"
            />
          </div>
          <h2>Earn points &amp; level up</h2>
        </div>
        <div className="flex max-w-[9em] flex-col gap-7 pt-8 text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-5 right-[35%] h-10 w-10 rotate-45 rounded-md bg-slate-950 opacity-20"></div>
            <Icon
              icon="certificate"
              title="certificates of achievement"
              customStyle="scale-[1.65] flex"
            />
          </div>
          <h2>Unlock Certificates of accomplishment</h2>
        </div>
        <div className="flex max-w-[9em] flex-col gap-7 pt-8 text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-5 right-[35%] h-10 w-10 rotate-45 rounded-md bg-slate-950 opacity-20"></div>
            <Icon
              icon="stats"
              title="progress statistics"
              customStyle="scale-[1.65] flex"
            />
          </div>
          <h2>Track progress with detailed statistics</h2>
        </div>
        <div className="flex max-w-[9em] flex-col gap-7 pt-8 text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-5 right-[35%] h-10 w-10 rotate-45 rounded-md bg-slate-950 opacity-20"></div>
            <Icon
              icon="rocket"
              title="activities to explore"
              customStyle="scale-[1.65] flex"
            />
          </div>
          <h2>Many exciting activities to explore</h2>
        </div>
      </div>
      <Link
        to="/register"
        className={`relative mx-auto inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-nunito text-xl font-normal text-white hover:scale-[1.02] hover:brightness-105`}
      >
        Sign Up Free!
      </Link>
    </section>
  );
}

export default CallToAction;
