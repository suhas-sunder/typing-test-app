import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(inputElements).toHaveLength(23);
  });

  it("renders 3 buttons", () => {
    render(<StartMenu />);
    const buttonElements = screen.getAllByRole("button");
    buttonElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(buttonElements).toHaveLength(3);
  });
});

describe("checkbox", () => {
  it("should have first radio button checked by default", () => {
    render(<StartMenu />);
    const checkboxElements = screen.getAllByRole("radio");

    expect(checkboxElements[0].checked).toBe(true);
  });

  it("should have only 4 checkboxes checked by default", () => {
    render(<StartMenu />);
    const checkboxElements = screen.getAllByRole("checkbox");
    let totalChecked = 0;

    checkboxElements.forEach((element) => {
      if (element.checked) totalChecked++;
    });

    expect(totalChecked).toBe(4);
  });

  it("should check all checkboxes when clicked, and uncheck active defaults", () => {
    render(<StartMenu />);
    const checkboxElements = screen.getAllByRole("checkbox");
    let totalChecked = 0;
    checkboxElements.forEach((element) => {
      fireEvent.click(element);
    });

    checkboxElements.forEach((element) => {
      if (element.checked) totalChecked++;
    });

    expect(totalChecked).toBe(19);
  });
});

//Test save settings
//Test restore defaults
