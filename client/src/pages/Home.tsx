import HeaderDashboard from "../components/layout/HeaderDashboard";
import MainMenu from "../components/layout/MainMenu";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LandingPage from "../components/layout/LandingPage";
// import Achievements from "../images/achievements.jpg";
import Controller from "../assets/images/controller.jpg";
import Keyboard from "../assets/images/keyboard.jpg";
import ImgLinks from "../components/navigation/ImgLinks";
import Stats from "../assets/images/stats.jpg";
import Themes from "../assets/images/themes.jpg";

import ControllerWebp from "../assets/images/controller.webp";
import KeyboardWebp from "../assets/images/keyboard.webp";
import StatsWebp from "../assets/images/stats.webp";
import ThemesWebp from "../assets/images/themes.webp";

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
      <header className="relative flex w-full flex-col items-center justify-center bg-defaultblue px-4 pb-12 pt-4 text-white brightness-105 ">
        {isAuthenticated ? (
          <HeaderDashboard />
        ) : (
          <div className="flex w-full pb-64"></div>
        )}
      </header>
      <main className="flex w-full flex-col items-center">
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
            <section className="mb-44 flex">
              <ImgLinks linkData={linkData} customStyle="lg:grid-cols-4" />
            </section>
          </>
        ) : (
          <LandingPage />
        )}
      </main>
    </>
  );
}

export default Home;
