import Icon from "../../utils/Icon";
import HeaderStatsSummary from "./HeaderStatsSummary";
import DateMenuWeekly from "../ui/DateMenuWeekly";
import ProfileImageLink from "../ui/ProfileImageLink";

function HeaderDashboard() {
  return (
    <div className="flex w-full max-w-[1060px] pb-[13.5em] font-roboto capitalize text-sky-200 ">
      <section className="hidden flex-col items-center justify-center gap-6 md:flex">
        <ProfileImageLink />
        <div className="md:text-md z-10 flex flex-col items-center justify-center gap-2 lg:text-lg">
          <div className="flex items-center justify-start gap-2 ">
            <h2 className="whitespace-pre">Level:</h2>
            <p className=" text-sky-100">Seedling</p>
          </div>
          <div className="center flex items-center justify-start md:text-[0.7rem] lg:text-[0.8rem] ">
            <div className="flex items-center justify-center">
              <Icon
                icon="upgrade"
                title="Points to next milestone icon"
                customStyle="scale-75"
              />
              <p className=" whitespace-pre text-sky-200">Next Milestone:</p>
            </div>
            <p className="flex items-center justify-center pl-1 tracking-wider text-sky-100">
              4,620
              <Icon icon="trophy" customStyle="flex scale-75" />
            </p>
          </div>
        </div>
      </section>
      <section className="hidden w-full flex-col gap-8 tracking-wide md:flex ">
        <div className="flex w-full justify-between">
          <h1 className="relative flex justify-center font-roboto text-sky-200 md:pl-3 md:text-2xl lg:text-3xl">
            My Weekly Summary
          </h1>
          <DateMenuWeekly />
        </div>
        <HeaderStatsSummary />
      </section>
    </div>
  );
}

export default HeaderDashboard;
