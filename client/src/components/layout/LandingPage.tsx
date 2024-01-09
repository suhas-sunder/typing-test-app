import { Link } from "react-router-dom";
import styles from "../../styles/global.module.css";
import CatTyping from "../../assets/images/cat_typing.png";
import CatTypingWebp from "../../assets/images/cat_typing.webp";
import Trophy from "../../assets/images/trophy.png";
import TrophyWebp from "../../assets/images/trophy.webp";
import ControllerWithLetters from "../../assets/images/controller_with_letters.png";
import ControllerWithLettersWebp from "../../assets/images/controller_with_letters.webp";
import DogsTyping from "../../assets/images/dogs_typing.png";
import DogsTypingWebp from "../../assets/images/dogs_typing.webp";
import Icon from "../../utils/Icon";
import LandingPageFirstShowcase from "./LandingPageFirstShowcase";

function LandingPage() {
  // const secondShowcaseData = [];

  return (
    <>
      <LandingPageFirstShowcase />
      <section className="flex w-full flex-col items-center justify-center gap-5 bg-sky-50 px-7 py-20 font-lato font-normal sm:gap-10 md:px-14 lg:px-20 ">
        <h2 className="flex w-full max-w-[1160px] justify-end font-lora text-base md:text-lg lg:text-xl">
          Why learn to type?
        </h2>
        <div className="flex w-full flex-col text-center text-[1.3rem] leading-[3.5rem] tracking-wider text-defaultblue sm:text-[1.5rem] md:text-justify md:text-[2rem] md:leading-[4.5rem] lg:max-w-[1160px] lg:text-[2.4rem] lg:leading-[5.5rem]">
          <p>
            Mastering the art of typing is a valuable skill that can serve as an
            asset in various aspects of your life. Our courses empower you to
            take your skills to the next level. With just a few minutes of daily
            investment, you'll notice improvements in no time!
          </p>
        </div>
        <Link
          to="/lessons"
          className={`relative mx-auto mt-3 inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-nunito text-base font-normal text-white hover:scale-[1.02] hover:brightness-105 sm:mt-0 sm:text-lg lg:text-xl`}
        >
          View Lessons
        </Link>
      </section>
      <section className="mb-20 mt-16 flex w-full flex-col items-center gap-32 px-14 sm:gap-52 ">
        <div className="flex w-full max-w-[1060px] flex-col items-center justify-between gap-20 sm:flex-row-reverse sm:gap-10">
          <div className="relative flex ">
            <div className="absolute -right-5 -top-5 flex h-[14.5em] w-[16.75em] flex-col justify-between overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 brightness-[97%] sm:h-[22em] sm:w-[25em]">
              <div className="flex h-8 w-full bg-slate-950 opacity-75"></div>
              <div className="flex h-6 w-full bg-slate-900 opacity-20"></div>
            </div>
            <div className="relative flex h-[14.5em] w-[16.75em] items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 sm:h-[22em] sm:w-[25em]">
              <div className="absolute top-0 flex h-8 w-full bg-slate-800 opacity-70"></div>
              <div className="absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              <picture>
                <source
                  srcSet={ControllerWithLettersWebp}
                  type="image/webp"
                ></source>
                <img
                  src={ControllerWithLetters}
                  alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                  width={190}
                  height={245}
                  className={`${styles.image} mb-2 flex scale-[0.65] rounded-lg md:scale-100`}
                />
              </picture>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:gap-10 lg:text-start">
            <h2 className="font-lora text-2xl font-bold capitalize lg:text-3xl">
              Gamify your learning
            </h2>
            <p className="flex max-w-[25em] font-lato text-base font-normal leading-8 lg:text-lg">
              Our collection of fun &amp; engaging typing games is the heart of
              the action. Join us for a down-to-earth, game-filled journey to
              improve your typing speed and accuracy.
            </p>
          </div>
        </div>
        <div className="flex w-full max-w-[1060px] flex-col items-center justify-between gap-20 sm:flex-row sm:gap-10">
          <div className="relative flex ">
            <div className="absolute -top-5 right-5 flex h-[14.5em] w-[16.75em] flex-col justify-between overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 brightness-[97%] md:h-[22em] md:w-[25em]">
              <div className="flex h-8 w-full bg-defaultblue opacity-75"></div>
              <div className="flex h-6 w-full bg-slate-900 opacity-20"></div>
            </div>
            <div className="relative flex h-[14.5em] w-[16.75em] items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 md:h-[22em] md:w-[25em]">
              <div className="absolute top-0 flex h-8 w-full bg-defaultblue opacity-70"></div>
              <div className="absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              <picture>
                <source srcSet={CatTypingWebp} type="image/webp"></source>
                <img
                  src={CatTyping}
                  alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                  width={190}
                  height={245}
                  className={`${styles.image} mb-2 flex scale-[0.65] rounded-lg md:scale-100`}
                />
              </picture>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:gap-10 lg:text-start">
            <h2 className="font-lora text-2xl font-bold capitalize lg:text-3xl">
              Educational articles &amp; tips
            </h2>
            <p className="flex max-w-[25em] font-lato text-base font-normal leading-8 lg:text-lg">
              From expert advice on improving typing speed to in-depth articles
              exploring the nuances of effective keyboard usage, we've got you
              covered. Explore our educational tips &amp; articles to enrich
              your typing literacy &amp; elevate your digital skills.{" "}
            </p>
          </div>
        </div>
        <div className="flex w-full max-w-[1060px] flex-col items-center justify-between gap-20 sm:flex-row-reverse sm:gap-10">
          <div className="relative flex ">
            <div className="absolute -right-5 top-5 flex h-[14.5em] w-[16.75em] flex-col justify-between overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 brightness-[97%] md:h-[22em] md:w-[25em]">
              <div className="flex h-8 w-full bg-defaultblue opacity-75"></div>
              <div className="flex h-6 w-full bg-slate-900 opacity-20"></div>
            </div>
            <div className="relative flex h-[14.5em] w-[16.75em] items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 md:h-[22em] md:w-[25em]">
              <div className="absolute top-0 flex h-8 w-full bg-defaultblue opacity-70"></div>
              <div className="absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>

              <picture>
                <source srcSet={TrophyWebp} type="image/webp"></source>
                <img
                  src={Trophy}
                  alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                  width={190}
                  height={245}
                  className={`${styles.image} mb-2 flex scale-[0.65] rounded-lg md:scale-100`}
                />
              </picture>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:gap-10 lg:text-start">
            <h2 className="font-lora text-2xl font-bold capitalize lg:text-3xl">
              Achievements
            </h2>
            <p className="flex max-w-[25em] font-lato text-base font-normal leading-8 lg:text-lg">
              Celebrate your milestones &amp; victories by unlocking
              achievements that tell a unique story of your journey towards
              typing mastery. So, keep typing, keep achieving, &amp; let the
              accolades roll in.{" "}
            </p>
          </div>
        </div>
        <div className="flex w-full max-w-[1060px] flex-col items-center justify-between gap-20 sm:flex-row sm:gap-10">
          <div className="relative flex ">
            <div className="absolute right-5 top-5 flex h-[14.5em] w-[16.75em] flex-col justify-between overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 brightness-[97%] md:h-[22em] md:w-[25em]">
              <div className="flex h-8 w-full bg-defaultblue opacity-75"></div>
              <div className="flex h-6 w-full bg-slate-900 opacity-20"></div>
            </div>
            <div className="relative flex h-[14.5em] w-[16.75em] items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 md:h-[22em] md:w-[25em]">
              <div className="absolute top-0 flex h-8 w-full bg-defaultblue opacity-70"></div>
              <div className="absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              <picture>
                <source srcSet={DogsTypingWebp} type="image/webp"></source>
                <img
                  src={DogsTyping}
                  alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                  width={190}
                  height={245}
                  className={`${styles.image} mb-2 flex scale-[0.65] rounded-lg md:scale-100`}
                />
              </picture>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:gap-10 lg:text-start">
            <h2 className="font-lora text-2xl font-bold capitalize lg:text-3xl">
              Leaderboard
            </h2>
            <p className="flex max-w-[25em] font-lato text-base font-normal leading-8 lg:text-lg">
              Step up to the challenge &amp; experience the thrill of real-time
              competition. Engage in friendly rivalry as you measure your points
              against fellow typists on a weekly, monthly, yearly, &amp; overall
              basis.
            </p>
          </div>
        </div>
      </section>
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
    </>
  );
}

export default LandingPage;
