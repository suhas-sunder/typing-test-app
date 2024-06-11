import { Link } from "react-router-dom";
import SparkleAnim from "../../ui/shared/SparkleAnim";
import { useLayoutEffect, useState } from "react";
import useImg from "../../hooks/useImg";
import Icon from "../../../utils/other/Icon";

//Displays profile image and user level info
function ProfileImageLink({ level }) {
  const { imageData } = useImg();
  const [profileImgURL, setProfileImgURL] = useState<string>("");

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
    <SparkleAnim>
      <Link to="/profile/summary">
        <picture className="flex  min-h-[190px] min-w-[144px]">
          <source srcSet={`${profileImgURL}.webp`} type="image/webp"></source>
          <img
            src={`${profileImgURL}.png`}
            alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
            className={`relative flex w-full rounded-lg border-slate-800 drop-shadow-lg`}
            width={144}
            height={190}
          />
        </picture>
        <p className="absolute -bottom-6 w-full rounded-full text-center text-[0.75rem] tracking-wider">
          Level: {level}
        </p>
      </Link>
    </SparkleAnim>
  );
}
function ProfileImg({ level, nextMilestone }) {
  return (
    <section className="relative  sm:ml-4 mr-3 flex w-full scale-90 flex-col items-center justify-center gap-5 tracking-wider sm:mb-12 sm:w-auto sm:scale-100 md:mr-2 lg:mb-4 ">
      <div className="relative flex min-h-[11.4em] max-w-[12em] cursor-pointer justify-center rounded-xl bg-slate-800 px-[7px] pb-8 pt-[9px] hover:scale-105 sm:min-h-[14.7em] sm:w-[12em]">
        <ProfileImageLink level={level} />
      </div>
      <div className="md:text-md z-10 flex flex-col items-center justify-center gap-2 md:mb-3 lg:text-lg">
        <div className="flex items-center justify-start gap-2 ">
          <h2 className="whitespace-pre">Mastery:</h2>
          <p className=" text-sky-100">Novice</p>
        </div>
        <div
          title="Points needed to reach next milestone"
          className="center absolute -bottom-8 flex cursor-default items-center justify-start text-[0.7rem] lg:-bottom-7 lg:text-[0.8rem]"
        >
          <div className="flex items-center justify-center">
            <Icon
              icon="upgrade"
              title="Points to next milestone icon"
              customStyle="scale-75"
            />
            <p className=" whitespace-pre text-sky-200">Next Milestone:</p>
          </div>
          <p className="flex items-center justify-center pl-1 tracking-widest text-sky-100">
            <span className="inline-flex">
              {nextMilestone.toLocaleString()}
            </span>
            <Icon icon="trophy" customStyle="inline-flex scale-75" />
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfileImg;
