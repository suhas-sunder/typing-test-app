import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
// import Achievements from "../images/achievements.jpg";
import Controller from "../assets/images/controller.png";
import Keyboard from "../assets/images/keyboard.png";
import Stats from "../assets/images/stats.png";
import Themes from "../assets/images/themes.png";

import ControllerWebp from "../assets/images/controller.webp";
import KeyboardWebp from "../assets/images/keyboard.webp";
import StatsWebp from "../assets/images/stats.webp";
import ThemesWebp from "../assets/images/themes.webp";

import styles from "../styles/global.module.css";
import LandingPage from "../components/layout/LandingPage";
import HeaderDashboard from "../components/layout/HeaderDashboard";
import MainMenu from "../components/layout/MainMenu";
import ImgLinks from "../components/navigation/ImgLinks";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  const linkData = [
    {
      img: {
        alt: "Mouse and keyboard sitting on a desk with a scenic window view in various shades of blue.",
        src: Keyboard,
      },
      webpImgSrc: KeyboardWebp,
      link: "/lessons",
      text: "- Learn to type -",
    },
    {
      img: {
        alt: "Video game controller sitting on a cloudlike material in various shades of blue.",
        src: Controller,
      },
      webpImgSrc: ControllerWebp,
      link: "/games",
      text: "- Play typing games -",
    },
    {
      img: {
        alt: "A majestic trophy with a scenic background in various shades of blue.",
        src: Themes,
      },
      webpImgSrc: ThemesWebp,
      link: "/profile#themes",
      text: "- Custom Themes -",
    },
    {
      img: {
        alt: "A majestic trophy with a scenic background in various shades of blue.",
        src: Stats,
      },
      webpImgSrc: StatsWebp,
      link: "/profile#stats",
      text: "- Stats Summary -",
    },
  ];

  return (
    <>
      <header
        className={`${isAuthenticated && styles["home-pg"]} ${
          isAuthenticated ? "pb-7" : "pb-64"
        } relative flex w-full flex-col items-center justify-center bg-defaultblue px-4 pt-4 text-white brightness-105`}
      >
        {isAuthenticated ? (
          <div
            className={`${styles["header-dashboard"]} flex w-full max-w-[1060px] pb-[14.5em] pt-6 font-lora capitalize text-sky-200 sm:min-h-[35em]`}
          >
            <HeaderDashboard />
          </div>
        ) : (
          <div className="pb-12 sm:pb-10"></div>
        )}
      </header>
      <main className="flex w-full flex-col items-center">
        <div
          id="main-menu"
          className="relative z-50 -mt-[13.5em] mb-28 flex min-h-[35.6em] w-full max-w-4xl flex-col items-center justify-center bg-white shadow-md sm:min-h-[29em] md:rounded-3xl"
        >
          <MainMenu />
        </div>
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
            <section className="mb-44 flex">
              <ImgLinks linkData={linkData} customStyle="lg:grid-cols-4" />
            </section>
          </>
        ) : (
          <div className="flex min-h-[259em] w-full flex-col items-center justify-center gap-24 text-base leading-7 tracking-wider text-sky-700">
            <LandingPage />
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
