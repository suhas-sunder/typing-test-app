import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProfileImg from "../../assets/images/wolf_icon.jpg";
import ProfileImgWebp from "../../assets/images/wolf_icon.webp";

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
            alt="Colourful wolf standing on a mountain top."
            className={`relative flex w-full rounded-lg border-4 border-slate-800 object-cover pb-[0.5em] drop-shadow-lg`}
            width={480}
            height={784}
          />
        </picture>
        <p className="absolute bottom-0 w-full rounded-full bg-slate-800 px-3 py-[0.3em] text-center text-[0.75rem] tracking-wider">
          Level: {level}
        </p>
      </Link>
    </SparkleAnim>
  );
}

export default ProfileImageLink;
