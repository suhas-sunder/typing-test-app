import { Link } from "react-router-dom";
import LoginFormInputs from "./LoginFormInputs";

interface PropTypes {
  formData: { [key: string]: string | boolean }[];
  inputValues: { [key: string]: string };
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  setInputValues: (value: { [key: string]: string }) => void;
  setGuestLogin?: (value: boolean) => void;
  serverError: string;
}

// Used by Login.tsx and Register.tsx components
function LoginForm({
  formData,
  inputValues,
  submitForm,
  setInputValues,
  setGuestLogin,
  serverError
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
      {serverError && <span className="text-[#d43333] text-base flex w-full justify-center mt-2">{serverError}</span>}
      {Object.prototype.hasOwnProperty.call(inputValues, "emailOrUsername") && (
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
        {Object.prototype.hasOwnProperty.call(inputValues, "emailOrUsername")
          ? "Login"
          : "Sign Up"}
      </button>

      <div className="relative mt-1 flex justify-center text-center text-base sm:text-lg ">
        {Object.prototype.hasOwnProperty.call(
          inputValues,
          "emailOrUsername",
        ) ? (
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
