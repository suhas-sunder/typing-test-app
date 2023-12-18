import { useState, useContext, useEffect } from "react";
import ServerAPI from "../api/userAPI";
import { AuthContext } from "../providers/AuthProvider";

import loadable from "@loadable/component";

const LoginForm = loadable(() => import("../components/forms/LoginForm"));

const loginData = [
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
    pattern: "",
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
    pattern:
      "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
    err: "Password should be 8-20 characters and include alteast 1 letter, 1 number, and 1 special character!",
    required: true,
    asterisk: false,
  },
];

function Login() {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    emailOrUsername: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await ServerAPI.post("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: inputValues.email,
          password: inputValues.password,
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => console.log(err));

      const parseRes = await response;

      if (parseRes.jwt_token) {
        localStorage.setItem("jwt_token", parseRes.jwt_token);
        setIsAuthenticated(true);
      } else {
        console.log("Error authenticating user login")
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
    <div className="relative flex flex-col items-center py-60 px-5">
      <LoginForm
        formData={loginData}
        submitForm={handleSubmit}
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
    </div>
  );
}

export default Login;
