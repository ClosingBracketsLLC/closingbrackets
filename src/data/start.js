// Copy for /start/ — the conversion page.
//
// `faqs` render here, at the point the objections actually fire (someone
// looking at an empty textarea), AND are emitted as FAQPage structured data.
// The answers on the page are the answers in the markup, word for word:
// change one and both change; never move them behind a disclosure toggle.
// Nothing here may claim more than the rest of the site does.

import { author } from "./site";

export const hero = {
  title: "Tell us what you want built",
  intro:
    "Build-a-Bot, a site or app, or both. Describe it below, in your words. We read every enquiry ourselves, and the first answer costs nothing. What comes back is the scope, real dates, and one price.",
};

/** What happens after the send button, in the order it happens. */
export const next = [
  {
    title: "A person reads it",
    body: `${author.line} Not a queue and not a bot — the person who would do the work reads the enquiry, which is why the first reply is useful rather than a request to book a call.`,
  },
  {
    title: "The first answer is free",
    body: "You get a straight answer, even when it is that this is not work we are right for. Nothing sits in a pipeline waiting for a follow-up sequence.",
  },
  {
    title: "Scope, dates, one price",
    body: "For a bot, the job letter: tasks in, tasks out, and the price for exactly that. For a property, a fixed-scope plan with real dates. No hourly billing, and no number that moves once work starts.",
  },
];

export const faqs = [
  {
    q: "How do you price a project?",
    a: "One fixed price for one written scope, agreed before any work starts. There is no hourly billing and no time-and-materials. If something is not in the scope document, it is not in the price — and if you want it added, we re-price that change on its own rather than letting the total drift.",
  },
  {
    q: "Who owns the code you write?",
    a: "You do, all of it. The source is handed over at the end of the build and nothing is locked to us. You can take it to another team, keep it in-house, or leave it running untouched; none of that depends on keeping us on a retainer.",
  },
  {
    q: "Is any of the work on your site real?",
    a: "Yes. Two builds on our work page are live: Evergreen Softwash, a marketing site for an exterior-cleaning business in Puget Sound, and Doge Buddy, a Shopify storefront with delegated agents running sourcing, fulfilment and support behind owner approval. Both are linked so you can use them. The other builds on that page are concept builds — designed and built by us with invented companies — and every one says so. We publish no testimonials or results a client has not confirmed in writing.",
  },
  {
    q: "Will AI replace the systems we already run?",
    a: "No. We sit beside your system of record rather than replacing it, working against your data, your workflows and your business rules. That means a pilot first, then production, and a two-way integration with whatever you already run — not a migration.",
  },
  {
    q: "We only want to try one small thing. Is that possible?",
    a: "Yes, and it is the usual way in. Build-a-Bot starts as one agent doing one delegated job, scoped by one job letter and running against your own data, with no commitment to anything after it. More tasks later means a change order or a second bot, never a platform.",
  },
  {
    q: "What is a job letter?",
    a: "The scope of Build-a-Bot, written as a delegation: the tasks you hand to the agent, and the tasks you do not. It names the tools it may act in, the person it escalates to, and the condition that stops it. The letter is the contract — if it is not in the letter, it is not in the bot.",
  },
  {
    q: "What will the agent not do?",
    a: "Anything you have not written a rule for. It does not make pricing exceptions or refunds, it does not give clinical, legal or financial sign-off, and it does not run without a stop condition and an escalation name. Those go to a person by design, not by exception.",
  },
  {
    q: "How quickly will we hear back?",
    a: "The same business day. We read every enquiry ourselves — there is no sales team in between — and the first answer costs nothing. What comes back is either a fixed-scope plan, a job letter, or a straight explanation of why we are not the right people for it.",
  },
];

export const balloon =
  "If you can name work you already wish someone would take, that is enough to write. If you cannot yet, say what the business does and we will tell you whether there is a job letter in it.";
