import Link from "next/link";
import { AdPlacement } from "@/components/ads/ad-placement";
import { PageFrame } from "@/components/page-frame";

export default function LearnPage() {
  return (
    <PageFrame routeFamily="learn">
      <section className="section-pad">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Learn</p>
            <h1 className="heading-lg mt-2">Typing basics without the clutter.</h1>
            <p className="body-lg mt-4">Start with posture, finger placement, accuracy, and short daily drills.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/lessons" className="button-primary">
                Start lessons
              </Link>
              <Link href="/typing-test" className="button-secondary">
                Take a test
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AdPlacement placement="below_header_or_tool" />

      <section className="section-pad bg-camp-paper" aria-labelledby="learn-foundations-heading">
        <div className="page-shell grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Set up first</p>
            <h2 id="learn-foundations-heading" className="heading-md mt-2">Use a relaxed, repeatable position.</h2>
            <p className="mt-4 leading-7 text-camp-muted">Sit where the keyboard is comfortable, keep shoulders loose, and let the fingers curve over the keys. Find the raised F and J markers by touch, then return there after each reach.</p>
          </div>
          <div>
            <p className="eyebrow">Practise cleanly</p>
            <h2 className="heading-md mt-2">Accuracy builds the useful habit.</h2>
            <p className="mt-4 leading-7 text-camp-muted">Slow down when mistakes repeat. A controlled attempt gives your fingers a reliable pattern to remember; a rushed attempt teaches the wrong movement more quickly.</p>
          </div>
        </div>
      </section>

      <AdPlacement placement="main_content_rectangle" />

      <section className="section-pad" aria-labelledby="learn-routine-heading">
        <div className="page-shell max-w-4xl">
          <p className="eyebrow">A simple routine</p>
          <h2 id="learn-routine-heading" className="heading-md mt-2">Make short sessions easy to repeat.</h2>
          <ol className="mt-6 grid gap-4 leading-7 text-camp-muted sm:grid-cols-3">
            <li className="bg-camp-tan/45 px-5 py-5"><strong className="block text-camp-ink">1. Learn</strong>Use one staged lesson to understand the key or technique.</li>
            <li className="bg-camp-tan/45 px-5 py-5"><strong className="block text-camp-ink">2. Repeat</strong>Use focused practice when one row, hand, or symbol group needs more control.</li>
            <li className="bg-camp-tan/45 px-5 py-5"><strong className="block text-camp-ink">3. Check</strong>Take the same typing-test setup again and compare accuracy before WPM.</li>
          </ol>
          <p className="mt-7 leading-7 text-camp-muted">If accuracy falls below the target, repeat at a calmer pace. If it stays high across several attempts, move to the next lesson or a slightly harder test.</p>
        </div>
      </section>
    </PageFrame>
  );
}
