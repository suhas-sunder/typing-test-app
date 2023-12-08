import Icon from "../../utils/Icon";
import { Link } from "react-router-dom";
import Customizability from "../../assets/images/customizability.png";
import Phone from "../../assets/images/phone.png";
import Learning from "../../assets/images/learning.png";
import styles from "../../styles/global.module.css";
import { useRef, useEffect } from "react";
import HexToCSSFilter from "../../utils/HexToCSSFilter";

function LandingPage() {
  const divsRef = useRef<HTMLDivElement[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  const firstImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const hexCode = [
      "#be185d", //Pink 700
      "#9f1239", //Rose 800
      "#059669", //Emerald 600
      "#0a0a0a", //Black
      "#334155", //Slate 700
      "#c2410c", //Orange 700
      "#ca8a04", //Yellow 600
      "#9333ea", //Purple 600
      "#422006", //Yellow 950 (brown)
      "#0f766e", //Teal 700
    ];

    const handleAddFilter = (index: number) => {
      HexToCSSFilter({
        hexColourCode: hexCode[index],
        elementRef: imgRef.current,
      });

      // Scale up colour pallet selection
      divsRef.current[index].style.transform = "scale(1.3,1.3)";

      // Scale down colour previous pallet selection
      if (index - 1 >= 0) {
        divsRef.current[index - 1].style.transform = "scale(1,1)";
      }

      if (index === 0) {
        divsRef.current[divsRef.current.length - 1].style.transform =
          "scale(1,1)";
      }
    };

    let index: number = 1; //Starting index to cycle through colour pallet divs

    // highlight colour pallet and change image colour
    const timer = setInterval(() => {
      if (index > 9) index = 0;
      handleAddFilter(index);
      index++;
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Lazy loaz first content paintful img for mobile
  useEffect(() => {
    if (window.innerWidth <= 500 && firstImgRef.current) {
      firstImgRef.current.loading = "lazy";
      console.log("true");
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-24  text-base leading-7 tracking-wider text-sky-700">
      {/* <section>
      <h2>Free Typing Camp, where mastery begins. Experience continuous improvement.</h2>
      <p></p>
    </section> */}

      <section className="flex w-full max-w-[1200px] flex-col items-center gap-20 px-5 pb-14 text-center md:flex-row md:justify-around md:gap-0">
        <div className="flex max-w-[280px] flex-col items-center gap-6">
          <img
            ref={firstImgRef}
            src={Phone}
            alt="keyboard and mouse sitting on a table beside a cup of coffee, whith an ocean view illustration for computer screen, all in shades of blue."
            width={180}
            height={320}
            className={`${styles.image} mb-2 rounded-lg`}
          />
          <h2 className="font-lora text-xl font-bold capitalize text-defaultblue">
            Mobile friendly
          </h2>
          <p className="font-lato font-normal leading-8">
            Free Typing Camp offers the most accessable typing program for all
            users. Our tests &amp; courses are fully responsive and optimized
            for devices large &amp; small.
          </p>
        </div>
        <div className="relative flex max-w-[280px] flex-col items-center gap-6">
          <div className="absolute -bottom-12 flex w-full items-center justify-center gap-4">
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className="flex h-2 w-2 scale-[1.3] rounded-sm bg-pink-700"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className="flex h-2 w-2 rounded-sm bg-rose-800"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className=" flex h-2 w-2 rounded-sm bg-emerald-600"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className=" flex h-2 w-2 rounded-sm bg-black"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className=" flex h-2 w-2 rounded-sm bg-slate-700"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className=" flex h-2 w-2 rounded-sm bg-orange-700"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className=" flex h-2 w-2 rounded-sm bg-yellow-600"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className=" flex h-2 w-2 rounded-sm bg-purple-600"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className=" flex h-2 w-2 rounded-sm bg-yellow-950"
            ></div>
            <div
              ref={(el) => {
                if (el) divsRef.current.push(el);
              }}
              className="flex h-2 w-2 rounded-sm bg-teal-700"
            ></div>
          </div>
          <div className="relative flex">
            <img
              ref={imgRef}
              src={Customizability}
              alt="keyboard and mouse sitting on a table beside a cup of coffee, whith an ocean view illustration for computer screen, all in shades of blue."
              width={180}
              height={320}
              className={`${styles["image-theme"]} mb-2 rounded-lg`}
            />
          </div>
          <h2 className="font-lora text-xl font-bold capitalize text-defaultblue">
            Fully customizable
          </h2>
          <p className="font-lato font-normal leading-8">
            Craft your ideal space &amp; bring it to life by unlocking vibrant
            illustrations to customize the site according to your preferences.
            Make it truly yours!
          </p>
        </div>
        <div className="mb-auto flex max-w-[280px] flex-col items-center gap-6">
          <img
            src={Learning}
            alt="keyboard and mouse sitting on a table beside a cup of coffee, whith an ocean view illustration for computer screen, all in shades of blue."
            width={180}
            height={320}
            className={`${styles.image} mb-2 rounded-lg`}
          />
          <h2 className="font-lora text-xl font-bold capitalize text-defaultblue">
            Start learning for free
          </h2>
          <p className="font-lato font-normal leading-8">
            Accumulate points, monitor your progress, &amp; elevate your
            learning with a wide array of unlockables by creating a free
            account!
          </p>
        </div>
      </section>
      <section className="flex w-full flex-col items-center justify-center gap-10 bg-sky-50 px-10 py-20 font-lato font-normal md:px-14 lg:px-20 ">
        <h2 className="flex w-full max-w-[1160px] justify-end font-karla text-xl font-bold">
          Why learn to type?
        </h2>
        <div className="flex w-full flex-col text-center text-[1.5rem] leading-[3.5rem] tracking-wider text-defaultblue md:text-justify md:text-[2rem] md:leading-[4.5rem] lg:max-w-[1160px] lg:text-[2.4rem] lg:leading-[5.5rem]">
          <p>
            Mastering the art of typing is a valuable skill that can serve as an
            asset in various aspects of your life. Our courses empower you to
            take your skills to the next level. With just a few minutes of daily
            investment, you'll notice improvements in no time!
          </p>
        </div>
        <Link
          to="/lessons"
          className={`relative mx-auto inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-roboto text-xl font-normal text-white hover:scale-[1.02] hover:brightness-105`}
        >
          View Lessons
        </Link>
      </section>
      <section className="mb-20 mt-16 flex w-full flex-col items-center gap-32 px-10 sm:gap-52 ">
        <div className="flex w-full max-w-[920px] flex-col items-center justify-between gap-20 sm:flex-row-reverse sm:gap-10">
          <div className="relative flex ">
            <div className="absolute -right-5 -top-5 flex h-[16.5em] w-[18.75em] flex-col justify-between overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 brightness-[97%] md:h-[22em] md:w-[25em]">
              <div className="flex h-8 w-full bg-defaultblue opacity-75"></div>
              <div className="flex h-6 w-full bg-slate-900 opacity-20"></div>
            </div>
            <div className="relative flex h-[16.5em] w-[18.75em] items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 md:h-[22em] md:w-[25em]">
              <div className="absolute top-0 flex h-8 w-full bg-defaultblue opacity-70"></div>
              <div className="absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              <img
                src={Learning}
                alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                width={180}
                height={320}
                className={`${styles.image} mb-2 flex scale-75 rounded-lg md:scale-100`}
              />
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
        <div className="flex w-full max-w-[920px] flex-col items-center justify-between gap-20 sm:flex-row sm:gap-10">
          <div className="relative flex ">
            <div className="absolute -top-5 right-5 flex h-[16.5em] w-[18.75em] flex-col justify-between overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 brightness-[97%] md:h-[22em] md:w-[25em]">
              <div className="flex h-8 w-full bg-defaultblue opacity-75"></div>
              <div className="flex h-6 w-full bg-slate-900 opacity-20"></div>
            </div>
            <div className="relative flex h-[16.5em] w-[18.75em] items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 md:h-[22em] md:w-[25em]">
              <div className="absolute top-0 flex h-8 w-full bg-defaultblue opacity-70"></div>
              <div className="absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              <img
                src={Learning}
                alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                width={180}
                height={320}
                className={`${styles.image} mb-2 flex scale-75 rounded-lg md:scale-100`}
              />
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
        <div className="flex w-full max-w-[920px] flex-col items-center justify-between gap-20 sm:flex-row-reverse sm:gap-10">
          <div className="relative flex ">
            <div className="absolute -right-5 top-5 flex h-[16.5em] w-[18.75em] flex-col justify-between overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 brightness-[97%] md:h-[22em] md:w-[25em]">
              <div className="flex h-8 w-full bg-defaultblue opacity-75"></div>
              <div className="flex h-6 w-full bg-slate-900 opacity-20"></div>
            </div>
            <div className="relative flex h-[16.5em] w-[18.75em] items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 md:h-[22em] md:w-[25em]">
              <div className="absolute top-0 flex h-8 w-full bg-defaultblue opacity-70"></div>
              <div className="absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              <img
                src={Learning}
                alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                width={180}
                height={320}
                className={`${styles.image} mb-2 flex scale-75 rounded-lg md:scale-100`}
              />
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
        <div className="flex w-full max-w-[920px] flex-col  items-center justify-between gap-20 sm:flex-row sm:gap-10">
          <div className="relative flex ">
            <div className="absolute right-5 top-5 flex h-[16.5em] w-[18.75em] flex-col justify-between overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 brightness-[97%] md:h-[22em] md:w-[25em]">
              <div className="flex h-8 w-full bg-defaultblue opacity-75"></div>
              <div className="flex h-6 w-full bg-slate-900 opacity-20"></div>
            </div>
            <div className="relative flex h-[16.5em] w-[18.75em] items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 md:h-[22em] md:w-[25em]">
              <div className="absolute top-0 flex h-8 w-full bg-defaultblue opacity-70"></div>
              <div className="absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              <img
                src={Learning}
                alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                width={180}
                height={320}
                className={`${styles.image} mb-2 flex scale-75 rounded-lg md:scale-100`}
              />
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
          className={`relative mx-auto inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-roboto text-xl font-normal text-white hover:scale-[1.02] hover:brightness-105`}
        >
          Sign Up Free!
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;
