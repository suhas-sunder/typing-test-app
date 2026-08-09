import { expect, test as base } from "@playwright/test";

type RuntimeErrorFixtures = {
  runtimeErrorMonitor: void;
};

export const test = base.extend<RuntimeErrorFixtures>({
  runtimeErrorMonitor: [
    async ({ page }, use) => {
      const failures: string[] = [];
      await page.exposeFunction(
        "__ftcReportCspViolation",
        (violation: { blockedUri: string; effectiveDirective: string }) => {
          failures.push(
            `csp violation: ${violation.effectiveDirective} blocked ${violation.blockedUri || "inline resource"}`,
          );
        },
      );
      await page.addInitScript(() => {
        document.addEventListener("securitypolicyviolation", (event) => {
          const report = (
            window as unknown as {
              __ftcReportCspViolation: (violation: {
                blockedUri: string;
                effectiveDirective: string;
              }) => Promise<void>;
            }
          ).__ftcReportCspViolation;
          void report({
            blockedUri: event.blockedURI,
            effectiveDirective: event.effectiveDirective,
          });
        });
      });
      const onConsole = (message: { type(): string; text(): string }) => {
        if (message.type() === "error") {
          failures.push(`console.error: ${message.text()}`);
        }
      };
      const onPageError = (error: Error) => {
        failures.push(`pageerror: ${error.message}`);
      };
      const onCrash = () => {
        failures.push("page crashed");
      };

      page.on("console", onConsole);
      page.on("pageerror", onPageError);
      page.on("crash", onCrash);

      await use();

      page.off("console", onConsole);
      page.off("pageerror", onPageError);
      page.off("crash", onCrash);
      expect(failures, failures.join("\n")).toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
