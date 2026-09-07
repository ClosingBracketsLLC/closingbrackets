import Link from "next/link";
import { brand, call, contact, cta, navLinks, routes } from "@/data/site";

/**
 * Footer for every page. The homepage renders it at the foot of the in-flow
 * tail (HomeTail.js) that follows the scroll world — the flight itself is a
 * fixed-position stage with no document flow for a footer to sit in.
 */
export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rain/70 pt-8 pb-12 text-sm text-slate">
      <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
        <div className="max-w-sm">
          <p className="font-[family-name:var(--font-display)] text-base text-bone">
            {brand.name}
          </p>
          {/* Full-strength slate throughout: at 80% it was 3.95:1 on ink,
              under the 4.5:1 WCAG AA floor for 14px text. */}
          <p className="mt-2 leading-relaxed">{contact.tagline}</p>
          <p className="mt-2">{contact.location}</p>
        </div>

        <div className="grid gap-2">
          <a href={`mailto:${contact.email}`} className="text-bone transition hover:text-cyan">
            {contact.email}
          </a>
          <a href={call.href} className="transition hover:text-cyan">
            {call.label}
          </a>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          <Link href={routes.home} className="transition hover:text-cyan">
            Home
          </Link>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="transition hover:text-cyan">
              {label}
            </Link>
          ))}
          <Link href={cta.href} className="text-bone transition hover:text-cyan">
            {cta.label}
          </Link>
        </nav>
      </div>
      <p className="mt-8">
        &copy; {new Date().getFullYear()} {brand.name}
      </p>
    </footer>
  );
}
