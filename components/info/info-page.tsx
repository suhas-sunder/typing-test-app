import Link from "next/link";

export type InfoSection = {
  title: string;
  body?: string[];
  bullets?: string[];
  links?: { href: string; label: string; description: string }[];
};

export function InfoPage({
  actions,
  children,
  eyebrow,
  intro,
  sections,
  title,
}: {
  actions?: { href: string; label: string; variant?: "primary" | "secondary" }[];
  children?: React.ReactNode;
  eyebrow: string;
  intro: string;
  sections?: InfoSection[];
  title: string;
}) {
  return (
    <section className="section-pad">
      <div className="page-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="heading-lg mt-2">{title}</h1>
          <p className="body-lg mt-4">{intro}</p>
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link key={action.href} href={action.href} className={action.variant === "secondary" ? "button-secondary" : "button-primary"}>
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {sections ? (
          <div className="mt-12 grid gap-5">
            {sections.map((section) => (
              <SectionBlock key={section.title} section={section} />
            ))}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}

function SectionBlock({ section }: { section: InfoSection }) {
  return (
    <section className="bg-camp-paper px-5 py-6 sm:px-6">
      <h2 className="heading-md">{section.title}</h2>
      {section.body?.map((paragraph) => (
        <p key={paragraph} className="mt-4 max-w-4xl leading-7 text-camp-muted">
          {paragraph}
        </p>
      ))}
      {section.bullets ? (
        <ul className="mt-5 grid gap-3">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 leading-7 text-camp-muted">
              <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-camp-orange" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {section.links ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {section.links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-2xl bg-camp-surface px-4 py-4 transition hover:bg-camp-peach/55 focus-visible:bg-camp-peach/55 focus-visible:outline-none">
              <span className="block font-extrabold text-camp-ink">{link.label}</span>
              <span className="mt-1 block text-sm leading-6 text-camp-muted">{link.description}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
