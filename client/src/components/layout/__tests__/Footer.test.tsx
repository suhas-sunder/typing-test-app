import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Footer from "../Footer";

const mockFooter = () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
};

beforeEach(() => {
  mockFooter();
});

describe("check if all elements render", async () => {
  it("should render a logo link", () => {
    const linkElement = screen.getByRole("link", { name: /.com/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("should render 7 links that link to relevant page", () => {
    const linkElements = screen.getAllByRole("link");
    expect(linkElements).toHaveLength(8);
  });

  it("should render footer text", () => {
    const textElement = screen.getByText(/FreeTypingCamp - All Rights/i);
    expect(textElement).toBeInTheDocument();
  });
});
