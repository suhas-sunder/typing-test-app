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
        src: "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fsingle-robot-typing.png",
      },
      webpImgSrc:
        "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fsingle-robot-typing.webp",
      link: "/lessons",
      text: "- Learn to type -",
    },
    {
      img: {
        alt: "Video game controller sitting on a cloudlike material in various shades of blue.",
        src: "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fcontroller.png",
      },
      webpImgSrc:
        "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fcontroller.webp",
      link: "/games",
      text: "- Play typing games -",
    },
    {
      img: {
        alt: "A majestic trophy with a scenic background in various shades of blue.",
        src: "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fthemes.png",
      },
      webpImgSrc:
        "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fthemes.webp",
      link: "/profile#themes",
      text: "- Custom Themes -",
    },
    {
      img: {
        alt: "A majestic trophy with a scenic background in various shades of blue.",
        src: "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fstats.png",
      },
      webpImgSrc:
        "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fstats.webp",
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
        className={`${
          isAuthenticated && styles["home-pg"]
        }  relative flex w-full flex-col items-center justify-center bg-defaultblue px-4 pb-64 pt-6 text-white brightness-105`}
      >
        <div
          className={`${styles["header-dashboard"]} flex w-full max-w-[1060px]  pt-6 font-lora capitalize text-sky-200 sm:min-h-[23em]`}
        >
          {isAuthenticated && <HeaderDashboard />}
        </div>
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
            <section className="mb-44 flex">
              <ImgLinks linkData={linkData} customStyle="lg:grid-cols-4" />
            </section>
          </>
        ) : (
          <div className="flex min-h-[249em] w-full flex-col items-center justify-center gap-24 text-base leading-7 tracking-wider text-sky-700">
            <LandingPage />
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
