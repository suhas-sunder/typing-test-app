import styles from "../../styles/global.module.css";
import CatTyping from "../../assets/images/cat_typing.png";
import CatTypingWebp from "../../assets/images/cat_typing.webp";
import Trophy from "../../assets/images/trophy.png";
import TrophyWebp from "../../assets/images/trophy.webp";
import ControllerWithLetters from "../../assets/images/controller_with_letters.png";
import ControllerWithLettersWebp from "../../assets/images/controller_with_letters.webp";
import DogsTyping from "../../assets/images/dogs_typing.png";
import DogsTypingWebp from "../../assets/images/dogs_typing.webp";

function SecondShowcase() {
  return (
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
            covered. Explore our educational tips &amp; articles to enrich your
            typing literacy &amp; elevate your digital skills.{" "}
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
            Celebrate your milestones &amp; victories by unlocking achievements
            that tell a unique story of your journey towards typing mastery. So,
            keep typing, keep achieving, &amp; let the accolades roll in.{" "}
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
  );
}

export default SecondShowcase;
