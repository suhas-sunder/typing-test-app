import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import Icon from "../../utils/Icon";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ProfileImg from "../../assets/images/wolf_icon.jpg";
import ProfileImgWebp from "../../assets/images/wolf_icon.webp";
import { StatsContext } from "../../providers/ProfileStatsProvider";
import GetTotalScore from "../../utils/GetTotalScore";

interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

function ProfileMenu({ setShowMobileMenu }: PropTypes) {
  const { userName, userId } = useContext(AuthContext);
  const { totalScore, setTotalScore } = useContext(StatsContext);

  useEffect(() => {
    const updateNavStats = async () => {
      const result = await GetTotalScore({userId});
      setTotalScore(result);
    };

    userId && updateNavStats()
  }, [userId]);

  return (
    <NavLink
      onClick={() => setShowMobileMenu(false)}
      data-testid="profile-menu"
      to={"/profile"}
      className={`${styles.profile} lex-col relative flex items-center gap-4 hover:cursor-pointer`}
    >
      <ul
        className={` ${styles["profile-stats"]} relative flex-col items-center gap-1`}
      >
        <li data-testid="username" className="mb-1 flex justify-end">
          {userName}
        </li>
        <li
          data-testid="profile-score"
          className="relative flex justify-end gap-1 text-yellow-300"
        >
          <span className="flex text-base tracking-widest">
            {totalScore ? Number(totalScore).toLocaleString() : 0}
          </span>
          <Icon title="trophy-icon" customStyle={styles.icon} icon="trophy" />
        </li>
      </ul>
      <picture>
        <source srcSet={ProfileImgWebp} type="image/webp"></source>
        <img
          src={ProfileImg}
          alt="Colourful wolf standing on a mountain top."
          className={`${styles.img} relative flex h-16 w-16 rounded-full border-[3px] object-cover`}
          width={480}
          height={784}
        />
      </picture>
    </NavLink>
  );
}

export default ProfileMenu;
