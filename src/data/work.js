// Copy for /work/.
//
// NOTE ON HONESTY: `builds` mixes two kinds of entry, and the page labels each
// one in visible text.
//
//   concept: false — a LIVE BUILD, in production at `url`. Evergreen Softwash
//   and Doge Buddy launched in September 2026. What they say is what shipped,
//   read from the repos; nothing is a testimonial or a measured result, and
//   there are no client-confirmed numbers here until a client confirms one in
//   writing. `outcome` is the honest state of the thing today.
//
//   concept: true — a CONCEPT BUILD: a project designed and built to show what
//   an engagement looks like end to end. The companies are invented. That
//   distinction is the whole point: fabricated social proof is worse than
//   none, and it is the one thing a prospect can check.
//
// The page sorts live work above concept work automatically. To promote a
// concept build, set `concept: false`, add `url`, and replace `shows` with an
// `outcome` the client would confirm.
//
// `shape` names the engagement shape the build demonstrates (Build-a-Bot,
// property, or both) and renders beside the label, so the proof on this page
// maps onto the two doors the homepage offers.
//
// `lines` holds the service ids from data/services.js that a build draws on.
// It renders as links back to /services/#id, which is what connects the proof
// on this page to the offer on that one — both for a reader deciding whether
// we do their kind of work, and for crawlers mapping the two pages together.
// Every id used here must exist in `services`; nothing validates that but the
// link will 404 to an anchor that isn't there.

import { startHref } from "./site";
import { propertyFrom, terms, usd } from "./build-a-bot";

export const builds = [
  {
    id: "evergreen-softwash",
    concept: false,
    client: "Evergreen Softwash",
    url: "https://evergreensoftwash.com",
    sector: "Exterior cleaning & detailing · Puget Sound",
    shape: "Property",
    lines: ["web-app", "engineering-bar", "seo-growth"],
    accent: "#2ef2dc",
    featured: true,
    // The ribbon on the splash: what a build like this starts at, and the
    // range behind it. Links into /start/ with the property intent picked.
    ribbon: { label: `Similar builds from ${usd(propertyFrom)}`, href: startHref("site") },
    ribbonNote:
      "That floor buys a fast static site that scores 100 on Lighthouse. The other end is a full SaaS app. Same team, and the scope document says which you need.",
    // Media lives on the featured build only — one moving thing per page.
    // The film is a concept piece cut ahead of launch; the site went live
    // with photography instead, and the article linked from the card says so.
    poster: "/assets/work/evergreen-poster.webp",
    posterMobile: "/assets/work/evergreen-poster-m.webp",
    clip: "/assets/vid/evergreen.mp4",
    clipMobile: "/assets/vid/evergreen-m.mp4",
    summary:
      "Luxury soft washing, pressure washing and concierge detailing for fine homes, vehicles, aircraft and watercraft across greater Puget Sound. The business needed its front of house built end to end: a site that explains five services, prices them in tiers, takes a quote request instead of a phone call, and gets found across twelve service areas.",
    work: [
      "Static Astro site on the brand kit: five service pages, each with tiered pricing, a process and its own FAQs",
      "Quote form with spam defences, relayed straight to the sales inbox",
      "Service-area coverage for twelve Puget Sound towns, with structured data for local search",
      "A journal with four launch articles and an RSS feed",
      "One 19 KB script, WebP-only images and inlined critical CSS: the engineering bar, on a phone",
      "A five-second hero spot, cut as a concept piece ahead of launch",
    ],
    outcome:
      "Fully static, so there is nothing to patch and nothing to scale. Every service, price, town and opening hour is a data file rather than a page edit, and the quote form lands in the owner's inbox the moment it is sent.",
    stack: ["Astro", "TypeScript", "Web3Forms", "Render"],
  },
  {
    id: "doge-buddy",
    concept: false,
    client: "Doge Buddy",
    url: "https://dogebuddy.com",
    sector: "Dog supplies · DTC e-commerce",
    shape: "Build-a-Bot + property",
    lines: ["build-a-bot", "web-app", "engineering-bar"],
    accent: "#ff4e64",
    summary:
      "A dog-supply store run by one owner and the agents they delegate to. The storefront is a Shopify Hydrogen build; behind it an ops service sources products, places supplier orders, answers support email and scores the catalogue — and every consequential action waits on an owner approval.",
    work: [
      "Hydrogen storefront on Shopify, with four collections built from one category source of truth",
      "Sourcing agent: weekly trend harvest, supplier lookup and priced proposals the owner approves into live listings",
      "Fulfilment that splits a mixed-origin order into one supplier order per warehouse, with per-leg delivery windows",
      "Support agent on the shared inbox: triage and drafted replies that only go out behind an owner approval",
      "Nightly product scoring and a weekly deprecation digest; underperformers retire only when the owner says so",
    ],
    outcome:
      "The job letter in practice. The agents may propose, draft and score; the owner approves. Refunds are locked to manual approval and the store's all-sales-final policy is enforced in code, so no agent can promise what the business does not offer.",
    stack: ["Hydrogen", "Shopify", "Claude Agent SDK", "Postgres", "pg-boss", "Railway"],
  },
  {
    id: "halcyon-freight",
    concept: true,
    client: "Halcyon Freight",
    sector: "Regional logistics · 40 trucks",
    shape: "Build-a-Bot on existing systems",
    lines: ["build-a-bot"],
    accent: "#2ef2dc",
    summary:
      "Rate confirmations, bills of lading and proof-of-delivery photos arrived as email attachments and got typed into a TMS by hand. Roughly nine hundred documents a week, three people doing it, and a two-day lag before anyone could invoice.",
    work: [
      "Document extraction agent reading rate cons, BOLs and POD photos",
      "Confidence scoring, with anything under threshold routed to a human queue",
      "Two-way sync into the existing TMS — no migration, no replacement",
      "Exception dashboard showing what the agent could not read, and why",
    ],
    shows:
      "Build-a-Bot hired onto systems the client already runs. The delegated job is document intake and extraction; anything under the confidence threshold goes to a named person, and the TMS stays the system of record.",
    stack: ["Python", "Claude", "Postgres", "TMS API"],
  },
  {
    id: "meridian-dental",
    concept: true,
    client: "Meridian Dental Group",
    sector: "Healthcare · six locations",
    shape: "Build-a-Bot + property",
    lines: ["build-a-bot", "web-app"],
    accent: "#ff4e64",
    summary:
      "Six practices, six front desks, and a recall list nobody had time to work. Patients who lapsed at eighteen months were never called, because calling them was always less urgent than the person standing at the counter.",
    work: [
      "Recall agent working the lapsed list by SMS, per location and per clinician",
      "Intake forms that pre-fill from the practice management system",
      "Escalation to a named human the moment a message reads as clinical",
      "Per-location reporting the regional manager actually opens",
    ],
    shows:
      "A job letter in a regulated setting. The agent is delegated recall and scheduling language only; every clinical thread goes to a person by design, not by exception.",
    stack: ["Next.js", "Claude", "Twilio", "PMS integration"],
  },
  {
    id: "cartwright-vale",
    concept: true,
    client: "Cartwright & Vale",
    sector: "B2B SaaS · subscription revenue",
    shape: "Delegated monitoring",
    lines: ["build-a-bot", "ai-consulting"],
    accent: "#2ef2dc",
    summary:
      "Churn was visible in the numbers about a month after it was decided in the product. Support tickets, usage decay, invoice disputes and quiet champions leaving all lived in different systems, and nobody could see them as one shape.",
    work: [
      "Account graph joining product usage, support, billing and CRM into one model",
      "Signal agents watching each edge for the patterns that precede a cancellation",
      "Weekly risk digest to customer success, with the evidence trail attached",
      "A written record of every signal that fired and what happened next",
    ],
    shows:
      "Delegated monitoring, still a concept: the agent is allowed to watch and report, never to contact an account. Model the relationships first and the risk digest becomes an ordinary query.",
    stack: ["Postgres", "dbt", "Claude agents", "Metabase"],
  },
];

/**
 * How an engagement runs, start to finish. Shared by /work/ and /build-a-bot/,
 * so a property build and Build-a-Bot describe the same five stages.
 */
export const stages = [
  {
    step: "01",
    title: "Scope",
    body: "Tasks in, tasks out, the tools involved, and the systems it touches. You get one document: what gets built, a timeline with real dates, and one fixed price.",
  },
  {
    step: "02",
    title: "Build",
    body: "Work lands in stages, and every stage comes off the floor as software you can use. You see progress the week it happens rather than at a reveal.",
  },
  {
    step: "03",
    title: "Integrate",
    body: "Your systems, your records, your business rules. A pilot against real data first, then production, with exceptions routed to the person the scope names.",
  },
  {
    step: "04",
    title: "Hand over",
    body: "You own the spec and the code and configuration. Nothing is locked to us, and nothing about the handover depends on keeping us on retainer.",
  },
  {
    step: "05",
    title: "Stabilise",
    body: `${terms.stabiliseDays} days included. We watch it run in production, fix what real traffic finds, and tune the stop rules before we step back.`,
  },
];
