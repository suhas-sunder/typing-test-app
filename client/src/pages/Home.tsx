import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

import styles from "../styles/global.module.css";
import loadable from "@loadable/component";
import MainMenu from "../components/layout/MainMenu";
import HeaderDashboard from "../components/layout/HeaderDashboard";

const LandingPage = loadable(() => import("../components/layout/LandingPage"));
const ImgLinks = loadable(() => import("../components/navigation/ImgLinks"));

function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  const linkData = [
    {
      img: {
        alt: "Mouse and keyboard sitting on a desk with a scenic window view in various shades of blue.",
        src: "https://www.freetypingcamp.com/defaults/single-robot-typing.png",
      },
      webpImgSrc:
        "https://www.freetypingcamp.com/defaults/single-robot-typing.webp",
      link: "/lessons",
      text: "- Learn to type -",
    },
    {
      img: {
        alt: "Video game controller sitting on a cloudlike material in various shades of blue.",
        src: "https://www.freetypingcamp.com/defaults/controller.png",
      },
      webpImgSrc: "https://www.freetypingcamp.com/defaults/controller.webp",
      link: "/games",
      text: "- Play typing games -",
    },
    {
      img: {
        alt: "A majestic trophy with a scenic background in various shades of blue.",
        src: "https://www.freetypingcamp.com/defaults/themes.png",
      },
      webpImgSrc: "https://www.freetypingcamp.com/defaults/themes.webp",
      link: "/profile#themes",
      text: "- Custom Themes -",
    },
    {
      img: {
        alt: "A majestic trophy with a scenic background in various shades of blue.",
        src: "https://www.freetypingcamp.com/defaults/stats.png",
      },
      webpImgSrc: "https://www.freetypingcamp.com/defaults/stats.webp",
      link: "/profile#stats",
      text: "- Stats Summary -",
    },
  ];

  useLayoutEffect(() => {
    LandingPage.load();
    ImgLinks.load();
  }, []);

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
