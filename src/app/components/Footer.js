import Link from "next/link";
import BracketMark from "./BracketMark";
import { site } from "@/data/site";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services", label: "All services" },
      { href: "/services/custom-software", label: "Custom Software" },
      { href: "/services/digital-marketing", label: "Digital Marketing" },
      { href: "/services/ai-automation", label: "AI & Automation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/work", label: "Work" },
      { href: "/process", label: "Process" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [{ href: "/blog", label: "Blog" }],
  },
];

const socialLabels = {
  x: "X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  github: "GitHub",
};

// Only render socials with real URLs — "#" placeholders show nothing.
const realSocials = Object.entries(site.social).filter(
  ([, url]) => url && url !== "#"
);

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void-0">
      <div className="container py-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-24">
          <div className="flex max-w-sm flex-col items-start gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <BracketMark size={28} />
              <span className="font-display text-lg font-semibold tracking-display text-ink-hi">
                Closing Brackets
              </span>
            </Link>
            <p className="text-sm">
              {site.shortDescription}
            </p>
            <div className="flex flex-col gap-1">
              <a
                href={`tel:${site.phone}`}
                className="text-sm font-medium text-ink-hi hover:text-violet"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-sm font-medium text-ink-hi hover:text-violet"
              >
                {site.email}
              </a>
              <p className="text-sm text-ink-low">
                {site.locality}, {site.region}
              </p>
            </div>
            {realSocials.length ? (
              <div className="flex gap-4">
                {realSocials.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-ink-mid hover:text-violet"
                  >
                    {socialLabels[key] || key}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-20">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col items-start gap-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
                  {col.title}
                </p>
                {col.links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="text-sm font-medium text-ink-mid transition-colors duration-200 hover:text-ink-hi"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col items-center gap-2 py-6 md:flex-row md:justify-between">
          <p className="text-xs text-ink-low">
            © 2026 <Link href="/">Closing Brackets LLC</Link>. All rights reserved.
          </p>
          <ul className="flex items-center gap-8">
            <li className="text-xs text-ink-low hover:text-ink-mid">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="text-xs text-ink-low hover:text-ink-mid">
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
