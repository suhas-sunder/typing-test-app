import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { hexToCSSFilter } from "hex-to-css-filter";
import { v4 as uuidv4 } from "uuid";
import styles from "../../../styles/global.module.css";
import CallToActionBanner from "../shared/CallToActionBanner";

const COLOURABLE_ID = "fully-customizable";

const palette = [
  { id: "pink-700", style: "bg-pink-700", hex: "#be185d" },
  { id: "rose-800", style: "bg-rose-800", hex: "#9f1239" },
  { id: "purple-600", style: "bg-purple-600", hex: "#9333ea" },
  { id: "black", style: "bg-black", hex: "#0a0a0a" },
  { id: "slate-700", style: "bg-slate-700", hex: "#334155" },
  { id: "emerald-600", style: "bg-emerald-600", hex: "#059669" },
  { id: "teal-700", style: "bg-teal-700", hex: "#0f766e" },
  { id: "orange-700", style: "bg-orange-700", hex: "#c2410c" },
  { id: "yellow-950", style: "bg-yellow-950", hex: "#422006" },
];

function FirstFeatureSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const onEnterPalette = () => setPaused(true);
  const onLeavePalette = () => setPaused(false);

  useEffect(() => {
    if (paused || hovered !== null) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = window.setInterval(() => {
      setAutoIndex((i) => (i + 1) % palette.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, hovered]);

  const activeIndex = hovered ?? autoIndex;
  const activeHex = palette[activeIndex].hex;

  const filterValue = useMemo(() => {
    const { filter } = hexToCSSFilter(activeHex);
    return filter.replace(/;/g, "");
  }, [activeHex]);

  const cards = [
    {
      id: "mobile-friendly",
      png: "https://typingbooks.com/defaults/phone.png",
      webp: "https://typingbooks.com/defaults/phone.webp",
      alt: "Mobile phone...",
      title: "Mobile friendly",
      description:
        "Free Typing Camp offers the most accessible typing program for all users. Our tests & courses are fully responsive and optimized for devices large & small.",
    },
    {
      id: COLOURABLE_ID,
      png: "https://typingbooks.com/defaults/customizability.png",
      webp: "https://typingbooks.com/defaults/customizability.webp",
      alt: "Forest landscape...",
      title: "Fully customizable",
      description:
        "Craft your ideal space & bring it to life by unlocking vibrant illustrations to customize the site according to your preferences. Make it truly yours!",
    },
    {
      id: "start-learning",
      png: "https://typingbooks.com/defaults/learning.png",
      webp: "https://typingbooks.com/defaults/learning.webp",
      alt: "Brain sprouting...",
      title: "Start learning for free",
      description:
        "Accumulate points, monitor your progress, & elevate your learning with a wide array of unlockables by creating a free account!",
    },
  ];

  return (
    <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-20 px-5 pb-14 text-center md:flex-row md:justify-around md:gap-0">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative flex max-w-[280px] flex-col items-center gap-6"
        >
          {card.id === COLOURABLE_ID && (
            <div
              className="absolute -bottom-10 flex w-full items-center justify-center gap-3 md:-bottom-12"
              onMouseEnter={onEnterPalette}
              onMouseLeave={onLeavePalette}
              onFocus={onEnterPalette}
              onBlur={onLeavePalette}
            >
              {palette.map((c, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={`Use ${c.id} theme`}
                    aria-pressed={selected === i}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    onClick={(e) => {
                      setSelected(i);
                      setAutoIndex(i);
                      setHovered(null);
                      setPaused(false);
                      (e.currentTarget as HTMLButtonElement).blur();
                    }}
                    className={`h-3 w-3  ${c.style} outline-none transition-transform duration-200 ${isActive ? "scale-100 rounded-[30%]" : "scale-75 rounded-sm"} cursor-pointer`}
                  />
                );
              })}
            </div>
          )}

          <div className="relative flex">
            <picture className="flex min-h-[245px] min-w-[190px]">
              <source srcSet={card.webp} type="image/webp" />
              <img
                src={card.png}
                alt={card.alt}
                width={190}
                height={245}
                style={
                  card.id === COLOURABLE_ID
                    ? { filter: filterValue }
                    : undefined
                }
                loading="lazy"
                className="mb-2 rounded-lg transition-[filter] duration-300 ease-out will-change-[filter]"
              />
            </picture>
          </div>

          <h2 className="font-lora text-xl font-bold capitalize text-sky-800">
            {card.title}
          </h2>
          <p className="font-lato font-normal leading-8">{card.description}</p>
        </div>
      ))}
    </div>
  );
}

function SecondFeatureSection() {
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
      pngImg: "https://typingbooks.com/defaults/controller_with_letters.png",
      alt: "Video game controller to showcase games feature",
      webpImg: "https://typingbooks.com/defaults/controller_with_letters.webp",
      imgStyle: "scale-y-[0.7] scale-x-[0.8] md:scale-[1.15]",
      title: <span>Gamify your learning</span>,
      description: (
        <span>
          Our collection of fun &amp; engaging typing games are the heart of the
          action. Experience a down-to-earth, game-filled journey while
          improving your typing speed and accuracy.
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
      pngImg: "https://typingbooks.com/defaults/robots-typing.png",
      alt: "Educational tips and articles",
      webpImg: "https://typingbooks.com/defaults/robots-typing.webp",
      imgStyle: "scale-y-[0.6] scale-x-[1.2] md:scale-y-100 md:scale-x-[1.67]",
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
      pngImg: "https://typingbooks.com/defaults/trophy.png",
      alt: "Unlockable achievements and more",
      webpImg: "https://typingbooks.com/defaults/trophy.webp",
      imgStyle: "scale-y-[0.7] scale-x-[0.8] md:scale-[1.15]",
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
      pngImg: "https://typingbooks.com/defaults/robots-typing-competing.png",
      webpImg: "https://typingbooks.com/defaults/robots-typing-competing.webp",
      alt: "Compete against others leaderboard",
      imgStyle: "scale-y-[0.6] scale-x-[1.2] md:scale-y-100 md:scale-x-[1.67]",
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
    <div className="mb-20 flex w-full flex-col items-center gap-32 px-14 ">
      {sectionData.map((section, index) => (
        <div
          key={uuidv4()}
          className={`flex w-full max-w-[1060px] flex-col items-center justify-between gap-20 sm:gap-10 ${
            index % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
          }`}
        >
          <div className="relative flex">
            {section.cardStyles.map((card) => (
              <div
                key={uuidv4()}
                className={`flex h-[14.5em] w-[16.75em] overflow-hidden rounded-md bg-white shadow-lg shadow-slate-400 sm:h-[22em] sm:w-[25em] ${
                  card.cardInFront || card.cardInBack
                }`}
                aria-hidden="true" // Hide from screen readers as decorative
              >
                <div
                  className={`absolute top-0 flex h-8 w-full bg-slate-800 opacity-70 ${card.cardInBackBanners}`}
                ></div>
                <div className="${card.cardInBackBanners} absolute bottom-0 flex h-6 w-full bg-slate-900 opacity-10"></div>
              </div>
            ))}

            <picture className="absolute left-1/2 top-[53%] flex -translate-x-1/2 -translate-y-1/2">
              <source srcSet={section.webpImg} type="image/webp"></source>
              <img
                src={section.pngImg}
                alt={section.alt} // Provide descriptive alt text
                width={190}
                height={245}
                loading="lazy"
                className={`${styles.image} ${
                  index % 2 !== 0 && "scale-150"
                } mb-2 flex rounded-lg`}
              />
            </picture>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 text-center lg:items-start lg:gap-10 lg:text-start">
            <h2 className="font-lora text-2xl font-bold capitalize lg:translate-y-2 lg:text-3xl">
              {section.title}
            </h2>
            <p className="tracking-loose flex max-w-[25em] font-lato text-base font-normal leading-loose lg:text-lg lg:leading-loose">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

//Used by Home.tsx component
function LandingPage() {
  return (
    <>
      <FirstFeatureSection />
      <section className="flex w-full flex-col items-center justify-center gap-5 bg-sky-50 px-7 py-20 font-lato font-normal sm:gap-10 md:px-14 lg:px-20 ">
        <h2 className="flex w-full max-w-[1160px] justify-end font-lora text-base md:text-lg lg:text-xl">
          Why learn to type?
        </h2>
        <div className="flex w-full flex-col text-center text-[1.3rem] leading-[3.5rem] tracking-wider text-defaultblue sm:text-[1.5rem] md:text-justify md:text-[2rem] md:leading-[4.5rem] lg:max-w-[1160px] lg:text-[2.4rem] lg:leading-[5.5rem]">
          <p>
            Master the art of typing and unlock new levels of efficiency,
            productivity, and success. Our courses empower you to take your
            skills to the next level. Start practicing today and make
            improvements in no time!
          </p>
        </div>
        <Link
          to="/lessons"
          className={`relative mx-auto mt-3 inline-flex rounded-full border-[2.5px] border-sky-700 bg-sky-700 px-8 py-3 font-nunito text-base font-normal text-white hover:scale-[1.02] hover:brightness-105 sm:mt-0 sm:text-lg lg:text-xl`}
        >
          View Lessons
        </Link>
      </section>
      <SecondFeatureSection />
      <div className="flex w-full flex-col gap-16 bg-defaultblue pb-16 pt-20 sm:pb-20 sm:pt-24 md:hidden">
        <CallToActionBanner />
      </div>
    </>
  );
}

export default LandingPage;
