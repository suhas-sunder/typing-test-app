import { getFingerAssignments } from "@/lib/curriculum/finger-map";
import { LESSON_ACCURACY_THRESHOLDS } from "@/lib/curriculum/stars";
import type {
  CurriculumLesson,
  CurriculumLevel,
  CurriculumLevelId,
  CurriculumUnit,
  CurriculumUnitId,
  LessonStage,
  LessonStageType,
} from "@/lib/curriculum/types";

export const CURRICULUM_LEVELS: CurriculumLevel[] = [
  { id: "beginner", sequence: 1, title: "Beginner Foundations", summary: "Learn a calm home position, introduce every letter, and finish with a full-alphabet assessment." },
  { id: "intermediate", sequence: 2, title: "Intermediate Fluency", summary: "Turn individual reaches into common words, pairs, punctuation, sentences, and short paragraphs." },
  { id: "advanced", sequence: 3, title: "Advanced Application", summary: "Add numbers and symbols, strengthen accuracy under pressure, and type practical longer material." },
];

/**
 * These six entries are skill hubs, not six sequential curriculum units. A lesson
 * may appear in more than one hub through skillTags while retaining one canonical URL.
 */
export const CURRICULUM_UNITS: CurriculumUnit[] = [
  { id: "home-row", sequence: 1, title: "Home Row", shortTitle: "Home row", summary: "Find the home position, build ASDF JKL control, and revisit home-row rhythm across all three levels.", route: "/lessons/home-row", practiceRoute: "/typing-practice/asdf-jkl", indexable: true },
  { id: "top-row", sequence: 2, title: "Top Row", shortTitle: "Top row", summary: "Reach QWERTYUIOP from the home position, then apply those reaches in words and fluent patterns.", route: "/lessons/top-row", practiceRoute: "/typing-practice/qwertyuiop", indexable: true },
  { id: "bottom-row", sequence: 3, title: "Bottom Row", shortTitle: "Bottom row", summary: "Add ZXCVBNM, comma, period, and slash without losing a stable home position.", route: "/lessons/bottom-row", practiceRoute: "/typing-practice/zxcvbnm", indexable: true },
  { id: "full-keyboard", sequence: 4, title: "Full Keyboard", shortTitle: "Full keyboard", summary: "Combine keyboard rows in common words, balanced hand patterns, sentences, paragraphs, and assessments.", route: "/lessons/full-keyboard", practiceRoute: "/typing-practice/common-words", indexable: true },
  { id: "capitals-punctuation", sequence: 5, title: "Capitals and Punctuation", shortTitle: "Capitals & punctuation", summary: "Coordinate opposite-hand Shift and type punctuation in natural phrases, sentences, and practical text.", route: "/lessons/capitals-punctuation", practiceRoute: "/typing-practice/quotes", indexable: true },
  { id: "numbers-symbols", sequence: 6, title: "Numbers and Symbols", shortTitle: "Numbers & symbols", summary: "Reach the number row and type symbols, values, brackets, slashes, and mixed practical content.", route: "/lessons/numbers-symbols", practiceRoute: "/typing-practice/numbers-symbols", indexable: true },
];

type LessonSeed = {
  id: string;
  levelId: CurriculumLevelId;
  title: string;
  objective: string;
  introducedKeys: string[];
  unitId: CurriculumUnitId;
  skillTags: CurriculumUnitId[];
  milestoneTags?: CurriculumUnitId[];
  standardWpm: number;
  masteryWpm: number;
  practice: [string, string, string, string];
  kind?: "normal" | "review" | "assessment";
  adaptiveSource?: CurriculumLesson["adaptiveSource"];
};

const seeds: LessonSeed[] = [
  { id: "beginner-posture-home-position", levelId: "beginner", title: "Posture and Home Position", objective: "Set a relaxed posture and return both index fingers to the raised F and J anchors.", introducedKeys: ["f", "j", " "], unitId: "home-row", skillTags: ["home-row"], standardWpm: 5, masteryWpm: 9, practice: ["f j f j   j f j f", "ff jj fj jf fj jf", "fj jf ff jj jf fj", "find f and j then rest"] },
  { id: "beginner-f-j-space", levelId: "beginner", title: "F, J, and Space", objective: "Type F and J with the index fingers and use a thumb for Space.", introducedKeys: ["f", "j", " "], unitId: "home-row", skillTags: ["home-row"], milestoneTags: ["home-row"], standardWpm: 6, masteryWpm: 10, practice: ["ff jj ff jj", "fj jf fj jf", "f j jf fj j f", "fj fj jf jf fj"] },
  { id: "beginner-u-r-k", levelId: "beginner", title: "Add U, R, and K", objective: "Reach U and R with the index fingers and K with the right middle finger.", introducedKeys: ["u", "r", "k"], unitId: "top-row", skillTags: ["home-row", "top-row"], standardWpm: 7, masteryWpm: 11, practice: ["ju fr jk ku", "fur kurk ruff", "fur fur kirk ruff", "fur rugs rub fur"] },
  { id: "beginner-d-e-i", levelId: "beginner", title: "Add D, E, and I", objective: "Use the middle fingers for D, E, K, and I while returning home after each reach.", introducedKeys: ["d", "e", "i"], unitId: "top-row", skillTags: ["home-row", "top-row"], standardWpm: 8, masteryWpm: 12, practice: ["de ki ed ik", "ride fire dire kid", "red deer ride free", "ride free like a kid"] },
  { id: "beginner-c-g-n", levelId: "beginner", title: "Add C, G, and N", objective: "Reach C downward and G and N inward without moving the wrists.", introducedKeys: ["c", "g", "n"], unitId: "bottom-row", skillTags: ["home-row", "bottom-row"], standardWpm: 8, masteryWpm: 13, practice: ["dc fg jn cd", "can gain ring", "green crane grin", "a green crane can grin"] },
  { id: "beginner-review-one", levelId: "beginner", title: "Foundation Review One", objective: "Review the first group of keys in varied patterns, words, and short phrases.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["home-row", "top-row", "bottom-row", "full-keyboard"], standardWpm: 9, masteryWpm: 14, kind: "review", practice: ["fj urk dei cgn", "red green fur kid", "a red kid can grin", "find a green rug and ride"] },
  { id: "beginner-t-s-l", levelId: "beginner", title: "Add T, S, and L", objective: "Use the ring fingers for S and L and the left index for T.", introducedKeys: ["t", "s", "l"], unitId: "top-row", skillTags: ["home-row", "top-row"], standardWpm: 9, masteryWpm: 14, practice: ["fs jl ft st", "still list trail", "a little trail is still", "rest fingers after each trail"] },
  { id: "beginner-o-b-a", levelId: "beginner", title: "Add O, B, and A", objective: "Reach O and A with the ring and pinky fingers and B with the left index.", introducedKeys: ["o", "b", "a"], unitId: "top-row", skillTags: ["home-row", "top-row", "bottom-row"], standardWpm: 10, masteryWpm: 15, practice: ["lo fa fb ob", "boat road bold", "a bold boat floats", "a boat floats along a road"] },
  { id: "beginner-v-h-m", levelId: "beginner", title: "Add V, H, and M", objective: "Reach V, H, and M with the index fingers while keeping the hand position quiet.", introducedKeys: ["v", "h", "m"], unitId: "bottom-row", skillTags: ["home-row", "bottom-row"], standardWpm: 10, masteryWpm: 16, practice: ["fv jh jm mh", "move home have", "move home with calm", "have a calm move home"] },
  { id: "beginner-period-comma", levelId: "beginner", title: "Period and Comma", objective: "Add period and comma as normal bottom-row reaches in short phrases.", introducedKeys: [".", ","], unitId: "bottom-row", skillTags: ["bottom-row", "capitals-punctuation"], standardWpm: 10, masteryWpm: 16, practice: ["k, l. ,k .l", "slow, calm. rest.", "move slowly, then rest.", "a calm hand moves, then rests."] },
  { id: "beginner-review-two", levelId: "beginner", title: "Foundation Review Two", objective: "Mix all learned keys while maintaining an even, accuracy-first rhythm.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["home-row", "top-row", "bottom-row", "full-keyboard"], standardWpm: 11, masteryWpm: 17, kind: "review", practice: ["trail boat move, rest.", "a calm hand moves slowly.", "find the road, then travel.", "little habits build a solid rhythm."] },
  { id: "beginner-w-x-semicolon", levelId: "beginner", title: "Add W, X, and Semicolon", objective: "Reach W, X, and semicolon with their home-row fingers.", introducedKeys: ["w", "x", ";"], unitId: "top-row", skillTags: ["home-row", "top-row", "bottom-row", "capitals-punctuation"], standardWpm: 11, masteryWpm: 17, practice: ["sw sx l; ws", "wax; slow; mix;", "mix wax; slow down;", "we mix wax; then we rest;"] },
  { id: "beginner-q-y-p", levelId: "beginner", title: "Add Q, Y, and P", objective: "Use the pinkies for Q and P and the right index for Y.", introducedKeys: ["q", "y", "p"], unitId: "top-row", skillTags: ["top-row"], standardWpm: 11, masteryWpm: 18, practice: ["aq jy ;p qa", "play quiet happy", "play a quiet melody", "type quietly and stay happy"] },
  { id: "beginner-z-slash-enter", levelId: "beginner", title: "Add Z, Slash, and Enter", objective: "Complete the letter rows with Z and slash and practise a deliberate Enter action.", introducedKeys: ["z", "/", "Enter"], unitId: "bottom-row", skillTags: ["bottom-row", "capitals-punctuation"], standardWpm: 11, masteryWpm: 18, practice: ["az ;/ za /;", "quiz/maze size/zero", "a quick quiz/maze", "finish the line, then press enter"] },
  { id: "beginner-alphabet-integration", levelId: "beginner", title: "Alphabet Integration", objective: "Combine every letter row in useful words and complete sentences.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["home-row", "top-row", "bottom-row", "full-keyboard"], standardWpm: 13, masteryWpm: 20, practice: ["quick brown fox jumps", "pack my box with five dozen jugs.", "every letter now has a home finger.", "a balanced rhythm keeps every reach controlled."] },
  { id: "beginner-personalized-review", levelId: "beginner", title: "Personalized Review", objective: "Revisit up to two locally identified weak keys, or use a balanced fallback review.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["home-row", "top-row", "bottom-row", "full-keyboard"], standardWpm: 13, masteryWpm: 20, kind: "review", adaptiveSource: "persistent-weak-keys", practice: ["calm fingers find every row.", "repeat difficult reaches with care.", "weak keys improve through clean repetition.", "slow down, return home, and try again."] },
  { id: "beginner-assessment", levelId: "beginner", title: "Beginner Assessment", objective: "Demonstrate accurate control of the complete alphabet and basic punctuation.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["home-row", "top-row", "bottom-row", "full-keyboard", "capitals-punctuation"], milestoneTags: ["home-row", "top-row", "bottom-row", "full-keyboard"], standardWpm: 15, masteryWpm: 23, kind: "assessment", practice: ["the quick brown fox jumps over a lazy dog.", "five quiet campers pack every box with care.", "accuracy builds the rhythm that speed can follow.", "type the final passage calmly, then review your result."] },

  { id: "intermediate-common-words-one", levelId: "intermediate", title: "Common Words One", objective: "Build automatic control of frequent English words without rushing.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard"], standardWpm: 18, masteryWpm: 27, practice: ["the of and to in is you that", "with on as are this be at by", "the words become familiar with clean practice.", "type each common word before looking ahead."] },
  { id: "intermediate-common-words-two", levelId: "intermediate", title: "Common Words Two", objective: "Extend the frequent-word set with distinct, useful material.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard"], standardWpm: 19, masteryWpm: 28, practice: ["have not but what all were when can", "said there use each which she how their", "each familiar word supports a steady sentence.", "keep the common words controlled and clear."] },
  { id: "intermediate-home-row-words", levelId: "intermediate", title: "Home-Row Words", objective: "Strengthen rhythm using words concentrated on the home row.", introducedKeys: [], unitId: "home-row", skillTags: ["home-row", "full-keyboard"], milestoneTags: ["home-row"], standardWpm: 20, masteryWpm: 30, practice: ["add all ask fall glad glass", "a glad lass had a salad", "all flags fall; a lad asks;", "home row control supports every other reach."] },
  { id: "intermediate-top-row-words", levelId: "intermediate", title: "Top-Row Words", objective: "Strengthen upward reaches through varied words and phrases.", introducedKeys: [], unitId: "top-row", skillTags: ["top-row", "full-keyboard"], milestoneTags: ["top-row"], standardWpm: 20, masteryWpm: 30, practice: ["write quiet power route pretty type", "the writer will prepare a short story.", "keep your eyes up while the words flow.", "top row reaches return cleanly to home."] },
  { id: "intermediate-bottom-row-words", levelId: "intermediate", title: "Bottom-Row Words", objective: "Strengthen downward reaches without collapsing the wrists.", introducedKeys: [], unitId: "bottom-row", skillTags: ["bottom-row", "full-keyboard"], milestoneTags: ["bottom-row"], standardWpm: 20, masteryWpm: 30, practice: ["calm move next zone begin balance", "make every downward reach controlled.", "a balanced typist returns home after each reach.", "bottom row accuracy grows with a light touch."] },
  { id: "intermediate-alternating-hands", levelId: "intermediate", title: "Alternating Hands", objective: "Build an even left-right rhythm across useful words.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard"], standardWpm: 21, masteryWpm: 31, practice: ["garden planet market water quiet", "both hands share the work evenly.", "a light rhythm lets each hand wait its turn.", "alternate without forcing the pace."] },
  { id: "intermediate-common-pairs-one", levelId: "intermediate", title: "Common Pairs One", objective: "Practise common letter pairs that appear across everyday words.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard"], standardWpm: 21, masteryWpm: 32, practice: ["th he in er an re", "the then there other", "common pairs connect into fluent words.", "keep each pair clean before building speed."] },
  { id: "intermediate-common-pairs-two", levelId: "intermediate", title: "Common Pairs Two", objective: "Extend pair fluency with a new set of useful transitions.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard"], standardWpm: 22, masteryWpm: 33, practice: ["on at en nd ti es", "station listen inside", "new pairs need the same calm control.", "notice which hand transition needs more care."] },
  { id: "intermediate-word-patterns", levelId: "intermediate", title: "Word Patterns", objective: "Recognize recurring beginnings, endings, and internal patterns.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard"], standardWpm: 22, masteryWpm: 33, practice: ["ing tion ment able", "reading working movement", "patterns make longer words easier to scan.", "type the whole pattern without skipping letters."] },
  { id: "intermediate-shift-capitals", levelId: "intermediate", title: "Shift and Capitals", objective: "Coordinate each capital with the opposite-hand Shift key.", introducedKeys: ["Shift"], unitId: "capitals-punctuation", skillTags: ["capitals-punctuation"], milestoneTags: ["capitals-punctuation"], standardWpm: 18, masteryWpm: 27, practice: ["Anna Ben Cara Drew", "Maya and Liam type calmly.", "Use the opposite Shift key for each capital.", "Release Shift before the next lowercase letter."] },
  { id: "intermediate-apostrophes-quotes", levelId: "intermediate", title: "Apostrophes and Quotes", objective: "Type apostrophes and quotation marks while maintaining the home position.", introducedKeys: ["'", "\""], unitId: "capitals-punctuation", skillTags: ["capitals-punctuation"], milestoneTags: ["capitals-punctuation"], standardWpm: 19, masteryWpm: 28, practice: ["don't can't we're it's", "\"Accuracy first,\" said Ben.", "Maya said, \"Keep a calm rhythm.\"", "Don't rush quoted words or contractions."] },
  { id: "intermediate-sentence-punctuation", levelId: "intermediate", title: "Sentence Punctuation", objective: "Use commas, periods, question marks, exclamation marks, colons, and semicolons.", introducedKeys: ["?", "!", ":"], unitId: "capitals-punctuation", skillTags: ["capitals-punctuation"], milestoneTags: ["capitals-punctuation"], standardWpm: 20, masteryWpm: 30, practice: ["Ready? Begin slowly; keep going!", "Remember: accuracy comes first.", "Can you stay relaxed? Yes, you can!", "Read the mark, type it, and continue calmly."] },
  { id: "intermediate-extended-punctuation", levelId: "intermediate", title: "Extended Punctuation", objective: "Coordinate punctuation combinations in realistic sentences.", introducedKeys: [], unitId: "capitals-punctuation", skillTags: ["capitals-punctuation"], milestoneTags: ["capitals-punctuation"], standardWpm: 21, masteryWpm: 31, practice: ["Wait... is that correct?", "\"Yes,\" she said; \"check again.\"", "Plan, type, review: then continue.", "Punctuation shapes meaning, rhythm, and tone."] },
  { id: "intermediate-sentence-rhythm", levelId: "intermediate", title: "Sentence Rhythm", objective: "Maintain accuracy through natural changes in sentence length and punctuation.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard", "capitals-punctuation"], standardWpm: 23, masteryWpm: 34, practice: ["Short sentences feel quick. Longer ones require a calm, even pace.", "Read ahead, but keep attention on the current word.", "A pause in meaning does not require tension in your hands.", "Let punctuation guide reading without interrupting control."] },
  { id: "intermediate-short-paragraphs", levelId: "intermediate", title: "Short Paragraphs", objective: "Sustain controlled typing across connected sentences.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard", "capitals-punctuation"], standardWpm: 23, masteryWpm: 35, practice: ["A short paragraph asks you to hold a steady rhythm. Keep your eyes on the next few words while your fingers finish the current one.", "Good posture supports longer practice. Relax your shoulders, keep the wrists quiet, and return to home position after each reach.", "Accuracy makes later speed reliable. If errors increase, slow down until the pattern feels controlled again.", "Finish the paragraph cleanly, then notice which transitions deserve another try."] },
  { id: "intermediate-accuracy-control", levelId: "intermediate", title: "Accuracy Control", objective: "Choose controlled accuracy over an unsustainable burst of speed.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard"], standardWpm: 24, masteryWpm: 36, practice: ["precise rhythm rewards patient hands", "slow enough to stay accurate, quick enough to stay smooth", "controlled improvement matters more than one rushed score.", "maintain clean keystrokes from the first word to the last."] },
  { id: "intermediate-assessment", levelId: "intermediate", title: "Intermediate Assessment", objective: "Demonstrate word, pair, punctuation, and paragraph fluency.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["home-row", "top-row", "bottom-row", "full-keyboard", "capitals-punctuation"], standardWpm: 25, masteryWpm: 38, kind: "assessment", practice: ["Common words should feel familiar, but every character still deserves attention.", "\"Accuracy builds speed,\" the instructor said; the class kept a calm rhythm.", "Alternating hands can make a sentence flow when neither hand rushes ahead.", "Complete this assessment with controlled punctuation, consistent spacing, and clear focus."] },

  { id: "advanced-numbers-one-five", levelId: "advanced", title: "Numbers One to Five", objective: "Reach 1 through 5 from the left side of the number row.", introducedKeys: ["1", "2", "3", "4", "5"], unitId: "numbers-symbols", skillTags: ["numbers-symbols"], milestoneTags: ["numbers-symbols"], standardWpm: 14, masteryWpm: 22, practice: ["1 2 3 4 5 15 24 31", "Page 2, row 4, item 5.", "Type 15 items in 3 short sets.", "Return to the home row after every number."] },
  { id: "advanced-numbers-six-zero", levelId: "advanced", title: "Numbers Six to Zero", objective: "Reach 6 through 0 from the right side of the number row.", introducedKeys: ["6", "7", "8", "9", "0"], unitId: "numbers-symbols", skillTags: ["numbers-symbols"], milestoneTags: ["numbers-symbols"], standardWpm: 14, masteryWpm: 22, practice: ["6 7 8 9 0 60 78 90", "Room 8, row 7, item 9.", "Type 10 numbers, pause, then type 10 more.", "Keep the right-hand reaches light and exact."] },
  { id: "advanced-numbers-and-letters", levelId: "advanced", title: "Numbers and Letters", objective: "Switch cleanly between the number row and alphabet rows.", introducedKeys: [], unitId: "numbers-symbols", skillTags: ["numbers-symbols", "full-keyboard"], milestoneTags: ["numbers-symbols"], standardWpm: 16, masteryWpm: 24, practice: ["camp4 trail7 row2 tent9", "Lesson 12 begins in Room 6.", "Pack 3 maps and 2 pencils for Camp 8.", "Mixed labels require accurate row changes."] },
  { id: "advanced-shifted-symbols", levelId: "advanced", title: "Shifted Symbols", objective: "Use Shift with number-row symbols in controlled patterns.", introducedKeys: ["@", "#", "$", "%", "^", "&", "*", "(", ")"], unitId: "numbers-symbols", skillTags: ["numbers-symbols", "capitals-punctuation"], milestoneTags: ["numbers-symbols"], standardWpm: 15, masteryWpm: 23, practice: ["@ # $ % ^ & * ( )", "$5 10% A&B (3*2)", "Email@Camp costs $25 (with 5% tax).", "Use ^ and * carefully; release Shift before letters."] },
  { id: "advanced-practical-values", levelId: "advanced", title: "Practical Values", objective: "Type dates, times, money, decimals, percentages, and simple equations.", introducedKeys: ["-", "=", "+"], unitId: "numbers-symbols", skillTags: ["numbers-symbols"], milestoneTags: ["numbers-symbols"], standardWpm: 17, masteryWpm: 26, practice: ["9:30 $12.50 25% 8-4 6=6 5+5", "Meet at 9:30 on 7-18-2026.", "The total is $12.50; add 5% tax.", "Record each value exactly as it appears."] },
  { id: "advanced-brackets-slashes-hyphens", levelId: "advanced", title: "Brackets, Slashes, and Hyphens", objective: "Type common structural symbols in practical text.", introducedKeys: ["[", "]", "\\", "_"], unitId: "numbers-symbols", skillTags: ["numbers-symbols", "capitals-punctuation"], milestoneTags: ["numbers-symbols"], standardWpm: 17, masteryWpm: 26, practice: ["[ ] / \\ - _", "folder/sub-folder file_name", "Use [draft] for the 2026-07 report.", "Type paths and labels without adding spaces."] },
  { id: "advanced-accuracy-focus", levelId: "advanced", title: "Advanced Accuracy Focus", objective: "Apply full-keyboard control to deliberately difficult transitions.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard", "capitals-punctuation", "numbers-symbols"], standardWpm: 27, masteryWpm: 40, adaptiveSource: "persistent-weak-keys", practice: ["minimum rhythm public quiz zebra", "Exact values, awkward pairs, and punctuation require patience.", "Slow down before a difficult transition instead of correcting it later.", "Advanced control means accuracy remains stable when the text becomes complex."] },
  { id: "advanced-speed-intervals", levelId: "advanced", title: "Controlled Speed Intervals", objective: "Build short speed intervals without allowing accuracy to collapse.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard"], standardWpm: 30, masteryWpm: 44, practice: ["steady pace clean words light hands", "build speed on a foundation of accuracy", "A short interval rewards rhythm, not frantic input.", "Finish the interval as cleanly as you began it."] },
  { id: "advanced-long-paragraphs", levelId: "advanced", title: "Long Paragraphs", objective: "Sustain posture, focus, and accuracy through longer connected material.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard", "capitals-punctuation"], standardWpm: 29, masteryWpm: 43, practice: ["Longer passages reveal whether a typing rhythm is truly sustainable. Keep the shoulders relaxed and let each finger return to its familiar position before the next reach.", "Reading slightly ahead can help the sentence flow, but accuracy still depends on the character under attention. When a difficult word appears, reduce speed briefly and preserve control.", "A reliable typist does not need to force every section to the same pace. Clear punctuation, unusual words, and mixed values may each call for a small adjustment.", "Complete the paragraph with the same calm technique used at the beginning. Consistency across the whole attempt matters more than one fast line."] },
  { id: "advanced-practical-typing", levelId: "advanced", title: "Practical Typing", objective: "Type realistic notes, schedules, values, and instructions accurately.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["full-keyboard", "capitals-punctuation", "numbers-symbols"], standardWpm: 28, masteryWpm: 42, practice: ["Meeting: July 18, 2026, at 9:30 a.m.", "Bring 2 notebooks, 1 pencil, and the [draft] report.", "Save the file as camp_notes-07.txt in the shared folder.", "Please confirm the $12.50 total before 5:00 p.m."] },
  { id: "advanced-final-assessment", levelId: "advanced", title: "Final Assessment", objective: "Demonstrate controlled accuracy across letters, punctuation, numbers, symbols, and sustained text.", introducedKeys: [], unitId: "full-keyboard", skillTags: ["home-row", "top-row", "bottom-row", "full-keyboard", "capitals-punctuation", "numbers-symbols"], milestoneTags: ["capitals-punctuation", "numbers-symbols"], standardWpm: 30, masteryWpm: 45, kind: "assessment", adaptiveSource: null, practice: ["Accuracy first: type 3 clean lines, then check the $24.50 total.", "\"Controlled speed lasts,\" Maya said; \"rushed speed does not.\"", "File [final]/camp_report-2026.txt before 5:30 p.m.", "Complete the final assessment with calm hands, readable rhythm, and exact punctuation."] },
];

const stageTypes: LessonStageType[] = ["anchor", "key-isolation", "pair-practice", "word-practice", "sentence-practice"];

function makeStages(seed: LessonSeed): LessonStage[] {
  const typed = seed.practice.map((text, index) => ({
    id: `stage-${index + 2}`,
    title: ["Find the pattern", "Build control", "Use the skill", "Finish cleanly"][index],
    text,
    type: seed.kind === "assessment" ? "assessment" as const : stageTypes[index + 1],
    required: true,
    ...(seed.id === "advanced-speed-intervals" && index === 3 ? { timedSeconds: 30 } : {}),
  }));
  const stages: LessonStage[] = [
    { id: "stage-1", title: "Technique", text: seed.objective, type: "instruction", required: true },
    ...typed,
  ];
  if (seed.kind === "review") {
    stages.push(
      { id: "stage-6", title: "Mixed review", text: `${seed.practice[1]} ${seed.practice[2]}`, type: "phrase-practice", required: true },
      { id: "stage-7", title: "Accuracy check", text: `${seed.practice[3]} ${seed.practice[0]}`, type: "accuracy-challenge", required: true },
    );
  } else if (seed.kind !== "assessment") {
    stages.push({ id: "stage-6", title: "Accuracy check", text: `${seed.practice[3]} ${seed.practice[1]}`, type: "accuracy-challenge", required: true });
  }
  return stages;
}

export const CURRICULUM_LESSONS: CurriculumLesson[] = seeds.map((seed, index) => {
  const stages = makeStages(seed);
  const typedText = stages.filter((stage) => stage.type !== "instruction").map((stage) => stage.text).join("");
  return {
    ...seed,
    sequence: index + 1,
    allowedCharacters: [...new Set(typedText)],
    fingerAssignments: getFingerAssignments(seed.introducedKeys),
    prerequisiteIds: index === 0 ? [] : [seeds[index - 1].id],
    stages,
    accuracyThresholds: LESSON_ACCURACY_THRESHOLDS,
    supportingPracticeIds: seed.skillTags.map((tag) => CURRICULUM_UNITS.find((unit) => unit.id === tag)?.practiceRoute.split("/").pop() ?? tag),
    milestoneTags: seed.milestoneTags ?? [],
    adaptiveSource: "adaptiveSource" in seed ? seed.adaptiveSource ?? null : "attempt",
    enabled: true,
    indexable: false,
    contentVersion: 2,
  };
});

export const ENABLED_CURRICULUM_LESSONS = CURRICULUM_LESSONS.filter((lesson) => lesson.enabled);

export function getCurriculumUnit(unitId: string) {
  return CURRICULUM_UNITS.find((unit) => unit.id === unitId) ?? null;
}

export function getCurriculumLevel(levelId: string) {
  return CURRICULUM_LEVELS.find((level) => level.id === levelId) ?? null;
}

export function getCurriculumLesson(lessonId: string) {
  return ENABLED_CURRICULUM_LESSONS.find((lesson) => lesson.id === lessonId) ?? null;
}

export function getLessonsForUnit(unitId: CurriculumUnitId) {
  return ENABLED_CURRICULUM_LESSONS.filter((lesson) => lesson.skillTags.includes(unitId));
}

export function getLessonsForLevel(levelId: CurriculumLevelId) {
  return ENABLED_CURRICULUM_LESSONS.filter((lesson) => lesson.levelId === levelId);
}

export function getLessonsForMilestone(tag: CurriculumUnitId) {
  return ENABLED_CURRICULUM_LESSONS.filter((lesson) => lesson.milestoneTags.includes(tag));
}

export function getNextCurriculumLesson(lessonId: string) {
  const index = ENABLED_CURRICULUM_LESSONS.findIndex((lesson) => lesson.id === lessonId);
  return index >= 0 ? ENABLED_CURRICULUM_LESSONS[index + 1] ?? null : null;
}

export function getLessonHref(lesson: Pick<CurriculumLesson, "id" | "unitId">) {
  return `/lessons/lesson/${lesson.unitId}/lesson/${lesson.id}`;
}

export function resolveCurriculumLessonRoute(category: string, section: string, level: string) {
  const lesson = section === "lesson" ? getCurriculumLesson(level) : null;
  return lesson?.unitId === category ? lesson : null;
}
