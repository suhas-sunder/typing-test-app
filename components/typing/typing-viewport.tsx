"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEventHandler, KeyboardEventHandler, RefObject } from "react";
import type { CharStatus } from "@/lib/typing/types";

const LINE_TOP_TOLERANCE_PX = 3;

type TypingWord = {
  wordIndex: number;
  start: number;
  text: string;
  trailing: string;
  trailingStart: number;
};

export function TypingViewport({
  announcement,
  completed,
  cursor,
  inputRef,
  onBeforeInput,
  onCompositionEnd,
  onCompositionStart,
  onFocusInput,
  onKeyDown,
  resetToken,
  started,
  statuses,
  text,
}: {
  announcement: string;
  completed: boolean;
  cursor: number;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onBeforeInput: FormEventHandler<HTMLTextAreaElement>;
  onCompositionEnd: () => void;
  onCompositionStart: () => void;
  onFocusInput: () => void;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  resetToken: number;
  started: boolean;
  statuses: CharStatus[];
  text: string;
}) {
  const textViewportRef = useRef<HTMLDivElement>(null);
  const textStreamRef = useRef<HTMLDivElement>(null);
  const [measuredLines, setMeasuredLines] = useState<
    Array<{ firstWordIndex: number; top: number }>
  >([{ firstWordIndex: 0, top: 0 }]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const typingWords = useMemo(() => buildTypingWords(text), [text]);
  const activeWordIndex = useMemo(
    () => getActiveWordIndex(typingWords, cursor),
    [cursor, typingWords],
  );
  const streamOffset = measuredLines[activeLineIndex]?.top ?? 0;

  const measureTypingLines = useCallback(() => {
    const stream = textStreamRef.current;
    if (!stream) return;

    const wordNodes = Array.from(
      stream.querySelectorAll<HTMLElement>("[data-word-index]"),
    );
    if (wordNodes.length === 0) {
      setMeasuredLines([{ firstWordIndex: 0, top: 0 }]);
      return;
    }

    const nextLines: Array<{ firstWordIndex: number; top: number }> = [];
    for (const wordNode of wordNodes) {
      const wordIndex = Number(wordNode.dataset.wordIndex ?? 0);
      const top = wordNode.offsetTop;
      const line = nextLines.find(
        (item) => Math.abs(item.top - top) <= LINE_TOP_TOLERANCE_PX,
      );

      if (line) {
        line.firstWordIndex = Math.min(line.firstWordIndex, wordIndex);
      } else {
        nextLines.push({ firstWordIndex: wordIndex, top });
      }
    }

    nextLines.sort((a, b) => a.top - b.top);
    setMeasuredLines((current) =>
      measuredLinesEqual(current, nextLines) ? current : nextLines,
    );
  }, []);

  useLayoutEffect(() => {
    measureTypingLines();

    let frame = 0;
    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measureTypingLines);
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    if (textViewportRef.current)
      resizeObserver.observe(textViewportRef.current);
    if (textStreamRef.current) resizeObserver.observe(textStreamRef.current);

    window.addEventListener("resize", scheduleMeasure);
    document.fonts?.ready.then(scheduleMeasure).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [measureTypingLines, text]);

  useLayoutEffect(() => {
    if (textViewportRef.current) textViewportRef.current.scrollTop = 0;
    setActiveLineIndex(0);
  }, [resetToken]);

  useEffect(() => {
    const nextLineIndex = getLineIndexForWord(measuredLines, activeWordIndex);
    setActiveLineIndex((current) =>
      current === nextLineIndex ? current : nextLineIndex,
    );
  }, [activeWordIndex, measuredLines]);

  return (
    <div
      className="relative py-1"
      data-testid="typing-surface"
      onClick={onFocusInput}
    >
      <textarea
        ref={inputRef}
        className="sr-only"
        value=""
        aria-label="Typing input"
        autoCapitalize="off"
        autoCorrect="off"
        inputMode="text"
        spellCheck={false}
        onBeforeInput={onBeforeInput}
        onChange={() => undefined}
        onCompositionEnd={onCompositionEnd}
        onCompositionStart={onCompositionStart}
        onKeyDown={onKeyDown}
        onPaste={(event) => event.preventDefault()}
      />

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {!started && !completed ? (
        <div className="pointer-events-none absolute -left-1 top-0 z-10 inline-flex items-center gap-2 rounded-2xl bg-camp-peach px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-camp-coral after:absolute after:left-9 after:top-[calc(100%-5px)] after:h-4 after:w-4 after:rotate-45 after:rounded-[3px] after:bg-camp-peach sm:-left-2 sm:-top-1">
          <span className="h-2 w-2 rounded-full bg-camp-orange" />
          Start typing
        </div>
      ) : null}

      <div className="relative pt-5 sm:pt-6">
        <div
          ref={textViewportRef}
          data-testid="typing-text-viewport"
          className="relative h-[calc(var(--typing-visible-lines)*var(--typing-line-height))] overflow-hidden whitespace-normal break-normal pr-1 text-[1.35rem] font-semibold leading-[var(--typing-line-height)] text-camp-ink [--typing-line-height:2.295rem] [--typing-visible-lines:4] sm:text-[1.5rem] sm:[--typing-line-height:2.55rem] sm:[--typing-visible-lines:5] lg:text-[1.6rem] lg:[--typing-line-height:2.64rem]"
        >
          <div
            ref={textStreamRef}
            data-testid="typing-text-stream"
            className="typingStream"
            style={{ transform: `translate3d(0, -${streamOffset}px, 0)` }}
          >
            {typingWords.map((word) => {
              const wordChars = renderTypingChars({
                completed,
                cursor,
                startIndex: word.start,
                statuses,
                text: word.text,
              });
              const trailingChars = renderTypingChars({
                completed,
                cursor,
                startIndex: word.trailingStart,
                statuses,
                text: word.trailing,
              });

              return (
                <span key={word.wordIndex}>
                  {[
                    <span
                      key="word"
                      data-word-index={word.wordIndex}
                      className="inline-block whitespace-nowrap"
                    >
                      {wordChars}
                    </span>,
                    ...trailingChars,
                  ]}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-pill bg-camp-tan">
        <div
          className="h-full rounded-pill bg-camp-orange transition-all"
          style={{ width: `${Math.min(100, (cursor / text.length) * 100)}%` }}
        />
      </div>
    </div>
  );
}

function renderTypingChars({
  completed,
  cursor,
  startIndex,
  statuses,
  text,
}: {
  completed: boolean;
  cursor: number;
  startIndex: number;
  statuses: CharStatus[];
  text: string;
}) {
  return text.split("").map((char, offset) => {
    const index = startIndex + offset;
    const isSpace = char === " ";
    const isCurrent = cursor === index && !completed;

    return (
      <span
        key={`${index}-${char}`}
        data-char={isSpace ? "space" : undefined}
        data-current={isCurrent ? "true" : undefined}
        className={[
          "relative rounded-[6px] px-0.5 transition duration-150",
          isSpace ? "inline-block w-[0.58em] px-0 align-baseline" : "",
          statuses[index] === "correct" ? "text-camp-correct" : "",
          statuses[index] === "error"
            ? "bg-camp-peach text-camp-incorrect"
            : "",
          isCurrent
            ? "after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:rounded-pill after:bg-camp-current"
            : "",
        ].join(" ")}
      >
        {isSpace ? "\u00A0" : char}
      </span>
    );
  });
}

function buildTypingWords(text: string): TypingWord[] {
  const words: TypingWord[] = [];
  const matches = text.matchAll(/\S+\s*/g);

  for (const match of matches) {
    const token = match[0];
    const wordText = token.match(/^\S+/)?.[0] ?? "";
    if (!wordText) continue;

    const start = match.index ?? 0;
    const trailingStart = start + wordText.length;
    words.push({
      wordIndex: words.length,
      start,
      text: wordText,
      trailing: token.slice(wordText.length),
      trailingStart,
    });
  }

  return words;
}

function getActiveWordIndex(words: TypingWord[], cursor: number) {
  if (words.length === 0) return 0;

  for (const word of words) {
    const trailingEnd = word.trailingStart + word.trailing.length;
    if (cursor >= word.start && cursor < trailingEnd) return word.wordIndex;
    if (cursor < word.start) return word.wordIndex;
  }

  return words[words.length - 1].wordIndex;
}

function getLineIndexForWord(
  lines: Array<{ firstWordIndex: number }>,
  wordIndex: number,
) {
  if (lines.length === 0) return 0;

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (wordIndex >= lines[index].firstWordIndex) return index;
  }

  return 0;
}

function measuredLinesEqual(
  current: Array<{ firstWordIndex: number; top: number }>,
  next: Array<{ firstWordIndex: number; top: number }>,
) {
  if (current.length !== next.length) return false;

  return current.every(
    (line, index) =>
      line.firstWordIndex === next[index].firstWordIndex &&
      Math.abs(line.top - next[index].top) <= LINE_TOP_TOLERANCE_PX,
  );
}
