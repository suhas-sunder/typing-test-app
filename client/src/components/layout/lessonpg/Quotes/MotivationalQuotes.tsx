import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";

export default function MotivationalQuotes() {
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
      <div className="container mx-auto py-8">
        <h2 className="mb-4 text-2xl font-bold">
          The Power of Typing: 100 Motivational Quotes to Fuel Your Spirit
        </h2>
        <section className="mb-8">
          <h3 className="mb-2 text-lg font-bold">Introduction</h3>
          <p className="mb-4">
            In the world of motivation, every word counts. Whether spoken aloud,
            penned on paper, or typed onto a screen, the impact of inspirational
            messages can be profound. Imagine harnessing the energy of not just
            one, but a hundred motivational quotes, each keystroke propelling
            you forward on your journey of self-discovery and empowerment.
            Welcome to the exhilarating realm of typing motivational quotes.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="mb-2 text-lg font-bold">
            The Beauty of Typing Motivational Quotes
          </h3>
          <p className="mb-4">
            The beauty of typing motivational quotes lies in its simplicity yet
            profound impact. With each quote typed, you’re not just stringing
            together letters; you’re breathing life into words that have the
            power to uplift, inspire, and transform. It’s a symbiotic
            relationship between the typist and the text, where energy flows
            from one to the other, creating a ripple effect of positivity.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="mb-2 text-lg font-bold">The Process</h3>
          <p className="mb-4">
            Picture yourself seated at your keyboard, fingertips poised, ready
            to embark on a journey of motivation. As you type each quote, you’re
            not just engaging in a mechanical task; you’re actively immersing
            yourself in the wisdom and insight of those who have walked the path
            of greatness before you. From the timeless words of Maya Angelou to
            the stirring speeches of Winston Churchill, each quote serves as a
            beacon of hope and encouragement.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="mb-2 text-lg font-bold">Internalization</h3>
          <p className="mb-4">
            But the magic doesn’t stop there. Typing motivational quotes is not
            just about absorbing inspiration; it’s also about embodying it. As
            you type, you internalize the message, allowing it to seep into your
            consciousness and shape your mindset. It’s a process of
            self-affirmation, where the act of typing becomes a declaration of
            your belief in yourself and your potential.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="mb-2 text-lg font-bold">Empowerment Through Typing</h3>
          <p className="mb-4">
            Moreover, the act of typing itself can be incredibly empowering.
            With each keystroke, you’re taking control of your narrative,
            shaping your destiny one word at a time. It’s a tangible expression
            of agency, a reminder that you have the power to steer your life in
            the direction of your dreams. And as you type, you’re not just
            motivating yourself; you’re inspiring others who may stumble upon
            your words in the vast expanse of the digital realm.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="mb-2 text-lg font-bold">Conclusion</h3>
          <p className="mb-4">
            In a world that can sometimes feel chaotic and overwhelming, typing
            motivational quotes offers a sanctuary of solace and strength. It’s
            a reminder that no matter how daunting the journey may seem, you are
            never alone. With each quote typed, you’re joining a global
            community of dreamers and doers, united by a shared commitment to
            growth and resilience.
          </p>
          <p className="mb-4">
            So, if you ever find yourself in need of a boost of motivation, look
            no further than your keyboard. Dive into the ocean of inspirational
            quotes and let your fingers dance across the keys, infusing each
            stroke with passion and purpose. For in the act of typing, you’ll
            discover a wellspring of motivation that knows no bounds, propelling
            you ever closer to the life of your dreams.
          </p>
        </section>
      </div>
    </div>
  );
}
