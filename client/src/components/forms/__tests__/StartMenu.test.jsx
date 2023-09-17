import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import StartMenu from "../StartMenu";

// runs a cleanup after each test case (e.g. clearing jsdom)
describe("renders all menu elements", () => {
  it("renders header", () => {
    render(<StartMenu />);
    const headerElement = screen.getByRole(
      "heading",
      /Test your typing skills/
    );
    expect(headerElement).toBeInTheDocument();
  });

  it("renders 17 input checkbox options", () => {
    render(<StartMenu />);
    const inputElements = screen.getAllByRole("checkbox");
    inputElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(inputElements).toHaveLength(17);
  });

  it("renders 3 buttons", () => {
    render(<StartMenu />);
    const buttonElements = screen.getAllByRole("button");
    buttonElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(buttonElements).toHaveLength(3);
  });
});

describe("checkbox", () => {
  it("should test checkbox", () => {
    // once checkbox options are configured check if defaults load
    // Check if saved settings load
    // Test save settings btn
    // Test start Test btn
    // Test restore defaults btn
    // Make sure atleast one of the minute options are selected at all times.
  });
});
