import Link from "next/link";
import PageLayout from "./components/PageLayout";
import { cta, navLinks, routes } from "@/data/site";

/**
 * The 404, in the same frame as every other page: the site header, the swarm
 * band, the panel system, the footer. Next's stock "This page could not be
 * found" was the one screen on the site that did not look like the site.
 * Static export writes this to out/404.html, which Render serves for any
 * unknown path.
 */
export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageLayout
      eyebrow="404"
      title="That page is not here."
      intro="It may have moved when the site was reorganised, or the link was wrong to begin with. Everything we publish is one click away below."
      accent="#ff4e64"
    >
      <nav aria-label="Site pages" className="cb-strip mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {[{ label: "Home", href: routes.home }, ...navLinks].map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            style={{ "--cb-accent": i % 2 ? "#ff4e64" : "#2ef2dc" }}
            className={`cb-cell cb-tone ${
              i % 2 ? "cb-tone--bl" : "cb-tone--tr"
            } block p-6 font-[family-name:var(--font-display)] text-lg text-bone transition hover:text-cyan`}
          >
            {link.label} <span aria-hidden>→</span>
          </Link>
        ))}
      </nav>

      <div className="mt-12">
        <Link href={cta.href} className="cb-halftone cb-btn">
          {cta.label}
        </Link>
      </div>
    </PageLayout>
  );
}
