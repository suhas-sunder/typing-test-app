import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavLinks from "../NavLinks";

const MockNavLinks = () => {
  render(
    <BrowserRouter>
      <NavLinks />
    </BrowserRouter>
  );
};

describe("navigation", () => {
  it("should link to relevant page", () => {
    MockNavLinks();
  });

  it("should render x links", () => {
    MockNavLinks();
  });

  it("should have class property if addClass prop has a value", () => {
    MockNavLinks();
  });
});
