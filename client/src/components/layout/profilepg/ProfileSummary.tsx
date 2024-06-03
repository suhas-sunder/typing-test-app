import { useLayoutEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/global.module.css";
import useAuth from "../../hooks/useAuth";
import useImg from "../../hooks/useImg";
import loadable from "@loadable/component";
import ProfilePgLinks from "../../../data/ProfilePgLinks";

const TripleImgLinks = loadable(() => import("../../ui/navigation/ImgLinks"));

//Used by Profile.tsx component
export default function ProfileSummary() {
  const { userName } = useAuth();
  const { imageData } = useImg();

  const [profileImgURL, setProfileImgURL] = useState<string>("");

  const linkData = useMemo(() => ProfilePgLinks(), []);

  useLayoutEffect(() => {
    const savedImgURL = imageData.profile_pathname;
    if (savedImgURL && profileImgURL !== savedImgURL) {
      setProfileImgURL(
        `https://www.honeycombartist.com${imageData.profile_pathname}`,
      );
    } else {
      setProfileImgURL(
        "https://www.honeycombartist.com/origami-style%2Fkitten%2Fkitten",
      );
    }
  }, [imageData, profileImgURL]);

  return (
    <>
      <header
        className={`${styles["fade-in"]} flex flex-col items-center gap-8 pb-6 opacity-100 transition-opacity duration-700 ease-in`}
      >
        <Link to="/profile#img">
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
        </Link>
        <h2 className="min-h-10 text-center text-3xl text-defaultblue  sm:text-4xl">
          Welcome <span className="text-sky-700">{userName}</span>!
        </h2>
      </header>
      <main
        className={`${styles["fade-in"]} flex min-h-[14em] w-full items-center justify-center`}
      >
        <TripleImgLinks linkData={linkData} customStyle="" />
      </main>
    </>
  );
}
