import { AuthContext } from "../../providers/AuthProvider";
import ProfileImg from "../../images/wolf_icon.jpg";
import { useContext } from "react";
import Controller from "../../images/controller.jpg";
import JumpsuitTyping from "../../images/jumpsuitTyping.jpg";
import Keyboard from "../../images/keyboard.jpg";
import TripleImgLinks from "../navigation/TripleImgLinks";

function ProfileSummary() {
  const { userName } = useContext(AuthContext);

  const linkData = [
    {
      img: {
        alt: "A person wearing a helmet while typing on laptop depicted in various shades of blue.",
        src: JumpsuitTyping,
      },
      link: "/",
      text: "- Test your speed -",
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
        alt: "Mouse and keyboard sitting on a desk with a scenic window view in various shades of blue.",
        src: Keyboard,
      },
      link: "/lessons",
      text: "- Learn to type -",
    },
  ];

  return (
    <>
      <header className="flex flex-col items-center gap-8">
        <img
          src={ProfileImg}
          alt="Colourful wolf standing on a mountain top."
          className={`relative flex h-44 w-44 rounded-full border-8 border-defaultblue object-cover`}
        />
        <h2 className="text-4xl">
          Welcome <span className="text-defaultblue">{userName}</span>!
        </h2>
      </header>
      <main className="flex w-full ">
        <TripleImgLinks linkData={linkData} />
      </main>
    </>
  );
}

export default ProfileSummary;
