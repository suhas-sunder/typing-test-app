import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TypingStats from "../TypingStats";

// runs a cleanup after each test case (e.g. clearing jsdom)
describe("renders all stat elements with correct default value", () => {
  it("renders WPM stat", () => {
    render(<TypingStats charStats={[""]} />);
    const statsElement = screen.getByText(/WPM/);
    expect(statsElement).toBeInTheDocument();
    expect(statsElement).toHaveTextContent(/WPM 0/);
  });

  it("renders CPM stat", () => {
    render(<TypingStats charStats={[""]} />);
    const statsElement = screen.getByText(/CPM/);
    expect(statsElement).toBeInTheDocument();
    expect(statsElement).toHaveTextContent(/CPM 0/);
  });

  it("renders accuracy stat", () => {
    render(<TypingStats charStats={[""]} />);
    const statsElement = screen.getByText(/🎯/);
    expect(statsElement).toBeInTheDocument();
    expect(statsElement).toHaveTextContent(/🎯 0%/);
  });

  it("renders timer stat", () => {
    render(<TypingStats charStats={[""]} testTime={60} />);
    const statsElement = screen.getByText(/⏰/);
    expect(statsElement).toBeInTheDocument();
    expect(statsElement).toHaveTextContent(/⏰ 1:00/);
  });
});

describe("correct stats values are displayed", () => {
  it("should update WPM if correct chars are present", () => {
    render(
      <TypingStats charStats={["correct", "wrong", "correct"]} testTime={60} />
    );
    const statsElement = screen.getByText(/WPM/);
    expect(statsElement).toHaveTextContent(/WPM 24/);
  });

  it("should not update WPM if only incorrect chars are present", () => {
    render(
      <TypingStats charStats={["wrong", "wrong", "wrong"]} testTime={60} />
    );
    const statsElement = screen.getByText(/WPM/);
    expect(statsElement).toHaveTextContent(/WPM 0/);
  });

  it("should update CPM if correct chars are present", () => {
    render(
      <TypingStats charStats={["correct", "wrong", "correct"]} testTime={60} />
    );
    const statsElement = screen.getByText(/CPM/);
    expect(statsElement).toHaveTextContent(/CPM 120/);
  });

  it("should update accuracy if correct chars are present", () => {
    render(
      <TypingStats charStats={["correct", "wrong", "correct"]} testTime={60} />
    );
    const statsElement = screen.getByText(/🎯/);
    expect(statsElement).toHaveTextContent(/🎯 100%/);
  });
});
