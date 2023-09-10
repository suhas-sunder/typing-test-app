import React from "react";
import { NavLink } from "react-router-dom";

function MobileNavBar() {
  return (
    <div className="flex w-full justify-evenly p-5 bg-slate-700 text-white">
      <NavLink to="/">FreeTypingCamp</NavLink>
      <NavLink to="/">Tests</NavLink>
      <NavLink to="/lessons">Lessons</NavLink>
      <NavLink to="/games">Games</NavLink>
      <NavLink to="/summary">Summary</NavLink>
      <NavLink to="/login">Sign Up Free!</NavLink>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </div>
  );
}

export default MobileNavBar;
