import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

const MockApp = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

// runs a cleanup after each test case (e.g. clearing jsdom)
describe("renders all page elements", () => {
  it("should render nav bar with logo link", () => {
    render(<MockApp />);
    const linkElements = screen.getAllByRole("link", {
      name: /freetypingcamp/i,
    });
    linkElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(linkElements).toHaveLength(2);
  });

  it("should render footer component with copyright info", () => {
    render(<MockApp />);
    const footerElement = screen.getByText(/2023 | FreeTypingCamp/i);
    expect(footerElement).toBeInTheDocument();
  });
});
