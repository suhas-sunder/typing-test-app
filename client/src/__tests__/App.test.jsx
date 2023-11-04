import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

const mockApp = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

beforeEach(() => {
  mockApp();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
describe("renders all page elements", () => {
  it("should render nav bar and footer with logo link", () => {
    const linkElements = screen.getAllByRole("link", {
      name: /.com/i,
    });

    linkElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(linkElements).toHaveLength(2);
  });

  it("should render footer component with copyright info", () => {
    const footerElement = screen.getByText(/2023 | FreeTypingCamp/i);
    expect(footerElement).toBeInTheDocument();
  });
});
