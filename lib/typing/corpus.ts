import { CURATED_COMMON_WORDS } from "@/lib/practice/registry";
import type { DifficultyId, TestMode } from "@/lib/typing/types";

export const TYPING_CONTENT_VERSION = 1;

export type QuoteRecord = {
  author: string;
  characterCount: number;
  contentVersion: number;
  difficulty: DifficultyId;
  id: string;
  provenance: "original" | "public-domain";
  source: string;
  text: string;
};

export type TypingContent = {
  contentVersion: number;
  quoteIds: string[];
  text: string;
};

export type BuildTypingContentOptions = {
  difficulty: DifficultyId;
  duration: number;
  mode: TestMode;
  numbers?: boolean;
  punctuation?: boolean;
  seed?: number;
};

const ADVANCED_WORDS = `
ability absence absolute academic acceptable accidental accompany accomplish accurate achieve acquire activity addition adequate adjacent adjustment admire advantage adventure advisable afterward against agreement alert allocate alternate ambitious analysis annual anticipate apparent application appreciate approach appropriate arrangement articulate assemble assess assignment assist attention attitude audience available awareness balance behavior beneficial boundary calculate category challenge character circumstance clarify collaboration combine comfortable command communicate community compare compatible complete complex compose concentrate conclude condition confidence consistent construct context continue contrast contribute convenient coordinate creative critical curious decision define deliberate demonstrate department describe design determine develop difference difficult direction discover discussion effective efficient elaborate encourage environment establish evaluate evidence excellent familiar flexible foundation frequent function general generous gradual guarantee identify immediate improve independent influence information instruction intelligent intention interpret introduce investigate involve knowledge language likely maintain material measure method moderate necessary notice objective observe opportunity organize original particular patient performance perspective practical precise predict prepare present principle priority process produce professional project protect provide quality reasonable recognize recommend reference reflect regular reliable represent require resource response responsible result schedule separate significant similar solution specific standard strategy structure successful sufficient support technique thoughtful tradition transition understand unique useful validate valuable variety visible vocabulary accurate adaptable analytical attentive balanced capable careful coherent comfortable confident considerate consistent constructive controlled dependable detailed determined disciplined effective efficient encouraging exact focused friendly gradual helpful honest important inclusive informed intentional logical measurable methodical mindful natural organized patient practical predictable prepared precise readable reliable respectful responsive restrained safe sensible stable steady structured suitable supportive thorough timely transparent trustworthy understandable useful validated varied visible workable worthwhile accountable adaptable collaborative communicative comprehensive deliberate descriptive educational familiar flexible foundational functional informative manageable meaningful methodical observational organized original practical progressive purposeful reasonable reflective repeatable representative responsive systematic technical thoughtful verifiable
`.trim().split(/\s+/);

export const BLOCKED_CORPUS_TERMS = new Set(["burning", "died", "fight", "killed"]);
const normalizedCommonWords = unique(CURATED_COMMON_WORDS.map((word) => word.toLowerCase().replace(/[^a-z]/g, "")).filter((word) => word && !BLOCKED_CORPUS_TERMS.has(word)));
const easyWords = normalizedCommonWords.slice(0, 250);
const mediumWords = unique([...normalizedCommonWords, ...ADVANCED_WORDS]).slice(0, 500);
const hardWords = unique([...normalizedCommonWords.slice(250), ...ADVANCED_WORDS]).slice(0, 500);

export const WORD_CORPORA: Record<DifficultyId, { id: string; provenance: string; words: string[] }> = {
  easy: { id: "words-easy-v1", provenance: "Reviewed Free Typing Camp common-word subset.", words: easyWords },
  medium: { id: "words-medium-v1", provenance: "Reviewed Free Typing Camp general-practice word bank.", words: mediumWords },
  hard: { id: "words-hard-v1", provenance: "Reviewed Free Typing Camp longer-vocabulary supplement with intentional common-word overlap.", words: hardWords },
};

const ORIGINAL_PASSAGES: Array<Omit<QuoteRecord, "characterCount" | "contentVersion" | "provenance" | "source" | "author">> = [
  { id: "original-easy-01", difficulty: "easy", text: "A quiet room can make practice feel simple. Sit well, rest your hands, and type each word with care." },
  { id: "original-easy-02", difficulty: "easy", text: "Read the next word before your fingers move. A steady pace helps each letter land in the right place." },
  { id: "original-easy-03", difficulty: "easy", text: "Short practice can still be useful. Stop when your hands feel tired, then return with a calm start." },
  { id: "original-easy-04", difficulty: "easy", text: "Good rhythm grows from clean spaces and gentle key presses. Speed can wait while accuracy becomes a habit." },
  { id: "original-easy-05", difficulty: "easy", text: "Keep your eyes on the text and let your fingers find the keys. One careful line is real progress." },
  { id: "original-easy-06", difficulty: "easy", text: "A mistake can show you which reach needs practice. Correct it, relax your hand, and continue." },
  { id: "original-easy-07", difficulty: "easy", text: "Place your fingers on the home row before the line begins. This small reset makes the first word easier to type with control." },
  { id: "original-easy-08", difficulty: "easy", text: "Use a light touch on every key. The keyboard does not need a hard press, and relaxed hands can move with less effort." },
  { id: "original-easy-09", difficulty: "easy", text: "Finish one word before you think about speed. Clear spaces and correct letters make the whole passage easier to read." },
  { id: "original-easy-10", difficulty: "easy", text: "Look at the screen instead of your hands when you can. If you lose your place, pause and find the next letter again." },
  { id: "original-easy-11", difficulty: "easy", text: "Practice feels different from day to day. A calm and accurate attempt is useful even when the final speed stays the same." },
  { id: "original-easy-12", difficulty: "easy", text: "Let each thumb share the space bar in a comfortable way. Keep the other fingers close to their starting keys." },
  { id: "original-medium-01", difficulty: "medium", text: "Typing improves through attentive repetition, not a single hurried result. Notice difficult transitions and give them a little more time." },
  { id: "original-medium-02", difficulty: "medium", text: "An even pace makes punctuation easier to manage. Read through the sentence, prepare for each capital, and keep the spaces consistent." },
  { id: "original-medium-03", difficulty: "medium", text: "When accuracy falls, slowing down is a practical adjustment. Controlled keystrokes build a stronger base for speed than rushing does." },
  { id: "original-medium-04", difficulty: "medium", text: "Comfort matters during a longer test. Relax your shoulders, keep both feet supported, and pause afterward if your hands need a break." },
  { id: "original-medium-05", difficulty: "medium", text: "The virtual keyboard can guide a new reach, but the passage should hold your attention. Look down only when you truly need to reset." },
  { id: "original-medium-06", difficulty: "medium", text: "A useful result explains both speed and control. Compare similar tests so a change in settings does not hide what actually improved." },
  { id: "original-medium-07", difficulty: "medium", text: "Reading ahead by one or two words can smooth the transition between them, as long as attention stays on the character currently expected." },
  { id: "original-medium-08", difficulty: "medium", text: "Repeated corrections may point to one awkward key pair. Practice that transition slowly, then place it back inside a complete sentence." },
  { id: "original-medium-09", difficulty: "medium", text: "A five-minute session tests concentration as well as finger movement. Consistent posture and a comfortable pace matter throughout the passage." },
  { id: "original-medium-10", difficulty: "medium", text: "Capital letters are easier when the opposite hand holds Shift. Release it promptly so the following lowercase character stays correct." },
  { id: "original-medium-11", difficulty: "medium", text: "Local progress belongs to this browser. It can support private comparison without asking a student to create an account or public profile." },
  { id: "original-medium-12", difficulty: "medium", text: "Different passages create different challenges, so comparisons are most useful when mode, duration, difficulty, and optional content match." },
  { id: "original-hard-01", difficulty: "hard", text: "Deliberate practice separates a complicated movement into manageable decisions, then reconnects those decisions until the sequence feels natural." },
  { id: "original-hard-02", difficulty: "hard", text: "Consistent technique is more informative than an exceptional burst of speed. A reliable pattern can be repeated, evaluated, and gradually refined." },
  { id: "original-hard-03", difficulty: "hard", text: "Punctuation changes the rhythm of a passage: commas invite a brief preparation, while quotation marks and capitals require coordinated Shift keys." },
  { id: "original-hard-04", difficulty: "hard", text: "Responsive practice should remain comfortable on a classroom tablet, a compact laptop, or a wide desktop without changing the underlying measurement." },
  { id: "original-hard-05", difficulty: "hard", text: "Meaningful comparison depends on equivalent conditions. Duration, vocabulary, punctuation, and numeric content all influence the challenge of an attempt." },
  { id: "original-hard-06", difficulty: "hard", text: "A precise correction preserves useful information: the visible mistake is resolved, but the historical keypress remains part of the accuracy calculation." },
  { id: "original-hard-07", difficulty: "hard", text: "Fluent keyboarding combines anticipation with restraint. The reader prepares for an upcoming transition without abandoning the exact character under attention." },
  { id: "original-hard-08", difficulty: "hard", text: "A responsive interface should accommodate enlarged text and changing viewport height while preserving a stable target, reachable controls, and readable feedback." },
  { id: "original-hard-09", difficulty: "hard", text: "Deterministic generation supports reliable validation, yet varied seeds prevent ordinary sessions from presenting the same recognizable opening sequence." },
  { id: "original-hard-10", difficulty: "hard", text: "Correction history distinguishes an error that was resolved from one that remained at completion, producing feedback that is both accurate and understandable." },
  { id: "original-hard-11", difficulty: "hard", text: "Thoughtful practice balances concentration and recovery. When tension increases, a brief pause can protect technique more effectively than forced repetition." },
  { id: "original-hard-12", difficulty: "hard", text: "Vocabulary difficulty should remain practical: longer transitions may challenge coordination, but obscure terms add confusion without educational value." },
];

export const QUOTE_CORPUS: QuoteRecord[] = ORIGINAL_PASSAGES.map((passage) => ({
  ...passage,
  author: "Free Typing Camp",
  characterCount: passage.text.length,
  contentVersion: TYPING_CONTENT_VERSION,
  provenance: "original",
  source: "Original site-written typing passage",
}));

const SENTENCE_SUBJECTS = ["The student", "A careful typist", "Each learner", "The class", "A patient beginner", "The practice group"];
const SENTENCE_ACTIONS = ["reads the full line", "keeps a steady pace", "checks the next word", "uses both hands", "returns to the home row", "corrects the difficult key"];
const SENTENCE_ENDINGS = ["before moving ahead", "and stays relaxed", "with accuracy in mind", "without rushing the space bar", "then continues calmly", "during the short session"];
const NUMBER_TOKENS = ["8:30", "15%", "24 pages", "3.5 miles", "12 students", "2026", "$9", "45 minutes", "2 days", "60 seconds"];

export function buildTypingContent(options: BuildTypingContentOptions): TypingContent {
  const seed = normalizeSeed(options.seed ?? 0);
  if (options.mode === "quote") return buildQuoteContent(options.difficulty, options.duration, seed);
  const targetWords = targetWordCount(options.duration);
  if (options.punctuation) return buildSentenceContent(options.difficulty, targetWords, seed, Boolean(options.numbers));
  return { contentVersion: TYPING_CONTENT_VERSION, quoteIds: [], text: buildWordSequence(options.difficulty, targetWords, seed, Boolean(options.numbers)) };
}

export function validateCorpusRegistry() {
  const issues: string[] = [];
  const minimums: Record<DifficultyId, number> = { easy: 250, medium: 500, hard: 500 };
  const corpusIds = Object.values(WORD_CORPORA).map((corpus) => corpus.id);
  if (new Set(corpusIds).size !== corpusIds.length) issues.push("Corpus IDs must be unique.");
  for (const [difficulty, corpus] of Object.entries(WORD_CORPORA) as Array<[DifficultyId, (typeof WORD_CORPORA)[DifficultyId]]>) {
    if (corpus.words.length < minimums[difficulty]) issues.push(`${difficulty} corpus is below ${minimums[difficulty]} words.`);
    if (unique(corpus.words).length !== corpus.words.length) issues.push(`${difficulty} corpus contains normalized duplicates.`);
    if (corpus.words.some((word) => !/^[a-z]+$/.test(word))) issues.push(`${difficulty} corpus contains unsupported characters.`);
    if (corpus.words.some((word) => BLOCKED_CORPUS_TERMS.has(word))) issues.push(`${difficulty} corpus contains a blocked term.`);
  }
  const quoteIds = QUOTE_CORPUS.map((quote) => quote.id);
  if (new Set(quoteIds).size !== quoteIds.length) issues.push("Quote IDs must be unique.");
  for (const quote of QUOTE_CORPUS) {
    if (!quote.text || quote.text !== quote.text.trim() || /\s{2,}/.test(quote.text)) issues.push(`${quote.id} has invalid whitespace.`);
    if (quote.characterCount !== quote.text.length) issues.push(`${quote.id} has an incorrect character count.`);
    if (quote.provenance === "original" && (quote.author !== "Free Typing Camp" || !quote.source)) issues.push(`${quote.id} has incomplete original provenance.`);
    if (!/^[\x20-\x7E]+$/.test(quote.text)) issues.push(`${quote.id} contains unsupported characters.`);
  }
  return issues;
}

function buildWordSequence(difficulty: DifficultyId, count: number, seed: number, includeNumbers: boolean) {
  const words = shuffled(WORD_CORPORA[difficulty].words, seed);
  const output: string[] = [];
  let cycle = 0;
  while (output.length < count) {
    const cycleWords = shuffled(words, seed + cycle * 7919);
    for (const word of cycleWords) {
      if (output.length >= count) break;
      if (includeNumbers && output.length > 0 && output.length % 17 === 0) output.push(NUMBER_TOKENS[(seed + output.length) % NUMBER_TOKENS.length]);
      if (output.length >= count) break;
      if (output[output.length - 1] !== word) output.push(word);
    }
    cycle += 1;
  }
  return output.slice(0, count).join(" ");
}

function buildSentenceContent(difficulty: DifficultyId, targetWords: number, seed: number, includeNumbers: boolean): TypingContent {
  const sentences: string[] = [];
  let words = 0;
  for (let index = 0; words < targetWords; index += 1) {
    const subject = SENTENCE_SUBJECTS[(seed + index * 3) % SENTENCE_SUBJECTS.length];
    const action = SENTENCE_ACTIONS[(seed + index * 5) % SENTENCE_ACTIONS.length];
    const ending = SENTENCE_ENDINGS[(seed + index * 7) % SENTENCE_ENDINGS.length];
    const number = includeNumbers && index % 3 === 2 ? ` The next check begins at ${NUMBER_TOKENS[(seed + index) % NUMBER_TOKENS.length]}.` : "";
    const qualifier = difficulty === "hard" && index % 2 === 1 ? " carefully, consistently," : difficulty === "medium" && index % 3 === 1 ? " carefully" : "";
    const sentence = `${subject} ${action}${qualifier} ${ending}.${number}`;
    sentences.push(sentence);
    words += sentence.split(/\s+/).length;
  }
  return { contentVersion: TYPING_CONTENT_VERSION, quoteIds: [], text: sentences.join(" ") };
}

function buildQuoteContent(difficulty: DifficultyId, duration: number, seed: number): TypingContent {
  const eligible = [...QUOTE_CORPUS.filter((quote) => quote.difficulty === difficulty), ...QUOTE_CORPUS.filter((quote) => quote.difficulty !== difficulty)];
  const ordered = shuffled(eligible, seed);
  const targetCharacters = Math.max(450, Math.ceil(duration * 14));
  const selected: QuoteRecord[] = [];
  let characters = 0;
  for (let index = 0; characters < targetCharacters; index += 1) {
    const quote = ordered[index % ordered.length];
    if (!selected.some((item) => item.id === quote.id)) {
      selected.push(quote);
      characters += quote.characterCount + 3;
    } else if (selected.length === ordered.length) {
      break;
    }
  }
  return { contentVersion: TYPING_CONTENT_VERSION, quoteIds: selected.map((quote) => quote.id), text: selected.map((quote) => quote.text).join("   ") };
}

function targetWordCount(duration: number) {
  return Math.max(90, Math.min(900, Math.ceil(duration * 2.6)));
}

function shuffled<T>(values: T[], seed: number) {
  const output = [...values];
  const random = mulberry32(seed);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [output[index], output[swap]] = [output[swap], output[index]];
  }
  return output;
}

function mulberry32(seed: number) {
  let value = normalizeSeed(seed);
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function normalizeSeed(seed: number) {
  return Number.isFinite(seed) ? Math.abs(Math.trunc(seed)) >>> 0 : 0;
}

function unique(values: string[]) {
  return [...new Set(values)];
}
