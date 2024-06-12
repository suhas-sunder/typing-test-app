import { useEffect, useState } from "react";

import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function MovieQuotes() {
  const pageTitle = "Here are some of the Movie quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${5}_lvl_${8}.json`;

    GetLessonText({ url, setLessonText: setQuotesData });
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <DisplayQuotes
        title={pageTitle}
        quotesData={quotesData.split(`" Quote `)}
      />
      <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
        <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
          Unlocking the Magic of Cinema: Typing 100 Movie Quotes
        </h2>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Exploring Cinematic History:
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
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
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Interactive Learning Experience:
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
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
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Enhancing Critical Thinking Skills:
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
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
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Improving Typing Proficiency:
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Typing 100 movie quotes serves as a fun and engaging way to improve
            typing proficiency. Instead of mundane drills, users are motivated
            by the excitement of discovering which iconic line will appear next.
            This gamified approach to typing practice not only enhances typing
            speed and accuracy but also encourages longer periods of practice,
            leading to more significant skill development.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Appreciating the Art of Dialogue:
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Beyond the immediate benefits, typing out movie quotes fosters a
            deeper appreciation for the art of dialogue in film. Users gain
            insight into the meticulous craftsmanship behind memorable lines, as
            screenwriters labor over every word to capture the essence of
            characters and themes. This newfound appreciation for the power of
            language enhances the overall viewing experience and encourages
            further exploration of cinematic gems.
          </p>
        </section>

        <p className="pl-3 font-lato text-lg leading-loose text-slate-700">
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
