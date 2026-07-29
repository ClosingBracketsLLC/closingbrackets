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
// `lines` holds the service ids from data/services.js that a build draws on.
// It renders as links back to /services/#id, which is what connects the proof
// on this page to the offer on that one — both for a reader deciding whether
// we do their kind of work, and for crawlers mapping the two pages together.
// Every id used here must exist in `services`; nothing validates that but the
// link will 404 to an anchor that isn't there.

export const builds = [
  {
    id: "evergreen-softwash",
    concept: true,
    client: "Evergreen Softwash",
    sector: "Exterior cleaning · residential services",
    lines: ["custom-software", "ai-automation", "growth-marketing"],
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
      "What the full stack looks like on one small business: film, site, and three agents running the front of house, bought as one scope instead of from five vendors.",
    stack: ["Next.js", "Stripe", "Twilio", "Claude agents", "GBP API"],
  },
  {
    id: "halcyon-freight",
    concept: true,
    client: "Halcyon Freight",
    sector: "Regional logistics · 40 trucks",
    lines: ["ai-integration", "ai-automation"],
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
      "The pattern we use for document-heavy back offices: never replace the system of record. Sit beside it, and hand back only what you are sure of.",
    stack: ["Python", "Claude", "Postgres", "TMS API"],
  },
  {
    id: "meridian-dental",
    concept: true,
    client: "Meridian Dental Group",
    sector: "Healthcare · six locations",
    lines: ["ai-integration", "ai-automation", "custom-software"],
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
      "How we scope AI in a regulated setting: the agent handles scheduling language only, and every clinical thread goes to a person by design rather than by exception.",
    stack: ["Next.js", "Claude", "Twilio", "PMS integration"],
  },
  {
    id: "foundry-and-fern",
    concept: true,
    client: "Foundry & Fern",
    sector: "DTC e-commerce · homewares",
    lines: ["custom-software", "growth-marketing"],
    accent: "#ff4e64",
    summary:
      "Good products, good photography, and a storefront that took nine seconds to become interactive on a phone. Paid traffic was being bought and then lost somewhere on the way to the product page.",
    work: [
      "Storefront rebuild against the existing catalogue and checkout",
      "Core Web Vitals work: 9.1s to 1.4s time-to-interactive on a mid-range Android",
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
    sector: "B2B SaaS · $18M ARR",
    lines: ["ai-consulting", "ai-integration"],
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
      "The graph-first approach we write about: model the relationships first, and questions you could not previously ask become ordinary queries.",
    stack: ["Postgres", "dbt", "Claude agents", "Metabase"],
  },
];

/** How an engagement runs, start to finish. */
export const stages = [
  {
    step: "01",
    title: "Scope",
    body: "We work out what you actually need and write it down. You get one document: what gets built, a timeline with real dates, and one fixed price.",
  },
  {
    step: "02",
    title: "Build",
    body: "Work lands in stages, and every stage comes off the floor as software you can use. You see progress the week it happens rather than at a reveal.",
  },
  {
    step: "03",
    title: "Integrate",
    body: "Where AI belongs in the build, it goes into your existing systems and runs against your data, your workflows, and your business rules. Pilot first, then production.",
  },
  {
    step: "04",
    title: "Hand over",
    body: "You own all of the code. Nothing is locked to us, and nothing about the handover depends on keeping us on retainer.",
  },
  {
    step: "05",
    title: "Grow",
    body: "If you want the marketing side too, it becomes a machine we keep running, bringing in customers every month while we tune what performs best.",
  },
];

/** What a client is left holding at the end. */
export const deliverables = [
  "Working software, running in production",
  "All of the source code, owned by you",
  "The AI integrations wired into the systems you already run",
  "A record of what was built and why",
];
