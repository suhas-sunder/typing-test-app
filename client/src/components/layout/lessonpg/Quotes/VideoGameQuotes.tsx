import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function VideoGameQuotes() {
  const pageTitle =
    "Here are some of the Video Game quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${4}_lvl_${8}.json`;

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
            The Joy of Typing: 100 Video Game Quotes on a Typing Test Site
          </h2>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Introduction
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the vast landscape of gaming, where pixels paint worlds and
              stories come alive through controllers and keyboards, there exists
              a treasure trove of memorable quotes that have left an indelible
              mark on players worldwide. From the stirring speeches of heroic
              leaders to the witty banter of lovable sidekicks, these lines have
              become ingrained in the fabric of gaming culture. But what if I
              told you that typing these quotes could be not just nostalgic, but
              also incredibly fun and satisfying?
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Appeal of Typing Test Sites
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing test sites offer enthusiasts a unique challenge to test
              their speed and accuracy. While some may choose classic literature
              or famous speeches, there's a particular joy in typing out beloved
              video game quotes. The challenge isn't just about speed; it's
              about reliving cherished moments and celebrating the storytelling
              prowess of gaming.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Embarking on the Challenge
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Why stop at a handful of quotes when you can embark on a quest to
              type a hundred of them? The challenge becomes a journey through
              gaming's greatest adventures. From the whimsical wisdom of The
              Legend of Zelda to the philosophical ponderings of BioShock, each
              quote offers a glimpse into the unique worlds and characters that
              have captivated us for decades.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Discovering Gaming Gems
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out these quotes isn't just about reliving past glories;
              it's also an opportunity to discover new favorites and revisit old
              classics. As you progress through your list of 100 quotes, you may
              stumble upon hidden gems from games you've yet to play, sparking
              curiosity and excitement for future adventures. Each keystroke
              becomes a tribute to the immersive storytelling that defines the
              medium.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Community and Camaraderie
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Moreover, typing out these quotes fosters a sense of camaraderie
              within the gaming community. Online forums dedicated to typing
              tests provide a space for participants to share their experiences,
              compare scores, and celebrate each other's accomplishments. It's a
              chance to connect with like-minded individuals who share a passion
              for both gaming and the art of typing.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Conclusion
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the end, typing 100 video game quotes on a typing test site
              isn't just about honing your typing skills; it's a celebration of
              everything that makes gaming great. It's about reliving cherished
              memories, discovering new favorites, and connecting with a
              community that shares your love for virtual worlds and epic
              adventures. So, if you're looking for a fun and nostalgic
              challenge to test your typing prowess, why not embark on a journey
              through gaming history? Grab your keyboard, fire up your favorite
              typing test site, and prepare to immerse yourself in a world of
              quotes, characters, and memories that will stay with you long
              after the final keystroke.
            </p>
          </section>
        </article>
      )}

      {level === 4 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Top 10 Video Game Quotes: Unlocking Learning Potential Through
            Handwriting or Typing
          </h2>

          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Video games have evolved from simple entertainment to immersive
            storytelling experiences, complete with memorable dialogue and
            profound themes. By transcribing iconic quotes from beloved video
            games, learners can not only enhance their English language skills
            but also delve into the depths of literature, improve hand-eye
            coordination, and explore the unique narrative artistry of gaming.
            Whether through the tactile experience of handwriting or the
            efficiency of computer typing, transcribing these quotes offers a
            delightful journey of educational enrichment. Let's embark on an
            adventure through 10 unforgettable video game quotes.
          </p>

          <section className="my-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              The Top 10 Video Game Quotes:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                "It's dangerous to go alone! Take this." - The Legend of Zelda
                (1986)
              </li>
              <li>"War. War never changes." - Fallout (1997)</li>
              <li>"The cake is a lie." - Portal (2007)</li>
              <li>"A man chooses, a slave obeys." - BioShock (2007)</li>
              <li>
                "Stand in the ashes of a trillion dead souls and ask the ghosts
                if honor matters." - Mass Effect (2007)
              </li>
              <li>
                "I used to be an adventurer like you, then I took an arrow in
                the knee." - The Elder Scrolls V: Skyrim (2011)
              </li>
              <li>"Would you kindly?" - BioShock (2007)</li>
              <li>"Do a barrel roll!" - Star Fox 64 (1997)</li>
              <li>"All your base are belong to us." - Zero Wing (1989)</li>
              <li>
                "Had to be me. Someone else might have gotten it wrong." - Mass
                Effect 3 (2012)
              </li>
            </ol>
          </section>

          <section className="my-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              How Handwriting or Typing Can Help:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Language Immersion:</strong> Transcribing video game
                quotes exposes learners to a diverse range of vocabulary,
                dialogue, and narrative styles. It enhances language
                comprehension and fluency through immersion in dynamic and
                interactive contexts.
              </li>
              <li>
                <strong>Literary Exploration:</strong> Many iconic video game
                quotes originate from games that are celebrated for their
                storytelling, character development, and world-building. By
                engaging with these quotes, learners gain insight into narrative
                techniques, thematic exploration, and the unique artistry of
                video game storytelling.
              </li>
              <li>
                <strong>Critical Thinking:</strong> Analyzing video game quotes
                prompts critical thinking as learners reflect on the underlying
                themes, moral dilemmas, and philosophical questions posed by
                these games. It encourages them to explore concepts such as
                agency, morality, and identity, fostering a deeper appreciation
                for the complexities of interactive storytelling.
              </li>
              <li>
                <strong>Hand-eye Coordination:</strong> Whether handwriting in a
                notebook or typing on a keyboard, transcribing quotes requires
                coordination between the hands and eyes. It strengthens fine
                motor skills, promotes spatial awareness, and enhances dexterity
                with continued practice.
              </li>
              <li>
                <strong>Cultural Appreciation:</strong> Video games often
                reflect the cultural values, trends, and concerns of their time
                and place of creation. Exploring quotes from different games
                exposes learners to various cultural contexts, fostering
                appreciation for the diversity and innovation within the gaming
                industry.
              </li>
            </ol>
          </section>

          <section className="my-8">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Getting Started:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Choose Your Quotes:</strong> Select 10 memorable video
                game quotes that resonate with you or cover a diverse range of
                genres and themes.
              </li>
              <li>
                <strong>Create a Learning Space:</strong> Set aside dedicated
                time and space for transcribing, ensuring a comfortable and
                distraction-free environment conducive to focused learning.
              </li>
              <li>
                <strong>Transcribe Mindfully:</strong> Whether handwriting in a
                journal or typing on a computer, transcribe each quote with care
                and attention to detail, savoring the immersive and evocative
                nature of video game dialogue.
              </li>
              <li>
                <strong>Reflect and Share:</strong> After transcribing, take
                time to reflect on the significance of each quote and its impact
                on gaming culture. Share your favorite quotes with friends,
                engage in discussions, or create a visual display to showcase
                the storytelling brilliance of video games.
              </li>
            </ol>
          </section>

          <p className="font-lato text-lg leading-loose text-slate-700">
            In conclusion, handwriting or computer typing 10 iconic video game
            quotes offers a captivating blend of entertainment and education.
            It's an opportunity to delve into the rich tapestry of gaming
            narratives, while also sharpening language skills, honing critical
            thinking, and enhancing hand-eye coordination. So, grab your
            controller or keyboard, embark on a virtual quest, and let the
            quotes inspire your learning journey!
          </p>
        </article>
      )}

      {level === 8 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Level Up Your Typing Skills with Iconic Top 100 Video Game Quotes
          </h2>

          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            If you're a video game fan, you know that games are more than just a
            way to pass the time—they’re an immersive experience that often
            comes with memorable dialogues, profound quotes, and moments that
            stay with you long after you’ve put down the controller. But what if
            you could combine your love for gaming with a practical skill that
            enhances your gaming experience? Enter the world of typing. By
            improving your typing speed and accuracy, you can engage more deeply
            with gaming communities, write detailed guides, and even code your
            own games. Here’s why practicing typing with these 100 iconic video
            game quotes can be a game-changer for any gamer:
          </p>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Dominate Online Forums and Communities
            </h3>
            <p className="mb-2 pl-3 font-lato text-lg leading-loose text-slate-700">
              Gaming forums, Discord channels, and social media are buzzing with
              discussions about game strategies, updates, and lore. To
              participate actively in these fast-paced conversations, you need
              to type quickly and accurately. Faster typing means you can share
              your insights, ask questions, and contribute to discussions
              without missing a beat. Here’s a quote to practice:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "War. War never changes." - <em>Fallout</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Enhance Your Game Guide Writing
            </h3>
            <p className="mb-2 pl-3 font-lato text-lg leading-loose text-slate-700">
              Writing comprehensive game guides, walkthroughs, and reviews
              requires a lot of typing. Whether you’re explaining the best build
              for a character in <em>League of Legends</em> or detailing a
              secret quest in <em>The Witcher 3</em>, being able to type quickly
              and clearly can help you share your knowledge more effectively.
              Start with this quote:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "It’s dangerous to go alone! Take this." -{" "}
              <em>The Legend of Zelda</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Improve Your In-Game Communication
            </h3>
            <p className="mb-2 pl-3 font-lato text-lg leading-loose text-slate-700">
              In multiplayer games, communication is key. Fast typing can make a
              difference in coordinating strategies, warning teammates, or
              trash-talking your opponents (in a friendly way, of course).
              Improve your in-game typing speed with practice. Try this iconic
              line:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "Do a barrel roll!" - Peppy, <em>Star Fox 64</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Boost Your Coding Skills
            </h3>
            <p className="mb-2 pl-3 font-lato text-lg leading-loose text-slate-700">
              If you’re interested in game development, coding is a fundamental
              skill. Writing code requires precision and speed. Practicing
              typing can help you become more efficient when coding, debugging,
              and testing your own games. Here’s a quote to inspire your coding
              journey:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "Stay awhile and listen." - Deckard Cain, <em>Diablo II</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Enjoy Productive and Fun Typing Practice
            </h3>
            <p className="mb-2 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out your favorite quotes from video games isn’t just about
              improving your speed; it’s also a way to revisit and relive the
              powerful moments and dialogues that make gaming special. Each
              quote carries a piece of the game’s world, making your practice
              sessions enjoyable and nostalgic. Here’s a motivational quote to
              keep you going:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "The right man in the wrong place can make all the difference in
              the world." - G-Man, <em>Half-Life 2</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Get Started with These 100 Iconic Quotes
            </h3>
            <ul className="mb-4 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                "What is better? To be born good or to overcome your evil nature
                through great effort?" - Paarthurnax, <em>Skyrim</em>
              </li>
              <li>
                "Wake me when you need me." - Master Chief, <em>Halo 3</em>
              </li>
              <li>
                "Our actions define us. We make choices, and those choices have
                consequences." - Alexios, <em>Assassin’s Creed Odyssey</em>
              </li>
              <li>
                "I’m Commander Shepard, and this is my favorite store on the
                Citadel." - Commander Shepard, <em>Mass Effect 2</em>
              </li>
              <li>
                "The mind of the subject will desperately struggle to create
                memories where none exist." - R. Lutece,{" "}
                <em>BioShock Infinite</em>
              </li>
            </ul>
          </section>

          <p className="mt-4">
            By integrating these quotes into your typing practice, you’ll not
            only improve your skills but also deepen your appreciation for the
            powerful words and moments in video games. So grab your keyboard,
            pick a quote, and start typing your way to a better, more immersive
            gaming experience!
          </p>
        </article>
      )}
    </div>
  );
}
