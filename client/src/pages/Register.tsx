import { useState } from "react";
import SubmissionForm from "../components/forms/SubmissionForm";
import formInputData from "../local-json/formInputData.json"; //Contains input & label defaults for form

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
      const body = {
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        username: inputValues.username,
        email: inputValues.email,
        password: inputValues.password,
      };

      const response = await fetch("http://localhost:3500/v1/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        console.log(parseRes);
        // If username or email already exists, ask if user wants to reset password.
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
    <div className="flex justify-center my-20">
      <SubmissionForm
        formData={formInputData.registration}
        submitForm={handleSubmit}
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
    </div>
  );
}

export default Register;
