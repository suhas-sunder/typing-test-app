import { useState } from "react";

import FormInputs from "./FormInputs";

interface PropTypes {
  formData: { [key: string]: string | boolean }[];
}

function LoginMenu({ formData }: PropTypes) {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    username: "",
    email: "",
    password: "hello",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3500/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: inputValues.username,
          email: inputValues.email,
          password: inputValues.password,
        }),
      });

      console.log(response);
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-xl max-w-md"
    >
      {formData.map((input) => (
        <FormInputs
          key={input.id.toString()}
          input={input}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginMenu;
