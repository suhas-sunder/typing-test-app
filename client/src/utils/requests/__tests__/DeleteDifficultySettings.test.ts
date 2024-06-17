import { describe, it, expect } from "vitest";
import DeleteDifficultySettings from "../DeleteDifficultySettings";
import mockSettingsAPI from "../../../mocks/api/mockSettingsAPI";

const customMockResponse = { success: true };

const { spyDelete } = mockSettingsAPI({ customMockResponse });

describe("handles delete request correctly", () => {
  it("should make a DELETE request to /difficulty with correct data", async () => {
    const props = {
      id: "123",
      name: "Easy",
    };

    await DeleteDifficultySettings(props);

    expect(spyDelete).toHaveBeenCalledWith("/difficulty", {
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
