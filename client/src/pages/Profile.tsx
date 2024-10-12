//Profile

import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/Profile.module.css";
import ProfileData from "../data/ProfileData";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import ProfileHeaderDashboard from "../components/layout/profilepg/ProfileHeaderDashboard";
import SidebarMenu from "../components/ui/navigation/SidebarMenu";
import LogoutBtn from "../components/ui/navigation/LogoutBtn";

function Profile() {
  const [displaySection, setDisplaySection] = useState<number>(0); //Used to manage which menu section is to be displayed

  const menuData = useMemo(() => ProfileData(), []);
  const { fadeAnim } = useLoadAnimation();

  return (
    <div className="flex  w-full flex-col items-center justify-center gap-11">
      <header className="mx-auto mt-2 flex w-full max-w-[1060px] justify-center pt-6 font-lora capitalize text-sky-200 md:min-h-[23em]">
        <ProfileHeaderDashboard />
      </header>
      <div
        className={`${fadeAnim} m-auto mb-40 flex w-full flex-col items-start justify-center font-lora md:flex-row`}
      >
        <section
          role="navigation"
          aria-label="Sidebar profile menu"
          className="flex w-full min-w-[13.6em] flex-col md:w-auto md:translate-x-1"
        >
          <div className="flex w-full max-w-[1440px] rounded-l-2xl rounded-t-2xl rounded-tr-none bg-transparent md:min-h-[24em] md:bg-white ">
            <SidebarMenu
              menuData={menuData}
              displayMenuItem={displaySection}
              setDisplayMenuItem={setDisplaySection}
            />
          </div>

          <LogoutBtn
            customStyle={`${styles["logout-btn"]} mt-8 hidden md:flex`}
            iconStyle={`${styles["logout-icon"]} flex -translate-y-[0.04em] text-white`}
          />
        </section>
        <main
          id="profile-pg"
          className="relative mx-0 flex min-h-[45em] w-full max-w-[1200px] flex-col items-center justify-center gap-14 bg-white py-20 lg:rounded-3xl  lg:rounded-tl-none"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Profile;
