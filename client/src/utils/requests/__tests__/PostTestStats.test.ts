import { describe, it, expect, vi } from "vitest";
import PostTestStats from "../PostTestStats";
import AccountAPI from "../../../api/accountAPI";

const mockResponse = { success: true };

const spy = vi
  .spyOn(AccountAPI, "post")
  .mockResolvedValue({ data: mockResponse });

describe("PostTestStats function", () => {
  const props = {
    test_time_sec: 60,
    wpm: 100,
    cpm: 500,
    test_score: 95,
    total_chars: 600,
    correct_chars: 580,
    misspelled_chars: 20,
    test_accuracy: 97,
    difficultyScore: 10,
    difficultyLevel: "hard",
    test_name: "Speed Test",
    user_id: "user123",
    difficulty_name: "High",
    difficulty_settings: ["setting1", "setting2"],
  };

  it("should make a POST request to the specified URL with correct data and headers", async () => {
    await PostTestStats(props);

    expect(spy).toHaveBeenCalledWith("/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...props,
        screen_size_info: `screen height: ${window.screen.height}px + screen width: ${window.screen.width}px`,
      },
    });
  });

  it("should return 'update header score' on successful response", async () => {
    const result = await PostTestStats(props);

    expect(result).toBe("update header score");
  });
});
