import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import NavBar from "../NavBar";
import { BrowserRouter } from "react-router-dom";

// Double check if browserrouter is actually necessary now that your importing from NavLinks.
const MockNavBar = ({ isAuthenticated }) => {
  render(
    <BrowserRouter>
      <NavBar isAuthenticated={isAuthenticated} />
    </BrowserRouter>
  );
};

describe("renders all navigation elements", () => {
  it("should render 9 of links, 7 for small screens", () => {
    MockNavBar(false);
    const linkElements = screen.getAllByRole("link");
    linkElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(linkElements).toHaveLength(9);
  });

  it("should render a checkbox that toggles mobile burger menu", () => {
    MockNavBar(false);
    const inputElement = screen.getByRole("checkbox");
    expect(inputElement).toBeInTheDocument();
  });
});

describe("redirects to the appropriate page", () => {
  it("should render logo link with appropriate redirect", () => {
    MockNavBar(false);
    const logoElement = screen.getByRole("link", { name: /FreeTypingCamp/i });
    expect(logoElement).toHaveAttribute("href", "/");
  });

  it("should render 2 lessons page links with appropriate redirect", () => {
    MockNavBar(false);
    const linkElements = screen.getAllByRole("link", { name: /lesson/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/lessons")
    );
    expect(linkElements).toHaveLength(2);
  });

  it("should render 2 games page links with appropriate redirect", () => {
    MockNavBar(false);
    const linkElements = screen.getAllByRole("link", { name: /games/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/games")
    );
    expect(linkElements).toHaveLength(2);
  });

  it("should render 2 leaderboard page links with appropriate redirect", () => {
    MockNavBar(false);
    const linkElements = screen.getAllByRole("link", { name: /leaderboard/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/leaderboard")
    );
    expect(linkElements).toHaveLength(2);
  });

  it("should render a login link with appropriate redirect", () => {
    MockNavBar(false);
    const linkElement = screen.getByRole("link", { name: /login/i });
    expect(linkElement).toHaveAttribute("href", "/login");
  });

  it("should render a register link with appropriate redirect", () => {
    MockNavBar(false);
    const linkElement = screen.getByRole("link", { name: /sign up/i });
    expect(linkElement).toHaveAttribute("href", "/register");
  });
});
