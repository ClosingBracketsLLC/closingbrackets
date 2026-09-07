// Copy for /build-a-bot/ — the flagship product page.
//
// Everything here follows the master brief (§1, §5.2, §6). The process stages
// are shared with /work/ (data/work.js `stages`) so the two pages cannot
// describe two different projects, and the limits list (`notDelegate`) is the
// one the homepage and /about/ render too.
//
// THE COMMERCIAL NUMBERS LIVE HERE AND NOWHERE ELSE. `terms` and `bands` feed
// every sentence on the site that quotes a day count or a price, so a change
// to the offer is one edit. Bands, not a rate card: the exact price comes from
// the job letter. The catalogue stays price-free.

import { routes, startHref } from "./site";

export const terms = { buildDays: 21, stabiliseDays: 30 };

export const timeline = `Typically ${terms.buildDays} days from signed letter to production agent, plus ${terms.stabiliseDays} days of stabilising.`;

/** Starting price bands — published as bands, never as a rate card. */
export const bands = [
  { name: "One delegated job on systems you already have", from: 6000 },
  { name: "Two or three related jobs, or messy wiring", from: 12000 },
  { name: "Optional oversight after day 30", from: 1500, per: "month" },
];

export const bandsNote = "Exact price comes from the job letter. No hourly billing.";

/** The optional budget question on /start/, kept beside the bands it frames. */
export const budgetBands = ["< $8k", "$8–25k", "$25k+", "Not sure"];

export const usd = (n) => `$${n.toLocaleString("en-US")}`;

export const hero = {
  title: "A custom agent for the tasks you delegate.",
  intro:
    "Not a chatbot. Not a platform you have to figure out. One worker, scoped to your business, wired to your tools, with a stop condition and a human it escalates to.",
};

/** Examples of delegated jobs — a starting list, not an infinite menu. */
export const delegate = [
  "Lead qualification and appointment setting",
  "Review responses",
  "Recall and reactivation",
  "Inbox triage",
  "Document intake and extraction",
  "Quote follow-up",
  "Invoice and accounts-payable assist",
  "Drafted content queued for a human to publish",
];

export const delegateNote =
  "This is a starting list. Custom jobs exist. “Anything an agent can do” is not the offer: more tasks means a change order or a second bot.";

/** What you do not delegate — the limits, stated plainly, in one place. */
export const notDelegate = [
  "Pricing exceptions and refunds you have not written a rule for",
  "Clinical, legal, or financial sign-off",
  "Regulated language: anything that reads as medical, legal, or financial advice goes to a person",
  "Anything without a stop condition and an escalation name",
];

/** The sample job letter — brief §6. */
export const letter = {
  title: "Job letter — example (home services)",
  delegate: [
    "Qualify inbound web and call leads against the service area",
    "Book qualifying jobs on the crew calendar",
    "Send the owner a same-day recap of bookings and rejects",
  ],
  keep: [
    "Discounting below the published rate card",
    "Promising arrival windows the calendar cannot keep",
    "Replying to complaints that name damage or injury",
  ],
  caption: "The letter is the contract. If it is not in the letter, it is not in the bot.",
};

/** What Build-a-Bot is, and what it is not — brief §1. */
export const isNot = [
  { is: "A custom worker with a job description", not: "A chatbot bolted on the homepage" },
  { is: "Allowed to act inside tools you already use", not: "A general assistant that “does AI”" },
  { is: "Bound by what you delegate", not: "Autonomous management of the company" },
  { is: "Built and handed over by the agency", not: "A self-serve builder you figure out" },
  { is: "Monitored, with a stop rule and a human", not: "A fleet of agents you manage on day one" },
];

export const close = {
  caption: "The first answer is free",
  title: "Describe the tasks you want to hand off",
  body: "The first answer is free. The job letter and the price come next.",
  action: { label: "Start a Build-a-Bot", href: startHref("bot") },
  secondary: { label: "See a concept build", href: routes.work },
};
