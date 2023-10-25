import styles from "./styles/NavBar.module.css";
import MainNav from "./MainNav";
import Logo from "./Logo";
import LoginLinks from "./LoginLinks";
import ProfileMenu from "./ProfileMenu";
import { useState, useEffect } from "react";

interface PropTypes {
  isAuthenticated: boolean;
}

function NavBar({ isAuthenticated }: PropTypes) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  // Close burger menu whenever screen is resized
  useEffect(() => {
    const handleResize = () => {
      setShowMobileMenu(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`${styles.nav} fixed left-0 right-0 bg-defaultblue text-white font-roboto tracking-wide text-base pl-5`}
    >
      {/* Desktop */}
      <div
        className={`flex w-full justify-between max-w-[1025px] items-center m-auto`}
      >
        <Logo setShowMobileMenu={setShowMobileMenu} />
        <MainNav
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
        {showMobileMenu && (
          <div
            onClick={() => setShowMobileMenu(false)}
            className="absolute top-24 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-10"
          />
        )}
        {isAuthenticated ? (
          <ProfileMenu setShowMobileMenu={setShowMobileMenu} />
        ) : (
          <LoginLinks setShowMobileMenu={setShowMobileMenu} />
        )}
        <input
          id="burger"
          type="checkbox"
          checked={showMobileMenu ? true : false}
          className="hidden border-none focus:border-current focus:ring-0 outline-none focus:outline-none"
        />
        <label
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          htmlFor="burger"
          className={`${styles["burger-label"]} border-none focus:border-current focus:ring-0 outline-none focus:outline-none`}
        >
          <span
            className={`flex justify-center items-center w-[3.324em] h-[3.324em] border-none focus:ring-0 outline-none focus:outline-none   ${styles["burger-open"]}`}
          >
            X
          </span>
          <span
            className={`hidden justify-center items-center w-[3.324em] h-[3.324em] border-none focus:ring-0 outline-none focus:outline-none   ${styles["burger-close"]}`}
          >
            O
          </span>
        </label>

        {/* <div
          className={`hidden w-full flex-col absolute left-0 right-0 top-19 bg-defaultblue z-10 ${styles["mobile-links"]}`}
        >
        </div> */}
      </div>
    </nav>
  );
}

export default NavBar;
