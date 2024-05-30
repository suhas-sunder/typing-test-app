import { Fragment, useState } from "react";
import Icon from "../utils/Icon";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";

const Lesson = loadable(() => import("./Lesson"));

type Visibility = {
  lesson: boolean[];
  section: boolean[][];
};
interface PropType {
  lessonTitle?: string;
  sectionTitle?: string;
  completionStatus: boolean[][][];
  lessonIndex?: number;
  sectionIndex?: number;
  lessonVisibility?: boolean[];
  sectionVisibility?: boolean[];
  setVisibility: (value: (prevState: Visibility) => Visibility) => void;
}

function LessonSectionTitle({
  lessonTitle,
  lessonIndex,
  completionStatus,
  lessonVisibility,
  setVisibility,
}: PropType) {
  if (!lessonVisibility || typeof lessonIndex !== "number") return;
  //Hide/Show lesson
  const handleSectionVisibility = () => {
    setVisibility((prevState: Visibility) => ({
      ...prevState,
      lesson: prevState.lesson.map((value, index) =>
        lessonIndex === index ? !value : value,
      ),
    }));
  };

  return (
    <div
      className={`${
        lessonVisibility[lessonIndex] && "mb-7"
      } flex items-center gap-3 text-2xl`}
    >
      <span className="text-slate-600">
        {`(${
          completionStatus[lessonIndex].filter((section) =>
            section.every(Boolean),
          ).length
        }/${completionStatus[lessonIndex].length})`}{" "}
      </span>
      <h2 className="text-slate-600">{lessonTitle} </h2>
      <button
        onClick={handleSectionVisibility}
        className="flex translate-y-1 cursor-pointer text-slate-400 hover:text-sky-500"
      >
        {lessonVisibility[lessonIndex] ? (
          <Icon title="visible-icon" icon="eye" customStyle="" />
        ) : (
          <Icon title="invisible-icon" icon="eyeCrossed" customStyle="" />
        )}
      </button>
    </div>
  );
}

function LessonSubSectionTitle({
  sectionTitle,
  sectionIndex,
  lessonIndex,
  completionStatus,
  sectionVisibility,
  setVisibility,
}: PropType) {
  if (
    !sectionVisibility ||
    typeof sectionIndex !== "number" ||
    typeof lessonIndex !== "number"
  )
    return;

  //Hide/Show sub-lesson
  const handleSubSectionVisibility = () => {
    setVisibility((prevState: Visibility) => ({
      ...prevState,
      section: prevState.section.map((data, index) => {
        if (index === lessonIndex) {
          return data.map((value, valueIndex) =>
            valueIndex === sectionIndex ? !value : value,
          );
        } else {
          return data;
        }
      }),
    }));
  };

  const handleCompletionStatus = () => {
    return `(${
      completionStatus[lessonIndex][sectionIndex].filter(Boolean).length
    }/${completionStatus[lessonIndex][sectionIndex].length})`;
  };

  return (
    <div className="sm:justify-left mb-10 flex -translate-x-2 items-center justify-center gap-3 sm:translate-x-0">
      <h3 className="flex gap-3 text-center font-lato text-base text-slate-800 sm:pl-3 sm:text-left sm:text-xl">
        <span>{`${handleCompletionStatus()}`} </span>
        <span>{sectionTitle}</span>
      </h3>
      <button
        onClick={handleSubSectionVisibility}
        className="flex translate-y-[1.5px] cursor-pointer text-slate-400 hover:text-sky-500"
      >
        {sectionVisibility[sectionIndex] ? (
          <Icon title="visible-icon" icon="eye" customStyle="" />
        ) : (
          <Icon title="invisible-icon" icon="eyeCrossed" customStyle="" />
        )}
      </button>
    </div>
  );
}

type SectionType = {
  lessonIndex: number;
  sectionIndex: number;
  lesson: {
    sectionId: string;
    sectionData: { levelTitle: string; id: string }[];
  };
};

const loadLessonComponent = () => {
  Lesson.preload();
};

function LessonMenuBtns({ lesson, lessonIndex, sectionIndex }: SectionType) {
  return (
    <ul
      onMouseEnter={() => loadLessonComponent()}
      className="mx-5 mb-12 grid gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8"
    >
      {lesson?.sectionData?.map((section, levelIndex) => (
        <li key={lesson.sectionId + "-" + section.id}>
          <Link
            to={`/lessons/lesson/${lessonIndex + 1}/sec-${
              sectionIndex + 1
            }/lvl-${levelIndex + 1}`}
            className="flex cursor-pointer items-center justify-center rounded-md border-2 px-5 py-4 font-nunito text-base text-defaultblue hover:border-sky-400"
          >
            {section.levelTitle}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const lessonData = [
  {
    lessonId: "beginner-id",
    lessonTitle: "Beginner",
    lessonData: [
      {
        sectiontitle: "Home Row Left Hand",
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
        sectiontitle: "Home Row Right Hand",
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
        sectiontitle: "Home Row",
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
        sectiontitle: "Top Row Left Hand",
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
        sectiontitle: "Top Row Right Hand",
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
        sectiontitle: "Top Row",
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
        sectiontitle: "Bottom Row Left Hand",
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
        sectiontitle: "Bottom Row Right Hand",
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
        sectiontitle: "Bottom Row",
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
        sectiontitle: "All Three Rows",
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
        sectiontitle: "Number Row",
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
        sectiontitle: "Brackets",
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
        sectiontitle: "Symbols",
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
        sectiontitle: "Letters, Numbers, & Symbols",
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
        sectiontitle: "Tricky Words",
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
        sectiontitle: "Graduation",
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
        sectiontitle: "Quote Section",
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
        sectiontitle: "Animal 1",
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
        sectiontitle: "First Biology Section",
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
        sectiontitle: "First Book Theme",
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

function Lessons() {
  const [visibility, setVisibility] = useState<Visibility>({
    //Create an array to track lesson visibility
    lesson: new Array(lessonData.length).fill(true),
    //Create a nested array to keep track of sub-lesson visibility
    section: lessonData.map((lesson) =>
      new Array(lesson.lessonData.length).fill(true),
    ),
  });

  //First array is for lesson, second array is sublesson, third array are the tests for each section to track completion status of all tests
  const [completionStatus] = useState<boolean[][][]>(
    lessonData.map((lesson) =>
      lesson.lessonData.map((section) =>
        new Array(section.sectionData.length).fill(false),
      ),
    ),
  );

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 py-12">
      <header>
        <h1 className="flex w-full justify-center  font-nunito text-3xl text-defaultblue">
          Typing Lessons
        </h1>
        {/* <div>Progress summary: Continue where you left off</div> */}
      </header>
      <main className="mx-5 flex flex-col gap-10 ">
        {lessonData.map((lessons, lessonIndex) => (
          <div
            key={lessons.lessonId}
            className="flex flex-col font-lora text-3xl"
          >
            <LessonSectionTitle
              completionStatus={completionStatus}
              lessonVisibility={visibility.lesson}
              setVisibility={setVisibility}
              lessonTitle={lessons.lessonTitle}
              lessonIndex={lessonIndex}
            />
            {visibility.lesson[lessonIndex] &&
              lessons.lessonData.map((lesson, sectionIndex) => (
                <Fragment key={lesson.sectionId}>
                  <LessonSubSectionTitle
                    completionStatus={completionStatus}
                    sectionTitle={lesson.sectiontitle}
                    setVisibility={setVisibility}
                    sectionIndex={sectionIndex}
                    lessonIndex={lessonIndex}
                    sectionVisibility={visibility.section[lessonIndex]}
                    lessonTitle={lessons.lessonTitle}
                  />
                  {visibility.section[lessonIndex][sectionIndex] && (
                    <LessonMenuBtns
                      lesson={lesson}
                      lessonIndex={lessonIndex}
                      sectionIndex={sectionIndex}
                    />
                  )}
                </Fragment>
              ))}
          </div>
        ))}
      </main>
    </div>
    // ADD advert for additional BOOKS/NOVELS at very bottom that levels to the book/novel typing test site. Also level ads for other sites. Add bible to books site, not here.
  );
}

export default Lessons;
