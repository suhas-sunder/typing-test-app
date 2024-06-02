import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";

interface PropType {
  testName: string;
  difficulty: string;
}

function ViewBestStats({ testName, difficulty }: PropType) {
  return (
    <Link
      id={testName + difficulty}
      to={"/profile#stats"}
      className="flex cursor-pointer items-center justify-center gap-2 uppercase hover:text-yellow-600 text-sky-700"
    >
      {" "}
      <span>
        {" "}
        <Icon title="trophy-icon" customStyle="" icon="star" />
      </span>
      <span>
        {" "}
        <Icon title="trophy-icon" customStyle="" icon="star" />
      </span>
      <span>
        {" "}
        <Icon title="trophy-icon" customStyle="" icon="star" />
      </span>
      <span className="flex translate-y-[1.5px]">View Best Stats</span>
      <span>
        {" "}
        <Icon title="trophy-icon" customStyle="" icon="star" />
      </span>
      <span>
        {" "}
        <Icon title="trophy-icon" customStyle="" icon="star" />
      </span>
      <span>
        {" "}
        <Icon title="trophy-icon" customStyle="" icon="star" />
      </span>
    </Link>
  );
}

export default ViewBestStats;
