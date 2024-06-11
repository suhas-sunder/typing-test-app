//Used by Profile.tsx component

import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useImg from "../../hooks/useImg";
import useLoadAnimation from "../../hooks/useLoadAnimation";
export default function ProfileAccount() {
  const { userName, email } = useAuth();
  const { imageData } = useImg();
  const [profileImgURL, setProfileImgURL] = useState<string>("");

  const inputs = [
    {
      id: "username",
      type: "text",
      text: "Username",
      placeholder: userName,
    },
    {
      id: "email",
      type: "email",
      text: "Email",
      placeholder: email,
    },
    {
      id: "password",
      type: "password",
      text: "Password",
      placeholder: "********",
    },
  ];

  const { fadeAnim } = useLoadAnimation();

  useLayoutEffect(() => {
    const savedImgURL = imageData.profile_pathname;
    if (savedImgURL && profileImgURL !== savedImgURL) {
      setProfileImgURL(
        `https://www.honeycombartist.com${imageData.profile_pathname}`,
      );
    } else {
      setProfileImgURL(
        "https://www.honeycombartist.com/origami-style%2Fkitten%2Fkitten",
      );
    }
  }, [imageData, profileImgURL]);

  return (
    <>
      <div
        className={`${fadeAnim} flex flex-col items-center gap-8 pb-6 transition-opacity duration-700 ease-in`}
      >
        <Link to="/profile/img">
          <picture className="flex min-h-[176px] min-w-[176px]">
            <source srcSet={`${profileImgURL}.webp`} type="image/webp"></source>
            <img
              src={`${profileImgURL}.png`}
              alt="Colourful wolf standing on a mountain top."
              className={`relative flex h-44 w-44 rounded-2xl border-defaultblue bg-defaultblue object-cover`}
              width={176}
              height={176}
            />
          </picture>
        </Link>
        <h2 className="min-h-10 text-center text-3xl text-sky-700  sm:text-4xl">
          {userName}
        </h2>
      </div>
      <form
        id="profile-img"
        className={`${fadeAnim} flex w-full  flex-col items-center justify-center gap-16 text-defaultblue`}
      >
        {inputs.map((input) => (
          <div
            key={input.id}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <label
              htmlFor={input.id}
              className="flex min-w-[5em] sm:justify-end"
            >
              {input.text}
              <span className="hidden sm:flex">:</span>{" "}
            </label>
            <input
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              className="min-w-[5em] rounded-md border-2 px-2 py-1"
            />
          </div>
        ))}
        <button className="rounded-lg border-2 px-4 py-2 text-xs text-red-600 hover:border-red-300">
          Delete Account
        </button>
      </form>
    </>
  );
}
