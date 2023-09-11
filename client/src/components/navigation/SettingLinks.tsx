import { NavLink } from "react-router-dom";

function SettingLinks({ addClass }) {
  return (
    <ul className={`flex w-full justify-evenly ${addClass}`}>
      <li>
        <NavLink to="/login" className="flex p-5">
          Sign Up Free!
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className="flex p-5">
          Log In
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" className="flex p-5">
          Settings
        </NavLink>
      </li>
    </ul>
  );
}

export default SettingLinks;
