import { Link } from "react-router-dom";
import SparkleAnim from "../../utils/SparkleAnim";
import ProfileImg from "../../assets/images/wolf_icon.jpg";
import ProfileImgWebp from "../../assets/images/wolf_icon.webp";

function ProfileImageLink({level}) {
  return (
    <SparkleAnim>
      <Link
        to="/profile"
        title="Profile page"
        className="relative flex max-w-[7em] sm:max-w-[9em] cursor-pointer justify-center rounded-lg bg-slate-800 hover:scale-105"
      >
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
