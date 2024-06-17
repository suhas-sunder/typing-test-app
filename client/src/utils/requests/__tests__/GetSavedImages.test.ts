import { describe, it, expect, vi } from "vitest";
import GetSavedImages from "../GetSavedImages";
import ImageAPI from "../../../api/imageAPI";

const mockResponse = { savedImages: "Mocked saved images" };

const spy = vi.spyOn(ImageAPI, "get").mockResolvedValue({ data: mockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL", async () => {
    const props = {
      userId: "123",
    };

    await GetSavedImages(props);

    expect(spy).toHaveBeenCalledWith("/defaults", {
      method: "GET",
      params: {
        userId: props.userId,
      },
    });
  });

  it("should return saved images correctly", async () => {
    const props = {
      userId: "123",
    };

    const result = await GetSavedImages(props);

    expect(result).toEqual(mockResponse);
  });
});
