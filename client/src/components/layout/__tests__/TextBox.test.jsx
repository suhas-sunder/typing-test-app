import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TextBox from "../TextBox";

const dummyText = "abcdefghijklmnopqrstuvwxyz1234567890?~!+";
let thousandChars = new Array(1000).fill("~").join("");

// runs a cleanup after each test case (e.g. clearing jsdom)
describe("renders all textbox elements", () => {
  it("renders textbox", () => {
    render(<TextBox dummyText={dummyText} charStatus={[""]} />);
    const textboxElement = screen.getByTestId(/textbox/i);
    expect(textboxElement).toBeInTheDocument();
  });

  it("renders all 40 characters", () => {
    render(<TextBox dummyText={dummyText} charStatus={[""]} />);
    dummyText.split("").forEach((char) => {
      const spanElement = screen.getByText(char);
      expect(spanElement).toBeInTheDocument();
    });
  });

  it("renders a maximum of 451 chars when input text is 1000 chars long", () => {
    render(<TextBox dummyText={thousandChars} charStatus={[""]} />);
    const spanElements = screen.getAllByText(/~/i);
    spanElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(spanElements).toHaveLength(451);
  });
});
