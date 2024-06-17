import { describe, it, expect, vi } from "vitest";
import GetTotalScore from "../GetTotalScore";
import AccountAPI from "../../../api/accountAPI";

const mockResponse = { totalscore: 100 };

const spy = vi
  .spyOn(AccountAPI, "get")
  .mockResolvedValue({ data: mockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL", async () => {
    const props = {
      userId: "123",
    };

    await GetTotalScore(props);

    expect(spy).toHaveBeenCalledWith("/totalscore", {
      method: "GET",
      params: {
        userId: props.userId,
      },
    });
  });

  it("should return total score correctly", async () => {
    const props = {
      userId: "123",
    };

    const result = await GetTotalScore(props);

    expect(result).toEqual(mockResponse.totalscore);
  });
});
