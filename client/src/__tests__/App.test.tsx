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

// Still in the process of making a lot of changes to app so leaving some placeholders for now for tests I need to implement in the near future

describe("Authentication", () => {
  it("should render Profile link when authenticated", async () => {
    // Check if the Profile link is rendered when authenticated
  });

  it("should not render Profile link when not authenticated", async () => {
    // Test implementation
  });
});

describe("Page Transitions", () => {
  it("should change background color for specific pages", async () => {
    // Test implementation
  });
});

describe("Navigation Links Rendering", () => {
  it("should render Home link", async () => {
    // Test implementation
  });

  it("should render Games link", async () => {
    // Test implementation
  });

  it("should render Lessons link", async () => {
    // Test implementation
  });

  // Add tests for other navigation links...
});

describe("Protected Routes", () => {
  it("should render Profile page for authenticated users", async () => {
    // Test implementation
  });

  it("should redirect unauthenticated users to the Login page", async () => {
    // Test implementation
  });

  // Add more tests for other protected routes...
});

describe("Error Handling", () => {
  it("should display error message for network errors", async () => {
    // Test implementation
  });

  it("should handle API failures gracefully", async () => {
    // Test implementation
  });

  // Add more tests for other error scenarios...
});

describe("Accessibility", () => {
  it("should have appropriate labels for input fields", async () => {
    // Test implementation
  });

  it("should be navigable using keyboard", async () => {
    // Test implementation
  });

  // Add more accessibility tests...
});

describe("Responsive Design", () => {
  it("should display correctly on small screens", async () => {
    // Test implementation
  });

  it("should adjust layout for different screen sizes", async () => {
    // Test implementation
  });

  // Add more tests for responsiveness...
});
