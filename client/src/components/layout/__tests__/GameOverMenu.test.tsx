import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import GameOverMenu from "../GameOverMenu";
import { MemoryRouter } from "react-router-dom";

const testStats = {};
const testTime = 60;
const difficultyScore = 1000;
const handleRestart = vi.fn();
const showMainMenu = vi.fn();

const mockGameOverMenu = (props) => {
  render(
    <MemoryRouter>
      <GameOverMenu {...props} />
    </MemoryRouter>,
  );
};

beforeEach(() => {
  mockGameOverMenu({
    testTime,
    testStats,
    difficultyScore,
    handleRestart,
    showMainMenu,
  });
});

describe("renders all menu elements", () => {
  it("should render game over header", () => {
    const headerElement = screen.getByRole("heading", {
      name: /Congratulations on/i,
    });
    expect(headerElement).toBeInTheDocument();
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

describe("should not render", () => {
  it("should not render any icons since user is not authenticated by default", () => {
    const iconElements = screen.queryByTitle(/icon/i);
    expect(iconElements).not.toBeInTheDocument();
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
