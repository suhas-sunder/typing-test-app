import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/info/info-page";
import { sitemapLinks } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse the main Free Typing Camp pages.",
};

export default function SitemapPage() {
  return (
    <InfoPage
      eyebrow="Sitemap"
      title="Free Typing Camp pages"
      intro="Use this page to jump between the main typing practice, lesson, progress, and site information pages."
    >
      <div className="mt-12 grid gap-3">
        {sitemapLinks.map((link) => (
          <Link key={link.href} href={link.href} className="bg-camp-paper px-5 py-4 transition hover:bg-camp-peach/50 focus-visible:bg-camp-peach/50 focus-visible:outline-none">
            <span className="block text-lg font-black text-camp-ink">{link.label}</span>
            <span className="mt-1 block leading-7 text-camp-muted">{link.description}</span>
          </Link>
        ))}
      </div>
    </InfoPage>
  );
}
