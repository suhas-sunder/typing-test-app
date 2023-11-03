import { useState } from "react";
import SubmissionForm from "../components/forms/LoginForm";
import ServerAPI from "../api/userAPI";

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

interface PropTypes {
  setAuth: (value: boolean) => void;
}

function Login({ setAuth }: PropTypes) {
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
        setAuth(true);
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

  return (
    <div className="flex flex-col items-center py-60">
      <SubmissionForm
        formData={loginData}
        submitForm={handleSubmit}
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
    </div>
  );
}

export default Login;
