import { Link } from "react-router-dom";
import SparkleAnim from "../../utils/SparkleAnim";
import ProfileImg from "../assets/images/wolf_icon.jpg";

function ProfileImageLink() {
  return (
    <SparkleAnim>
      <Link
        to="/profile"
        title="Profile page"
        className="relative flex max-w-[9em] cursor-pointer justify-center rounded-lg bg-slate-800 hover:scale-105"
      >
        <img
          src={ProfileImg}
          alt="Colourful wolf standing on a mountain top."
          className={`relative flex w-full rounded-lg border-4 border-slate-800 object-cover pb-[0.5em] drop-shadow-lg`}
        />
        <p className="absolute bottom-0 w-full rounded-full bg-slate-800 px-3 py-[0.3em] text-center text-[0.75rem] tracking-wider">
          Level: 0
        </p>
      </Link>
    </SparkleAnim>
  );
}

export default ProfileImageLink;
