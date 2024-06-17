/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import PostSendPwdResetEmail from "../PostSendPwdResetEmail";
import ServerAPI from "../../../api/userAPI";

const mockResponse = { success: true };

const spy = vi
  .spyOn(ServerAPI, "post")
  .mockResolvedValue({ data: mockResponse });

describe("PostSendPwdResetEmail function", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      email: "test@example.com",
      setError: vi.fn(),
      setSentEmailCount: vi.fn(),
    };

    await PostSendPwdResetEmail(props);

    expect(spy).toHaveBeenCalledWith("/send-pwd-reset-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: props.email,
      },
    });
  });

  it("should increment the sent email count on success", async () => {
    const props = {
      email: "test@example.com",
      setError: vi.fn(),
      setSentEmailCount: vi.fn(),
    };

    await PostSendPwdResetEmail(props);

    expect(props.setSentEmailCount).toHaveBeenCalledWith(expect.any(Function));
  });
});
