import Link from "next/link";
import { Flame, Keyboard, LineChart, Sprout } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { TypingEntry } from "@/components/typing/typing-entry";

export default function HomePage() {
  return (
    <PageFrame>
      <section className="bg-camp-navy text-white">
        <div className="page-shell grid min-h-[36rem] items-center gap-10 py-14 lg:grid-cols-[1.1fr_24rem] lg:py-20">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-camp-orange">Free Typing Camp</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              Learn to type faster with calm, focused practice.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/72">
              A modern typing test, guided drills, simple games, and progress saved locally in your browser.
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

      <section className="section-pad">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
            <div>
              <p className="eyebrow">Practice path</p>
              <h2 className="heading-lg mt-2">A simple loop for getting better.</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Feature icon={<Keyboard />} title="Real typing behavior" body="Timer, character focus, mistakes, WPM, accuracy, and reset all run in the app." />
              <Feature icon={<Sprout />} title="Guided lessons" body="Thirty controlled lessons and performance stars make progress visible without heavy dashboard clutter." />
              <Feature icon={<Flame />} title="Simple games" body="Calculator Sprint preserves the old game idea and gives it a cleaner, unified treatment." />
              <Feature icon={<LineChart />} title="Progress on this device" body="Completed tests, lessons, and games stay available in this browser." />
            </div>
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
