import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import DropDownLabel from "../DropDownLabel";

const iconName = "punchingGlove";
const labelText = "Display this text";

beforeEach(() => {
  render(<DropDownLabel iconName={iconName} labelText={labelText} />);
});

describe("renders all elements", () => {
  it("should render a correct text", () => {
    const textElement = screen.getByText(labelText);
    expect(textElement).toBeInTheDocument();
  });

  it("should render a correct icon", () => {
    const iconElement = screen.getByTitle(/-icon/i);
    expect(iconElement).toBeInTheDocument();
  });
});
