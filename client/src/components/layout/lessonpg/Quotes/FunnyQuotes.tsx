import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function FunnyQuotes() {
  const pageTitle = "Here are some of the Funny quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${2}_lvl_${8}.json`;

    GetLessonText({ url, setLessonText: setQuotesData });
  }, []);

  return (
    <div className="rounded-lg bg-white p-6">
      <DisplayQuotes
        title={pageTitle}
        quotesData={quotesData.split(`" Quote `)}
      />
      <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
        <section>
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Mastering Touch Typing: A Fun Journey with Humorous Quotes
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Are you tired of boring typing exercises? Do you want to improve
            your typing skills while having fun? Look no further! In this
            article, we'll explore how you can master touch typing through an
            enjoyable and humorous journey with funny quotes.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            The Importance of Touch Typing
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Touch typing is a valuable skill in today's digital age. Whether
            you're a student, a professional, or simply someone who spends a lot
            of time on a computer, improving your typing speed and accuracy can
            significantly boost your productivity and efficiency.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Making Typing Practice Fun
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Typing practice doesn't have to be dull and repetitive. By
            incorporating humor into your typing exercises, you can turn a
            mundane task into an enjoyable activity. Funny quotes serve as
            engaging content that keeps you entertained while you hone your
            typing skills.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            How to Use Humorous Quotes for Typing Practice
          </h3>
          <ul className="mb-4 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
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
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Benefits of Learning Touch Typing with Humorous Quotes
          </h3>
          <ul className="mb-4 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
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
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Conclusion
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
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
