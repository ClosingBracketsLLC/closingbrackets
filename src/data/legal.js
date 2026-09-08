// Copy for /privacy/ and /terms/. Plain English, and only claims that match
// what the site actually does: the /start/ form is delivered by Web3Forms,
// analytics is Microsoft Clarity, hosting is Render, and calls are booked
// through whichever scheduling link NEXT_PUBLIC_CALENDAR_URL points at.
//
// Written by the studio, not by a lawyer. Keep it honest; keep it short.

import { brand, contact } from "./site";

const UPDATED = "2026-09-07";

export const privacy = {
  title: "Privacy",
  intro: `What ${brand.name} collects when you use this site, why, and how to have it removed. There are no ads here and nothing is sold.`,
  updated: UPDATED,
  sections: [
    {
      h: "What you send us",
      p: [
        "The enquiry form asks for your name, your email address, and what you want built; company and budget band are optional. It is delivered to our inbox by Web3Forms, a form-delivery service, and read by a person.",
        "We keep the email thread for as long as the conversation is live and for our own records of it afterwards. If you email us or book a call, the same applies to what you write.",
      ],
    },
    {
      h: "What the site measures",
      p: [
        "We use Microsoft Clarity to see how pages are used: which sections get read, where people stop, and where the scroll-driven homepage stalls. Clarity sets cookies for this, may record sessions as anonymised replays and heatmaps, and masks what you type into form fields by default. Microsoft's own privacy statement covers how it handles that data.",
        "Our host, Render, keeps ordinary server logs (including IP addresses) for security and operations, and clears them on its own schedule. We do not run advertising trackers.",
      ],
    },
    {
      h: "Booking a call",
      p: [
        "If you book a 15-minute call, the scheduling provider we link to collects what it needs to hold the slot, under its own privacy policy. We see your name, email and the time you chose.",
      ],
    },
    {
      h: "Your choices",
      p: [
        `Write to ${contact.email} to see what we hold about you or to have it deleted; we will do that within a reasonable time and tell you when it is done. You can decline or clear analytics cookies in your browser without affecting the site.`,
        "This site is not directed at children, and we do not knowingly collect information from anyone under 16.",
      ],
    },
    {
      h: "Changes",
      p: [
        "If this page changes in a way that matters, the date at the top changes with it.",
      ],
    },
  ],
};

export const terms = {
  title: "Terms",
  intro: `The short version of how this site and our work are offered. Every engagement is governed by its own written scope; nothing on the site replaces that document.`,
  updated: UPDATED,
  sections: [
    {
      h: "The site",
      p: [
        "The content here describes what we do and how we think about it. It is information, not advice, and it may change without notice. You may read, link to and quote it with attribution; you may not present it as your own.",
        "The builds on the work page are concept builds: configurations we scoped, designed and built to show what an engagement produces. The companies in them are invented. They are not client projects, and no one in them is a customer.",
      ],
    },
    {
      h: "Engagements",
      p: [
        "Work starts only when a written scope has been agreed: a job letter for a Build-a-Bot, a scope document for a site or app. That document, and any terms attached to it, governs the engagement. Prices on this site are starting bands, not quotes, and nothing here is an offer to contract.",
        "On handover you own the code, configuration and specification produced for you, as the scope describes. Nothing about that handover depends on keeping us on a retainer.",
      ],
    },
    {
      h: "Agents",
      p: [
        "A Build-a-Bot acts only within the tasks its job letter delegates, with the stop condition and escalation the letter names. It is not a substitute for clinical, legal or financial judgement, and the letter will say so where that applies.",
      ],
    },
    {
      h: "Liability",
      p: [
        "The site is provided as is. To the extent the law allows, we are not liable for loss arising from reliance on it. Liability for an engagement is set out in its scope.",
        `These terms are governed by the laws of the State of Washington, USA. Questions go to ${contact.email}.`,
      ],
    },
  ],
};
