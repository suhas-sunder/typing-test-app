import Link from "next/link";
import { UnitLessonList } from "@/components/lessons/unit-lesson-list";
import { CURRICULUM_UNITS, getLessonsForUnit } from "@/lib/curriculum/registry";
import type { CurriculumUnitId } from "@/lib/curriculum/types";

const UNIT_GUIDANCE: Record<CurriculumUnitId, { intro: string; keys: string; change: string; mistakes: string[]; plan: string[] }> = {
  "home-row": {
    intro: "Home row is the resting place for touch typing. These lessons begin with the raised F and J anchors, then add one mirrored finger pair at a time before asking for words.",
    keys: "Left pinky A; left ring S; left middle D; left index F and G. Right index J and H; right middle K; right ring L; right pinky semicolon. Either thumb may press Space.",
    change: "This first unit establishes the position every later reach returns to. The early patterns are intentionally small because only the introduced keys are valid.",
    mistakes: ["Looking down after every key instead of finding F and J by touch.", "Letting the index fingers drift away from their anchors after G or H.", "Pressing Space with a finger that should stay over a letter key."],
    plan: ["Begin slowly enough to notice where each finger returns.", "Aim for 95% accuracy before increasing your pace.", "Use ASDF JKL practice when one side feels less steady than the other."],
  },
  "top-row": {
    intro: "Top-row lessons keep the hands based on home row while each finger reaches upward. The pairs are introduced by finger responsibility, not by spelling the keyboard row from left to right.",
    keys: "Left pinky Q; left ring W; left middle E; left index R and T. Right index Y and U; right middle I; right ring O; right pinky P.",
    change: "You now leave home row for each letter and return immediately. Home-row keys remain available, so the exercises can move from short reaches into real words.",
    mistakes: ["Moving the whole hand upward instead of extending one finger.", "Using the left index for Y or the right index for T.", "Holding tension in the reaching finger after it returns home."],
    plan: ["Pause briefly after each new top-row reach and confirm the home position.", "Keep accuracy stable when words become longer.", "Use QWERTYUIOP practice for extra row-focused repetition."],
  },
  "bottom-row": {
    intro: "Bottom-row practice adds downward reaches for letters and the comma, period, and slash keys. The goal is a small finger movement followed by a clean return to home row.",
    keys: "Left pinky Z; left ring X; left middle C; left index V and B. Right index N and M; right middle comma; right ring period; right pinky slash.",
    change: "All top- and home-row letters remain available while bottom-row pairs are added. By the end of this unit, every alphabet letter has an assigned finger.",
    mistakes: ["Collapsing the wrist downward to reach the bottom row.", "Using the wrong index finger for B or N.", "Treating comma and period as pauses in hand position instead of normal key reaches."],
    plan: ["Make each downward reach light and return before typing the next key.", "Slow down when B, N, C, or M begins to cause substitutions.", "Use ZXCVBNM practice to isolate the row before returning to mixed words."],
  },
  "full-keyboard": {
    intro: "Full-keyboard lessons turn the row skills into useful word and sentence practice. They emphasize common words, hand alternation, and awkward combinations without adding new letter keys.",
    keys: "Use the established QWERTY finger map for all three letter rows. Space remains a thumb key; comma, period, semicolon, and slash keep their bottom- or home-row finger assignments.",
    change: "The focus shifts from learning individual reaches to keeping accuracy consistent across words and sentences. Passage rhythm matters, but it does not replace correct fingering.",
    mistakes: ["Rushing familiar words and creating avoidable errors.", "Letting one hand do work assigned to the other near the keyboard centre.", "Chasing a WPM number while accuracy is falling."],
    plan: ["Read a few words ahead while typing the current word.", "Treat difficult combinations as a reason to slow down, not skip ahead.", "Use common-word and hand-specific practice to reinforce any weak pattern."],
  },
  "capitals-punctuation": {
    intro: "This unit adds opposite-hand Shift and sentence punctuation. The exercises stay short enough to concentrate on coordinating two keys without losing the home position.",
    keys: "Use the Shift key opposite the hand typing the capital. Right pinky handles apostrophe, quotation mark, colon, semicolon, slash, and question mark; left pinky reaches exclamation mark with Shift+1.",
    change: "Letter placement is already known. The new work is coordinating Shift, punctuation, and the next character while maintaining a calm rhythm.",
    mistakes: ["Using the same hand for Shift and the capital letter.", "Holding Shift through the next lowercase character.", "Adding punctuation from memory before reading the exact passage."],
    plan: ["Practise capital pairs slowly with the opposite Shift key.", "Release Shift fully before the next lowercase letter.", "Use quote practice for natural punctuation after the lesson drills feel controlled."],
  },
  "numbers-symbols": {
    intro: "Number-row lessons introduce 1 through 0 by finger zone, then apply them to practical values. They cover the main keyboard row; numpad technique is a separate future concern.",
    keys: "1 left pinky; 2 left ring; 3 left middle; 4 and 5 left index. 6 and 7 right index; 8 right middle; 9 right ring; 0, hyphen, and equals right pinky. Shift produces the practised symbols.",
    change: "The fingers reach farther than they do for letters, and Shift may be needed for symbols. The hand should still return to its letter-row home position after each reach.",
    mistakes: ["Leaving the hands parked on the number row after a value.", "Guessing a shifted symbol without checking the expected character.", "Assuming number-row practice is the same as dedicated numpad data entry."],
    plan: ["Learn 1–5 and 6–0 as separate zones before mixing them.", "Type practical values exactly, including punctuation and symbols.", "Use numbers-and-symbols practice for extra repetition without changing lesson stars."],
  },
};

export function CurriculumUnitPage({ unitId }: { unitId: CurriculumUnitId }) {
  const unit = CURRICULUM_UNITS.find((entry) => entry.id === unitId)!;
  const lessons = getLessonsForUnit(unitId);
  const guidance = UNIT_GUIDANCE[unitId];
  const previous = CURRICULUM_UNITS[unit.sequence - 2] ?? null;
  const next = CURRICULUM_UNITS[unit.sequence] ?? null;

  return (
    <>
      <section className="section-pad pb-10"><div className="page-shell max-w-4xl"><p className="eyebrow">Skill hub</p><h1 className="heading-lg mt-2">{unit.title} typing lessons</h1><p className="body-lg mt-4">{guidance.intro}</p><p className="mt-4 leading-7 text-camp-muted">These related lessons appear at the levels where the skill is introduced or reinforced. This page is a skill guide, not a separate linear unit.</p></div></section>
      <section className="pb-16"><div className="page-shell"><UnitLessonList lessons={lessons} /></div></section>
      <section className="bg-camp-paper py-14 sm:py-16"><div className="page-shell grid gap-12 lg:grid-cols-2">
        <div><p className="eyebrow">Keys and fingers</p><h2 className="heading-md mt-2">Keep every key tied to one responsibility</h2><p className="mt-4 leading-7 text-camp-muted">{guidance.keys}</p></div>
        <div><p className="eyebrow">What changes</p><h2 className="heading-md mt-2">The new skill in this unit</h2><p className="mt-4 leading-7 text-camp-muted">{guidance.change}</p></div>
      </div></section>
      <section className="section-pad"><div className="page-shell grid gap-12 lg:grid-cols-2">
        <div><p className="eyebrow">Common mistakes</p><h2 className="heading-md mt-2">Notice these before they become habits</h2><ul className="mt-5 grid gap-3">{guidance.mistakes.map((item) => <li key={item} className="bg-camp-tan/45 px-5 py-4 font-bold leading-6 text-camp-muted">{item}</li>)}</ul></div>
        <div><p className="eyebrow">Practice plan</p><h2 className="heading-md mt-2">Accuracy-first repetition</h2><ol className="mt-5 grid gap-3">{guidance.plan.map((item, index) => <li key={item} className="flex gap-4 bg-camp-tan/45 px-5 py-4 font-bold leading-6 text-camp-muted"><span className="font-black text-camp-coral">{index + 1}</span>{item}</li>)}</ol></div>
      </div></section>
      <section className="bg-camp-tan/45 py-12"><div className="page-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Reinforce this unit</p><h2 className="heading-md mt-2">Practise without changing lesson stars</h2></div><Link className="button-primary" href={unit.practiceRoute}>Open {unit.shortTitle.toLowerCase()} practice</Link></div></section>
      <nav className="section-pad py-10" aria-label="Lesson units"><div className="page-shell flex flex-wrap justify-between gap-5">{previous ? <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={previous.route}>← {previous.title}</Link> : <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4" href="/lessons">← All lessons</Link>}{next ? <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={next.route}>{next.title} →</Link> : <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4" href="/typing-practice">Focused practice →</Link>}</div></nav>
    </>
  );
}
