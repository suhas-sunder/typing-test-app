import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Footer from "../../../ui/navigation/Footer";

interface PropType {
  isAuthenticated: boolean;
}

const MockFooter = ({ isAuthenticated }: PropType) => {
  render(
    <MemoryRouter>
      <Footer isAuthenticated={isAuthenticated} />
    </MemoryRouter>,
  );
};

const isAuthenticated = false;

beforeEach(() => {
  MockFooter({ isAuthenticated });
});

describe("check if all elements render", () => {
  it("should render at least one complete logo", async () => {
    const svgElements = await screen.findByTestId(/logo-name/i);
    const svgElement2 = await screen.findByTestId(/logo-com/i);
    expect(svgElements).toBeInTheDocument();
    expect(svgElement2).toBeInTheDocument();
  });

  it("should render 7 links that link to relevant page", () => {
    const linkElements = screen.getAllByRole("link");
    expect(linkElements).toHaveLength(10);
  });

  it("should render footer text", () => {
    const textElement = screen.getByText(/FreeTypingCamp - All Rights/i);
    expect(textElement).toBeInTheDocument();
  });
});
