import Link from "next/link";
import { brand, navLinks } from "@/data/site";

/**
 * Footer for the standard pages. Deliberately NOT rendered on the homepage —
 * that route is a fixed-position scroll world with no document flow to sit in.
 */
export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rain/70 pt-8 pb-12 text-sm text-slate">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          <Link href="/" className="transition hover:text-cyan">
            Home
          </Link>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="transition hover:text-cyan">
              {label}
            </Link>
          ))}
          <Link href="/contact/" className="transition hover:text-cyan">
            Contact
          </Link>
        </nav>
        <a
          href="mailto:robert@closingbrackets.com"
          className="transition hover:text-cyan"
        >
          robert@closingbrackets.com
        </a>
      </div>
      {/* Full-strength slate: at 80% this was 3.95:1 on the ink background,
          under the 4.5:1 WCAG AA floor for 14px text. */}
      <p className="mt-6 text-slate">
        &copy; {new Date().getFullYear()} {brand.name}
      </p>
    </footer>
  );
}
