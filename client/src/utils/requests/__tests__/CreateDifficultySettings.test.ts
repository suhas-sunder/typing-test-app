import { describe, it, expect, vi } from "vitest";
import CreateDifficultySettings from "../CreateDifficultySettings";
import SettingsAPI from "../../../api/settingsAPI";

const mockResponse = { data: { success: true } };

// Mock SettingsAPI.post method
const spy = vi.spyOn(SettingsAPI, "post").mockResolvedValue(mockResponse);

describe("handles post request correctly", () => {
  it("should make a POST request to /difficulty with correct data", async () => {
    const props = {
      id: "123",
      name: "Easy",
      settings: ["setting1", "setting2"],
      difficultyLevel: "easy",
      selected: true,
      isDefault: false,
      scoreBonus: 10,
    };

    await CreateDifficultySettings(props);

    expect(spy).toHaveBeenCalledWith("/difficulty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: props.name,
        settings: props.settings,
        difficultyLevel: props.difficultyLevel,
        selected: props.selected,
        isDefault: props.isDefault,
        userId: props.id,
        scoreBonus: props.scoreBonus,
      },
    });
  });

  it("should make a POST request to /difficulty with correct data and return success", async () => {
    const props = {
      id: "123",
      name: "Easy",
      settings: ["setting1", "setting2"],
      difficultyLevel: "easy",
      selected: true,
      isDefault: false,
      scoreBonus: 10,
    };

    const result = await CreateDifficultySettings(props);

    expect(result).toEqual({ success: true });
  });
});
