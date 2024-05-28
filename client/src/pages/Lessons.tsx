import LessonMenuBtns from "../components/ui/LessonMenuBtns";
import LessonProgressBar from "../components/ui/LessonProgressBar";
import { Fragment, useEffect } from "react";

function Lessons() {
  const lessonsData = [
    {
      sectionId: "beginner-id",
      sectionTitle: "Beginner",
      sectionData: [
        {
          subSectiontitle: "🏠🫲 Home Row Left Hand",
          subSectionId: "home-row-left-id",
          subSectionData: [
            {
              id: "as",
              linkTitle: "as",
              linkImgUrl: "",
            },
            {
              id: "ad",
              linkTitle: "ad",
              linkImgUrl: "",
            },
            {
              id: "af",
              linkTitle: "af",
              linkImgUrl: "",
            },
            {
              id: "sd",
              linkTitle: "sd",
              linkImgUrl: "",
            },
            {
              id: "fd",
              linkTitle: "fd",
              linkImgUrl: "",
            },
            {
              id: "asd",
              linkTitle: "asd",
              linkImgUrl: "",
            },
            {
              id: "fds",
              linkTitle: "fds",
              linkImgUrl: "",
            },
            {
              id: "asdf",
              linkTitle: "asdf",
              linkImgUrl: "",
            },
            {
              id: "asdf-capital",
              linkTitle: "ASDF",
              linkImgUrl: "",
            },
            {
              id: "asdfasdf",
              linkTitle: "ASDFasdf",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "🏠🫱 Home Row Right Hand",
          subSectionId: "home-row-right-id",
          subSectionData: [
            {
              id: "jk",
              linkTitle: "jk",
              linkImgUrl: "",
            },
            {
              id: "jl",
              linkTitle: "jl",
              linkImgUrl: "",
            },
            {
              id: "j;",
              linkTitle: "j;",
              linkImgUrl: "",
            },
            {
              id: "kl",
              linkTitle: "kl",
              linkImgUrl: "",
            },
            {
              id: ";k",
              linkTitle: ";k",
              linkImgUrl: "",
            },
            {
              id: "jkl",
              linkTitle: "jkl",
              linkImgUrl: "",
            },
            {
              id: ";lk",
              linkTitle: ";lk",
              linkImgUrl: "",
            },
            {
              id: "jkl:",
              linkTitle: "JKL:",
              linkImgUrl: "",
            },
            {
              id: "jkl:jkl;",
              linkTitle: "JKL:jkl;",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "🏠👐 Home Row",
          subSectionId: "home-row-id",
          subSectionData: [
            {
              id: "asjk",
              linkTitle: "asjk",
              linkImgUrl: "",
            },
            {
              id: "adjl",
              linkTitle: "adjl",
              linkImgUrl: "",
            },
            {
              id: "afj;",
              linkTitle: "afj;",
              linkImgUrl: "",
            },
            {
              id: "sdkl",
              linkTitle: "sdkl",
              linkImgUrl: "",
            },
            {
              id: "fs;k",
              linkTitle: "fs;k",
              linkImgUrl: "",
            },
            {
              id: "asdjkl",
              linkTitle: "asdjkl",
              linkImgUrl: "",
            },
            {
              id: "fds;lk",
              linkTitle: "fds;lk",
              linkImgUrl: "",
            },
            {
              id: "asdfjkl:",
              linkTitle: "ASDFJKL:",
              linkImgUrl: "",
            },
            {
              id: "asdfasdfjkl:jkl;",
              linkTitle: "ASDFasdfJKL:jkl;",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "🔝🫲 Top Row Left Hand",
          subSectionId: "top-row-left-id",
          subSectionData: [
            {
              id: "qw",
              linkTitle: "qw",
              linkImgUrl: "",
            },
            {
              id: "qe",
              linkTitle: "qe",
              linkImgUrl: "",
            },
            {
              id: "qr",
              linkTitle: "qr",
              linkImgUrl: "",
            },
            {
              id: "qt",
              linkTitle: "qt",
              linkImgUrl: "",
            },
            {
              id: "wer",
              linkTitle: "wer",
              linkImgUrl: "",
            },
            {
              id: "qwe",
              linkTitle: "qwe",
              linkImgUrl: "",
            },
            {
              id: "ert",
              linkTitle: "ert",
              linkImgUrl: "",
            },
            {
              id: "qwert",
              linkTitle: "qwert",
              linkImgUrl: "",
            },
            {
              id: "qwert-capital",
              linkTitle: "QWERT",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "🔝🫱 Top Row Right Hand",
          subSectionId: "top-row-right-id",
          subSectionData: [
            {
              id: "yu",
              linkTitle: "yu",
              linkImgUrl: "",
            },
            {
              id: "yi",
              linkTitle: "yi",
              linkImgUrl: "",
            },
            {
              id: "yo",
              linkTitle: "yo",
              linkImgUrl: "",
            },
            {
              id: "yp",
              linkTitle: "yp",
              linkImgUrl: "",
            },
            {
              id: "uio",
              linkTitle: "uio",
              linkImgUrl: "",
            },
            {
              id: "yui",
              linkTitle: "yui",
              linkImgUrl: "",
            },
            {
              id: "iop",
              linkTitle: "iop",
              linkImgUrl: "",
            },
            {
              id: "yuiop",
              linkTitle: "yuiop",
              linkImgUrl: "",
            },
            {
              id: "yuiop-capital",
              linkTitle: "YUIOP",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "🔝👐 Top Row",
          subSectionId: "top-row-id",
          subSectionData: [
            {
              id: "qwyu",
              linkTitle: "qwyu",
              linkImgUrl: "",
            },
            {
              id: "qeyi",
              linkTitle: "qeyi",
              linkImgUrl: "",
            },
            {
              id: "qryo",
              linkTitle: "qryo",
              linkImgUrl: "",
            },
            {
              id: "qtyp",
              linkTitle: "qtyp",
              linkImgUrl: "",
            },
            {
              id: "weruio",
              linkTitle: "weruio",
              linkImgUrl: "",
            },
            {
              id: "qweyui",
              linkTitle: "qweyui",
              linkImgUrl: "",
            },
            {
              id: "ertiop",
              linkTitle: "ertiop",
              linkImgUrl: "",
            },
            {
              id: "qwertyuiop",
              linkTitle: "qwertyuiop",
              linkImgUrl: "",
            },
            {
              id: "qwertyuiop-capital",
              linkTitle: "QWERTYUIOP",
              linkImgUrl: "",
            },
            {
              id: "qwertqwertyuiopyuiop",
              linkTitle: "QWERTqwertYUIOPyuiop",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "⬇️🫲 Bottom Row Left Hand",
          subSectionId: "bottom-row-left-id",
          subSectionData: [
            {
              id: "zx",
              linkTitle: "zx",
              linkImgUrl: "",
            },
            {
              id: "zc",
              linkTitle: "zc",
              linkImgUrl: "",
            },
            {
              id: "zv",
              linkTitle: "zv",
              linkImgUrl: "",
            },
            {
              id: "zb",
              linkTitle: "zb",
              linkImgUrl: "",
            },
            {
              id: "xcv",
              linkTitle: "xcv",
              linkImgUrl: "",
            },
            {
              id: "zxc",
              linkTitle: "zxc",
              linkImgUrl: "",
            },
            {
              id: "cvb",
              linkTitle: "cvb",
              linkImgUrl: "",
            },
            {
              id: "zxcvb",
              linkTitle: "zxcvb",
              linkImgUrl: "",
            },
            {
              id: "zxcvb-capital",
              linkTitle: "ZXCVB",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "⬇️🫱 Bottom Row Right Hand",
          subSectionId: "bottom-row-right-id",
          subSectionData: [
            {
              id: "nm",
              linkTitle: "nm",
              linkImgUrl: "",
            },
            {
              id: "n,",
              linkTitle: "n,",
              linkImgUrl: "",
            },
            {
              id: "n.",
              linkTitle: "n.",
              linkImgUrl: "",
            },
            {
              id: "n/",
              linkTitle: "n/",
              linkImgUrl: "",
            },
            {
              id: "m,.",
              linkTitle: "m,.",
              linkImgUrl: "",
            },
            {
              id: "nm,",
              linkTitle: "nm,",
              linkImgUrl: "",
            },
            {
              id: ",./",
              linkTitle: ",./",
              linkImgUrl: "",
            },
            {
              id: "nm,./",
              linkTitle: "nm,./",
              linkImgUrl: "",
            },
            {
              id: "nm<>?",
              linkTitle: "NM<>?",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "⬇️👐 Bottom Row",
          subSectionId: "bottom-row-id",
          subSectionData: [
            {
              id: "zxnm",
              linkTitle: "zxnm",
              linkImgUrl: "",
            },
            {
              id: "zcn,",
              linkTitle: "zcn,",
              linkImgUrl: "",
            },
            {
              id: "zvn.",
              linkTitle: "zvn.",
              linkImgUrl: "",
            },
            {
              id: "zbn/",
              linkTitle: "zbn/",
              linkImgUrl: "",
            },
            {
              id: "xcvm,.",
              linkTitle: "xcvm,.",
              linkImgUrl: "",
            },
            {
              id: "zxcnm,",
              linkTitle: "zxcnm,",
              linkImgUrl: "",
            },
            {
              id: "cvb,./",
              linkTitle: "cvb,./",
              linkImgUrl: "",
            },
            {
              id: "zxcvbnm,./",
              linkTitle: "zxcvbnm,./",
              linkImgUrl: "",
            },
            {
              id: "zxcvbnm,./-capital",
              linkTitle: "ZXCVBNM,./",
              linkImgUrl: "",
            },
            {
              id: "zxcvbzxcvbnm,./nm,./",
              linkTitle: "ZXCVBzxcvbNM,./nm,./",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
    {
      sectionId: "intermediate-id",
      sectionTitle: "Intermediate",
      sectionData: [
        {
          subSectiontitle: "⌨️ All Three Rows",
          subSectionId: "all-three-rows-id",
          subSectionData: [
            {
              id: "lower-case-1",
              linkTitle: "lower case: 🫲",
              linkImgUrl: "",
            },
            {
              id: "lower-case-2",
              linkTitle: "lower case: 🫱",
              linkImgUrl: "",
            },
            {
              id: "lower-case-3",
              linkTitle: "lower case: 🙌",
              linkImgUrl: "",
            },
            {
              id: "upper-case-1",
              linkTitle: "UPPER CASE: 🫲",
              linkImgUrl: "",
            },
            {
              id: "upper-case-2",
              linkTitle: "UPPER CASE: 🫱",
              linkImgUrl: "",
            },
            {
              id: "upper-case-3",
              linkTitle: "UPPER CASE: 🙌",
              linkImgUrl: "",
            },
            {
              id: "camel-case-1",
              linkTitle: "CaMeL CaSe: 🫲",
              linkImgUrl: "",
            },
            {
              id: "camel-case-2",
              linkTitle: "CaMeL CaSe: 🫱",
              linkImgUrl: "",
            },
            {
              id: "camel-case-3",
              linkTitle: "CaMeL CaSe: 🙌",
              linkImgUrl: "",
            },
            {
              id: "pascal-case-1",
              linkTitle: "Pascal Case: 🫲",
              linkImgUrl: "",
            },
            {
              id: "pascal-case-2",
              linkTitle: "Pascal Case: 🫱",
              linkImgUrl: "",
            },
            {
              id: "pascal-case-3",
              linkTitle: "Pascal Case: 🙌",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "#️⃣ Number Row",
          subSectionId: "number-row-id",
          subSectionData: [
            {
              id: "number-row-left",
              linkTitle: "123456",
              linkImgUrl: "",
            },
            {
              id: "number-row-right",
              linkTitle: "7890-=",
              linkImgUrl: "",
            },
            {
              id: "number-row-full",
              linkTitle: "1234567890-=",
              linkImgUrl: "",
            },
            {
              id: "number-row-left-1",
              linkTitle: "!@#$%^",
              linkImgUrl: "",
            },
            {
              id: "number-row-right-1",
              linkTitle: "&*()_+",
              linkImgUrl: "",
            },
            {
              id: "number-left-full-1",
              linkTitle: "123456!@#$%^",
              linkImgUrl: "",
            },
            {
              id: "number-right-full-1",
              linkTitle: "7890-=&*()_+",
              linkImgUrl: "",
            },
            {
              id: "number-full-1",
              linkTitle: "Full Number Row",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "(◕‿◕) Brackets",
          subSectionId: "brackets-id",
          subSectionData: [
            {
              id: "brackets-1",
              linkTitle: "asdfjkl;{}",
              linkImgUrl: "",
            },
            {
              id: "brackets-2",
              linkTitle: "asdfjkl;[]",
              linkImgUrl: "",
            },
            {
              id: "brackets-3",
              linkTitle: "asdfjkl;{}[]",
              linkImgUrl: "",
            },
            {
              id: "brackets-4",
              linkTitle: "asdfjkl;()",
              linkImgUrl: "",
            },
            {
              id: "brackets-5",
              linkTitle: "asdfjkl;{}[]()",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
    {
      sectionId: "advanced-id",
      sectionTitle: "Advanced",
      sectionData: [
        {
          subSectiontitle: "☮️ Symbols",
          subSectionId: "symbols-id",
          subSectionData: [
            {
              id: "mixed-case-1",
              linkTitle: "MiXed CasE: 🫲",
              linkImgUrl: "",
            },
            {
              id: "mixed-case-2",
              linkTitle: "MiXed CasE: 🫱",
              linkImgUrl: "",
            },
            {
              id: "mixed-case-3",
              linkTitle: "MiXed CasE: 🙌",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "🅰️#️⃣☮️ Letters, Numbers, & Symbols",
          subSectionId: "letters-nums-symbols-id",
          subSectionData: [
            {
              id: "mixed-case-1",
              linkTitle: "MiXed CasE: 🫲",
              linkImgUrl: "",
            },
            {
              id: "mixed-case-2",
              linkTitle: "MiXed CasE: 🫱",
              linkImgUrl: "",
            },
            {
              id: "mixed-case-3",
              linkTitle: "MiXed CasE: 🙌",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "😤 Tricky Words",
          subSectionId: "tricky-words-id",
          subSectionData: [
            {
              id: "tricky-words",
              linkTitle: "Words",
              linkImgUrl: "",
            },
            {
              id: "tricky-mixed-words",
              linkTitle: "MiXed CaSe",
              linkImgUrl: "",
            },
            {
              id: "tricky-words-symbols",
              linkTitle: "Words & Symbols",
              linkImgUrl: "",
            },
            {
              id: "tricky-mixed-words-symbols",
              linkTitle: "MiXed CaSe & Symbols",
              linkImgUrl: "",
            },
            {
              id: "mixed-case-3",
              linkTitle: "MiXed WorDs & All",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
    {
      sectionId: "graduation-id",
      sectionTitle: "You Made It",
      sectionData: [
        {
          subSectiontitle: "🎓 Graduation",
          subSectionId: "home-row-left-id",
          subSectionData: [
            {
              id: "congratulations",
              linkTitle: "Congratulations!",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
    {
      sectionId: "quotes-id",
      sectionTitle: "Quotes",
      sectionData: [
        {
          subSectiontitle: "📜 Quote Section",
          subSectionId: "quote-section-id",
          subSectionData: [
            {
              id: "quote-1",
              linkTitle: "Quote 1",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
    {
      sectionId: "animals-id",
      sectionTitle: "Animals",
      sectionData: [
        {
          subSectiontitle: "🐙 Animal 1",
          subSectionId: "Animal-1-id",
          subSectionData: [
            {
              id: "first-animal",
              linkTitle: "First Animal",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
    {
      sectionId: "biology-id",
      sectionTitle: "Biology",
      sectionData: [
        {
          subSectiontitle: "🧬 First Biology Section",
          subSectionId: "first-bio-section-id",
          subSectionData: [
            {
              id: "bio-text-1",
              linkTitle: "Bio Text 1",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
    {
      sectionId: "novels-id",
      sectionTitle: "Novels",
      sectionData: [
        {
          subSectiontitle: "📕 First Book Theme",
          subSectionId: "first-book-theme-id",
          subSectionData: [
            {
              id: "first-book",
              linkTitle: "First Book",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const printThis = false;
    printThis && console.log(<LessonMenuBtns></LessonMenuBtns>);
    printThis && console.log(<LessonProgressBar></LessonProgressBar>);
  }, []);

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-8 py-12">
      <header>
        <h1 className="flex w-full justify-center  font-nunito text-3xl text-defaultblue">
          Typing Lessons
        </h1>
        {/* <div>Progress summary: Continue where you left off</div> */}
      </header>
      <main className="flex flex-col gap-10">
        {/* <All Levels Progress Bar> */}
        {lessonsData.map((lessons) => (
          <div
            key={lessons.sectionId}
            className="flex flex-col font-lora text-3xl"
          >
            <h2 className="mb-7 text-slate-600">{lessons.sectionTitle}</h2>
            {lessons.sectionData.map((section) => (
              <Fragment key={section.subSectionId}>
                <div>
                  <h3 className="mb-10 text-center font-lato text-xl text-slate-800 sm:pl-5 sm:text-left">
                    {section.subSectiontitle}
                  </h3>
                  {/* <LessonProgressBar /> */}
                </div>
                <ul className="mx-5 mb-12 grid gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-x-12">
                  {section?.subSectionData?.map((subSection) => (
                    <li
                      key={section.subSectionId + "-" + subSection.id}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 px-5 py-4 font-nunito text-lg  text-defaultblue hover:border-sky-400"
                    >
                      {subSection.linkTitle}
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </div>
        ))}
      </main>
    </div>
    // ADD advert for additional BOOKS/NOVELS at very bottom that links to the book/novel typing test site. Also link ads for other sites. Add bible to books site, not here.
  );
}

export default Lessons;
