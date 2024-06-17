import { describe, it, expect, vi } from "vitest";
import PostForgotPwdReset from "../PostForgotPwdReset";
import ServerAPI from "../../../api/userAPI";

const mockResponse = { verified: true };

const spy = vi
  .spyOn(ServerAPI, "post")
  .mockResolvedValue({ data: mockResponse });

describe("handles post request correctly", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      setIsReset: vi.fn(),
      setError: vi.fn(),
      email: "test@example.com",
      password: "password123",
      setIsAuthenticated: vi.fn(),
    };

    await PostForgotPwdReset(props);

    expect(spy).toHaveBeenCalledWith("/reset-pwd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: props.email,
        password: props.password,
      },
    });
  });

  it("should set reset status correctly", async () => {
    const props = {
      setIsReset: vi.fn(),
      setError: vi.fn(),
      email: "test@example.com",
      password: "password123",
      setIsAuthenticated: vi.fn(),
    };

    const result = await PostForgotPwdReset(props);

    expect(result).toEqual(mockResponse);
  });
});
