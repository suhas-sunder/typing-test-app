import { useEffect, useMemo, useState } from "react";
import DisplayQuotes from "./DisplayQuotes";
import LessonQuotesData from "../../../../data/LessonQuotesData";


export default function AnimeQuotes() {
  const pageTitle =
    "Here are some of the Anime Game quotes you will be typing!";
    const quotes = useMemo(() => LessonQuotesData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = 
    quotes.lessonData[6]?.sectionData[7]?.text?.split(`" Quote `);

    quotesArr && setQuotesData(quotesArr);
  }, [quotes]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <DisplayQuotes title={pageTitle} quotesData={quotesData} />
      <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
        <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
          Unlocking Your Typing Potential: Why Anime Fans Should Write 100
          Quotes on Typing Test Sites
        </h2>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          In the vibrant realm of anime, fans are known for their passion,
          creativity, and dedication to their favorite characters and stories.
          But what if I told you there's a way to channel that enthusiasm into a
          skill that not only benefits your daily life but also enhances your
          love for anime? Enter the world of typing test sites—a seemingly
          mundane domain that holds immense potential for anime aficionados.
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
            your thoughts effectively—a valuable asset in any fandom discussion
            or real-life scenario.
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
            sharpen your analytical abilities, enabling you to appreciate anime
            on a deeper level and contribute meaningfully to fan communities.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Cultivating Discipline and Persistence
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Becoming proficient in anything requires dedication and
            perseverance. Writing 100 quotes on typing test sites is no small
            feat—it requires discipline to sit down regularly and practice, even
            when motivation wanes. Yet, isn't this reminiscent of the commitment
            demonstrated by beloved anime characters on their quests for
            self-improvement or in overcoming challenges? By embracing this
            challenge, you not only cultivate discipline but also embody the
            resilience celebrated in anime narratives.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Unleashing Creative Potential
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            Anime fandom thrives on creativity—from fan art and fanfiction to
            cosplay and AMVs (Anime Music Videos). Writing quotes on typing test
            sites provides another avenue for creative expression. Whether it's
            crafting engaging narratives, sharing personal anecdotes, or
            exploring niche topics, each article is an opportunity to unleash
            your imagination and leave a unique imprint on the digital
            landscape. Who knows? Your quotes might even inspire fellow anime
            fans or spark intriguing discussions within the community.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            Empowering Self-Improvement
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            At its core, anime resonates with themes of growth, self-discovery,
            and the journey towards becoming the best version of oneself.
            Similarly, embarking on the challenge of writing 100 quotes on
            typing test sites is a quest for self-improvement. With each
            article, you inch closer to mastering your typing skills, refining
            your writing style, and expanding your knowledge base. As you
            progress, you not only boost your confidence but also develop a
            sense of accomplishment—a testament to your dedication and growth.
          </p>
        </section>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          In conclusion, while the prospect of writing 100 quotes on typing test
          sites may seem daunting at first glance, it presents a golden
          opportunity for anime fans to embark on a journey of self-discovery,
          skill development, and creative expression. So, why not embrace this
          challenge? Channel your passion for anime into honing your typing
          abilities, and who knows? You might just uncover new dimensions of
          your fandom journey along the way.
        </p>
      </article>
    </div>
  );
}
