import Link from "next/link";
import PageLayout from "../components/PageLayout";
import ContentsBanner from "../components/ContentsBanner";
import CtaPanel from "../components/CtaPanel";
import EngagementRules from "../components/EngagementRules";
import { AccentList, FrameList, Numeral } from "../components/primitives";
import {
  SITE_URL,
  breadcrumbLd,
  graphLd,
  itemListLd,
  pageOg,
  routes,
  startClose,
  url,
} from "@/data/site";
import { catalogIntro, services } from "@/data/services";

const TITLE = "Services";
const PATH = routes.services;

export const metadata = {
  title: "Services: Build-a-Bot, Web & App, Engineering",
  description:
    "The studio menu: Build-a-Bot, a custom agent for the tasks you delegate; web and app builds; the engineering bar; SEO and growth; AI consulting. Fixed scope, real dates, one price.",
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "Services — Build-a-Bot first, then the property it runs on",
    description:
      "A short studio menu, not a catalogue: Build-a-Bot, web & app, engineering bar, SEO & growth, AI consulting. Fixed scope, real dates, one price.",
    path: PATH,
  }),
};

/* Each line as a Service entity, read from data/services.js so the markup
   cannot drift from the visible panel it describes. */
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
 * The page is laid out as tiers, not as a card deck: a full-width splash for
 * Build-a-Bot, then 7/5 → 5/7. Equal columns read as a grid; unequal ones read
 * as a page someone laid out. No two panels in a tier take their dot screen
 * from the same side.
 */
const TIERS = [
  { span: "lg:col-span-12", tone: "cb-tone--tr", splash: true },
  { span: "lg:col-span-7", tone: "cb-tone--tl" },
  { span: "lg:col-span-5", tone: "cb-tone--br" },
  { span: "lg:col-span-5", tone: "cb-tone--bl" },
  { span: "lg:col-span-7", tone: "cb-tone--tr" },
];

/** One service line as a comic panel; its link sits on the panel's footrule. */
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
          {/* flex-wrap so the title drops under the numeral on phones. */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <Numeral
              value={index + 1}
              className={splash ? "text-6xl sm:text-7xl" : "text-5xl"}
            />
            <h2
              className={`font-[family-name:var(--font-display)] leading-tight text-bone ${
                splash ? "text-3xl sm:text-[2.1rem]" : "text-2xl sm:text-[1.7rem]"
              }`}
            >
              {service.title}
            </h2>
          </div>
          <p className={`mt-5 leading-relaxed text-slate ${splash ? "text-lg sm:text-xl" : ""}`}>
            {service.summary}
          </p>
        </div>

        <div className={splash ? "mt-9 grid gap-9 sm:grid-cols-2 lg:mt-0 lg:flex-1" : "mt-7 grid gap-7"}>
          {detail}
        </div>
      </div>

      <div className="cb-footrule mt-auto pt-6">
        <Link href={service.link.href} className="cb-link">
          {service.link.label}
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
      title="Build-a-Bot first, then the property it runs on"
      intro="The studio menu, short. One small senior team scopes the work, writes the code, and is still there when it goes live — for a custom agent, a site or app, or both."
      accent="#2ef2dc"
      width="max-w-6xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="cb-strip mt-8 lg:grid-cols-12">
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
          <ServicePanel key={service.id} service={service} index={i} {...TIERS[i]} />
        ))}
      </section>

      <EngagementRules />

      {/* The catalogue, mentioned once and quietly: it is the menu we scope
          from, not a second offer. */}
      <section className="mt-24">
        <Link
          href={routes.catalog}
          style={{ "--cb-accent": "#2ef2dc" }}
          className="cb-panel cb-panel--lift cb-panel--marked group block p-8 sm:p-10"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl leading-tight text-bone">
            Need the detail for a scope?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate">
            {catalogIntro} Every item we can put in one, grouped by the five
            lines above and described in full.
          </p>
          <span className="cb-link mt-6">
            Open the catalogue <span aria-hidden>→</span>
          </span>
        </Link>
      </section>

      <CtaPanel
        {...startClose}
        body={`${startClose.body} We read every enquiry ourselves, and the first answer costs nothing.`}
        secondary={{ label: "See how a project runs", href: routes.work }}
        className="mt-6"
      />
    </PageLayout>
  );
}
