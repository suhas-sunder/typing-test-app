import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { InfoPage } from "@/components/info/info-page";
import { socialLinks } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Socials",
  description: "Find Free Typing Camp creator and project links.",
};

export default function SocialsPage() {
  return (
    <InfoPage
      eyebrow="Socials"
      title="Free Typing Camp social and creator links"
      intro="Dedicated Free Typing Camp channels may grow over time. For now, this page collects the creator and project links most relevant to the site."
    >
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group flex items-start justify-between gap-4 bg-camp-paper px-5 py-5 transition hover:bg-camp-peach/50 focus-visible:bg-camp-peach/50 focus-visible:outline-none"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <span className="block text-lg font-black text-camp-ink group-hover:text-camp-coral">{link.label}</span>
              <span className="mt-2 block leading-7 text-camp-muted">{link.note}</span>
            </span>
            <ExternalLink aria-hidden className="mt-1 h-5 w-5 shrink-0 text-camp-coral" />
          </a>
        ))}
      </div>
    </InfoPage>
  );
}
