import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";
import DisplayQuotes from "./DisplayQuotes";

export default function VideoGameQuotes() {
  const pageTitle =
    "Here are some of the Video Game quotes you will be typing!";
  const lessonData = useMemo(() => LessonData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = lessonData
      ?.filter((lesson) => lesson?.id?.includes("quotes-id"))[0]
      ?.lessonData[3]?.sectionData[7]?.text?.split(`" Quote `);

    quotesArr && setQuotesData(quotesArr);
  }, [lessonData]);
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <DisplayQuotes title={pageTitle} quotesData={quotesData} />
      <h2 className="mb-4 text-center text-2xl font-bold">
        Here are some of the Video Game quotes you will be typing!
      </h2>
      <section className="bg-gray-100 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {quotesData.map((quote, index) => (
              <blockquote
                key={quote}
                className="flex gap-2 text-lg font-medium text-gray-800"
              >
                <h3 className="whitespace-nowrap">Quote</h3>
                <p>{index === 0 ? quote.slice(6) : quote}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
      <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
        <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
          The Joy of Typing: 100 Video Game Quotes on a Typing Test Site
        </h2>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Introduction
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In the vast landscape of gaming, where pixels paint worlds and
            stories come alive through controllers and keyboards, there exists a
            treasure trove of memorable quotes that have left an indelible mark
            on players worldwide. From the stirring speeches of heroic leaders
            to the witty banter of lovable sidekicks, these lines have become
            ingrained in the fabric of gaming culture. But what if I told you
            that typing these quotes could be not just nostalgic, but also
            incredibly fun and satisfying?
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            The Appeal of Typing Test Sites
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Typing test sites offer enthusiasts a unique challenge to test their
            speed and accuracy. While some may choose classic literature or
            famous speeches, there's a particular joy in typing out beloved
            video game quotes. The challenge isn't just about speed; it's about
            reliving cherished moments and celebrating the storytelling prowess
            of gaming.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Embarking on the Challenge
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Why stop at a handful of quotes when you can embark on a quest to
            type a hundred of them? The challenge becomes a journey through
            gaming's greatest adventures. From the whimsical wisdom of The
            Legend of Zelda to the philosophical ponderings of BioShock, each
            quote offers a glimpse into the unique worlds and characters that
            have captivated us for decades.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Discovering Gaming Gems
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Typing out these quotes isn't just about reliving past glories; it's
            also an opportunity to discover new favorites and revisit old
            classics. As you progress through your list of 100 quotes, you may
            stumble upon hidden gems from games you've yet to play, sparking
            curiosity and excitement for future adventures. Each keystroke
            becomes a tribute to the immersive storytelling that defines the
            medium.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Community and Camaraderie
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Moreover, typing out these quotes fosters a sense of camaraderie
            within the gaming community. Online forums dedicated to typing tests
            provide a space for participants to share their experiences, compare
            scores, and celebrate each other's accomplishments. It's a chance to
            connect with like-minded individuals who share a passion for both
            gaming and the art of typing.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Conclusion
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In the end, typing 100 video game quotes on a typing test site isn't
            just about honing your typing skills; it's a celebration of
            everything that makes gaming great. It's about reliving cherished
            memories, discovering new favorites, and connecting with a community
            that shares your love for virtual worlds and epic adventures. So, if
            you're looking for a fun and nostalgic challenge to test your typing
            prowess, why not embark on a journey through gaming history? Grab
            your keyboard, fire up your favorite typing test site, and prepare
            to immerse yourself in a world of quotes, characters, and memories
            that will stay with you long after the final keystroke.
          </p>
        </section>
      </article>
    </div>
  );
}
