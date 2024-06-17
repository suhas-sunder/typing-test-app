import { describe, it, expect, vi } from "vitest";
import GetVerifyAuth from "../GetVerifyAuth";
import userAPI from "../../../api/userAPI";

const mockResponse = { verified: true };

const spy = vi.spyOn(userAPI, "get").mockResolvedValue({ data: mockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL with correct headers", async () => {
    await GetVerifyAuth();

    expect(spy).toHaveBeenCalledWith("/is-verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    });
  });

  it("should return verification status correctly", async () => {
    const result = await GetVerifyAuth();

    expect(result).toEqual(mockResponse);
  });
});
