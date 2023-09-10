import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";
import { BrowserRouter } from "react-router-dom";

const MockNavBar = () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
};

describe("navigation", () => {
  it("should link to relevant page", () => {
    MockNavBar();
  });
});
