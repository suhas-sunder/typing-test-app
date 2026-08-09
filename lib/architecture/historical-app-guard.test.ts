import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

type PackageManifest = {
  private?: boolean;
  scripts?: Record<string, string>;
};

type TsConfig = {
  exclude?: string[];
};

const repositoryRoot = process.cwd();
const blockedCommand = "npm run historical:blocked";

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function readTomlSections(path: string) {
  const sections: Record<string, Record<string, string>> = {};
  let currentSection: string | undefined;

  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const sectionMatch = line.match(/^\[([^\[\]]+)\]$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      sections[currentSection] ??= {};
      continue;
    }

    if (line.startsWith("[")) {
      currentSection = undefined;
      continue;
    }

    const assignmentMatch = line.match(/^([A-Za-z][\w-]*)\s*=\s*"([^"]*)"$/);
    if (currentSection && assignmentMatch) {
      sections[currentSection][assignmentMatch[1]] = assignmentMatch[2];
    }
  }

  return sections;
}

describe("historical application deployment guards", () => {
  it("keeps the active root release contract independent of historical apps", () => {
    const rootManifest = readJson<PackageManifest>(
      join(repositoryRoot, "package.json"),
    );
    const tsConfig = readJson<TsConfig>(join(repositoryRoot, "tsconfig.json"));

    expect(tsConfig.exclude).toEqual(
      expect.arrayContaining(["client", "server"]),
    );
    expect(Object.values(rootManifest.scripts ?? {})).not.toEqual(
      expect.arrayContaining([
        expect.stringMatching(/(?:--prefix|--workspace)\s+(?:client|server)/),
      ]),
    );
  });

  it("blocks normal client execution while retaining explicit historical commands", () => {
    const manifest = readJson<PackageManifest>(
      join(repositoryRoot, "client", "package.json"),
    );

    expect(manifest.private).toBe(true);
    expect(manifest.scripts).toMatchObject({
      dev: blockedCommand,
      build: blockedCommand,
      preview: blockedCommand,
      "dev:historical": "vite --port 3000",
      "build:historical": "tsc && vite build",
      "preview:historical": "vite preview",
    });
  });

  it("makes the historical client Netlify configuration fail closed", () => {
    const netlifyConfig = readTomlSections(
      join(repositoryRoot, "client", "netlify.toml"),
    );

    expect(netlifyConfig.build).toMatchObject({
      command: blockedCommand,
      publish: "historical-deployment-disabled",
    });
    expect(netlifyConfig.dev).toMatchObject({ command: blockedCommand });
  });

  it("blocks normal server execution while retaining the original behavior explicitly", () => {
    const manifest = readJson<PackageManifest>(
      join(repositoryRoot, "server", "package.json"),
    );

    expect(manifest.private).toBe(true);
    expect(manifest.scripts).toMatchObject({
      build: blockedCommand,
      prestart: blockedCommand,
      start: blockedCommand,
      preserve: blockedCommand,
      serve: blockedCommand,
      "build:historical": "rimraf dist && npx tsc",
      "start:historical":
        "npm run build:historical && nodemon dist/server.js",
      "serve:historical":
        'npm run build:historical && concurrently "npx tsc -w" & "NODE_ENV=production nodemon dist/server.js"',
    });
  });
});
