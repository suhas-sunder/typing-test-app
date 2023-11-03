import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import StartMenu from "../StartMenu";

const startTest = vi.fn();
const setText = vi.fn();
const text = "This is the text to be displayed.";
const setTestTime = vi.fn();
const setCharIsValid = vi.fn();

const props = {
  startTest,
  setText,
  text,
  setTestTime,
  setCharIsValid,
};

beforeEach(() => {
  render(<StartMenu {...props} />);
});

describe("renders all menu elements", () => {
  it("renders start menu header", () => {
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent(/Test your typing skills!/);
  });

  it("renders 5 inputs on start menu for minute selection", () => {
    const inputElements = screen.getAllByRole("radio");
    expect(inputElements).toHaveLength(5);
  });

  it("renders 5 labels on start menu for minute selection", () => {
    const inputElements = screen.getAllByLabelText(/min/i);
    expect(inputElements).toHaveLength(5);
  });

  it("renders 6 select menu options", () => {
    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(6);
  });

  it("renders difficulty label", () => {
    const labelElement = screen.getByLabelText(/difficulty/i);
    expect(labelElement).toBeInTheDocument();
  });

  it("renders difficulty setting icon", () => {
    const iconElement = screen.getByTitle(/settings icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("renders 2 buttons", () => {
    const btnElements = screen.getAllByRole("button");
    expect(btnElements).toHaveLength(2);
  });

  it("renders should render start btn with appropriate text", () => {
    const btnElement = screen.getByRole("button", { name: /start test/i });
    expect(btnElement).toBeInTheDocument();
  });

  it("should have first radio button checked by default", () => {
    const checkboxElements = screen.getAllByRole("radio");
    expect((checkboxElements[0] as HTMLInputElement).checked).toBe(true);
  });
});

describe("user events", () => {
  it("renders all stats when start test button is clicked", async () => {
    const startBtnElement = screen.getByText(/Start Test/);
    let statsElementWPM = screen.queryByText(/WPM/);
    let statsElementCPM = screen.queryByText(/CPM/);
    let statsElementAccuracy = screen.queryByText(/🎯/);
    let statsElementTimer = screen.queryByText(/⏰/);

    expect(startBtnElement).toBeInTheDocument();
    expect(statsElementWPM).not.toBeInTheDocument();
    expect(statsElementCPM).not.toBeInTheDocument();
    expect(statsElementAccuracy).not.toBeInTheDocument();
    expect(statsElementTimer).not.toBeInTheDocument();

    await fireEvent.click(startBtnElement);

    statsElementWPM = screen.getByText(/WPM/);
    statsElementCPM = screen.getByText(/CPM/);
    statsElementAccuracy = screen.getByText(/🎯/);
    statsElementTimer = screen.getByText(/⏰/);

    expect(statsElementWPM).toBeInTheDocument();
    expect(statsElementCPM).toBeInTheDocument();
    expect(statsElementAccuracy).toBeInTheDocument();
    expect(statsElementTimer).toBeInTheDocument();
  });

  it("renders text box when start test button is clicked", async () => {
    const startBtnElement = screen.getByText(/Start Test/);
    let textboxElement = screen.queryByTestId(/textbox/);
    expect(textboxElement).not.toBeInTheDocument();

    await fireEvent.click(startBtnElement);

    textboxElement = screen.getByTestId(/textbox/);
    expect(textboxElement).toBeInTheDocument();
  });

  it("renders test page after start test button is clicked. Then renders main menu when main menu btn is clicked.", async () => {
    const startBtnElement = screen.getByText(/Start Test/);

    await fireEvent.click(startBtnElement);

    const mainMenuBtnElement = screen.getByText(/Main Menu/);

    let mainMenuHeader = screen.queryByRole("heading", {
      name: /Test your typing skills!/i,
    });

    const textboxElement = screen.getByTestId(/textbox/i);
    expect(mainMenuHeader).not.toBeInTheDocument();
    expect(textboxElement).toBeInTheDocument();

    await fireEvent.click(mainMenuBtnElement);
    mainMenuHeader = screen.getByRole("heading", {
      name: /Test your typing skills!/i,
    });
    const textboxElement2 = screen.queryByTestId(/textbox/i);
    expect(mainMenuHeader).toBeInTheDocument();
    expect(textboxElement2).not.toBeInTheDocument();
  });

  it("renders test page after start test button is clicked. Remains on test page when restart button is clicked", async () => {
    const startBtnElement = screen.getByText(/Start Test/);
    let restartBtnElement = screen.queryByText(/Restart/);

    expect(restartBtnElement).not.toBeInTheDocument();

    await fireEvent.click(startBtnElement);

    restartBtnElement = screen.getByText(/Restart/);

    let mainMenuHeader = screen.queryByRole("heading", {
      name: /Test your typing/,
    });
    let textboxElement = screen.getByTestId(/textbox/);
    expect(mainMenuHeader).not.toBeInTheDocument();
    expect(textboxElement).toBeInTheDocument();

    await fireEvent.click(restartBtnElement);

    mainMenuHeader = screen.queryByRole("heading", {
      name: /Test your typing/,
    });
    textboxElement = screen.getByTestId(/textbox/);
    expect(mainMenuHeader).not.toBeInTheDocument();
    expect(textboxElement).toBeInTheDocument();
  });

  // Check if correct time options are rendered when start button is clicked.
  // Check if correct text is displayed based on difficulty settings.
});

//Test save settings
//Test restore defaults
