import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
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
        src: "https://www.freetypingcamp.com/defaults/single-robot-typing-2.png",
      },
      webpImgSrc:
        "https://www.freetypingcamp.com/defaults/single-robot-typing-2.webp",
      link: "/",
      text: "- Test your speed -",
    },
    {
      img: {
        alt: "Video game controller sitting on a cloudlike material in various shades of blue.",
        src: "https://www.freetypingcamp.com/defaults/controller.png",
      },
      webpImgSrc: "https://www.freetypingcamp.com/defaults/controller.webp",
      link: "/games",
      text: "- Play typing games -",
    },
    {
      img: {
        alt: "Mouse and keyboard sitting on a desk with a scenic window view in various shades of blue.",
        src: "https://www.freetypingcamp.com/defaults/single-robot-typing.png",
      },
      webpImgSrc:
        "https://www.freetypingcamp.com/defaults/single-robot-typing.webp",
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
            srcSet={
              profileImgURL
                ? `${profileImgURL}.webp`
                : "https://www.freetypingcamp.com/origami-style/bear-cub/bear-cub.webp"
            }
            type="image/webp"
          ></source>
          <img
            src={
              profileImgURL
                ? `${profileImgURL}.png`
                : "https://www.freetypingcamp.com/origami-style/bear-cub/bear-cub.png"
            }
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
