// Copy for /work/.
//
// NOTE ON HONESTY: everything in `builds` is a CONCEPT BUILD — a project
// designed and built to show what an engagement looks like end to end. The
// companies are invented. Nothing here is a client, a testimonial, or a
// measured result, and the page labels every card as such in visible text.
// That distinction is the whole point: fabricated social proof is worse than
// none, and it is the one thing a prospect can check.
//
// TURNING ONE INTO A REAL CASE STUDY: set `concept: false` and replace `shows`
// with an `outcome` the client would confirm in writing. The page sorts real
// work above concept work automatically, so the first real case study takes the
// top slot on its own.
//
// `shape` names the engagement shape the build demonstrates (Build-a-Bot,
// property, or both) and renders beside the concept-build label, so the proof
// on this page maps onto the two doors the homepage offers.
//
// `lines` holds the service ids from data/services.js that a build draws on.
// It renders as links back to /services/#id, which is what connects the proof
// on this page to the offer on that one — both for a reader deciding whether
// we do their kind of work, and for crawlers mapping the two pages together.
// Every id used here must exist in `services`; nothing validates that but the
// link will 404 to an anchor that isn't there.

import { terms } from "./build-a-bot";

export const builds = [
  {
    id: "evergreen-softwash",
    concept: true,
    client: "Evergreen Softwash",
    sector: "Exterior cleaning · residential services",
    shape: "Build-a-Bot + property",
    lines: ["build-a-bot", "web-app", "seo-growth"],
    accent: "#2ef2dc",
    featured: true,
    // Media lives on the featured build only — one moving thing per page.
    poster: "/assets/work/evergreen-poster.webp",
    posterMobile: "/assets/work/evergreen-poster-m.webp",
    clip: "/assets/vid/evergreen.mp4",
    clipMobile: "/assets/vid/evergreen-m.mp4",
    summary:
      "A regional soft-wash company with a full crew calendar and no way to fill the gaps. Every booking came through a phone number one person answered, and every quote meant driving out to the property. We built the whole front end of the business: the film that gets attention, the site that converts it, and the agents that answer at two in the morning.",
    work: [
      "Brand identity and a launch film, cut as a single dusk hero spot",
      "Booking site with instant quoting from address and roof area",
      "Lead qualifier agent that books straight into the crew calendar",
      "Review responder that answers every review inside an hour",
      "Local SEO and Google Business Profile across four service areas",
    ],
    shows:
      "Property plus Build-a-Bot on one small business. The job letter delegates lead qualification, calendar booking and review replies; discounts, arrival promises and complaints naming damage stay with the owner.",
    stack: ["Next.js", "Stripe", "Twilio", "Claude agents", "GBP API"],
  },
  {
    id: "halcyon-freight",
    concept: true,
    client: "Halcyon Freight",
    sector: "Regional logistics · 40 trucks",
    shape: "Build-a-Bot on existing systems",
    lines: ["build-a-bot"],
    accent: "#ff4e64",
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
    accent: "#2ef2dc",
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
    id: "foundry-and-fern",
    concept: true,
    client: "Foundry & Fern",
    sector: "DTC e-commerce · homewares",
    shape: "Property · performance",
    lines: ["web-app", "engineering-bar", "seo-growth"],
    accent: "#ff4e64",
    summary:
      "Good products, good photography, and a storefront that took nine seconds to become interactive on a phone. Paid traffic was being bought and then lost somewhere on the way to the product page.",
    work: [
      "Storefront rebuild against the existing catalogue and checkout",
      "Core Web Vitals work until the storefront was usable on a mid-range Android",
      "Abandoned-cart sequence with per-customer copy rather than one template",
      "Attribution wired so paid spend maps to revenue, not to sessions",
    ],
    shows:
      "That performance work is growth work. Nothing in the funnel changed except how fast it arrived.",
    stack: ["Next.js", "Shopify Storefront API", "Klaviyo", "GA4"],
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
 * so a property build and a Build-a-Bot describe the same five stages.
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
