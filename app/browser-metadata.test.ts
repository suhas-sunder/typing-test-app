import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";
import { ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";

describe("browser identity metadata", () => {
  it("preserves the verified legacy favicon and Apple touch artwork byte-for-byte", () => {
    const root = process.cwd();
    expect(readFileSync(join(root, "public/favicon.ico"))).toEqual(
      readFileSync(join(root, "client/src/assets/images/myfavicon.ico")),
    );
    expect(readFileSync(join(root, "public/apple-touch-icon.png"))).toEqual(
      readFileSync(join(root, "client/src/assets/images/apple-touch-icon-152x152.png")),
    );
  });

  it("publishes the icon set, manifest, theme colour, and AdSense account tag", () => {
    const layout = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
    expect(layout).toContain('manifest: "/manifest.webmanifest"');
    expect(layout).toContain('url: "/favicon.ico"');
    expect(layout).toContain('url: "/apple-touch-icon.png"');
    expect(layout).toContain('"google-adsense-account": ADSENSE_PUBLISHER_ID');
    expect(ADSENSE_PUBLISHER_ID).toBe("ca-pub-4810616735714570");
    expect(manifest()).toMatchObject({
      name: "Free Typing Camp",
      start_url: "/",
      background_color: "#f5efe5",
      theme_color: "#f5efe5",
    });
  });
});
