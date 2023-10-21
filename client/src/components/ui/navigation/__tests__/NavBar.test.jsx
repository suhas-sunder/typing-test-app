import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import NavBar from "../NavBar";
import { BrowserRouter } from "react-router-dom";

// Double check if browserrouter is actually necessary now that your importing from NavLinks.
const MockNavBar = () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
};

describe("renders all navigation elements", () => {
  it("should render 15 of links, 7 for small screens", () => {
    MockNavBar();
    const linkElements = screen.getAllByRole("link");
    linkElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(linkElements).toHaveLength(15);
  });

  it("should render a checkbox that toggles mobile burger menu", () => {
    MockNavBar();
    const inputElement = screen.getByRole("checkbox");
    expect(inputElement).toBeInTheDocument();
  });
});

describe("redirects to the appropriate page", () => {
  it("should render logo link with appropriate redirect", () => {
    MockNavBar();
    const logoElement = screen.getByRole("link", { name: /FreeTypingCamp/i });
    expect(logoElement).toHaveAttribute("href", "/");
  });

  it("should render 2 test page links with appropriate redirect", () => {
    MockNavBar();
    const linkElements = screen.getAllByRole("link", { name: /test/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/")
    );
    expect(linkElements).toHaveLength(2);
  });

  it("should render 2 lessons page links with appropriate redirect", () => {
    MockNavBar();
    const linkElements = screen.getAllByRole("link", { name: /lesson/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/lessons")
    );
    expect(linkElements).toHaveLength(2);
  });

  it("should render 2 games page links with appropriate redirect", () => {
    MockNavBar();
    const linkElements = screen.getAllByRole("link", { name: /summary/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/summary")
    );
    expect(linkElements).toHaveLength(2);
  });

  it("should render 2 test page links with appropriate redirect", () => {
    MockNavBar();
    const linkElements = screen.getAllByRole("link", { name: /test/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/")
    );
    expect(linkElements).toHaveLength(2);
  });

  it("should render 2 test page links with appropriate redirect", () => {
    MockNavBar();
    const linkElements = screen.getAllByRole("link", { name: /Sign up/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/login")
    );
    expect(linkElements).toHaveLength(2);
  });

  it("should render 2 test page links with appropriate redirect", () => {
    MockNavBar();
    const linkElements = screen.getAllByRole("link", { name: /log in/i });
    linkElements.forEach((element) =>
      expect(element).toHaveAttribute("href", "/login")
    );
    expect(linkElements).toHaveLength(2);
  });
});

describe("settings menu", () => {
  it("should open settings drop-down menu when clicked", () => {
    // Add approprite tests for when I configure this drop-down menu
  });
});
