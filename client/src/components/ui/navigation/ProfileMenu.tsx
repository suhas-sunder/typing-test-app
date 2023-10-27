import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import ProfileImg from "../../../../public/images/wolf_icon.jpg";
import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";

interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

function ProfileMenu({ setShowMobileMenu }: PropTypes) {
  return (
    <NavLink
      onClick={() => setShowMobileMenu(false)}
      data-testid="profile-menu"
      to={"/profile"}
      className={`${styles.profile} flex lex-col gap-4 items-center hover:cursor-pointer`}
    >
      <ul
        className={` ${styles["profile-stats"]} flex-col items-center gap-1 `}
      >
        <li>MyUserNameIsTh</li>
        <li>
          999,999,999{" "}
          <i title="trophy-icon" className={styles.icon}>
            <EmojiEventsTwoToneIcon />
          </i>
        </li>
      </ul>
      <img
        src={ProfileImg}
        alt="Colourful wolf standing on a mountain top."
        className={`${styles.img} object-cover w-16 h-16 border-[3px] rounded-full`}
      />
    </NavLink>
  );
}

export default ProfileMenu;
