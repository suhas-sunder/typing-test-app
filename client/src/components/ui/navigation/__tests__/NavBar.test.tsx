import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import NavBar from "../NavBar";
import { MemoryRouter } from "react-router-dom";
interface PropTypes {
  isAuthenticated: boolean;
  setAuth: (value: boolean) => void;
}

// Double check if browserrouter is actually necessary now that your importing from NavLinks.
const MockNavBar = ({ isAuthenticated, setAuth }: PropTypes) => {
  render(
    <MemoryRouter>
      <NavBar isAuthenticated={isAuthenticated} setAuth={setAuth} />
    </MemoryRouter>
  );
};

beforeEach(() => {
  const setAuth = vi.fn();
  const isAuthenticated = false;
  MockNavBar({ isAuthenticated, setAuth });
});

describe("renders all navigation elements", () => {
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

  it("should render burger menu icon", () => {
    const iconElement = screen.getByTestId("burger-icons");
    expect(iconElement).toBeInTheDocument();
  });
});

describe("redirects to the appropriate page", () => {
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

describe("should perform appropriate action based on event", () => {
  it("should toggle checkbox that controls mobile nav drop-down menu", () => {
    const inputElement = screen.queryByRole("checkbox");
    const iconElement = screen.getByTestId("burger-icons");
    expect(inputElement).not.toBeChecked();

    fireEvent.click(iconElement);

    const inputElementChecked = screen.getByRole("checkbox");
    expect(inputElementChecked).toBeChecked();
  });
});
