// import Icon from "../../utils/Icon";

import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SparkleAnim from "../../utils/SparkleAnim";

interface PropType {
  linkData: {
    img: { [key: string]: string };
    webpImgSrc: string;
    link: string;
    text: string;
  }[];
  customStyle: string;
}

function ImgLinks({ linkData, customStyle }: PropType) {
  return (
    <ul
      className={`${customStyle} grid max-w-[1060px] grid-cols-1 items-center justify-center gap-y-28 font-lato capitalize text-gray-500 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-20 md:mx-8 md:grid-cols-3 md:gap-x-16 md:gap-y-24  lg:gap-16`}
    >
      {/* <Icon icon="sparkleFill" title="sparkle fill icon" customStyle="" /> Add floating sparkles on hover */}
      {linkData.map((data) => (
        <li key={uuidv4()} className="hover:scale-[1.03]">
          <SparkleAnim>
            <Link
              to={data.link}
              className="z-[10] flex max-w-[15em] flex-col items-center justify-center rounded-lg border-2 bg-transparent bg-white px-5 py-6 pb-10  hover:border-sky-400 hover:text-sky-700"
            >
              <picture>
                <source srcSet={data.webpImgSrc} type="image/webp"></source>
                <img
                  {...data.img}
                  loading="lazy"
                  className="flex rounded-md"
                  width={480}
                  height={784}
                />
              </picture>
              <span className="absolute -bottom-4 flex items-center justify-center rounded-full border-2 bg-white px-4 py-2 text-sm tracking-wider md:text-[0.9rem]">
                {data.text.toString()}
              </span>
            </Link>
          </SparkleAnim>
        </li>
      ))}
    </ul>
  );
}

export default ImgLinks;
