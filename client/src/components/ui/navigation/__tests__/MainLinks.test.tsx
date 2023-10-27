import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

import MainLinks from "../MainLinks";

interface PropTypes {
  showMobileMenu: boolean;
  isLoggedIn: boolean;
  setAuth: () => void;
  setShowMobileMenu: () => void;
}

const MockNavLinks = ({
  showMobileMenu,
  isLoggedIn,
  setAuth,
  setShowMobileMenu,
}: PropTypes) => {
  render(
    <MemoryRouter>
      <MainLinks
        showMobileMenu={showMobileMenu}
        isLoggedIn={isLoggedIn}
        setAuth={setAuth}
        setShowMobileMenu={setShowMobileMenu}
      />
    </MemoryRouter>
  );
};

const setAuth = vi.fn();
const setShowMobileMenu = vi.fn();

describe("renders all elements", () => {
  const isLoggedIn = false;
  const showMobileMenu = false;
  it("should render lessons link", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render games link", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /games/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render faq link", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /faq/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render login link when mobile menu is active", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /login/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render register link when mobile menu is active", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /sign up/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render logout button when mobile menu is active and user is logged in", async () => {
    const showMobileMenu = true;
    const isLoggedIn = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const buttonElement = await screen.findByRole("button", {
      name: /logout/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("should not render these elements", () => {
  const isLoggedIn = false;
  const showMobileMenu = false;
  it("should not render login link when mobile menu is inactive", async () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = await screen.queryByRole("link", { name: /login/i });
    expect(linkElement).not.toBeInTheDocument();
  });

  it("should not render register link when mobile menu is inactive", async () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = await screen.queryByRole("link", { name: /sign up/i });
    expect(linkElement).not.toBeInTheDocument();
  });
  it("should not render logout button when user is not logged in", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const buttonElement = await screen.queryByRole("button", {
      name: /logout/i,
    });
    expect(buttonElement).not.toBeInTheDocument();
  });

  it("should not render logout button when mobile menu is inactive", async () => {
    const isLoggedIn = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const buttonElement = await screen.queryByRole("button", {
      name: /logout/i,
    });
    expect(buttonElement).not.toBeInTheDocument();
  });
});

describe("redirects to the appropriate page", () => {
  const isLoggedIn = false;
  const showMobileMenu = false;
  it("should render lessons page links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toHaveAttribute("href", "/lessons");
  });

  it("should render games page links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /games/i });
    expect(linkElement).toHaveAttribute("href", "/games");
  });

  it("should render leaderboard page links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /faq/i });
    expect(linkElement).toHaveAttribute("href", "/faq");
  });

  it("should render login link with appropriate redirect", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /login/i });
    expect(linkElement).toHaveAttribute("href", "/login");
  });

  it("should render register link with appropriate redirect", async () => {
    const showMobileMenu = true;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /sign up/i });
    expect(linkElement).toHaveAttribute("href", "/register");
  });
});

describe("function props are called as intended", () => {
  const showMobileMenu = true;
  const isLoggedIn = true;

  it("should close mobile menu when lesson link is clicked", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /lesson/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should render games page links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /games/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should render leaderboard page links with appropriate redirect", () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = screen.getByRole("link", { name: /faq/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should render login link with appropriate redirect", async () => {
    const isLoggedIn = false;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /login/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should render register link with appropriate redirect", async () => {
    const isLoggedIn = false;
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const linkElement = await screen.findByRole("link", { name: /sign up/i });

    fireEvent.click(linkElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should close mobile menu when logout button is clicked", async () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const buttonElement = await screen.findByRole("button", {
      name: /logout/i,
    });

    fireEvent.click(buttonElement);
    expect(setShowMobileMenu).toBeCalled();
  });

  it("should logout user when logout button is clicked", async () => {
    MockNavLinks({ showMobileMenu, isLoggedIn, setAuth, setShowMobileMenu });
    const buttonElement = await screen.findByRole("button", {
      name: /logout/i,
    });

    fireEvent.click(buttonElement);
    expect(setAuth).toBeCalled();
  });
});
