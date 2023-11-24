import { useState, useEffect } from "react";
import ServerAPI from "../api/accountAPI";
import ProfileImg from "../images/wolf_icon.jpg";
import SideMenu from "../components/navigation/SideMenu";

function Profile() {
  const [username, setUsername] = useState("");

  const getName = async () => {
    try {
      const response = await ServerAPI.get("/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const parseRes = await response;

      parseRes.user_name && setUsername(parseRes.user_name);
    } catch (err) {
      let message;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  // "flex w-full cursor-pointer items-center bg-defaultblue px-8 py-4 text-white brightness-90 hover:bg-white hover:text-black hover:brightness-100"

  const menuData = [
    {
      id: "menu-profile",
      text: "Profile",
      checked: true,
      icon: "profile",
      customLabelStyle: "rounded-tl-md",
    },
    {
      id: "menu-profile-img",
      text: "Profile Image",
      icon: "profileImage",
    },
    {
      id: "menu-stats",
      text: "Stats",
      icon: "stats",
    },
    {
      id: "menu-achievements",
      text: "Achievements",
      icon: "achievements",
    },
    {
      id: "menu-themes",
      text: "Themes",
      icon: "sparkle",
    },
    {
      id: "menu-account",
      text: "Account Summary",
      icon: "profileSettings",
      customLabelStyle: "rounded-bl-md",
    },
  ];

  return (
    <div className="m-auto mt-[18em] flex max-w-[1440px] items-start justify-center font-roboto">
      <SideMenu menuData={menuData} />
      <main className="relative mr-5 flex w-full max-w-[1200px] flex-col items-center justify-center gap-6  rounded-md rounded-tl-none bg-white py-60">
        <img
          src={ProfileImg}
          alt="Colourful wolf standing on a mountain top."
          className={`relative flex h-44 w-44 rounded-full border-8 border-defaultblue object-cover`}
        />
        <span>Welcome {username}!</span>
      </main>
    </div>
  );
}

export default Profile;
