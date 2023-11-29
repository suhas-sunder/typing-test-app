import HeaderDashboard from "../components/layout/HeaderDashboard";
import MainMenu from "../components/layout/MainMenu";
import Controller from "../images/controller.jpg";
import Achievements from "../images/achievements.jpg";
import Keyboard from "../images/keyboard.jpg";
import TripleImgLinks from "../components/navigation/TripleImgLinks";

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
        src: Achievements,
      },
      link: "/profile#achievements",
      text: "- Achievements -",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center">
      <HeaderDashboard />
      <MainMenu />
      <TripleImgLinks linkData={linkData} />
    </div>
  );
}

export default Home;
