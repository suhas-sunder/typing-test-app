import { useEffect, useRef, useState } from "react";
import styles from "../../styles/global.module.css";
import HexToCSSFilter from "../../utils/HexToCSSFilter";
import Phone from "../../assets/images/phone.png";
import Learning from "../../assets/images/learning.png";
import Customizability from "../../assets/images/customizability.png";
import PhoneWebp from "../../assets/images/phone.webp";
import LearningWebp from "../../assets/images/learning.webp";
import CustomizabilityWebp from "../../assets/images/customizability.webp";

function FirstShowcase() {
  const divsRef = useRef<HTMLDivElement[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  const firstImgRef = useRef<HTMLImageElement>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const firstShowcaseData = [
    {
      pngImg: Phone,
      webpImg: PhoneWebp,
      ref: firstImgRef,
      alt: "Mobile phone with a beautiful scenic background that spills out of the frame of the phone in some areas.",
      title: "Mobile friendly",
      description:
        "Free Typing Camp offers the most accessible typing program for all users. Our tests &amp; courses are fully responsive and optimized for devices large &amp; small.",
    },
    {
      pngImg: Customizability,
      webpImg: CustomizabilityWebp,
      ref: imgRef,
      alt: "Lush forest landscape with trees that changes colour programmatically to demonstrate website customizability features",
      title: "Fully customizable",
      description:
        "Craft your ideal space &amp; bring it to life by unlocking vibrant illustrations to customize the site according to your preferences. Make it truly yours!",
    },
    {
      pngImg: Learning,
      webpImg: LearningWebp,
      ref: null,
      alt: "A human brain sprouting from a tree that contains a forest landscape with geese flying in the sky",
      title: "Start learning for free",
      description:
        "Accumulate points, monitor your progress, &amp; elevate your learning with a wide array of unlockables by creating a free account!",
    },
  ];

  const colourPallet = [
    "bg-pink-700",
    "bg-rose-800",
    "bg-emerald-600",
    "bg-black",
    "bg-slate-700",
    "bg-orange-700",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-yellow-950",
    "bg-teal-700",
  ];

  useEffect(() => {
    const hexCode = [
      "#be185d", //Pink 700
      "#9f1239", //Rose 800
      "#059669", //Emerald 600
      "#0a0a0a", //Black
      "#334155", //Slate 700
      "#c2410c", //Orange 700
      "#ca8a04", //Yellow 600
      "#9333ea", //Purple 600
      "#422006", //Yellow 950 (brown)
      "#0f766e", //Teal 700
    ];

    const handleAddFilter = (index: number) => {
      HexToCSSFilter({
        hexColourCode: hexCode[index],
        elementRef: imgRef.current,
      });

      // Scale up colour pallet selection
      divsRef.current[index].style.transform = "scale(1.3,1.3)";

      // Scale down colour previous pallet selection
      if (index - 1 >= 0) {
        divsRef.current[index - 1].style.transform = "scale(1,1)";
      }

      if (index === 0) {
        !isAnimating && setIsAnimating(true);

        divsRef.current[divsRef.current.length - 1].style.transform =
          "scale(1,1)";
      }
    };

    let index: number = 1; //Starting index to cycle through colour pallet divs

    // highlight colour pallet and change image colour
    const timer = setInterval(() => {
      if (index > 9) index = 0;
      handleAddFilter(index);
      index++;
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Lazy loaz first content paintful img for mobile
  useEffect(() => {
    if (window.innerWidth <= 500 && firstImgRef.current) {
      firstImgRef.current.loading = "lazy";
    }
  }, []);

  return (
    <section className="relative flex w-full max-w-[1200px] flex-col items-center gap-20 px-5 pb-14 text-center md:flex-row md:justify-around md:gap-0">
      <div className="absolute bottom-0 flex w-full items-center justify-center gap-4">
        {colourPallet.map((colour, index) => (
          <div
            ref={(el) => {
              if (el) divsRef.current.push(el);
            }}
            className={`flex h-2 w-2 rounded-sm ${colour} ${
              index === 0 && !isAnimating && "scale-[1.3]"
            }`}
          ></div>
        ))}
      </div>
      {firstShowcaseData.map((data) => (
        <div className="relative flex max-w-[280px] flex-col items-center gap-6">
          <div className="relative flex">
            <picture>
              <source srcSet={data.webpImg} type="image/webp"></source>
              <img
                ref={data.ref}
                src={data.pngImg}
                alt="keyboard and mouse sitting on a table beside a cup of coffee, whith an ocean view illustration for computer screen, all in shades of blue."
                width={190}
                height={245}
                className={`${
                  data.ref === imgRef ? styles["image-theme"] : styles.image
                } mb-2 rounded-lg`}
              />
            </picture>
          </div>
          <h2 className="font-lora text-xl font-bold capitalize text-defaultblue">
            {data.title}
          </h2>
          <p className="font-lato font-normal leading-8">{data.description}</p>
        </div>
      ))}
    </section>
  );
}

export default FirstShowcase;
