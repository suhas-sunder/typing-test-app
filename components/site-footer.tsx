import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { creatorLinks, similarProjectLinks, utilityLinks } from "@/lib/site-links";

export function SiteFooter() {
  return (
    <footer className="text-camp-ink">
      <section className="bg-camp-paper py-11 sm:py-12" aria-labelledby="footer-brand">
        <div className="page-shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div><Link id="footer-brand" href="/" className="inline-flex items-center gap-3 font-display text-xl font-black text-camp-ink"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-camp-orange text-sm font-black text-white">FTC</span><span>Free Typing Camp</span></Link><p className="mt-4 max-w-xl leading-7 text-camp-muted">Calm, accuracy-first typing practice with short lessons and progress saved in this browser.</p></div>
          <p className="font-mono text-sm font-semibold text-camp-coral">accuracy first / short lessons / clear progress</p>
        </div>
      </section>

      <section className="bg-camp-cream py-10" aria-labelledby="creator-links-heading">
        <div className="page-shell grid gap-6 lg:grid-cols-[14rem_1fr]"><div><p className="eyebrow">Creator links</p><h2 id="creator-links-heading" className="mt-2 text-lg font-black text-camp-ink">Built by Suhas Sunder</h2></div><ExternalLinkList links={creatorLinks} /></div>
      </section>

      <section className="bg-camp-tan/55 py-10" aria-labelledby="similar-projects-heading">
        <div className="page-shell grid gap-6 lg:grid-cols-[14rem_1fr]"><div><p className="eyebrow">Similar projects</p><h2 id="similar-projects-heading" className="mt-2 text-lg font-black text-camp-ink">Other useful tools</h2></div><ExternalLinkList links={similarProjectLinks} showDescription /></div>
      </section>

      <section className="bg-camp-navy py-8 text-white">
        <div className="page-shell"><nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold" aria-label="Footer utility links">{utilityLinks.map((link) => <Link key={link.href} href={link.href} className="text-white/78 transition hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-camp-navy">{link.label}</Link>)}</nav><div className="mt-6 flex flex-col gap-2 text-sm leading-6 text-white/65 sm:flex-row sm:justify-between"><p>© 2025–2026 Free Typing Camp. Built by Suhas Sunder.</p><p>Practice for a few minutes each day. Focus on accuracy first.</p></div></div>
      </section>
    </footer>
  );
}

function ExternalLinkList({ links, showDescription = false }: { links: Array<{ href: string; label: string; note: string }>; showDescription?: boolean }) {
  return <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">{links.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-2 font-black text-camp-ink transition hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white"><span>{link.label}{showDescription ? <span className="mt-1 block max-w-sm text-sm font-normal leading-6 text-camp-muted group-hover:text-current group-focus-visible:text-current">{link.note}</span> : null}</span><ExternalLink aria-hidden className="mt-1 h-4 w-4 shrink-0" /></a></li>)}</ul>;
}
