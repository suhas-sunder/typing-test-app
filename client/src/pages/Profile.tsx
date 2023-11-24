import { useState, useEffect } from "react";
// import ServerAPI from "../api/accountAPI";
import { useLocation } from "react-router-dom";
import ProfileSummary from "../components/layout/ProfileSummary";
import SideMenu from "../components/navigation/SideMenu";
import ProfileImages from "../components/layout/ProfileImages";
import ProfileStats from "../components/layout/ProfileStats";
import ProfileAchievements from "../components/layout/ProfileAchievements";
import ProfileThemes from "../components/layout/ProfileThemes";
import ProfileAccount from "../components/layout/ProfileAccount";

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

  return (
    <div className="m-auto mt-[18em] flex max-w-[1440px] items-start justify-center font-roboto">
      <SideMenu menuData={menuData} />
      <div
        id="profile-pg"
        className="relative mr-5 flex w-full max-w-[1200px] flex-col items-center justify-center gap-6 rounded-md   rounded-tl-none  bg-white py-60"
      >
        {pageContent}
      </div>
    </div>
  );
}

export default Profile;
