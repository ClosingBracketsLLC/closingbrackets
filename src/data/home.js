// Copy for the homepage sections BELOW the scroll-world flight (HomeTail.js).
//
// The flight (data/world.js) is the cinematic précis; this is the structured
// half of the same page — the two doors, how delegation works, the limits,
// three concept builds, the three rules, fit / not a fit, and the close.
// Section order is the master brief's, and the wording is the brief's where
// it gave any. The limits (`notDelegate`), the three rules (`engagement`) and
// the close (`startClose`) are shared with other pages and live with them.

import { cta, routes } from "./site";
import { terms } from "./build-a-bot";

export const doors = [
  {
    id: "bot",
    accent: "#2ef2dc",
    eyebrow: "Build-a-Bot",
    title: "A custom agent for the tasks you delegate",
    body: "One worker with a job description, wired to the tools you already use, with a stop condition and a named human it escalates to. You stay the manager.",
    points: [
      "Scoped by one job letter: tasks in, tasks out",
      `Typically ${terms.buildDays} days from signed letter to production agent`,
      `Fixed price, with ${terms.stabiliseDays} days of stabilising included`,
    ],
    cta: { label: "Get a Build-a-Bot", href: routes.bot },
  },
  {
    id: "property",
    accent: "#ff4e64",
    eyebrow: "Site & app",
    title: "The property your business stands on",
    body: "Sites, apps, storefronts and customer portals, built A to Z with the usual engineering bar: performance, accessibility, security, SEO.",
    points: [
      "Working software at every milestone, not a status report",
      "Fixed scope, real dates, one price",
      "You own the code when we hand it over",
    ],
    cta,
  },
];

/** Section headings and standfirsts, in page order. */
export const headings = {
  doors: {
    eyebrow: "Two doors",
    title: "A bot, a property, or both",
    body: "Build-a-Bot is a custom agent hired onto the systems you already have. Site & app is the property it works behind. Most projects take both; neither is forced on you.",
  },
  delegation: {
    eyebrow: "Build-a-Bot",
    title: "How delegation works",
    body: "Three steps. The letter is the contract, and the agent does the work you hand it — nothing more.",
  },
  work: {
    eyebrow: "Selected work",
    title: "Concept builds",
    body: "Configurations we built to show how a property and a delegated agent look in a real operation. They are not paying-client case studies, and every one says so.",
  },
  fit: {
    eyebrow: "Before you write",
    title: "A fit, or not",
    body: "Cheaper for both of us to know now.",
  },
};

/** How delegation works — brief §5.1, verbatim. */
export const delegation = [
  { title: "You name the tasks", body: "You name the tasks you will delegate, and the ones you will not." },
  { title: "We write one job letter", body: "We write one job letter. That is the scope." },
  { title: "The agent runs", body: "The agent runs against your data and tools. Exceptions go to a named human." },
];

/** Three concept builds for the homepage — the best delegated-work stories. */
export const selectedWorkIds = ["evergreen-softwash", "halcyon-freight", "meridian-dental"];

/** Fit / not a fit — brief §6, verbatim. Also read by /about/. */
export const fit = {
  yes: "A fit if you can name work you already wish someone would take — leads after hours, documents in a pile, patients who lapsed, reviews sitting unanswered.",
  no: "Not a fit if you want a widget on the homepage, a free strategy deck, or an agent that runs the company.",
};
