import { describe, it, expect, vi } from "vitest";
import GetWeeklyStats from "../GetWeeklyStats";
import AccountAPI from "../../../api/accountAPI";

const mockResponse = { weeklyStats: "Mocked weekly stats" };

const spy = vi
  .spyOn(AccountAPI, "get")
  .mockResolvedValue({ data: mockResponse });

describe("GetWeeklyStats function", () => {
  it("should make a GET request to the specified URL with correct parameters", async () => {
    const props = {
      userId: "123",
      startDate: "2024-01-01",
      endDate: "2024-01-07",
    };

    await GetWeeklyStats(props);

    expect(spy).toHaveBeenCalledWith("/weekly-stats", {
      method: "GET",
      params: {
        userId: props.userId,
        startDate: props.startDate,
        endDate: props.endDate,
      },
    });
  });

  it("should return weekly stats correctly", async () => {
    const props = {
      userId: "123",
      startDate: "2024-01-01",
      endDate: "2024-01-07",
    };

    const result = await GetWeeklyStats(props);

    expect(result).toEqual(mockResponse);
  });
});
