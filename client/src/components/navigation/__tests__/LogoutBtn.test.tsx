import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import LogoutBtn from "../LogoutBtn";

interface PropType {
  customStyle: string;
  setAuth: (value: boolean) => void;
}

const MockLoginLinks = ({ setAuth, customStyle }: PropType) => {
  render(
    <MemoryRouter>
      <LogoutBtn setAuth={setAuth} customStyle={customStyle} />
    </MemoryRouter>
  );
};

const customStyle = "";
const setAuth = vi.fn();

beforeEach(() => {
  MockLoginLinks({ setAuth, customStyle });
});

describe("renders all elements", () => {
  it("should render a button with appropriate text", () => {
    const btnElement = screen.getByRole("button", {
      name: /logout/i,
    });
    expect(btnElement).toBeInTheDocument();
  });

  it("should render a an icon for the button", () => {
    const iconElement = screen.getByTitle(/icon/i);
    expect(iconElement).toBeInTheDocument();
  });
});

describe("user event", () => {
  it("should call setAuth function to prompt logout", () => {
    const btnElement = screen.getByRole("button", {
      name: /logout/i,
    });

    fireEvent.click(btnElement);

    expect(setAuth).toBeCalled();
    // Need to mock local storage and add a test to check if local storage is cleared.
  });
});
