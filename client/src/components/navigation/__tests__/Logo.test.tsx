import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import Logo from "../Logo";

interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

const MockLoginLinks = ({ setShowMobileMenu }: PropTypes) => {
  render(
    <MemoryRouter>
      <Logo setShowMobileMenu={setShowMobileMenu} />
    </MemoryRouter>
  );
};

const setShowMobileMenu = vi.fn();

beforeEach(() => {
  MockLoginLinks({ setShowMobileMenu });
});

describe("renders all elements", () => {
  it("should render a login link", () => {
    const linkElement = screen.getByRole("link", {
      name: /freetypingcamp/i,
    });
    expect(linkElement).toBeInTheDocument();
  });
});

describe("element attributes", () => {
  it("should render a logo link to home page", () => {
    const linkElement = screen.getByRole("link", {
      name: /freetypingcamp/i,
    });
    expect(linkElement).toHaveAttribute("href", "/");
  });
});

describe("user event", () => {
  it("should close mobile menu when logo is clicked", () => {
    const linkElement = screen.getByRole("link", {
      name: /freetypingcamp/i,
    });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });
});
