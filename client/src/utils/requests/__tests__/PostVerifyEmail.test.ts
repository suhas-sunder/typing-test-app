import { describe, it, expect, vi } from "vitest";
import PostVerifyEmail from "../PostVerifyEmail";
import ServerAPI from "../../../api/userAPI";

const mockResponse = { verified: true };

const spy = vi
  .spyOn(ServerAPI, "post")
  .mockResolvedValue({ data: mockResponse });

describe("handles post request correctly", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      emailToken: "mockEmailToken",
      setDisplayError: vi.fn(),
      setIsVerified: vi.fn(),
      setAccountDetails: vi.fn(),
    };

    await PostVerifyEmail(props);

    expect(spy).toHaveBeenCalledWith("/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        emailToken: props.emailToken,
      },
    });
  });

  it("should set verification status correctly", async () => {
    const props = {
      emailToken: "mockEmailToken",
      setDisplayError: vi.fn(),
      setIsVerified: vi.fn(),
      setAccountDetails: vi.fn(),
    };

    const result = await PostVerifyEmail(props);

    expect(result).toEqual(mockResponse);
  });
});
