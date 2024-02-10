import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TestTimeOptions from "../TestTimeOptions";

const timeOptions = ["1", "2", "3", "5", "10"];

beforeEach(() => {
  render(<TestTimeOptions timeOptions={timeOptions} />);
});

describe("renders all menu elements", () => {
  it("renders a list", () => {
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  it("renders 5 list items", () => {
    const listElements = screen.getAllByRole("listitem");
    expect(listElements).toHaveLength(5);
  });

  it("renders 5 radio inputs", () => {
    const listElements = screen.getAllByRole("radio");
    expect(listElements).toHaveLength(5);
  });

  timeOptions.forEach((option) => {
    it("renders appropriate label for input", () => {
      const labelElement = screen.getByLabelText(option);
      expect(labelElement).toBeInTheDocument();
    });
  });
});
