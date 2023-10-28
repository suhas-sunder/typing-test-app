import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import GameOverMenu from "../GameOverMenu";

const stats = {};

beforeEach(() => {
  render(<GameOverMenu stats={stats} />);
});

describe("renders all menu elements", () => {
  it("renders game over header", () => {
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent(/Congratulations on/i);
  });

  it("renders first stat section", () => {
    const textElement = screen.getByText(/Your speed was/i);
    expect(textElement).toBeInTheDocument();
  });

  it("renders second stat section", () => {
    const textElement = screen.getByText(/Total Chars:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("renders third stat section ", () => {
    const textElement = screen.getByText(/Chars Misspelled:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("renders fourth stat section ", () => {
    const textElement = screen.getByText(/Correct Chars:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("renders word stats", () => {
    const textElement = screen.getByText(/Total Words:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("renders buttons with correct text", () => {
    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements[0]).toBeInTheDocument();
    expect(buttonElements[1]).toBeInTheDocument();
    expect(buttonElements[0]).toHaveTextContent(/Try Again/i);
    expect(buttonElements[1]).toHaveTextContent(/Main Menu/i);
  });
});

// Once this component is integrated with the back-end and design/text is finalized, pass in a stats object and see if it renders the correct values.
