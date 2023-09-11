import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";
import { BrowserRouter } from "react-router-dom";

// Double check if browserrouter is actually necessary now that your importing from NavLinks.
const MockNavBar = () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
};

describe("navigation", () => {
  it("should render # of links", () => {
    MockNavBar();
  });

  it("should render no links when screen is small", () => {
    MockNavBar();
  });

  it("should render logo when screen is small", () => {
    MockNavBar();
  });

  it("should render burger icon when screen is small", () => {
    MockNavBar();
  });

  it("should render links and display underlay when burger menu is toggled open", () => {
    MockNavBar();
  });

  it("should render no links when burger menu is toggled close", () => {
    MockNavBar();
  });
});
