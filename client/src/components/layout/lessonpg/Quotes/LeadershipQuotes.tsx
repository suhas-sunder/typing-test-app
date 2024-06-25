import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function LeadershipQuotes() {
  const pageTitle =
    "Here are some of the Leadership quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${3}_lvl_${8}.json`;

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
            Unleash Your Typing Skills: The Joy and Wisdom of Typing 100
            Leadership Quotes
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In a world brimming with digital distractions, finding ways to
            sharpen your focus while indulging in moments of inspiration can be
            a challenge. Yet, there exists a delightful blend of amusement and
            enlightenment that lies within the simple act of typing. Picture
            this: engaging in a typing test but with a twist – instead of random
            words or mundane sentences, you're greeted with a treasure trove of
            leadership quotes. Yes, you read that right! Typing 100 leadership
            quotes on a typing test site is not only a fun activity but also an
            enriching experience packed with benefits.
          </p>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Fun Element
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Let's start with the fun part! Typing 100 leadership quotes can
              turn a mundane typing exercise into an exhilarating journey.
              Imagine the satisfaction of racing against the clock while
              effortlessly typing profound words of wisdom from great leaders
              throughout history. It's like a mental workout infused with bursts
              of inspiration, keeping you motivated and engaged throughout the
              challenge.
            </p>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Moreover, the diversity of quotes ensures that boredom never
              creeps in. From the timeless wisdom of Mahatma Gandhi to the sharp
              wit of Winston Churchill, each quote offers a unique flavor,
              keeping you entertained as you type away. It's like embarking on a
              literary adventure, exploring different perspectives on leadership
              while honing your typing skills.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Benefits
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li className="mb-4">
                Enhanced Typing Speed and Accuracy: Practice makes perfect, and
                what better way to enhance your typing skills than by typing a
                hundred quotes? With each keystroke, you're refining your finger
                dexterity and muscle memory, gradually increasing your typing
                speed and accuracy. It's like hitting two birds with one stone –
                improving your typing proficiency while immersing yourself in
                nuggets of leadership wisdom.
              </li>
              <li className="mb-4">
                Cognitive Stimulation: Typing quotes requires mental focus and
                concentration, stimulating cognitive functions such as memory,
                attention, and problem-solving. As you read and type each quote,
                your brain processes the information, fostering mental agility
                and acuity. It's a delightful exercise for the mind, akin to a
                mental gymnastics routine that keeps your cognitive faculties
                sharp and agile.
              </li>
              <li className="mb-4">
                Inspiration and Motivation: Leadership quotes have the power to
                ignite inspiration and fuel motivation. As you immerse yourself
                in the words of visionaries, innovators, and trailblazers, you
                can't help but feel a surge of empowerment and enthusiasm. These
                quotes serve as beacons of light, guiding you through challenges
                and instilling confidence in your leadership journey. Who knew
                typing could be so uplifting?
              </li>
              <li className="mb-4">
                Personal Growth and Reflection: Typing 100 leadership quotes is
                not just about improving your typing skills; it's also an
                opportunity for personal growth and reflection. As you encounter
                profound insights and timeless truths, you may find yourself
                pondering life's deeper questions and contemplating your own
                leadership philosophy. It's a transformative experience that
                invites introspection and self-discovery, paving the way for
                personal and professional growth.
              </li>
              <li className="mb-4">
                Sharing Wisdom: Lastly, typing 100 leadership quotes allows you
                to become a conduit of wisdom, sharing timeless insights with
                others. Whether you post your typing achievements on social
                media or share your favorite quotes with friends and colleagues,
                you're spreading knowledge and inspiration to those around you.
                Who knows, your favorite leadership quote might just brighten
                someone's day or spark a positive change in their life.
              </li>
            </ol>
          </section>

          <p className="font-lato text-lg leading-loose text-slate-700">
            In conclusion, typing 100 leadership quotes on a typing test site is
            not just a fun activity; it's a rewarding journey filled with joy,
            wisdom, and countless benefits. So why wait? Grab your keyboard,
            embark on this delightful adventure, and let the wisdom of great
            leaders propel you to new heights. After all, as Vince Lombardi once
            said, "Leaders aren't born, they are made. And they are made just
            like anything else, through hard work. That's the price we have to
            pay to achieve that goal, or any goal." Happy typing!
          </p>
        </article>
      )}

      {level === 4 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Top 10 Leadership Quotes: A Path to English Learning, Literature
            Appreciation, and More
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Leadership is a timeless theme that transcends boundaries, cultures,
            and disciplines. By exploring leadership quotes, learners not only
            enhance their English language skills but also delve into the rich
            tapestry of literature, sharpen hand-eye coordination, and glean
            valuable insights into the art of leading oneself and others.
            Whether through handwriting or computer typing, transcribing these
            quotes offers a rewarding educational experience that fosters
            personal growth and intellectual enrichment. Let's delve into the
            world of leadership through the lens of 10 inspiring quotes.
          </p>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Top 10 Leadership Quotes:
            </h3>
            <ol className="mb-6 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                "Leadership is not about titles, positions, or flowcharts. It is
                about one life influencing another." - John C. Maxwell
              </li>
              <li>
                "The greatest leader is not necessarily the one who does the
                greatest things. He is the one that gets the people to do the
                greatest things." - Ronald Reagan
              </li>
              <li>
                "The function of leadership is to produce more leaders, not more
                followers." - Ralph Nader
              </li>
              <li>
                "Leadership is the capacity to translate vision into reality." -
                Warren Bennis
              </li>
              <li>
                "The challenge of leadership is to be strong, but not rude; be
                kind, but not weak; be bold, but not a bully; be humble, but not
                timid; be proud, but not arrogant; have humor, but without
                folly." - Jim Rohn
              </li>
              <li>
                "A genuine leader is not a searcher for consensus but a molder
                of consensus." - Martin Luther King Jr.
              </li>
              <li>
                "The price of greatness is responsibility." - Winston Churchill
              </li>
              <li>
                "Leadership is not about being in charge. It is about taking
                care of those in your charge." - Simon Sinek
              </li>
              <li>
                "The art of leadership is saying no, not yes. It is very easy to
                say yes." - Tony Blair
              </li>
              <li>
                "Leadership is not about the next election, it's about the next
                generation." - Simon Sinek
              </li>
            </ol>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              How Handwriting or Typing Can Help:
            </h3>
            <ul className="mb-6 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Language Proficiency:</strong> Transcribing leadership
                quotes exposes learners to a wide range of vocabulary, idiomatic
                expressions, and rhetorical devices. It reinforces language
                skills such as reading comprehension, grammar, and syntax in a
                meaningful context.
              </li>
              <li>
                <strong>Literature Exploration:</strong> Many leadership quotes
                originate from renowned leaders, thinkers, and philosophers
                throughout history. By engaging with these quotes, learners gain
                insight into different leadership styles, philosophies, and
                historical contexts, enriching their understanding of literature
                and human behavior.
              </li>
              <li>
                <strong>Critical Thinking:</strong> Analyzing leadership quotes
                prompts critical thinking as learners reflect on the underlying
                messages, values, and implications. It encourages them to
                question assumptions, evaluate perspectives, and apply these
                insights to their own leadership journey.
              </li>
              <li>
                <strong>Hand-eye Coordination:</strong> Whether handwriting in
                cursive script or typing on a keyboard, transcribing quotes
                requires coordination between the hands and eyes. It strengthens
                fine motor skills, promotes spatial awareness, and enhances
                dexterity with continued practice.
              </li>
              <li>
                <strong>Personal Development:</strong> Leadership quotes have
                the potential to inspire personal growth and self-reflection. By
                internalizing the principles of effective leadership conveyed in
                these quotes, learners cultivate essential leadership qualities
                such as integrity, resilience, and empathy.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Getting Started:
            </h3>
            <ol className="mb-6 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Choose Your Quotes:</strong> Select 10 leadership quotes
                that resonate with you or cover a diverse range of leadership
                themes and perspectives.
              </li>
              <li>
                <strong>Set Up Your Workspace:</strong> Create a comfortable and
                conducive environment for transcribing, free from distractions
                and clutter.
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
                Consider how you can apply these leadership principles to your
                own life, relationships, and endeavors.
              </li>
            </ol>
          </section>

          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In conclusion, handwriting or computer typing 10 leadership quotes
            offers a transformative learning experience that goes beyond
            language acquisition. It's an opportunity to explore the essence of
            leadership, nurture essential skills, and cultivate a mindset of
            growth and excellence. So, seize the opportunity, embrace the wisdom
            of leaders past and present, and embark on a journey of leadership
            discovery and development!
          </p>
        </article>
      )}

      {level === 8 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Master the Art of Leadership with Top 100 Leadership Quotes: Elevate
            Your Typing Skills
          </h2>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Embrace Leadership Through Typing
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing is more than just a practical skill—it's a gateway to
              deeper understanding and connection. By typing out inspirational
              leadership quotes, you internalize the guiding principles of
              effective leadership, reinforcing them with every keystroke. It's
              a transformative journey that transcends the confines of
              traditional learning methods.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Dive into the Wisdom of Top 100 Leadership Quotes
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Imagine typing out timeless words of wisdom from renowned leaders
              such as Nelson Mandela, Eleanor Roosevelt, and Steve Jobs. Each
              quote encapsulates the essence of leadership—vision, resilience,
              empathy, and courage. Through typing, you not only absorb these
              principles but also imbue your typing practice with purpose and
              inspiration.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Elevate Your Typing Experience
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out Top 100 Leadership quotes isn't just about improving
              your typing speed and accuracy; it's about embodying the qualities
              of great leaders. With each quote, you reinforce essential
              leadership traits such as communication, decisiveness, and
              accountability. As you type, you cultivate the mindset of a
              leader, ready to tackle challenges and inspire others.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Unleash Your Leadership Potential
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Are you ready to embark on a transformative journey of leadership
              through typing? Whether you're a seasoned leader or aspiring to
              lead, mastering the art of typing with Top 100 Leadership quotes
              is a powerful way to refine your skills and deepen your
              understanding of leadership principles. So grab your keyboard,
              embrace the wisdom of great leaders, and let the typing journey
              begin!
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Leading by Example, Typing with Purpose
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the realm of leadership, mastery is an ongoing pursuit—one that
              requires dedication, practice, and continuous learning. By
              incorporating Top 100 Leadership quotes into your typing practice,
              you not only refine your typing skills but also cultivate the
              mindset and attributes of effective leadership. So why wait? Start
              typing your way to leadership excellence today!
            </p>
          </section>
        </article>
      )}
    </div>
  );
}
