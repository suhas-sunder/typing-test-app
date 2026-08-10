import { expect, test } from "./fixtures";

test("legacy policy aliases redirect permanently to their canonical pages", async ({
  request,
}) => {
  const redirects = [
    ["/cookiespolicy", "/cookies"],
    ["/privacypolicy", "/privacy"],
    ["/termsofservice", "/terms"],
  ] as const;

  for (const [source, destination] of redirects) {
    const sourceResponse = await request.get(source, { maxRedirects: 0 });
    expect(sourceResponse.status()).toBe(308);
    expect(new URL(sourceResponse.headers().location).pathname).toBe(
      destination,
    );

    const destinationResponse = await request.get(destination, {
      maxRedirects: 0,
    });
    expect(destinationResponse.status()).toBe(200);
    expect(await destinationResponse.text()).toContain(
      `rel="canonical" href="https://freetypingcamp.com${destination}"`,
    );
  }
});

test("retired account, password, and profile pages return real 410 responses", async ({
  request,
}) => {
  for (const pathname of ["/login", "/forgot-password", "/profile/stats"]) {
    const response = await request.get(pathname, { maxRedirects: 0 });
    expect(response.status()).toBe(410);
    expect(response.headers().location).toBeUndefined();
    expect(response.headers()["x-robots-tag"]).toBe("noindex, follow");
    expect(await response.text()).toContain("This old page has been retired.");
  }
});

test("verified historical lessons redirect to the precise current skill destination", async ({
  request,
}) => {
  const redirects = [
    ["/lessons/lesson/1/sec-1/lvl-1", "/lessons/home-row"],
    [
      "/lessons/lesson/home-row/lesson/home-row-f-j",
      "/lessons/lesson/home-row/lesson/beginner-f-j-space",
    ],
  ] as const;

  for (const [source, destination] of redirects) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(new URL(response.headers().location).pathname).toBe(destination);
    expect((await request.get(destination, { maxRedirects: 0 })).status()).toBe(
      200,
    );
  }
});

test("retired lessons and APIs stay gone while ambiguous and current routes are unaffected", async ({
  request,
}) => {
  const retiredLesson = await request.get("/lessons/lesson/7/sec-1/lvl-1", {
    maxRedirects: 0,
  });
  expect(retiredLesson.status()).toBe(410);
  expect(retiredLesson.headers().location).toBeUndefined();

  const retiredApi = await request.get("/v1/api/user/is-verify", {
    maxRedirects: 0,
  });
  expect(retiredApi.status()).toBe(410);
  expect(retiredApi.headers()["content-type"]).toContain("application/json");
  await expect(retiredApi.json()).resolves.toMatchObject({
    error: "Gone",
    status: 410,
  });

  expect(
    (
      await request.get("/lessons/lesson/3/sec-5/lvl-1", {
        maxRedirects: 0,
      })
    ).status(),
  ).toBe(404);
  expect(
    (await request.get("/typing-test", { maxRedirects: 0 })).status(),
  ).toBe(200);
});
