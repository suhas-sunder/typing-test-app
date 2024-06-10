import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";

export default function TvShowQuotes() {
  const lessonData = useMemo(() => LessonData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = lessonData
      ?.filter((lesson) => lesson?.id?.includes("quotes-id"))[0]
      ?.lessonData[5]?.sectionData[7]?.text?.split(`" Quote `);

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
      <article className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold">
          The Benefits of Writing 100 Quotes in Typing Tests: A Comprehensive
          Guide
        </h2>
        <p className="mb-4 text-lg text-gray-700">
          In today's fast-paced world, where communication happens at the speed
          of light and information overload is a constant challenge, the ability
          to type quickly and accurately is more important than ever. Typing
          proficiency not only enhances productivity but also opens up
          opportunities in various fields, from data entry to content creation.
          While there are countless resources and tools available to improve
          typing skills, one often overlooked gem is the practice of writing 100
          quotes in typing test sites. In this article, we'll explore why this
          practice is highly beneficial for users seeking to enhance their
          typing abilities.
        </p>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-bold">
            1. Diverse Content Engagement:
          </h3>
          <p className="text-gray-700">
            Typing out 100 quotes exposes users to a diverse range of content,
            spanning various topics, authors, and styles. From famous quotes by
            historical figures to passages from literature, users encounter a
            plethora of vocabulary and sentence structures. This diversity
            ensures a well-rounded typing experience, offering exposure to
            different linguistic patterns and enhancing adaptability in typing
            various types of content.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-bold">2. Building Muscle Memory:</h3>
          <p className="text-gray-700">
            Repetition is key to mastering any skill, and typing is no
            exception. Writing 100 quotes in typing tests allows users to
            repeatedly engage their muscle memory, gradually improving typing
            speed and accuracy. Through consistent practice, users develop a
            fluidity in their keystrokes, reducing hesitation and increasing
            efficiency. This muscle memory becomes ingrained over time,
            resulting in effortless typing that can significantly boost
            productivity.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-bold">
            3. Improving Accuracy and Precision:
          </h3>
          <p className="text-gray-700">
            Precision is paramount in typing, especially in contexts where
            errors can have significant consequences. Writing 100 quotes
            provides ample opportunity for users to focus on accuracy, ensuring
            that each keystroke is deliberate and error-free. As users progress
            through the quotes, they become more attuned to the nuances of
            spelling, grammar, and punctuation, thereby sharpening their
            proofreading skills and minimizing mistakes.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-bold">4. Enhancing Typing Speed:</h3>
          <p className="text-gray-700">
            Speed is a hallmark of typing proficiency, and writing 100 quotes
            serves as an effective means to increase typing speed. As users
            familiarize themselves with the quotes, they naturally become faster
            at transcribing them. Typing tests often provide metrics such as
            words per minute (WPM), allowing users to track their progress and
            set goals for improvement. Through consistent practice, users can
            gradually surpass their previous speed benchmarks, achieving greater
            efficiency in their typing endeavors.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-bold">
            5. Cultivating Focus and Concentration:
          </h3>
          <p className="text-gray-700">
            Typing requires a high level of focus and concentration, as users
            must simultaneously process visual information (the text being
            typed) and execute motor commands (pressing the corresponding keys).
            Writing 100 quotes in typing tests encourages users to hone their
            concentration skills, fostering a state of flow where distractions
            are minimized, and productivity is maximized. This heightened focus
            not only benefits typing proficiency but also carries over to other
            tasks requiring sustained attention.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-bold">Conclusion:</h3>
          <p className="text-gray-700">
            In conclusion, writing 100 quotes in typing test sites offers a
            multitude of benefits for users seeking to enhance their typing
            skills. From engaging with diverse content to building muscle
            memory, improving accuracy and speed, and cultivating focus, this
            practice serves as a comprehensive training regimen for aspiring
            typists. By incorporating regular sessions of quote typing into
            their routine, users can unlock their full typing potential and
            excel in both personal and professional endeavors. So why wait?
            Start typing those quotes today and witness the transformation in
            your typing prowess firsthand!
          </p>
        </section>
      </article>
    </div>
  );
}
