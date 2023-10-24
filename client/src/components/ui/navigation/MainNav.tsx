import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import LiveHelpTwoToneIcon from "@mui/icons-material/LiveHelpTwoTone";

function MainNav() {
  return (
    <ul className={`flex gap-7`}>
      <li>
        <NavLink
          to="/lessons"
          className="inline-flex justify-center items-center gap-2 py-5"
        >
          Lessons
          <span className={` ${styles.icon} text-white -translate-y-[0.07em]`}>
            <SchoolTwoToneIcon />
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/games"
          className="flex justify-center items-center gap-2 py-5"
        >
          Games
          <span className={` ${styles.icon} text-white -translate-y-[0.07em]`}>
            <GamepadTwoToneIcon />
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/faq"
          className="flex justify-center items-center gap-2 py-5"
        >
          FAQ
          <span className={` ${styles.icon} text-white -translate-y-[0.07em]`}>
            <LiveHelpTwoToneIcon />
          </span>
        </NavLink>
      </li>
    </ul>
  );
}

export default MainNav;
