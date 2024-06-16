import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { MenuContext } from "../providers/MenuProvider";
import { AuthContext } from "../providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

const mockSetId = vi.fn();

const mockApp = () => {
  render(
    <BrowserRouter>
      <HelmetProvider>
        <MenuContext.Provider
          value={{
            setId: mockSetId,
            difficultyPoints: {},
            difficultySettings: {},
            id: "diff id",
            currentDifficulty: "medium",
            setDifficultySettings: vi.fn(),
            handleUpdateDatabase: vi.fn(),
            setAuth: vi.fn(),
          }}
        >
          <AuthContext.Provider
            value={{
              isAuthenticated: false,
              setIsAuthenticated: vi.fn(),
              setUserId: vi.fn(),
              userId: "test id",
              setUserName: vi.fn(),
              setEmail: vi.fn(),
              userName: "test name",
              email: "email@test.com",
            }}
          >
            <App />
          </AuthContext.Provider>
        </MenuContext.Provider>
      </HelmetProvider>
    </BrowserRouter>,
  );
};

beforeEach(() => {
  mockApp();
});


describe("renders all page elements", () => {
  it("should render nav bar and footer with logo link", async () => {
    const linkElement = await screen.findByRole("navigation");
    expect(linkElement).toBeInTheDocument();
  });

  it("should render home page", async () => {
    const linkElement = await screen.findByTestId("home-pg");
    expect(linkElement).toBeInTheDocument();
  });

  it("should render at least one image", async () => {
    const imgElements = await screen.findAllByRole("img");
    expect(imgElements.length).toBeGreaterThan(0);
  });

  it("should render at least one complete logo", async () => {
    const svgElements = await screen.findAllByTestId(/logo-name/i);
    const svgElement2 = await screen.findAllByTestId(/logo-com/i);
    expect(svgElements.length).toBeGreaterThan(0);
    expect(svgElement2.length).toBeGreaterThan(0);
  });

  it("should render footer component with copyright info", async () => {
    const footerElement = await screen.findByText(/2023/i);
    expect(footerElement).toBeInTheDocument();
  });
});
