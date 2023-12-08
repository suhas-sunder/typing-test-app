import styles from "./styles/NavBar.module.css";
import MainLinks from "./MainLinks";
import Logo from "./Logo";
import LoginLinks from "./LoginLinks";
import ProfileMenu from "./ProfileMenu";
import { useState, useEffect, useContext } from "react";
import Icon from "../../utils/Icon";
import { AuthContext } from "../../providers/AuthProvider";

function NavBar() {
  const { isAuthenticated } = useContext(AuthContext);
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

  useEffect(() => {
    const navElement = document.getElementById("nav");

    if (showMobileMenu && navElement) {
      navElement.style.zIndex = "1000";
    } else if (navElement) {
      navElement.style.zIndex = "0";
    }
  }, [showMobileMenu]);

  return (
    <nav
      id="nav"
      className={`${styles.nav} relative left-0 right-0 top-0 bg-defaultblue pl-5 font-lora text-base tracking-widest text-white`}
    >
      {/* Desktop */}
      <div
        className={`m-auto flex w-full max-w-[1025px] items-center justify-between`}
      >
        <Logo setShowMobileMenu={setShowMobileMenu} />
        <MainLinks
          isLoggedIn={isAuthenticated}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
        {showMobileMenu && (
          <div
            onClick={() => setShowMobileMenu(false)}
            className="absolute left-0 top-24 h-[100vh] w-[100vw] bg-sky-950 bg-opacity-30"
          />
        )}
        {isAuthenticated ? (
          <ProfileMenu setShowMobileMenu={setShowMobileMenu} />
        ) : (
          <ul
            className={`${styles["login-menu"]} relative justify-center gap-3 pr-5`}
          >
            <LoginLinks
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
            />
          </ul>
        )}
        <input
          id="burger"
          type="checkbox"
          checked={showMobileMenu ? true : false}
          readOnly
          className="relative hidden"
        />
        <label
          data-testid="burger-icons"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          htmlFor="burger"
          className={`${styles["burger-label"]} relative hover:cursor-pointer`}
        >
          <Icon
            title="burger-closed-icon"
            customStyle={`flex relative justify-center items-center w-[3.324em] h-[3.324em] scale-125 mr-1 ${styles["burger-open"]}`}
            icon="burgerOpen"
          />
          <Icon
            title="burger-open-icon"
            customStyle={`hidden relative justify-center items-center w-[3.324em] h-[3.324em] scale-125 mr-1 ${styles["burger-close"]}`}
            icon="burgerClosed"
          />
        </label>
      </div>
    </nav>
  );
}

export default NavBar;
