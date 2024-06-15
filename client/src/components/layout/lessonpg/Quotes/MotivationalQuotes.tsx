import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function MotivationalQuotes() {
  const pageTitle =
    "Here are some of the Motivational quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${9}_lvl_${8}.json`;

    setLevel(parseInt(location.pathname.split("lvl-")[1]));

    GetLessonText({ url, setLessonText: setQuotesData });
  }, []);

  return (
    <div className="rounded-lg bg-white p-6">
      <DisplayQuotes
        title={pageTitle}
        quotesData={quotesData.split(`" Quote `)}
      />
      {level % 4 !== 0 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            The Power of Typing: 100 Motivational Quotes to Fuel Your Spirit
          </h2>
          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Introduction
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the world of motivation, every word counts. Whether spoken
              aloud, penned on paper, or typed onto a screen, the impact of
              inspirational messages can be profound. Imagine harnessing the
              energy of not just one, but a hundred motivational quotes, each
              keystroke propelling you forward on your journey of self-discovery
              and empowerment. Welcome to the exhilarating realm of typing
              motivational quotes.
            </p>
          </section>
          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Beauty of Typing Motivational Quotes
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              The beauty of typing motivational quotes lies in its simplicity
              yet profound impact. With each quote typed, you’re not just
              stringing together letters; you’re breathing life into words that
              have the power to uplift, inspire, and transform. It’s a symbiotic
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
              to embark on a journey of motivation. As you type each quote,
              you’re not just engaging in a mechanical task; you’re actively
              immersing yourself in the wisdom and insight of those who have
              walked the path of greatness before you. From the timeless words
              of Maya Angelou to the stirring speeches of Winston Churchill,
              each quote serves as a beacon of hope and encouragement.
            </p>
          </section>
          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Internalization
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              But the magic doesn’t stop there. Typing motivational quotes is
              not just about absorbing inspiration; it’s also about embodying
              it. As you type, you internalize the message, allowing it to seep
              into your consciousness and shape your mindset. It’s a process of
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
              shaping your destiny one word at a time. It’s a tangible
              expression of agency, a reminder that you have the power to steer
              your life in the direction of your dreams. And as you type, you’re
              not just motivating yourself; you’re inspiring others who may
              stumble upon your words in the vast expanse of the digital realm.
            </p>
          </section>
          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Conclusion
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In a world that can sometimes feel chaotic and overwhelming,
              typing motivational quotes offers a sanctuary of solace and
              strength. It’s a reminder that no matter how daunting the journey
              may seem, you are never alone. With each quote typed, you’re
              joining a global community of dreamers and doers, united by a
              shared commitment to growth and resilience.
            </p>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              So, if you ever find yourself in need of a boost of motivation,
              look no further than your keyboard. Dive into the ocean of
              inspirational quotes and let your fingers dance across the keys,
              infusing each stroke with passion and purpose. For in the act of
              typing, you’ll discover a wellspring of motivation that knows no
              bounds, propelling you ever closer to the life of your dreams.
            </p>
          </section>
        </article>
      )}

      {level === 4 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Top 10 Motivating Quotes: How Handwriting or Typing Sparks Learning
            and Growth
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Motivation is the driving force behind success and personal growth.
            Harnessing the power of motivating quotes not only uplifts spirits
            but also enhances language skills, deepens appreciation for
            literature, sharpens hand-eye coordination, and fosters a positive
            mindset. Whether through the tactile experience of handwriting or
            the convenience of computer typing, transcribing these quotes offers
            a journey of self-discovery and educational enrichment. Let's
            explore the transformative potential of 10 motivating quotes.
          </p>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Top 10 Motivating Quotes:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                "The only way to do great work is to love what you do." - Steve
                Jobs
              </li>
              <li>
                "Believe you can, and you're halfway there." - Theodore
                Roosevelt
              </li>
              <li>
                "In the middle of difficulty lies opportunity." - Albert
                Einstein
              </li>
              <li>
                "Success is not final, failure is not fatal: It is the courage
                to continue that counts." - Winston Churchill
              </li>
              <li>
                "The future belongs to those who believe in the beauty of their
                dreams." - Eleanor Roosevelt
              </li>
              <li>
                "It does not matter how slowly you go as long as you do not
                stop." - Confucius
              </li>
              <li>
                "You are never too old to set another goal or to dream a new
                dream." - C.S. Lewis
              </li>
              <li>
                "The only limit to our realization of tomorrow will be our
                doubts of today." - Franklin D. Roosevelt
              </li>
              <li>
                "What you get by achieving your goals is not as important as
                what you become by achieving your goals." - Zig Ziglar
              </li>
              <li>
                "The only person you should try to be better than is the person
                you were yesterday." - Anonymous
              </li>
            </ol>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              How Handwriting or Typing Can Help:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Language Mastery:</strong> Transcribing motivating
                quotes exposes learners to diverse vocabulary, idiomatic
                expressions, and linguistic structures. It reinforces language
                acquisition and fluency while providing real-world examples of
                English usage.
              </li>
              <li>
                <strong>Literary Engagement:</strong> Many motivating quotes
                originate from renowned figures across history and literature.
                By engaging with these quotes, learners gain insight into the
                wisdom and perspectives of influential thinkers, fostering a
                deeper appreciation for literature and human experience.
              </li>
              <li>
                <strong>Critical Thinking:</strong> Analyzing motivating quotes
                prompts critical thinking as learners reflect on the underlying
                messages, values, and implications. It encourages them to
                question assumptions, evaluate perspectives, and apply these
                insights to their own lives.
              </li>
              <li>
                <strong>Hand-eye Coordination:</strong> Whether handwriting in
                cursive script or typing on a keyboard, transcribing quotes
                requires coordination between the hands and eyes. It strengthens
                fine motor skills, promotes spatial awareness, and enhances
                dexterity with continued practice.
              </li>
              <li>
                <strong>Personal Empowerment:</strong> Motivating quotes have
                the power to inspire action and personal growth. By
                internalizing the principles of motivation and resilience
                conveyed in these quotes, learners cultivate a positive mindset,
                overcome challenges, and pursue their aspirations with renewed
                vigor.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Getting Started:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Select Your Quotes:</strong> Choose 10 motivating quotes
                that resonate with you or cover a diverse range of themes and
                perspectives.
              </li>
              <li>
                <strong>Create a Learning Environment:</strong> Set aside a
                dedicated space for transcribing, free from distractions and
                clutter.
              </li>
              <li>
                <strong>Transcribe with Care:</strong> Whether handwriting in a
                journal or typing on a computer, transcribe each quote
                mindfully, paying attention to spelling, punctuation, and
                formatting.
              </li>
              <li>
                <strong>Reflect and Apply:</strong> After transcribing, take
                time to reflect on the meaning and significance of each quote.
                Consider how you can apply these motivational principles to your
                own life, goals, and aspirations.
              </li>
            </ol>
          </section>

          <p>
            In conclusion, handwriting or computer typing 10 motivating quotes
            offers a transformative learning experience that ignites passion,
            fuels growth, and cultivates resilience. It's an opportunity to
            explore the power of words, nurture essential skills, and embrace a
            mindset of optimism and determination. So, seize the opportunity,
            embrace the inspiration, and embark on a journey of self-discovery
            and empowerment!
          </p>
        </article>
      )}

      {level === 8 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Unleash Your Potential with Top 100 Motivational Quotes: Elevate
            Your Typing Skills
          </h2>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Embrace Motivation Through Typing
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing isn't just a practical skill—it's a gateway to personal
              growth and empowerment. By typing out inspirational quotes, you
              internalize their message, reinforcing positivity and motivation
              with every keystroke. It's a dynamic approach to learning that
              merges the art of typing with the power of motivational wisdom.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Dive into the Wisdom of Top 100 Motivational Quotes
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Imagine typing out words of encouragement and empowerment from
              iconic motivational speakers such as Tony Robbins, Les Brown, and
              Zig Ziglar. Each quote serves as a beacon of hope, reminding you
              of your limitless potential and inner strength. Through typing,
              you not only absorb these uplifting messages but also infuse your
              typing practice with purpose and inspiration.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Elevate Your Typing Experience
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out Top 100 Motivational quotes isn't just about improving
              your typing speed and accuracy; it's about cultivating a mindset
              of positivity and resilience. With each quote, you reinforce
              essential traits such as determination, perseverance, and
              self-belief. As you type, you embody the spirit of motivation,
              ready to overcome challenges and achieve your goals.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Unleash Your Motivational Potential
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Are you ready to embark on a transformative journey of motivation
              through typing? Whether you're a devoted follower of motivational
              speakers or simply seeking inspiration, mastering the art of
              typing with Top 100 Motivational quotes is a powerful way to
              uplift your spirits and propel yourself forward. So grab your
              keyboard, embrace the wisdom of motivational leaders, and let the
              typing journey ignite your passion!
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Conclusion: Typing Your Way to Inspiration
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the realm of motivation, the journey to personal growth is an
              ongoing adventure—one that requires dedication, resilience, and a
              positive mindset. By incorporating Top 100 Motivational quotes
              into your typing practice, you not only refine your typing skills
              but also cultivate a mindset of optimism and empowerment. So why
              wait? Start typing your way to inspiration and achievement today!
            </p>
          </section>
        </article>
      )}
    </div>
  );
}
