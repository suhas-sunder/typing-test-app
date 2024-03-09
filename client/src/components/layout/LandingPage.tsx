import { Link } from "react-router-dom";
import FirstShowcase from "./FirstShowcase";
import SecondShowcase from "./SecondShowcase";
import CallToAction from "./CallToAction";

//Used by Home.tsx component
function LandingPage() {
  return (
    <>
      <FirstShowcase />
      <section className="flex w-full flex-col items-center justify-center gap-5 bg-sky-50 px-7 py-20 font-lato font-normal sm:gap-10 md:px-14 lg:px-20 ">
        <h2 className="flex w-full max-w-[1160px] justify-end font-lora text-base md:text-lg lg:text-xl">
          Why learn to type?
        </h2>
        <div className="flex w-full flex-col text-center text-[1.3rem] leading-[3.5rem] tracking-wider text-defaultblue sm:text-[1.5rem] md:text-justify md:text-[2rem] md:leading-[4.5rem] lg:max-w-[1160px] lg:text-[2.4rem] lg:leading-[5.5rem]">
          <p>
            Master the art of typing and unlock new levels of efficiency,
            productivity, and success. Our courses empower you to take your
            skills to the next level. Start practicing today and make
            improvements in no time!
          </p>
        </div>
        <Link
          to="/lessons"
          className={`relative mx-auto mt-3 inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-nunito text-base font-normal text-white hover:scale-[1.02] hover:brightness-105 sm:mt-0 sm:text-lg lg:text-xl`}
        >
          View Lessons
        </Link>
      </section>
      <SecondShowcase />
      <CallToAction />
    </>
  );
}

export default LandingPage;
