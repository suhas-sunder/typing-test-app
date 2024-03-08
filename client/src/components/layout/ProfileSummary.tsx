import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useLayoutEffect, useState } from "react";
import TripleImgLinks from "../navigation/ImgLinks";
import { ImageContext } from "../../providers/ImageProvider";
import styles from "../../styles/global.module.css";

//Used by Profile.tsx component
function ProfileSummary() {
  const { userName } = useContext(AuthContext);
  const { imageData } = useContext(ImageContext);

  const [profileImgURL, setProfileImgURL] = useState<string>("");

  const linkData = [
    {
      img: {
        alt: "A person wearing a helmet while typing on laptop depicted in various shades of blue.",
        src: "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fsingle-robot-typing-2.png",
      },
      webpImgSrc:
        "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fsingle-robot-typing-2.webp",
      link: "/",
      text: "- Test your speed -",
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
        alt: "Mouse and keyboard sitting on a desk with a scenic window view in various shades of blue.",
        src: "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fsingle-robot-typing.png",
      },
      webpImgSrc:
        "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/defaults%2Fsingle-robot-typing.webp",
      link: "/lessons",
      text: "- Learn to type -",
    },
  ];

  useLayoutEffect(() => {
    const savedImgURL = imageData.profile_pathname;
    if (savedImgURL && profileImgURL !== savedImgURL) {
      setProfileImgURL(
        `https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev${imageData.profile_pathname}`,
      );
    } else {
      setProfileImgURL(
        "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/origami-style%2Fkitten%2Fkitten",
      );
    }
  }, [imageData, profileImgURL]);

  return (
    <>
      <header
        className={`${styles["fade-in"]} flex flex-col items-center gap-8 pb-6 opacity-100 transition-opacity duration-700 ease-in`}
      >
        <picture className="flex min-h-[176px] min-w-[176px]">
          <source srcSet={`${profileImgURL}.webp`} type="image/webp"></source>
          <img
            src={`${profileImgURL}.png`}
            alt="Colourful wolf standing on a mountain top."
            className={`relative flex h-44 w-44 rounded-2xl border-defaultblue bg-defaultblue object-cover`}
            width={176}
            height={176}
          />
        </picture>
        <h2 className="min-h-10 text-center text-3xl text-defaultblue  sm:text-4xl">
          Welcome <span className="text-sky-700">{userName}</span>!
        </h2>
      </header>
      <main
        className={`${styles["fade-in"]} flex min-h-[14em] w-full items-center  justify-center`}
      >
        <TripleImgLinks linkData={linkData} customStyle="" />
      </main>
    </>
  );
}

export default ProfileSummary;
