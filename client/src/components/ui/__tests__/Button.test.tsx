import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Button from "../Button";

interface PropType {
  text: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  customStyle: string;
  handleOnClick: () => void;
}

const mockButton = (props: PropType) => {
  render(<Button {...props} />);
};

const title = "";
const text = "Restart";
const handleOnClick = vi.fn();
const type = "button";
const customStyle = "";

beforeEach(() => {
  mockButton({ text, handleOnClick, type, customStyle, title });
});

describe("check if all elements render", async () => {
  it("should render button with appropriate text", () => {
    const btnElement = screen.getByRole("button", { name: /restart/i });
    expect(btnElement).toBeInTheDocument();
  });
});

describe("elements have correct attribute", async () => {
  it("should render button with appropriate text", () => {
    const btnElement = screen.getByRole("button", { name: /restart/i });
    expect(btnElement).toHaveAttribute("type", "button");
  });
});

describe("user event", async () => {
  it("should render button with appropriate text", () => {
    const btnElement = screen.getByRole("button", { name: /restart/i });

    fireEvent.click(btnElement);

    expect(handleOnClick).toHaveBeenCalled();
  });
});
