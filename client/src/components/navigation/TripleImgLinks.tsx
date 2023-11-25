// import Icon from "../../utils/Icon";

import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface PropType {
  linkData: {
    img: { [key: string]: string };
    link: string;
    text: string;
  }[];
}

function TripleImgLinks({ linkData }: PropType) {
  return (
    <main className="flex w-full ">
      {/* <Icon icon="sparkleFill" title="sparkle fill icon" customStyle="" /> */}
      <ul className="flex w-full cursor-pointer justify-evenly capitalize text-gray-500">
        {linkData.map((data) => (
          <li key={uuidv4()}>
            <Link
              to={data.link}
              className="flex flex-col items-center gap-5 rounded-lg border-2 px-8 py-6 pt-9 hover:border-sky-400 hover:text-sky-600"
            >
              <img
                {...data.img}
                loading="lazy"
                className="flex max-w-[12em] rounded-md"
              />
              <span>{data.text.toString()}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TripleImgLinks;
