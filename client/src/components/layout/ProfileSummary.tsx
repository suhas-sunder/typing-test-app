import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import ProfileImg from "../../assets/images/t-rex.png";
import ProfileImgWebp from "../../assets/images/t-rex.webp";
import Controller from "../../assets/images/controller.png";
import ControllerWebp from "../../assets/images/controller.webp";
import JumpsuitTyping from "../../assets/images/jumpsuitTyping.png";
import JumpsuitTypingWebp from "../../assets/images/jumpsuitTyping.webp";
import Keyboard from "../../assets/images/keyboard.png";
import KeyboardWebp from "../../assets/images/keyboard.webp";
import TripleImgLinks from "../navigation/ImgLinks";
import { ImageContext } from "../../providers/ImageProvider";

function ProfileSummary() {
  const { userName } = useContext(AuthContext);
  const { imageData } = useContext(ImageContext);

  const [profileImgURL, setProfileImgURL] = useState<string>();

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

  
  useEffect(() => {
    if (imageData.profile_pathname) {
      setProfileImgURL(
        `https://www.freetypingcamp.com${imageData.profile_pathname}`,
      );
    }
  }, [imageData]);

  return (
    <>
      <header className="flex flex-col items-center gap-8 pb-6">
        <picture>
          <source
            srcSet={profileImgURL ? `${profileImgURL}.webp` : ProfileImgWebp}
            type="image/webp"
          ></source>
          <img
            src={profileImgURL ? `${profileImgURL}.png` : ProfileImg}
            alt="Colourful wolf standing on a mountain top."
            className={`relative flex h-44 w-44 rounded-2xl border-defaultblue bg-defaultblue object-cover`}
            width={176}
            height={176}
          />
        </picture>
        <h2 className="text-center text-3xl text-defaultblue sm:text-4xl">
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
