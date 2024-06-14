//LoginForm.tsx

import { Link } from "react-router-dom";
import type { AuthFormData } from "../../../pages/Login";
import { useState } from "react";
import styles from "./styles/LoginFormInputs.module.css";

interface PropTypes {
  formData: AuthFormData;
  inputValues: { [key: string]: string };
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  setInputValues: (value: { [key: string]: string }) => void;
  setGuestLogin?: (value: boolean) => void;
  serverError: string;
}

type FormInputProps = {
  inputData: { [key: string]: string | boolean | null };
  inputValues: { [key: string]: string };
  setInputValues: (value: { [key: string]: string }) => void;
};

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    focused?: string; //Allows for custom HTML attribute type called focused
  }
}
// Used by LoginForm.tsx component
function LoginFormInputs({
  inputData,
  inputValues,
  setInputValues,
}: FormInputProps) {
  const [focused, setFocused] = useState<boolean>(false);
  const { pattern, asterisk: dispAsterisk, ...inputs } = inputData;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <label
        htmlFor={inputData.id?.toString()}
        className="relative mr-auto cursor-pointer pl-1 hover:border-0"
      >
        {dispAsterisk ? `${inputData.label} *` : inputData.label}
      </label>
      <input
        {...inputs}
        pattern={
          inputData.name?.toString().startsWith("confirm")
            ? inputValues.password
            : inputData.name?.toString().startsWith("email")
              ? undefined
              : pattern?.toString()
        }
        className="relative rounded-md border-2 border-solid p-2 pl-4"
        onChange={handleChange}
        onBlur={() => setFocused(true)}
        onFocus={() => setFocused(false)}
        focused={focused.toString()}
      />
      <span
        className={`${styles.error} relative hidden items-center justify-center text-center text-sm`}
      >
        {inputData.err}
      </span>
    </>
  );
}

// Used by Login.tsx and Register.tsx components
function LoginForm({
  formData,
  inputValues,
  submitForm,
  setInputValues,
  setGuestLogin,
  serverError,
}: PropTypes) {
  return (
    <form
      onSubmit={submitForm}
      className="relative mx-5 flex w-full  max-w-md flex-col gap-4 font-nunito text-xl"
    >
      {formData.map((data) => (
        <LoginFormInputs
          key={data.id.toString()}
          inputData={data}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      ))}
      {serverError && (
        <span className="mt-2 flex w-full items-center justify-center text-center text-base leading-loose text-[#d43333]">
          {serverError}
        </span>
      )}
      {location.pathname.includes("login") && (
        <div className="relative mt-2 flex justify-between text-sm sm:text-base">
          {/* Add a remember-me and forgot password option here */}
          <div className="flex gap-2">
            <input
              id="remember-me-input"
              type="checkbox"
              className="cursor-pointer"
            />
            <label htmlFor="remember-me-input" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <div className="underline underline-offset-2">
            <Link to="/register" className="cursor-pointer">
              Forgot your password?
            </Link>
          </div>
        </div>
      )}
      <button
        type="submit"
        className="text-md mt-3 flex w-full items-center justify-center rounded-lg border-2 bg-sky-700 py-4 text-white outline-green-900 hover:scale-[1.01] hover:brightness-105"
      >
        {location.pathname.includes("login") ? "Login" : "Sign Up"}
      </button>

      <div className="relative mt-1 flex justify-center text-center text-base sm:text-lg ">
        {location.pathname.includes("login") ? (
          <div className="flex flex-col gap-5">
            <Link to="/register">
              Don't have an account?{" "}
              <span className="underline underline-offset-2">Sign up now!</span>
            </Link>
            <button
              type="button"
              onClick={() => (setGuestLogin ? setGuestLogin(true) : {})}
              className="flex w-full items-center justify-center py-2 text-xl underline "
            >
              Login as a guest
            </button>
          </div>
        ) : (
          <Link to="/login">
            Already have an account?{" "}
            <span className="underline underline-offset-2">Login here!</span>
          </Link>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
