import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export const PROGRESS_STORAGE_KEY = "freeTypingCamp.progress.v5";

export async function passageText(page: Page) {
  const text = await page.getByTestId("typing-text-stream").textContent();
  return (text ?? "").replaceAll("\u00a0", " ");
}

export async function currentCharacter(page: Page) {
  const text = await page.locator('[data-current="true"]').textContent();
  return (text ?? "").replaceAll("\u00a0", " ");
}

export async function typePassage(page: Page, text?: string) {
  const input = page.getByRole("textbox", { name: "Typing input" });
  await input.focus();
  await input.pressSequentially(text ?? (await passageText(page)));
}

export async function expectNoSeriousAxeViolations(page: Page) {
  const builder = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22aa",
  ]);

  const results = await builder.analyze();
  const violations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );
  const details = violations
    .map(
      (violation) =>
        `${violation.id} (${violation.impact}): ${violation.help}\n${violation.nodes
          .map((node) => `  ${node.target.join(" ")}: ${node.failureSummary ?? ""}`)
          .join("\n")}`,
    )
    .join("\n\n");

  expect(violations, details).toEqual([]);
}
