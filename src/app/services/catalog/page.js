import { Fragment } from "react";
import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import ContentsBanner from "../../components/ContentsBanner";
import CtaPanel from "../../components/CtaPanel";
import EngagementRules from "../../components/EngagementRules";
import { Numeral } from "../../components/primitives";
import { breadcrumbLd, graphLd, itemListLd, pageOg, routes, startClose, url } from "@/data/site";
import { catalog, catalogIntro } from "@/data/services";

const TITLE = "Service catalogue";
const PATH = routes.catalog;

export const metadata = {
  title: "Service Catalogue",
  description:
    "The scoping menu behind each Closing Brackets line: Build-a-Bot, web and app builds, the engineering bar, SEO and growth, AI consulting. One project, one price.",
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "The service catalogue — the menu we draw a scope from",
    description:
      "Every item we can put in a scope, grouped by the five lines of work and described in full. Priced on the scope you agree, never on a rate card.",
    path: PATH,
  }),
};

/* One list drives the banner, the numerals and the ItemList markup, so a
   section cannot be numbered one way in the banner and another on the page. */
const jsonLd = graphLd(
  breadcrumbLd(TITLE, PATH, [{ name: "Services", path: routes.services }]),
  itemListLd(
    TITLE,
    catalog.map((group) => ({
      name: group.title,
      url: url(`${PATH}#${group.id}`),
      description: group.blurb,
    })),
  ),
);

/* Four-step corner cycle for a two-column run: a two-step cycle puts the same
   corner directly above itself every other row. */
const TONES = ["cb-tone--tl", "cb-tone--br", "cb-tone--tr", "cb-tone--bl"];

/* The group the slim mid-page call to action follows — the halfway mark by
   item count, so a reader who found what they need does not have to scroll
   past the rest to act on it. */
const MID_BREAK = "engineering-bar";

export default function Catalog() {
  const count = catalog.reduce((n, group) => n + group.items.length, 0);

  return (
    <PageLayout
      eyebrow="Catalogue"
      crumbs={[
        { label: "Home", href: routes.home },
        { label: "Services", href: routes.services },
      ]}
      title="The menu we draw a scope from"
      intro={`${catalogIntro} ${count} things we can put in a scope, grouped by the five lines of work and described in full. Nothing is priced here — scope comes first, then one fixed price for exactly that scope.`}
      accent="#2ef2dc"
      width="max-w-6xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ContentsBanner
        label="Catalogue sections"
        items={catalog.map((group) => ({
          href: `#${group.id}`,
          title: group.title,
          accent: group.accent,
        }))}
        className="mt-8"
      />

      {catalog.map((group, g) => (
        <Fragment key={group.id}>
          <section
            id={group.id}
            style={{ "--cb-accent": group.accent }}
            className="mt-20 scroll-mt-28"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <Numeral value={g + 1} className="text-5xl" />
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone sm:text-4xl">
                {group.title}
              </h2>
            </div>
            <p className="mt-4 text-sm" style={{ color: group.accent }}>
              {group.kind}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate">{group.blurb}</p>

            {/* Nothing in this run is a link, so no hover lift: a panel that
                rises under the pointer promises a click that never arrives. */}
            <div className="cb-strip mt-9 md:grid-cols-2">
              {group.items.map((item, i) => (
                <article
                  key={item.name}
                  className={`cb-cell cb-tone ${TONES[i % TONES.length]} flex flex-col p-6 sm:p-7`}
                >
                  <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-bone">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: group.accent }}>
                    {item.brief}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate">{item.detail}</p>
                </article>
              ))}
            </div>

            {group.id === "build-a-bot" && (
              <Link href={routes.bot} className="cb-link mt-7">
                Limits, the sample job letter, and the price bands <span aria-hidden>→</span>
              </Link>
            )}
          </section>

          {group.id === MID_BREAK && (
            <aside
              style={{ "--cb-accent": "#ff4e64" }}
              className="cb-panel mt-16 flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <p className="max-w-xl leading-relaxed text-slate">
                <span className="text-bone">Seen the one you need?</span> You do not
                have to read the rest. Name it and we will come back with the scope,
                real dates, and one price for exactly that.
              </p>
              <Link href={routes.start} className="cb-halftone cb-btn shrink-0">
                Get a fixed-scope plan
              </Link>
            </aside>
          )}
        </Fragment>
      ))}

      <EngagementRules />

      <CtaPanel
        {...startClose}
        caption="One conversation"
        title="Not sure which of these you need?"
        body="That is what the first conversation is for. Describe the problem rather than the service, and we will tell you which of the above actually applies — including when the answer is none of them."
        secondary={{ label: "Back to services", href: routes.services }}
        className="mt-20"
      />
    </PageLayout>
  );
}
