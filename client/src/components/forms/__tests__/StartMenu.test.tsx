import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  it("should call appropriate functions after start test button is clicked.", async () => {
    const startBtnElement = screen.getByRole("button", { name: /Start Test/i });
    const restartBtnElement = screen.queryByText(/Restart/i);
    const textboxElement = screen.queryByTestId(/textbox/i);

    expect(restartBtnElement).not.toBeInTheDocument();
    expect(textboxElement).not.toBeInTheDocument();

    fireEvent.click(startBtnElement);

    await waitFor(() => {
      expect(startTest).toHaveBeenCalled();
      expect(setCharIsValid).toHaveBeenCalled();
    });
  });
});
