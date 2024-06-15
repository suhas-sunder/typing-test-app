import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function MotivationalQuotes() {
  const pageTitle =
    "Here are some of the Motivational quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${9}_lvl_${8}.json`;

    GetLessonText({ url, setLessonText: setQuotesData });
  }, []);

  return (
    <div className="rounded-lg bg-white p-6">
      <DisplayQuotes
        title={pageTitle}
        quotesData={quotesData.split(`" Quote `)}
      />
      <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
        <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
          The Power of Typing: 100 Motivational Quotes to Fuel Your Spirit
        </h2>
        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Introduction
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In the world of motivation, every word counts. Whether spoken aloud,
            penned on paper, or typed onto a screen, the impact of inspirational
            messages can be profound. Imagine harnessing the energy of not just
            one, but a hundred motivational quotes, each keystroke propelling
            you forward on your journey of self-discovery and empowerment.
            Welcome to the exhilarating realm of typing motivational quotes.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            The Beauty of Typing Motivational Quotes
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            The beauty of typing motivational quotes lies in its simplicity yet
            profound impact. With each quote typed, you’re not just stringing
            together letters; you’re breathing life into words that have the
            power to uplift, inspire, and transform. It’s a symbiotic
            relationship between the typist and the text, where energy flows
            from one to the other, creating a ripple effect of positivity.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            The Process
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
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
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Internalization
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            But the magic doesn’t stop there. Typing motivational quotes is not
            just about absorbing inspiration; it’s also about embodying it. As
            you type, you internalize the message, allowing it to seep into your
            consciousness and shape your mindset. It’s a process of
            self-affirmation, where the act of typing becomes a declaration of
            your belief in yourself and your potential.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Empowerment Through Typing
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
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
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Conclusion
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In a world that can sometimes feel chaotic and overwhelming, typing
            motivational quotes offers a sanctuary of solace and strength. It’s
            a reminder that no matter how daunting the journey may seem, you are
            never alone. With each quote typed, you’re joining a global
            community of dreamers and doers, united by a shared commitment to
            growth and resilience.
          </p>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            So, if you ever find yourself in need of a boost of motivation, look
            no further than your keyboard. Dive into the ocean of inspirational
            quotes and let your fingers dance across the keys, infusing each
            stroke with passion and purpose. For in the act of typing, you’ll
            discover a wellspring of motivation that knows no bounds, propelling
            you ever closer to the life of your dreams.
          </p>
        </section>
      </article>
    </div>
  );
}
