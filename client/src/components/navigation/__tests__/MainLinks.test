import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

import MainLinks from "../MainLinks";

interface PropTypes {
  showMobileMenu: boolean;
  isLoggedIn: boolean;
  setShowMobileMenu: () => void;
}

const MockNavLinks = ({
  showMobileMenu,
  isLoggedIn,
  setShowMobileMenu,
}: PropTypes) => {
  render(
    <MemoryRouter>
      <MainLinks
        showMobileMenu={showMobileMenu}
        isLoggedIn={isLoggedIn}
        setShowMobileMenu={setShowMobileMenu}
      />
    </MemoryRouter>,
  );
};

const setShowMobileMenu = vi.fn();

describe("renders all elements", () => {
  const isLoggedIn = false;
  const showMobileMenu = true;
  it("should render lessons link", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render games link", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /games/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render articles link", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /articles/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a lessons icon", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const iconElement = screen.getByTitle(/lessons-icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a games icon", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const iconElement = screen.getByTitle(/games-icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a articles icon", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const iconElement = screen.getByTitle(/articles-icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a login icon", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const iconElement = screen.getByTitle(/login-icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render 4 icons", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const iconElements = screen.getAllByTitle(/-icon/i);
    expect(iconElements).toHaveLength(4);
  });

  it("should render login link when mobile menu is active", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /login/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render register link when mobile menu is active", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /sign up/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render logout button when mobile menu is active and user is logged in", async () => {
    const showMobileMenu = true;
    const isLoggedIn = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const buttonElement = await screen.findByRole("button", {
      name: /logout/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("should not render elements", () => {
  const isLoggedIn = false;
  const showMobileMenu = false;
  it("should not render login link when mobile menu is inactive", async () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = await screen.queryByRole("link", { name: /login/i });
    expect(linkElement).not.toBeInTheDocument();
  });

  it("should not render register link when mobile menu is inactive", async () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = await screen.queryByRole("link", { name: /sign up/i });
    expect(linkElement).not.toBeInTheDocument();
  });
  it("should not render logout button when user is not logged in", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const buttonElement = await screen.queryByRole("button", {
      name: /logout/i,
    });
    expect(buttonElement).not.toBeInTheDocument();
  });

  it("should not render logout button when mobile menu is inactive", async () => {
    const isLoggedIn = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const buttonElement = await screen.queryByRole("button", {
      name: /logout/i,
    });
    expect(buttonElement).not.toBeInTheDocument();
  });
});

describe("has correct attributes", () => {
  const isLoggedIn = false;
  const showMobileMenu = true;
  it("should render lessons page links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toHaveAttribute("href", "/lessons");
  });

  it("should render games page links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /games/i });
    expect(linkElement).toHaveAttribute("href", "/games");
  });

  it("should render articles link with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /articles/i });
    expect(linkElement).toHaveAttribute("href", "/articles");
  });

  it("should render login link with appropriate redirect", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /login/i });
    expect(linkElement).toHaveAttribute("href", "/login");
  });

  it("should render register link with appropriate redirect", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /sign up/i });
    expect(linkElement).toHaveAttribute("href", "/register");
  });
});

describe("function props are called as intended", () => {
  const showMobileMenu = true;
  const isLoggedIn = true;

  it("should close mobile menu when lesson link is clicked", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /lesson/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should render games page links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /games/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should render articles links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /articles/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should render login link with appropriate redirect", async () => {
    const isLoggedIn = false;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /login/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should render register link with appropriate redirect", async () => {
    const isLoggedIn = false;
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /sign up/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should close mobile menu when logout button is clicked", async () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setShowMobileMenu });
    const buttonElement = await screen.findByRole("button", {
      name: /logout/i,
    });

    fireEvent.click(buttonElement);
    expect(setShowMobileMenu).toBeCalled();
  });
});
