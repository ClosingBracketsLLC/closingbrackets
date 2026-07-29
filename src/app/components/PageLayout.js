import Link from "next/link";
import SiteFooter from "./SiteFooter";
import SwarmField from "./SwarmField";

/**
 * Shared shell for the standard (non-scroll-world) pages: the particle hero
 * band, the page header block, the content column, and the footer.
 *
 * Every page runs the same field and differentiates on `accent` alone — the
 * geometry is identical throughout so the site reads as one surface.
 *
 * The hero's top padding clears the fixed site header — keep it ahead of
 * --nav-h plus the ECG trace's 17px overhang.
 *
 * `crumbs` is the visible counterpart to the BreadcrumbList JSON-LD each page
 * emits: [{ label, href }] for the ancestors only — the current page is added
 * as plain text, since a link to where you already are is noise.
 */
export default function PageLayout({
  eyebrow,
  title,
  intro,
  crumbs = [{ label: "Home", href: "/" }],
  accent = "#2ef2dc",
  width = "max-w-5xl",
  children,
}) {
  return (
    <>
      {/* Brand-token atmosphere (globals.css) so every page reads as one site. */}
      <div aria-hidden className="site-glow" />

      <main style={{ "--cb-accent": accent }}>
        <header className="cb-hero">
          <SwarmField accent={accent} className="cb-hero__swarm" />
          <div className={`mx-auto w-full ${width} px-6`}>
            <nav aria-label="Breadcrumb">
              <ol className="cb-crumbs">
                {crumbs.map((crumb) => (
                  <li key={crumb.href}>
                    <Link href={crumb.href} className="transition">
                      {crumb.label}
                    </Link>
                  </li>
                ))}
                <li aria-current="page" style={{ color: accent }}>
                  {eyebrow}
                </li>
              </ol>
            </nav>
            <h1 className="cb-hero__title mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-balance text-bone sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="cb-hero__title mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              {intro}
            </p>
          </div>
        </header>

        <div className={`mx-auto w-full ${width} px-6 pb-4`}>{children}</div>
      </main>

      <div className={`mx-auto w-full ${width} px-6`}>
        <SiteFooter />
      </div>
    </>
  );
}
