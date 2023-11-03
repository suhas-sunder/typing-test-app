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

describe("should not render elements", () => {
  it("should not render error message", () => {
    const textElement = screen.queryByTestId(/login-err-msg/i);
    expect(textElement).not.toBeInTheDocument();
  });
});
