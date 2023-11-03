import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LoginFormInputs from "../LoginFormInputs";

const inputData = {
  id: "email-or-username",
  name: "emailOrUsername",
  type: "text",
  placeholder: "Username or Email",
  label: "Email or Username",
  pattern: "^.{6,16}$",
  err: "Please enter a valid username or email!",
  required: true,
  asterisk: false,
};

const inputValues = {};
const setInputValues = vi.fn();

const props = {
  inputData,
  inputValues,
  setInputValues,
};

beforeEach(() => {
  render(<LoginFormInputs {...props} />);
});

describe("renders all form elements", () => {
  it("should render label with correct text", () => {
    const labelElement = screen.getByLabelText(inputData.label);
    expect(labelElement).toBeInTheDocument();
  });

  it("should render input element", () => {
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});

describe("element attributes", () => {
  it("should render input element with appropriate attributes", () => {
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeRequired();
    expect(inputElement).toHaveAttribute("type", inputData.type);
    expect(inputElement).toHaveAttribute("id", inputData.id);
    expect(inputElement).toHaveProperty("placeholder", inputData.placeholder);
  });
});

// Form validation is via CSS and therefore will require other means to test it.
// Also, below test fails because its hidden via css.
// describe("should not render elements", () => {
//   it("should not render error message", () => {
//     const textElement = screen.queryByText(inputData.err);
//     expect(textElement).not.toBeInTheDocument();
//   });
// });
