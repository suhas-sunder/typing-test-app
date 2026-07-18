import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Page Not Found | Free Typing Camp",
  description: "The requested Free Typing Camp page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="section-pad">
          <div className="page-shell max-w-3xl">
            <p className="eyebrow">404</p>
            <h1 className="heading-lg mt-2">That page is not part of the current camp.</h1>
            <p className="body-lg mt-4">The address may be outdated, incomplete, or mistyped. Choose a working practice destination below.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/typing-test" className="button-primary">Take a typing test</Link>
              <Link href="/lessons" className="button-secondary">Browse lessons</Link>
              <Link href="/typing-practice" className="button-secondary">Choose focused practice</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

