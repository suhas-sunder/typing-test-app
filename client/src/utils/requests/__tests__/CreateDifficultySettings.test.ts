import { describe, it, expect } from "vitest";
import CreateDifficultySettings from "../CreateDifficultySettings";
import mockSettingsAPI from "../../../mocks/api/mockSettingsAPI";

const customMockResponse = { success: true };

const { spyPost } = mockSettingsAPI({ customMockResponse });

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

    expect(spyPost).toHaveBeenCalledWith("/difficulty", {
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
