import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { BrowserRouter } from "react-router-dom";

// Double check if browserrouter is actually necessary now that your importing from NavLinks.
const MockFooter = () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
};

describe("navigation", async () => {
  it("should have 7 links that link to relevant page", () => {
    MockFooter();
    const linkElements = screen.getAllByRole("link");
    expect(linkElements).toHaveLength(7);
  });
});
