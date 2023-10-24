import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import LeaderboardTwoToneIcon from "@mui/icons-material/LeaderboardTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import DashboardCustomizeTwoToneIcon from "@mui/icons-material/DashboardCustomizeTwoTone";

interface propTypes {
  isAuthenticated: boolean;
}

function NavLinks({ isAuthenticated }: propTypes) {
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
      {/* {isAuthenticated && (
        <li>
          <NavLink
            to="/profile"
            className="flex justify-center items-center gap-2 py-5"
          >
            Dashboard
            <span
              className={` ${styles.icon} text-white -translate-y-[0.07em]`}
            >
              <DashboardCustomizeTwoToneIcon />
            </span>
          </NavLink>
        </li>
      )} */}
      <li>
        <NavLink
          to="/leaderboard"
          className="flex justify-center items-center gap-2 py-5"
        >
          Leaderboard
          <span className={` ${styles.icon} text-white -translate-y-[0.07em]`}>
            <LeaderboardTwoToneIcon />
          </span>
        </NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
