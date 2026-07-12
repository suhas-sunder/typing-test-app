import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { footerGroups, socialLinks, utilityLinks } from "@/lib/site-links";

export function SiteFooter() {
  return (
    <footer className="bg-camp-paper text-camp-ink">
      <div className="page-shell py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 font-display text-xl font-black text-camp-ink">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-camp-orange text-sm font-black text-white">
                FTC
              </span>
              <span>Free Typing Camp</span>
            </Link>
            <p className="mt-5 max-w-md text-base leading-7 text-camp-muted">
              Calm typing practice for students, homeschool parents, tutors, and small classrooms.
            </p>
            <p className="mt-4 font-mono text-sm font-semibold text-camp-coral">
              accuracy first / short lessons / clear progress
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {footerGroups.map((group) => (
              <section key={group.title} aria-labelledby={`footer-${group.title.replace(/\s+/g, "-").toLowerCase()}`}>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-camp-coral">{group.eyebrow}</p>
                <h2 id={`footer-${group.title.replace(/\s+/g, "-").toLowerCase()}`} className="mt-2 text-lg font-black text-camp-ink">
                  {group.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-camp-muted">{group.description}</p>
                <ul className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group flex items-baseline justify-between gap-3 rounded-2xl px-3 py-2 transition hover:bg-camp-peach/45 focus-visible:bg-camp-peach/45 focus-visible:outline-none">
                        <span className="font-extrabold text-camp-ink group-hover:text-camp-coral">{link.label}</span>
                        <span className="text-xs font-bold uppercase tracking-[0.08em] text-camp-muted">{link.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <section className="mt-12 bg-camp-cream px-5 py-6 sm:px-6" aria-labelledby="footer-socials">
          <div className="grid gap-5 lg:grid-cols-[16rem_1fr] lg:items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-camp-coral">Social links</p>
              <h2 id="footer-socials" className="mt-2 text-lg font-black text-camp-ink">
                Creator and project links
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex h-full items-start justify-between gap-3 rounded-2xl bg-camp-surface px-4 py-3 transition hover:bg-camp-peach/60 focus-visible:bg-camp-peach/60 focus-visible:outline-none"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      <span className="block font-extrabold text-camp-ink group-hover:text-camp-coral">{link.label}</span>
                      <span className="mt-1 block text-sm leading-5 text-camp-muted">{link.note}</span>
                    </span>
                    <ExternalLink aria-hidden className="mt-1 h-4 w-4 shrink-0 text-camp-coral" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm font-bold text-camp-muted">
          {utilityLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-camp-coral focus-visible:text-camp-coral focus-visible:outline-none">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 text-sm leading-6 text-camp-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025-2026 Free Typing Camp. Built by Suhas Sunder.</p>
          <p>Practice for a few minutes each day. Focus on accuracy first.</p>
        </div>
      </div>
    </footer>
  );
}
