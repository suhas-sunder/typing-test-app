import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";

export default function AnimatedShowQuotes() {
  const lessonData = useMemo(() => LessonData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = lessonData
      ?.filter((lesson) => lesson?.id?.includes("quotes-id"))[0]
      ?.lessonData[7]?.sectionData[7]?.text?.split(`" Quote `);

    quotesArr && setQuotesData(quotesArr);
  }, [lessonData]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
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
      <article className="prose lg:prose-xl">
        <h2 className="mb-4 text-2xl font-bold">
          10 Reasons Why Typing Out 100 Animated Show Quotes is Beneficial
        </h2>
        <p>
          In the world of typing exercises, there's a fun and rewarding
          challenge that fans of animated shows might find particularly
          appealing: typing out 100 quotes from their favorite animated series.
          While it may seem like a simple task, the benefits extend far beyond
          just improving your typing speed. Let's delve into why this activity
          can be both enjoyable and advantageous.
        </p>
        <ol className="list-decimal pl-6">
          <li>
            <strong>Enhanced Typing Skills:</strong> Typing out a multitude of
            quotes is an excellent way to hone your typing speed and accuracy.
            As you type, you're actively engaging your fingers and mind,
            gradually improving your proficiency with each keystroke.
          </li>
          <li>
            <strong>Cultural Immersion:</strong> Animated shows are rich in
            cultural references, humor, and themes. By typing out quotes from
            various animated series, you immerse yourself in different cultural
            contexts, broadening your understanding and appreciation of diverse
            perspectives.
          </li>
          <li>
            <strong>Language Mastery:</strong> Animated shows span a wide
            spectrum of genres and writing styles, from clever quips to profound
            soliloquies. Typing out quotes exposes you to varied language
            patterns, enhancing your vocabulary and language comprehension
            skills.
          </li>
          <li>
            <strong>Memorable Moments:</strong> Many animated shows feature
            iconic moments and memorable lines that resonate with viewers. By
            typing out these quotes, you reinforce them in your memory, making
            them easier to recall and share with others.
          </li>
          <li>
            <strong>Motivation to Practice:</strong> Typing out quotes from
            beloved animated series can transform a mundane typing exercise into
            an engaging and enjoyable activity. The motivation to see your
            favorite lines accurately typed can spur you to practice typing more
            frequently and consistently.
          </li>
          <li>
            <strong>Creative Inspiration:</strong> Animated shows often showcase
            imaginative storytelling and witty dialogue. Typing out quotes from
            these shows can spark your creativity and inspire new ideas, whether
            it's for writing, artwork, or other creative endeavors.
          </li>
          <li>
            <strong>Community Connection:</strong> Sharing your typed quotes
            with fellow fans can foster a sense of community and connection. It
            opens up opportunities for discussions, exchanges of favorite
            moments, and the discovery of new shows and quotes to enjoy.
          </li>
          <li>
            <strong>Stress Relief:</strong> Engaging in a familiar and enjoyable
            activity like typing out quotes can serve as a form of relaxation
            and stress relief. It provides a brief escape from daily pressures,
            allowing you to unwind while indulging in the world of your favorite
            animated series.
          </li>
          <li>
            <strong>Sense of Achievement:</strong> Completing the challenge of
            typing out 100 animated show quotes is an accomplishment worth
            celebrating. It demonstrates your dedication to improving your
            typing skills while immersing yourself in the content you love.
          </li>
          <li>
            <strong>Fun and Enjoyment:</strong> Above all, typing out animated
            show quotes is a fun and enjoyable activity. It allows you to
            revisit beloved moments, characters, and stories, all while
            sharpening your typing skills in a lighthearted and entertaining
            manner.
          </li>
        </ol>
        <p>
          In conclusion, typing out 100 animated show quotes offers a myriad of
          benefits, from enhancing your typing speed and language skills to
          fostering creativity and community connections. So, grab your
          keyboard, cue up your favorite shows, and embark on this rewarding
          typing adventure!
        </p>
      </article>
    </div>
  );
}