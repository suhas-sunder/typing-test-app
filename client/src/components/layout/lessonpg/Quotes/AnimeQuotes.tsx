import { useEffect, useMemo, useState } from "react";
import LessonData from "../../../../data/LessonData";

export default function AnimeQuotes() {
  const lessonData = useMemo(() => LessonData(), []);
  const [quotesData, setQuotesData] = useState<string[]>([""]);

  useEffect(() => {
    const quotesArr = lessonData
      ?.filter((lesson) => lesson?.id?.includes("quotes-id"))[0]
      ?.lessonData[6]?.sectionData[7]?.text?.split(`" Quote `);

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
      <article className="mx-auto max-w-3xl px-4 py-8 text-gray-800">
        <h2 className="mb-4 text-2xl font-bold">
          Unlocking Your Typing Potential: Why Anime Fans Should Write 100
          Articles on Typing Test Sites
        </h2>
        <p className="mb-4">
          In the vibrant realm of anime, fans are known for their passion,
          creativity, and dedication to their favorite characters and stories.
          But what if I told you there's a way to channel that enthusiasm into a
          skill that not only benefits your daily life but also enhances your
          love for anime? Enter the world of typing test sites—a seemingly
          mundane domain that holds immense potential for anime aficionados.
        </p>
        <section className="mb-6">
          <h3 className="mb-2 text-xl font-bold">
            1. Mastering the Art of Communication:
          </h3>
          <p className="mb-2">
            Anime fans are no strangers to the power of words. Whether it's
            debating the intricacies of plotlines or expressing adoration for
            beloved characters, communication is key. Writing articles on typing
            test sites offers a unique opportunity to hone this skill. By
            practicing articulation, coherence, and clarity, you not only
            improve your typing speed but also enhance your ability to express
            your thoughts effectively—a valuable asset in any fandom discussion
            or real-life scenario.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="mb-2 text-xl font-bold">
            2. Enhancing Analytical Abilities:
          </h3>
          <p className="mb-2">
            Anime is not just entertainment; it's a complex tapestry of
            narratives, themes, and symbolism. Similarly, typing test sites
            present challenges that go beyond mere keystrokes. Crafting articles
            demands critical thinking, research, and organization—skills that
            translate seamlessly into dissecting anime plotlines, character
            motivations, and underlying messages. Through this process, you
            sharpen your analytical abilities, enabling you to appreciate anime
            on a deeper level and contribute meaningfully to fan communities.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="mb-2 text-xl font-bold">
            3. Cultivating Discipline and Persistence:
          </h3>
          <p className="mb-2">
            Becoming proficient in anything requires dedication and
            perseverance. Writing 100 articles on typing test sites is no small
            feat—it requires discipline to sit down regularly and practice, even
            when motivation wanes. Yet, isn't this reminiscent of the commitment
            demonstrated by beloved anime characters on their quests for
            self-improvement or in overcoming challenges? By embracing this
            challenge, you not only cultivate discipline but also embody the
            resilience celebrated in anime narratives.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="mb-2 text-xl font-bold">
            4. Unleashing Creative Potential:
          </h3>
          <p className="mb-2">
            Anime fandom thrives on creativity—from fan art and fanfiction to
            cosplay and AMVs (Anime Music Videos). Writing articles on typing
            test sites provides another avenue for creative expression. Whether
            it's crafting engaging narratives, sharing personal anecdotes, or
            exploring niche topics, each article is an opportunity to unleash
            your imagination and leave a unique imprint on the digital
            landscape. Who knows? Your articles might even inspire fellow anime
            fans or spark intriguing discussions within the community.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="mb-2 text-xl font-bold">
            5. Empowering Self-Improvement:
          </h3>
          <p className="mb-2">
            At its core, anime resonates with themes of growth, self-discovery,
            and the journey towards becoming the best version of oneself.
            Similarly, embarking on the challenge of writing 100 articles on
            typing test sites is a quest for self-improvement. With each
            article, you inch closer to mastering your typing skills, refining
            your writing style, and expanding your knowledge base. As you
            progress, you not only boost your confidence but also develop a
            sense of accomplishment—a testament to your dedication and growth.
          </p>
        </section>
        <p className="text-lg font-semibold">
          In conclusion, while the prospect of writing 100 articles on typing
          test sites may seem daunting at first glance, it presents a golden
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
