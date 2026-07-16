"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/typing-test", label: "Typing Test" },
  { href: "/lessons", label: "Lessons" },
  { href: "/games", label: "Games" },
  { href: "/learn", label: "Learn" },
  { href: "/progress", label: "Progress" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-dark relative z-40">
      <div className="page-shell flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 font-display text-xl font-black text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-camp-orange text-sm font-black text-white">
            FTC
          </span>
          <span>Free Typing Camp</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="button-ghost">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-[var(--button-depth-muted)] transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline-none active:translate-y-[2px] active:shadow-[var(--button-depth-pressed)] lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
        </button>
      </div>

      {open ? (
        <div className="bg-camp-navy lg:hidden">
          <div className="page-shell grid gap-2 py-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="button-ghost justify-start" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
