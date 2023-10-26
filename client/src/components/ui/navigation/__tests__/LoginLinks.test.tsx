import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import LoginLinks from "../LoginLinks";

interface PropTypes {
  showMobileMenu: boolean;
  setShowMobileMenu: () => void;
}
const MockLoginLinks = ({ showMobileMenu, setShowMobileMenu }: PropTypes) => {
  render(
    <BrowserRouter>
      <LoginLinks
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
    </BrowserRouter>
  );
};

const setShowMobileMenu = vi.fn();
const showMobileMenu = false;

describe("renders all elements", () => {
  it("should render a login link", () => {
    MockLoginLinks({ showMobileMenu, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /login/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a register link", () => {
    MockLoginLinks({ showMobileMenu, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /sign up/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render two list items", () => {
    MockLoginLinks({ showMobileMenu, setShowMobileMenu });
    const linkElements = screen.getAllByRole("listitem");
    expect(linkElements).toHaveLength(2);
  });
});

describe("function props are called as intended", () => {
  it("should close mobile menu when login link is clicked", () => {
    MockLoginLinks({ showMobileMenu, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /login/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should close mobile menu when register link is clicked", () => {
    MockLoginLinks({ showMobileMenu, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /sign up/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });
});
