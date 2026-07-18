import Link from "next/link";
import type { Metadata } from "next";
import { Flame, Keyboard, LineChart, Sprout } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { TypingEntry } from "@/components/typing/typing-entry";
import { AdPlacement } from "@/components/ads/ad-placement";
import { buildPageMetadata, serializeJsonLd, WEB_APPLICATION_JSON_LD } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: "FreeTypingCamp | Calm, Free Typing Practice",
  description: "Free typing practice with 45 staged lessons, focused drills, an accuracy-first typing test, Calculator Sprint, and progress kept in your browser.",
});

export default function HomePage() {
  return (
    <PageFrame routeFamily="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(WEB_APPLICATION_JSON_LD) }} />
      <section className="bg-camp-navy text-white">
        <div className="page-shell grid min-h-[36rem] items-center gap-10 py-14 lg:grid-cols-[1.1fr_24rem] lg:py-20">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-camp-orange">Free Typing Camp</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              Learn to type faster with calm, focused practice.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/72">
              A modern typing test, guided lessons, Calculator Sprint, and progress saved locally in your browser.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/typing-test" className="button-primary">
                Take a typing test
              </Link>
              <Link href="/lessons" className="button-secondary bg-white/10 text-white hover:bg-white/15">
                Browse lessons
              </Link>
              <Link href="/typing-practice" className="button-secondary bg-white/10 text-white hover:bg-white/15">
                Choose focused practice
              </Link>
            </div>
          </div>
          <TypingEntry />
        </div>
      </section>

      <AdPlacement placement="below_header_or_tool" />

      <section className="section-pad">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
            <div>
              <p className="eyebrow">Practice path</p>
              <h2 className="heading-lg mt-2">A simple loop for getting better.</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Feature icon={<Keyboard />} title="Real typing behavior" body="Timer, character focus, mistakes, WPM, accuracy, and reset all run in the app." />
              <Feature icon={<Sprout />} title="Guided lessons" body="Forty-five multi-stage lessons make progress visible without heavy dashboard clutter." />
              <Feature icon={<Flame />} title="Calculator Sprint" body="The focused calculator game builds accurate numeric input under light pressure." />
              <Feature icon={<LineChart />} title="Progress on this device" body="Completed tests, lessons, and Calculator Sprint runs stay available in this browser." />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-camp-paper" aria-labelledby="home-method-heading">
        <div className="page-shell grid items-start gap-10 lg:grid-cols-[1fr_300px_1fr]">
          <div>
            <p className="eyebrow">Accuracy first</p>
            <h2 id="home-method-heading" className="heading-md mt-2">Build control before chasing a faster number.</h2>
            <p className="mt-4 leading-7 text-camp-muted">Short, repeatable sessions make it easier to notice posture, finger placement, and problem keys. WPM becomes useful only when accuracy stays steady.</p>
          </div>
          <AdPlacement placement="main_content_rectangle" />
          <div>
            <p className="eyebrow">Choose a next step</p>
            <h2 className="heading-md mt-2">Use lessons, focused practice, or a full test.</h2>
            <p className="mt-4 leading-7 text-camp-muted">Lessons teach skills in stages. Focused practice repeats a specific row, hand, or text type. The typing test gives a broader result you can compare with the same settings later.</p>
            <p className="mt-4 leading-7 text-camp-muted">Review the <Link className="font-black text-camp-coral underline underline-offset-4" href="/learn">typing basics guide</Link>, practise numeric input in <Link className="font-black text-camp-coral underline underline-offset-4" href="/games/calculator">Calculator Sprint</Link>, or check <Link className="font-black text-camp-coral underline underline-offset-4" href="/progress">progress saved in this browser</Link>.</p>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function Feature({ body, icon, title }: { body: string; icon: React.ReactNode; title: string }) {
  return (
    <article className="rounded-3xl bg-camp-paper p-6 shadow-soft">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-camp-peach text-camp-coral">{icon}</div>
      <h3 className="text-xl font-black text-camp-ink">{title}</h3>
      <p className="mt-3 leading-7 text-camp-muted">{body}</p>
    </article>
  );
}
