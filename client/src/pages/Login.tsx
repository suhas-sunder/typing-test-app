import { useState } from "react";
import SubmissionForm from "../components/forms/SubmissionForm";
import formInputData from "../local-json/formInputData.json"; //Contains input & label defaults for form
import ServerAPI from "../api/userAPI";

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
          emailOrUsername: inputValues.emailOrUsername,
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
        formData={formInputData.login}
        submitForm={handleSubmit}
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
    </div>
  );
}

export default Login;
