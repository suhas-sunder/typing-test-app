import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";
import { ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";

const ACTIVE_ASSET_SHA256 = {
  "app/fonts/Lato-Regular.woff2":
    "2b77bcd1b4117373d5eb9270517693dbbae13a8413895119a5d47fccabf06b58",
  "app/fonts/Nunito-Bold.woff2":
    "5658e56537184ce33a887abfa23697176dff2e08684fa6b2bac9a698e72c0241",
  "public/favicon.ico":
    "7aa5560b21cc2a55170cda5ee419450393294606dc2ec1b89c98e1ac6e8c5c58",
  "public/apple-touch-icon.png":
    "ba6cdae3a650b21ff2f4d7e07e953a4a4442acd88b6da007e4aa16796fb83bda",
} as const;

function fileSha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

describe("browser identity metadata", () => {
  it("preserves active browser asset fingerprints", () => {
    const root = process.cwd();

    for (const [relativePath, expectedHash] of Object.entries(
      ACTIVE_ASSET_SHA256,
    )) {
      expect(fileSha256(join(root, relativePath))).toBe(expectedHash);
    }
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
