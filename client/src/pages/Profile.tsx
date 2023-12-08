import { useState, useEffect } from "react";
// import ServerAPI from "../api/accountAPI";
import { useLocation } from "react-router-dom";
import ProfileSummary from "../components/layout/ProfileSummary";
import loadable from "@loadable/component";

const SideMenu = loadable(() => import("../components/navigation/SideMenu"));
const ProfileImages = loadable(
  () => import("../components/layout/ProfileImages"),
);
const ProfileStats = loadable(
  () => import("../components/layout/ProfileStats"),
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

const defaultMenuData = [
  {
    id: "menu-profile",
    text: "Profile",
    checked: true,
    icon: "profile",
    customLabelStyle: "rounded-tl-md",
    link: "/profile",
  },
  {
    id: "menu-profile-img",
    text: "Profile Image",
    checked: false,
    icon: "profileImage",
    link: "/profile#img",
  },
  {
    id: "menu-stats",
    text: "Stats",
    checked: false,
    icon: "stats",
    link: "/profile#stats",
  },
  {
    id: "menu-achievements",
    text: "Achievements",
    checked: false,
    icon: "achievements",
    link: "/profile#achievements",
  },
  {
    id: "menu-themes",
    text: "Themes",
    checked: false,
    icon: "sparkle",
    link: "/profile#themes",
  },
  {
    id: "menu-account",
    text: "Account Summary",
    checked: false,
    icon: "profileSettings",
    customLabelStyle: "rounded-bl-md",
    link: "/profile#account",
  },
];

function Profile() {
  const currentUrl = useLocation();
  const [pageContent, setPageContent] = useState(() => <ProfileSummary />);
  const [menuData, setMenuData] = useState(defaultMenuData);

  // const [username, setUsername] = useState("");

  // const getName = async () => {
  //   try {
  //     const response = await ServerAPI.get("/dashboard", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("jwt_token"),
  //       },
  //     })
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     const parseRes = await response;

  //     parseRes.user_name && setUsername(parseRes.user_name);
  //   } catch (err) {
  //     let message;

  //     if (err instanceof Error) {
  //       message = err.message;
  //     } else {
  //       message = String(err);
  //     }

  //     console.error(message);
  //   }
  // };

  // useEffect(() => {
  //   getName();
  // }, []);

  // "flex w-full cursor-pointer items-center bg-defaultblue px-8 py-4 text-white brightness-90 hover:bg-white hover:text-black hover:brightness-100"

  useEffect(() => {
    const handleDisplayPageContent = () => {
      const urlHash = currentUrl.hash;
      let indexMatchesUrl = 0;

      // Determine which menu item matches url
      menuData.forEach((data, index) => {
        if (data.link.includes(urlHash) && urlHash) {
          indexMatchesUrl = index;
        }
      });

      // Update checkbox (side-menu selection) based on current url hash
      setMenuData(
        menuData.map((data, index) => {
          if (index === indexMatchesUrl) {
            return {
              ...menuData[indexMatchesUrl],
              checked: true,
            };
          } else {
            return {
              ...data,
              checked: false,
            };
          }
        }),
      );

      // Display page content depending on current url hash
      switch (true) {
        case urlHash.includes("#img"):
          return <ProfileImages />;
        case urlHash.includes("#stats"):
          return <ProfileStats />;
        case urlHash.includes("#achievements"):
          return <ProfileAchievements />;
        case urlHash.includes("#themes"):
          return <ProfileThemes />;
        case urlHash.includes("#account"):
          return <ProfileAccount />;
        default:
          return <ProfileSummary />;
      }
    };

    setPageContent(handleDisplayPageContent);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl, setMenuData]);

  // Prelod all lazyloaded components after delay
  useEffect(() => {
    const handlePreload = () => {
      SideMenu.preload();

      ProfileImages.preload();

      ProfileStats.preload();

      ProfileAchievements.preload();

      ProfileThemes.preload();

      ProfileAccount.preload();
    };

    const timer = setTimeout(handlePreload, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="m-auto mt-[11em] flex max-w-[1440px] items-start justify-center font-roboto">
      <SideMenu menuData={menuData} />
      <div
        id="profile-pg"
        className="relative mx-5 flex min-h-[40em] w-full max-w-[1200px] flex-col items-center justify-center gap-14 rounded-md bg-white py-20 lg:ml-0 lg:mr-5 lg:rounded-tl-none"
      >
        {pageContent}
      </div>
    </div>
  );
}

export default Profile;
