import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { MemoryRouter } from "react-router-dom";

const MockFooter = () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
};

describe("navigation", async () => {
  it("should have 7 links that link to relevant page", () => {
    MockFooter();
    const linkElements = screen.getAllByRole("link");
    expect(linkElements).toHaveLength(7);
  });
});
