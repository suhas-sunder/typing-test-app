import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import LoginLinks from "../LoginLinks";

interface PropTypes {
  showMobileMenu: boolean;
  setShowMobileMenu: () => void;
}
const MockLoginLinks = ({ showMobileMenu, setShowMobileMenu }: PropTypes) => {
  render(
    <MemoryRouter>
      <LoginLinks
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
    </MemoryRouter>
  );
};

const setShowMobileMenu = vi.fn();
const showMobileMenu = false;

beforeEach(() => {
  MockLoginLinks({ showMobileMenu, setShowMobileMenu });
});

describe("renders all elements", () => {
  it("should render a login link", () => {
    const linkElement = screen.getByRole("link", { name: /login/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a register link", () => {
    const linkElement = screen.getByRole("link", { name: /sign up/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render two list items", () => {
    const itemElements = screen.getAllByRole("listitem");
    expect(itemElements).toHaveLength(2);
  });

  it("should render a login icon", () => {
    const iconElement = screen.getByTitle(/login-icon/i);
    expect(iconElement).toBeInTheDocument();
  });
});

describe("function props are called as intended", () => {
  it("should close mobile menu when login link is clicked", () => {
    const linkElement = screen.getByRole("link", { name: /login/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should close mobile menu when register link is clicked", () => {
    const linkElement = screen.getByRole("link", { name: /sign up/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });
});
