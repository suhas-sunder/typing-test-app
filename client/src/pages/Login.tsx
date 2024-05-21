import { useState, useContext, useEffect } from "react";
import ServerAPI from "../api/userAPI";
import { AuthContext } from "../providers/AuthProvider";

import loadable from "@loadable/component";
import PasswordValidation from "../utils/PasswordValidation";

const LoginForm = loadable(() => import("../components/forms/LoginForm"));

function Login() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [guestLogin, setGuestLogin] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    emailOrUsername: "",
    password: "",
  });

  const loginData: { [key: string]: string | boolean }[] = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      err: "Please enter a valid email!",
      required: true,
      asterisk: false,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      asterisk: false,
    },
  ];

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();

    const err = PasswordValidation({ password: inputValues.password });

    //Display validation error and skip submission
    if (err && !guestLogin) {
      setServerError(err);
      return;
    }

    try {
      const response = await ServerAPI.post("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: guestLogin ? "guest@gmail.com" : inputValues.email,
          password: guestLogin ? "Guest@123" : inputValues.password,
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          let message;

          if (err instanceof Error) {
            message = err.message;
          } else {
            message = String(err);
          }

          message.includes("Network") &&
            setServerError(
              "500 Internal Server Error. Please try again later!",
            );

          message.includes("401") &&
            setServerError("Invalid email or password!");

          console.log(message);
        });

      const parseRes = await response;

      if (parseRes.jwt_token) {
        localStorage.setItem("jwt_token", parseRes.jwt_token);
        setIsAuthenticated(true);
      } else {
        console.log("Error authenticating user login");
      }
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
    guestLogin && handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestLogin]);

  useEffect(() => {
    LoginForm.load();
  }, []);

  return (
    <div className="relative flex flex-col items-center px-5 py-24 lg:py-48 xl:py-64">
      <LoginForm
        formData={loginData}
        submitForm={handleSubmit}
        inputValues={inputValues}
        setInputValues={setInputValues}
        setGuestLogin={setGuestLogin}
        serverError={serverError}
      />
    </div>
  );
}

export default Login;
