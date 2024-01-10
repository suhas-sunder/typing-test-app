import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProfileImg from "../../assets/images/t-rex.png";
import ProfileImgWebp from "../../assets/images/t-rex.webp";

import loadable from "@loadable/component";

const SparkleAnim = loadable(() => import("../../utils/SparkleAnim"));

function ProfileImageLink({ level }) {
  useEffect(() => {
    SparkleAnim.load();
  }, []);

  return (
    <SparkleAnim>
      <Link to="/profile" title="Profile page">
        <picture>
          <source srcSet={ProfileImgWebp} type="image/webp"></source>
          <img
            src={ProfileImg}
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

export default ProfileImageLink;
