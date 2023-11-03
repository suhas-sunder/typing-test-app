import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LoginForm from "../LoginForm";

const formData = [
  {
    id: "email-or-username",
    name: "emailOrUsername",
    type: "text",
    placeholder: "Username or Email",
    label: "Email or Username",
    pattern: "^.{6,16}$",
    err: "Please enter a valid username or email!",
    required: true,
    asterisk: false,
  },
  {
    id: "username",
    name: "username",
    type: "text",
    placeholder: "Username",
    label: "Username",
    pattern: "^.{6,16}$",
    err: "Username must be between 6 and 16 characters!",
    required: true,
    asterisk: true,
  },
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
    pattern: "",
    err: "Please enter a valid email!",
    required: true,
    asterisk: true,
  },
  {
    id: "password",
    name: "password",
    type: "text",
    placeholder: "Password",
    label: "Password",
    pattern:
      "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
    err: "Password should be 8-20 characters and include alteast 1 letter, 1 number, and 1 special character!",
    required: true,
    asterisk: true,
  },
  {
    id: "confirm-password",
    name: "confirmPassword",
    type: "text",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    pattern: "",
    err: "Password does not match!",
    required: true,
    asterisk: true,
  },
];

const inputValues = {};
const submitForm = vi.fn();
const setInputValues = vi.fn();

const props = {
  formData,
  inputValues,
  submitForm,
  setInputValues,
};

beforeEach(() => {
  render(<LoginForm {...props} />);
});

describe("renders all form elements", () => {
  formData.forEach((data) => {
    it("should render appropriate label for input", () => {
      const labelElement = screen.getByLabelText(data.label);
      expect(labelElement).toBeInTheDocument();
    });
  });
});
