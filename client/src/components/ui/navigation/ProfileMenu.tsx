import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import ProfileImg from "../../../../public/images/wolf_icon.jpg";
import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";

function ProfileMenu() {
  return (
    <NavLink
      data-testid="profile-menu"
      to={"/profile"}
      className={`${styles.profile} flex lex-col gap-4 items-center hover:cursor-pointer`}
    >
      <ul className="flex flex-col items-center gap-1">
        <li>MyUserNameIsTh</li>
        <li>
          999,999,999{" "}
          <span className={styles.icon}>
            <EmojiEventsTwoToneIcon />
          </span>
        </li>
      </ul>
      <img
        src={ProfileImg}
        alt="colourful wolf standing on a mountain top"
        className={`${styles.img} object-cover w-16 h-16 border-[3px] rounded-full`}
      />
    </NavLink>
  );
}

export default ProfileMenu;