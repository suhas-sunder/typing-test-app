import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Home from "../Home";

const mockHome = () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

beforeEach(() => {
  mockHome();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
describe("renders all page elements", () => {
  // it("should render header component", () => {
  //   render(<Home />);
  //   const headerElement = screen.getByRole("heading", { name: /User stats/i });
  //   expect(headerElement).toBeInTheDocument();
  // });

  it("should render test menu component with start button", () => {
    const headerElement = screen.getByRole("heading", {
      name: /Test your typing skills!/i,
    });
    const buttonElement = screen.getByRole("button", { name: /Start Test/i });
    expect(headerElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
