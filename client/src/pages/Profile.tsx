import { useState } from "react";
import { Outlet } from "react-router-dom";
import LogoutBtn from "../components/navigation/LogoutBtn";
import styles from "./styles/Profile.module.css";
import SidebarMenu from "../components/navigation/SidebarMenu";
import ProfileData from "../data/ProfileData";

// function ProfileSideMenu({ menuData }) {
//   return (
//     <ul className="flex w-full justify-center font-lora md:flex-col">
//       {menuData.map((data) => (
//         <li key={uuidv4()} className="flex w-full">
//           <Link to={data.link} className="flex w-full">
//             <input
//               id={data.id}
//               name="profile-menu"
//               type="radio"
//               checked={data.checked}
//               onChange={() => {}}
//               className={`${styles["profile-menu-input"]} hidden`}
//             />
//             <label
//               htmlFor={data.id}
//               className={`${styles["profile-menu-tab"]} ${data.customLabelStyle} flex w-full cursor-pointer flex-col items-center gap-3 bg-slate-200 px-3 py-4  md:max-w-[14.5em] md:flex-row md:pl-6 md:pr-5 `}
//             >
//               <Icon
//                 icon={data.icon}
//                 title={data.icon + "-icon "}
//                 customStyle={`${styles["profile-menu-icon"]} flex justify-center items-center sm:w-12 md:w-6 h-6`}
//               />
//               <span className="hidden text-center text-xs md:flex md:w-36 md:whitespace-pre md:text-left md:text-base">
//                 {data.text}
//               </span>
//             </label>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

function Profile() {
  const [displaySection, setDisplaySection] = useState<number>(0); //Used to manage which section is to be displayed

  return (
    <div className="m-auto mb-40 mt-24 flex max-w-[1440px] flex-col items-start justify-center font-lora md:flex-row">
      <section
        role="navigation"
        aria-label="Side menu"
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
