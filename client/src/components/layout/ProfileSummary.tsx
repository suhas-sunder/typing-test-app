import { AuthContext } from "../../providers/AuthProvider";
import ProfileImg from "../../assets/images/wolf_icon.jpg";
import ProfileImgWebp from "../../assets/images/wolf_icon.webp";
import { useContext } from "react";
import Controller from "../../assets/images/controller.png";
import ControllerWebp from "../../assets/images/controller.webp";
import JumpsuitTyping from "../../assets/images/jumpsuitTyping.png";
import JumpsuitTypingWebp from "../../assets/images/jumpsuitTyping.webp";
import Keyboard from "../../assets/images/keyboard.png";
import KeyboardWebp from "../../assets/images/keyboard.webp";
import TripleImgLinks from "../navigation/ImgLinks";

function ProfileSummary() {
  const { userName } = useContext(AuthContext);

  const linkData = [
    {
      img: {
        alt: "A person wearing a helmet while typing on laptop depicted in various shades of blue.",
        src: JumpsuitTyping,
      },
      webpImgSrc: JumpsuitTypingWebp,
      link: "/",
      text: "- Test your speed -",
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
        alt: "Mouse and keyboard sitting on a desk with a scenic window view in various shades of blue.",
        src: Keyboard,
      },
      webpImgSrc: KeyboardWebp,
      link: "/lessons",
      text: "- Learn to type -",
    },
  ];

  return (
    <>
      <header className="flex flex-col items-center gap-8 pb-6">
        <picture>
          <source srcSet={ProfileImgWebp} type="image/webp"></source>
          <img
            src={ProfileImg}
            alt="Colourful wolf standing on a mountain top."
            className={`relative flex h-44 w-44 rounded-full border-4 border-defaultblue bg-defaultblue object-cover p-2`}
            width={480}
            height={784}
          />
        </picture>
        <h2 className="text-3xl text-defaultblue sm:text-4xl text-center">
          Welcome <span className="text-sky-700">{userName}</span>!
        </h2>
      </header>
      <main className="flex w-full items-center justify-center ">
        <TripleImgLinks linkData={linkData} customStyle="" />
      </main>
    </>
  );
}

export default ProfileSummary;
