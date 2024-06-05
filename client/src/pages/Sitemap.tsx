import { Link } from "react-router-dom";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import { Fragment, useMemo } from "react";
import SitemapData from "../data/SItemapData";

export function PageLinks({ links }) {
  return (
    <ul className="flex flex-col gap-5 py-3 sm:gap-10">
      {links.links.map((linkData) => (
        <Fragment key={links.id + linkData.id}>
          <li className="pl-5">
            <Link
              className=" font-lato text-slate-600 hover:text-sky-500"
              to={linkData.url}
            >
              {linkData.name}
            </Link>
          </li>
          <div className="flex w-full border-b sm:hidden"></div>
        </Fragment>
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
      <main className={`${fadeAnim} items mx-5 flex flex-col gap-5`}>
        <h2 className="font-lora text-xl text-slate-950">Pages</h2>
        <ul className="mx-5 flex flex-col gap-5">
          {pages.map((links) => (
            <li key={links.id}>
              <h3>
                {links.url ? (
                  <Link
                    to={links.url}
                    className="font-lora text-slate-600 hover:text-sky-500"
                  >
                    {links.title}
                  </Link>
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
