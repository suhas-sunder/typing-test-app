import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";

function InspirationalQuotes() {
  const lessonData = useMemo(() => LessonData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = lessonData
      ?.filter((lesson) => lesson?.id?.includes("quotes-id"))[0]
      ?.lessonData[0]?.sectionData[7]?.text?.split(`" Quote `);

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
      <article>
        <h2 className="mb-4 text-2xl font-bold">
          Unlocking Creativity and Precision: The Art of Typing Inspirational
          Quotes
        </h2>
        <p className="mb-4">
          In a world brimming with distractions and demands, finding ways to
          hone our writing skills while staying motivated can be a daunting
          task. Yet, nestled amidst the cacophony of everyday life lies a simple
          yet powerful tool: typing inspirational quotes. Beyond their aesthetic
          appeal, these nuggets of wisdom possess the potential to elevate both
          our writing prowess and our spirits.
        </p>
        <section>
          <h3 className="mb-2 text-lg font-semibold">
            The Rhythm of Keys: A Symphony of Words
          </h3>
          <p className="mb-4">
            At its core, typing is a dance of fingers across the keyboard,
            translating thoughts into tangible words. Typing inspirational
            quotes invites us to immerse ourselves in the rhythm of language,
            allowing the cadence of each keystroke to guide us towards clarity
            and precision. As we transcribe the eloquence of great minds, we
            absorb not only their words but also the underlying structures and
            techniques that breathe life into prose.
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-semibold">
            Learning by Example: The Art of Emulation
          </h3>
          <p className="mb-4">
            In the pursuit of mastery, emulation is a time-honored path. Typing
            inspirational quotes offers a canvas upon which we can trace the
            strokes of literary giants. By dissecting their syntax, exploring
            their choice of words, and unraveling the tapestry of their ideas,
            we glean invaluable insights into the art of writing. Through this
            process of deconstruction and reconstruction, we sharpen our own
            skills and cultivate a deeper appreciation for the craft.
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-semibold">
            A Source of Inspiration: Nurturing the Creative Spark
          </h3>
          <p className="mb-4">
            In moments of doubt or stagnation, the wisdom encapsulated within
            inspirational quotes serves as a beacon of inspiration. Whether it’s
            a poignant reflection on resilience or a stirring call to action,
            these words have the power to reignite our passion for writing.
            Typing them not only reinforces their message but also infuses our
            own work with newfound vigor and purpose.
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-semibold">
            Fostering Discipline: The Habit of Consistency
          </h3>
          <p className="mb-4">
            Like any skill, writing thrives on consistency and discipline.
            Typing inspirational quotes offers a structured yet flexible routine
            to nurture these qualities. Whether it’s a daily ritual or a
            sporadic indulgence, the act of typing serves as a gentle reminder
            of our commitment to growth and improvement. With each session, we
            inch closer towards our goals, one keystroke at a time.
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-semibold">
            Cultivating Reflection: Insights Beyond the Screen
          </h3>
          <p className="mb-4">
            Beyond the confines of the screen, typing inspirational quotes
            prompts us to reflect on their deeper meanings and implications. As
            we internalize their wisdom, we gain a greater understanding of
            ourselves and the world around us. This introspective journey fuels
            our creativity and enriches our writing with authenticity and depth.
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-semibold">
            Embracing the Journey: A Lifelong Pursuit
          </h3>
          <p className="mb-4">
            In the grand tapestry of writing, typing inspirational quotes is but
            a single thread, yet its impact reverberates far beyond the confines
            of the keyboard. It is a journey of discovery, a quest for
            self-expression, and a celebration of the human spirit. So let us
            embrace this timeless practice with open hearts and nimble fingers,
            for in its embrace, we find not only the keys to better writing but
            also the essence of our own voices.
          </p>
        </section>
      </article>
    </div>
  );
}

export default InspirationalQuotes;
