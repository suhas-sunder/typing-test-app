import HeaderDashboard from "../components/layout/HeaderDashboard";
import MainMenu from "../components/layout/MainMenu";
import Controller from "../../public/assets/images/controller.jpg";
// import Achievements from "../images/achievements.jpg";
import Keyboard from "../../public/assets/images/keyboard.jpg";
import ImgLinks from "../components/navigation/ImgLinks";
import Stats from "../../public/assets/images/stats.jpg";
import Themes from "../../public/assets/images/themes.jpg";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import Customizability from "../../public/assets/images/customizability.png";
import Phone from "../../public/assets/images/phone.png";
import Learning from "../../public/assets/images/learning.png";
import styles from "../styles/global.module.css";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const linkData = [
    {
      img: {
        alt: "Mouse and keyboard sitting on a desk with a scenic window view in various shades of blue.",
        src: Keyboard,
      },
      link: "/lessons",
      text: "- Learn to type -",
    },
    {
      img: {
        alt: "Video game controller sitting on a cloudlike material in various shades of blue.",
        src: Controller,
      },
      link: "/games",
      text: "- Play typing games -",
    },
    {
      img: {
        alt: "A majestic trophy with a scenic background in various shades of blue.",
        src: Themes,
      },
      link: "/profile#achievements",
      text: "- Custom Themes -",
    },
    {
      img: {
        alt: "A majestic trophy with a scenic background in various shades of blue.",
        src: Stats,
      },
      link: "/profile#achievements",
      text: "- Stats Summary -",
    },
  ];

  return (
    <>
      <header className="relative flex w-full flex-col items-center justify-center bg-defaultblue px-4 pb-12 pt-10 text-white brightness-105 ">
        {isAuthenticated ? (
          <HeaderDashboard />
        ) : (
          <div className="flex w-full pb-64"></div>
        )}
      </header>
      <main className="flex w-full flex-col items-center ">
        <MainMenu />
        {isAuthenticated ? (
          <>
            <section>
              {/* <div className="mb-28 flex w-full max-w-[1060px] flex-col items-center justify-center gap-20 lg:flex-row lg:justify-around lg:gap-0">
              <div className="flex flex-col gap-5 rounded-lg border-2 px-40 py-60">
                <h2>Achievements </h2>
                <p>Coming Soon</p>
              </div>
              <div className="flex flex-col gap-5 rounded-lg border-2 px-40 py-60">
                <h2>Leaderboards</h2>
                <p>Coming Soon</p>
              </div>
            </div> */}
            </section>
            <section>
              <ImgLinks linkData={linkData} />
            </section>
          </>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-24 font-nunito text-base font-bold italic leading-7 tracking-wider text-sky-700">
            {/* <section>
              <h2>Free Typing Camp, where mastery begins. Experience continuous improvement.</h2>
              <p></p>
            </section> */}

            <section className="flex w-full max-w-[1200px] flex-col items-center gap-20 px-5 py-4 text-center md:flex-row md:justify-around md:gap-0">
              <div className="flex max-w-[280px] flex-col items-center gap-6">
                <h2 className="font-lora text-xl font-bold capitalize text-defaultblue">
                  Mobile friendly
                </h2>
                <img
                  src={Phone}
                  alt="keyboard and mouse sitting on a table beside a cup of coffee, whith an ocean view illustration for computer screen, all in shades of blue."
                  width={180}
                  height={320}
                  className={`${styles.image} mb-2 rounded-lg`}
                />
                <p className="font-lato font-normal leading-8">
                  Free Typing Camp offers the most accessable typing program for
                  all users. Our tests and courses are fully responsive and
                  optimized for devices large and small.
                </p>
              </div>
              <div className="flex max-w-[280px] flex-col items-center gap-6">
                <h2 className="font-lora text-xl font-bold capitalize text-defaultblue">
                  Full customizability
                </h2>
                <img
                  src={Customizability}
                  alt="keyboard and mouse sitting on a table beside a cup of coffee, whith an ocean view illustration for computer screen, all in shades of blue."
                  width={180}
                  height={320}
                  className={`${styles.image} mb-2 rounded-lg`}
                />
                <p className="font-lato font-normal leading-8">
                  Craft your ideal space and bring it to life by unlocking
                  vibrant illustrations to customize the site according to your
                  preferences. Make it truly yours!
                </p>
              </div>
              <div className="flex max-w-[280px] flex-col items-center  gap-6">
                <h2 className="font-lora text-xl font-bold capitalize text-defaultblue">
                  Start learning for free
                </h2>
                <img
                  src={Learning}
                  alt="keyboard and mouse sitting on a table beside a cup of coffee, whith an ocean view illustration for computer screen, all in shades of blue."
                  width={180}
                  height={320}
                  className={`${styles.image} mb-2 rounded-lg`}
                />
                <p className="font-lato font-normal leading-8">
                  Accumulate points, monitor your progress, and elevate your
                  learning with a wide array of unlockables by
                  <span className="text-defaultgreen brightness-75">
                    &nbsp;
                    <Link to="/register">creating a free account</Link>
                  </span>
                  !
                </p>
              </div>
            </section>
            <section className="flex w-full flex-col items-center justify-center gap-10 bg-sky-50 px-20 py-20 font-lato font-normal ">
              <h2 className="flex w-full max-w-[1160px] justify-end font-karla text-xl font-bold">
                Why learn to type?
              </h2>
              <div className="flex w-full flex-col text-center text-[1.5rem] leading-[3.5rem] tracking-wider text-defaultblue md:text-justify md:text-[2rem] md:leading-[4.5rem] lg:max-w-[1160px] lg:text-[2.4rem] lg:leading-[5.5rem]">
                <p>
                  Mastering the art of typing is a valuable skill that can
                  become an asset in various aspects of your life. Our courses
                  empower you to elevate your abilities to the next level. With
                  just a few minutes of daily investment, you'll notice
                  improvement in no time!
                </p>
              </div>
              <Link
                to="/lessons"
                className={`relative mx-auto inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-roboto text-xl font-normal text-white hover:scale-[1.02] hover:brightness-105`}
              >
                View Lessons
              </Link>
            </section>
            <section className="flex flex-col gap-10">
              <div>
                <h2>gamify your Experience (levels)</h2>
                <p></p>
              </div>
              <div>
                <h2>Typing Tips and resources (FAQ)</h2>
                <p></p>
              </div>
              <div>
                <h2>Achievements</h2>
                <p></p>
              </div>
              <div>
                <h2>Leaderboard</h2>
                <p></p>
              </div>
            </section>
            <section className="flex max-w-[1200px] w-full flex-col gap-14">
              <div className="flex w-full flex-col items-center gap-10 justify-around px-5 md:flex-row">
                <div className="max-w-[10em] text-center">
                  <h2>Earn points and level up</h2>
                </div>
                <div className="max-w-[10em] text-center">
                  <h2>Unlock Certificates of accomplishment</h2>
                </div>
                <div className="max-w-[10em] text-center">
                  <h2>Track progress with detailed Statistics</h2>
                </div>
                <div className="max-w-[10em] text-center">
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
        )}
      </main>
    </>
  );
}

export default Home;
