import { Link } from "react-router-dom";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import SitemapData from "../data/SItemapData";

export function PageLinks({ links }) {
  return (
    <ul>
      {links.links.map((linkData) => (
        <li>
          <Link
            key={links.id + linkData.id}
            className="pl-5 font-lato"
            to={linkData.url}
          >
            {linkData.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Sitemap() {
  const { fadeAnim } = useLoadAnimation();
  const pages = useMemo(() => SitemapData(), []);

  return (
    <div
      className={` mx-auto flex max-w-[900px] flex-col gap-5 py-12  font-nunito tracking-wider text-sky-700`}
    >
      <header>
        <h1 className="flex w-full justify-center text-3xl text-defaultblue">
          Sitemap
        </h1>
      </header>
      <main className={`${fadeAnim} mx-5 flex flex-col gap-5`}>
        <h2 className="font-lora text-xl">Pages</h2>
        <ul className="mx-5 grid grid-cols-4 gap-5">
          {pages.map((links) => (
            <li key={uuidv4()}>
              <h3 className="font-lora text-sky-600 hover:text-sky-500">
                {links.url ? (
                  <Link to={links.url}>{links.title}</Link>
                ) : (
                  <span className="text-slate-950">{links.title}</span>
                )}
              </h3>
              <PageLinks links={links} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Sitemap;
