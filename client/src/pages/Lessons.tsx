// import LessonMenuBtns from "../components/ui/LessonMenuBtns";
import LessonProgressBar from "../components/ui/LessonProgressBar";

function Lessons() {
  const lessonsData = [
    {
      sectionId: "beginner-id",
      sectionTitle: "Beginner",
      sectionData: [
        {
          subSectiontitle: "Home Row Left Hand",
          subSectionId: "home-row-left-id",
          subSectionData: [
            {
              id: "as",
              linkTitle: "as",
              linkImgUrl: "",
            },
            {
              linkTitle: "ad",
              linkImgUrl: "",
            },
            {
              linkTitle: "af",
              linkImgUrl: "",
            },
            {
              linkTitle: "sd",
              linkImgUrl: "",
            },
            {
              linkTitle: "fd",
              linkImgUrl: "",
            },
            {
              linkTitle: "asd",
              linkImgUrl: "",
            },
            {
              linkTitle: "fds",
              linkImgUrl: "",
            },
            {
              linkTitle: "asdf",
              linkImgUrl: "",
            },
            {
              linkTitle: "ASDF",
              linkImgUrl: "",
            },
            {
              linkTitle: "ASDFasdf",
              linkImgUrl: "",
            },
          ],
        },
        {
          subSectiontitle: "Home Row Right Hand",
          subSectionId: "home-row-right-id",
          subSectionData: [
            {
              id: "jk",
              linkTitle: "JK",
              linkImgUrl: "",
            },
            {
              linkTitle: "JL",
              linkImgUrl: "",
            },
            {
              linkTitle: "J;",
              linkImgUrl: "",
            },
            {
              linkTitle: "KL",
              linkImgUrl: "",
            },
            {
              linkTitle: ";K",
              linkImgUrl: "",
            },
            {
              linkTitle: "JKL",
              linkImgUrl: "",
            },
            {
              linkTitle: ";:LK",
              linkImgUrl: "",
            },
            {
              linkTitle: "JKL;",
              linkImgUrl: "",
            },
            {
              linkTitle: "JKL:jkl;",
              linkImgUrl: "",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-14 py-12">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-3xl text-defaultblue">
          Typing Lessons
        </h1>
        {/* <div>Progress summary: Continue where you left off</div> */}
      </header>
      <main>
        {lessonsData.map((lessons) => (
          <div key={lessons.sectionId} className="flex flex-col">
            <div>
              <h2>{lessons.sectionTitle}</h2>
              <LessonProgressBar />
            </div>
            {lessons.sectionData.map((section) => (
              <ul key={section.subSectionId}>
                <li>
                  <div>
                    <h3>{section.subSectiontitle}</h3>
                    <LessonProgressBar />
                  </div>
                  {section?.subSectionData?.map((subSection) => (
                    <div key={section.subSectionId + subSection.id}>
                      {subSection.linkTitle}
                    </div>
                  ))}
                </li>
              </ul>
            ))}
          </div>
        ))}
        <div className="flex flex-col">
          {/* <div>
            <h2>Beginner</h2>
            <LessonProgressBar />
          </div> */}
          <ul>
            {/* <li>
              <div>
                <h3>Home Row Left Hand</h3>
                <LessonProgressBar />
              </div>
              <LessonMenuBtns />
            </li> */}
            <li>
              <h3>Home Row Right Hand</h3>
            </li>
            <li>
              <h3>Home Row</h3>
            </li>
            <li>
              <h3>Top Row Left Hand</h3>
            </li>
            <li>
              <h3>Top Row Right Hand</h3>
            </li>
            <li>
              <h3>Top Row</h3>
            </li>
            <li>
              <h3>Bottom Row Left Hand</h3>
            </li>
            <li>
              <h3>Bottom Row Right Hand</h3>
            </li>
            <li>
              <h3>Bottom Row</h3>
            </li>
            <li>
              <h3>All Three Rows</h3>
            </li>
            <li>
              <h3>All Rows Shift & Enter</h3>
            </li>
          </ul>
        </div>
        <div>
          <h2>Intermediate</h2>
          <ul>
            <li>
              <h3>Brackets</h3>
            </li>
            <li>
              <h3>Number Row</h3>
            </li>
            <li>
              <h3>Number Row Left</h3>
            </li>
            <li>
              <h3>Number Row Right</h3>
            </li>
            <li>
              <h3>Number Row</h3>
            </li>
            <li>
              <h3>Symbols</h3>
            </li>
            <li>
              <h3>Backspace/Delete</h3>
            </li>
          </ul>
        </div>
        <div>
          <h2>Advanced</h2>
          <ul>
            <li>
              <h3>Letters and Numbers</h3>
            </li>
            <li>
              <h3>Tricky Words lower case</h3>
            </li>
            <li>
              <h3>Tricky Words mixed case</h3>
            </li>
            <li>
              <h3>Tricky Words with Symbols</h3>
            </li>
          </ul>
        </div>
        <div>
          <h2>Graduation</h2>
          {/* <p>
            Small article congratulating user for completing learning,
            commending them on commitment & summarizing the skills they have
            acquired. Mention that if they truly attempted every single test
            before this then they will unlock a bunch of cool stuff after
            completing this test. If not, then thy should go back and finish it.
          </p> */}
        </div>
        <div>
          <h2>Quotes</h2>
        </div>
        <div>
          <h2>Biology</h2>
        </div>
        <div>
          <h2>Animals</h2>
        </div>
        <div>
          <h2>Bible</h2>
        </div>
        <div>
          <h2>Books</h2>
        </div>
      </main>
    </div>
  );
}

export default Lessons;
