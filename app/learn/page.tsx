import Link from "next/link";
import { PageFrame } from "@/components/page-frame";

export default function LearnPage() {
  return (
    <PageFrame>
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
    </PageFrame>
  );
}
