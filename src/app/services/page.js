import Link from "next/link";
import PageLayout from "../components/PageLayout";
import ContentsBanner from "../components/ContentsBanner";
import CtaPanel from "../components/CtaPanel";
import {
  AccentList,
  FrameList,
  Numeral,
  SectionHeading,
} from "../components/primitives";
import {
  SITE_URL,
  breadcrumbLd,
  graphLd,
  itemListLd,
  pageOg,
  url,
} from "@/data/site";
import { engagement, hireABot, services } from "@/data/services";

const TITLE = "Services";
const PATH = "/services/";

/* Title and description are both cut to fit rather than to fit everything in.
   The old title ran to 70 characters with the brand template appended, which
   truncates in results — and the words it lost were the ones at the end doing
   the differentiating. Head terms here; the rest of the service vocabulary
   lives in the h2s and the Service nodes below, where length costs nothing. */
export const metadata = {
  title: "Custom Software Development & AI Services",
  description:
    "Custom software development, AI consulting, integration and automation, and growth marketing. Fixed scope, real dates, one price — never hourly billing.",
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "Services — custom software, AI, and growth marketing",
    description:
      "Five lines of work and about fifty services behind them. Fixed scope, real dates, one price, no hourly billing.",
    path: PATH,
  }),
};

/*
 * Structured data. One graph: where the page sits, what it lists, and then
 * each line as a Service in its own right.
 *
 * The ItemList alone said "this page contains five things". The Service nodes
 * say what each one IS, who provides it, and what is inside it — which is the
 * difference between a page a crawler can enumerate and an entity an answer
 * engine can match a question against. Every field is read from data/services.js
 * so the markup cannot drift from the visible panel it describes.
 */
const serviceLd = services.map((service) => ({
  "@type": "Service",
  "@id": url(`${PATH}#${service.id}`),
  name: service.title,
  serviceType: service.title,
  description: service.summary,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${service.title} — examples`,
    itemListElement: service.examples.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
}));

const jsonLd = graphLd(
  breadcrumbLd(TITLE, PATH),
  itemListLd(
    "Services",
    services.map((service) => ({
      name: service.title,
      url: url(`${PATH}#${service.id}`),
      description: service.summary,
    })),
  ),
  ...serviceLd,
);

/*
 * The comic page below is laid out as tiers, not as a card deck.
 *
 *   ┌──────────────────────── contents banner ─────────────────────────┐
 *   ├─────────────────────── 01 · splash panel ────────────────────────┤
 *   ├─────────── 02 (7) ────────────┬────────── 03 (5) ────────────────┤
 *   ├────────── 04 (5) ─────────────┴─────────── 05 (7) ───────────────┤
 *   └──────────────────────────────────────────────────────────────────┘
 *
 * The alternating 7/5 → 5/7 split is the whole point: equal columns read as a
 * grid, unequal ones read as a page someone laid out. Each panel is handed its
 * span and its dot-screen corner explicitly, so the rhythm is visible here in
 * one place rather than inferred from five call sites — and no two panels in a
 * tier take their screen from the same side, which is what stops a page of
 * dotted boxes from reading as wallpaper.
 *
 * Only the splash gets its own arrangement — title and summary held off to the
 * left of the detail. The four below it read straight down whatever their
 * width, which is deliberate: every service carries the same amount of copy,
 * and setting the landscape ones in two columns only makes them shorter than
 * the portrait panel beside them. What is left over at the foot of a wider
 * panel is quiet ink under a dot screen, which is what a comic does with it.
 */
const TIERS = [
  { span: "lg:col-span-12", tone: "cb-tone--tr", splash: true },
  { span: "lg:col-span-7", tone: "cb-tone--tl" },
  { span: "lg:col-span-5", tone: "cb-tone--br" },
  { span: "lg:col-span-5", tone: "cb-tone--bl" },
  { span: "lg:col-span-7", tone: "cb-tone--tr" },
];

/**
 * One service line as a comic panel. The catalogue link is pushed to the
 * panel's bottom edge, so the links across a tier land on one line however
 * unevenly the copy above them falls.
 */
function ServicePanel({ service, index, span, tone, splash = false }) {
  const detail = (
    <>
      <div>
        <h3 className="cb-subhead">What you get</h3>
        <AccentList items={service.points} className="mt-4" />
      </div>
      <div>
        <h3 className="cb-subhead">In this line</h3>
        <FrameList
          items={service.examples}
          label={`Examples of ${service.title}`}
          className="mt-4"
        />
      </div>
    </>
  );

  return (
    <article
      id={service.id}
      style={{ "--cb-accent": service.accent }}
      className={`cb-cell cb-tone ${tone} ${span} scroll-mt-28 flex flex-col p-7 sm:p-9 ${
        splash ? "cb-splash lg:p-11" : ""
      }`}
    >
      <div className={splash ? "lg:flex lg:items-start lg:gap-14" : ""}>
        <div className={splash ? "lg:w-[38%] lg:shrink-0" : ""}>
          {/* flex-wrap: a 60px numeral beside a 30px display heading is wider
              than a phone once the heading's longest word cannot break, and a
              nowrap row makes that width the panel's floor. Wrapping drops the
              title under the numeral at the sizes where it will not sit beside
              it, which is also the better reading order there. */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <Numeral
              value={index + 1}
              className={splash ? "text-6xl sm:text-7xl" : "text-5xl"}
            />
            {/* h2: each line is a top-level section of this page, and the
                contents banner above points straight at it. */}
            <h2
              className={`font-[family-name:var(--font-display)] leading-tight text-bone ${
                splash ? "text-3xl sm:text-[2.1rem]" : "text-2xl sm:text-[1.7rem]"
              }`}
            >
              {service.title}
            </h2>
          </div>
          <p
            className={`mt-5 leading-relaxed text-slate ${
              splash ? "text-lg sm:text-xl" : ""
            }`}
          >
            {service.summary}
          </p>
        </div>

        <div
          className={
            splash
              ? "mt-9 grid gap-9 sm:grid-cols-2 lg:mt-0 lg:flex-1"
              : "mt-7 grid gap-7"
          }
        >
          {detail}
        </div>
      </div>

      {/* mt-auto: the catalogue links line up along the bottom edge of a tier
          no matter how unevenly the copy above them fills each panel.

          The rule above it is what makes that gap read as intended. Panels in a
          tier take the height of the taller one, so the shorter panel's link
          floats at the bottom of open space — unavoidable in a grid row, and it
          looked like the panel had simply run out. Ruled off, the same space
          becomes the panel's footer, and the links across a tier sit on a
          visible shared baseline instead of merely at a matching height. */}
      <div className="cb-footrule mt-auto pt-6">
        <Link
          href={`/services/catalog/#${service.catalogAnchor}`}
          className="cb-link"
        >
          See everything in it
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <PageLayout
      eyebrow={TITLE}
      title="Five lines of work: custom software, AI, and growth"
      intro="One small senior team scopes the work, writes the code, and is still there when it goes live. Below is the shape of what we do; the full catalogue runs to about fifty services."
      accent="#2ef2dc"
      width="max-w-6xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Page one: the five lines, as one comic page rather than five      */}
      {/* cards. Each panel inks its own edge; the strip only holds the     */}
      {/* gutter between them.                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="cb-strip mt-8 lg:grid-cols-12">
        {/* The contents banner, the first panel of the page — it answers "what
            do you actually do" before anyone scrolls, and carries the in-page
            anchors the five panels below are worth linking to. */}
        <ContentsBanner
          label="Service lines"
          items={services.map((service) => ({
            href: `#${service.id}`,
            title: service.title,
            accent: service.accent,
          }))}
          className="lg:col-span-12"
        />

        {services.map((service, i) => (
          <ServicePanel
            key={service.id}
            service={service}
            index={i}
            span={TIERS[i].span}
            tone={TIERS[i].tone}
            splash={TIERS[i].splash}
          />
        ))}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The terms, stated on the page that sells the work.

          `engagement` has been exported from data/services.js since it was
          written and rendered nowhere — so the three commitments that are the
          actual differentiator (fixed scope, real dates, one price, no hourly
          billing) appeared only in a meta description and inside closing-panel
          body copy nobody reads twice. They are what a prospect comparing
          agencies is trying to establish, and they belong directly after "here
          is what we do" and directly before the first ask.

          It also answers the pricing question honestly on a page that carries
          no prices: the model is public even though the numbers are not. */}
      <section className="mt-24">
        <SectionHeading eyebrow="How we work" title="The terms, before you ask">
          The same three on every engagement, whichever of the five lines above
          it comes from.
        </SectionHeading>
        <div className="cb-strip mt-9 sm:grid-cols-3">
          {engagement.map((term, i) => (
            <div
              key={term.title}
              style={{ "--cb-accent": i % 2 ? "#ff4e64" : "#2ef2dc" }}
              className={`cb-cell cb-tone ${
                i % 2 ? "cb-tone--bl" : "cb-tone--tr"
              } p-6 sm:p-7`}
            >
              <Numeral value={i + 1} className="text-4xl" />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
                {term.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{term.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The value-menu entry point, given its own stage — it is the easiest
          thing on the page to say yes to, and the usual route into the rest.
          The page's one speech balloon lands here, on the loudest moment. */}
      <section
        style={{ "--cb-accent": "#ff4e64" }}
        className="cb-panel cb-panel--marked relative mt-24 isolate overflow-hidden p-8 sm:p-11"
      >
        <span aria-hidden className="cb-speedlines" />
        <h2 className="max-w-xl font-[family-name:var(--font-display)] text-3xl leading-tight text-balance text-bone sm:text-4xl">
          {hireABot.title}
        </h2>

        <p className="cb-balloon mt-7 max-w-xl p-6 text-lg leading-relaxed text-bone">
          {hireABot.lede}
        </p>

        <div className="mt-12 grid gap-9 sm:grid-cols-2">
          <div>
            <h3 className="cb-subhead">What comes with it</h3>
            <AccentList items={hireABot.included} className="mt-4" />
          </div>
          <div>
            <h3 className="cb-subhead">Jobs people hire one for</h3>
            <FrameList items={hireABot.roles} label="Agent roles" className="mt-4" />
          </div>
        </div>

        {/* The panel called this the easiest thing on the page to say yes to
            and then gave nobody a way to say it. Everything above sells one
            agent; the next section sold the catalogue instead, so the reader
            most ready to act was handed a link to more reading. */}
        <div className="mt-11 flex flex-wrap items-center gap-4">
          <Link href="/contact/" className="cb-halftone cb-btn">
            Hire one agent
          </Link>
          <Link href="/work/" className="cb-btn cb-btn--ghost">
            See one running
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-24">
        <Link
          href="/services/catalog/"
          style={{ "--cb-accent": "#2ef2dc" }}
          className="cb-panel cb-panel--lift cb-panel--marked group flex flex-col gap-8 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div className="max-w-xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl leading-tight text-bone">
              Every service, with what is actually in it
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Project work, ongoing retainers, AI builds and bundled tiers — each
              one described in full rather than in a bullet, and each one priced
              on the scope you agree rather than on a rate card.
            </p>
            <span className="cb-link mt-6">
              Open the catalogue <span aria-hidden>→</span>
            </span>
          </div>
          <span className="cb-halftone cb-burst shrink-0">
            About 50
            <br />
            services
          </span>
        </Link>
      </section>

      <CtaPanel
        caption="One business day"
        title="Tell us what you want to build"
        body="Describe the project and you will know the exact scope, real dates, and one fixed price before anything starts. We read every enquiry ourselves, and the first answer costs nothing."
        action={{ label: "Get a fixed-scope plan", href: "/contact/" }}
        secondary={{ label: "See how a project runs", href: "/work/" }}
        className="mt-6"
      />
    </PageLayout>
  );
}
