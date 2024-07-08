import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import MainMenu from "../TypingTest";

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

  it("renders should render a text element that says start typing", () => {
    const textElement = screen.getByText(/start typing/i);
    expect(textElement).toBeInTheDocument();
  });
});