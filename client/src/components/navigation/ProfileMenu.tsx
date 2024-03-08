import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { StatsContext } from "../../providers/StatsProvider";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "./styles/NavBar.module.css";
import GetTotalScore from "../../utils/GetTotalScore";
import Icon from "../../utils/Icon";
import GetSavedImages from "../../utils/GetSavedImages";
import { ImageContext } from "../../providers/ImageProvider";
interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

//Used by NavBar.tsx component
function ProfileMenu({ setShowMobileMenu }: PropTypes) {
  const { userName, userId } = useContext(AuthContext);
  const { totalScore, setTotalScore } = useContext(StatsContext);
  const { imageData, setImageData } = useContext(ImageContext);

  const [profileImgURL, setProfileImgURL] = useState<string>("");

  useEffect(() => {
    const updateImageData = async () => {
      const result = await GetSavedImages({ userId });
      setImageData(result);
    };

    const updateNavStats = async () => {
      const result = await GetTotalScore({ userId });
      setTotalScore(result);
    };

    if (userId) {
      updateNavStats();
      updateImageData();
    }
  }, [setImageData, setTotalScore, userId]);

  useLayoutEffect(() => {
    const savedImgURL = imageData.profile_pathname;
    if (savedImgURL && profileImgURL !== savedImgURL) {
      setProfileImgURL(
        `https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev${imageData.profile_pathname}`,
      );
    } else {
      setProfileImgURL("https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev/origami-style%2Fkitten%2Fkitten")
    }
  }, [imageData, profileImgURL]);

  return (
    <NavLink
      onClick={() => setShowMobileMenu(false)}
      data-testid="profile-menu"
      to={"/profile"}
      className={`${styles.profile} relative mr-3 hidden items-center gap-3 hover:cursor-pointer`}
    >
      <ul className={` ${styles["profile-stats"]} relative flex-col`}>
        <li data-testid="username" className="mb-1 flex justify-end text-sm">
          {userName}
        </li>
        <li
          data-testid="profile-score"
          className="relative flex justify-end gap-1 text-yellow-300"
        >
          <span className="flex text-lg tracking-widest">
            {totalScore ? Number(totalScore).toLocaleString() : 0}
          </span>
          <Icon
            title="trophy-icon"
            customStyle={`${styles.icon} scale-[1.1] `}
            icon="trophy"
          />
        </li>
      </ul>
      <picture className="flex min-w-[64px] min-h-[64px]">
        <source srcSet={`${profileImgURL}.webp`} type="image/webp"></source>
        <img
          src={`${profileImgURL}.png`}
          alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
          className={`${styles.img} relative flex h-16 w-16 rounded-xl border-[3px]  object-cover`}
          width={64}
          height={64}
        />
      </picture>
    </NavLink>
  );
}

export default ProfileMenu;
