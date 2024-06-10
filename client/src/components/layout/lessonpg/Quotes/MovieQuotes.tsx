import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";

export default function MovieQuotes() {
  const lessonData = useMemo(() => LessonData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = lessonData
      ?.filter((lesson) => lesson?.id?.includes("quotes-id"))[0]
      ?.lessonData[4]?.sectionData[7]?.text?.split(`" Quote `);

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
      <article className="mx-auto max-w-2xl p-4">
        <h2 className="mb-4 text-xl font-bold">
          Unlocking the Magic of Cinema: Typing 100 Movie Quotes
        </h2>

        <section className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">
            Exploring Cinematic History:
          </h3>
          <p className="mb-4">
            Typing 100 movie quotes isn't just about mastering typing speed and
            accuracy; it's an engaging journey through the annals of cinematic
            history. With each quote, users are transported to the worlds of
            their favorite films, from the enchanting landscapes of "The Wizard
            of Oz" to the adrenaline-pumping action of "The Terminator." This
            exploration of diverse genres, eras, and styles of filmmaking
            broadens horizons and deepens appreciation for the rich tapestry of
            cinema.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">
            Interactive Learning Experience:
          </h3>
          <p className="mb-4">
            Typing out movie quotes offers an interactive and engaging method of
            learning. Instead of passive consumption, users actively engage with
            the material, analyzing each quote's significance within the context
            of its respective film. This interactive approach not only makes
            learning more enjoyable but also enhances retention and
            understanding, as users piece together the puzzle of each memorable
            line.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">
            Enhancing Critical Thinking Skills:
          </h3>
          <p className="mb-4">
            Analyzing the context and significance of each movie quote fosters
            critical thinking skills. Users are prompted to consider the
            character motivations, thematic implications, and narrative
            foreshadowing inherent in each line. This analytical approach
            deepens understanding of storytelling techniques and character
            development, encouraging users to think critically about the films
            they love.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">
            Improving Typing Proficiency:
          </h3>
          <p className="mb-4">
            Typing 100 movie quotes serves as a fun and engaging way to improve
            typing proficiency. Instead of mundane drills, users are motivated
            by the excitement of discovering which iconic line will appear next.
            This gamified approach to typing practice not only enhances typing
            speed and accuracy but also encourages longer periods of practice,
            leading to more significant skill development.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">
            Appreciating the Art of Dialogue:
          </h3>
          <p className="mb-4">
            Beyond the immediate benefits, typing out movie quotes fosters a
            deeper appreciation for the art of dialogue in film. Users gain
            insight into the meticulous craftsmanship behind memorable lines, as
            screenwriters labor over every word to capture the essence of
            characters and themes. This newfound appreciation for the power of
            language enhances the overall viewing experience and encourages
            further exploration of cinematic gems.
          </p>
        </section>

        <p>
          Typing 100 movie quotes on typing sites offers a multifaceted learning
          experience that transcends traditional typing practice. It engages
          users interactively, broadens cinematic horizons, sharpens critical
          thinking skills, enhances typing proficiency, and fosters appreciation
          for the art of dialogue. So, the next time you find yourself
          practicing typing skills online, embrace the opportunity to embark on
          a journey through cinematic history and unlock the magic of movie
          trivia, one quote at a time.
        </p>
      </article>
    </div>
  );
}
