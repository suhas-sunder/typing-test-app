import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/Profile.module.css";
import loadable from "@loadable/component";
import ProfileData from "../data/ProfileData";

const LogoutBtn = loadable(() => import("../components/navigation/LogoutBtn"));
const ProfileStats = loadable(
  () => import("../components/layout/ProfileStats"),
);
const ProfileImages = loadable(
  () => import("../components/layout/ProfileImages"),
);
const ProfileAchievements = loadable(
  () => import("../components/layout/ProfileAchievements"),
);
const ProfileThemes = loadable(
  () => import("../components/layout/ProfileThemes"),
);
const ProfileAccount = loadable(
  () => import("../components/layout/ProfileAccount"),
);
const SidebarMenu = loadable(
  () => import("../components/navigation/SidebarMenu"),
);

function Profile() {
  const [displaySection, setDisplaySection] = useState<number>(0); //Used to manage which menu section is to be displayed

  // This page is only accessible once logged in so load components as soon as page loads
  useLayoutEffect(() => {
    SidebarMenu.load();
    LogoutBtn.load();

    ProfileImages.preload();
    ProfileStats.preload();
    ProfileAchievements.preload();
    ProfileThemes.preload();
    ProfileAccount.preload();
  }, []);

  return (
    <div className="m-auto mb-40 mt-24 flex max-w-[1440px] flex-col items-start justify-center font-lora md:flex-row">
      <section
        role="navigation"
        aria-label="Sidebar profile menu"
        className="flex w-full min-w-[14.6em] flex-col md:w-auto md:translate-x-1"
      >
        <SidebarMenu
          menuData={ProfileData()}
          displayMenuItem={displaySection}
          setDisplayMenuItem={setDisplaySection}
        />

        <LogoutBtn
          customStyle={`${styles["logout-btn"]} mt-8 hidden md:flex`}
          iconStyle={`${styles["logout-icon"]} flex -translate-y-[0.04em] text-white`}
        />
      </section>
      <div
        id="profile-pg"
        className="relative mx-0 flex min-h-[45em] w-full max-w-[1200px] flex-col items-center justify-center gap-14 bg-white py-20 lg:rounded-3xl  lg:rounded-tl-none"
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
