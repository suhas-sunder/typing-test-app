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
    <div className="flex w-full flex-col items-center ">
      {/* Don't display header on mobile. Move textbox to the top of the screen. */}
      <HeaderDashboard />
      <MainMenu />
      <TripleImgLinks linkData={linkData} />
      <div className="flex w-full max-w-7xl items-center justify-evenly"></div>
      <input
        tabIndex={0}
        type="textarea"
        id="trigger-mobile-keyboard"
        name="trigger-mobile-keyboard"
        className="border-2 outline-none"
      />
      <label htmlFor="trigger-mobile-keyboard" className="outline-none">label</label>
    </div>
  );
}

export default Home;
