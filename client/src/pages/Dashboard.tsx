import { useState, useEffect } from "react";
import ServerAPI from "../api/accountAPI";

interface PropType {
  setAuth: (value: boolean) => void;
}

function Dashboard({ setAuth }: PropType) {
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

  // Clear local storage
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("jwt_token");
    setAuth(false);
  };

  return (
    <>
      <div>Welcome {username}!</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
