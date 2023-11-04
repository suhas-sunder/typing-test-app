import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import GameOverMenu from "../GameOverMenu";

const stats = {};
const testTime = 1;
const handleRestart = vi.fn();
const showMainMenu = vi.fn();

beforeEach(() => {
  render(
    <GameOverMenu
      stats={stats}
      handleRestart={handleRestart}
      showMainMenu={showMainMenu}
      testTime={testTime}
    />
  );
});

describe("renders all menu elements", () => {
  it("should render game over header", () => {
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent(/Congratulations on/i);
  });

  it("should render test summary", () => {
    const textElement = screen.getByText(/Your speed was/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render char mistake stat", () => {
    const textElement = screen.getByText(/Chars Misspelled:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render word mistake stat", () => {
    const textElement = screen.getByText(/Words Misspelled:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render correct chars stat", () => {
    const textElement = screen.getByText(/Correct Chars:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render correct words stat", () => {
    const textElement = screen.getByText(/Correct words:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render total chars stat", () => {
    const textElement = screen.getByText(/Total Chars:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render total words stats", () => {
    const textElement = screen.getByText(/Total Words:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render performance summary", () => {
    const textElement = screen.getByText(/performance:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render score", () => {
    const textElement = screen.getByText(/score:/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render best score and performance stats", () => {
    const textElements = screen.getAllByText(/best:/i);
    expect(textElements).toHaveLength(2);
  });

  it("should render12 icons", () => {
    const iconElements = screen.getAllByTitle(/icon/i);
    expect(iconElements).toHaveLength(14);
  });

  it("should render two buttons", () => {
    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements).toHaveLength(2);
  });

  it("should render try again button", () => {
    const buttonElement = screen.getByRole("button", { name: /try again/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render main menu button", () => {
    const buttonElement = screen.getByRole("button", { name: /main menu/i });
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("element attributes", () => {
  it("should render two buttons with correct attributes", () => {
    const buttonElements = screen.getAllByRole("button");
    buttonElements.forEach((button) => {
      expect(button).toHaveAttribute("type", "button");
    });
  });
});

describe("user events", () => {
  it("should call restart function when try again btn is clicked", async () => {
    const buttonElement = screen.getByRole("button", { name: /try again/i });

    await fireEvent.click(buttonElement);

    expect(handleRestart).toBeCalled();
  });

  it("should call show menu function when main menu btn is clicked", async () => {
    const buttonElement = screen.getByRole("button", { name: /main menu/i });

    await fireEvent.click(buttonElement);

    expect(showMainMenu).toBeCalled();
  });
});

// Once this component is integrated with the back-end and design/text is finalized, pass in a stats object and see if it renders the correct values.
