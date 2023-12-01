import HeaderDashboard from "../components/layout/HeaderDashboard";
import MainMenu from "../components/layout/MainMenu";
import Controller from "../images/controller.jpg";
import Achievements from "../images/achievements.jpg";
import Keyboard from "../images/keyboard.jpg";
import TripleImgLinks from "../components/navigation/TripleImgLinks";
import Stats from "../images/stats.jpg"
import Themes from "../images/themes.jpg"

function Home() {
  const linkData = [
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
        alt: "Mouse and keyboard sitting on a desk with a scenic window view in various shades of blue.",
        src: Keyboard,
      },
      link: "/lessons",
      text: "- Learn to type -",
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
      <header className="relative flex w-full flex-col items-center justify-center bg-defaultblue px-4 pb-12 pt-10 text-white brightness-105">
        <HeaderDashboard />
      </header>
      <main className="flex w-full flex-col items-center">
        <MainMenu />
        <TripleImgLinks linkData={linkData} />
      </main>
    </>
  );
}

export default Home;
