import type { CharStatus } from "@/lib/typing/types";

export type TypingInputAction =
  | { type: "backspace" }
  | { type: "character"; key: string };

export type TrackedKeystroke = {
  actual: string;
  corrected: boolean;
  correct: boolean;
  expected: string;
  position: number;
};

export type TypingAttemptState = {
  cursor: number;
  keystrokes: TrackedKeystroke[];
  statuses: CharStatus[];
  text: string;
};

export type TypingAttemptTransition = {
  accepted: boolean;
  becameComplete: boolean;
  characterInput: boolean;
  correct: boolean | null;
  state: TypingAttemptState;
};

export type TypingAttemptSummary = {
  correctedErrors: number;
  correctKeystrokes: number;
  incorrectKeypresses: number;
  trackedKeystrokes: number;
  uncorrectedErrors: number;
};

export function createTypingAttempt(text: string): TypingAttemptState {
  return {
    cursor: 0,
    keystrokes: [],
    statuses: Array(text.length).fill("idle") as CharStatus[],
    text,
  };
}

export function applyTypingInput(state: TypingAttemptState, action: TypingInputAction): TypingAttemptTransition {
  if (action.type === "backspace") {
    if (state.cursor === 0) {
      return unchanged(state, true);
    }

    const nextCursor = state.cursor - 1;
    const nextStatuses = [...state.statuses];
    const removedStatus = nextStatuses[nextCursor];
    nextStatuses[nextCursor] = "idle";

    let nextKeystrokes = state.keystrokes;
    if (removedStatus === "error") {
      const errorIndex = findLatestUncorrectedError(state.keystrokes, nextCursor);
      if (errorIndex >= 0) {
        nextKeystrokes = state.keystrokes.map((keystroke, index) =>
          index === errorIndex ? { ...keystroke, corrected: true } : keystroke,
        );
      }
    }

    return {
      accepted: true,
      becameComplete: false,
      characterInput: false,
      correct: null,
      state: {
        ...state,
        cursor: nextCursor,
        keystrokes: nextKeystrokes,
        statuses: nextStatuses,
      },
    };
  }

  if (action.key.length !== 1 || state.cursor >= state.text.length) {
    return unchanged(state, false);
  }

  const expected = state.text[state.cursor];
  const correct = action.key === expected;
  const nextStatuses = [...state.statuses];
  nextStatuses[state.cursor] = correct ? "correct" : "error";
  const nextCursor = state.cursor + 1;

  return {
    accepted: true,
    becameComplete: nextCursor === state.text.length,
    characterInput: true,
    correct,
    state: {
      ...state,
      cursor: nextCursor,
      keystrokes: [
        ...state.keystrokes,
        {
          actual: action.key,
          corrected: false,
          correct,
          expected,
          position: state.cursor,
        },
      ],
      statuses: nextStatuses,
    },
  };
}

export function summarizeTypingAttempt(state: TypingAttemptState): TypingAttemptSummary {
  const correctKeystrokes = state.keystrokes.filter((keystroke) => keystroke.correct).length;
  const incorrectKeypresses = state.keystrokes.length - correctKeystrokes;

  return {
    correctedErrors: state.keystrokes.filter((keystroke) => !keystroke.correct && keystroke.corrected).length,
    correctKeystrokes,
    incorrectKeypresses,
    trackedKeystrokes: state.keystrokes.length,
    uncorrectedErrors: state.statuses.filter((status) => status === "error").length,
  };
}

function findLatestUncorrectedError(keystrokes: TrackedKeystroke[], position: number) {
  for (let index = keystrokes.length - 1; index >= 0; index -= 1) {
    const keystroke = keystrokes[index];
    if (keystroke.position === position && !keystroke.correct && !keystroke.corrected) {
      return index;
    }
  }

  return -1;
}

function unchanged(state: TypingAttemptState, accepted: boolean): TypingAttemptTransition {
  return {
    accepted,
    becameComplete: false,
    characterInput: false,
    correct: null,
    state,
  };
}
