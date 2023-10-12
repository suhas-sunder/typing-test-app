import { useState } from "react";
import SubmissionForm from "../components/forms/SubmissionForm";
import formInputData from "../local-json/formInputData.json"; //Contains input & label defaults for form

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
      const response = await fetch("http://localhost:3500/v1/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrUsername: inputValues.emailOrUsername,
          password: inputValues.password,
        }),
      });

      const parseRes = await response.json();

      if (response.ok) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        console.log(parseRes);
      }
    } catch (err) {
      console.log("runs");
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
    <div className="flex flex-col items-center my-20">
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
