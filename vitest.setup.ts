import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

class TestResizeObserver implements ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
  configurable: true,
  value: TestResizeObserver,
});

Object.defineProperty(globalThis, "requestAnimationFrame", {
  configurable: true,
  value: (callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 0),
});

Object.defineProperty(globalThis, "cancelAnimationFrame", {
  configurable: true,
  value: (handle: number) => window.clearTimeout(handle),
});
