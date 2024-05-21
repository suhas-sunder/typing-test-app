import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";

//Used by LandingPage.tsx
function CallToAction() {
  const sectionData = [
    {
      id: "trophy",
      icon: "trophy",
      iconTitle: "trophy",
      sectionTitle: <span>Earn points &amp; level up</span>,
    },
    {
      id: "certificate",
      icon: "certificate",
      iconTitle: "certificates of achievement",
      sectionTitle: <span>Unlock Certificates of accomplishment</span>,
    },
    {
      id: "stats",
      icon: "stats",
      iconTitle: "progress statistics",
      sectionTitle: <span>Track progress with detailed statistics</span>,
    },
    {
      id: "rocket",
      icon: "rocket",
      iconTitle: "activities to explore",
      sectionTitle: <span>Many exciting activities to explore</span>,
    },
  ];

  return (
    <section className="flex w-full flex-col items-center gap-16 bg-defaultblue py-24 sm:py-16 ">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-around gap-12 px-5 capitalize leading-6 tracking-widest text-white md:flex-row">
        {sectionData.map((data) => (
          <div
            key={data.id}
            className="flex min-h-[8em] max-w-[9em] flex-col gap-7 text-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute -top-5 right-[35%] h-10 w-10 rotate-45 rounded-md bg-slate-950 opacity-20"></div>
              <Icon
                icon={data.icon}
                title={data.iconTitle}
                customStyle="scale-[1.65] flex"
              />
            </div>
            <h2>{data.sectionTitle}</h2>
          </div>
        ))}
      </div>
      <Link
        to="/register"
        className={`relative mx-auto inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-nunito text-xl font-normal tracking-wide text-white hover:scale-[1.02] hover:brightness-105`}
      >
        Sign Up Free!
      </Link>
    </section>
  );
}

export default CallToAction;
