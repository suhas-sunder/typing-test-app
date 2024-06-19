/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import settingsAPI from "../../api/settingsAPI";

interface PropType {
  customMockResponse?: { [key: string]: any };
}

//Mock all possible api routes that can be hit when switching routes so the actual api's are not called
export default function mockSettingsAPI({ customMockResponse }: PropType) {
  const mockResponse = { result: true };

  const spyGet = vi.spyOn(settingsAPI, "get").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyPost = vi.spyOn(settingsAPI, "post").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyDelete =vi.spyOn(settingsAPI, "delete").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  return {spyGet, spyPost, spyDelete}
}
