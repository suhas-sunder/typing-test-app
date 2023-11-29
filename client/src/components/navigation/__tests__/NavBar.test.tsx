import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import NavBar from "../NavBar";
import { MemoryRouter } from "react-router-dom";

// Double check if browserrouter is actually necessary now that your importing from NavLinks.
const MockNavBar = () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
};


describe("renders all navigation elements when logged out", () => {
  beforeEach(() => {
    MockNavBar();
  });

  it("should render a logo link with appropriate redirect", () => {
    const logoElement = screen.getByRole("link", { name: /FreeTypingCamp/i });
    expect(logoElement).toBeInTheDocument();
  });

  it("should render a lessons link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a games link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /games/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render an faq link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /faq/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a login link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /login/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a register link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /sign up/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render 6 links", () => {
    const linkElements = screen.getAllByRole("link");
    linkElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(linkElements).toHaveLength(6);
  });

  it("should render a checkbox that toggles mobile burger menu", () => {
    const inputElement = screen.getByRole("checkbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("should render burger menu icon wrapper", () => {
    const labelElement = screen.getByTestId("burger-icons");
    expect(labelElement).toBeInTheDocument();
  });

  it("should render a lessons icon", () => {
    const iconElement = screen.getByTitle(/lessons-icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a games icon", () => {
    const iconElement = screen.getByTitle(/games-icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a faq icon", () => {
    const iconElement = screen.getByTitle(/faq-icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a login icon", () => {
    const iconElement = screen.getByTitle(/login-icon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a burger menu open icon", () => {
    const iconElement = screen.getByTitle(/burger-closed/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render a burger menu closed icon", () => {
    const iconElement = screen.getByTitle(/burger-open/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render 6 icons", () => {
    const iconElements = screen.getAllByTitle(/-icon/i);
    expect(iconElements).toHaveLength(6);
  });
});


describe("should not render these elements when logged out", () => {
  beforeEach(() => {
    MockNavBar();
  });

  it("should not render a trophy icon when logged in", () => {
    const linkElement = screen.queryByTitle(/trophy-icon/i);
    expect(linkElement).not.toBeInTheDocument();
  });

  it("should not render a profile menu link", () => {
    const linkElement = screen.queryByTestId("profile-menu");
    expect(linkElement).not.toBeInTheDocument();
  });

  it("should not render an image", () => {
    const linkElement = screen.queryByRole("img");
    expect(linkElement).not.toBeInTheDocument();
  });

  it("should not render a username", () => {
    const linkElement = screen.queryByTestId(/username/i);
    expect(linkElement).not.toBeInTheDocument();
  });

  it("should not render a profile-score", () => {
    const linkElement = screen.queryByTestId(/profile-score/i);
    expect(linkElement).not.toBeInTheDocument();
  });
});

describe("renders elements with appropriate attribute when logged out", () => {
  beforeEach(() => {
    MockNavBar();
  });

  it("should render a logo link with appropriate redirect", () => {
    const logoElement = screen.getByRole("link", { name: /FreeTypingCamp/i });
    expect(logoElement).toHaveAttribute("href", "/");
  });

  it("should render a lessons link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /lesson/i });
    expect(linkElement).toHaveAttribute("href", "/lessons");
  });

  it("should render a games link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /games/i });
    expect(linkElement).toHaveAttribute("href", "/games");
  });

  it("should render an faq link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /faq/i });
    expect(linkElement).toHaveAttribute("href", "/faq");
  });

  it("should render a login link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /login/i });
    expect(linkElement).toHaveAttribute("href", "/login");
  });

  it("should render a register link with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /sign up/i });
    expect(linkElement).toHaveAttribute("href", "/register");
  });
});

describe("should perform appropriate action based on event when logged out", () => {
  beforeEach(() => {
    MockNavBar();
  });

  it("should toggle checkbox that controls mobile nav drop-down menu", () => {
    const inputElement = screen.queryByRole("checkbox");
    const labelElement = screen.getByTestId("burger-icons");
    expect(inputElement).not.toBeChecked();

    fireEvent.click(labelElement);

    const inputElementChecked = screen.getByRole("checkbox");
    expect(inputElementChecked).toBeChecked();
  });
});

describe("should perform appropriate action based on event when logged in", () => {
  beforeEach(() => {
    MockNavBar();
  });

  it("should toggle checkbox that controls mobile nav drop-down menu", () => {
    const inputElement = screen.queryByRole("checkbox");
    const labelElement = screen.getByTestId("burger-icons");
    expect(inputElement).not.toBeChecked();

    fireEvent.click(labelElement);

    const inputElementChecked = screen.getByRole("checkbox");
    expect(inputElementChecked).toBeChecked();
  });
});
