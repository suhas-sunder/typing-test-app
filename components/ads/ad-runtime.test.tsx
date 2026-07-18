import { StrictMode } from "react";
import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AdRuntimeProvider, initializeAdUnit } from "@/components/ads/ad-runtime";
import { ADSENSE_LOADER_ID, ADSENSE_LOADER_URL } from "@/lib/ads/config";

function Runtime({ mode = "live" as const }: { mode?: "live" | "placeholder" | "off" }) {
  return (
    <AdRuntimeProvider mode={mode} placeholderState="placeholder" routeFamily="home">
      <div>page</div>
    </AdRuntimeProvider>
  );
}

afterEach(() => {
  document.getElementById(ADSENSE_LOADER_ID)?.remove();
  delete (window as Window & { adsbygoogle?: unknown }).adsbygoogle;
  vi.restoreAllMocks();
});

describe("AdSense loader owner", () => {
  it("loads the exact script once in live mode", async () => {
    const { rerender } = render(<Runtime />);
    await waitFor(() => expect(document.querySelectorAll(`#${ADSENSE_LOADER_ID}`)).toHaveLength(1));
    expect(document.getElementById(ADSENSE_LOADER_ID)).toHaveAttribute("src", ADSENSE_LOADER_URL);
    rerender(<Runtime />);
    expect(document.querySelectorAll(`#${ADSENSE_LOADER_ID}`)).toHaveLength(1);
  });

  it("does not duplicate the loader in Strict Mode", async () => {
    render(<StrictMode><Runtime /></StrictMode>);
    await waitFor(() => expect(document.querySelectorAll(`#${ADSENSE_LOADER_ID}`)).toHaveLength(1));
  });

  it("does not load in placeholder, off, or ad-free route modes", async () => {
    const { rerender } = render(<Runtime mode="placeholder" />);
    rerender(<Runtime mode="off" />);
    render(
      <AdRuntimeProvider mode="live" placeholderState="placeholder" routeFamily="progress">
        <div>progress</div>
      </AdRuntimeProvider>,
    );
    await Promise.resolve();
    expect(document.getElementById(ADSENSE_LOADER_ID)).toBeNull();
  });

  it("marks a blocked loader without throwing or retrying", async () => {
    render(<Runtime />);
    const script = await waitFor(() => document.getElementById(ADSENSE_LOADER_ID) as HTMLScriptElement);
    expect(() => script.dispatchEvent(new Event("error"))).not.toThrow();
    expect(script.dataset.loadState).toBe("blocked");
    expect(document.querySelectorAll(`#${ADSENSE_LOADER_ID}`)).toHaveLength(1);
  });
});

describe("ad unit initialization", () => {
  it("pushes once for one eligible mounted unit and freezes its requested size", () => {
    const reservation = document.createElement("div");
    reservation.dataset.adReservation = "below_header_or_tool";
    const element = document.createElement("ins");
    reservation.appendChild(element);
    Object.defineProperties(element, {
      offsetWidth: { configurable: true, value: 320 },
      offsetHeight: { configurable: true, value: 100 },
      getClientRects: { configurable: true, value: () => [{ width: 320, height: 100 }] },
    });
    const queue: Array<Record<string, never>> = [];
    (window as Window & { adsbygoogle?: Array<Record<string, never>> }).adsbygoogle = queue;

    expect(initializeAdUnit(element, "live")).toBe(true);
    expect(initializeAdUnit(element, "live")).toBe(false);
    expect(queue).toHaveLength(1);
    expect(element.style.width).toBe("320px");
    expect(element.style.height).toBe("100px");
    expect(reservation.style.width).toBe("320px");
    expect(reservation.style.height).toBe("100px");
  });

  it("does not request hidden or non-live units and handles initialization errors", () => {
    const hidden = document.createElement("ins");
    expect(initializeAdUnit(hidden, "live")).toBe(false);
    expect(initializeAdUnit(hidden, "placeholder")).toBe(false);

    const visible = document.createElement("ins");
    Object.defineProperties(visible, {
      offsetWidth: { configurable: true, value: 300 },
      offsetHeight: { configurable: true, value: 250 },
      getClientRects: { configurable: true, value: () => [{ width: 300, height: 250 }] },
    });
    Object.defineProperty(window, "adsbygoogle", {
      configurable: true,
      get: () => ({ push: () => { throw new Error("blocked"); } }),
      set: () => undefined,
    });
    expect(() => initializeAdUnit(visible, "live")).not.toThrow();
    expect(visible.dataset.ftcAdInitialized).toBe("failed");
    delete (window as Window & { adsbygoogle?: unknown }).adsbygoogle;
  });
});
