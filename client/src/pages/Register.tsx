import { useEffect, useState } from "react";
import ServerAPI from "../api/userAPI";

import loadable from "@loadable/component";
import PasswordValidation from "../utils/PasswordValidation";

const LoginForm = loadable(() => import("../components/forms/LoginForm"));

const registerData = [
  {
    id: "username",
    name: "username",
    type: "text",
    placeholder: "Username",
    label: "Username",
    pattern: "^.{0,16}$",
    err: "Username must be between 6 and 16 characters!",
    required: true,
    asterisk: true,
  },
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
    required: true,
    asterisk: true,
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
    required: true,
    asterisk: true,
  },
  {
    id: "confirm-password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    pattern: "",
    err: "Password does not match!",
    required: true,
    asterisk: true,
  },
];
interface PropTypes {
  setAuth: (value: boolean) => void;
}

function Register({ setAuth }: PropTypes) {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [serverError, setServerError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const err = PasswordValidation({ password: inputValues.password });

    //Display validation error and skip submission
    if (err) {
      setServerError(err);
      return;
    }

    try {
      const data = {
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        username: inputValues.username,
        email: inputValues.email,
        password: inputValues.password,
      };

      const response = await ServerAPI.post("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: data,
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
            setServerError("An account with this email already exists!");

          console.log(message);
        });

      const parseRes = await response;

      if (parseRes) {
        localStorage.setItem("jwt_token", parseRes.jwt_token);
        setAuth(true);
      } else {
        console.log("Error creating creating user account");
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
    LoginForm.load();
  }, []);

  return (
    <div className="xl:py-58 relative flex justify-center px-5 py-24 lg:py-48">
      <LoginForm
        formData={registerData}
        submitForm={handleSubmit}
        inputValues={inputValues}
        setInputValues={setInputValues}
        serverError={serverError}
      />
    </div>
  );
}

export default Register;
