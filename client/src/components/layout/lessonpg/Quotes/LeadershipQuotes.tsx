import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";

export default function LeadershipQuotes() {
  const lessonData = useMemo(() => LessonData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = lessonData
      ?.filter((lesson) => lesson?.id?.includes("quotes-id"))[0]
      ?.lessonData[2]?.sectionData[7]?.text?.split(`" Quote `);

    quotesArr && setQuotesData(quotesArr);
  }, [lessonData]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold">
        Here are some of the Leadership quotes you will be typing!
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
      <article className="mx-auto px-4 py-8">
        <h2 className="mb-4 text-3xl font-bold">
          Unleash Your Typing Skills: The Joy and Wisdom of Typing 100
          Leadership Quotes
        </h2>
        <p className="mb-4 text-lg">
          In a world brimming with digital distractions, finding ways to sharpen
          your focus while indulging in moments of inspiration can be a
          challenge. Yet, there exists a delightful blend of amusement and
          enlightenment that lies within the simple act of typing. Picture this:
          engaging in a typing test but with a twist – instead of random words
          or mundane sentences, you're greeted with a treasure trove of
          leadership quotes. Yes, you read that right! Typing 100 leadership
          quotes on a typing test site is not only a fun activity but also an
          enriching experience packed with benefits.
        </p>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-bold">The Fun Element</h3>
          <p className="mb-4 text-lg">
            Let's start with the fun part! Typing 100 leadership quotes can turn
            a mundane typing exercise into an exhilarating journey. Imagine the
            satisfaction of racing against the clock while effortlessly typing
            profound words of wisdom from great leaders throughout history. It's
            like a mental workout infused with bursts of inspiration, keeping
            you motivated and engaged throughout the challenge.
          </p>
          <p className="mb-4 text-lg">
            Moreover, the diversity of quotes ensures that boredom never creeps
            in. From the timeless wisdom of Mahatma Gandhi to the sharp wit of
            Winston Churchill, each quote offers a unique flavor, keeping you
            entertained as you type away. It's like embarking on a literary
            adventure, exploring different perspectives on leadership while
            honing your typing skills.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-bold">The Benefits</h3>
          <ol className="list-inside list-decimal">
            <li className="mb-4 text-lg">
              Enhanced Typing Speed and Accuracy: Practice makes perfect, and
              what better way to enhance your typing skills than by typing a
              hundred quotes? With each keystroke, you're refining your finger
              dexterity and muscle memory, gradually increasing your typing
              speed and accuracy. It's like hitting two birds with one stone –
              improving your typing proficiency while immersing yourself in
              nuggets of leadership wisdom.
            </li>
            <li className="mb-4 text-lg">
              Cognitive Stimulation: Typing quotes requires mental focus and
              concentration, stimulating cognitive functions such as memory,
              attention, and problem-solving. As you read and type each quote,
              your brain processes the information, fostering mental agility and
              acuity. It's a delightful exercise for the mind, akin to a mental
              gymnastics routine that keeps your cognitive faculties sharp and
              agile.
            </li>
            <li className="mb-4 text-lg">
              Inspiration and Motivation: Leadership quotes have the power to
              ignite inspiration and fuel motivation. As you immerse yourself in
              the words of visionaries, innovators, and trailblazers, you can't
              help but feel a surge of empowerment and enthusiasm. These quotes
              serve as beacons of light, guiding you through challenges and
              instilling confidence in your leadership journey. Who knew typing
              could be so uplifting?
            </li>
            <li className="mb-4 text-lg">
              Personal Growth and Reflection: Typing 100 leadership quotes is
              not just about improving your typing skills; it's also an
              opportunity for personal growth and reflection. As you encounter
              profound insights and timeless truths, you may find yourself
              pondering life's deeper questions and contemplating your own
              leadership philosophy. It's a transformative experience that
              invites introspection and self-discovery, paving the way for
              personal and professional growth.
            </li>
            <li className="mb-4 text-lg">
              Sharing Wisdom: Lastly, typing 100 leadership quotes allows you to
              become a conduit of wisdom, sharing timeless insights with others.
              Whether you post your typing achievements on social media or share
              your favorite quotes with friends and colleagues, you're spreading
              knowledge and inspiration to those around you. Who knows, your
              favorite leadership quote might just brighten someone's day or
              spark a positive change in their life.
            </li>
          </ol>
        </section>

        <p className="text-lg">
          In conclusion, typing 100 leadership quotes on a typing test site is
          not just a fun activity; it's a rewarding journey filled with joy,
          wisdom, and countless benefits. So why wait? Grab your keyboard,
          embark on this delightful adventure, and let the wisdom of great
          leaders propel you to new heights. After all, as Vince Lombardi once
          said, "Leaders aren't born, they are made. And they are made just like
          anything else, through hard work. That's the price we have to pay to
          achieve that goal, or any goal." Happy typing!
        </p>
      </article>
    </div>
  );
}
