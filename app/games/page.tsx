import Link from "next/link";
import { Calculator, Keyboard, Target } from "lucide-react";
import { PageFrame } from "@/components/page-frame";

export default function GamesPage() {
  return (
    <PageFrame>
      <section className="section-pad">
        <div className="page-shell">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Games</p>
            <h1 className="heading-lg mt-2">Typing practice with a little pressure.</h1>
            <p className="body-lg mt-3">The first MVP keeps one working game and leaves room for more focused typing games later.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <GameCard href="/games/calculator" icon={<Calculator />} title="Calculator Sprint" body="Type numeric expressions before your lives run out." />
            <GameCard href="/typing-test?duration=30&mode=words&difficulty=easy" icon={<Keyboard />} title="Word Dash" body="A quick 30-second words challenge." />
            <GameCard href="/lessons" icon={<Target />} title="Drill Streak" body="Use lesson drills as structured daily practice." />
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function GameCard({ body, href, icon, title }: { body: string; href: string; icon: React.ReactNode; title: string }) {
  return (
    <Link href={href} className="group rounded-3xl bg-camp-paper p-6 shadow-soft transition hover:-translate-y-0.5 hover:bg-camp-peach focus-visible:bg-camp-peach focus-visible:text-camp-coral focus-visible:outline-none">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-camp-peach text-camp-coral">{icon}</div>
      <h2 className="text-2xl font-black text-camp-ink">{title}</h2>
      <p className="mt-3 leading-7 text-camp-muted">{body}</p>
    </Link>
  );
}
