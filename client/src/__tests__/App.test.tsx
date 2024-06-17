import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { MenuContext } from "../providers/MenuProvider";
import { AuthContext } from "../providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

const mockSetId = vi.fn();

const mockApp = ({ url }) => {
  render(
    <MemoryRouter initialEntries={[url]}>
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
            <App />,
          </AuthContext.Provider>
        </MenuContext.Provider>
      </HelmetProvider>
    </MemoryRouter>,
  );
};

describe("renders all page elements", () => {
  beforeEach(() => {
    mockApp({ url: "/" });
  });

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

describe("handles routing correctly", () => {
  it("should render Home component at root path", async () => {
    mockApp({ url: "/" });
    const textElement = await screen.findByText(/Fully Customizable/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons sidebar menu", async () => {
    mockApp({ url: "/lessons/beginner" });
    const textElements = await screen.findAllByText(/beginner/i);
    const textElement1 = await screen.findByText(/intermediate/i);
    const textElement2 = await screen.findByText(/advanced/i);
    const textElement3 = await screen.findByText(/graduation/i);
    const textElement4 = await screen.findByText(/quotes/i);
    const textElement5 = await screen.findByText(/animal facts/i);
    expect(textElements.length).toBeGreaterThan(0);
    expect(textElement1).toBeInTheDocument();
    expect(textElement2).toBeInTheDocument();
    expect(textElement3).toBeInTheDocument();
    expect(textElement4).toBeInTheDocument();
    expect(textElement5).toBeInTheDocument();
  });

  it("should render Lessons component at root path with beginner menu", async () => {
    mockApp({ url: "/lessons/beginner" });
    const textElement = await screen.findByText(/home row left hand/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with intermediate menu", async () => {
    mockApp({ url: "/lessons/intermediate" });
    const textElement = await screen.findByText(/bottom row left hand/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with advanced menu", async () => {
    mockApp({ url: "/lessons/advanced" });
    const textElement = await screen.findByText(/tricky words/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with graduation menu", async () => {
    mockApp({ url: "/lessons/graduation" });
    const textElement = await screen.findByText(/you made it/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with animal facts menu", async () => {
    mockApp({ url: "/lessons/quotes" });
    const textElement = await screen.findByText(/top ten anime quotes/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with animal facts menu", async () => {
    mockApp({ url: "/lessons/animal-facts" });
    const textElement = await screen.findByText(/animal 1/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Games component at root path", async () => {
    mockApp({ url: "/games" });
    const textElement = await screen.findByText(/typing games/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Learn component at root path", async () => {
    mockApp({ url: "/learn" });
    const textElement = await screen.findByText(/learn about typing/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Login component at root path", async () => {
    mockApp({ url: "/login" });
    const textElement = await screen.findByText(/Log in/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Register component at root path", async () => {
    mockApp({ url: "/register" });
    const textElement = await screen.findByText(/create a free account/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should redirect protected Profile component at root path to Login page", async () => {
    mockApp({ url: "/profile" });
    const textElement = await screen.findByText(/Log in/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should redirect protected Profile component at root path to Login page", async () => {
    mockApp({ url: "/profile/summary" });
    const textElement = await screen.findByText(/Log in/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should redirect protected Profile component at root path to Login page", async () => {
    mockApp({ url: "/profile/stats" });
    const textElement = await screen.findByText(/Log in/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should throw an error on unkown routes", async () => {
    mockApp({ url: "/randomroute" });
    const textElement = await screen.findByText(/404 page not found/i);
    expect(textElement).toBeInTheDocument();
  });
});
