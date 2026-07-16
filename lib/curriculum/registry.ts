import { getFingerAssignments } from "@/lib/curriculum/finger-map";
import { LESSON_ACCURACY_THRESHOLDS } from "@/lib/curriculum/stars";
import type { CurriculumLesson, CurriculumUnit, CurriculumUnitId, LessonStage } from "@/lib/curriculum/types";

export const CURRICULUM_UNITS: CurriculumUnit[] = [
  { id: "home-row", sequence: 1, title: "Home Row", shortTitle: "Home row", summary: "Build a reliable resting position and balanced rhythm on ASDF JKL;.", route: "/lessons/home-row", practiceRoute: "/typing-practice/asdf-jkl", indexable: true },
  { id: "top-row", sequence: 2, title: "Top Row", shortTitle: "Top row", summary: "Reach QWERTYUIOP while returning each finger to its home-row anchor.", route: "/lessons/top-row", practiceRoute: "/typing-practice/qwertyuiop", indexable: true },
  { id: "bottom-row", sequence: 3, title: "Bottom Row", shortTitle: "Bottom row", summary: "Add ZXCVBNM, comma, period, and slash without losing your home position.", route: "/lessons/bottom-row", practiceRoute: "/typing-practice/zxcvbnm", indexable: true },
  { id: "full-keyboard", sequence: 4, title: "Full Keyboard", shortTitle: "Full keyboard", summary: "Combine all letter rows in useful words, hand transitions, and sentences.", route: "/lessons/full-keyboard", practiceRoute: "/typing-practice/common-words", indexable: true },
  { id: "capitals-punctuation", sequence: 5, title: "Capitals and Punctuation", shortTitle: "Capitals & punctuation", summary: "Use opposite-hand Shift and add punctuation to natural sentences.", route: "/lessons/capitals-punctuation", practiceRoute: "/typing-practice/quotes", indexable: true },
  { id: "numbers-symbols", sequence: 6, title: "Numbers and Symbols", shortTitle: "Numbers & symbols", summary: "Reach the number row and type practical values with controlled accuracy.", route: "/lessons/numbers-symbols", practiceRoute: "/typing-practice/numbers-symbols", indexable: true },
];

type LessonDefinition = {
  id: string;
  unitId: CurriculumUnitId;
  sequence: number;
  title: string;
  objective: string;
  introducedKeys: string[];
  allowedCharacters: string;
  standardWpm: number;
  masteryWpm: number;
  practice: string[];
  stages: [string, string, string];
};

const HOME = "asdfghjkl; ";
const TOP_HOME = "qwertyuiopasdfghjkl; ";
const LETTERS = "abcdefghijklmnopqrstuvwxyz ";
const BASIC = `${LETTERS},./;`;
const CAPITALS = `${BASIC}${LETTERS.toUpperCase()}`;
const QUOTES = `${CAPITALS}'\"`;
const SENTENCE_PUNCTUATION = `${QUOTES}?!:`;
const DIGITS_ONE_FIVE = `${SENTENCE_PUNCTUATION}12345`;
const DIGITS = `${SENTENCE_PUNCTUATION}1234567890`;
const SYMBOLS = `${DIGITS}-+$%=()&`;

const definitions: LessonDefinition[] = [
  { id: "home-row-f-j", unitId: "home-row", sequence: 1, title: "Find F and J", objective: "Locate the raised F and J anchor keys and return the index fingers to them without looking down.", introducedKeys: ["f", "j"], allowedCharacters: "fj ", standardWpm: 8, masteryWpm: 14, practice: ["asdf-jkl"], stages: ["ff jj fj jf fj jf jj ff fj jf", "fj jf ff jj jf fj jj ff fj jf", "jf fj jj ff fj jf ff jj jf fj"] },
  { id: "home-row-d-k", unitId: "home-row", sequence: 2, title: "Add D and K", objective: "Reach D and K with the middle fingers, then return to the F and J anchors.", introducedKeys: ["d", "k"], allowedCharacters: "fjdk ", standardWpm: 9, masteryWpm: 15, practice: ["asdf-jkl"], stages: ["fd jk dk fj kj df fd jk dj kf", "df kj fd jk dk fj jf kd", "fdjk dkfj jfkd kjdf dfjk fjdk"] },
  { id: "home-row-s-l", unitId: "home-row", sequence: 3, title: "Add S and L", objective: "Use the ring fingers for S and L while keeping the other fingers settled.", introducedKeys: ["s", "l"], allowedCharacters: "fjdksl ", standardWpm: 10, masteryWpm: 16, practice: ["asdf-jkl"], stages: ["fs jl sl dk ls jf sd kl fj", "sd kl fs jl ds lk sf kj", "sdf jkl lkj fds dsl kjf"] },
  { id: "home-row-a-semicolon", unitId: "home-row", sequence: 4, title: "Add A and Semicolon", objective: "Use both pinkies for A and semicolon without shifting the hands away from home row.", introducedKeys: ["a", ";"], allowedCharacters: "asdfjkl; ", standardWpm: 10, masteryWpm: 16, practice: ["asdf-jkl"], stages: ["as l; sa ;l ad jk fa ;j", "a sad lad; a flask; ask;", "a lad asks; a lass adds; all fall;"] },
  { id: "home-row-g-h", unitId: "home-row", sequence: 5, title: "Reach G and H", objective: "Reach inward for G and H with the index fingers, then return to F and J.", introducedKeys: ["g", "h"], allowedCharacters: HOME, standardWpm: 12, masteryWpm: 18, practice: ["asdf-jkl"], stages: ["fg jh gh hg gf hj hag lag", "hash flash glass glad half", "a glad lad has a glass; a lass asks"] },
  { id: "home-row-combinations", unitId: "home-row", sequence: 6, title: "Balance Both Hands", objective: "Alternate between the left and right home-row fingers with controlled rhythm.", introducedKeys: [], allowedCharacters: HOME, standardWpm: 15, masteryWpm: 22, practice: ["asdf-jkl", "left-hand", "right-hand"], stages: ["fall hall dash lash flag slag", "a lass had a salad; a lad had a flask", "flash glass shall dash; glad falls"] },
  { id: "home-row-words", unitId: "home-row", sequence: 7, title: "Type Home-Row Words", objective: "Use valid words and short phrases made from the introduced home-row keys.", introducedKeys: [], allowedCharacters: HOME, standardWpm: 18, masteryWpm: 28, practice: ["asdf-jkl", "common-words"], stages: ["add all ask dad fall flag glad half hall", "a glad dad had a salad; a lass had a glass", "all flags fall; ask a lad; add half a glass"] },

  { id: "top-row-e-i", unitId: "top-row", sequence: 8, title: "Reach E and I", objective: "Reach E and I with the middle fingers and return smoothly to D and K.", introducedKeys: ["e", "i"], allowedCharacters: `${HOME}ei`, standardWpm: 12, masteryWpm: 18, practice: ["qwertyuiop"], stages: ["de ki ed ik die kid idle", "hide slide like field side", "a skilled kid likes a field; she hikes"] },
  { id: "top-row-r-u", unitId: "top-row", sequence: 9, title: "Reach R and U", objective: "Reach R and U with the index fingers while keeping the wrists quiet.", introducedKeys: ["r", "u"], allowedCharacters: `${HOME}eiru`, standardWpm: 12, masteryWpm: 18, practice: ["qwertyuiop"], stages: ["fr ju rf uj rude rule", "sure rush ride fire guide", "a rider guides a sure herd; rush less"] },
  { id: "top-row-w-o", unitId: "top-row", sequence: 10, title: "Reach W and O", objective: "Use the ring fingers for W and O, returning to S and L after every reach.", introducedKeys: ["w", "o"], allowedCharacters: `${HOME}eiruw o`, standardWpm: 13, masteryWpm: 20, practice: ["qwertyuiop"], stages: ["sw lo ws ol slow word", "row flow lower whole shore", "we row slow; our whole field will grow"] },
  { id: "top-row-q-p", unitId: "top-row", sequence: 11, title: "Reach Q and P", objective: "Reach Q and P with the pinkies without lifting the whole hand.", introducedKeys: ["q", "p"], allowedCharacters: `${HOME}eiruw oqp`, standardWpm: 13, masteryWpm: 20, practice: ["qwertyuiop"], stages: ["aq ;p qa p; pair paper", "press prior equip proper", "a pair will prepare our paper; equip a pupil"] },
  { id: "top-row-t-y", unitId: "top-row", sequence: 12, title: "Reach T and Y", objective: "Reach T and Y with the index fingers and complete the top row.", introducedKeys: ["t", "y"], allowedCharacters: TOP_HOME, standardWpm: 15, masteryWpm: 22, practice: ["qwertyuiop"], stages: ["ft jy tf yj type try", "quiet story pretty route", "type your story; try to keep a steady flow"] },
  { id: "top-row-words", unitId: "top-row", sequence: 13, title: "Top-Row Words", objective: "Combine the top and home rows in real words and short phrases.", introducedKeys: [], allowedCharacters: TOP_HOME, standardWpm: 20, masteryWpm: 30, practice: ["qwertyuiop", "common-words"], stages: ["there write quiet people story power", "the writer will prepare a short story", "write with a light style; keep your eyes up"] },

  { id: "bottom-row-c-comma", unitId: "bottom-row", sequence: 14, title: "Reach C and Comma", objective: "Reach C and comma with the middle fingers, then return to D and K.", introducedKeys: ["c", ","], allowedCharacters: `${TOP_HOME}c,`, standardWpm: 12, masteryWpm: 18, practice: ["zxcvbnm"], stages: ["dc k, cd ,k care rice", "quick, clear, correct, direct", "type with care, keep a clear, quiet pace"] },
  { id: "bottom-row-v-m", unitId: "bottom-row", sequence: 15, title: "Reach V and M", objective: "Reach V and M with the index fingers without sliding the hands downward.", introducedKeys: ["v", "m"], allowedCharacters: `${TOP_HOME}c,vm`, standardWpm: 12, masteryWpm: 18, practice: ["zxcvbnm"], stages: ["fv jm vf mj move calm", "move more, make every move calm", "a calm move may improve your rhythm"] },
  { id: "bottom-row-x-period", unitId: "bottom-row", sequence: 16, title: "Reach X and Period", objective: "Use the ring fingers for X and period while keeping the home-row anchors steady.", introducedKeys: ["x", "."], allowedCharacters: `${TOP_HOME}c,vmx.`, standardWpm: 13, masteryWpm: 20, practice: ["zxcvbnm"], stages: ["sx l. xs .l extra exact", "mix. relax. exact. extra.", "relax your wrists. make each move exact."] },
  { id: "bottom-row-z-slash", unitId: "bottom-row", sequence: 17, title: "Reach Z and Slash", objective: "Reach Z and slash with the pinkies and return without twisting the wrists.", introducedKeys: ["z", "/"], allowedCharacters: `${TOP_HOME}c,vmx.z/`, standardWpm: 13, masteryWpm: 20, practice: ["zxcvbnm"], stages: ["az ;/ za /; zero maze", "size/zero maze/quiz zip", "a quick quiz/maze may exercise each side"] },
  { id: "bottom-row-b-n", unitId: "bottom-row", sequence: 18, title: "Reach B and N", objective: "Use the index fingers for B and N to complete the alphabet rows.", introducedKeys: ["b", "n"], allowedCharacters: BASIC, standardWpm: 15, masteryWpm: 22, practice: ["zxcvbnm"], stages: ["fb jn bf nj begin number", "balance both hands, bend no wrist", "begin with a calm breath and balance each hand"] },
  { id: "bottom-row-words", unitId: "bottom-row", sequence: 19, title: "Bottom-Row Words", objective: "Combine the bottom row with all previously learned letters in real words and short phrases.", introducedKeys: [], allowedCharacters: BASIC, standardWpm: 20, masteryWpm: 30, practice: ["zxcvbnm", "common-words"], stages: ["calm move next zone begin balance", "make every reach controlled, then return home.", "a balanced typist moves smoothly across every row."] },

  { id: "full-keyboard-common-words-one", unitId: "full-keyboard", sequence: 20, title: "Common Words I", objective: "Practise a curated group of frequent English words using the complete alphabet.", introducedKeys: [], allowedCharacters: BASIC, standardWpm: 22, masteryWpm: 32, practice: ["common-words"], stages: ["the of and to in is you that it for", "with on as are this be at by from or", "type each common word cleanly, then move to the next."] },
  { id: "full-keyboard-common-words-two", unitId: "full-keyboard", sequence: 21, title: "Common Words II", objective: "Extend the common-word pool without repeating the previous lesson's exact material.", introducedKeys: [], allowedCharacters: BASIC, standardWpm: 24, masteryWpm: 34, practice: ["common-words"], stages: ["have not but what all were when can said there", "use an each which she do how their if will", "steady practice helps each new word feel familiar."] },
  { id: "full-keyboard-alternating-hands", unitId: "full-keyboard", sequence: 22, title: "Alternate Both Hands", objective: "Build steady left-right hand transitions across the complete alphabet.", introducedKeys: [], allowedCharacters: BASIC, standardWpm: 25, masteryWpm: 35, practice: ["left-hand", "right-hand"], stages: ["garden planet market rhythm water quiet", "both hands share the work when the rhythm is even.", "keep a light touch while each hand waits its turn."] },
  { id: "full-keyboard-difficult-reaches", unitId: "full-keyboard", sequence: 23, title: "Difficult Reaches", objective: "Practise commonly awkward reaches and combinations from the standard finger map.", introducedKeys: [], allowedCharacters: BASIC, standardWpm: 24, masteryWpm: 34, practice: ["left-hand", "right-hand"], stages: ["quiz zebra extra minimum public brave", "awkward reaches become easier with patient practice.", "slow down for each difficult key, then return home."] },
  { id: "full-keyboard-sentences", unitId: "full-keyboard", sequence: 24, title: "Complete Sentences", objective: "Type natural sentences with spaces and basic sentence-ending punctuation.", introducedKeys: [], allowedCharacters: BASIC, standardWpm: 28, masteryWpm: 40, practice: ["quotes", "common-words"], stages: ["clear practice builds confidence. calm hands make fewer mistakes.", "look at the screen, breathe easily, and type one word at a time.", "accuracy gives speed a stable foundation. let good rhythm follow."] },

  { id: "capitals-shift", unitId: "capitals-punctuation", sequence: 25, title: "Capital Letters with Shift", objective: "Use the opposite-hand Shift key for capital letters.", introducedKeys: ["Shift"], allowedCharacters: CAPITALS, standardWpm: 18, masteryWpm: 28, practice: ["quotes"], stages: ["Anna Ben Cara Drew Erin Finn Gail Hugo", "Maya and Liam type with calm hands.", "Use the opposite Shift key. Keep the letter hand relaxed."] },
  { id: "punctuation-apostrophes-quotes", unitId: "capitals-punctuation", sequence: 26, title: "Apostrophes and Quotation Marks", objective: "Type apostrophes and quotation marks without losing the home position.", introducedKeys: ["'", "\""], allowedCharacters: QUOTES, standardWpm: 20, masteryWpm: 30, practice: ["quotes"], stages: ["don't can't we're it's you'll", "Maya said, \"Keep a calm rhythm.\"", "\"Accuracy first,\" said Ben. \"Speed will follow.\""] },
  { id: "punctuation-sentences", unitId: "capitals-punctuation", sequence: 27, title: "Sentence Punctuation", objective: "Use commas, periods, question marks, exclamation marks, colons, and semicolons in complete sentences.", introducedKeys: ["?", "!", ":"], allowedCharacters: SENTENCE_PUNCTUATION, standardWpm: 24, masteryWpm: 35, practice: ["quotes"], stages: ["Ready? Begin slowly; keep going!", "Remember: accuracy comes first, and speed follows.", "Can you stay relaxed? Yes; breathe, focus, and continue!"] },

  { id: "numbers-one-through-five", unitId: "numbers-symbols", sequence: 28, title: "Numbers 1–5", objective: "Reach 1, 2, 3, 4, and 5 from the left side of the number row.", introducedKeys: ["1", "2", "3", "4", "5"], allowedCharacters: DIGITS_ONE_FIVE, standardWpm: 14, masteryWpm: 22, practice: ["numbers-symbols"], stages: ["1 2 3 4 5 15 24 31 42 53", "Page 2, row 4, item 5.", "Use 1 finger at a time, then return to the home row."] },
  { id: "numbers-six-through-zero", unitId: "numbers-symbols", sequence: 29, title: "Numbers 6–0", objective: "Reach 6, 7, 8, 9, and 0 from the right side of the number row.", introducedKeys: ["6", "7", "8", "9", "0"], allowedCharacters: DIGITS, standardWpm: 14, masteryWpm: 22, practice: ["numbers-symbols"], stages: ["6 7 8 9 0 60 78 89 90 76", "Room 8, row 7, item 9.", "Type 10 numbers, pause, then type 10 more."] },
  { id: "numbers-symbols-values", unitId: "numbers-symbols", sequence: 30, title: "Numbers and Symbols in Use", objective: "Practise dates, times, percentages, decimals, hyphens, equals signs, and common shifted number-row symbols.", introducedKeys: ["-", "=", "+", "$", "%", "(", ")", "&"], allowedCharacters: SYMBOLS, standardWpm: 18, masteryWpm: 28, practice: ["numbers-symbols"], stages: ["10% 25% $5 $15 3.5 8-4 6=6", "Meet at 9:30. Bring 2-3 pages & 1 pencil.", "The total is $12.50; 5+5 is valid, and 6=6 is equal."] },
];

function makeStages(texts: [string, string, string]): LessonStage[] {
  return texts.map((text, index) => ({ id: `stage-${index + 1}`, title: ["Find the keys", "Build control", "Use the skill"][index], text }));
}

export const CURRICULUM_LESSONS: CurriculumLesson[] = definitions.map((definition) => ({
  ...definition,
  allowedCharacters: [...new Set(definition.allowedCharacters)],
  fingerAssignments: getFingerAssignments(definition.introducedKeys),
  prerequisiteIds: definition.sequence === 1 ? [] : [definitions[definition.sequence - 2].id],
  stages: makeStages(definition.stages),
  accuracyThresholds: LESSON_ACCURACY_THRESHOLDS,
  supportingPracticeIds: definition.practice,
  enabled: true,
  indexable: false,
  contentVersion: 1,
}));

export const ENABLED_CURRICULUM_LESSONS = CURRICULUM_LESSONS.filter((lesson) => lesson.enabled);

export function getCurriculumUnit(unitId: string) {
  return CURRICULUM_UNITS.find((unit) => unit.id === unitId) ?? null;
}

export function getCurriculumLesson(lessonId: string) {
  return ENABLED_CURRICULUM_LESSONS.find((lesson) => lesson.id === lessonId) ?? null;
}

export function getLessonsForUnit(unitId: CurriculumUnitId) {
  return ENABLED_CURRICULUM_LESSONS.filter((lesson) => lesson.unitId === unitId);
}

export function getNextCurriculumLesson(lessonId: string) {
  const index = ENABLED_CURRICULUM_LESSONS.findIndex((lesson) => lesson.id === lessonId);
  return index >= 0 ? ENABLED_CURRICULUM_LESSONS[index + 1] ?? null : null;
}

export function getLessonHref(lesson: Pick<CurriculumLesson, "id" | "unitId">) {
  return `/lessons/lesson/${lesson.unitId}/lesson/${lesson.id}`;
}
