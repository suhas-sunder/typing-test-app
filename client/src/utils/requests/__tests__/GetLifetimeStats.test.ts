import { describe, it, expect, vi } from "vitest";
import GetLifetimeStats from "../GetLifetimeStats";
import AccountAPI from "../../../api/accountAPI";

const mockResponse = { lifetimeStats: "Mocked lifetime stats" };

const spy = vi
  .spyOn(AccountAPI, "get")
  .mockResolvedValue({ data: mockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL", async () => {
    const props = {
      userId: "123",
    };

    await GetLifetimeStats(props);

    expect(spy).toHaveBeenCalledWith("/lifetime-stats", {
      method: "GET",
      params: {
        userId: props.userId,
      },
    });
  });

  it("should return lifetime stats correctly", async () => {
    const props = {
      userId: "123",
    };

    const result = await GetLifetimeStats(props);

    expect(result).toEqual(mockResponse);
  });
});
