import { useEffect, useState } from "react";

import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function MovieQuotes() {
  const pageTitle = "Here are some of the Movie quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${5}_lvl_${8}.json`;

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
            Unlocking the Magic of Cinema: Typing 100 Movie Quotes
          </h2>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Exploring Cinematic History:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing 100 movie quotes isn't just about mastering typing speed
              and accuracy; it's an engaging journey through the annals of
              cinematic history. With each quote, users are transported to the
              worlds of their favorite films, from the enchanting landscapes of
              "The Wizard of Oz" to the adrenaline-pumping action of "The
              Terminator." This exploration of diverse genres, eras, and styles
              of filmmaking broadens horizons and deepens appreciation for the
              rich tapestry of cinema.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Interactive Learning Experience:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out movie quotes offers an interactive and engaging method
              of learning. Instead of passive consumption, users actively engage
              with the material, analyzing each quote's significance within the
              context of its respective film. This interactive approach not only
              makes learning more enjoyable but also enhances retention and
              understanding, as users piece together the puzzle of each
              memorable line.
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
              Typing 100 movie quotes serves as a fun and engaging way to
              improve typing proficiency. Instead of mundane drills, users are
              motivated by the excitement of discovering which iconic line will
              appear next. This gamified approach to typing practice not only
              enhances typing speed and accuracy but also encourages longer
              periods of practice, leading to more significant skill
              development.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Appreciating the Art of Dialogue:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Beyond the immediate benefits, typing out movie quotes fosters a
              deeper appreciation for the art of dialogue in film. Users gain
              insight into the meticulous craftsmanship behind memorable lines,
              as screenwriters labor over every word to capture the essence of
              characters and themes. This newfound appreciation for the power of
              language enhances the overall viewing experience and encourages
              further exploration of cinematic gems.
            </p>
          </section>

          <p className="pl-3 font-lato text-lg leading-loose text-slate-700">
            Typing 100 movie quotes on typing sites offers a multifaceted
            learning experience that transcends traditional typing practice. It
            engages users interactively, broadens cinematic horizons, sharpens
            critical thinking skills, enhances typing proficiency, and fosters
            appreciation for the art of dialogue. So, the next time you find
            yourself practicing typing skills online, embrace the opportunity to
            embark on a journey through cinematic history and unlock the magic
            of movie trivia, one quote at a time.
          </p>
        </article>
      )}

      {level === 4 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Top 10 Movie Quotes: Enhancing English Learning, Literature
            Appreciation, and More
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Movies are not just a source of entertainment; they also serve as
            reservoirs of memorable dialogue and profound wisdom. By
            transcribing iconic movie quotes, learners can immerse themselves in
            the English language, explore the depths of literature, hone
            hand-eye coordination, and experience the magic of cinema in a whole
            new way. Whether through the tactile experience of handwriting or
            the efficiency of computer typing, transcribing these quotes offers
            a delightful journey of educational enrichment. Let's dive into the
            world of cinema with 10 unforgettable movie quotes.
          </p>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Top 10 Movie Quotes:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>"May the Force be with you." - Star Wars (1977)</li>
              <li>"Here's looking at you, kid." - Casablanca (1942)</li>
              <li>"You can't handle the truth!" - A Few Good Men (1992)</li>
              <li>
                "Life is like a box of chocolates; you never know what you're
                gonna get." - Forrest Gump (1994)
              </li>
              <li>"I'll be back." - The Terminator (1984)</li>
              <li>"To infinity and beyond!" - Toy Story (1995)</li>
              <li>"You talking to me?" - Taxi Driver (1976)</li>
              <li>"You can't sit with us!" - Mean Girls (2004)</li>
              <li>"There's no place like home." - The Wizard of Oz (1939)</li>
              <li>"Here's Johnny!" - The Shining (1980)</li>
            </ol>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              How Handwriting or Typing Can Help:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Language Immersion:</strong> Transcribing movie quotes
                exposes learners to authentic English dialogue, slang, idioms,
                and colloquial expressions. It enhances language comprehension
                and fluency through immersion in engaging and relatable
                contexts.
              </li>
              <li>
                <strong>Literary Exploration:</strong> Many iconic movie quotes
                originate from classic films that are celebrated works of
                literature in their own right. By engaging with these quotes,
                learners gain insight into storytelling techniques, character
                development, and narrative themes, enriching their understanding
                of literature and cinematic artistry.
              </li>
              <li>
                <strong>Critical Thinking:</strong> Analyzing movie quotes
                prompts critical thinking as learners reflect on the underlying
                messages, character motivations, and cultural contexts. It
                encourages them to explore themes such as heroism, morality, and
                the human condition, fostering a deeper appreciation for
                storytelling and cinematic storytelling.
              </li>
              <li>
                <strong>Hand-eye Coordination:</strong> Whether handwriting in a
                notebook or typing on a keyboard, transcribing quotes requires
                coordination between the hands and eyes. It strengthens fine
                motor skills, promotes spatial awareness, and enhances dexterity
                with continued practice.
              </li>
              <li>
                <strong>Cultural Appreciation:</strong> Movies often reflect the
                cultural values, traditions, and perspectives of their time and
                place of origin. Exploring quotes from different films exposes
                learners to various cultural contexts, fostering appreciation
                for global diversity and interconnectedness.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Getting Started:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Choose Your Quotes:</strong> Select 10 iconic movie
                quotes that resonate with you or cover a diverse range of genres
                and themes.
              </li>
              <li>
                <strong>Create a Learning Space:</strong> Set aside dedicated
                time and space for transcribing, ensuring a comfortable and
                distraction-free environment conducive to focused learning.
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

          <p>
            In conclusion, handwriting or computer typing 10 iconic movie quotes
            offers a captivating blend of entertainment and education. It's an
            opportunity to delve into the magic of cinema, explore the richness
            of language, and cultivate essential skills for academic and
            real-world success. So, grab your popcorn, cue up your favorite
            films, and let the quotes inspire your learning journey!
          </p>
        </article>
      )}

      {level === 8 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Perfect Your Typing Skills By Typing Top 100 Movie Quotes
          </h2>

          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            If you’re a movie buff, you know the magic of cinematic
            storytelling, the thrill of memorable performances, and the impact
            of unforgettable lines that stay with you long after the credits
            roll. But what if you could combine your love for movies with a
            practical skill that enhances your appreciation for cinema? Enter
            typing. By improving your typing speed and accuracy, you can engage
            more actively in film discussions, write detailed reviews, and even
            contribute subtitles to your favorite movies. Here’s why practicing
            typing with these 100 iconic movie quotes can be a game-changer for
            any cinephile:
          </p>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Engage More Deeply in Film Discussions
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              From dissecting plot twists to analyzing character motivations,
              film forums and social media platforms are abuzz with
              conversations about your favorite movies. By typing faster, you
              can actively participate in these discussions, share your
              insights, and connect with fellow fans seamlessly. Here’s a quote
              to practice:
            </p>
            <blockquote className="mb-4 border-l-4 border-blue-500 pl-3 italic">
              "Here’s looking at you, kid." - Rick Blaine, <em>Casablanca</em>
            </blockquote>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Write Compelling Movie Reviews and Analyses
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Crafting detailed movie reviews or insightful analyses requires
              fast and accurate typing. Whether you’re discussing the
              cinematography in <em>The Shawshank Redemption</em> or dissecting
              the symbolism in <em>Inception</em>, being able to type quickly
              can help you articulate your thoughts more effectively. Start with
              this quote:
            </p>
            <blockquote className="mb-4 border-l-4 border-blue-500 pl-3 italic">
              "Life is like a box of chocolates. You never know what you're
              gonna get." - Forrest Gump, <em>Forrest Gump</em>
            </blockquote>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Improve Your Subtitling Skills
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              If you’ve ever wanted to contribute subtitles or translations for
              your favorite movies, mastering typing is essential. Faster typing
              means you can transcribe dialogues more efficiently, ensuring that
              viewers around the world can enjoy their favorite films with
              accurate subtitles. Try this iconic line:
            </p>
            <blockquote className="mb-4 border-l-4 border-blue-500 pl-3 italic">
              "May the Force be with you." - Various, <em>Star Wars</em>
            </blockquote>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Enhance Your Note-Taking Abilities
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Whether you’re jotting down memorable quotes, plot twists, or
              directorial techniques, faster typing can make your note-taking
              process smoother and more efficient. By practicing typing with
              quotes from your favorite movies, you can hone your skills while
              reliving iconic moments. Here’s a quote to inspire your
              note-taking journey:
            </p>
            <blockquote className="mb-4 border-l-4 border-blue-500 pl-3 italic">
              "Just keep swimming." - Dory, <em>Finding Nemo</em>
            </blockquote>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Enjoy Productive and Fun Typing Practice
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out your favorite quotes from movies isn’t just about
              improving your speed; it’s also a way to immerse yourself in the
              stories and characters that you love. Each quote carries a piece
              of the movie’s essence, making your typing practice sessions
              enjoyable and nostalgic. Here’s a motivational quote to keep you
              going:
            </p>
            <blockquote className="mb-4 border-l-4 border-blue-500 pl-3 italic">
              "You can't handle the truth!" - Colonel Jessup,{" "}
              <em>A Few Good Men</em>
            </blockquote>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Get Started with These 100 Iconic Quotes
            </h3>
            <ul className="mb-4 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700 ">
              <li>
                "I’ll be back." - The Terminator, <em>The Terminator</em>
              </li>
              <li>
                "You talking to me?" - Travis Bickle, <em>Taxi Driver</em>
              </li>
              <li>
                "To infinity and beyond!" - Buzz Lightyear, <em>Toy Story</em>
              </li>
              <li>
                "I see dead people." - Cole Sear, <em>The Sixth Sense</em>
              </li>
              <li>
                "Here’s Johnny!" - Jack Torrance, <em>The Shining</em>
              </li>
            </ul>
          </section>

          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            By integrating these quotes into your typing practice, you’ll not
            only improve your skills but also deepen your appreciation for the
            powerful words and moments in movies. So grab your keyboard, pick a
            quote, and start typing your way to a better, more immersive
            movie-watching experience!
          </p>
        </article>
      )}
    </div>
  );
}
