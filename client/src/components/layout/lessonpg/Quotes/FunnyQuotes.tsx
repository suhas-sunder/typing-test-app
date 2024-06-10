import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";

export default function FunnyQuotes() {
  const lessonData = useMemo(() => LessonData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = lessonData
      ?.filter((lesson) => lesson?.id?.includes("quotes-id"))[0]
      ?.lessonData[1]?.sectionData[7]?.text?.split(`" Quote `);

    quotesArr && setQuotesData(quotesArr);
  }, [lessonData]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold">
        Here are some of the Inspirational quotes you will be typing!
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
      <article className="px-4 py-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Mastering Touch Typing: A Fun Journey with Humorous Quotes
          </h2>
          <p>
            Are you tired of boring typing exercises? Do you want to improve
            your typing skills while having fun? Look no further! In this
            article, we'll explore how you can master touch typing through an
            enjoyable and humorous journey with funny quotes.
          </p>
        </section>

        <section>
          <h3 className="mb-4 mt-8 text-xl font-semibold">
            The Importance of Touch Typing
          </h3>
          <p>
            Touch typing is a valuable skill in today's digital age. Whether
            you're a student, a professional, or simply someone who spends a lot
            of time on a computer, improving your typing speed and accuracy can
            significantly boost your productivity and efficiency.
          </p>
        </section>

        <section>
          <h3 className="mb-4 mt-8 text-xl font-semibold">
            Making Typing Practice Fun
          </h3>
          <p>
            Typing practice doesn't have to be dull and repetitive. By
            incorporating humor into your typing exercises, you can turn a
            mundane task into an enjoyable activity. Funny quotes serve as
            engaging content that keeps you entertained while you hone your
            typing skills.
          </p>
        </section>

        <section>
          <h3 className="mb-4 mt-8 text-xl font-semibold">
            How to Use Humorous Quotes for Typing Practice
          </h3>
          <ul className="list-disc pl-6">
            <li>
              Choose Your Favorite Quotes: Select a collection of funny quotes
              that resonate with you. These quotes should not only make you
              laugh but also inspire you to type them out with enthusiasm.
            </li>
            <li>
              Set Realistic Goals: Start with a manageable number of quotes per
              session. Focus on accuracy first, then gradually increase your
              typing speed as you become more proficient.
            </li>
            <li>
              Break It Down: Break each quote into smaller segments and focus on
              typing them accurately. This approach helps reinforce muscle
              memory and improves typing fluency.
            </li>
            <li>
              Use Proper Technique: Practice proper finger placement on the
              keyboard (home row keys) and maintain good posture to avoid
              fatigue and injury. Pay attention to your typing form and make
              adjustments as needed.
            </li>
            <li>
              Track Your Progress: Keep track of your typing speed and accuracy
              over time using online typing tests or dedicated typing software.
              Celebrate your milestones and use any errors as learning
              opportunities.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 mt-8 text-xl font-semibold">
            Benefits of Learning Touch Typing with Humorous Quotes
          </h3>
          <ul className="list-disc pl-6">
            <li>
              Increased Engagement: Humor adds an element of fun and excitement
              to your typing practice, keeping you engaged and motivated to
              improve.
            </li>
            <li>
              Enhanced Memorization: Funny quotes are more memorable, making it
              easier for you to recall and type them accurately.
            </li>
            <li>
              Improved Typing Skills: Regular practice with humorous quotes
              helps sharpen your typing speed, accuracy, and overall
              proficiency.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 mt-8 text-xl font-semibold">Conclusion</h3>
          <p>
            Mastering touch typing doesn't have to be a tedious chore. By
            infusing your practice sessions with humor and laughter, you can
            turn it into an enjoyable journey of self-improvement. So, grab your
            keyboard, choose your favorite funny quotes, and embark on a
            fun-filled adventure towards typing excellence!
          </p>
        </section>
      </article>
    </div>
  );
}
