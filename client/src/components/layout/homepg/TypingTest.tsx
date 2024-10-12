import { useEffect,  useState } from "react";
import UpdateCharStatus from "../../../utils/validation/ValidateChars";
import useTestDependencies from "../../hooks/useTestDependencies";
import useMenu from "../../hooks/useMenu";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Keyboard from "../../ui/shared/Keyboard";
import TriggerMobileKeyboard from "../../ui/shared/TriggerMobileKeyboard";
import Textbox from "../shared/Textbox";
import TypingStats from "../shared/TypingStats";

//Used by Home.tsx component for speed typing test
export default function TypingTest() {
  const { countDownTime, typingText } = useMenu();
  const [displayParagraphs, setDisplayParagraphs] = useState<string[]>([]);

  //Dependencies common to all typing tests
  const {
    firstInputDetected,
    charIsValid,
    showGameOverMenu,
    startTimer,
    text,
    accurateKeys,
    troubledKeys,
    cursorPosition,
    setStartTimer,
    setCursorPosition,
    handleEndTest,
    clearTestData,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
    setText,
  } = useTestDependencies({ defaultText: typingText });

  // Reset states for main menu
  const handleReturnToMenu = () => {
    clearTestData();
    setText("");
  };

  const navigate = useNavigate();

  // If home page route (logo) is clicked, reset the test.
  useEffect(() => {
    if (!typingText) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingText]);

  //Take long paragraphs and split them into smaller 4 sentence paragraphs.
  useEffect(() => {
    const updateDisplayParagraphs = () => {
      const newLessonText: string[] = [];

      typingText.split(".").forEach((sentence, index) => {
        const targetIndex = Math.ceil((index + 1) / 4) - 1;

        if (newLessonText[targetIndex] && sentence) {
          newLessonText[targetIndex] =
            newLessonText[targetIndex] + sentence + ".";
        } else if (sentence) {
          newLessonText.push(sentence + ".");
        }
      });

      setDisplayParagraphs(newLessonText);
    };

    updateDisplayParagraphs();
  }, [typingText]);


  return (
    <main className="relative mx-auto mb-20 flex min-h-[100em] max-w-[900px]  flex-col">
      <div className="flex min-h-[5em]">
        <TypingStats
          accurateKeys={accurateKeys}
          troubledKeys={troubledKeys}
          charIsValid={charIsValid}
          startTimer={startTimer}
          endTest={handleEndTest}
          countDownTime={countDownTime}
          firstInputDetected={firstInputDetected}
          handleRestart={clearTestData}
          showMainMenu={handleReturnToMenu}
          showGameOverMenu={showGameOverMenu}
          setShowGameOverMenu={setShowGameOverMenu}
          testName={"speed-test"}
          testLength={text.length}
        />
      </div>
      {!showGameOverMenu && (
        <>
          <div className="min-h-[19.5em] sm:-translate-y-4">
            {" "}
            {!startTimer && (
              <div className="absolute left-2 top-[5em] z-10 flex rounded-xl bg-sky-700 px-5 py-2 font-nunito text-white opacity-50 sm:top-0">
                Start Typing!
              </div>
            )}
            <TriggerMobileKeyboard showGameOverMenu={showGameOverMenu}>
              <Textbox
                accurateKeys={accurateKeys}
                troubledKeys={troubledKeys}
                charStatus={charIsValid}
                setCharStatus={(cursorIndex, newValue) =>
                  UpdateCharStatus({ setCharIsValid, cursorIndex, newValue })
                }
                updateStartTimer={setStartTimer}
                dummyText={text}
                cursorPosition={cursorPosition}
                setCursorPosition={setCursorPosition}
                firstInputDetected={firstInputDetected}
                setFirstInputDetected={setFirstInputDetected}
                setTroubledKeys={setTroubledKeys}
                setAccurateKeys={setAccurateKeys}
                lessonsPgText={false}
              />
            </TriggerMobileKeyboard>
          </div>
          <section
            id="keyboard"
            className="hidden min-h-[23em] -translate-y-3 flex-col items-center justify-center gap-6 md:flex lg:min-h-[23em]"
          >
            <Keyboard
              handleRestartLesson={clearTestData}
              displayedText={[...text]}
              cursorPosition={cursorPosition}
              menuURL="/"
            />
          </section>
        </>
      )}
      <article>
        <section>
          <h1 className="mt-10 flex w-full items-center justify-center font-nunito text-3xl text-defaultblue">
            Typing Test WPM Practice
          </h1>
          <p className="mt-5 font-lato text-lg leading-loose tracking-widest">
            This typing test will help you accurately measure your typing speed.
            If you are on a mobile device, tapping on the text will open your
            device keypad. To begin the test, simply start typing on your
            keyboard or mobile keypad and the timer will begin. Once the
            countdown timer reaches 0 the test will end, and your typing stats
            will be displayed.{" "}
          </p>

          <p className="mt-5 font-lato text-lg leading-loose tracking-widest text-slate-700">
            <span>
              If you are looking to improve your typing speed wpm and cpm, keep
              practicing consistently for best results. If you are new to typing
              or wish to take a more structured approach, you can always
            </span>{" "}
            <span className="text-sky-700 hover:text-sky-500">
              <Link to="/lessons">try our typing lessons</Link>
            </span>{" "}
            <span>
              for a unique variety of structured tests from beginner to advanced
              and more.
            </span>
          </p>

          <p className="mt-5 font-lato text-lg leading-loose tracking-widest text-slate-700">
            Each time you take a typing test, a random set of text will be
            presented for you to type. This text is pooled from hundreds of
            different paragraphs to provide variety and keep the test session
            interesting. However, at the moment, you will notice that the
            paragraph in each typing session is repeated several times in order
            to provide enough characters for you to type within the given test
            time. This will be fixed in the near future so that the entire
            length of text presented is entirely unique for each test session. I
            have displayed the entirety of the text below for you to review
            incase you are curious as to what you will be typing.{" "}
          </p>
        </section>
        <section>
          <h2 className="mb-8 mt-10 flex w-full items-center justify-center font-nunito text-2xl text-defaultblue">
            Here is a preview of the text you will be typing:
          </h2>
          {displayParagraphs.map((paragraph) => (
            <p
              key={uuidv4()}
              className="mt-5 font-lato text-lg leading-loose tracking-widest text-slate-700"
            >
              {paragraph}
            </p>
          ))}
        </section>
      </article>
    </main>
  );
}
