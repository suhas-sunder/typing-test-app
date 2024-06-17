import { describe, it, expect, vi } from "vitest";
import DeleteDifficultySettings from "../DeleteDifficultySettings";
import SettingsAPI from "../../../api/settingsAPI";

const mockResponse = { data: { success: true } };

// Mock SettingsAPI.delete method
const spy = vi.spyOn(SettingsAPI, "delete").mockResolvedValue(mockResponse);

describe("handles delete request correctly", () => {
  it("should make a DELETE request to /difficulty with correct data", async () => {
    const props = {
      id: "123",
      name: "Easy",
    };

    await DeleteDifficultySettings(props);

    expect(spy).toHaveBeenCalledWith("/difficulty", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: props.name,
        userId: props.id,
      },
    });
  });

  it("should make a DELETE request to /difficulty with correct data and return success", async () => {
    const props = {
      id: "123",
      name: "Easy",
    };

    const result = await DeleteDifficultySettings(props);

    expect(result).toEqual({ success: true });
  });
});
