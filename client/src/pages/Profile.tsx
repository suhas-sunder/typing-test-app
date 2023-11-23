import { useState, useEffect } from "react";
import ServerAPI from "../api/accountAPI";
import LogoutBtn from "../components/navigation/LogoutBtn";
import ProfileImg from "../images/wolf_icon.jpg";

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

  return (
    <div className="flex mt-[18em]  m-auto justify-center items-start max-w-[1440px]">
      <div className="flex  flex-col w-full max-w-[16em] font-roboto">
        <input
          id="menu-profile"
          name="menu-profile"
          type="checkbox"
          className="hidden"
        />
        <label
          htmlFor="menu-profile"
          className="flex w-full items-center bg-white rounded-tl-md px-8 py-4 cursor-pointer"
        >
          Profile
        </label>

        <input
          id="menu-stats"
          name="menu-stats"
          type="checkbox"
          className="hidden"
        />
        <label
          htmlFor="menu-stats"
          className="flex w-full items-center bg-defaultblue brightness-75 px-8 py-4 hover:bg-white hover:brightness-100 text-white hover:text-black cursor-pointer"
        >
          Stats
        </label>
        <input
          id="menu-achievements"
          name="menu-achievements"
          type="checkbox"
          className="hidden"
        />
        <label
          htmlFor="menu-achievements"
          className="flex w-full items-center bg-defaultblue brightness-75 px-8 py-4 hover:bg-white hover:brightness-100 text-white hover:text-black cursor-pointer"
        >
          Achievements
        </label>
        <input
          id="menu-themes"
          name="menu-themes"
          type="checkbox"
          className="hidden"
        />
        <label
          htmlFor="menu-themes"
          className="flex w-full items-center bg-defaultblue brightness-75 px-8 py-4 hover:bg-white hover:brightness-100 text-white hover:text-black cursor-pointer"
        >
          Themes
        </label>
        <input
          id="menu-account"
          name="menu-account"
          type="checkbox"
          className="hidden"
        />
        <label
          htmlFor="menu-account"
          className="flex w-full items-center bg-defaultblue brightness-75 px-8 py-4 hover:bg-white hover:brightness-100 text-white hover:text-black rounded-bl-md cursor-pointer"
        >
          Account Summary
        </label>
      </div>
      <div className="flex w-full relative flex-col justify-center items-center gap-6 py-60 bg-white  max-w-[900px] rounded-md rounded-l-none ">
        <img
          src={ProfileImg}
          alt="Colourful wolf standing on a mountain top."
          className={`object-cover w-44 h-44 border-[3px] rounded-full relative`}
        />
        <span>Welcome {username}!</span>
        <LogoutBtn customStyle="flex relative gap-2 justify-center items-center px-6 py-2" />
      </div>
    </div>
  );
}

export default Profile;
