import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import DifficultySettings from "../DifficultySettings";

import { MemoryRouter } from "react-router-dom";
import { MenuContext } from "../../../../providers/MenuProvider";

interface PropType {
  setShowDifficultyMenu: (value: boolean) => void;
}

const mockDifficultySettings = (props: PropType) => {
  render(
    <MemoryRouter>
      <MenuContext.Provider
        value={{
          difficultySettings: {
            "very easy": {
              settings: ["all lower case", "no punctuation"],
              difficultyLevel: "very easy",
              selected: false,
              default: true,
              scoreBonus: 700,
            },
            medium: {
              settings: [],
              difficultyLevel: "medium",
              selected: false,
              default: true,
              scoreBonus: 1500,
            },
          },
          currentDifficulty: "very easy",
          difficultyPoints: {},
          setDifficultySettings: vi.fn(),
          handleUpdateDatabase: vi.fn(),
          setAuth: vi.fn(),
          id: "random id",
          setId: vi.fn(),
        }}
      >
        <DifficultySettings {...props} />
      </MenuContext.Provider>
    </MemoryRouter>,
  );
};

const props = {
  setShowDifficultyMenu: () => vi.fn(),
};

beforeEach(() => {
  mockDifficultySettings(props);
});

describe("renders all form elements", () => {
  it("should render an appropriate settings to filter text", () => {
    const textElement = screen.getByText(/Difficulty Setting/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render first setting preset", () => {
    const textElement = screen.getByText("all lower case");
    expect(textElement).toBeInTheDocument();
  });

  it("should render second setting preset", () => {
    const textElement = screen.getByText("no punctuation");
    expect(textElement).toBeInTheDocument();
  });

  it("should render SVG difficulty label", async () => {
    const textElement = await screen.findByTestId(/difficlty-label/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render SVG difficulty label", async () => {
    const textElement = await screen.findByTestId(/difficlty-label/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render SVG difficulty label", async () => {
    const textElement = await screen.findByTestId(/difficlty-label/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render very easy difficulty", async () => {
    const textElement = await screen.findByText(/very easy/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render medium difficulty hidden in drop-down menu", async () => {
    const textElement = await screen.findByText(/medium/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render score bonus", () => {
    const textElement = screen.getByText(/Score Bonus:/i);
    const textElement2 = screen.getByText(/1500/i); //Default difficulty points for medium setting
    expect(textElement).toBeInTheDocument();
    expect(textElement2).toBeInTheDocument();
  });
});
