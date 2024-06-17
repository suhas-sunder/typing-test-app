import { describe, it, expect, vi } from "vitest";
import GetDifficultySettings from "../GetDifficultySettings";
import mockSettingsAPI from "../../../mocks/api/mockSettingsAPI";

const customMockResponse = [
  {
    name: "Easy",
    settings: ["setting1", "setting2"],
    selected: true,
    isdefault: false,
    scorebonus: 10,
    difficulty_level: "easy",
  },
];

const { spyGet } = mockSettingsAPI({ customMockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to /difficulty with correct data", async () => {
    const props = {
      id: "123",
      difficultySettings: {},
      setDifficultySettings: vi.fn(),
    };

    await GetDifficultySettings(props);

    expect(spyGet).toHaveBeenCalledWith("/difficulty", {
      method: "GET",
      params: {
        userId: props.id,
      },
    });
  });

  it("should set difficulty settings correctly", async () => {
    const props = {
      id: "123",
      difficultySettings: {},
      setDifficultySettings: vi.fn(),
    };

    await GetDifficultySettings(props);

    expect(props.setDifficultySettings).toHaveBeenCalledWith({
      Easy: {
        settings: ["setting1", "setting2"],
        difficultyLevel: "easy",
        selected: true,
        default: false,
        scoreBonus: 10,
      },
    });
  });
});
