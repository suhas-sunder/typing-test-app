import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Textbox from "../Textbox";

interface PropType {
  charStatus: string[];
  setCharStatus: (index: number, text: string) => void;
  updateStartTimer: (value: boolean) => void;
  dummyText: string;
  cursorPosition: number;
  setCursorPosition: (value: number) => void;
  firstInputDetected: boolean;
  setFirstInputDetected: (value: boolean) => void;
}

const thousandChars = new Array(1000).fill("~").join("");
const charStatus = [""];
const firstInputDetected = true;
const dummyText = "abcdefghijklmnopqrstuvwxyz1234567890?~!+";
const cursorPosition = 0;
const setCharStatus = vi.fn();
const updateStartTimer = vi.fn();
const setCursorPosition = vi.fn();
const setFirstInputDetected = vi.fn();

const mockTextBox = (props: PropType) => {
  render(<Textbox {...props} />);
};

describe("renders all textbox elements", () => {
  it("renders textbox", () => {
    mockTextBox({
      charStatus,
      firstInputDetected,
      dummyText,
      cursorPosition,
      setCharStatus,
      updateStartTimer,
      setCursorPosition,
      setFirstInputDetected,
    });
    const textboxElement = screen.getByTestId(/textbox/i);
    expect(textboxElement).toBeInTheDocument();
  });

  it("renders all 40 characters", () => {
    mockTextBox({
      charStatus,
      firstInputDetected,
      dummyText,
      cursorPosition,
      setCharStatus,
      updateStartTimer,
      setCursorPosition,
      setFirstInputDetected,
    });
    dummyText.split("").forEach((char) => {
      const spanElement = screen.getByText(char);
      expect(spanElement).toBeInTheDocument();
    });
  });

  it("renders a maximum of 451 chars when input text is 1000 chars long", () => {
    mockTextBox({
      charStatus,
      firstInputDetected,
      dummyText: thousandChars,
      cursorPosition,
      setCharStatus,
      updateStartTimer,
      setCursorPosition,
      setFirstInputDetected,
    });
    const spanElements = screen.getAllByText(/~/i);
    spanElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(spanElements).toHaveLength(451);
  });
});
