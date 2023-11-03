import { useState } from "react";
import SubmissionForm from "../components/forms/LoginForm";
import ServerAPI from "../api/userAPI";

const registerData = [
  {
    id: "username",
    name: "username",
    type: "text",
    placeholder: "Username",
    label: "Username",
    pattern: "^.{6,16}$",
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
    pattern: "",
    err: "Please enter a valid email!",
    required: true,
    asterisk: true,
  },
  {
    id: "password",
    name: "password",
    type: "text",
    placeholder: "Password",
    label: "Password",
    pattern:
      "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
    err: "Password should be 8-20 characters and include alteast 1 letter, 1 number, and 1 special character!",
    required: true,
    asterisk: true,
  },
  {
    id: "confirm-password",
    name: "confirmPassword",
    type: "text",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          if (err.response.data.startsWith("Username")) {
            console.log(err.response.data); //Username or email already exists
          } else {
            console.log(err);
          }
        });

      const parseRes = await response;

      if (parseRes) {
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
    <div className="flex justify-center py-60">
      <SubmissionForm
        formData={registerData}
        submitForm={handleSubmit}
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
    </div>
  );
}

export default Register;
