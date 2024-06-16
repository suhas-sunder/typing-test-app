import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function FunnyQuotes() {
  const pageTitle = "Here are some of the Funny quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${2}_lvl_${8}.json`;

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
              you're a student, a professional, or simply someone who spends a
              lot of time on a computer, improving your typing speed and
              accuracy can significantly boost your productivity and efficiency.
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
                Set Realistic Goals: Start with a manageable number of quotes
                per session. Focus on accuracy first, then gradually increase
                your typing speed as you become more proficient.
              </li>
              <li>
                Break It Down: Break each quote into smaller segments and focus
                on typing them accurately. This approach helps reinforce muscle
                memory and improves typing fluency.
              </li>
              <li>
                Use Proper Technique: Practice proper finger placement on the
                keyboard (home row keys) and maintain good posture to avoid
                fatigue and injury. Pay attention to your typing form and make
                adjustments as needed.
              </li>
              <li>
                Track Your Progress: Keep track of your typing speed and
                accuracy over time using online typing tests or dedicated typing
                software. Celebrate your milestones and use any errors as
                learning opportunities.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Benefits of Learning Touch Typing with Humorous Quotes
            </h3>
            <ul className="mb-4 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                Increased Engagement: Humor adds an element of fun and
                excitement to your typing practice, keeping you engaged and
                motivated to improve.
              </li>
              <li>
                Enhanced Memorization: Funny quotes are more memorable, making
                it easier for you to recall and type them accurately.
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
              turn it into an enjoyable journey of self-improvement. So, grab
              your keyboard, choose your favorite funny quotes, and embark on a
              fun-filled adventure towards typing excellence!
            </p>
          </section>
        </article>
      )}

      {level === 4 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Top 10 Funny Quotes: How Handwriting or Typing Can Boost English
            Learning and More
          </h2>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Introducing humor into learning can be a game-changer, especially
              when it comes to mastering a language like English. Whether you
              prefer the tactile feel of pen and paper or the convenience of
              typing on a computer, transcribing funny quotes can offer a myriad
              of benefits. Let's explore how handwriting or computer typing 10
              funny quotes can elevate English learning, foster appreciation for
              literature, and even enhance hand-eye coordination.
            </h3>

            <h4 className="mb-2 text-lg font-semibold leading-loose">
              The Top 10 Funny Quotes:
            </h4>
            <ol className="ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                "I intend to live forever. So far, so good." – Steven Wright
              </li>
              <li>
                "The road to success is dotted with many tempting parking
                spaces." – Will Rogers
              </li>
              <li>
                "I'm writing a book. I've got the page numbers done." – Steven
                Wright
              </li>
              <li>
                "I'm an idealist. I don't know where I'm going, but I'm on my
                way." – Carl Sandburg
              </li>
              <li>
                "I am so clever that sometimes I don't understand a single word
                of what I am saying." – Oscar Wilde
              </li>
              <li>
                "The only mystery in life is why the kamikaze pilots wore
                helmets." – Al McGuire
              </li>
              <li>
                "I told my wife the truth. I told her I was seeing a
                psychiatrist. Then she told me the truth: that she was seeing a
                psychiatrist, two plumbers, and a bartender." – Rodney
                Dangerfield
              </li>
              <li>"I'm not lazy. I'm on energy-saving mode." – Unknown</li>
              <li>
                "The trouble with having an open mind, of course, is that people
                will insist on coming along and trying to put things in it." –
                Terry Pratchett
              </li>
              <li>
                "I haven't spoken to my wife in years. I didn't want to
                interrupt her." – Rodney Dangerfield
              </li>
            </ol>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              How Handwriting or Typing Can Help:
            </h3>
            <ul className="ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Language Proficiency:</strong> Transcribing quotes
                exposes learners to various linguistic structures, idiomatic
                expressions, and vocabulary. It reinforces spelling, grammar,
                and punctuation rules in a fun and memorable way.
              </li>
              <li>
                <strong>Literary Exposure:</strong> Engaging with quotes from
                different sources introduces learners to a wide array of
                authors, genres, and literary devices. It sparks curiosity and
                encourages exploration of literature beyond the classroom.
              </li>
              <li>
                <strong>Critical Thinking:</strong> Analyzing humorous quotes
                encourages critical thinking skills as learners decipher
                underlying meanings, humor techniques, and cultural references.
                It prompts discussions and fosters a deeper understanding of
                language and context.
              </li>
              <li>
                <strong>Hand-eye Coordination:</strong> Handwriting involves
                intricate hand movements and spatial awareness, promoting
                hand-eye coordination and fine motor skills. Typing, meanwhile,
                enhances digital dexterity and typing speed, valuable skills in
                today's technology-driven world.
              </li>
              <li>
                <strong>Creativity and Expression:</strong> Writing or typing
                funny quotes can inspire creativity and self-expression. It
                encourages individuals to play with language, experiment with
                different writing styles, and develop their unique voice.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Getting Started:
            </h3>
            <ol className="ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Choose Your Quotes:</strong> Select 10 funny quotes that
                resonate with you or cover a diverse range of topics and styles.
              </li>
              <li>
                <strong>Set the Scene:</strong> Create a comfortable environment
                conducive to writing or typing, whether it's a cozy nook with
                pen and paper or a clutter-free desk with your favorite typing
                device.
              </li>
              <li>
                <strong>Transcribe Away:</strong> Take your time transcribing
                each quote, paying attention to spelling, punctuation, and
                formatting. Enjoy the process and let the humor spark joy in
                your learning journey.
              </li>
              <li>
                <strong>Reflect and Share:</strong> After transcribing, reflect
                on your favorite quotes, discuss them with friends or
                classmates, or share them on social media to spread the
                laughter.
              </li>
            </ol>
          </section>

          <p className="mb-0">
            In conclusion, whether you opt for the traditional approach of
            handwriting or the modern convenience of typing, transcribing 10
            funny quotes can be a delightful and enriching experience. It's a
            playful yet effective way to sharpen language skills, explore the
            nuances of literature, and even improve coordination. So, grab your
            pen or keyboard, and let the laughter and learning begin!
          </p>
        </article>
      )}

      {level === 8 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Elevate Your Typing Skills with Top 100 Funny Quotes: A Comedy Fan's
            Guide
          </h2>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Embrace Laughter Through Typing
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing isn't just about productivity—it's about infusing your
              daily routine with joy and humor. By typing out funny quotes, you
              not only sharpen your typing skills but also experience the
              delight of reliving your favorite comedic moments. It's a
              lighthearted journey that transforms typing practice into a
              laughter-filled adventure.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Dive into the Wit of Top 100 Funny Quotes
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Imagine typing out hilarious lines from your favorite comedians,
              sitcoms, and movies. Each quote is a nugget of comedic gold,
              guaranteed to bring a smile to your face and a chuckle to your
              lips. Through typing, you not only enjoy the humor but also
              cultivate a sense of wit and creativity in your typing practice.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Elevate Your Typing Experience
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out Top 100 Funny quotes isn't just about improving your
              typing speed and accuracy; it's about embracing the lighter side
              of life and finding joy in the little moments. With each
              keystroke, you reinforce essential qualities such as creativity,
              spontaneity, and a sense of humor. As you type, you embody the
              spirit of comedy, ready to brighten your own day and the days of
              those around you.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Unleash Your Comedy Potential
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Are you ready to embark on a laughter-filled journey of typing?
              Whether you're a die-hard fan of stand-up comedy, sitcoms, or
              witty one-liners, mastering the art of typing with Top 100 Funny
              quotes is a delightful way to infuse your typing practice with
              laughter and levity. So grab your keyboard, embrace the humor, and
              let the typing journey tickle your funny bone!
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Conclusion: Typing Your Way to Laughter
            </h3>
            <p className="font-lato text-lg leading-loose text-slate-700">
              In the realm of comedy, the journey to joy and laughter is an
              ongoing adventure—one that requires a willingness to embrace the
              lighter side of life and find humor in the everyday. By
              incorporating Top 100 Funny quotes into your typing practice, you
              not only refine your typing skills but also cultivate a sense of
              joy, creativity, and spontaneity. So why wait? Start typing your
              way to laughter and hilarity today!
            </p>
          </section>
        </article>
      )}
    </div>
  );
}
