import { PageFrame } from "@/components/page-frame";
import type { Metadata } from "next";
import { CalculatorSprint } from "@/components/games/calculator-sprint";
import { AdPlacement } from "@/components/ads/ad-placement";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/games/calculator",
  title: "Calculator Sprint | Numeric Expression Typing",
  description: "Practise accurate number-row and calculator-expression typing in five short rounds, with clean rounds rewarded before raw speed.",
});

export default function CalculatorPage() {
  return (
    <PageFrame routeFamily="calculator">
      <CalculatorSprint />
      <div className="pt-[150px]"><AdPlacement placement="below_header_or_tool" /></div>
      <section className="section-pad bg-camp-paper" aria-labelledby="calculator-method-heading">
        <div className="page-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Numeric accuracy</p>
            <h2 id="calculator-method-heading" className="heading-md mt-2">Type each expression exactly.</h2>
            <p className="mt-4 leading-7 text-camp-muted">Calculator Sprint practices the number row and common operators. Clean rounds earn more than corrected rounds, and a run ends after five expressions or when all lives are used.</p>
          </div>
          <div>
            <p className="eyebrow">Continue learning</p>
            <h2 className="heading-md mt-2">Slow down when symbols cause mistakes.</h2>
            <p className="mt-4 leading-7 text-camp-muted">Use <Link className="font-black text-camp-coral underline underline-offset-4" href="/lessons/numbers-symbols">numbers and symbols lessons</Link> or <Link className="font-black text-camp-coral underline underline-offset-4" href="/typing-practice/numbers-symbols">focused number-row practice</Link> before trying another sprint.</p>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
