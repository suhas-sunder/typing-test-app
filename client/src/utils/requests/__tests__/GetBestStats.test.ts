import { describe, it, expect, vi } from "vitest";
import GetBestStats from "../GetBestStats";
import AccountAPI from "../../../api/accountAPI";

const mockResponse = { data: { success: true } };

// Mock AccountAPI.get method
const spy = vi.spyOn(AccountAPI, "get").mockResolvedValue(mockResponse);

describe("handles get request correctly", () => {
  it("should make a GET request to /best-stats with correct data", async () => {
    // Data to pass to GetBestStats function
    const props = {
      userId: "123",
      testName: "test",
      difficultyLevel: "easy",
    };

    await GetBestStats(props);

    expect(spy).toHaveBeenCalledWith("/best-stats", {
      method: "GET",
      params: {
        userId: props.userId,
        test_name: props.testName,
        difficulty_name: props.difficultyLevel,
      },
    });
  });

  it("should make a GET request to /best-stats with correct data and return success", async () => {
    const props = {
      userId: "123",
      testName: "test",
      difficultyLevel: "easy",
    };

    const result = await GetBestStats(props);

    expect(result).toEqual({ success: true });
  });
});
