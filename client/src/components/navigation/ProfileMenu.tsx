import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { StatsContext } from "../../providers/ProfileStatsProvider";
import { useContext, useEffect } from "react";
import styles from "./styles/NavBar.module.css";
import ProfileImg from "../../assets/images/t-rex.png";
import ProfileImgWebp from "../../assets/images/t-rex.webp";
import GetTotalScore from "../../utils/GetTotalScore";
import Icon from "../../utils/Icon";
interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

function ProfileMenu({ setShowMobileMenu }: PropTypes) {
  const { userName, userId } = useContext(AuthContext);
  const { totalScore, setTotalScore } = useContext(StatsContext);

  useEffect(() => {
    const updateNavStats = async () => {
      const result = await GetTotalScore({ userId });
      setTotalScore(result);
    };

    userId && updateNavStats();
  }, [setTotalScore, userId]);

  return (
    <NavLink
      onClick={() => setShowMobileMenu(false)}
      data-testid="profile-menu"
      to={"/profile"}
      className={`${styles.profile} relative mr-3 hidden items-center gap-3 hover:cursor-pointer sm:flex`}
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
      <picture>
        <source srcSet={ProfileImgWebp} type="image/webp"></source>
        <img
          src={ProfileImg}
          alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
          className={`${styles.img} relative flex h-16 w-16 rounded-xl border-[3px]  object-cover`}
          width={64}
          height={64190}
        />
      </picture>
    </NavLink>
  );
}

export default ProfileMenu;
