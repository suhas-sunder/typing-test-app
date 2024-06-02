import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import MainMenu from "../SpeedTest";

const mockMainMenu = () => {
  render(
    <MemoryRouter>
      <MainMenu />
    </MemoryRouter>,
  );
};

beforeEach(() => {
  mockMainMenu();
});

describe("renders all menu elements", () => {
  it("renders 5 inputs on start menu for minute selection", () => {
    const inputElements = screen.getAllByRole("radio");
    expect(inputElements).toHaveLength(5);
  });

  it("renders difficulty setting icon", () => {
    const iconElement = screen.getByTitle(/Difficulty settings/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("renders 2 buttons", () => {
    const btnElements = screen.getAllByRole("button");
    expect(btnElements).toHaveLength(2);
  });
  it("should have first radio button checked by default", () => {
    const checkboxElements = screen.getAllByRole("radio");
    expect((checkboxElements[0] as HTMLInputElement).checked).toBe(true);
  });
});

describe("should not render", () => {
  it("renders should not render a text element that says start typing", () => {
    const textElement = screen.queryByText(/start typing/i);
    expect(textElement).not.toBeInTheDocument();
  });
});
