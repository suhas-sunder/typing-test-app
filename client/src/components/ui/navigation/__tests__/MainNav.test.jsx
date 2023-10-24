import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import MainNav from "../MainNav";

const MockNavLinks = () => {
  render(
    <BrowserRouter>
      <MainNav />
    </BrowserRouter>
  );
};

describe("renders all link elements", () => {
  it("should render lessons link", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render games link", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /games/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render leaderboard link", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /leaderboard/i });
    expect(linkElement).toBeInTheDocument();
  });
});

describe("redirects to the appropriate page", () => {
  it("should render lessons page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toHaveAttribute("href", "/lessons");
  });

  it("should render games page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /games/i });
    expect(linkElement).toHaveAttribute("href", "/games");
  });

  it("should render leaderboard page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /leaderboard/i });
    expect(linkElement).toHaveAttribute("href", "/leaderboard");
  });
});
