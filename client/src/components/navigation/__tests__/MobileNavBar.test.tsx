import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileNavBar from "../MobileNavBar";
import { BrowserRouter } from "react-router-dom";

const MockMobileNavBar = () => {
  render(
    <BrowserRouter>
      <MobileNavBar />
    </BrowserRouter>
  );
};

describe("navigation", () => {
  it("should link to relevant page", () => {
    MockMobileNavBar();
  });
});
