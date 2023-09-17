import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import GameOverMenu from "../GameOverMenu";

// runs a cleanup after each test case (e.g. clearing jsdom)
describe("renders all menu elements", () => {
  it("renders header", () => {
    render(<GameOverMenu />);
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent(/Typing Test Completed!/);
  });

  it("renders speed stats", () => {
    render(<GameOverMenu />);
    const textElement = screen.getByText(/Your speed was/);
    expect(textElement).toBeInTheDocument();
  });

  it("renders character stats", () => {
    render(<GameOverMenu />);
    const textElement = screen.getByText(/characters with/);
    expect(textElement).toBeInTheDocument();
  });

  it("renders word stats", () => {
    render(<GameOverMenu />);
    const textElement = screen.getByText(/words with/);
    expect(textElement).toBeInTheDocument();
  });

  it("renders buttons with correct text", () => {
    render(<GameOverMenu />);
    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements[0]).toBeInTheDocument();
    expect(buttonElements[1]).toBeInTheDocument();
    expect(buttonElements[0]).toHaveTextContent(/Try Again/);
    expect(buttonElements[1]).toHaveTextContent(/Main Menu/);
  });
});
