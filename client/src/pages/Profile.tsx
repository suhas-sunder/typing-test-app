import { useState, useEffect } from "react";
import ServerAPI from "../api/accountAPI";
import LogoutBtn from "../components/ui/LogoutBtn";

interface PropType {
  setAuth: (value: boolean) => void;
}

function Profile({ setAuth }: PropType) {
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
    <div className="flex flex-col justify-center items-center gap-6 py-60">
      <span>Welcome {username}!</span>
      <LogoutBtn customStyle="flex gap-2 justify-center items-center px-6 py-2" setAuth={setAuth} />
    </div>
  );
}

export default Profile;
