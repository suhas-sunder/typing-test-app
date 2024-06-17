import { describe, it, expect, vi } from "vitest";
import GetLessonText from "../GetLessonText";
import axios from "axios";

const mockResponse = "Mocked lesson text";

const spy = vi.spyOn(axios, "get").mockResolvedValue({ data: mockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL", async () => {
    const props = {
      url: "https://example.com/lesson",
      setLessonText: vi.fn(),
    };

    await GetLessonText(props);

    expect(spy).toHaveBeenCalledWith(props.url);
  });

  it("should set lesson text correctly", async () => {
    const props = {
      url: "https://example.com/lesson",
      setLessonText: vi.fn(),
    };

    await GetLessonText(props);

    expect(props.setLessonText).toHaveBeenCalledWith(mockResponse);
  });
});
