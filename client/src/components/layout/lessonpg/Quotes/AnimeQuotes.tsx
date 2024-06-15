import { useEffect, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import GetLessonText from "../../../../utils/requests/GetLessonText";

export default function AnimeQuotes() {
  const pageTitle =
    "Here are some of the Anime Game quotes you will be typing!";
  const [quotesData, setQuotesData] = useState<string>("");
  const [level, setLevel] = useState<number>(0); //Used to switch articles for level  4, 8, other (Level 4 and 8 are top 10 and top 100 respectively and I want those pages to be indexed for SEO)

  useEffect(() => {
    const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${5}_sec_${7}_lvl_${8}.json`;

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
            Unlocking Your Typing Potential: Why Anime Fans Should Write 100
            Quotes on Typing Test Sites
          </h2>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In the vibrant realm of anime, fans are known for their passion,
            creativity, and dedication to their favorite characters and stories.
            But what if I told you there's a way to channel that enthusiasm into
            a skill that not only benefits your daily life but also enhances
            your love for anime? Enter the world of typing test sites—a
            seemingly mundane domain that holds immense potential for anime
            aficionados.
          </p>
          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Mastering the Art of Communication
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Anime fans are no strangers to the power of words. Whether it's
              debating the intricacies of plotlines or expressing adoration for
              beloved characters, communication is key. Writing quotes on typing
              test sites offers a unique opportunity to hone this skill. By
              practicing articulation, coherence, and clarity, you not only
              improve your typing speed but also enhance your ability to express
              your thoughts effectively—a valuable asset in any fandom
              discussion or real-life scenario.
            </p>
          </section>
          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Enhancing Analytical Abilities
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Anime is not just entertainment; it's a complex tapestry of
              narratives, themes, and symbolism. Similarly, typing test sites
              present challenges that go beyond mere keystrokes. Crafting quotes
              demands critical thinking, research, and organization—skills that
              translate seamlessly into dissecting anime plotlines, character
              motivations, and underlying messages. Through this process, you
              sharpen your analytical abilities, enabling you to appreciate
              anime on a deeper level and contribute meaningfully to fan
              communities.
            </p>
          </section>
          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Cultivating Discipline and Persistence
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Becoming proficient in anything requires dedication and
              perseverance. Writing 100 quotes on typing test sites is no small
              feat—it requires discipline to sit down regularly and practice,
              even when motivation wanes. Yet, isn't this reminiscent of the
              commitment demonstrated by beloved anime characters on their
              quests for self-improvement or in overcoming challenges? By
              embracing this challenge, you not only cultivate discipline but
              also embody the resilience celebrated in anime narratives.
            </p>
          </section>
          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Unleashing Creative Potential
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Anime fandom thrives on creativity—from fan art and fanfiction to
              cosplay and AMVs (Anime Music Videos). Writing quotes on typing
              test sites provides another avenue for creative expression.
              Whether it's crafting engaging narratives, sharing personal
              anecdotes, or exploring niche topics, each article is an
              opportunity to unleash your imagination and leave a unique imprint
              on the digital landscape. Who knows? Your quotes might even
              inspire fellow anime fans or spark intriguing discussions within
              the community.
            </p>
          </section>
          <section className="mb-6">
            <h3 className="mb-2 text-xl font-semibold leading-loose">
              Empowering Self-Improvement
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              At its core, anime resonates with themes of growth,
              self-discovery, and the journey towards becoming the best version
              of oneself. Similarly, embarking on the challenge of writing 100
              quotes on typing test sites is a quest for self-improvement. With
              each article, you inch closer to mastering your typing skills,
              refining your writing style, and expanding your knowledge base. As
              you progress, you not only boost your confidence but also develop
              a sense of accomplishment—a testament to your dedication and
              growth.
            </p>
          </section>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            In conclusion, while the prospect of writing 100 quotes on typing
            test sites may seem daunting at first glance, it presents a golden
            opportunity for anime fans to embark on a journey of self-discovery,
            skill development, and creative expression. So, why not embrace this
            challenge? Channel your passion for anime into honing your typing
            abilities, and who knows? You might just uncover new dimensions of
            your fandom journey along the way.
          </p>
        </article>
      )}
      {level === 4 && (
        <article className="p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center text-3xl font-bold">
            The Literary and Educational Benefits of Handwriting or Typing Top
            10 Anime Quotes
          </h2>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Handwriting Anime Quotes: Crafting Connections
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              In the age of digitalization, the debate over handwriting versus
              typing has gained new dimensions. While both methods offer unique
              benefits, an intriguing and enriching way to explore these is
              through the lens of anime quotes. Anime, with its profound
              storytelling and vibrant characters, often provides quotes that
              resonate deeply with audiences. Whether handwritten or typed,
              transcribing these quotes can offer a wealth of literary and
              educational benefits.
            </p>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                1. Enhancing Memory and Comprehension
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                When you handwrite a quote like “I’ll leave tomorrow’s problems
                to tomorrow’s me” from <em>Future Diary (Mirai Nikki)</em>, the
                physical act of writing helps reinforce memory retention. The
                tactile experience of forming each letter fosters deeper
                cognitive engagement, making it easier to remember and
                understand the context and significance of the quote.
              </p>
            </div>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                2. Developing Fine Motor Skills
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                Handwriting anime quotes, such as the inspiring “A lesson
                without pain is meaningless. For you cannot gain something
                without sacrificing something else in return” from{" "}
                <em>Fullmetal Alchemist</em>, can significantly enhance fine
                motor skills. This practice improves hand-eye coordination and
                dexterity, beneficial for students and individuals looking to
                maintain or enhance their motor abilities.
              </p>
            </div>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                3. Cultivating Patience and Focus
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                In our fast-paced world, taking the time to write out a quote
                like “In our society, letting others find out that you're a nice
                person is a very risky move. It's extremely likely that someone
                would take advantage of that” from <em>Naruto</em>, can be a
                meditative practice. It encourages patience and focus, allowing
                the writer to ponder the underlying themes and character
                motivations deeply.
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Typing Anime Quotes: Speed and Accessibility
            </h3>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                1. Improving Typing Speed and Accuracy
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                Typing quotes such as “People’s lives don’t end when they die.
                It ends when they lose faith” from <em>Naruto Shippuden</em>,
                can significantly enhance typing skills. Regular practice with
                meaningful and engaging content like anime quotes helps improve
                speed and accuracy, essential skills in today’s digital world.
              </p>
            </div>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                2. Expanding Vocabulary and Language Skills
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                Anime often contains rich and diverse language, from poetic
                expressions to complex philosophical thoughts. Typing a quote
                like “It’s not the face that makes someone a monster; it’s the
                choices they make with their lives” from <em>Naruto</em>,
                exposes individuals to new vocabulary and phrasing, enhancing
                their language skills and comprehension.
              </p>
            </div>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                3. Encouraging Creative Expression
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                Typing allows for the quick and easy sharing of ideas. After
                typing a thought-provoking quote such as “Sometimes, people are
                unable to move on because they’re waiting for the impossible to
                happen” from <em>Boruto: Naruto Next Generations</em>, one can
                easily add personal reflections or create related content. This
                practice fosters creativity and encourages individuals to
                explore and share their interpretations and insights.
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Comparative Literary Benefits
            </h3>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                1. Deepening Literary Analysis
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                Both handwriting and typing can aid in literary analysis.
                Writing out a quote like “No matter how deep the night, it
                always turns to day, eventually” from <em>One Piece</em>, allows
                for a slower, more deliberate analysis, leading to a deeper
                understanding of the themes and characters. Typing the same
                quote enables quick access to online resources and discussions,
                enriching one’s analysis with diverse perspectives.
              </p>
            </div>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                2. Fostering Emotional Connections
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                Anime quotes often encapsulate powerful emotions and universal
                truths. Whether handwritten or typed, engaging with quotes like
                “Even if I can’t see you… Even if we’re separated far apart…
                I’ll always be watching you” from{" "}
                <em>The Garden of Words (Kotonoha no Niwa)</em>, can create
                strong emotional connections. This process can be therapeutic,
                allowing individuals to articulate and process their own
                emotions through the words of beloved characters.
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Educational Benefits: A Multidimensional Approach
            </h3>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                1. Enhancing Learning Techniques
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                Integrating anime quotes into handwriting or typing exercises
                can make learning more engaging and effective. For instance,
                writing or typing the quote “Fear is not evil. It tells you what
                your weakness is” from <em>Fairy Tail</em>, can turn a routine
                practice into an inspiring activity, particularly for fans of
                the genre.
              </p>
            </div>
            <div className="mb-4 pl-3">
              <h4 className="text-xl font-semibold">
                2. Encouraging Multilingual Proficiency
              </h4>
              <p className="mt-2 text-lg text-slate-700">
                Many anime quotes are originally in Japanese, offering a unique
                opportunity for language learning. Transcribing quotes like
                “君がいるだけでこの世界は美しい” (Kimi ga iru dake de kono sekai
                wa utsukushii - Just by you being in this world, it is
                beautiful) from <em>Anohana: The Flower We Saw That Day</em>,
                can help learners practice Japanese characters and improve their
                language skills.
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Conclusion: Bridging Tradition and Modernity
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              The practice of handwriting or typing anime quotes bridges the gap
              between traditional and modern educational techniques. Whether
              through the tactile experience of handwriting or the digital
              fluency gained from typing, engaging with anime quotes provides a
              rich tapestry of literary and educational benefits. This approach
              not only enhances cognitive and motor skills but also deepens
              emotional and intellectual connections to the material. In a world
              where storytelling remains a powerful tool for learning and
              personal growth, anime quotes offer a unique and compelling medium
              to explore.
            </p>
          </section>
        </article>
      )}
      {level === 8 && (
        <article className="p-8 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center text-3xl font-bold">
            Level Up Your Typing Skills with Iconic Top 100 Anime Quotes
          </h2>

          <section className="mb-6">
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              As an anime fan, you immerse yourself in captivating stories,
              unforgettable characters, and inspiring moments that often leave a
              lasting impression. But did you know that improving your typing
              skills can make your anime experience even more enriching? From
              engaging in vibrant online communities to writing detailed fan
              fiction, having faster and more accurate typing can enhance how
              you interact with your favorite anime.
            </p>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              To help you on this journey, we’ve compiled 100 iconic anime
              quotes. Typing these quotes will not only let you relive some of
              the best moments from various anime but also give you a practical
              and fun way to practice your typing skills. Here’s why learning to
              type better with these quotes can be a game-changer for any anime
              fan:
            </p>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Engage More Actively in Online Communities
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Online forums, social media, and fan sites are buzzing with
              discussions about the latest episodes, character developments, and
              theories. By improving your typing speed, you can keep up with
              these fast-paced conversations and contribute more effectively.
              Imagine sharing your thoughts on the newest{" "}
              <em>Attack on Titan</em> twist or debating the best{" "}
              <em>My Hero Academia</em> character without lagging behind. Here’s
              a quote to practice:
            </p>
            <blockquote className="border-l-4 border-sky-700 pl-4 italic">
              "I am gonna be the Pirate King!" - Monkey D. Luffy,{" "}
              <em>One Piece</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Enhance Your Fan Fiction Writing
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              For those who love to write fan fiction, typing speed and accuracy
              are essential. Crafting intricate plots, detailed character
              descriptions, and dynamic dialogues can be challenging if you’re
              slowed down by frequent typos and corrections. By practicing with
              these quotes, you can smooth out your writing process and let your
              creativity flow. Start with this quote:
            </p>
            <blockquote className="border-l-4 border-sky-700 pl-4 italic">
              "In our world, the moment you gain power, you start to think you
              are invincible." - Sosuke Aizen, <em>Bleach</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Improve Subtitling and Translation Efforts
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              If you’ve ever been interested in subtitling anime or translating
              dialogues for your community, fast and accurate typing is a must.
              Typing practice with these quotes can help you get accustomed to
              the specific terminology and speech patterns common in anime,
              making you a more efficient and reliable translator. Try this one:
            </p>
            <blockquote className="border-l-4 border-sky-700 pl-4 italic">
              "I’ll take a potato chip… and eat it!" - Light Yagami,{" "}
              <em>Death Note</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Enjoy a Productive and Fun Typing Practice
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Typing out your favorite quotes from anime isn’t just a practice
              in speed; it’s also a way to revisit meaningful moments and
              reinvigorate your passion for the shows you love. Each quote
              carries a piece of the anime’s essence, making your typing
              practice both enjoyable and nostalgic. Here’s a motivational quote
              to keep you going:
            </p>
            <blockquote className="border-l-4 border-sky-700 pl-4 italic">
              "Believe in the me that believes in you!" - Kamina,{" "}
              <em>Gurren Lagann</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Boost Your Confidence and Productivity
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Mastering typing can boost your confidence, making you more
              productive in various areas of life, from school assignments to
              professional work. By incorporating something you love—anime—into
              your typing practice, you’re more likely to stay committed and see
              faster progress. Practice with this quote:
            </p>
            <blockquote className="border-l-4 border-sky-700 pl-4 italic">
              "I am the bone of my sword." - Shirou Emiya,{" "}
              <em>Fate/Stay Night</em>
            </blockquote>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-2xl font-bold">
              Get Started with These 100 Iconic Quotes
            </h3>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              Here are a few more quotes to kickstart your typing practice:
            </p>
            <ol className="mb-4 list-decimal pl-6 text-slate-700">
              <li className="mb-2">
                "It's not the face that makes someone a monster; it's the
                choices they make with their lives." - Naruto Uzumaki,{" "}
                <em>Naruto</em>
              </li>
              <li className="mb-2">
                "Hard work betrays none, but dreams betray many." - Hachiman
                Hikigaya, <em>My Teen Romantic Comedy SNAFU</em>
              </li>
              <li className="mb-2">
                "A lesson without pain is meaningless. That’s because no one can
                gain without sacrificing something." - Edward Elric,{" "}
                <em>Fullmetal Alchemist: Brotherhood</em>
              </li>
              <li className="mb-2">
                "If you don’t take risks, you can’t create a future!" - Monkey
                D. Luffy, <em>One Piece</em>
              </li>
              <li className="mb-2">
                "Power comes in response to a need, not a desire. You have to
                create that need." - Goku, <em>Dragon Ball Z</em>
              </li>
            </ol>
            <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
              By integrating these quotes into your typing practice, you’ll not
              only improve your skills but also deepen your appreciation for the
              powerful words and messages conveyed in anime. So grab your
              keyboard, pick a quote, and start typing your way to a better,
              more engaged anime fan experience!
            </p>
          </section>
        </article>
      )}
    </div>
  );
}
