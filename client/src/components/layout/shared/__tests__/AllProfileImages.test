import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllProfileImages from "../AllProfileImages";
import { ImageContext } from "../../../providers/ImageProvider";
import * as useAuth from "../../hooks/useAuth";

const mockImageContext = {
  imageData: {},
  setImageData: vi.fn(),
};

const { container } = render(<AllProfileImages />);

function MockProfileImages(mockImageContext) {
  const mockUseAuth = {
    isAuthenticated: true,
    setIsAuthenticated: vi.fn(),
    setUserId: vi.fn(),
    setUserName: vi.fn(),
    userName: "testName",
    userId: "test-user-id",
    email: "test@email.com",
    setEmail: vi.fn(),
  };

  vi.spyOn(useAuth, "default").mockReturnValue(mockUseAuth);

  render(
    <ImageContext.Provider value={mockImageContext}>
      <MemoryRouter>
        <AllProfileImages />
      </MemoryRouter>
      ,
    </ImageContext.Provider>,
  );
}

beforeEach(() => {
  MockProfileImages(mockImageContext);
});
describe("renders all elements", () => {
  it("should render all images correctly within the specified itemsPerPage limit", () => {
    const images = container.querySelectorAll("img");
    expect(images.length).toBeLessThanOrEqual(18);
  });
});
