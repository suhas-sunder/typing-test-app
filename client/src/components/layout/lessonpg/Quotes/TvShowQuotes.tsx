import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function TvShowQuotes() {
  const pageTitle = "Here are some of the Tv Show quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${6}_lvl_${8}.json`;

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
            The Benefits of Writing 100 Quotes in Typing Tests: A Comprehensive
            Guide
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In today's fast-paced world, where communication happens at the
            speed of light and information overload is a constant challenge, the
            ability to type quickly and accurately is more important than ever.
            Typing proficiency not only enhances productivity but also opens up
            opportunities in various fields, from data entry to content
            creation. While there are countless resources and tools available to
            improve typing skills, one often overlooked gem is the practice of
            writing 100 quotes in typing test sites. In this article, we'll
            explore why this practice is highly beneficial for users seeking to
            enhance their typing abilities.
          </p>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              1. Diverse Content Engagement:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out 100 quotes exposes users to a diverse range of content,
              spanning various topics, authors, and styles. From famous quotes
              by historical figures to passages from literature, users encounter
              a plethora of vocabulary and sentence structures. This diversity
              ensures a well-rounded typing experience, offering exposure to
              different linguistic patterns and enhancing adaptability in typing
              various types of content.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              2. Building Muscle Memory:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Repetition is key to mastering any skill, and typing is no
              exception. Writing 100 quotes in typing tests allows users to
              repeatedly engage their muscle memory, gradually improving typing
              speed and accuracy. Through consistent practice, users develop a
              fluidity in their keystrokes, reducing hesitation and increasing
              efficiency. This muscle memory becomes ingrained over time,
              resulting in effortless typing that can significantly boost
              productivity.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              3. Improving Accuracy and Precision:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Precision is paramount in typing, especially in contexts where
              errors can have significant consequences. Writing 100 quotes
              provides ample opportunity for users to focus on accuracy,
              ensuring that each keystroke is deliberate and error-free. As
              users progress through the quotes, they become more attuned to the
              nuances of spelling, grammar, and punctuation, thereby sharpening
              their proofreading skills and minimizing mistakes.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              4. Enhancing Typing Speed:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Speed is a hallmark of typing proficiency, and writing 100 quotes
              serves as an effective means to increase typing speed. As users
              familiarize themselves with the quotes, they naturally become
              faster at transcribing them. Typing tests often provide metrics
              such as words per minute (WPM), allowing users to track their
              progress and set goals for improvement. Through consistent
              practice, users can gradually surpass their previous speed
              benchmarks, achieving greater efficiency in their typing
              endeavors.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              5. Cultivating Focus and Concentration:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing requires a high level of focus and concentration, as users
              must simultaneously process visual information (the text being
              typed) and execute motor commands (pressing the corresponding
              keys). Writing 100 quotes in typing tests encourages users to hone
              their concentration skills, fostering a state of flow where
              distractions are minimized, and productivity is maximized. This
              heightened focus not only benefits typing proficiency but also
              carries over to other tasks requiring sustained attention.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Conclusion:
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In conclusion, writing 100 quotes in typing test sites offers a
              multitude of benefits for users seeking to enhance their typing
              skills. From engaging with diverse content to building muscle
              memory, improving accuracy and speed, and cultivating focus, this
              practice serves as a comprehensive training regimen for aspiring
              typists. By incorporating regular sessions of quote typing into
              their routine, users can unlock their full typing potential and
              excel in both personal and professional endeavors. So why wait?
              Start typing those quotes today and witness the transformation in
              your typing prowess firsthand!
            </p>
          </section>
        </article>
      )}

      {level === 4 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Top 10 TV Show Quotes: Unlocking Learning Potential Through
            Handwriting or Typing
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            TV shows have become an integral part of popular culture,
            influencing language, shaping perceptions, and leaving a lasting
            impact on viewers. By transcribing memorable quotes from beloved TV
            shows, learners can not only improve their English language skills
            but also delve into the nuances of literature, enhance hand-eye
            coordination, and experience the magic of television in a new light.
            Whether through the tactile experience of handwriting or the
            efficiency of computer typing, transcribing these quotes offers a
            delightful journey of educational enrichment. Let's explore the
            transformative potential of 10 iconic TV show quotes.
          </p>

          <section className="my-8">
            <h3 className="mb-4 text-2xl font-bold">
              The Top 10 TV Show Quotes:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>"That's what she said." - The Office (2005-2013)</li>
              <li>"How you doin'?" - Friends (1994-2004)</li>
              <li>"D'oh!" - The Simpsons (1989-present)</li>
              <li>"I am the one who knocks." - Breaking Bad (2008-2013)</li>
              <li>
                "Clear eyes, full hearts, can't lose." - Friday Night Lights
                (2006-2011)
              </li>
              <li>"Winter is coming." - Game of Thrones (2011-2019)</li>
              <li>
                "Oh, my God! They killed Kenny!" - South Park (1997-present)
              </li>
              <li>"We were on a break!" - Friends (1994-2004)</li>
              <li>"How rude!" - Full House (1987-1995)</li>
              <li>
                "I've made a huge mistake." - Arrested Development (2003-2019)
              </li>
            </ol>
          </section>

          <section className="my-8">
            <h3 className="mb-4 text-2xl font-bold">
              How Handwriting or Typing Can Help:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Language Immersion:</strong> Transcribing TV show quotes
                exposes learners to authentic English dialogue, slang, humor,
                and cultural references. It enhances language comprehension and
                fluency through immersion in familiar and relatable contexts.
              </li>
              <li>
                <strong>Literary Exploration:</strong> Many iconic TV show
                quotes originate from series that are celebrated for their
                storytelling, character development, and cultural impact. By
                engaging with these quotes, learners gain insight into narrative
                techniques, thematic exploration, and character dynamics,
                enriching their understanding of literature and storytelling.
              </li>
              <li>
                <strong>Critical Thinking:</strong> Analyzing TV show quotes
                prompts critical thinking as learners reflect on the underlying
                messages, character motivations, and social commentary. It
                encourages them to explore themes such as humor, satire, and
                societal norms, fostering a deeper appreciation for the
                complexities of human experience.
              </li>
              <li>
                <strong>Hand-eye Coordination:</strong> Whether handwriting in a
                notebook or typing on a keyboard, transcribing quotes requires
                coordination between the hands and eyes. It strengthens fine
                motor skills, promotes spatial awareness, and enhances dexterity
                with continued practice.
              </li>
              <li>
                <strong>Cultural Appreciation:</strong> TV shows often reflect
                the cultural values, trends, and issues of their time and place
                of production. Exploring quotes from different series exposes
                learners to various cultural contexts, fostering appreciation
                for diversity and social dynamics.
              </li>
            </ol>
          </section>

          <section className="my-8">
            <h3 className="mb-4 text-2xl font-bold">Getting Started:</h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Choose Your Quotes:</strong> Select 10 memorable TV show
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
                and attention to detail, savoring the humor and essence of the
                words.
              </li>
              <li>
                <strong>Reflect and Share:</strong> After transcribing, take
                time to reflect on the significance of each quote and its impact
                on popular culture. Share your favorite quotes with friends,
                engage in discussions, or create a visual display to showcase
                the wit and wisdom of TV shows.
              </li>
            </ol>
          </section>

          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In conclusion, handwriting or computer typing 10 iconic TV show
            quotes offers a captivating blend of entertainment and education.
            It's an opportunity to delve into the humor, drama, and social
            commentary of television, while also sharpening language skills,
            honing critical thinking, and enhancing hand-eye coordination. So,
            grab your remote control, cue up your favorite shows, and let the
            quotes inspire your learning journey!
          </p>
        </article>
      )}

      {level === 8 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Elevate Your Typing Skills with 100 Iconic TV Show Quotes
          </h2>

          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            If you’re a TV show aficionado, you understand the power of
            captivating storytelling, unforgettable characters, and memorable
            dialogues that keep you hooked episode after episode. But what if
            you could combine your love for television with a practical skill
            that enhances your viewing experience? Enter typing. By improving
            your typing speed and accuracy, you can engage more actively in
            online discussions, write detailed episode analyses, and even
            contribute subtitles to your favorite shows. Here’s why practicing
            typing with these 100 iconic TV show quotes can be a game-changer
            for any TV enthusiast:
          </p>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Dive Deeper into Online Discussions
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              From fan theories to character analyses, online forums and social
              media platforms are bustling with conversations about your
              favorite TV shows. By typing faster, you can actively participate
              in these discussions, share your insights, and connect with fellow
              fans without missing a beat. Here’s a quote to practice:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "Winter is coming." - Ned Stark, <em>Game of Thrones</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Craft Compelling Episode Reviews and Analyses
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Writing detailed episode reviews or insightful analyses requires
              fast and accurate typing. Whether you’re dissecting the latest
              plot twist in <em>Breaking Bad</em> or discussing the character
              development in <em>Stranger Things</em>, being able to type
              quickly can help you articulate your thoughts more effectively.
              Start with this quote:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "I am the one who knocks." - Walter White, <em>Breaking Bad</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Improve Your Subtitling Skills
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              If you’ve ever wanted to contribute subtitles or translations for
              your favorite TV shows, mastering typing is essential. Faster
              typing means you can transcribe dialogues more efficiently,
              ensuring that viewers around the world can enjoy their favorite
              shows with accurate subtitles. Try this iconic line:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "How you doin'?" - Joey Tribbiani, <em>Friends</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Enhance Your Note-Taking Abilities
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Whether you’re jotting down key plot points, character names, or
              memorable quotes, faster typing can make your note-taking process
              smoother and more efficient. By practicing typing with quotes from
              your favorite TV shows, you can hone your skills while reliving
              iconic moments. Here’s a quote to inspire your note-taking
              journey:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "In every job that must be done, there is an element of fun." -
              Mary Poppins, <em>Mary Poppins</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Enjoy Productive and Fun Typing Practice
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out your favorite quotes from TV shows isn’t just about
              improving your speed; it’s also a way to immerse yourself in the
              worlds and characters that you love. Each quote carries a piece of
              the show’s essence, making your typing practice sessions enjoyable
              and nostalgic. Here’s a motivational quote to keep you going:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "We were on a break!" - Ross Geller, <em>Friends</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Get Started with These 100 Iconic Quotes
            </h3>
            <ul className="mb-4 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                "I’ve made a huge mistake." - Gob Bluth,{" "}
                <em>Arrested Development</em>
              </li>
              <li>
                "That’s what she said." - Michael Scott, <em>The Office</em>
              </li>
              <li>
                "Oh my god, they killed Kenny!" - Stan Marsh,{" "}
                <em>South Park</em>
              </li>
              <li>
                "You can’t handle the truth!" - Colonel Jessup,{" "}
                <em>A Few Good Men</em>
              </li>
              <li>
                "I’ve got a bad feeling about this." - Various,{" "}
                <em>Star Wars</em>
              </li>
            </ul>
          </section>

          <p className="mt-4">
            By integrating these quotes into your typing practice, you’ll not
            only improve your skills but also deepen your appreciation for the
            powerful words and moments in TV shows. So grab your keyboard, pick
            a quote, and start typing your way to a better, more immersive TV
            viewing experience!
          </p>
        </article>
      )}
    </div>
  );
}
