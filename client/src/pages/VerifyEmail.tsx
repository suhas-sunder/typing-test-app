import { useCallback, useEffect, useState } from "react";
import PostVerifyEmail from "../utils/requests/PostVerifyEmail";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [displayError, setDisplayError] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [accoutnDetails, setAccountDetails] = useState<{
    username: string;
    email: string;
  }>({ username: "", email: "" });
  const navigate = useNavigate();

  const handleVerification = useCallback(async () => {
    const searchPath = location.search.split("=");
    if (
      searchPath.length === 0 ||
      !searchPath[1] ||
      searchPath[1] === "%22%22" || //Empty string gets converted to this in search path
      !searchPath[0].includes("emailToken")
    )
      return navigate("/login"); //If pathname is invalid or empty, redirect to login page.

    const emailToken = searchPath[1];

    await PostVerifyEmail({
      emailToken,
      setDisplayError,
      setIsVerified,
      setAccountDetails,
    });
  }, [navigate]);

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  return (
    <div className="absolute left-1/2 top-1/2 flex w-full max-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8 text-center font-lato text-lg leading-loose tracking-widest text-slate-600">
      <header>
        {displayError ? (
          <h1 className="font-nunito text-2xl text-defaultblue">
            Uh oh... Something went wrong!
          </h1>
        ) : (
          <h1 className="font-nunito text-2xl text-defaultblue">
            {isVerified ? "Congratulations!" : "Verify Your Email!"}
          </h1>
        )}
      </header>
      <main>
        {" "}
        {!isVerified && !displayError && (
          <div>
            <p>Your email is being verified...</p>{" "}
            <p className="mt-8 max-w-[600px] text-sm leading-loose tracking-widest">
              If the verification process takes longer than 60 seconds, please
              contact us at{" "}
              <span>
                <Link
                  className="text-sky-600 hover:text-sky-500"
                  to="mailto:admin@freetypingcamp.com"
                >
                  admin@freetypingcamp.com
                </Link>
              </span>{" "}
              or try again later.
            </p>
          </div>
        )}
        {isVerified && (
          <p>
            <span className="font-nunito text-defaultblue">
              {accoutnDetails.username}
            </span>
            Your account{" "}
            <span className="font-nunito text-defaultblue">
              {accoutnDetails.email}
            </span>{" "}
            has been successfully verified.{" "}
            <span>
              <Link
                className="font-nunito text-sky-600 hover:text-sky-500"
                to={"/login"}
              >
                Try logging in here!
              </Link>
            </span>
          </p>
        )}
        {displayError && (
          <ul className="flex flex-col gap-5 font-nunito text-red-500">
            <li className="text-defaultblue">It is possible that...</li>{" "}
            <li>
              1) Your email has already been verified.{" "}
              <span>
                <Link className="text-sky-600 hover:text-sky-500" to={"/login"}>
                  Try logging in here!
                </Link>
              </span>
            </li>
            <li>
              2) An account with your email may not yet exist.
              <span>
                {" "}
                <Link
                  className="text-sky-600 hover:text-sky-500"
                  to={"/register"}
                >
                  Try signing up here!
                </Link>
              </span>{" "}
            </li>
            <li className="text-defaultblue">
              If you are still unable to verify your email and the error
              persists please contact us at{" "}
              <span>
                <Link
                  className="text-sky-600 hover:text-sky-500"
                  to="mailto:admin@freetypingcamp.com"
                >
                  admin@freetypingcamp.com
                </Link>
              </span>
              !
            </li>
            <li>*Error Log: {displayError}</li>
          </ul>
        )}
      </main>
    </div>
  );
}
