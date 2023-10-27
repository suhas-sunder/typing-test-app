import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MainMenu from "../MainMenu";

beforeEach(() => {
  render(<MainMenu dummyText={"abcd"} />);
});

describe("renders all header elements", () => {
  it("renders start menu header", () => {
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent(/Test your typing skills!/);
  });

  it("renders 5 options on start menu for minute selection", () => {
    const timeOptionElements = screen.getAllByText("min");
    timeOptionElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(timeOptionElements).toHaveLength(5);
  });

  it("renders three buttons on start menu", () => {
    const buttonElements = screen.getAllByRole("button");
    buttonElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(buttonElements).toHaveLength(3);
  });
});

describe("start typing test", () => {
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

    let mainMenuHeader = screen.queryByRole(
      "heading",
      /Test your typing skills!/
    );
    let textboxElement = screen.getByTestId(/textbox/);
    expect(mainMenuHeader).not.toBeInTheDocument();
    expect(textboxElement).toBeInTheDocument();

    await fireEvent.click(mainMenuBtnElement);
    mainMenuHeader = screen.getByRole("heading", /Test your typing skills!/);
    textboxElement = screen.queryByTestId(/textbox/);
    expect(mainMenuHeader).toBeInTheDocument();
    expect(textboxElement).not.toBeInTheDocument();
  });

  it("renders test page after start test button is clicked. Remains on test page when restart button is clicked", async () => {
    const startBtnElement = screen.getByText(/Start Test/);
    let restartBtnElement = screen.queryByText(/Restart/);

    expect(restartBtnElement).not.toBeInTheDocument();

    await fireEvent.click(startBtnElement);

    restartBtnElement = screen.getByText(/Restart/);

    let mainMenuHeader = screen.queryByRole("heading", /Test your typing/);
    let textboxElement = screen.getByTestId(/textbox/);
    expect(mainMenuHeader).not.toBeInTheDocument();
    expect(textboxElement).toBeInTheDocument();

    await fireEvent.click(restartBtnElement);

    mainMenuHeader = screen.queryByRole("heading", /Test your typing/);
    textboxElement = screen.getByTestId(/textbox/);
    expect(mainMenuHeader).not.toBeInTheDocument();
    expect(textboxElement).toBeInTheDocument();
  });
});

// Have a test that checks if one of the 5 checkbox min options are checked even if 1 min is clicked (since 1 min is selected by default).
// Check if saved settings match items highlighted on menu
// Check if clicking save settings triggers settings to be saved.
// Check if restoring default resets menu and triggers restore default.
