import { useEffect, useState } from "react";

import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function AnimatedFilmQuotes() {
  const pageTitle =
    "Here are some of the Video Game quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${8}_lvl_${8}.json`;

    setLevel(parseInt(location.pathname.split("lvl-")[1]));

    GetLessonText({ url, setLessonText: setQuotesData });
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 ">
      <DisplayQuotes
        title={pageTitle}
        quotesData={quotesData.split(`" Quote `)}
      />
      {level % 4 !== 0 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            10 Reasons Why Typing Out 100 Animated Film Quotes is Beneficial
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In the world of typing exercises, there's a fun and rewarding
            challenge that fans of animated shows might find particularly
            appealing: typing out 100 quotes from their favorite animated
            series. While it may seem like a simple task, the benefits extend
            far beyond just improving your typing speed. Let's delve into why
            this activity can be both enjoyable and advantageous.
          </p>
          <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
            <li>
              <strong>Enhanced Typing Skills:</strong> Typing out a multitude of
              quotes is an excellent way to hone your typing speed and accuracy.
              As you type, you're actively engaging your fingers and mind,
              gradually improving your proficiency with each keystroke.
            </li>
            <li>
              <strong>Cultural Immersion:</strong> Animated shows are rich in
              cultural references, humor, and themes. By typing out quotes from
              various animated series, you immerse yourself in different
              cultural contexts, broadening your understanding and appreciation
              of diverse perspectives.
            </li>
            <li>
              <strong>Language Mastery:</strong> Animated shows span a wide
              spectrum of genres and writing styles, from clever quips to
              profound soliloquies. Typing out quotes exposes you to varied
              language patterns, enhancing your vocabulary and language
              comprehension skills.
            </li>
            <li>
              <strong>Memorable Moments:</strong> Many animated shows feature
              iconic moments and memorable lines that resonate with viewers. By
              typing out these quotes, you reinforce them in your memory, making
              them easier to recall and share with others.
            </li>
            <li>
              <strong>Motivation to Practice:</strong> Typing out quotes from
              beloved animated series can transform a mundane typing exercise
              into an engaging and enjoyable activity. The motivation to see
              your favorite lines accurately typed can spur you to practice
              typing more frequently and consistently.
            </li>
            <li>
              <strong>Creative Inspiration:</strong> Animated shows often
              showcase imaginative storytelling and witty dialogue. Typing out
              quotes from these shows can spark your creativity and inspire new
              ideas, whether it's for writing, artwork, or other creative
              endeavors.
            </li>
            <li>
              <strong>Community Connection:</strong> Sharing your typed quotes
              with fellow fans can foster a sense of community and connection.
              It opens up opportunities for discussions, exchanges of favorite
              moments, and the discovery of new shows and quotes to enjoy.
            </li>
            <li>
              <strong>Stress Relief:</strong> Engaging in a familiar and
              enjoyable activity like typing out quotes can serve as a form of
              relaxation and stress relief. It provides a brief escape from
              daily pressures, allowing you to unwind while indulging in the
              world of your favorite animated series.
            </li>
            <li>
              <strong>Sense of Achievement:</strong> Completing the challenge of
              typing out 100 animated show quotes is an accomplishment worth
              celebrating. It demonstrates your dedication to improving your
              typing skills while immersing yourself in the content you love.
            </li>
            <li>
              <strong>Fun and Enjoyment:</strong> Above all, typing out animated
              show quotes is a fun and enjoyable activity. It allows you to
              revisit beloved moments, characters, and stories, all while
              sharpening your typing skills in a lighthearted and entertaining
              manner.
            </li>
          </ol>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In conclusion, typing out 100 animated show quotes offers a myriad
            of benefits, from enhancing your typing speed and language skills to
            fostering creativity and community connections. So, grab your
            keyboard, cue up your favorite shows, and embark on this rewarding
            typing adventure!
          </p>
        </article>
      )}

      {level === 4 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Top 10 Animated Movie Quotes: A Fun Path to English Learning and
            Beyond
          </h2>

          <section className="mb-6">
            <h3 className="mb-4 text-xl font-semibold leading-loose">
              Animated movies aren't just for entertainment—they can also be
              powerful tools for language learning, literature appreciation, and
              even enhancing hand-eye coordination. By transcribing 10 memorable
              quotes from beloved animated films, learners can embark on a
              journey filled with laughter, inspiration, and valuable
              educational benefits. Let's delve into how handwriting or computer
              typing animated movie quotes can enrich English learning and more.
            </h3>

            <h4 className="mb-2 text-lg font-semibold leading-loose">
              The Top 10 Animated Movie Quotes:
            </h4>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>"Just keep swimming." - Dory, Finding Nemo</li>
              <li>"To infinity and beyond!" - Buzz Lightyear, Toy Story</li>
              <li>
                "Hakuna Matata. It means no worries for the rest of your days."
                - Timon, The Lion King
              </li>
              <li>
                "Ohana means family. Family means nobody gets left behind or
                forgotten." - Stitch, Lilo & Stitch
              </li>
              <li>
                "Why is it when something happens, it is always you three?" -
                Dumbledore, Harry Potter (Not fully animated, but the quote is
                from an animated character in the movie)
              </li>
              <li>
                "You are braver than you believe, stronger than you seem, and
                smarter than you think." - Christopher Robin, Winnie the Pooh
              </li>
              <li>
                "The flower that blooms in adversity is the most rare and
                beautiful of all." - The Emperor, Mulan
              </li>
              <li>"Adventure is out there!" - Ellie, Up</li>
              <li>
                "Just because I cannot see it, doesn't mean I can't believe it!"
                - Jack Skellington, The Nightmare Before Christmas
              </li>
              <li>
                "No matter how your heart is grieving, if you keep on believing,
                the dream that you wish will come true." - Cinderella,
                Cinderella
              </li>
            </ol>
          </section>

          <section className="mb-6">
            <h3 className="mb-4 text-xl font-semibold leading-loose">
              How Handwriting or Typing Can Help:
            </h3>
            <ul className="mb-4 ml-6 flex list-inside list-disc flex-col gap-3 font-lato text-lg leading-loose text-slate-700 ">
              <li>
                <strong>Language Immersion:</strong> Transcribing quotes from
                animated movies exposes learners to authentic English dialogue,
                idiomatic expressions, and colloquialisms. It enhances language
                comprehension and fluency through immersion in engaging and
                relatable contexts.
              </li>
              <li>
                <strong>Literary Analysis:</strong> Animated movies often
                incorporate timeless themes, moral lessons, and character
                development. Analyzing quotes prompts critical thinking as
                learners delve into the deeper meanings, symbolism, and
                narrative techniques employed in these cinematic gems.
              </li>
              <li>
                <strong>Emotional Intelligence:</strong> Many animated movie
                quotes convey profound messages about friendship, resilience,
                and self-discovery. Reflecting on these quotes fosters emotional
                intelligence as learners empathize with characters, relate to
                their struggles, and internalize the lessons learned.
              </li>
              <li>
                <strong>Hand-eye Coordination:</strong> Whether handwriting in a
                notebook or typing on a keyboard, transcribing quotes requires
                precision and coordination. It strengthens fine motor skills,
                promotes spatial awareness, and enhances dexterity, contributing
                to overall hand-eye coordination.
              </li>
              <li>
                <strong>Cultural Appreciation:</strong> Animated movies often
                draw inspiration from diverse cultures, folklore, and mythology.
                Exploring quotes from different films exposes learners to
                various cultural perspectives, traditions, and values, fostering
                appreciation for global diversity and interconnectedness.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="mb-4 text-xl font-semibold leading-loose">
              Getting Started:
            </h3>
            <ol className="mb-4 ml-6 flex list-inside list-decimal flex-col gap-3 font-lato text-lg leading-loose text-slate-700">
              <li>
                <strong>Select Your Quotes:</strong> Choose 10 memorable quotes
                from your favorite animated movies or explore a mix of classic
                and contemporary films to broaden your repertoire.
              </li>
              <li>
                <strong>Create a Learning Environment:</strong> Set aside
                dedicated time and space for transcribing, ensuring a
                comfortable and distraction-free environment conducive to
                focused learning.
              </li>
              <li>
                <strong>Transcribe with Care:</strong> Whether handwriting or
                typing, transcribe each quote attentively, paying heed to
                spelling, punctuation, and formatting. Take your time to savor
                the words and imbibe their meaning.
              </li>
              <li>
                <strong>Reflect and Share:</strong> After transcribing, reflect
                on the significance of each quote, discuss them with peers, or
                share them on social media to engage with fellow movie
                enthusiasts and language learners.
              </li>
            </ol>
          </section>

          <p className="pl-3 font-lato text-lg leading-loose text-slate-700">
            In conclusion, handwriting or computer typing animated movie quotes
            offers a delightful blend of entertainment and education. It's a
            playful yet purposeful way to enhance English proficiency, explore
            literary themes, and refine motor skills. So, cue up your favorite
            animated films, grab your pen or keyboard, and let the magic of
            cinema inspire your learning journey!
          </p>
        </article>
      )}

      {level === 8 && (
        <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
            Elevate Your Typing Skills with Top 100 Animated Movie Quotes: A
            Fan's Guide
          </h2>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Embrace the Magic Through Typing
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing isn't just about productivity—it's about infusing your
              daily routine with the whimsy and wonder of animated movies. By
              typing out quotes from your favorite films, you not only sharpen
              your typing skills but also relive the magic of cherished moments
              and beloved characters. It's a journey that transforms typing
              practice into a delightful adventure through animated worlds.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Dive into the Charm of Top 100 Animated Movie Quotes
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Imagine typing out iconic lines from beloved animated classics
              such as <em>The Lion King</em>, <em>Toy Story</em>, and{" "}
              <em>Frozen</em>. Each quote is a treasure trove of nostalgia and
              emotion, transporting you back to the heartwarming scenes and
              memorable dialogues that captured your imagination. Through
              typing, you not only enjoy the magic of animated films but also
              cultivate a deeper connection with their timeless messages and
              themes.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Elevate Your Typing Experience
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out Top 100 Animated Movie quotes isn't just about
              improving your typing speed and accuracy; it's about embracing the
              joy and inspiration that animated films bring to our lives. With
              each keystroke, you reinforce essential qualities such as
              creativity, imagination, and empathy. As you type, you embody the
              spirit of animated movies, ready to embark on new adventures and
              discover the power of storytelling.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Unleash Your Animated Potential
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Are you ready to embark on a magical journey of typing? Whether
              you're a fan of classic Disney films, Pixar masterpieces, or the
              latest animated releases, mastering the art of typing with Top 100
              Animated Movie quotes is a delightful way to infuse your typing
              practice with joy and wonder. So grab your keyboard, immerse
              yourself in the enchanting world of animated films, and let the
              typing journey transport you to new heights of imagination and
              creativity!
            </p>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Conclusion: Typing Your Way to Animated Adventure
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the realm of animated movies, the journey to wonder and
              enchantment is an ongoing adventure—one that invites us to embrace
              the magic of storytelling and celebrate the joy of animated
              worlds. By incorporating Top 100 Animated Movie quotes into your
              typing practice, you not only refine your typing skills but also
              cultivate a deeper appreciation for the timeless tales and beloved
              characters that have captivated audiences for generations. So why
              wait? Start typing your way to animated adventure and inspiration
              today!
            </p>
          </section>
        </article>
      )}
    </div>
  );
}
