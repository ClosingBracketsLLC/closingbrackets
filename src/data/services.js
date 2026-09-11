// Copy for /services/ and /services/catalog/.
//
// TWO LAYERS, ON PURPOSE:
//
//   `services` — the studio menu, in the master brief's order: Build-a-Bot
//   first, then the property it runs on, then the engineering bar, then the
//   two optional lines. These are the five that layout.js publishes as
//   Organization.hasOfferCatalog (read from here, so they cannot drift) and
//   that data/work.js `lines` point back at. Keep public/llms.txt in step.
//
//   `catalog` — the scoping menu behind each line, grouped BY THE SAME FIVE
//   IDS so a reader lands from a service panel on exactly the items that
//   belong to it. It is the menu we draw a scope from, not the identity of the
//   firm: no bundled tiers, no retainer packages, no agent fleets. The offer is
//   still one project, one price.
//
// NO PRICES IN THE CATALOGUE. The one place the site publishes numbers is
// /build-a-bot/, as starting bands (data/build-a-bot.js).

import { routes } from "./site";
import { terms } from "./build-a-bot";

/** Where a line's full description lives when it is a catalogue section. */
const catalogLink = (id) => ({
  label: "See everything in it",
  href: `${routes.catalog}#${id}`,
});

export const services = [
  {
    id: "build-a-bot",
    title: "Build-a-Bot",
    accent: "#2ef2dc",
    summary:
      "A custom agent that handles the tasks you delegate. Not a chatbot, not a platform: one worker with a job description, wired to your tools, with a stop condition and a human it escalates to.",
    points: [
      "Scoped by one job letter: what you delegate, what you do not.",
      "Runs against your data, your workflows, your business rules.",
      `Typically ${terms.buildDays} days to production, ${terms.stabiliseDays} days of stabilising included, fixed price.`,
    ],
    examples: [
      "Lead qualification and booking",
      "Recall and reactivation",
      "Document intake and extraction",
      "Review responses and quote follow-up",
    ],
    link: { label: "The full Build-a-Bot page", href: routes.bot },
  },
  {
    id: "web-app",
    title: "Web & app",
    accent: "#ff4e64",
    summary:
      "The property your business stands on, built A to Z: professional sites, storefronts, customer portals, and the apps behind them.",
    points: [
      "Every milestone lands as working software you can use, not a status report.",
      "Built in the open, so you see progress the week it happens.",
      "You own all of the code when we hand it over.",
    ],
    examples: [
      "Professional website build",
      "E-commerce setup",
      "Customer portals and custom apps",
      "CRM and integrations",
    ],
    link: catalogLink("web-app"),
  },
  {
    id: "engineering-bar",
    title: "Engineering bar",
    accent: "#2ef2dc",
    summary:
      "Performance, accessibility, security, and SEO foundations. Part of every build, or a standalone audit on a property you already have.",
    points: [
      "Core Web Vitals measured before and after, not promised.",
      "WCAG AA audit and the remediation to go with it.",
      "Security hardening with a written report you can show.",
    ],
    examples: [
      "Performance and speed optimisation",
      "Accessibility (WCAG AA) audit and fixes",
      "Security hardening",
      "Basic SEO setup",
    ],
    link: catalogLink("engineering-bar"),
  },
  {
    id: "seo-growth",
    title: "SEO & growth",
    accent: "#ff4e64",
    summary:
      "For the property we built or the one you have: search, local presence, and conversion work, reported in plain English.",
    points: [
      "SEO setup and monthly monitoring.",
      "Google Business Profile and local search.",
      "Conversion work on the pages that already get traffic.",
    ],
    examples: [
      "Ongoing SEO monitoring",
      "Local SEO and Google Business Profile",
      "Google Ads management",
      "Conversion rate optimisation",
    ],
    link: catalogLink("seo-growth"),
  },
  {
    id: "ai-consulting",
    title: "AI consulting",
    accent: "#2ef2dc",
    summary:
      "We tell you where a bot pays off in your business and where it does not. It usually turns into a job letter, not a strategy deck.",
    points: [
      "We map the work you do today and mark the places worth delegating.",
      "Each recommendation names what it changes and what it costs to run.",
      "Reasoning shown, so you can disagree with it.",
    ],
    examples: [
      "AI maturity audit and roadmap",
      "Team AI training and prompt library",
      "Marketing audit and 90-day roadmap",
    ],
    link: catalogLink("ai-consulting"),
  },
];

/** Line above the catalogue — the brief's demotion, in one sentence. */
export const catalogIntro =
  "The catalogue is the menu we draw a scope from. The offer is still one project, one price.";

/**
 * The engagement terms, stated the same way everywhere on the site, and the
 * fourth line that always follows them. Rendered by EngagementRules.js.
 */
export const engagementHeading = {
  eyebrow: "How we work",
  title: "The three rules",
  body: "The same three on every engagement, bot or property. Plus one more: you own the code, and nothing is locked to a retainer for handover.",
};

export const engagement = [
  {
    title: "Fixed scope",
    body: "One document says what we build. If it is not in there, it is not in the price.",
  },
  {
    title: "Real dates",
    body: "A timeline with actual dates on it, not a range that slides.",
  },
  {
    title: "One price",
    body: "A single fixed price agreed before anything starts. No hourly billing.",
  },
];

/* ------------------------------------------------------------------ */
/* The scoping menu. Five groups, one per service line, same ids.      */
/* Each item is a thing we can put in a scope, described in full.      */
/* ------------------------------------------------------------------ */

export const catalog = [
  {
    id: "build-a-bot",
    title: "Build-a-Bot",
    kind: "Fixed price · from the published bands",
    accent: "#2ef2dc",
    blurb:
      "One agent, one job letter. Everything below is a line that can appear in that letter; the price bands are on the Build-a-Bot page.",
    items: [
      {
        name: "One delegated job",
        brief: "The usual way in: one agent doing one task you hand it.",
        detail: `The job letter names the task, the tools it may act in (CRM, email, calendar, your website), the person it escalates to and the condition that stops it. Wired, piloted against your real records, then run in production. Typically ${terms.buildDays} days, with ${terms.stabiliseDays} days of stabilising included.`,
      },
      {
        name: "A second or related job",
        brief: "More tasks means a change order or a second bot.",
        detail:
          "When the first job is running, the next one is scoped the same way: a new line in the letter with its own rule, or a second agent if the tasks do not share tools. Never an open-ended roster.",
      },
      {
        name: "Wiring into your systems",
        brief: "The integration work when the tools are messy.",
        detail:
          "Connecting the agent to your CRM, ERP, website, email or analytics, plus the secure data pipelines underneath. Your data stays yours and stays where you put it. This is what moves a job from the first band to the second.",
      },
      {
        name: `Oversight after day ${terms.stabiliseDays}`,
        brief: "Optional, monthly, and you can stop it.",
        detail:
          "Monitoring, cost control, model updates as they land, a monthly performance report, and one minor tweak a month. The agent keeps working without it; this keeps it correct as your business and the models move.",
      },
      {
        name: "Performance and ROI dashboard",
        brief: "One screen that says whether this is working.",
        detail:
          "What the agent did, what it escalated, what it cost to run, and what it saved — with an executive summary view for people who will never open the detail.",
      },
    ],
  },
  {
    id: "web-app",
    title: "Web & app",
    kind: "One-time · fixed scope",
    accent: "#ff4e64",
    blurb:
      "Bought once, delivered against a written scope with real dates. Each one ends with something running that you own.",
    items: [
      {
        name: "Marketing website build",
        brief: "A professional, mobile-responsive 5–10 page site.",
        detail:
          "Custom design on your brand, homepage with real calls to action, about, services and contact pages, full mobile optimisation, and launch on your hosting and domain. Ends with a one-hour live handover.",
      },
      {
        name: "Professional website build",
        brief: "An expanded 10–20 page site built to convert, not just to exist.",
        detail:
          "Custom content types and reusable blocks, advanced forms, considered navigation, and full blog, portfolio and testimonials sections. Full launch, two live training sessions, and 30 days of post-launch support.",
      },
      {
        name: "Website redesign or migration",
        brief: "A full overhaul, or a move off a platform that is holding you back.",
        detail:
          "Audit of the current site, then a new sitemap, wireframes and a rebuild from the ground up. Content migrates cleanly, speed, security and accessibility all improve, and everything is tested before launch.",
      },
      {
        name: "E-commerce setup",
        brief: "A store that takes money reliably.",
        detail:
          "Product catalogue, cart and checkout flow, Stripe and PayPal integration, and inventory and shipping configuration. Tested end to end before it goes live.",
      },
      {
        name: "Customer portal or custom app",
        brief: "The software behind the site, built in stages you can use.",
        detail:
          "A client portal, an internal tool, or the app your business runs on. Every stage comes off the floor as working software; APIs and integrations included where the scope names them.",
      },
      {
        name: "CRM and integrations setup",
        brief: "Your site and your business tools, actually talking to each other.",
        detail:
          "Data mapping between systems, automation rules and triggers, full testing and error handling, and written documentation at handover so the next person can pick it up.",
      },
      {
        name: "Branding and identity package",
        brief: "The brand foundation everything else gets built on.",
        detail:
          "Discovery session, mood boards, logo variations in every format, and a style guide covering colours, fonts, icons and usage rules. Includes social templates and two rounds of revisions.",
      },
      {
        name: "Copywriting and UX copy",
        brief: "The words, written by someone who has to make them work.",
        detail:
          "Sales and landing page copy, email and micro-copy, keyword integration that does not read like keyword integration, and two full rounds of revisions.",
      },
    ],
  },
  {
    id: "engineering-bar",
    title: "Engineering bar",
    kind: "One-time · part of a build, or a standalone audit",
    accent: "#2ef2dc",
    blurb:
      "The bar every property we ship clears. On a property you already have, each one is an audit with the fixes attached.",
    items: [
      {
        name: "Performance and speed optimisation",
        brief: "Core Web Vitals, fixed.",
        detail:
          "Performance audit, image compression, caching and CDN configuration, and code and database optimisation, with before-and-after numbers.",
      },
      {
        name: "Accessibility (WCAG AA) audit and fixes",
        brief: "A full audit and the remediation to go with it.",
        detail:
          "WCAG AA audit, then fixes for alt text, colour contrast, keyboard navigation, ARIA and screen-reader compatibility. Re-tested after the fixes land, with a report you can show.",
      },
      {
        name: "Security hardening",
        brief: "A one-time pass over everything an attacker looks at first.",
        detail:
          "SSL, firewall configuration, malware scan and removal, login hardening with two-factor authentication, automated backups, and a written security report.",
      },
      {
        name: "Basic SEO setup",
        brief: "The foundation, done once and done properly.",
        detail:
          "Technical audit and fixes, on-page optimisation across titles, descriptions, headings and alt text, keyword research on 5–10 high-value terms, Search Console and Analytics integration, and sitemap submission.",
      },
      {
        name: "Analytics setup",
        brief: "Measurement wired up so the numbers mean something.",
        detail:
          "Event and conversion tracking, a dashboard template, and a live walkthrough so your team can read it without us.",
      },
    ],
  },
  {
    id: "seo-growth",
    title: "SEO & growth",
    kind: "Monthly · take one or several",
    accent: "#ff4e64",
    blurb:
      "The work that only pays off by being done every month. Each one is its own line with its own report; nothing is bundled.",
    items: [
      {
        name: "Website maintenance and updates",
        brief: "Hosting, updates, backups and the small stuff.",
        detail:
          "Hosting and domain management, platform updates, content tweaks up to six hours a month, daily automated backups, and quick bug fixes with an emergency route.",
      },
      {
        name: "Ongoing SEO monitoring",
        brief: "Rankings watched and nudged, monthly.",
        detail:
          "Monthly technical and ranking checks, minor on-page tweaks, keyword rank tracking, and a report that says what moved and what we did about it.",
      },
      {
        name: "Local SEO and Google Business Profile",
        brief: "Winning the map, not just the page.",
        detail:
          "Google Business Profile optimisation, citation building, review management, and monthly local rank reporting.",
      },
      {
        name: "Google Ads setup and management",
        brief: "Someone whose job is your ad account.",
        detail:
          "Campaign structure, keyword and negative keyword research, ad copy and landing-page alignment, then monthly bid adjustments, testing, reporting and a strategy call.",
      },
      {
        name: "Content creation package",
        brief: "Four to twelve pieces a month, written to rank.",
        detail:
          "Blog posts, articles or landing page content with keyword-focused research, custom images or graphics, and publishing handled.",
      },
      {
        name: "Email marketing automation",
        brief: "Sequences that keep selling after the first click.",
        detail:
          "Custom automation flows, list segmentation, scheduled campaigns, and performance tracking with optimisation each month.",
      },
      {
        name: "Reputation management and reviews",
        brief: "More good reviews, faster answers to bad ones.",
        detail:
          "Continuous monitoring, review responses, automated review request flows, and monthly reporting. Often the first job people delegate to Build-a-Bot instead.",
      },
      {
        name: "Conversion rate optimisation",
        brief: "Same traffic, more customers.",
        detail:
          "A/B testing, heatmap and user behaviour analysis, funnel optimisation, and a monthly testing cycle with results written up.",
      },
    ],
  },
  {
    id: "ai-consulting",
    title: "AI consulting",
    kind: "One-time · fixed scope",
    accent: "#2ef2dc",
    blurb:
      "A straight answer on where a bot pays off and where it does not. Most of these end as a job letter rather than a deck.",
    items: [
      {
        name: "AI maturity audit and roadmap",
        brief: "Where AI pays off in your business, and where it does not.",
        detail:
          "Process and tech-stack audit, data readiness evaluation, and a prioritised roadmap with the reasoning shown and the running cost of each recommendation named. Usually converts into the first job letter.",
      },
      {
        name: "Team AI training and prompt library",
        brief: "So the thing you paid for actually gets used.",
        detail:
          "Two to four hands-on sessions, a prompt library written for your company rather than a generic pack, and policies covering what staff should and should not put into a model.",
      },
      {
        name: "Marketing audit and 90-day roadmap",
        brief: "A hard look at what you are doing now, and a plan.",
        detail:
          "Audit of website, SEO, social and paid, plus competitor benchmarking. You get prioritised recommendations, a written roadmap, and a live presentation with time for questions.",
      },
      {
        name: "Market research and customer personas",
        brief: "Who is actually buying, in writing.",
        detail:
          "Competitor deep-dive, customer surveys and interviews, written persona documents, and a presentation of what it all means.",
      },
    ],
  },
];
