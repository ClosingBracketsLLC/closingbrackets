import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import { SITE_URL, url } from "@/data/site";
import { assurances, catalog, hybrids, tiers } from "@/data/services";

const TITLE = "Service catalogue";
const PATH = "/services/catalog/";

export const metadata = {
  title: "Full Service Catalogue",
  description:
    "Every service Closing Brackets offers, described in full: project builds, ongoing retainers, AI audits, agent swarms, automation, growth marketing, and the bundled web and AI tiers.",
  alternates: { canonical: url(PATH) },
};

/* Three levels deep, so the breadcrumb helper in data/site.js (which only
   models two) does not fit — this one is built out here. */
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: url("/services/") },
    { "@type": "ListItem", position: 3, name: TITLE, item: url(PATH) },
  ],
};

export default function Catalog() {
  const count = catalog.reduce((n, group) => n + group.items.length, 0);

  return (
    <PageLayout
      eyebrow="Catalogue"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services/" },
      ]}
      title="Everything we offer, in full"
      intro={`${count} services across project work, ongoing retainers, AI builds and bundled tiers. Each one says what is actually in it. Nothing here is priced on this page — scope comes first, then one fixed price for exactly that scope.`}
      accent="#2ef2dc"
      width="max-w-6xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Jump bar. Four groups plus the two bundle sections — enough page here
          that landing at the top with no map is a bad experience. */}
      <nav
        aria-label="Catalogue sections"
        className="flex flex-wrap gap-2 border-y border-rain py-4"
      >
        {catalog.map((group) => (
          <a key={group.id} href={`#${group.id}`} className="cb-chip">
            {group.title}
            <span className="text-slate/70">{group.items.length}</span>
          </a>
        ))}
        <a href="#tiers" className="cb-chip">
          Bundled tiers
        </a>
      </nav>

      {catalog.map((group) => (
        <section
          key={group.id}
          id={group.id}
          style={{ "--cb-accent": group.accent }}
          className="mt-20 scroll-mt-28"
        >
          <p className="cb-halftone cb-caption">{group.kind}</p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl text-bone sm:text-4xl">
            {group.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate">{group.blurb}</p>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {group.items.map((item) => (
              <article key={item.name} className="cb-panel cb-panel--lift flex flex-col p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-bone">
                  {item.name}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: group.accent }}
                >
                  {item.brief}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate">
                  {item.detail}
                </p>
                <p className="mt-5 border-t border-rain/70 pt-4 text-xs text-slate/90">
                  <span className="font-[family-name:var(--font-display)] tracking-[0.14em] uppercase">
                    Goes with
                  </span>
                  <span className="ml-2">{item.pairs}</span>
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* ---------------------------------------------------------------- */}
      <section id="tiers" className="mt-24 scroll-mt-28">
        <p className="cb-halftone cb-caption">Monthly · bundled</p>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl text-bone sm:text-4xl">
          Bundled tiers
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate">
          The à la carte services above, packaged. Each tier is everything in
          the one before it plus what is named — so moving up never means
          giving anything up.
        </p>

        <ol className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-rain bg-rain">
          {tiers.map((tier) => (
            <li key={tier.name} className="bg-panel/75 p-6 sm:flex sm:gap-7 sm:p-7">
              <div className="flex items-baseline gap-4 sm:w-56 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1">
                <span className="cb-numeral text-3xl">{tier.n}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-bone">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate">Minimum term {tier.term}</p>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate sm:mt-0">
                {tier.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <h2 className="cb-rule font-[family-name:var(--font-display)] text-2xl text-bone">
          Web + AI bundles
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate">
          Where the two halves of the business are bought together. Every one of
          these starts with the AI maturity audit, and the audit is what locks
          the final scope.
        </p>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {hybrids.map((h, i) => (
            <article
              key={h.name}
              style={{ "--cb-accent": i % 2 ? "#ff4e64" : "#2ef2dc" }}
              className="cb-panel cb-panel--lift cb-panel--marked p-7"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-bone">
                  {h.name}
                </h3>
                <span
                  className="font-[family-name:var(--font-display)] text-xs tracking-[0.1em] uppercase"
                  style={{ color: i % 2 ? "#ff4e64" : "#2ef2dc" }}
                >
                  {h.tag}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate">{h.body}</p>
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-rain/70 pt-4 text-xs">
                <div>
                  <dt className="font-[family-name:var(--font-display)] tracking-[0.14em] text-slate/80 uppercase">
                    Minimum term
                  </dt>
                  <dd className="mt-1 text-slate">{h.term}</dd>
                </div>
                <div>
                  <dt className="font-[family-name:var(--font-display)] tracking-[0.14em] text-slate/80 uppercase">
                    Best fit
                  </dt>
                  <dd className="mt-1 text-slate">{h.fit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-24">
        <h2 className="cb-rule font-[family-name:var(--font-display)] text-2xl text-bone">
          How this is kept honest
        </h2>
        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {assurances.map((a) => (
            <div key={a.title} className="cb-panel p-6">
              <h3 className="font-[family-name:var(--font-display)] text-base leading-snug text-cyan">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{ "--cb-accent": "#ff4e64" }}
        className="cb-panel relative mt-20 isolate overflow-hidden p-8 sm:p-11"
      >
        <span aria-hidden className="cb-speedlines" />
        <h2 className="max-w-xl font-[family-name:var(--font-display)] text-2xl leading-tight text-bone sm:text-3xl">
          Not sure which of these you need?
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-slate">
          That is what the first conversation is for. Describe the problem
          rather than the service, and we will tell you which of the above
          actually applies — including when the answer is none of them.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact/"
            className="cb-halftone inline-block rounded-full bg-coral px-7 py-3.5 font-[family-name:var(--font-display)] text-ink transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            Start a conversation
          </Link>
          <Link
            href="/services/"
            className="inline-block rounded-full border border-rain px-7 py-3.5 font-[family-name:var(--font-display)] text-slate transition hover:border-cyan/50 hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            Back to services
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
