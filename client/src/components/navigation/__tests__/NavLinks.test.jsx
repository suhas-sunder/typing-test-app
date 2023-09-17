import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import NavLinks from "../NavLinks";

const MockNavLinks = () => {
  render(
    <BrowserRouter>
      <NavLinks />
    </BrowserRouter>
  );
};

describe("renders all link elements", () => {
  it("should link to relevant page", () => {
    MockNavLinks();
  });

  it("should render x links", () => {
    MockNavLinks();
  });

  it("should have class property if addClass prop has a value", () => {
    MockNavLinks();
  });
});

describe("redirects to the appropriate page", () => {
  it("should render test page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /test/i });
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("should render lessons page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toHaveAttribute("href", "/lessons");
  });

  it("should render games page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /summary/i });
    expect(linkElement).toHaveAttribute("href", "/summary");
  });

  it("should render test page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /test/i });
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("should render test page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /Sign up/i });
    expect(linkElement).toHaveAttribute("href", "/login");
  });

  it("should render test page links with appropriate redirect", () => {
    MockNavLinks();
    const linkElement = screen.getByRole("link", { name: /log in/i });
    expect(linkElement).toHaveAttribute("href", "/login");
  });
});
