import { AuthContext } from "../../providers/AuthProvider";
import ProfileImg from "../../../public/assets/images/wolf_icon.jpg";
import { useContext } from "react";
import Controller from "../../../public/assets/images/controller.jpg";
import JumpsuitTyping from "../../../public/assets/images/jumpsuitTyping.jpg";
import Keyboard from "../../../public/assets/images/keyboard.jpg";
import TripleImgLinks from "../navigation/ImgLinks";

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
      <header className="flex flex-col items-center gap-8 pb-6">
        <img
          src={ProfileImg}
          alt="Colourful wolf standing on a mountain top."
          className={`relative flex h-44 w-44 rounded-full border-4 border-defaultblue bg-defaultblue object-cover p-2`}
          width={480}
          height={784}
        />
        <h2 className="text-4xl">
          Welcome <span className="text-defaultblue">{userName}</span>!
        </h2>
      </header>
      <main className="flex w-full items-center justify-center">
        <TripleImgLinks linkData={linkData} />
      </main>
    </>
  );
}

export default ProfileSummary;
