import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import LogoutBtn from "../LogoutBtn";

interface PropType {
  customStyle: string;
}

const MockLoginLinks = ({ customStyle }: PropType) => {
  render(
    <MemoryRouter>
      <LogoutBtn iconStyle="" customStyle={customStyle} />
    </MemoryRouter>,
  );
};

const customStyle = "";

beforeEach(() => {
  MockLoginLinks({ customStyle });
});

describe("renders all elements", () => {
  it("should render a button with appropriate text", () => {
    const btnElement = screen.getByRole("button", {
      name: /logout/i,
    });
    expect(btnElement).toBeInTheDocument();
  });

  it("should render a an icon for the button", async () => {
    const iconElement = await screen.findByTitle(/icon/i);
    expect(iconElement).toBeInTheDocument();
  });
});
