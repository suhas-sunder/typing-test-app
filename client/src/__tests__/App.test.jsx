import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

const mockApp = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
};

beforeEach(() => {
  mockApp();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
describe("renders all page elements", () => {
  it("should render nav bar and footer with logo link", () => {
    const linkElement = screen.getByTestId(/logo-naviation-link/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render footer component with copyright info", async () => {
    const footerElement = await screen.findByText(/2023/i);
    expect(footerElement).toBeInTheDocument();
  });
});
