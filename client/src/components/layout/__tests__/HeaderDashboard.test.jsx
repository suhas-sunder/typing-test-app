import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import HeaderDashboard from "../HeaderDashboard";

describe("renders all header elements", () => {
  it("renders header", () => {
    render(<HeaderDashboard />);
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toBeInTheDocument();
  });
});
