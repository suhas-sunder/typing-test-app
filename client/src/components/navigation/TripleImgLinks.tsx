// import Icon from "../../utils/Icon";

import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HoverSparkleAnim from "../../utils/HoverSparkleAnim";

interface PropType {
  linkData: {
    img: { [key: string]: string };
    link: string;
    text: string;
  }[];
}

function TripleImgLinks({ linkData }: PropType) {
  return (
    <ul className="flex w-full max-w-[1200px]  flex-col items-center justify-evenly gap-10 font-roboto capitalize text-gray-500 md:flex-row md:gap-0 ">
      {/* <Icon icon="sparkleFill" title="sparkle fill icon" customStyle="" /> Add floating sparkles on hover */}
      {linkData.map((data) => (
        <li key={uuidv4()} className="hover:scale-[1.03]">
          <HoverSparkleAnim>
            <Link
              to={data.link}
              className="z-[10] flex flex-col items-center gap-5 rounded-lg border-2 bg-white px-8 pb-6 pt-9 hover:border-sky-400 hover:text-sky-600"
            >
              <img
                {...data.img}
                loading="lazy"
                className="flex max-w-[12em] rounded-md"
              />
              <span>{data.text.toString()}</span>
            </Link>
          </HoverSparkleAnim>
        </li>
      ))}
    </ul>
  );
}

export default TripleImgLinks;
