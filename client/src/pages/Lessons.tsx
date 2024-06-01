import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import { v4 as uuidv4 } from "uuid";
import Icon from "../utils/Icon";

const Lesson = loadable(() => import("./Lesson"));
interface PropType {
  lessonTitle?: string;
  sectionTitle?: string;
  performanceScore: number[][][];
  lessonIndex?: number;
  sectionIndex?: number;
  lessonVisibility?: boolean[];
}

type SectionType = {
  lessonIndex: number;
  sectionIndex: number;
  performanceScore: number[];
  lesson: {
    sectionId: string;
    sectionData: { levelTitle: string; id: string }[];
  };
};

//Array of obects used to manage lessons page structure
const pageData = [
  {
    lessonId: "beginner-id",
    lessonTitle: "Beginner",
    lessonData: [
      {
        sectionTitle: "Home Row Left Hand",
        sectionId: "home-row-left-id",
        sectionData: [
          {
            id: "as",
            levelTitle: "as",
          },
          {
            id: "ad",
            levelTitle: "ad",
          },
          {
            id: "af",
            levelTitle: "af",
          },
          {
            id: "sd",
            levelTitle: "sd",
          },
          {
            id: "fd",
            levelTitle: "fd",
          },
          {
            id: "asd",
            levelTitle: "asd",
          },
          {
            id: "fds",
            levelTitle: "fds",
          },
          {
            id: "asdf",
            levelTitle: "asdf",
          },
          {
            id: "asdf-capital",
            levelTitle: "ASDF",
          },
          {
            id: "asdfasdf",
            levelTitle: "ASDFasdf",
          },
        ],
      },
      {
        sectionTitle: "Home Row Right Hand",
        sectionId: "home-row-right-id",
        sectionData: [
          {
            id: "jk",
            levelTitle: "jk",
          },
          {
            id: "jl",
            levelTitle: "jl",
          },
          {
            id: "j;",
            levelTitle: "j;",
          },
          {
            id: "kl",
            levelTitle: "kl",
          },
          {
            id: ";k",
            levelTitle: ";k",
          },
          {
            id: "jkl",
            levelTitle: "jkl",
          },
          {
            id: ";lk",
            levelTitle: ";lk",
          },
          {
            id: "jkl:",
            levelTitle: "JKL:",
          },
          {
            id: "jkl:jkl;",
            levelTitle: "JKL:jkl;",
          },
        ],
      },
      {
        sectionTitle: "Home Row",
        sectionId: "home-row-id",
        sectionData: [
          {
            id: "asjk",
            levelTitle: "asjk",
          },
          {
            id: "adjl",
            levelTitle: "adjl",
          },
          {
            id: "afj;",
            levelTitle: "afj;",
          },
          {
            id: "sdkl",
            levelTitle: "sdkl",
          },
          {
            id: "fs;k",
            levelTitle: "fs;k",
          },
          {
            id: "asdjkl",
            levelTitle: "asdjkl",
          },
          {
            id: "fds;lk",
            levelTitle: "fds;lk",
          },
          {
            id: "asdfjkl:",
            levelTitle: "ASDFJKL:",
          },
          {
            id: "asdfasdfjkl:jkl;",
            levelTitle: "ASDFasdfJKL:jkl;",
          },
        ],
      },
      {
        sectionTitle: "Top Row Left Hand",
        sectionId: "top-row-left-id",
        sectionData: [
          {
            id: "qw",
            levelTitle: "qw",
          },
          {
            id: "qe",
            levelTitle: "qe",
          },
          {
            id: "qr",
            levelTitle: "qr",
          },
          {
            id: "qt",
            levelTitle: "qt",
          },
          {
            id: "wer",
            levelTitle: "wer",
          },
          {
            id: "qwe",
            levelTitle: "qwe",
          },
          {
            id: "ert",
            levelTitle: "ert",
          },
          {
            id: "qwert",
            levelTitle: "qwert",
          },
          {
            id: "qwert-capital",
            levelTitle: "QWERT",
          },
        ],
      },
      {
        sectionTitle: "Top Row Right Hand",
        sectionId: "top-row-right-id",
        sectionData: [
          {
            id: "yu",
            levelTitle: "yu",
          },
          {
            id: "yi",
            levelTitle: "yi",
          },
          {
            id: "yo",
            levelTitle: "yo",
          },
          {
            id: "yp",
            levelTitle: "yp",
          },
          {
            id: "uio",
            levelTitle: "uio",
          },
          {
            id: "yui",
            levelTitle: "yui",
          },
          {
            id: "iop",
            levelTitle: "iop",
          },
          {
            id: "yuiop",
            levelTitle: "yuiop",
          },
          {
            id: "yuiop-capital",
            levelTitle: "YUIOP",
          },
        ],
      },
      {
        sectionTitle: "Top Row",
        sectionId: "top-row-id",
        sectionData: [
          {
            id: "qwyu",
            levelTitle: "qwyu",
          },
          {
            id: "qeyi",
            levelTitle: "qeyi",
          },
          {
            id: "qryo",
            levelTitle: "qryo",
          },
          {
            id: "qtyp",
            levelTitle: "qtyp",
          },
          {
            id: "weruio",
            levelTitle: "weruio",
          },
          {
            id: "qweyui",
            levelTitle: "qweyui",
          },
          {
            id: "ertiop",
            levelTitle: "ertiop",
          },
          {
            id: "qwertyuiop",
            levelTitle: "qwertyuiop",
          },
          {
            id: "qwertyuiop-capital",
            levelTitle: "QWERTYUIOP",
          },
          {
            id: "qwertqwertyuiopyuiop",
            levelTitle: "QWERTqwertYUIOPyuiop",
          },
        ],
      },
      {
        sectionTitle: "Bottom Row Left Hand",
        sectionId: "bottom-row-left-id",
        sectionData: [
          {
            id: "zx",
            levelTitle: "zx",
          },
          {
            id: "zc",
            levelTitle: "zc",
          },
          {
            id: "zv",
            levelTitle: "zv",
          },
          {
            id: "zb",
            levelTitle: "zb",
          },
          {
            id: "xcv",
            levelTitle: "xcv",
          },
          {
            id: "zxc",
            levelTitle: "zxc",
          },
          {
            id: "cvb",
            levelTitle: "cvb",
          },
          {
            id: "zxcvb",
            levelTitle: "zxcvb",
          },
          {
            id: "zxcvb-capital",
            levelTitle: "ZXCVB",
          },
        ],
      },
      {
        sectionTitle: "Bottom Row Right Hand",
        sectionId: "bottom-row-right-id",
        sectionData: [
          {
            id: "nm",
            levelTitle: "nm",
          },
          {
            id: "n,",
            levelTitle: "n,",
          },
          {
            id: "n.",
            levelTitle: "n.",
          },
          {
            id: "n/",
            levelTitle: "n/",
          },
          {
            id: "m,.",
            levelTitle: "m,.",
          },
          {
            id: "nm,",
            levelTitle: "nm,",
          },
          {
            id: ",./",
            levelTitle: ",./",
          },
          {
            id: "nm,./",
            levelTitle: "nm,./",
          },
          {
            id: "nm<>?",
            levelTitle: "NM<>?",
          },
        ],
      },
      {
        sectionTitle: "Bottom Row",
        sectionId: "bottom-row-id",
        sectionData: [
          {
            id: "zxnm",
            levelTitle: "zxnm",
          },
          {
            id: "zcn,",
            levelTitle: "zcn,",
          },
          {
            id: "zvn.",
            levelTitle: "zvn.",
          },
          {
            id: "zbn/",
            levelTitle: "zbn/",
          },
          {
            id: "xcvm,.",
            levelTitle: "xcvm,.",
          },
          {
            id: "zxcnm,",
            levelTitle: "zxcnm,",
          },
          {
            id: "cvb,./",
            levelTitle: "cvb,./",
          },
          {
            id: "zxcvbnm,./",
            levelTitle: "zxcvbnm,./",
          },
          {
            id: "zxcvbnm,./-capital",
            levelTitle: "ZXCVBNM,./",
          },
          {
            id: "zxcvbzxcvbnm,./nm,./",
            levelTitle: "ZXCVBzxcvbNM,./nm,./",
          },
        ],
      },
    ],
  },
  {
    lessonId: "intermediate-id",
    lessonTitle: "Intermediate",
    lessonData: [
      {
        sectionTitle: "English Words",
        sectionId: "all-three-rows-id",
        sectionData: [
          {
            id: "lower-case-1",
            levelTitle: "lower case: 🫲",
          },
          {
            id: "lower-case-2",
            levelTitle: "lower case: 🫱",
          },
          {
            id: "lower-case-3",
            levelTitle: "lower case: 🙌",
          },
          {
            id: "upper-case-1",
            levelTitle: "UPPER CASE: 🫲",
          },
          {
            id: "upper-case-2",
            levelTitle: "UPPER CASE: 🫱",
          },
          {
            id: "upper-case-3",
            levelTitle: "UPPER CASE: 🙌",
          },
          {
            id: "camel-case-1",
            levelTitle: "CaMeL CaSe: 🫲",
          },
          {
            id: "camel-case-2",
            levelTitle: "CaMeL CaSe: 🫱",
          },
          {
            id: "camel-case-3",
            levelTitle: "CaMeL CaSe: 🙌",
          },
          {
            id: "pascal-case-1",
            levelTitle: "Pascal Case: 🫲",
          },
          {
            id: "pascal-case-2",
            levelTitle: "Pascal Case: 🫱",
          },
          {
            id: "pascal-case-3",
            levelTitle: "Pascal Case: 🙌",
          },
        ],
      },
      {
        sectionTitle: "Number Row",
        sectionId: "number-row-id",
        sectionData: [
          {
            id: "number-row-left",
            levelTitle: "123456",
          },
          {
            id: "number-row-right",
            levelTitle: "7890-=",
          },
          {
            id: "number-row-full",
            levelTitle: "1234567890-=",
          },
          {
            id: "number-row-left-1",
            levelTitle: "!@#$%^",
          },
          {
            id: "number-row-right-1",
            levelTitle: "&*()_+",
          },
          {
            id: "number-left-full-1",
            levelTitle: "123456!@#$%^",
          },
          {
            id: "number-right-full-1",
            levelTitle: "7890-=&*()_+",
          },
          {
            id: "number-full-1",
            levelTitle: "Full Number Row",
          },
        ],
      },
      {
        sectionTitle: "Brackets",
        sectionId: "brackets-id",
        sectionData: [
          {
            id: "brackets-1",
            levelTitle: "asdfjkl;{}",
          },
          {
            id: "brackets-2",
            levelTitle: "asdfjkl;[]",
          },
          {
            id: "brackets-3",
            levelTitle: "asdfjkl;{}[]",
          },
          {
            id: "brackets-4",
            levelTitle: "asdfjkl;()",
          },
          {
            id: "brackets-5",
            levelTitle: "asdfjkl;{}[]()",
          },
        ],
      },
    ],
  },
  {
    lessonId: "advanced-id",
    lessonTitle: "Advanced",
    lessonData: [
      {
        sectionTitle: "Symbols",
        sectionId: "symbols-id",
        sectionData: [
          {
            id: "mixed-case-1",
            levelTitle: "MiXed CasE: 🫲",
          },
          {
            id: "mixed-case-2",
            levelTitle: "MiXed CasE: 🫱",
          },
          {
            id: "mixed-case-3",
            levelTitle: "MiXed CasE: 🙌",
          },
        ],
      },
      {
        sectionTitle: "Letters, Numbers, & Symbols",
        sectionId: "letters-nums-symbols-id",
        sectionData: [
          {
            id: "mixed-case-1",
            levelTitle: "MiXed CasE: 🫲",
          },
          {
            id: "mixed-case-2",
            levelTitle: "MiXed CasE: 🫱",
          },
          {
            id: "mixed-case-3",
            levelTitle: "MiXed CasE: 🙌",
          },
        ],
      },
      {
        sectionTitle: "Tricky Words",
        sectionId: "tricky-words-id",
        sectionData: [
          {
            id: "tricky-words",
            levelTitle: "Words",
          },
          {
            id: "tricky-mixed-words",
            levelTitle: "MiXed CaSe",
          },
          {
            id: "tricky-words-symbols",
            levelTitle: "Words & Symbols",
          },
          {
            id: "tricky-mixed-words-symbols",
            levelTitle: "MiXed CaSe & Symbols",
          },
          {
            id: "mixed-case-3",
            levelTitle: "MiXed WorDs & All",
          },
        ],
      },
    ],
  },
  {
    lessonId: "graduation-id",
    lessonTitle: "You Made It",
    lessonData: [
      {
        sectionTitle: "Graduation",
        sectionId: "home-row-left-id",
        sectionData: [
          {
            id: "congratulations",
            levelTitle: "Congratulations!",
          },
        ],
      },
    ],
  },
  {
    lessonId: "quotes-id",
    lessonTitle: "Quotes",
    lessonData: [
      {
        sectionTitle: "Quote Section",
        sectionId: "quote-lesson-id",
        sectionData: [
          {
            id: "quote-1",
            levelTitle: "Quote 1",
          },
        ],
      },
    ],
  },
  {
    lessonId: "animals-id",
    lessonTitle: "Animals",
    lessonData: [
      {
        sectionTitle: "Animal 1",
        sectionId: "Animal-1-id",
        sectionData: [
          {
            id: "first-animal",
            levelTitle: "🦑 First Animal",
          },
        ],
      },
    ],
  },
  {
    lessonId: "biology-id",
    lessonTitle: "Biology",
    lessonData: [
      {
        sectionTitle: "First Biology Section",
        sectionId: "first-bio-lesson-id",
        sectionData: [
          {
            id: "bio-text-1",
            levelTitle: "Bio Text 1",
          },
        ],
      },
    ],
  },
  {
    lessonId: "novels-id",
    lessonTitle: "Novels",
    lessonData: [
      {
        sectionTitle: "First Book Theme",
        sectionId: "first-book-theme-id",
        sectionData: [
          {
            id: "first-book",
            levelTitle: "First Book",
          },
        ],
      },
    ],
  },
];

//Displays section title(s) for a set of levels
function SectionTitle({
  sectionTitle,
  sectionIndex = 0,
  lessonIndex = 0,
  performanceScore,
}: PropType) {
  const handleperformanceScore = () => {
    return `(${
      performanceScore[lessonIndex][sectionIndex].filter(Boolean).length
    }/${performanceScore[lessonIndex][sectionIndex].length})`;
  };

  return (
    <div className="sm:justify-left mb-2 flex -translate-x-2 items-center justify-center gap-3 text-slate-950 sm:translate-x-0">
      <h3 className="flex items-center justify-center gap-2 text-center font-lato text-base sm:pl-3 sm:text-left sm:text-xl">
        <span className="text-base">{`${handleperformanceScore()}`} </span>
        <span>{sectionTitle}</span>
      </h3>
    </div>
  );
}

//Displays performance score for each level in the form of stars
function PerformanceStars({
  performanceScore = 0,
}: {
  performanceScore: number;
}) {
  const starArr = new Array(5).fill("");
  const styleArr = [
    "scale-[0.8] translate-x-1 ",
    "scale-[1.15] z-[1]",
    "scale-[1.3] z-[2]",
    "scale-[1.15]",
    "scale-[0.8] -translate-x-1",
  ];

  return (
    <div className="absolute -bottom-4 flex ">
      {starArr.map((_star, index) => (
        <Fragment key={uuidv4()}>
          <Icon
            icon={`${index + 1 <= performanceScore ? "starFull" : "starEmpty"}`}
            title="star-icon"
            customStyle={`${styleArr[index]} ${
              index + 1 <= performanceScore && "text-yellow-600"
            } text-slate-400`}
          />
        </Fragment>
      ))}
    </div>
  );
}

//Each link redirects to a specific lesson page
function LevelLinks({
  lesson,
  lessonIndex,
  sectionIndex,
  performanceScore,
}: SectionType) {
  return (
    <ul className="mx-5 mb-12 grid w-full gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
      {lesson?.sectionData?.map((section, levelIndex) => (
        <li key={lesson.sectionId + "-" + section.id}>
          <Link
            to={`/lessons/lesson/${lessonIndex + 1}/sec-${
              sectionIndex + 1
            }/lvl-${levelIndex + 1}`}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 bg-slate-200 p-4  font-nunito text-base text-slate-950 hover:bg-white hover:text-defaultblue"
          >
            <PerformanceStars performanceScore={performanceScore[levelIndex]} />
            <span>Level: {levelIndex + 1}</span>
            <span className="text-xs">{section.levelTitle}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

//Main title for lesson menu
function LessonTitle({
  lessonTitle,
  lessonIndex = 0,
  performanceScore,
}: PropType) {
  return (
    <h2 className={`flex items-center gap-2 text-2xl text-defaultblue`}>
      <span className="text-base">
        {`(${
          performanceScore[lessonIndex].filter((section) =>
            section.every(Boolean),
          ).length
        }/${performanceScore[lessonIndex].length})`}{" "}
      </span>
      <span>{lessonTitle} </span>
    </h2>
  );
}

function LessonMenuSidebar({ displayLesson, setDisplayLesson }) {
  return (
    <ul className="flex flex-col">
      {pageData.map((data, index) => (
        <li key={data.lessonId}>
          <button
            onClick={() => setDisplayLesson(index)}
            className={`${
              index === displayLesson
                ? "bg-white text-defaultblue"
                : "bg-slate-200 text-slate-950"
            } ${index === 0 && "rounded-tl-2xl"} ${
              index === pageData.length - 1 && "rounded-bl-2xl"
            } flex w-full cursor-pointer items-center justify-center px-8 py-5 font-nunito hover:bg-white  hover:text-defaultblue`}
          >
            {data.lessonTitle}
          </button>
        </li>
      ))}
    </ul>
  );
}

//Displays all lessons depending on lesson selected in menu sidebar
function LessonMenu({ displayLesson }: { displayLesson: number }) {
  //First array is for lesson, second array is sublesson, third array are the tests for each section to track completion status of all tests
  const [performanceScore] = useState<number[][][]>(
    pageData.map((lesson) =>
      lesson.lessonData.map((section) =>
        new Array(section.sectionData.length).fill(0),
      ),
    ),
  );

  return (
    <div className="flex min-h-[40em] w-full">
      {pageData.map((lessons, lessonIndex) => {
        return lessonIndex === displayLesson ? (
          <div
            key={lessons.lessonId}
            className="flex w-full flex-col items-center gap-8 rounded-xl rounded-tl-none bg-white p-8 font-lora text-3xl text-defaultblue"
          >
            <LessonTitle
              performanceScore={performanceScore}
              lessonTitle={lessons.lessonTitle}
              lessonIndex={lessonIndex}
            />
            {lessons.lessonData.map((lesson, sectionIndex) => (
              <Fragment key={lesson.sectionId}>
                <SectionTitle
                  performanceScore={performanceScore}
                  sectionTitle={lesson.sectionTitle}
                  sectionIndex={sectionIndex}
                  lessonIndex={lessonIndex}
                  lessonTitle={lessons.lessonTitle}
                />
                <LevelLinks
                  performanceScore={performanceScore[lessonIndex][sectionIndex]}
                  lesson={lesson}
                  lessonIndex={lessonIndex}
                  sectionIndex={sectionIndex}
                />
              </Fragment>
            ))}
          </div>
        ) : null;
      })}
    </div>
  );
}

function Lessons() {
  const [displayLesson, setDisplayLesson] = useState<number>(0); //Used to manage which section is to be displayed

  useEffect(() => {
    Lesson.preload();
  }, []);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 py-12">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-3xl text-white">
          Typing Lessons
        </h1>
        {/* <div>Progress summary: Continue where you left off</div> */}
      </header>
      <main className="mb-10 flex flex-col sm:flex-row">
        <section>
          <LessonMenuSidebar
            displayLesson={displayLesson}
            setDisplayLesson={setDisplayLesson}
          />
        </section>
        <LessonMenu displayLesson={displayLesson} />
      </main>
    </div>
    // ADD advert for games and additional BOOKS/NOVELS at very bottom that levels to the book/novel typing test site. Also level ads for other sites. Add bible to books site, not here.
  );
}

export default Lessons;
