import styles from "../../styles/global.module.css";
import Trophy from "../../assets/images/trophy.png";
import TrophyWebp from "../../assets/images/trophy.webp";
import ControllerWithLetters from "../../assets/images/controller_with_letters.png";
import ControllerWithLettersWebp from "../../assets/images/controller_with_letters.webp";
import { v4 as uuidv4 } from "uuid";

function SecondShowcase() {
  const sectionData = [
    {
      cardStyles: [
        {
          cardInBack:
            "absolute -right-5 -top-5 flex-col justify-between brightness-[97%]",
          cardInBackBanners: "brightness-[25%]",
        },
        {
          cardInFront: "relative items-center justify-center",
        },
      ],
      pngImg: ControllerWithLetters,
      webpImg: ControllerWithLettersWebp,
      imgStyle: "scale-[0.65] md:scale-100",
      title: <span>Gamify your learning</span>,
      description: (
        <span>
          Our collection of fun &amp; engaging typing games is the heart of the
          action. Join us for a down-to-earth, game-filled journey to improve
          your typing speed and accuracy.
        </span>
      ),
    },
    {
      cardStyles: [
        {
          cardInBack:
            "absolute -top-5 right-5 flex-col justify-between brightness-[97%]",
          cardInBackBanners: "brightness-50",
        },
        {
          cardInFront: "relative items-center justify-center",
        },
      ],
      pngImg: "https://www.freetypingcamp.com/defaults/robots-typing.png",
      webpImg: "https://www.freetypingcamp.com/defaults/robots-typing.webp",
      imgStyle: "scale-[0.975] md:scale-[1.7]",
      title: <span>Educational articles &amp; tips</span>,
      description: (
        <span>
          From expert advice on improving typing speed to in-depth articles
          exploring the nuances of effective keyboard usage, we've got you
          covered. Explore our educational tips &amp; articles to enrich your
          typing literacy &amp; elevate your digital skills.
        </span>
      ),
    },
    {
      cardStyles: [
        {
          cardInBack:
            "absolute -right-5 top-5 flex-col justify-between brightness-[97%]",
          cardInBackBanners: "brightness-50",
        },
        {
          cardInFront: "relative items-center justify-center",
        },
      ],
      pngImg: Trophy,
      webpImg: TrophyWebp,
      imgStyle: "scale-[0.65] md:scale-100",
      title: <span>Achievements</span>,
      description: (
        <span>
          Celebrate your milestones &amp; victories by unlocking achievements
          that tell a unique story of your journey towards typing mastery. So,
          keep typing, keep achieving, &amp; let the accolades roll in.
        </span>
      ),
    },
    {
      cardStyles: [
        {
          cardInBack:
            "absolute right-5 top-5 flex-col justify-between brightness-[97%]",
          cardInBackBanners: "brightness-50",
        },
        {
          cardInFront: "relative items-center justify-center",
        },
      ],
      pngImg:
        "https://www.freetypingcamp.com/defaults/robots-typing-competing.png",
      webpImg:
        "https://www.freetypingcamp.com/defaults/robots-typing-competing.webp",
      imgStyle: "scale-[0.975] md:scale-[1.7]",
      title: <span>Leaderboard</span>,
      description: (
        <span>
          Step up to the challenge &amp; experience the thrill of real-time
          competition. Engage in friendly rivalry as you measure your points
          against fellow typists on a weekly, monthly, yearly, &amp; overall
          basis.
        </span>
      ),
    },
  ];

  return (
    <section className="mb-20 mt-16 flex w-full flex-col items-center gap-32 px-14 sm:gap-52 ">
      {sectionData.map((section, index) => (
        <div
          key={uuidv4()}
          className={`flex w-full max-w-[1060px] flex-col items-center justify-between gap-20 sm:gap-10 ${
            index % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
          }`}
        >
          <div className="relative flex ">
            {section.cardStyles.map((card) => (
              <div
                key={uuidv4()}
                className={`flex h-[14.5em] w-[16.75em] overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 sm:h-[22em] sm:w-[25em] ${
                  card.cardInFront || card.cardInBack
                }`}
              >
                <div
                  className={`absolute top-0 flex h-8 w-full bg-slate-800 opacity-70 ${card.cardInBackBanners}`}
                ></div>
                <div className="${card.cardInBackBanners} absolute bottom-0 flex h-6 w-full bg-slate-900  opacity-10"></div>
              </div>
            ))}

            <picture className="absolute left-1/2 top-[53%] flex -translate-x-1/2 -translate-y-1/2">
              <source srcSet={section.webpImg} type="image/webp"></source>
              <img
                src={section.pngImg}
                alt="keyboard and mouse sitting on a table beside a cup of coffee, with an ocean view illustration for computer screen, all in shades of blue."
                width={190}
                height={245}
                loading="lazy"
                className={`${styles.image} ${section.imgStyle} mb-2 flex rounded-lg`}
              />
            </picture>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:gap-10 lg:text-start">
            <h2 className="font-lora text-2xl font-bold capitalize lg:text-3xl">
              {section.title}
            </h2>
            <p className="flex max-w-[25em] font-lato text-base font-normal leading-8 lg:text-lg">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default SecondShowcase;
