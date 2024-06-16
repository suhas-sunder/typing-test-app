import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

function InspirationalQuotes() {
  const pageTitle =
    "Here are some of the Inspirational quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${1}_lvl_${8}.json`;

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
            Unlocking Creativity and Precision: The Art of Typing Inspirational
            Quotes
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In a world brimming with distractions and demands, finding ways to
            hone our writing skills while staying motivated can be a daunting
            task. Yet, nestled amidst the cacophony of everyday life lies a
            simple yet powerful tool: typing inspirational quotes. Beyond their
            aesthetic appeal, these nuggets of wisdom possess the potential to
            elevate both our writing prowess and our spirits.
          </p>
          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Rhythm of Keys: A Symphony of Words
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
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
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Learning by Example: The Art of Emulation
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the pursuit of mastery, emulation is a time-honored path.
              Typing inspirational quotes offers a canvas upon which we can
              trace the strokes of literary giants. By dissecting their syntax,
              exploring their choice of words, and unraveling the tapestry of
              their ideas, we glean invaluable insights into the art of writing.
              Through this process of deconstruction and reconstruction, we
              sharpen our own skills and cultivate a deeper appreciation for the
              craft.
            </p>
          </section>
          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              A Source of Inspiration: Nurturing the Creative Spark
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In moments of doubt or stagnation, the wisdom encapsulated within
              inspirational quotes serves as a beacon of inspiration. Whether
              it’s a poignant reflection on resilience or a stirring call to
              action, these words have the power to reignite our passion for
              writing. Typing them not only reinforces their message but also
              infuses our own work with newfound vigor and purpose.
            </p>
          </section>
          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Fostering Discipline: The Habit of Consistency
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Like any skill, writing thrives on consistency and discipline.
              Typing inspirational quotes offers a structured yet flexible
              routine to nurture these qualities. Whether it’s a daily ritual or
              a sporadic indulgence, the act of typing serves as a gentle
              reminder of our commitment to growth and improvement. With each
              session, we inch closer towards our goals, one keystroke at a
              time.
            </p>
          </section>
          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Cultivating Reflection: Insights Beyond the Screen
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Beyond the confines of the screen, typing inspirational quotes
              prompts us to reflect on their deeper meanings and implications.
              As we internalize their wisdom, we gain a greater understanding of
              ourselves and the world around us. This introspective journey
              fuels our creativity and enriches our writing with authenticity
              and depth.
            </p>
          </section>
          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Embracing the Journey: A Lifelong Pursuit
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the grand tapestry of writing, typing inspirational quotes is
              but a single thread, yet its impact reverberates far beyond the
              confines of the keyboard. It is a journey of discovery, a quest
              for self-expression, and a celebration of the human spirit. So let
              us embrace this timeless practice with open hearts and nimble
              fingers, for in its embrace, we find not only the keys to better
              writing but also the essence of our own voices.
            </p>
          </section>
        </article>
      )}

      {level === 4 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Top 10 Inspirational Quotes: How Handwriting or Typing Can Elevate
            English Learning and More
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Inspirational quotes have the power to uplift, motivate, and ignite
            a spark of creativity within us. Harnessing this power for
            educational purposes can transform the learning experience, making
            it both enriching and enjoyable. By transcribing 10 inspirational
            quotes, learners can embark on a journey that not only enhances
            their English proficiency but also deepens their appreciation for
            literature, sharpens hand-eye coordination, and fosters personal
            growth. Let's explore how handwriting or computer typing these
            quotes can unlock a world of possibilities.
          </p>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Top 10 Inspirational Quotes:
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
            <ul className="mb-4 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700 ">
              <li>
                <strong>Language Mastery:</strong> Transcribing inspirational
                quotes exposes learners to a rich variety of vocabulary,
                idiomatic expressions, and grammatical structures. It reinforces
                language rules and expands their linguistic repertoire in a
                meaningful context.
              </li>
              <li>
                <strong>Literary Appreciation:</strong> Many inspirational
                quotes originate from renowned authors, leaders, and
                philosophers. By engaging with these quotes, learners gain
                insight into the wisdom and philosophy of different cultures,
                eras, and ideologies.
              </li>
              <li>
                <strong>Critical Thinking:</strong> Analyzing inspirational
                quotes prompts critical thinking as learners reflect on the
                underlying messages, themes, and values conveyed. It encourages
                them to question, evaluate, and apply these insights to their
                own lives.
              </li>
              <li>
                <strong>Hand-eye Coordination:</strong> Whether handwriting in
                cursive script or typing on a keyboard, transcribing quotes
                requires coordination between the hands and eyes. It strengthens
                fine motor skills, promotes spatial awareness, and enhances
                dexterity with continued practice.
              </li>
              <li>
                <strong>Personal Growth:</strong> Inspirational quotes have the
                potential to inspire personal growth and self-improvement. By
                internalizing the messages of resilience, perseverance, and
                positivity conveyed in these quotes, learners cultivate a growth
                mindset and strive for continuous self-development.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Getting Started:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Select Your Quotes:</strong> Choose 10 inspirational
                quotes that resonate with you or cover a diverse range of themes
                and perspectives.
              </li>
              <li>
                <strong>Create a Learning Space:</strong> Set aside a dedicated
                space for transcribing, free from distractions and conducive to
                focused learning.
              </li>
              <li>
                <strong>Transcribe Mindfully:</strong> Whether handwriting in a
                journal or typing on a computer, transcribe each quote with care
                and attention to detail, savoring the meaning and essence of the
                words.
              </li>
              <li>
                <strong>Reflect and Share:</strong> After transcribing, take
                time to reflect on the significance of each quote and its
                relevance to your life. Share your insights with others, engage
                in discussions, or create visual displays to inspire those
                around you.
              </li>
            </ol>
          </section>

          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In conclusion, handwriting or computer typing 10 inspirational
            quotes offers a transformative learning experience that goes beyond
            language acquisition. It's an opportunity to delve into the wisdom
            of the ages, nurture personal growth, and cultivate the skills
            needed for success in both academic and real-world contexts. So,
            seize the moment, embrace the inspiration, and let your learning
            journey unfold one quote at a time!
          </p>
        </article>
      )}

      {level === 8 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Unlock Your Potential with Top 100 Inspirational Quotes: Elevate
            Your Typing Skills
          </h2>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Embrace Inspiration Through Typing
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing isn't just a mundane task—it's an opportunity to infuse
              your daily practice with purpose and meaning. By typing out
              inspirational quotes, you not only sharpen your typing skills but
              also internalize the timeless wisdom and positivity of your
              favorite figures. It's a journey of self-discovery and empowerment
              that extends beyond the keyboard.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Dive into the Wisdom of Top 100 Inspirational Quotes
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Imagine typing out words of wisdom and encouragement from iconic
              figures such as Maya Angelou, Mahatma Gandhi, and Helen Keller.
              Each quote serves as a guiding light, reminding you of your inner
              strength, resilience, and limitless potential. Through typing, you
              not only absorb these inspiring messages but also cultivate a
              mindset of optimism and perseverance.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Elevate Your Typing Experience
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out Top 100 Inspirational quotes isn't just about improving
              your typing speed and accuracy; it's about fostering a sense of
              purpose and empowerment in your daily practice. With each
              keystroke, you reinforce essential qualities such as courage,
              compassion, and determination. As you type, you embody the spirit
              of inspiration, ready to overcome obstacles and achieve your
              dreams.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Unleash Your Inspirational Potential
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Are you ready to embark on a transformative journey of inspiration
              through typing? Whether you're a devoted follower of inspirational
              figures or simply seeking guidance and motivation, mastering the
              art of typing with Top 100 Inspirational quotes is a powerful way
              to uplift your spirits and unleash your full potential. So grab
              your keyboard, embrace the wisdom of your favorite figures, and
              let the typing journey inspire you to greatness!
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Conclusion: Typing Your Way to Empowerment
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the realm of inspiration, the journey to self-discovery and
              personal growth is an ongoing adventure—one that requires
              dedication, resilience, and a willingness to embrace the wisdom of
              those who came before us. By incorporating Top 100 Inspirational
              quotes into your typing practice, you not only refine your typing
              skills but also cultivate a mindset of positivity, courage, and
              empowerment. So why wait? Start typing your way to inspiration and
              transformation today!
            </p>
          </section>
        </article>
      )}
    </div>
  );
}

export default InspirationalQuotes;
