import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { PRACTICE_DEFINITIONS } from "@/lib/practice/registry";
import { AdPlacement } from "@/components/ads/ad-placement";

export const metadata: Metadata = {
  title: { absolute: "Focused Typing Practice | FreeTypingCamp" },
  description: "Choose focused practice for keyboard rows, individual hands, quotes, common words, numbers, and symbols.",
  alternates: { canonical: "/typing-practice" },
  openGraph: { title: "Focused Typing Practice | FreeTypingCamp", description: "Short, medium, and long typing practice for specific keyboard skills.", url: "/typing-practice", type: "website" },
};

export default function TypingPracticeHub() {
  return (
    <PageFrame routeFamily="practice_hub">
      <section className="section-pad"><div className="page-shell max-w-4xl"><p className="eyebrow">Practice by skill</p><h1 className="heading-lg mt-2">Focused typing practice without a noisy dashboard.</h1><p className="body-lg mt-4">Choose the row, hand, or text type that needs attention. Each completed attempt stays in this browser, with a local best compared only against the same setup.</p></div></section>
      <AdPlacement placement="below_header_or_tool" />
      <section className="pb-16 sm:pb-20"><div className="page-shell"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{PRACTICE_DEFINITIONS.map((practice) => <Link key={practice.id} href={`/typing-practice/${practice.id}`} className="group min-h-48 rounded-2xl bg-camp-paper px-6 py-6 transition hover:bg-camp-orange hover:text-white focus-visible:bg-camp-orange focus-visible:text-white"><h2 className="text-xl font-black text-camp-ink group-hover:text-white group-focus-visible:text-white">{practice.h1}</h2><p className="mt-3 leading-7 text-camp-muted group-hover:text-white group-focus-visible:text-white">{practice.description}</p><span className="mt-5 inline-block font-black text-camp-coral group-hover:text-white group-focus-visible:text-white">Open practice →</span></Link>)}</div></div></section>
      <section className="bg-camp-tan/45 py-12"><div className="page-shell max-w-3xl"><p className="eyebrow">Lessons and tests</p><h2 className="heading-md mt-2">Use the right tool for the job</h2><p className="mt-4 leading-7 text-camp-muted">Focused practice repeats one skill and does not award lesson stars. Use the <Link className="font-black text-camp-coral underline underline-offset-4" href="/lessons">30-lesson curriculum</Link> for structured progression, or take the <Link className="font-black text-camp-coral underline underline-offset-4" href="/typing-test">full typing test</Link> for a broader result.</p></div></section>
      <AdPlacement placement="main_content_rectangle" />
    </PageFrame>
  );
}
