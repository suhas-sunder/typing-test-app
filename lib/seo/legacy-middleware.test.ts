import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { middleware } from "@/middleware";

function request(pathname: string) {
  return new NextRequest(`https://freetypingcamp.com${pathname}`);
}

describe("legacy URL middleware", () => {
  it("returns a direct permanent redirect for a proven equivalent", () => {
    const response = middleware(request("/cookiespolicy"));
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://freetypingcamp.com/cookies",
    );
    expect(response.headers.get("x-ftc-legacy-route")).toBe("redirect");
  });

  it("returns a genuine 410 page without a redirect or canonical", async () => {
    const response = middleware(request("/forgot-password"));
    expect(response.status).toBe(410);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
    expect(response.headers.get("content-type")).toContain("text/html");
    const body = await response.text();
    expect(body).toContain("410 Gone");
    expect(body).toContain("current product is local-first");
    expect(body).not.toMatch(/rel=["']canonical/i);
  });

  it("retires a known historical API as JSON before any backend can run", async () => {
    const response = middleware(request("/v1/api/user/login"));
    expect(response.status).toBe(410);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-ftc-legacy-route")).toBe("gone");
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toMatchObject({
      error: "Gone",
      status: 410,
    });
  });

  it("passes current and unknown routes through unchanged", () => {
    for (const pathname of [
      "/lessons/home-row",
      "/lessons/lesson/home-row/lesson/beginner-f-j-space",
      "/v1/api/unknown",
      "/not-a-real-route",
    ]) {
      const response = middleware(request(pathname));
      expect(response.status).toBe(200);
      expect(response.headers.get("x-middleware-next")).toBe("1");
    }
  });
});
