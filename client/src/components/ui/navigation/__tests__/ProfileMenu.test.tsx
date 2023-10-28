import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import ProfileMenu from "../ProfileMenu";
import ProfileImg from "../../../../../public/images/wolf_icon.jpg";

interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

const MockNavLinks = ({ setShowMobileMenu }: PropTypes) => {
  render(
    <MemoryRouter>
      <ProfileMenu setShowMobileMenu={setShowMobileMenu} />
    </MemoryRouter>
  );
};

const setShowMobileMenu = vi.fn();

beforeEach(() => {
  MockNavLinks({ setShowMobileMenu });
});

describe("renders all elements", () => {
  it("should render a profile link", () => {
    const linkElement = screen.getByTestId("profile-menu");
    expect(linkElement).toBeInTheDocument();
  });

  it("should render an image", () => {
    const linkElement = screen.getByRole("img");
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a list", () => {
    const linkElement = screen.getByRole("list");
    expect(linkElement).toBeInTheDocument();
  });

  it("should render two list items", () => {
    const linkElements = screen.getAllByRole("listitem");
    expect(linkElements).toHaveLength(2);
  });

  it("should render a trophy icon", () => {
    const linkElement = screen.getByTitle("trophy-icon");
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a username", () => {
    const linkElement = screen.getByTestId(/username/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a profile-score", () => {
    const linkElement = screen.getByTestId(/profile-score/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("renders elements with correct attributes", () => {
  it("should render a profile link with appropriate url", () => {
    const linkElement = screen.getByTestId("profile-menu");
    expect(linkElement).toHaveAttribute("href", "/profile");
  });

  it("should render a default profile image with alt tag", () => {
    const linkElement = screen.getByRole("img");
    expect(linkElement).toHaveAttribute("src", ProfileImg);
    expect(linkElement).toHaveAttribute(
      "alt",
      "Colourful wolf standing on a mountain top."
    );
  });
});
